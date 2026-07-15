"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQueueHooks = exports.documentQueue = exports.jobQueue = exports.DOCUMENT_QUEUE = exports.JOB_QUEUE = exports.DRIFTY_FILE_CONTRACT = void 0;
exports.DRIFTY_FILE_CONTRACT = {
    driftyVersion: "1.0.0",
    layers: ["L4_INFRA"],
};
var client_1 = require("./client");
// Queue names
exports.JOB_QUEUE = "jobQueue";
exports.DOCUMENT_QUEUE = "documentQueue";
// Queues
exports.jobQueue = (0, client_1.createQueue)(exports.JOB_QUEUE);
exports.documentQueue = (0, client_1.createQueue)(exports.DOCUMENT_QUEUE);
// Hook placeholders
var initQueueHooks = function () {
    // Example: future logging or AI audit hooks
    exports.jobQueue.on("completed", function (job) {
        // placeholder: log, metrics, AI audit
    });
    exports.documentQueue.on("failed", function (job) {
        // placeholder: notify admin or retry logic
    });
};
exports.initQueueHooks = initQueueHooks;
