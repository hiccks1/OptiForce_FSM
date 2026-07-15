-- Optimization index for status lookup inside your GIN layout
CREATE INDEX CONCURRENTLY idx_jobs_data_status 
ON jobs USING gin ((data->'status'));

-- B-Tree indices for optimized chronological timeline scanning
CREATE INDEX CONCURRENTLY idx_jobs_scheduled_start 
ON jobs ((data->>'scheduledStart'));

CREATE INDEX CONCURRENTLY idx_jobs_scheduled_end 
ON jobs ((data->>'scheduledEnd'));
