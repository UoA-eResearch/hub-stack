FROM node:lts

EXPOSE 4000
WORKDIR /cer-graphql/
ADD package.json .
ADD package-lock.json .
ADD index.ts .
ADD tsconfig.json .
ADD authenticateByJwt.ts .
ADD executeAndVerify.ts .
ADD assertResultsArePublicItems.ts .
ADD jest.config.js .

RUN  npm install
RUN npm run build
CMD ["node","build/index.js"]