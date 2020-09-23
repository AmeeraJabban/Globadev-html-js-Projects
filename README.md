# Welcome !

This **repository** includes a set of projects that I have implemented during my training period with  **GlobaDev**:


# projects Titles

 1. Guess the Random Number Game.
 2. Simple Calculator.
 3. Cards Game.
 4. Accounting Journal Screen.

>### Guess the Random Number Game

when user click on button start, generate random number between 1 and 100, then the user can input a number in a text box and click button, you should show a message (larger, less) or if it is equal the user win the game, the user has only 10 trials or he fails.

>### Simple Calculator

Create interface for calculator.
create 2 classes in JavaScript, one to handle events from UI and second as calculator engine.
each button should function in UI class. the function should take the number from data-number attribute and added to a variable in the UI class to format the full number. then display the number on display div
when user click equal button it should supply the engine class with first number and operator and second number then return the result and the UI class will show it on display div  

>### Cards Game

The game has two players, the cards are divided equals between them as two piles of cards , all cards are covered.  
when first player clicks on his pile. the last card is drawn and thrown on the ground (the center). then second player click on his pile the last card is drawn and thrown on ground above first player card.  
when any player throw a card and its number is similar to the last card on ground he takes all cards on ground and added to his pile. the first player finish his cards wins.

>### Accounting Journal Screen

We need to create Accounting journal screen,  
create project with following folder structure :  
- Index.html  
- ---- app\main.js  
- ---- styles\style.css  
use Bootstrap and JQuery and JQuery controls if needed.

the first screen has master data and details data, as in the picture,  
when clicking on (Add Journal) , it will show modal window, as in the second screen. when click ok it will add record to the grid.  
when click on Edit next to each record. show the modal filled with data.  
when click on delete next to each record. remove record from grid

when add or edit or delete change summaries under the grid, balance is credit - dept

when click save under the grid. save the form data (master/details) to JavaScript object then show message or label saying (Voucher saved) . when click delete show confirmation message (are you sure ) then clean every thing (reset the form) and show message or label (voucher deleted) . when click post. save the data then disable all buttons. and show the word (Posted) on top right of screen.

