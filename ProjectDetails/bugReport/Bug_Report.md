## Bug ID

BS-UI-001

## Bug Title

Typographical Error in the “Marketing Department” Book Title

## Application

- **Application:** BookStack Demo
- **URL:** https://demo.bookstackapp.com/
- **Area:** Home page → Recent Books
- **Test Type:** UI / Content Validation
- **Environment:** Web browser; record your browser and OS before submission
- **Severity:** Low
- **Priority:** Low
- **Status:** New — awaiting verification

## Preconditions

- The BookStack demo homepage is accessible.
- No login is required to view the Recent Books section.

## Steps to Reproduce

1. Open https://demo.bookstackapp.com/.
2. Locate the **Recent Books** section on the homepage.
3. Find the book titled **“Marketing Depertment.”**
4. Inspect the spelling of the book title.

## Expected Result

The title should use the correct spelling: **“Marketing Department”**, assuming that is the intended name.

## Actual Result

The homepage displays the title as **“Marketing Depertment.”**

## Impact

The misspelled title reduces content quality and professionalism and may make the demo data appear less polished. No functional impact has been established.

## Evidence

- **Page:** https://demo.bookstackapp.com/
- **Location:** Home page → Recent Books
- **Observed text:** `Marketing Depertment`
- **Screenshot:** Attach a screenshot showing the Recent Books section and the misspelled title.
- **Suggested filename:** `BS-UI-001-marketing-title-typo.png`

## Reproducibility

The title was visible on the publicly accessible homepage during research. Reopen the page and confirm it is still present before submitting this report.

## Notes / Limitations

This is a visible content defect, not proof of a functional defect in BookStack's software. The incorrect wording may be intentional or part of the demo's sample content. Confirm with the project reviewer whether sample-data/content defects qualify for the assignment. Do not describe this as a confirmed application-code bug without further evidence.

## References

- BookStack Demo: https://demo.bookstackapp.com/
- BookStack Documentation: https://www.bookstackapp.com/docs/
