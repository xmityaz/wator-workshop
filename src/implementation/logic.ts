import {Position, PetMap, InitialParams, EvolutionParams, OceanSize} from '../types';

// ******************************************************
// UTILS FUNCTIONS TO LEAVE IMPLEMENTED
// ******************************************************
const shuffleArr = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getRandomPosition = (positions: Position[]) => {
  return positions[Math.floor(Math.random() * positions.length)];
};

const getAdjacentPositions = ({x, y}: Position, oceanSize: {width: number; height: number}) => {
  const west = x === 0 ? {x: oceanSize.width - 1, y} : {x: x - 1, y};
  const east = x === oceanSize.width - 1 ? {x: 0, y} : {x: x + 1, y};
  const north = y === 0 ? {x, y: oceanSize.height - 1} : {x, y: y - 1};
  const south = y === oceanSize.height - 1 ? {x, y: 0} : {x, y: y + 1};

  return [west, east, north, south];
};
// ******************************************************

export const fishStep = (
  position: Position,
  petMap: PetMap,
  oceanSize: OceanSize,
  evolutionParams: EvolutionParams
) => {
  return petMap;
};

export const sharkStep = (
  position: Position,
  petMap: PetMap,
  oceanSize: OceanSize,
  evolutionParams: EvolutionParams
) => {
  return petMap;
};

export function initializePetMap(
  initialParams: InitialParams,
  evolutionParams: EvolutionParams,
  oceanSize: OceanSize
) {
  return [];
}

export const processDay = (petMap: PetMap, oceanSize: OceanSize, evolutionParams: EvolutionParams) => {
  // Use shuffleArr for positions, so the movement will be random
  return petMap;
};
