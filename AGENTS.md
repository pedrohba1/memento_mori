**Overview**
This document guides agent actions in this repo.

**Commands**

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Test**: No test script configured; add one (e.g., Jest or Vitest).
- **Single Test**: With a configured runner, run a single test via `npm test -- -t <name>` or `npx vitest path/to/test --testNamePattern '<name>'`.

**Code Style**

- **Imports**: External first, internal next; absolute imports preferred; no unused imports; prefer type-only imports when possible.
- **Formatting**: Prettier: semi, singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2.
- **Types & Interfaces**: Prefer explicit types; avoid `any`; use `unknown` when needed; export interfaces for public shapes.
- **Naming**: Components/types: PascalCase; vars/functions: camelCase; constants: UPPER_SNAKE.
- **Error Handling**: Use try/catch; surface friendly messages; log with context.
- **Testing**: Write unit tests for pure logic; integration tests for API/module boundaries; keep tests adjacent to code.
- **Commit/PR**: Write meaningful messages; run lint/format before commit; avoid unrelated changes.

**Cursor Rules**

- Cursor rules: none found in this repo.

**Copilot Rules**

- Copilot rules: none found in this repo.
