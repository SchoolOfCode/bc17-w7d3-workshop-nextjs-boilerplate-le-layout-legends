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

test("check if submit button is disabled if any fields are empty", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/booking");
  const fullName = await page.getByTestId("fullName");

  // Test 1, test if error shows for incorrect name

  await fullName.fill("A"); // 1 character should be invalid
  await fullName.blur();

  await expect(await fullName.inputValue()).toEqual("A");

  // only fullName has text, all other fields are empty

  const submitButton = await page.getByTestId("button");

  expect(await submitButton.getAttribute("disabled")).toBe("") // disabled attribute should exist

})

test("check if submit button lets you click once all fields are not empty", async ({ page }) => {
  await page.goto("http://localhost:3000/booking");

  const fullName = await page.getByTestId("fullName");
  await fullName.fill("Arnold"); // 1 character should be invalid
  await fullName.blur();
  await expect(await fullName.inputValue()).toEqual("Arnold");

  const postCode = await page.getByTestId("postCode");
  await postCode.fill("SW1A 2AA");
  await postCode.blur();
  await expect(await postCode.inputValue()).toEqual("SW1A 2AA");

  const streetAddress = await page.getByTestId("streetAddress");
  await streetAddress.fill("123 Main Street");
  await streetAddress.blur();

  const city = await page.getByTestId("city");
  await city.fill("London");
  await city.blur();
  await expect(await city.inputValue()).toEqual("London");

  const phoneNumber = await page.getByTestId("phoneNumber");
  await phoneNumber.fill("88888888888");
  await phoneNumber.blur();
  await expect(await phoneNumber.inputValue()).toEqual("88888888888");

  const email = await page.getByTestId("email");
  await email.fill("example@example.com");
  await email.blur();
  await expect(await email.inputValue()).toEqual("example@example.com");

  const submitButton = await page.getByTestId("button");
  expect(await submitButton.getAttribute("disabled")).toBe(null) // // disabled attribute should NOT exist
});