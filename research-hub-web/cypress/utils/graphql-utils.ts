import { CyHttpMessages } from "cypress/types/net-stubbing"

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: CyHttpMessages.IncomingHttpRequest, operationName: string) => {
  return (
    'operationName' in req.body && req.body.operationName === operationName
  )
}
