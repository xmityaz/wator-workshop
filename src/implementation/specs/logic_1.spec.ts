import {PetMap, EvolutionParams} from '../../types';
import {fishStep} from '../logic';
import {aFish, getPopulation, getFishes} from './testUtils';

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

  describe('fishStep', () => {
    describe('moving', () => {
      it('should move to neighbor position', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.2);

        const petMap: PetMap = [
          [null, null, null],
          [null, aFish(43), null],
          [null, null, null]
        ];

        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toBe(null);
        expect(newPetMap[1][0]?.reproduceCounter).toBeGreaterThanOrEqual(43);
        expect(getPopulation(newPetMap)).toBe(1);
      });

      it('should move to the opposite site in case if on the edge (X)', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);

        const petMap: PetMap = [
          [null, null, null],
          [null, null, aFish(43)],
          [null, null, null]
        ];

        const newPetMap = fishStep({x: 2, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][2]).toBe(null);
        expect(newPetMap[1][0]?.reproduceCounter).toBeGreaterThanOrEqual(43);
        expect(getPopulation(newPetMap)).toBe(1);
      });

      it('should move to the opposite site in case if on the edge (Y)', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);

        const petMap: PetMap = [
          [null, aFish(43), null],
          [null, null, null],
          [null, null, null]
        ];

        const newPetMap = fishStep({x: 1, y: 0}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[0][1]).toBe(null);
        expect(newPetMap[2][1]?.reproduceCounter).toBeGreaterThanOrEqual(43);
        expect(getPopulation(newPetMap)).toBe(1);
      });

      it('should move to empty space if only one adjacent place is empty', () => {
        const petMap: PetMap = [
          [null, aFish(0), null],
          [null, aFish(43), aFish(0)],
          [null, aFish(0), null]
        ];

        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toBe(null);
        expect(newPetMap[1][0]?.reproduceCounter).toBeGreaterThanOrEqual(43);
      });

      it('should move to empty space if all adjacent places have been taken', () => {
        const petMap: PetMap = [
          [null, aFish(0), null],
          [aFish(0), aFish(43), aFish(0)],
          [null, aFish(0), null]
        ];

        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toBeTruthy();
        expect(newPetMap[1][1]?.reproduceCounter).toBeGreaterThanOrEqual(43);
      });
    });

    describe('breeding', () => {
      it('should increase reproduceCounter after each move', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aFish(10), null],
          [null, null, null]
        ];
        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(1);
        expect(getFishes(newPetMap)[0]).toEqual(aFish(11));
      });

      it('should leave new fish on previous position and clear reproduceCounter if it equals to fishReproducingRate', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aFish(100), null],
          [null, null, null]
        ];
        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toEqual(aFish(0));
        expect(getFishes(newPetMap).every(fish => fish.reproduceCounter === 0)).toBeTruthy();
        expect(getPopulation(newPetMap)).toBe(2);
      });

      it('should leave new fish on previous position and clear reproduceCounter if it is bigger then fishReproducingRate', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aFish(110), null],
          [null, null, null]
        ];
        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toEqual(aFish(0));
        expect(getFishes(newPetMap).every(fish => fish.reproduceCounter === 0)).toBeTruthy();
        expect(getPopulation(newPetMap)).toBe(2);
      });

      it('should not reproduce if fish can not move', () => {
        const petMap: PetMap = [
          [null, aFish(1), null],
          [aFish(1), aFish(100), aFish(1)],
          [null, aFish(1), null]
        ];
        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toEqual(aFish(101));
        expect(getPopulation(newPetMap)).toBe(5);
      });

      it('should increase reproduceCounter even if not moved', () => {
        const petMap: PetMap = [
          [null, aFish(3), null],
          [aFish(3), aFish(1), aFish(3)],
          [null, aFish(3), null]
        ];
        const newPetMap = fishStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toEqual(aFish(2));
        expect(getPopulation(newPetMap)).toBe(5);
      });
    });
  });
});
