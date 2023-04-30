"use strict";

const type = { BREAKFAST: 1, LUNCH: 2, DINNER: 3, CAR_RENTAL: 4 };
const typeGroup = { MEAL: 1, RENTAL: 2 };
const typeInfo: Record<string, any> = {
  1: { group: typeGroup.MEAL, name: "Breakfast", overExpenseLimit: 20 },
  2: { group: typeGroup.MEAL, name: "Lunch", overExpenseLimit: 50 },
  3: { group: typeGroup.MEAL, name: "Dinner", overExpenseLimit: 100 },
  4: { group: typeGroup.RENTAL, name: "Car Rental" },
};

const typeGroupInfo: Record<string, any> = {
  1: { name: "Meal expenses" },
  2: { name: "Rental expenses" },
};

const reportTitles = {
  TODAY: "Today Travel Expenses ",
  TOTAL: "Total expenses: ",
};

const Expenses = () => [
  { type: type.BREAKFAST, amount: 15.2 },
  { type: type.BREAKFAST, amount: 28.1 },
  { type: type.LUNCH, amount: 10.2 },
  { type: type.DINNER, amount: 16.0 },
  { type: type.DINNER, amount: 120.2 },
];

interface outputType {
  totalExpenses: number;
  groupExpenses: Array<number>;
  messages: Array<string>;
}

interface expenseType {
  type: number;
  amount: number;
  name: string;
  overExpensesMarker: string;
}

class ExpensesLibrary {
  output: outputType = { totalExpenses: 0, groupExpenses: [], messages: [] };
  expenses = [];
  expense: expenseType = {
    type: 0,
    amount: 0,
    name: "",
    overExpensesMarker: "",
  };
  currency = "eur";

  constructor(expenses: any) {
    this.initExpenses(expenses);
  }

  printReport(): void {
    this.printTodayTitle();
    this.printExpenses();
    this.printExpenseGroupsTotals();
    this.printTotalExpenses();
  }

  printTodayTitle() {
    console.info(reportTitles.TODAY + this.getTodayDate());
  }

  printExpenses() {
    this.output.messages.forEach((msg) => {
      console.info(msg);
    });
  }

  printExpenseGroupsTotals() {
    this.output.groupExpenses.forEach((value, index) => {
      if (value > 0)
        console.info(typeGroupInfo[index].name + " : " + value + this.currency);
    });
  }

  printTotalExpenses() {
    console.info(
      reportTitles.TOTAL + this.output.totalExpenses + this.currency
    );
  }

  getTotalExpense() {
    return this.output.totalExpenses;
  }

  getExpenseGroupsTotals(groud_id = null) {
    if (groud_id === null) return this.output.groupExpenses;
    else return this.output.groupExpenses[groud_id];
  }

  getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  initExpenses(expenses: any) {
    this.expenses = expenses;
    this.resetOutput();
    this.generateOutput();
  }

  addMoreExpenses(expenses: any) {
    this.expenses = expenses;
    this.generateOutput();
  }

  generateOutput() {
    this.expenses.forEach((expense) => {
      this.expense = expense;
      this.setExpenseProps();
      this.setOutputProps();
    });
  }

  resetOutput() {
    this.output.messages = [];
    this.output.totalExpenses = 0;
    this.output.groupExpenses = [];
    Object.values(typeGroup).forEach((group) => {
      this.output.groupExpenses[group] = 0;
    });
  }

  setExpenseProps() {
    this.expense.name = typeInfo[this.expense.type].name;
    this.expense.overExpensesMarker = this.setOverExpensesMarker();
  }

  setOutputProps() {
    this.output.totalExpenses += this.expense.amount;
    this.output.groupExpenses[typeInfo[this.expense.type].group] +=
      this.expense.amount;
    this.output.messages.push(
      this.expense.name +
        "\t" +
        this.expense.amount +
        this.currency +
        "\t" +
        this.expense.overExpensesMarker
    );
  }

  setOverExpensesMarker() {
    if (
      typeInfo[this.expense.type].overExpenseLimit &&
      this.expense.amount > typeInfo[this.expense.type].overExpenseLimit
    )
      return "[over-expense!]";
    else return "";
  }
}

const myExpenses = new ExpensesLibrary(Expenses());

myExpenses.printReport();

declare var module: any;
module.exports = {
  type,
  typeGroup,
  typeInfo,
  typeGroupInfo,
  reportTitles,
  ExpensesLibrary,
};
