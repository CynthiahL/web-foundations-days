# SnapShare Scaling Plan

## Assumptions
- Registered users: 10 million
- Daily active users: 10% → 1 million
- Each active user uploads 1 photo/day
- Each active user views 50 feed pages/day
- Average photo size: 2 MB + 50 KB thumbnail ≈ 2.05 MB

## Estimates
- Uploads/day: 1,000,000 → ~12 uploads/sec (average)
- Feed views/day: 50,000,000 → ~580 views/sec (average), ~2,900 views/sec (peak at 5×)
- Storage/year: 1,000,000 × 365 × 2.05 MB ≈ 747 TB

## Read vs Write
SnapShare is **read-heavy**: feed views (~50M/day) far exceed uploads (~1M/day).  
This means the design must prioritize caching, replicas, and CDNs for fast reads, while ensuring uploads remain reliable.

## Storage Strategy
Photos should **not** be stored inside the database because large binary files slow queries and backups.  
Instead, store photos and thumbnails in **object storage** (e.g., S3, Azure Blob), with metadata (URLs, user IDs, timestamps) in the database.

## Architecture Diagram
