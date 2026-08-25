# Parivahan Redesign — Hackathon Prototype

A citizen-first React/Vite redesign of Parivahan with mock data and end-to-end prototype journeys.

## Included

- Citizen-first homepage and service discovery
- My Parivahan dashboard
- Driving licence renewal journey
- Mock document validation and upload error state
- Mock payment success, failure and reconciliation states
- Save & resume feedback
- Application timeline
- Challan lookup, payment and receipt flow
- RTO finder
- Help centre
- Notifications
- Hackathon Demo launcher
- Responsive mobile layout
- GitHub Pages deployment workflow

## Run locally

```bash
npm install
npm run dev
```

## Build locally

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a new GitHub repository, e.g. `parivahan-redesign`.
2. Upload/push everything in this folder to the repository.
3. Use the `main` branch.
4. Open **Settings → Pages** in the GitHub repository.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Push to `main`, or manually run **Deploy Parivahan to GitHub Pages** from the Actions tab.
7. GitHub will build and publish the site.

The deployment workflow is:

`.github/workflows/deploy.yml`

The site will normally be available at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

The Vite config uses a relative base path so the app works from a repository subpath.

## Important

This is a hackathon prototype. It does **not** connect to VAHAN, Sarathi, eChallan, real authentication, government databases, or a real payment gateway. All identities, applications, RTO information, payments and transactions are mock data.

## Demo

Use the **Demo** button in the top navigation to demonstrate:

1. Renew a driving licence
2. Track an application
3. Pay a challan
