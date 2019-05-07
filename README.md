This TP has been completed by Arthur PAMART (pamart_a).
Tahnk you for letting me go early this weekend and spend time withmy family.


# TP1 - Tic Tac Toe

In this workshop you will build a Tic Tac Toe game using React.

# Pre-requisites:

As soon as you have all of this installed, you can run the code from the application
at any moment by running `yarn start` (hint: look at `package.json` to see how that works)

You can choose to rush in the next steps straight away, but if you have not done it yet,
I strongly recommand that you take the time to look at all the files in the `src` directory,
and then read all the instructions.

Also, if you did not run `git init` yet, now is a good time to.

# Level 0 - Display

Look at `./src/layouts/GameInfo.js` and find a way for making its children render the informations from the state.

# Level 1 - Mouseover

Make the cells change style when they are rolled over by using `onMouseOver`, `onMouseOut` and `setState` in `./src/components/Cell.js`

_hint_: you might want to transform `Cell` from a functionnal Component into a Class Component to achieve this.

# Level 1.5 - Cell Content

Using props, make your cells display a `X`, a `O` or nothing based on the current game state.

_hint_: init your game state with Xs and Os to see if it is working.

# Level 2 - Turns

Using `onClick`, make your Cells change their content based on game state's `currentPlayer`.
A cell can only be clicked once, every time a cell is clicked `currentPlayer` must change.

# Level 3 - No Win No Fun

Use `getDerivedStateFromProps` to react to state changes and check if a player has won.

_hint_: [Tic Tac Toe](https://en.wikipedia.org/wiki/Tic-tac-toe)

# Bonii

* Implement a small AI to play with,
* Make the game use more rows and columns,
* use your imagination.
