"use strict";
const https = require("https");
const utils = require("@uoa/utilities");
const { v4: uuidv4 } = require("uuid");

module.exports.main = async (event) => {
  const BASE_URL = `api.${process.env.ENV}.auckland.ac.nz`;

  // POST (Create) a new ServiceNow ticket
  if (event.httpMethod === "POST" && event.body) {
    let requesterData;

    // preferred username is the closest thing
    try {
      let cognitoDomain = process.env.COGNITO_DOMAIN;
      let data = await utils.getUserInfo(event, cognitoDomain);
      if (data.error) {
        return {
          statusCode: 500,
          body: JSON.stringify(
            "Failed getting requester cognito information from server.",
            error
          ),
        };
      } else {
        requesterData = data;
      }
    } catch (e) {
      // console.log("Error getting user.");
      return {
        statusCode: 500,
        body: JSON.stringify(
          "Failed getting requester cognito information within lambda function.",
          e
        ),
      };
    }

    let serviceNowTicketBody = {
      u_short_description: "Storage request",
      u_requestor: requesterData.preferred_username,
      u_comments: "(Content for the storage request goes here.)",
      u_category: "Research IT",
      u_subcategory: "Storage & Data Management",
      u_cmdb_ci: "",
      u_assignment_group: "0b024896406d05c0b8c650771b44066b",
      u_business_service: "f98caa69f9ee0600b8c6ead41549b040",
      u_watch_list: "researchdata@auckland.ac.nz",
      u_correlation_id: `${uuidv4()}`,
      u_correlation_display: "cerhub",
      u_work_notes: event.body,
    };
    // console.log(serviceNowTicketBody);

    try {
      return await getRes(
        `/service/servicenow-readwrite/import/u_rest_u_request`,
        process.env.SN_DEV_API_KEY_RW,
        serviceNowTicketBody
      ).then((res) =>
        ([res] = res.result) // Destructure to first object in result array (first ticket)
          ? {
              statusCode: 200,
              body: JSON.stringify(res),
            }
          : {
              statusCode: 500,
              body: JSON.stringify("Error retrieving ticket from ServiceNow"),
            }
      );
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify("Task failed successfully: ", error),
      };
    }
  }

  // GET a ServiceNow ticket by ticket ID URL parameter
  if (event.queryStringParameters && event.queryStringParameters.ticketId) {
    try {
      // TODO: Replace hardcoded ticket with ${event.queryStringParameters.ticketId}
      return await getRes(
        `/service/servicenow-readonly/table/u_request?sysparm_query=number=REQ1216647&sysparm_display_value=all`,
        process.env.SN_API_KEY_R
      ).then((res) => {
        // test start// Destructure to first object in result array (first ticket)
        return ([res] = res.result)
          ? { statusCode: 200, body: JSON.stringify(res) }
          : {
              statusCode: 500,
              body: JSON.stringify("Error retrieving ticket from ServiceNow"),
            };
      });
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify("Task failed successfully: ", error),
      };
    }
  }

  // Default '/' page
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message: "Welcome to serverless-now",
    }),
  };

  // Function for getting data and returning the JSON result
  // Will make a POST request if the optional data argument is passed
  async function getRes(path, apiKey, data = null) {
    const options = {
      method: data ? "POST" : "GET",
      hostname: BASE_URL,
      path: path,
      headers: {
        apiKey: apiKey,
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      let request = https.request(options, (res) => {
        res.setEncoding("utf8");
        let body = "";

        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(JSON.parse(body)));
        res.on("error", (e) => reject(e));
      });
      request.write(JSON.stringify(data));
      request.end();
    });
  }
};
