// scripts/drifty-validate.ts

import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// ===========================
// DRIFTY SCHEMAS (Zod)
// ===========================

const VisitSchema = z.object({
  id: z.string(),
  technicianId: z.string(),
  scheduledDate: z.string(),
  status: z.string(),
  notes: z.string().optional(),
});

const NoteSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdBy: z.string(),
  createdAt: z.string(),
});

const LineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  cost: z.number(),
  quantity: z.number(),
  addedBy: z.string(),
  addedAt: z.string(),
});

const DocumentSchema = z.object({
  id: z.string(),
  documentId: z.string(),
  addedBy: z.string(),
  addedAt: z.string(),
});

const JobDataSchema = z.object({
  status: z.string(),
  accountId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  scheduledDate: z.string().optional(),
  technicianId: z.string().optional(),
  priority: z.enum(['LOW','NORMAL','HIGH','URGENT']).optional(),
  visits: z.array(VisitSchema).optional(),
  notes: z.array(NoteSchema).optional(),
  lineItems: z.array(LineItemSchema).optional(),
  documents: z.array(DocumentSchema).optional(),
  customFields: z.record(z.any()).optional(),
});

// ===========================
// UTILS
// ===========================

function readAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(readAllFiles(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

function extractJobDataExamples(fileContent: string): any[] {
  // Only validate in files that actually use JobData
  if (!fileContent.includes('JobData') && !fileContent.includes('JobService')) {
    return [];
  }
  
  const matches = fileContent.match(/data:\s*(\{[\s\S]*?\})/g);
  if (!matches) return [];
  
  return matches.map(m => {
    try {
      return eval('(' + m.replace('data:', '') + ')');
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function validateJobData(jobData: any, filePath: string): boolean {
  try {
    JobDataSchema.parse(jobData);
    return true;
  } catch (e) {
    console.error(`❌ Schema validation failed in ${filePath}:`, e.errors || e.message);
    return false;
  }
}

// ===========================
// MAIN VALIDATOR
// ===========================

const targetDir = process.argv[2] || './packages/core/src/services';
const files = readAllFiles(targetDir);

let allPassed = true;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const jobDataExamples = extractJobDataExamples(content);
  jobDataExamples.forEach(example => {
    const valid = validateJobData(example, file);
    if (!valid) allPassed = false;
  });
});

if (allPassed) {
  console.log('✅ All DRIFTY validations passed.');
  process.exit(0);
} else {
  console.error('❌ DRIFTY validations failed.');
  process.exit(1);
}
