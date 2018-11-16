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
  test("validateName does not register spaces", () => {
    expect(validateName("USER NAME")).toBe("username");
    expect(validateName("uS eRn AmE")).toBe("username");
    expect(validateName("   Us      ErNaMe      ")).toBe("username");
  });
});

describe("Tests password validation function", () => {
  test("validatePwd is a function", () => {
    expect(typeof validatePwd).toBe("function");
  });
  test("validateName returns a string", () => {
    expect(typeof validatePwd("password")).toBe("string");
  });
  test("validatePwd does not register space at the end", () => {
    expect(validateName("password    ")).toBe("password");
    expect(validateName("password ")).toBe("password");
    expect(validateName(" password ")).toBe("password");
  });
});
