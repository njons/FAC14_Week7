const { validateName } = require("../src/handler");

// test("Jest is working", () => {
//   expect(1).toBe(1);
// });

describe("Tests name validation function", () => {
  test("validateName is a function", () => {
    expect(typeof validateName).toBe("function");
  });
  test("validateName returns a string", () => {
    expect(typeof validateName("username")).toBe("string");
  });
  test("validateName does not register uppercase characters", () => {
    expect(validateName("USERNAME")).toBe("username");
    expect(validateName("uSeRnAmE")).toBe("username");
    expect(validateName("UsErNaMe")).toBe("username");
  });
});
