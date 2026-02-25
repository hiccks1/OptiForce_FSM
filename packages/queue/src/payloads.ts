// Versioned payloads

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L4_INFRA"],
};


export interface JobQueuePayloadV1 {
  companyId: string;
  jobId: string;
  type: "CREATE" | "UPDATE" | "DELETE";
  timestamp?: string;
}

export interface DocumentQueuePayloadV1 {
  companyId: string;
  documentId: string;
  action: "UPLOAD" | "PROCESS" | "ARCHIVE";
  timestamp?: string;
}

// Future versions can be added like:
// export interface JobQueuePayloadV2 { ... }
