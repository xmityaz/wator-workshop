## Prerequisites

#### Clone and install

1. `git clone git@github.com:xmityaz/wator-workshop.git`
2. `npm i`

#### Start wallaby (recommended)

Using wallaby will make implementation much easier for the most part

Wallaby is already pre-configured inside this project, all you have to do is start it.

## General instruction

- TDD. The best kind of it. All the tests already in place, all you need to do - make them green
- Work in pairs/alone
- Complete each task/step before moving to next one!

## WaTor

I recommend you to go through [this little explorable](https://explorewator.com/) to understand the idea. The last page there is going to be the final result of this workshop.



[Wa-Tor](https://en.wikipedia.org/wiki/Wa-Tor) is a population dynamics simulation with 2 species - prey 🐠 and predator 🦈.

The world of wator is in a shape of ... tor. It looks like a doughnut 🍩 as a 3D shape, but our wator world is two-dimensional - a rectangle with connected edges. If a creature moves past the edge of the grid, it reappears on the opposite side. You may recall this behavior from the snake game on the old NOKIA phone.

The time passes in wator in discrete jumps, we will call them days.

The inhabitants of this world are Fish and Shark. Both of them have specific set of rules which action they might and should do after each day passed.

#### Daily rules for FISH

- At each day fish moves randomly to one of the adjacent unoccupied spaces. If there is no free space, no movement takes place
- Once a fish has survived a certain number of days it may reproduce. Reproduction is done by leaving a new fish in the old position. The reproduction counter is set to 0 after that
- If fish can not move at current day it waits until the next time it can get an empty space around (the reproduction counter is not resetting)

#### Daily rules for SHARK

- At each day shark moves randomly to one of the adjacent space occupied by fish. If there is no fish around it follows the same rules as a fish - random free space, avoiding its fellow shark
- Each day shark loses a unit of energy.
- When the shark energy is 0 - it dies
- If shark moves to square occupied by fish it restore the energy back to the maximum.
- The same rules for reproduction applies to the shark as they were for fish

## Task

This workshop consists of 3 parts:

1.  Implement the logic for WaTor simulation
2.  Visualize the simulation on the canvas
3.  Find the life-balance on freshly created world. Adjust the controls in a way that both fish and shark populations will never die.

There is already some prepared code - Controls and DOM components written in React. All the boring stuff you usually do in day-to-day work.

All the code we gonna write today is inside the `/src/implementation` folder:

- `logic.ts` - for task 1.
- `canvas.ts` - for task 2.

There are also predefined types in `src/types.ts`. Check them out before start working on the tasks

Lets go through each task in more details

#### TASK #1

Open `src/implementation/logic.ts`

Add implementation for functions so they will satisfy the tests step by step:

- `fishStep` | Tests inside the `src/implementation/specs/logic_1`
- `sharkStep` | Tests inside the `src/implementation/specs/logic_2`
- `initializePetMap` | Tests inside the `src/implementation/specs/logic_3`
- `processDay` | Tests inside the `src/implementation/specs/logic_3`. This one is tricky. The world is a chaotic place, but the two-dimensional arrays are not. Use `shuffleArr` util to randomize movement order.

Use `getAdjacentPositions` and `getRandomPosition` util functions to make a decision on where to move. There is randomness in movement, so having these utils in advance makes it possible to mock this randomness in specs

#### TASK #2

Now, when we already have the logic, we want to represent it visually.
It shall be done by implementing functions which work with <canvas /> 2D context.

Fortunately the connection between controls and canvas element already in place inside `App`, `Ocean` and `Controls` react components.

Open `src/implementation/canvas.ts`

implement `drawPetMap` function. It accepts 2-dimensional array with fish and sharks - `petMap`, `oceanSize` and canvas context `ctx`.

Use the canvas [drawing rectangles methods](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) to clear the previous day and draw the current one. Each pet should be represented as a rectangle with `PET_SIZE`px in size and `FISH_COLOR` and `SHARK_COLOR` as color accordingly.

#### TASK #3

This task is the most fun - no code needed, just play around the game you've just created.
