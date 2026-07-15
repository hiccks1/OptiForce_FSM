"use strict";
// packages/ai/src/retrievers/index.ts
// Retriever registry and access layer
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRIFTY_FILE_CONTRACT = void 0;
exports.registerRetriever = registerRetriever;
exports.getRetriever = getRetriever;
exports.listRetrievers = listRetrievers;
exports.beforeRetrieveDispatch = beforeRetrieveDispatch;
exports.afterRetrieveDispatch = afterRetrieveDispatch;
var retrievers = new Map();
function registerRetriever(name, retriever) {
    retrievers.set(name, retriever);
}
function getRetriever(name) {
    return retrievers.get(name);
}
function listRetrievers() {
    return Array.from(retrievers.keys());
}
// Hooks / stubs
function beforeRetrieveDispatch() { }
function afterRetrieveDispatch() { }
// Version: 1.0
exports.DRIFTY_FILE_CONTRACT = {
    driftyVersion: "1.0.0",
    layers: [DriftyLayer.L5_AI],
};
