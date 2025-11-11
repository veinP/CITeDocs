import React from "react";
import RequestsList from "./RequestsList";

export default function AllRequests({ requests, onStatusChange }) {
  return <RequestsList requests={requests} onStatusChange={onStatusChange} filter="all" />;
}
