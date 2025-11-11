import React from "react";
import RequestsList from "./RequestsList";

export default function ProcessingRequests({ requests, onStatusChange }) {
  return <RequestsList requests={requests} onStatusChange={onStatusChange} filter="processing" />;
}
