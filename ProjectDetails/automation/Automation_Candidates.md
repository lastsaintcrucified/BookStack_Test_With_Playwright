# BookStack SQA Project — Automation Candidates

**Application:** [BookStack Demo](https://demo.bookstackapp.com/)  
**Automation tool:** Playwright  
**Purpose:** Select three repeatable scenarios that are worth automating.

## Summary

| ID    | Automation candidate                       | Priority | Why automate it?                                                                                   |
| ----- | ------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------- |
| AT-01 | Create a book                              | High     | Confirms that a core content-management workflow works from start to finish.                       |
| AT-02 | Create a page and verify its saved content | High     | Checks that users can add useful content and that it remains available after saving and reloading. |
| AT-03 | Search for a known book or page            | Medium   | Checks whether users can find existing content without browsing through the whole library.         |

---

## AT-01 — Create a Book

**Scenario:** A signed-in user creates a book with a unique title.

**Preconditions**

- The demo site is available.
- A test account can sign in and has permission to create books.
- The test generates a unique title for each run to avoid collisions.

**High-level steps**

1. Sign in.
2. Open the book-creation form.
3. Enter a unique book name and any required fields.
4. Submit the form.
5. Verify that the new book appears and its title is correct.

**Expected result**  
The book is created successfully and the new title is displayed.

**Why automate it?**  
Book creation is a core BookStack workflow. A small change to a form, validation rule, or save action could break it. Playwright can repeat the same checks reliably and catch regressions early.

**Automation note**  
This scenario is already automated in my project. Keep the title unique for every run, and clean up the test book afterward if the environment permits it.

---

## AT-02 — Create a Page and Verify the Saved Content

**Scenario:** A signed-in user creates a page inside an existing book, then confirms that the page content was saved correctly.

**Preconditions**

- The user is signed in and has permission to edit content.
- A suitable test book exists.
- The test uses a unique page title and a short, identifiable body of text.

**High-level steps**

1. Open the selected book.
2. Start creating a page in the appropriate location.
3. Enter a unique page title and test content.
4. Save the page.
5. Verify the page title and body text on the saved page.
6. Reload the page and verify the content is still present.

**Expected result**  
The page is saved, its title and body are displayed correctly, and the content remains after a reload.

**Why automate it?**  
Saving content is one of the main reasons people use BookStack. Checking the page both immediately after saving and after a reload helps catch issues where the interface appears successful but the content has not persisted properly. It also covers a workflow that is different from creating a book.

**Automation note**  
Use a dedicated test book or a predictable test location. Avoid relying on a page created manually during a previous run.

---

## AT-03 — Search for an Existing Book or Page

**Scenario:** A user searches for a known, existing book or page and opens the matching result.

**Preconditions**

- The demo site is available.
- A known book or page exists and is accessible to the test user.
- The test has the exact title or a distinctive search term.

**High-level steps**

1. Open the search interface.
2. Enter the known book or page title, or a distinctive term from it.
3. Submit the search.
4. Verify that the expected result appears.
5. Open the result and confirm that the destination matches the intended item.

**Expected result**  
The relevant result appears for the search term, and selecting it opens the correct book or page.

**Why automate it?**  
As a content library grows, users need search to find information quickly. Search can fail in subtle ways—for example, results may not appear, a result may link to the wrong item, or a UI change may break the search flow. This test is quick to repeat and protects an important everyday user journey.

**Automation note**  
Use stable test data and assert the expected title and destination, rather than depending only on the number or position of search results.

---

## Why these three?

Together, the scenarios cover three different parts of the content workflow:

- **Create a book:** create the main container for documentation.
- **Create and verify a page:** add content and check that it persists.
- **Search for content:** retrieve information that already exists.

These are good automation candidates because they are user-facing, repeatable, and have clear pass/fail outcomes. They also provide useful regression coverage without making the suite unnecessarily large.

## Execution notes

- Confirm the demo's current login and permission requirements before running the tests.
- Use unique test data to avoid conflicts between runs.
- Keep assertions focused on visible outcomes and persisted content.
- Clean up test-created content when the environment and permissions allow it.
- Do not hard-code selectors based only on visual position; prefer accessible roles, labels, and stable attributes.

**Scope note:** These are proposed scenarios. Record actual results only after executing the tests against the live demo.
