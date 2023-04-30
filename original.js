'use strict'

// Task Description:
//
// - Refactor the code to a "more extensible & maintainable" state assuming the product will grow in complexity; in an "object-oriented" fashion. 
// - Optionally try to cover what you deem as the "core domain logic" with some tests. At least one testcase is necessary.
// - Take as much time as you need, but stop when you feel like you have demonstrated enough.
// - Please provide a runnable fork on replit.com or other online repls.
// - Wanna take it further? Fetch the input expenses from a remote API.
//
//
// Further Clarifications:
//
// - If there are ambiguities or unclarities, make the best decision on your own. We'll rely on your decisions on a daily basis!
// - There's no need for any kind of backward-compatibility. You can very well change the structure of the input object.
// - You may not simplify the problem space by e.g. removing non-meal expenses. However, you can of couse make it more challanging, 
//   for example by adding new types of expense. That is, at the minimum, the input must include both meal & "car rental" expenses.
// - We know that you can see others' code. If you choose to copycat ideas and code, that's your call.
// - Please remove this comment block in your own fork.
//
// Happy coding! 🍕
// --------------------------------------------------------------------------------------------------------


// Please add a short description of your refactoring rationale here within this code comment block:
// 
// 1. 
// 2. 
// --------------------------------------------------------------------------------------------------------


const type = { BREAKFAST: 1, LUNCH: 2, DINNER: 3 }

const Expenses = () => [
  { type: type.BREAKFAST, amount: 15.20 },
  { type: type.BREAKFAST, amount: 28.10 },
  { type: type.LUNCH, amount: 10.20 },
  { type: type.DINNER, amount: 16.00 },
  { type: type.DINNER, amount: 120.20 }
]
  ;; report(Expenses());;


function report(expenses) {
  var total = 0
  var mealExpenses = 0

  console.info("Today Travel Expenses " + new Date().toISOString().slice(0, 10))

  for (const expense of expenses) {
    if (expense.type == type.DINNER || expense.type == type.BREAKFAST) {
      mealExpenses += expense.amount
    }

    let expenseName = null

    switch (expense.type) {
      case type.DINNER:
        expenseName = "Dinner"
        break;
      case type.BREAKFAST:
        expenseName = "Breakfast"
        break;
      // NOTE: 
      // Please don't forget to account for "car rental" expenses, even though it's not part of the current input.
      case type.CAR_RENTAL:
        expenseName = "Car Rental"
        break;
    }

    const mealOverExpensesMarker = (
      (expense.type == type.DINNER && expense.amount > 100) ||
      (expense.type == type.LUNCH && expense.amount > 50) ||
      (expense.type == type.BREAKFAST && expense.amount > 20)
    ) ? "[over-expense!]" : " ";

    console.info(expenseName + "\t" + expense.amount + "eur" + "\t" + mealOverExpensesMarker)
    total += expense.amount
  }

  console.info("Meal expenses: " + mealExpenses + "eur")
  console.info("Total expenses: " + total + "eur")
}
