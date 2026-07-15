export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L4_INFRA"],
};

import { createQueue } from "./client";
import { JobQueuePayloadV1, DocumentQueuePayloadV1 } from "./payloads";

// Queue names
export const JOB_QUEUE = "jobQueue";
export const DOCUMENT_QUEUE = "documentQueue";

// Queues
export const jobQueue = createQueue<JobQueuePayloadV1>(JOB_QUEUE);
export const documentQueue = createQueue<DocumentQueuePayloadV1>(DOCUMENT_QUEUE);

// Hook placeholders
export const initQueueHooks = () => {
  // Example: future logging or AI audit hooks
  jobQueue.on("completed", (job) => {
    // placeholder: log, metrics, AI audit
  });

  documentQueue.on("failed", (job) => {
    // placeholder: notify admin or retry logic
  });
};
