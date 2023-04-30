const { type, typeGroup, typeInfo, typeGroupInfo, reportTitles, ExpensesLibrary }  = require('./refactored')

/** TEST DATA */

const ExpensesTestData1 = () => [
  { type: 2, amount: 10.2 },
  { type: 3, amount: 16.0 },
];

const ExpensesTestData1Total = 26.2;
const ExpensesTestData1Meals = 26.2;
const ExpensesTestData1Rentals = 0;


const ExpensesTestData2 = () => [
  { type: 1, amount: 15.2 },
  { type: 1, amount: 28.1 },
  { type: 2, amount: 10.2 },
  { type: 2, amount: 25.2 },
  { type: 3, amount: 15.0 },
  { type: 3, amount: 100.5 },
  { type: 4, amount: 150.0 },
  { type: 4, amount: 175.5 },
];

const ExpensesTestData2Total = 519.7;
const ExpensesTestData2Meals = 194.2;
const ExpensesTestData2Rentals = 325.5;

const ExpensesTestData1And2Total = 545.9;

/** TESTS */


describe("Test getTotalExpense Function Exists", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData1());

  test("defines getTotalExpense()", () => {
    expect(typeof testExpensesLibrary.getTotalExpense).toBe("function");
  });
});


describe("Test Total Values", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData1());

  test("Test Calculation of Total Values", () => {
        expect(testExpensesLibrary.getTotalExpense()).toEqual(ExpensesTestData1Total);
  });
});

describe("Test Total Values With Second Input", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData2());

  test("Test Calculation of Total Values", () => {
        expect(testExpensesLibrary.getTotalExpense()).toEqual(ExpensesTestData2Total);
  });
});



describe("Test Total Meals", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData1());

  test("Calculation of Total Values", () => {
        expect(testExpensesLibrary.getExpenseGroupsTotals(1)).toEqual(ExpensesTestData1Meals);
  });
});

describe("Test Total Meals With Second Input", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData2());

  test("Calculation of Total Values", () => {
        expect(testExpensesLibrary.getExpenseGroupsTotals(1)).toEqual(ExpensesTestData2Meals);
  });
});

describe("Test Total Rentals", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData1());

  test("Calculation of Total Values", () => {
        expect(testExpensesLibrary.getExpenseGroupsTotals(2)).toEqual(ExpensesTestData1Rentals);
  });
});

describe("Test Total Rentals With Second Input", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData2());

  test("Calculation of Total Values", () => {
        expect(testExpensesLibrary.getExpenseGroupsTotals(2)).toEqual(ExpensesTestData2Rentals);
  });
});


describe("Test Total Value Add Additional Input", () => {
  const testExpensesLibrary = new ExpensesLibrary(ExpensesTestData1());
testExpensesLibrary.addMoreExpenses(ExpensesTestData2());
  test("Test  addMoreExpenses", () => {
        expect(testExpensesLibrary.getTotalExpense()).toEqual(ExpensesTestData1And2Total);
  });
});
