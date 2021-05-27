import jwt, { JwtHeader } from "jsonwebtoken";
import jwkToPem, { JWK } from "jwk-to-pem";
import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "apollo-server-errors";
import fetch from "node-fetch";

interface CognitoPublicKeys {
    keys: Array<JWK & JwtHeader>
}

type UserToken = {
    // The token has more information than this, add them to type definition as required.
    username: string
}

// Add a user custom property so the graphql middleware can see auth information.
declare global {
    namespace Express {
      interface Request {
        user?: UserToken
      }
    }
}

async function fetchCognitoPublicKeys(jwkUrl: string): Promise<CognitoPublicKeys> {
    return fetch(jwkUrl).then((response) => {
        if (!response.ok) {
            throw new Error("Could not reach Cognito public keys URL.");
        }
        const jwk = response.json();
        console.log("Cognito public keys loaded successfully.");
        return jwk;
    });
  }

const verifyJwt = (token: string, jwk: CognitoPublicKeys) => {
    const decodedJwt = jwt.decode(token, { complete: true });
    if (!decodedJwt) {
        throw new Error("Invalid token.");
    }
    const key = jwk.keys.find(key => {
        return key.kid === decodedJwt.header.kid
    });
    if (!key) {
        throw new Error("Signing key for token not found in Cognito public keys.");
    }
    const pem = jwkToPem(key);
    const verifiedToken = jwt.verify(token, pem);
    if (typeof verifiedToken !== "object") {
        throw new Error("Token is not in expected format.");
    }
    return verifiedToken;
  };

function getJwtToken(authHeader: string = "") {
        if (!authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring('Bearer '.length);
}
  

export default async function authenticateByJwt(jwkUrl: string, isPreviewEnv: boolean)  {
    const cognitoPublicKeys = await fetchCognitoPublicKeys(jwkUrl);
    return (req: Request, res: Response, next: NextFunction) => {
        const token = getJwtToken(req.headers.authorization);
        // Check if the authorization header exists and has a bearer token.
        // If not, return null
        if (!token) {
            if (isPreviewEnv) {
                // Reject all non-logged in queries in preview environment
                console.log("No bearer token sent. In preview environment, so returning AuthenticationError.");
                next(new AuthenticationError('You must sign in to SSO before accessing preview API.'));
                return;
            }
            next();
        } else {
            try {
                req.user = verifyJwt(token, cognitoPublicKeys) as UserToken;
                next();
            } catch (e) {
                console.log("Exception thrown while verifying user", e);
                if (isPreviewEnv) {
                    // Reject all non-logged in queries in preview environment
                    console.log("In preview environment, so returning AuthenticationError.\n", e)
                    next(new AuthenticationError('You must sign in to SSO before accessing preview API.'));
                    return;
                }
                next();
            }

        }
    }
}