export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L4_INFRA"],
};

import { Queue, Worker, QueueScheduler } from "bullmq";
import IORedis from "ioredis";

const redisPort = parseInt(process.env.REDIS_PORT || "6380"); // non-default
const redisHost = process.env.REDIS_HOST || "127.0.0.1";

export const connection = new IORedis({
  host: redisHost,
  port: redisPort,
});

// For delayed/retry jobs
export const createQueueScheduler = (name: string) => new QueueScheduler(name, { connection });

// Factory for queues
export const createQueue = <T>(name: string) => new Queue<T>(name, { connection });

// Factory for workers
export const createWorker = <T>(name: string, processor: (job: T) => Promise<void>) =>
  new Worker<T>(name, async (job) => processor(job.data), { connection });
