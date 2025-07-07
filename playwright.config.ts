import { defineConfig, devices } from '@playwright/test';
import { baseURL } from './consts/baseURL';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: 0,
  retries: 2,
  timeout: 120_000,
  reporter: [
    ['html'],
    ['list'],
  ],


  projects: [
    {
      name: "jupiter_toys_tests",
      testDir: "./tests",
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],
  use: {
    baseURL,
  },
  snapshotPathTemplate: "{testDir}/screenshots/{testFileDir}/{arg}{ext}",
  expect: {
    timeout: 15000,
  },
});
