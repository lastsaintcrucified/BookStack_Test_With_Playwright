# BookStack Demo: Functional Test Cases

**Feature under test:** Book creation and editing (create, edit, tag, add a cover image, delete)  
**Application:** BookStack demo site, https://demo.bookstackapp.com  
**Test type:** Manual functional testing  
**Total test cases:** 26

## 1. Why this feature

A book is the main container for content in BookStack (shelves hold books, books hold chapters and pages). Creating and editing a book touches required input, optional input, length limits, file upload, tags and permissions, so it gives good coverage of all four test types asked for: positive, negative, boundary value and edge case.

## 2. Scope

**In scope:** the Create Book and Edit Book forms (name, description, tags, cover image), creating a book from inside a shelf, search for a new book, delete and cancel actions, and basic permission checks as a guest.

**Out of scope:** chapters and pages, the page editor, user and role administration, the REST API, performance and load testing.

## 3. Validation rules used for boundary tests

These come from the public API documentation at https://demo.bookstackapp.com/api/docs. The Create Book form is expected to follow the same rules, but this must be confirmed during execution.

| Field                  | Documented rule                                                     |
| ---------------------- | ------------------------------------------------------------------- |
| Book name (create)     | required, string, max 255                                           |
| Book name (edit)       | string, min 1, max 255                                              |
| Description            | string, max 1900                                                    |
| Description (HTML)     | string, max 2000                                                    |
| Tag name and tag value | max 255 assumed, not confirmed in the documentation (marked verify) |

The description has two documented limits (1900 for plain text, 2000 for the HTML version). The form may enforce either one, so TC-B08 asks the tester to record which limit actually applies.

## 4. Environment and setup

- Site: https://demo.bookstackapp.com
- Login: use the demo admin details shown in the "Try Out BookStack" section of https://www.bookstackapp.com. Do not change the demo account's email or password.
- The demo database and image storage reset automatically about every 30 minutes, so data created in one test can disappear. Run dependent tests together (for example TC-P01, TC-P06, TC-P08 and TC-P11) inside one 30-minute window, and take a screenshot of each result when you run it.
- The demo restricts some actions. If an action is blocked by the demo, mark the test as Blocked and write down the message shown.
- The demo is public. Use harmless test data only and no personal information.
- Record browser, operating system and test date in the Execution Log (section 9).

### Test data helpers

Boundary tests need strings of an exact length. Generate them in the browser console (press F12, open Console) and copy the output:

```js
copy("A".repeat(255)); // 255 characters, copied to the clipboard
```

Files needed for the cover image tests (create or download them before starting):

| File                    | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `cover-valid.jpg`       | JPG, about 200 KB, 800x600                     |
| `cover-valid.png`       | PNG, about 200 KB, 800x600                     |
| `document.pdf`          | Any small PDF                                  |
| `fake.jpg`              | A plain text file renamed to .jpg              |
| `cover-oversized.jpg`   | An image of about 25 MB                        |
| `cover-1x1.png`         | PNG of 1x1 pixel                               |
| `cover-8000x6000.jpg`   | Large-dimension JPG, kept under the size limit |
| `cover-transparent.png` | PNG with a transparent background              |

## 5. Summary

| Test type              | Test cases | Passed | Failed | Blocked | Not executed |
| ---------------------- | ---------- | ------ | ------ | ------- | ------------ |
| Positive Testing       | 8          | 0      | 0      | 0       | 8            |
| Negative Testing       | 8          | 0      | 0      | 0       | 8            |
| Boundary Value Testing | 5          | 0      | 0      | 0       | 5            |
| Edge Case Testing      | 5          | 0      | 0      | 0       | 5            |
| **Total**              | **26**     | **0**  | **0**  | **0**   | **26**       |

Update this table after execution.

## 6. How to read the test case tables

- **Steps** assume you are logged in as the demo admin unless the scenario says otherwise. Button and menu names (for example "Create New Book" or "Save Book") are written from memory of the interface and may differ slightly on the live site. Correct them as you go.
- **Expected Result** is what should happen. Where the exact behavior is not confirmed, the text says _verify_.
- **Actual Result** and **Status** are filled in during execution. Status values: Pass, Fail, Blocked, Not Executed.

## 7. Test cases

### 7.1 Positive Testing (8)

Valid input and normal use. Everything should work.

