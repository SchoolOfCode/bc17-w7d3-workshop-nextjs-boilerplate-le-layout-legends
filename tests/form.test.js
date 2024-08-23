import { test, expect } from "@playwright/test";

test("check if inputting for fullName and it's error works", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/booking");

  const fullName = await page.getByTestId("fullName");

  // Test 1, test if error shows for incorrect name

  await fullName.fill("A"); // 1 character should be invalid
  await fullName.blur();

  await expect(await fullName.inputValue()).toEqual("A");

  const fullNameError = page.locator(
    "text=Full name requires more than 3 characters"
  );

  // Assert that the error message is visible
  await expect(fullNameError).toBeVisible();
});

test("check if inputting for postCode and it's error works", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/booking");
  const postCode = await page.getByTestId("postCode");
  // Test 1, test if error shows for incorrect name

  await postCode.fill("NW2 888"); // Fake post code should be invalid
  await postCode.blur();

  expect(await postCode.inputValue()).toEqual("NW2 888");

  const postCodeError = page.locator(
    "text=Please enter a valid postcode"
  );

  // Assert that the error message is visible
  await expect(postCodeError).toBeVisible();
});


test("check review buttons visible, turns orange when country clicked and reviews are visible", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  const englandButton = await page.getByTestId("englandButton");
  await expect(englandButton).toBeVisible();
  await englandButton.click();
  await expect(englandButton).toHaveClass(/buttonActive/);
  const reviewText = await page.locator(
    "text=Outstanding craftsmanship and attention to detail. Our living room has never felt so cozy. Thank you, Fireplace Palace!"
  );
  await expect(reviewText).toBeVisible();
});