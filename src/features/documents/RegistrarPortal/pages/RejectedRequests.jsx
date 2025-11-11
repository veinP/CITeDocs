import React from "react";
import RequestsList from "./RequestsList";

export default function RejectedRequests({ requests, onStatusChange }) {
  return <RequestsList requests={requests} onStatusChange={onStatusChange} filter="rejected" />;
}
