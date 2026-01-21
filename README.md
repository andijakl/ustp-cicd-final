# USTP CI/CD Final (Tetris)

Demo deployed to GitHub Pages: https://andijakl.github.io/ustp-cicd-final/

## CI status

- [![Build](https://github.com/andijakl/ustp-cicd-final/actions/workflows/build.yml/badge.svg?event=push)](https://github.com/andijakl/ustp-cicd-final/actions/workflows/build.yml)
- [![Publish to GitHub Pages](https://github.com/andijakl/ustp-cicd-final/actions/workflows/publish.yml/badge.svg)](https://github.com/andijakl/ustp-cicd-final/actions/workflows/publish.yml)
- [![Publish Release](https://github.com/andijakl/ustp-cicd-final/actions/workflows/release.yml/badge.svg)](https://github.com/andijakl/ustp-cicd-final/actions/workflows/release.yml)
- [![Tag when workflows change](https://github.com/andijakl/ustp-cicd-final/actions/workflows/tag-on-workflow-change.yml/badge.svg)](https://github.com/andijakl/ustp-cicd-final/actions/workflows/tag-on-workflow-change.yml)

## Development (local)

Prerequisites:

- Node.js (v24 recommended)
- npm

Install dependencies:

```bash
npm install
```

Run the dev server (hot-reload):

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:coverage
```

Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Notes:

- The `build` workflow badge above is configured to show the status for `push` triggered runs (not pull requests).
- See the `.github/workflows/` directory for workflow definitions.
