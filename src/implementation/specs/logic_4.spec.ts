import {PetMap, Fish, Shark, EvolutionParams} from '../../types';
import {processDay} from '../logic';

const isFish = (el: Fish | Shark | null) => {
  return !!el && !('energy' in el);
};

function getPets(petMap: PetMap): (Fish | Shark)[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(pet => !!pet) as (Fish | Shark)[];
}

function getPopulation(petMap: PetMap) {
  return getPets(petMap).length;
}

function getSharks(petMap: PetMap): Shark[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(pet => pet && !isFish(pet)) as Shark[];
}

function getFishes(petMap: PetMap): Fish[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(isFish) as Fish[];
}

const aFish = (reproduceCounter: number): Fish => ({reproduceCounter});
const aShark = (reproduceCounter: number, energy: number): Shark => ({reproduceCounter, energy});

describe('logic', () => {
  afterEach(() => {
    if ('mockRestore' in global.Math.random) {
      (global.Math.random as any).mockRestore();
    }
  });

  const oceanSize = {width: 3, height: 3};

  const evolutionParams: EvolutionParams = {
    fishReproducingRate: 100,
    sharkReproducingRate: 100,
    sharkMaxEnergy: 10,
    gameSpeed: 10
  };

  describe('processDay', () => {
    it('case 1', () => {
      const petMap: PetMap = [
        [aShark(5, 5), aFish(0), aShark(5, 5)],
        [aShark(5, 5), aFish(0), aShark(5, 5)],
        [aShark(5, 5), aFish(0), aShark(5, 5)]
      ];

      const newPetMap = processDay(petMap, oceanSize, evolutionParams);

      expect(getPopulation(newPetMap)).toBe(6);
      expect(getSharks(newPetMap)).toHaveLength(6);
      expect(getFishes(newPetMap)).toHaveLength(0);
    });

    it('case 2', () => {
      const petMap: PetMap = [
        [null, null, null],
        [aFish(101), aFish(120), aFish(100)],
        [null, null, null]
      ];

      const newPetMap = processDay(petMap, oceanSize, evolutionParams);

      expect(getPopulation(newPetMap)).toBe(6);
      expect(getSharks(newPetMap)).toHaveLength(0);
      expect(getFishes(newPetMap)).toHaveLength(6);
    });

    it('case 3', () => {
      const petMap: PetMap = [
        [aShark(5, 5), aFish(1), aFish(1)],
        [aFish(1), aFish(1), aFish(1)],
        [aFish(1), aFish(1), aFish(1)]
      ];

      const newPetMap = processDay(petMap, oceanSize, evolutionParams);

      expect(getPopulation(newPetMap)).toBe(8);
      expect(getSharks(newPetMap)).toHaveLength(1);
      expect(getFishes(newPetMap)).toHaveLength(7);
    });

    it('case 4', () => {
      const petMap: PetMap = [
        [aFish(1), aFish(1), aShark(5, 4)],
        [aFish(1), aShark(5, 5), aFish(1)],
        [aShark(5, 3), aFish(1), aFish(1)]
      ];

      const newPetMap = processDay(petMap, oceanSize, evolutionParams);

      expect(getPopulation(newPetMap)).toBe(6);
      expect(getSharks(newPetMap)).toHaveLength(3);
      expect(getFishes(newPetMap)).toHaveLength(3);
    });
  });
});