| ID     | Scenario                                      | Steps                                                                                                                                                              | Test Data                                                                  | Expected Result                                                                                                                           | Actual Result | Status       |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------ |
| TC-P01 | Create a book with a valid name only          | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Click "Save Book"                                     | Name: `QA Test Book 01`                                                    | Book is created and the new book page opens. The name is shown, a success notification appears, and the book is listed on the Books page. | &nbsp;        | Not Executed |
| TC-P02 | Create a book with a name and a description   | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Enter the description<br>5. Click "Save Book"         | Name: `QA Test Book 02`<br>Description: `A short description for testing.` | Book is created and the description is displayed on the book page.                                                                        | &nbsp;        | Not Executed |
| TC-P03 | Create a book with tags                       | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Add two tags (name and value)<br>5. Click "Save Book" | Name: `QA Test Book 03`<br>Tags: `env`=`qa`, `type`=`demo`                 | Book is created and both tags are displayed on the book page.                                                                             | &nbsp;        | Not Executed |
| TC-P04 | Create a book with a JPG cover image          | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Upload the cover image<br>5. Click "Save Book"        | Name: `QA Test Book 04`<br>File: `cover-valid.jpg` (about 200 KB, 800x600) | Book is created and the cover image is displayed on the book page and in the Books list.                                                  | &nbsp;        | Not Executed |
| TC-P05 | Create a book with a PNG cover image          | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Upload the cover image<br>5. Click "Save Book"        | Name: `QA Test Book 05`<br>File: `cover-valid.png` (about 200 KB, 800x600) | Book is created and the cover image is displayed correctly.                                                                               | &nbsp;        | Not Executed |
| TC-P06 | Edit the name of an existing book             | 1. Open the book created in TC-P01<br>2. Click "Edit"<br>3. Change the name<br>4. Click "Save Book"                                                                | New name: `QA Test Book 01 Renamed`                                        | The name is updated on the book page and in the Books list. Record whether the URL slug also changes.                                     | &nbsp;        | Not Executed |
| TC-P07 | Edit the description of an existing book      | 1. Open the book created in TC-P02<br>2. Click "Edit"<br>3. Change the description<br>4. Click "Save Book"                                                         | New description: `Updated description text.`                               | The new description is saved and displayed.                                                                                               | &nbsp;        | Not Executed |
| TC-P08 | Add and then remove a tag on an existing book | 1. Open the book created in TC-P01<br>2. Click "Edit"<br>3. Add a tag and save<br>4. Open Edit again, remove the tag and save                                      | Tag: `status`=`draft`                                                      | The tag appears after the first save and is gone after the second save.                                                                   | &nbsp;        | Not Executed |

### 7.2 Negative Testing (8)

Invalid input, missing data, and actions that should be blocked.

| ID     | Scenario                                              | Steps                                                                                                                                                                         | Test Data                                                               | Expected Result                                                                                                | Actual Result | Status       |
| ------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------- | ------------ |
| TC-N01 | Create a book with an empty name                      | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Leave the name empty<br>4. Click "Save Book"                                          | Name: (empty)                                                           | A validation error is shown for the name field and no book is created. Other entered data is kept in the form. | &nbsp;        | Not Executed |
| TC-N02 | Create a book with a whitespace-only name             | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter spaces only in the name<br>4. Click "Save Book"                                 | Name: five space characters                                             | Treated as empty: a validation error is shown and no book is created (verify).                                 | &nbsp;        | Not Executed |
| TC-N03 | Cancel book creation                                  | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name<br>4. Click "Cancel"                                                     | Name: `Cancelled Book`                                                  | The user returns to the previous page and no book is created.                                                  | &nbsp;        | Not Executed |
| TC-N04 | Upload a PDF as the cover image                       | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name<br>4. Select a PDF file as the cover image<br>5. Click "Save Book"       | File: `document.pdf`                                                    | The upload is rejected with an error about the file type. No invalid cover is stored.                          | &nbsp;        | Not Executed |
| TC-N05 | Upload a text file renamed to .jpg as the cover image | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name<br>4. Select the renamed file as the cover image<br>5. Click "Save Book" | File: `fake.jpg` (plain text content)                                   | The file is rejected as an invalid image, or handled safely. No broken image is shown (verify).                | &nbsp;        | Not Executed |
| TC-N06 | Upload an oversized cover image                       | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name<br>4. Select a very large image file<br>5. Click "Save Book"             | File: image of about 25 MB (the exact limit depends on server settings) | The upload is rejected with a clear message. No server error page is shown.                                    | &nbsp;        | Not Executed |
| TC-N07 | Clear the name of an existing book                    | 1. Open an existing book<br>2. Click "Edit"<br>3. Delete the whole name<br>4. Click "Save Book"                                                                               | Name: (empty)                                                           | A validation error is shown. The original name is unchanged.                                                   | &nbsp;        | Not Executed |
| TC-N08 | Add a tag that has a value but no name                | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name<br>4. Add a tag row with only a value<br>5. Click "Save Book"            | Tag name: (empty)<br>Tag value: `orphan`                                | Document the behavior: the row is ignored or a validation error is shown. No server error (verify).            | &nbsp;        | Not Executed |

