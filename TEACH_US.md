# TEACH_US.md

## Building a Public Feedback Flow with a Protected Admin Analytics Dashboard

The most useful lesson from this project is that a simple product can still have two very different trust boundaries.

The public side should be easy. A customer can open the feedback form, choose a category, add a rating and comment, and submit without creating an account. That keeps friction low, but it does not mean the endpoint is unprotected. The backend still validates the request, applies the Mongoose schema, records metadata, and rate-limits submissions before saving anything to MongoDB.

The admin side is different. Feedback contains customer names, emails, comments, ratings, and operational signals, so the dashboard must be protected by backend authorization, not only by frontend routing. React can hide `/admin/dashboard`, but anyone can still call an API from Postman, curl, or a browser console. The real security boundary is the Express middleware that verifies the JWT and allows only admin requests to fetch feedback and analytics.

This split creates a clean product model:

```txt
Public user -> POST /api/feedback -> MongoDB
Admin user -> Login -> JWT -> GET /api/feedback and /api/analytics/summary
```

Deploying the backend on Vercel also taught an important serverless lesson. Express apps usually keep a long-running MongoDB connection, but serverless functions can start repeatedly. Without connection caching, cold starts may create too many database connections or slow down dashboard requests. Caching the active connection and pending connection promise made the backend more reliable in production.

Swagger had a similar deployment lesson. Local Swagger UI worked, but Vercel serverless routing did not serve the usual static assets reliably. Splitting the docs into `/api/docs.json` for the OpenAPI spec and `/api/docs` for a small HTML page that loads Swagger UI from a CDN made the documentation stable.

The takeaway is that production readiness is mostly about boundaries. Public flows need low friction plus validation. Admin flows need real backend authorization. Serverless apps need connection reuse. Documentation needs to work after deployment, not only locally. That is the difference between a working demo and a maintainable first version.
