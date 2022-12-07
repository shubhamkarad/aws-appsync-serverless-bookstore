import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Amplify, Auth } from "aws-amplify";
const root = ReactDOM.createRoot(document.getElementById("root"));

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_gwyXds7ER",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    identityPoolId: "ap-southeast-1:527ce5e8-8152-495d-9e52-79d33fd669c9",
    userPoolWebClientId: "44ta1mflvasr44aupus4lmk390",
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
});

const myAppConfig = {
  // ...
  aws_appsync_graphqlEndpoint:
    "https://ybcv7fwozrdshcimb5inb43k4q.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  aws_appsync_region: "ap-southeast-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS", // You have configured Auth with Amazon Cognito User Pool ID and Web Client Id
  // ...
};

Amplify.configure(myAppConfig);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
