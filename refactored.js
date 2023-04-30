"use strict";
const type = { BREAKFAST: 1, LUNCH: 2, DINNER: 3, CAR_RENTAL: 4 };
const typeGroup = { MEAL: 1, RENTAL: 2 };
const typeInfo = {
    1: { group: typeGroup.MEAL, name: "Breakfast", overExpenseLimit: 20 },
    2: { group: typeGroup.MEAL, name: "Lunch", overExpenseLimit: 50 },
    3: { group: typeGroup.MEAL, name: "Dinner", overExpenseLimit: 100 },
    4: { group: typeGroup.RENTAL, name: "Car Rental" },
};
const typeGroupInfo = {
    1: { name: "Meal expenses" },
    2: { name: "Rental expenses" },
};
const reportTitles = {
    TODAY: "Today Travel Expenses ",
    TOTAL: "Total expenses: ",
};
const Expenses = () => [
    { type: 1, amount: 15.2 },
    { type: 1, amount: 28.1 },
    { type: 2, amount: 10.2 },
    { type: 3, amount: 16.0 },
    { type: 3, amount: 120.2 },
];
class ExpensesLibrary {
    constructor(expenses) {
        this.output = { totalExpenses: 0, groupExpenses: [], messages: [] };
        this.expenses = [];
        this.expense = {
            type: 0,
            amount: 0,
            name: "",
            overExpensesMarker: "",
        };
        this.currency = "eur";
        this.initExpenses(expenses);
    }
    printReport() {
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
        console.info(reportTitles.TOTAL + this.output.totalExpenses + this.currency);
    }
    getTotalExpense() {
        return this.output.totalExpenses;
    }
    getExpenseGroupsTotals(groud_id = null) {
        if (groud_id === null)
            return this.output.groupExpenses;
        else
            return this.output.groupExpenses[groud_id];
    }
    getTodayDate() {
        return new Date().toISOString().slice(0, 10);
    }
    initExpenses(expenses) {
        this.expenses = expenses;
        this.resetOutput();
        this.generateOutput();
    }
    addMoreExpenses(expenses) {
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
        this.output.messages.push(this.expense.name +
            "\t" +
            this.expense.amount +
            this.currency +
            "\t" +
            this.expense.overExpensesMarker);
    }
    setOverExpensesMarker() {
        if (typeInfo[this.expense.type].overExpenseLimit &&
            this.expense.amount > typeInfo[this.expense.type].overExpenseLimit)
            return "[over-expense!]";
        else
            return "";
    }
}
const myExpenses = new ExpensesLibrary(Expenses());
myExpenses.printReport();

module.exports = {
    type,
    typeGroup,
    typeInfo,
    typeGroupInfo,
    reportTitles,
    ExpensesLibrary,
};