### 7.3 Boundary Value Testing (5)

Values at, just below and just above each documented limit.

| ID     | Scenario                                 | Steps                                                                                                                                                        | Test Data            | Expected Result                                                                             | Actual Result | Status       |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------- | ------------- | ------------ |
| TC-B01 | Name length 1 (minimum valid)            | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a one-character name<br>4. Click "Save Book"                   | Name: `A`            | Book is created and displayed correctly.                                                    | &nbsp;        | Not Executed |
| TC-B02 | Name length 254 (just below the maximum) | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Paste a 254-character name<br>4. Click "Save Book"                   | Name: 254 x `A`      | Book is created and displayed correctly.                                                    | &nbsp;        | Not Executed |
| TC-B03 | Name length 255 (maximum)                | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Paste a 255-character name<br>4. Click "Save Book"                   | Name: 255 x `A`      | Book is created. Check the book page, the Books list and the URL slug for display problems. | &nbsp;        | Not Executed |
| TC-B04 | Name length 256 (just above the maximum) | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Paste a 256-character name<br>4. Click "Save Book"                   | Name: 256 x `A`      | A validation error says the name is too long (limit 255). No book is created.               | &nbsp;        | Not Executed |
| TC-B05 | Description empty (optional field)       | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter a name and leave the description empty<br>4. Click "Save Book" | Description: (empty) | Book is created without a description.                                                      | &nbsp;        | Not Executed |

### 7.4 Edge Case Testing (5)

Unusual but possible input and behavior.

| ID     | Scenario                                | Steps                                                                                                                                                | Test Data                                       | Expected Result                                                                           | Actual Result | Status       |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------- | ------------ |
| TC-E01 | Bengali (Unicode) text in the name      | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Click "Save Book"                       | Name: `বাংলা পরীক্ষা বই`                        | Book is saved. The name displays correctly everywhere, and the book page URL opens.       | &nbsp;        | Not Executed |
| TC-E02 | Emoji in the name                       | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Click "Save Book"                       | Name: `Test Book 📚`                            | Book is saved and displayed correctly, or rejected with a clear message. No server error. | &nbsp;        | Not Executed |
| TC-E03 | Right-to-left (Arabic) text in the name | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Click "Save Book"                       | Name: `كتاب اختبار`                             | Book is saved and displayed correctly.                                                    | &nbsp;        | Not Executed |
| TC-E04 | Leading and trailing spaces in the name | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name with spaces around it<br>4. Click "Save Book" | Name: three spaces, `Spaced Name`, three spaces | Book is created. Record whether the spaces are trimmed.                                   | &nbsp;        | Not Executed |
| TC-E05 | HTML tags in the name                   | 1. Log in as the demo admin and open the Books page<br>2. Click "Create New Book"<br>3. Enter the name<br>4. Click "Save Book"                       | Name: `<b>Bold Name</b>`                        | The tags are shown as literal text and are not rendered as bold.                          | &nbsp;        | Not Executed |

## 8. Defect report template

Use this for every test marked Fail.

| Field               | Content                                    |
| ------------------- | ------------------------------------------ |
| Defect ID           | BUG-001                                    |
| Related test case   | TC-xxx                                     |
| Title               | Short description of the problem           |
| Environment         | Browser, OS, date and time                 |
| Steps to reproduce  | Numbered steps                             |
| Expected result     | What should have happened                  |
| Actual result       | What happened                              |
| Severity / Priority | Critical, Major, Minor / High, Medium, Low |
| Evidence            | Screenshot or recording file name          |

## 9. Execution log

| Item                                               | Value |
| -------------------------------------------------- | ----- |
| Tester                                             |       |
| Test date                                          |       |
| Browser and version                                |       |
| Operating system                                   |       |
| Notes (for example demo resets or blocked actions) |       |
