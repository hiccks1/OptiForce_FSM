import { DriftyLayer } from "../../drifty/laws";
// packages/ai/src/retrievers/index.ts
// Retriever registry and access layer

import { BaseRetriever } from './BaseRetriever'

const retrievers = new Map<string, BaseRetriever>()

export function registerRetriever(name: string, retriever: BaseRetriever) {
  retrievers.set(name, retriever)
}

export function getRetriever(name: string): BaseRetriever | undefined {
  return retrievers.get(name)
}

export function listRetrievers(): string[] {
  return Array.from(retrievers.keys())
}

// Hooks / stubs
export function beforeRetrieveDispatch(): void {}
export function afterRetrieveDispatch(): void {}

// Version: 1.0


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
