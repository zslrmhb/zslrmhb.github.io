# Instagram synchronization — diagnosis and design requirement

## Verified findings

- Read-only Instagram media request with the existing local .env token: HTTP 400, API code 190, explicit expired-token message. No credential or raw response saved.
- Local credential exists; this does not establish the contents of GitHub Actions secrets.
- Latest five public workflow runs (2026-08-03 through 2026-08-31) failed. Latest run 33348436493 failed at Fetch Instagram media -> photos.json, skipping build and commit. Its secret was not read; do not assert a verified cloud token expiry without its error log.
- Current workflow schedule is once weekly, Mondays 00:00 UTC, with manual and svelte5 push triggers. It is not real-time synchronization.
- Current fetch script caps at 60 media records, filters videos, and picks only one child from each carousel. It does not enumerate every photo in the Instagram archive.
- Current cached metadata contains 60 photos, latest timestamp 2026-06-25. The local metadata git history last changed 2026-06-29.

## Requested behavior

User wants every photo displayed and automatic updates. Round-5 now displays all 60 currently cached photos with lazy loading and sequential viewing; this is not a claim that all Instagram images have been fetched.

## Production handoff additions (not yet implemented)

1. Paginate the complete supported media collection and carousel children, using stable child IDs and retaining parent permalink/caption. Distinguish photo assets from video-only media.
2. Incrementally cache new/changed images, use responsive thumbnails, show all entries while loading images near the viewport. No arbitrary 60-item cap.
3. Proposed automatic refresh every 15 minutes through the hosted synchronization job; scheduling can be delayed and is not instantaneous. Verify host/quota/API compatibility before choosing the production mechanism. Immediate event-driven updates would require a separately verified webhook/server design.
4. Renew valid credentials ahead of expiry according to the actual Meta login flow and maintain secure persistent storage of refreshed credentials. Failed authorization requires reconnection, not repeated retries. Never put tokens in browser code, a repository, URLs printed to logs, or public status messages.
5. Preserve the last successful archive on any fetch/download failure. Publish metadata atomically after validation. Do not delete existing cache before the replacement is safely written. Avoid substituting expiring remote URLs for failed local downloads.
6. Separate content-sync failure from deploying unrelated site changes. Record last successful sync and sanitized failure status for the owner; do not show token details to visitors. Show actual sync dates only when available.
7. Authorization repair requires a new valid token/reconnection in the user's Meta account and updating IG_LONG_LIVED_TOKEN in both local private configuration and GitHub Actions secrets as applicable. Do not request tokens in chat. No remote secrets changed in this review.

Workflow evidence: https://github.com/zslrmhb/zslrmhb.github.io/actions/runs/33348436493
