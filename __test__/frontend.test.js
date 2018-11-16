const { getWelcomeData } = require("../public/js/dom");
// const { isUser, postDataToDb } = require("../public/js/dom_inputs");

test("Jest is working", () => {
  expect(1).toBe(1);
});

// describe("Tests get welcome data function", () => {
//   test("getWelcomeData is a function", () => {
//     console.log(getWelcomeData());
//     expect(typeof getWelcomeData).toBe("function");
//   });
//   // test("validateName returns a string", () => {
//   //   expect(typeof validateName("username")).toBe("string");
//   // });
//   // test("validateName does not register uppercase characters", () => {
//   //   expect(validateName("USERNAME")).toBe("username");
//   //   expect(validateName("uSeRnAmE")).toBe("username");
//   //   expect(validateName("UsErNaMe")).toBe("username");
//   // });
//   // test("validateName does not register spaces", () => {
//   //   expect(validateName("USER NAME")).toBe("username");
//   //   expect(validateName("uS eRn AmE")).toBe("username");
//   //   expect(validateName("   Us      ErNaMe      ")).toBe("username");
//   // });
// });
