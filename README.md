# Banking Micro-Frontend Assignment

![Banking MFE logo](apps/app-shell/public/logo.svg)

A pnpm workspace monorepo containing:

- `apps/app-shell`
- `apps/loan-mfe`
- `apps/onboarding-mfe`
- `packages/ui-library`
- `packages/store`

The implementation includes Vite Module Federation, TailwindCSS, a shared UI library, a shared Zustand store, lazy loaded micro-frontends, wizard-based onboarding, and a multi-step loan flow.

## Run

```bash
pnpm install
pnpm dev
```

## Ports

- `app-shell`: `http://localhost:3000`
- `loan-mfe`: `http://localhost:3001`
- `onboarding-mfe`: `http://localhost:3002`

## Build

```bash
pnpm build
```

## Preview

![brac-ss-1](apps/app-shell/public/brac-ss-1.jpg)
![brac-ss-2](apps/app-shell/public/brac-ss-2.jpg)
![brac-ss-5](apps/app-shell/public/brac-ss-5.PNG)
![brac-ss-6](apps/app-shell/public/brac-ss-6.PNG)
![brac-ss-7](apps/app-shell/public/brac-ss-7.PNG)
![brac-ss-8](apps/app-shell/public/brac-ss-8.PNG)
![brac-ss-8-1](apps/app-shell/public/brac-ss-8-1.jpg)
![brac-ss-9](apps/app-shell/public/brac-ss-9.PNG)
![brac-ss-10](apps/app-shell/public/brac-ss-10.PNG)
![brac-ss-11](apps/app-shell/public/brac-ss-11.PNG)


