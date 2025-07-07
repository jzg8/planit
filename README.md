## PlanIT Technical Assessment

## Project Structure:
- /consts/ - Contains all the main consts for ease of access and modifying (and baseUrl for the project)
- /pages/ - Page Object Model classes for the base page, contact, home and shop pages
- /tests/ - Contains the test files (currently all being run in planit.spec.ts)
- package.json - Includes all the dependencies, and where I'd add scripts if this were a bigger project
- playwright.config.ts - Includes all Playwright level configuration like projects, reporters etc

### Test case 1:
1. From the home page go to contact page
2. Click submit button
3. Verify error messages
4. Populate mandatory fields
5. Validate errors are gone

### Test case 2:
1. From the home page go to contact page
2. Populate mandatory fields
3. Click submit button
4. Validate successful submission message
5. Note: Run this test 5 times to ensure 100% pass rate

### Test case 3:
1. Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
2. Go to the cart page
3. Verify the subtotal for each product is correct
4. Verify the price for each product
5. Verify that total = sum(sub totals)