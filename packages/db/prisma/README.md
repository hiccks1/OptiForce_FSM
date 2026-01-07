// ============================================
// NOTES ON GENERATED COLUMNS
// ============================================

/*
Generated columns are NOT in this Prisma schema because:

1. They're created dynamically at runtime
2. Each company has different generated columns
3. Prisma doesn't need to manage them

Example SQL that will be executed:

-- Company A wants status hot path
ALTER TABLE jobs 
ADD COLUMN status TEXT 
GENERATED ALWAYS AS (data->>'status') STORED;

CREATE INDEX idx_jobs_comp_a_status 
ON jobs(status) 
WHERE company_id = 'comp_a';

-- Company B wants multiple hot paths
ALTER TABLE jobs 
ADD COLUMN estimated_value NUMERIC 
GENERATED ALWAYS AS ((data->>'estimatedValue')::numeric) STORED;

CREATE INDEX idx_jobs_comp_b_value 
ON jobs(estimated_value) 
WHERE company_id = 'comp_b';

These columns:
- Auto-populate when rows are inserted/updated
- Can be queried like regular columns
- Are tracked in HotPathColumn table
- Different per company
*/

// ============================================
// MINIO INTEGRATION NOTES
// ============================================

/*
Documents are stored in MinIO (S3-compatible storage):

Bucket structure:
  fsm-documents/
    {companyId}/
      jobs/
        {jobId}/
          invoice.pdf
          receipt.jpg
      documents/
        {documentId}/
          file.pdf

Document.metadata contains:
  - minioKey: Full path in MinIO
  - minioHash: Content hash (for deduplication)
  - size: File size in bytes
  - mimeType: Content type

The Document table only tracks metadata.
Actual files live in MinIO.

MinIO access:
  - apps/api uses @fsm/storage package
  - apps/worker processes files from MinIO
  - Betty can reference documents but doesn't store them
*/
