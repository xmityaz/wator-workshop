export type Fish = {reproduceCounter: number}; // 🐠
export type Shark = {reproduceCounter: number; energy: number}; // 🦈

export type Position = {x: number; y: number};
export type PetMap = (Fish | Shark | null)[][]; // PetMap[y][x] -> 🐠 | 🦈

export type OceanSize = {width: number; height: number};

export type InitialParams = {
  fishNumber: number; // Initial fish number
  sharkNumber: number; // Initial shark number
};

export type EvolutionParams = {
  fishReproducingRate: number; // Amount of cycles fish need to reproduce
  sharkReproducingRate: number; // Amount of cycles shark need to reproduce
  sharkMaxEnergy: number; // Amount of cycles shark can survive without a food

  gameSpeed: number; // The animation time frame in ms. The less number == faster speed
};
