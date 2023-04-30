# refactoringJavascriptCode
Simple example of refactoring legacy Javascript (Node.js) code to OOP, Typescript Code and Jest for testing.

1. Switch statement completely removed. Instead types are grouped by Meal and Rentals. Adding new types for those Meals or for those groups is possible. For example HOTEL_RENTAL can be added to types and total rental expenses can be calculated automatically. For Groups, Transportation, Consultancy expenses can be added as an example. No need to modify the Class for adding new type or groups.

2. getTotalExpense() and printExpenseGroupsTotals() are added to get total values for all expenses or individual groups.

3. mealOverExpensesMarker is removed, instead overExpensesMarker is introduced, this can be used for any type of expense as a marker for over expense notification. The limit for each expense is defined inside typeInfo constant, so no need to change hardcoded values as in original code. It is also optional, not set for Car rental expenses.

4. Car Rental expenses, and also any new expense group that will be added in the future, are shown on the report if there are any expenses in this group. In the previous code, Car Rental expenses were not shown.

5. Hard coded titles and currency moved to constants.

6. Adding another set of expenses input array made possible. Previous code was accepting only one set of input data. Now adding multiple data and getting/printing after addition is possible.

7. Printing total reports or individual parts are separated into different methods, can be used separately.

8. I added output parameter to save all output related data to the class. For example total expenses and group expenses and individual messages for expenses.

9. I tried to use private variables and methods for the Class but replit gave error when I added # character to make some of the methods private. Normally I would prefer making those methods, variables private : output, expenses, expense, initExpenses, generateOutput, setOutputProps,  setExpenseProps, setOverExpensesMarker
