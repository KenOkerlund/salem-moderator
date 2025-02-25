import { vi } from 'vitest';
// setup-vitest.ts
import '@testing-library/jest-dom';

vi.mock('zustand'); // to make it work like Jest (auto-mocking)
