# BookStack SQA Project — Playwright Automation

A Software Quality Assurance (SQA) project for the [BookStack Demo](https://demo.bookstackapp.com/). The project combines functional test documentation, a reproducible bug report, automation planning, and a Playwright UI test for the **book creation** feature.

## Project Objectives

- Validate an important BookStack workflow through browser automation.
- Document functional test cases and their execution results.
- Record at least one reproducible issue with clear reproduction steps and evidence.
- Identify three suitable automation candidates and explain why they are worth automating.
- Keep the test code, supporting data, reports, and project documentation organised and easy to review.

## Application Under Test

- **Application:** BookStack Demo
- **URL:** https://demo.bookstackapp.com/
- **Automation framework:** Playwright
- **Test implemented:** Book creation
- **Test location:** `tests/createBookTest.spec.js`
- **Page Object Model (POM):** Used to separate page interactions from the test scenario.

> **Environment note:** The demo site's sample data, login details, and permissions can change. Use an authorised test account and confirm it has permission to create books before running the test. Do not commit credentials or other secrets to GitHub.

## Repository Structure

The folders below reflect the current project structure shown in the repository screenshot.

```text
BookPlaywright/
├── HtmlReport/                    # HTML test report output (generated)
├── node_modules/                  # Installed npm dependencies (generated; do not commit)
├── pageObjects/
│   ├── assets/                    # Assets used by page objects, if any
│   ├── CreateBookPage.js          # Page Object for book creation interactions
│   ├── LoginPage.js               # Page Object for login interactions
│   └── POMManager.js              # Creates/manages page object instances
├── ProjectDetails/
│   ├── automation/                # Automation candidates and justifications
│   ├── bugReport/                 # Bug report and supporting evidence
│   └── testCases/                 # Functional test cases and execution results
├── test-results/                  # Playwright test output, traces, screenshots, etc. (generated)
├── tests/
│   └── createBookTest.spec.js     # Playwright test for the book creation workflow
├── utils/
│   └── TestData.json              # Test data used by the automated test
├── .env                           # Local environment variables/secrets (do not commit)
├── .gitignore                     # Files and folders Git should ignore
├── package-lock.json              # Locked npm dependency versions
├── package.json                   # Project metadata, dependencies, and npm scripts
├── playwright.config.js           # Playwright test configuration
└── README.md                       # Project overview and instructions
```

### Folder and file details

| Path                            | Purpose                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `tests/createBookTest.spec.js`  | Contains the automated end-to-end test for creating a book.                                     |
| `pageObjects/CreateBookPage.js` | Keeps book-creation page locators and actions in one place.                                     |
| `pageObjects/LoginPage.js`      | Keeps login-page locators and login actions separate from test logic.                           |
| `pageObjects/POMManager.js`     | Central place to initialise and access page objects.                                            |
| `pageObjects/assets/`           | Holds any supporting assets required by the page objects.                                       |
| `utils/TestData.json`           | Stores reusable test data so test values are easier to maintain. Avoid putting secrets here.    |
| `ProjectDetails/testCases/`     | Contains functional test cases and their execution results.                                     |
| `ProjectDetails/bugReport/`     | Contains the reproducible bug report.                                                           |
| `ProjectDetails/automation/`    | Contains the three automation candidates and the justification for each.                        |
| `HtmlReport/`                   | Stores the generated HTML report, depending on the configured reporter.                         |
| `test-results/`                 | Stores run artifacts such as failure screenshots, traces, or result data.                       |
| `playwright.config.js`          | Configures test discovery, browser settings, reporters, timeouts, and other Playwright options. |
| `package.json`                  | Lists project dependencies and the npm scripts available to run tests.                          |
| `package-lock.json`             | Locks dependency versions to support consistent installs.                                       |
| `.env`                          | Holds local configuration values such as credentials or the base URL. Keep it private.          |
| `.gitignore`                    | Prevents generated files, dependencies, and secrets from being committed.                       |

## Automated Test: Book Creation

The current automated scenario verifies the book creation workflow.

**High-level flow**

1. Open the BookStack demo.
2. Sign in using the configured test account, if authentication is required.
3. Navigate to the book creation form.
4. Enter the test book details.
5. Submit the form.
6. Verify that the book was created and the expected title is visible.

**Expected result:** The application creates the book successfully and displays the correct title.

The implementation uses page objects to keep UI interactions reusable and to make the test easier to maintain. Test data is kept separately in `utils/TestData.json`.

### Why automate book creation?

Book creation is a core content-management workflow. A regression in the form, validation, or save action could prevent users from organising documentation. An automated test can repeat the workflow and check the visible outcome after changes to the application.

## Project Documentation Requirements

The project brief asks for a **public GitHub repository** with the following deliverables. In the current structure, the documents are grouped under `ProjectDetails/`, while this README stays at the repository root.

1. **`README.md` — Project overview and testing summary**  
   Explains the application under test, repository structure, automation approach, and how to run the test.

2. **Test cases — Functional test cases and execution results**  
   Store these under `ProjectDetails/testCases/`. Include a test ID, scenario, preconditions, steps, expected result, actual result, and status for each executed test. Clearly label tests as _Not Run_ if they have not been executed.

3. **Bug report — Reproducible bug and evidence**  
   Store this under `ProjectDetails/bugReport/`. Include a bug ID, title, environment, steps to reproduce, expected and actual results, severity, and a screenshot or other relevant proof. Recheck the issue before submission and do not claim a bug was reproduced unless you personally verified it.

4. **Automation candidates — Three scenarios and justifications**  
   Store these under `ProjectDetails/automation/`. Include the existing book creation test plus two other candidates, with each scenario's purpose and a short explanation of why automation is valuable.

> The brief says “five files” but enumerates four deliverables. Confirm with the reviewer whether a fifth file is expected. The actual Playwright test (`tests/createBookTest.spec.js`) is also an important project artifact, even though it is not one of the four documentation deliverables listed.

## Setup

### Prerequisites

- Node.js and npm installed.
- Git installed.
- Access to the BookStack demo.
- An authorised test account with permission to create books, if sign-in is required.

### Install dependencies

Clone the public repository, move into its directory, and install dependencies:

```bash
git clone <your-public-repository-url>
cd BookPlaywright
npm ci
```

Install the browser binaries required by the project's Playwright configuration:

```bash
npx playwright install
```

If the project is configured for a specific browser only, install that browser instead.

### Configure environment variables

Check `playwright.config.js`, `package.json`, and the test/page-object files to confirm which environment variable names the project expects. Put the local values in `.env` and keep `.env` out of version control. Do not guess variable names; use the ones referenced by the implementation.

## Running the Tests

The exact npm script names depend on `package.json`. Check the `scripts` section and run the relevant command. Common Playwright commands are:

```bash
# Run the test suite
npx playwright test

# Run only the book creation test
npx playwright test --grep "@createBookTest"

# Open the last HTML report, if the configured reporter generated one
npx playwright show-report HtmlReport
```

The report command may need a different directory depending on `playwright.config.js`. If `package.json` already defines a test script, you can use that script instead, for example `npm test`.

## Test Summary

| Area                  | Current scope                         | Status                                                               |
| --------------------- | ------------------------------------- | -------------------------------------------------------------------- |
| Book creation         | Playwright end-to-end test            | Implemented; run it to record the latest result                      |
| Functional test cases | Manual test documentation             | Document in `ProjectDetails/testCases/`                              |
| Bug hunting           | Reproducible bug report with evidence | Document in `ProjectDetails/bugReport/` and verify before submission |
| Automation planning   | Three candidates with justifications  | Document in `ProjectDetails/automation/`                             |

Do not report a test as passed until it has been run successfully. Record the execution date, browser/environment, and actual result in the test-case document.

## Notes

This repository is a learning and demonstration project, not a claim of complete coverage of BookStack. The current automated coverage focuses on book creation; page creation and search are proposed as additional automation candidates, not implemented tests unless their automation code is added separately.
