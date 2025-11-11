import React from "react";
import RequestsList from "./RequestsList";

export default function ReadyRequests({ requests, onStatusChange }) {
  return <RequestsList requests={requests} onStatusChange={onStatusChange} filter="ready" />;
}
