# Deploy API to Render

This checklist is for deploying the backend service in production with image uploads.

## 1) Service Type

- Create a **Web Service** on Render.
- Point it to this repository.
- Set **Root Directory** to `api`.
- Use Docker deployment (Render will use `api/Dockerfile`).

## 2) Persistent Disk (required for uploads)

- Add a **Persistent Disk** to the API service.
- Mount path: `/var/data`.
- Set environment variable:
  - `UPLOADS_DIR=/var/data/uploads`

Without this, uploaded images are lost on restart/redeploy.

## 3) Environment Variables

Set these in Render:

- `NODE_ENV=production`
- `RUN_FIXTURES=false`
- `PORT=3000`
- `UPLOADS_DIR=/var/data/uploads`
- `FRONTEND_URL=https://<your-frontend-domain>`
- `CORS_ORIGINS=https://<your-frontend-domain>`

Database (recommended):

- `DATABASE_URL=<render-postgres-connection-string>`

If your database requires SSL, use a URL that includes `sslmode=require`.

## 4) Startup Behavior

The API currently:

- runs migrations at startup (`drizzle-kit migrate`)
- then starts the server on `PORT`
- skips fixtures when `RUN_FIXTURES=false` or when `NODE_ENV=production`

## 5) Post-deploy Checks

- Open `https://<api-domain>/uploads` and confirm the route is reachable (it may return 404 if no file exists yet).
- Create a gift with an uploaded image from the frontend.
- Confirm the gift stores an `image_url` like `/uploads/gifts/<file>.webp`.
- Confirm image still exists after a service restart.

## 6) Frontend Reminder

The frontend must call this API domain:

- `NEXT_PUBLIC_API_BASE_URL=https://<api-domain>`

And `next/image` should allow the API host in `client/next.config.ts` if needed.
