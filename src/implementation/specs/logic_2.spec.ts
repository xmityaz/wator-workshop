import {PetMap, EvolutionParams} from '../../types';
import {sharkStep} from '../logic';
import {aShark, aFish, getPopulation, getSharks} from './testUtils';

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

  describe('sharkStep', () => {
    it('should move to fish space if there is one in adjacent place', () => {
      const petMap: PetMap = [
        [null, null, null],
        [null, aShark(1, 10), aFish(1)],
        [null, null, null]
      ];

      const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[1][1]).toBe(null);
      expect(newPetMap[1][2]).toHaveProperty('energy');
    });

    it('should move to fish space if there is one in adjacent place from the edge (X)', () => {
      const petMap: PetMap = [
        [null, null, null],
        [aShark(1, 10), null, aFish(1)],
        [null, null, null]
      ];

      const newPetMap = sharkStep({x: 0, y: 1}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[1][0]).toBe(null);
      expect(newPetMap[1][2]).toHaveProperty('energy');
    });

    it('should move to fish space if there is one in adjacent place from the edge (Y)', () => {
      const petMap: PetMap = [
        [aFish(10), null, null],
        [null, null, null],
        [aShark(10, 10), null, null]
      ];

      const newPetMap = sharkStep({x: 0, y: 2}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[2][0]).toBe(null);
      expect(newPetMap[0][0]).toHaveProperty('energy');
    });

    it('should move to random neighbor space if there is no fish nearby', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);

      const petMap: PetMap = [
        [null, null, null],
        [null, aShark(10, 10), null],
        [null, null, null]
      ];

      const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[1][1]).toBe(null);
      expect(newPetMap[2][1]).toHaveProperty('energy');
      expect(getPopulation(newPetMap)).toBe(1);
    });

    it('should move to random neighbor space if all of them have fish', () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.8);

      const petMap: PetMap = [
        [null, aFish(10), null],
        [aFish(10), aShark(10, 10), aFish(10)],
        [null, aFish(10), null]
      ];

      const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[1][1]).toBe(null);

      expect(newPetMap[1][1]).toBe(null);
      expect(newPetMap[2][1]).toHaveProperty('energy');
      expect(getPopulation(newPetMap)).toBe(4);
    });

    it('should move to empty space if all adjacent places have been taken', () => {
      const petMap: PetMap = [
        [null, aShark(1, 1), null],
        [aShark(1, 1), aShark(5, 5), aShark(1, 1)],
        [null, aShark(1, 1), null]
      ];

      const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

      expect(newPetMap[1][1]?.reproduceCounter).toBeGreaterThanOrEqual(5);
      expect(getPopulation(newPetMap)).toBe(5);
    });

    describe('breeding', () => {
      it('should increase reproduceCounter after each move', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(10, 10), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(1);
        expect(getSharks(newPetMap)[0].reproduceCounter).toBe(11);
      });

      it('should leave new shark on previous position and clear reproduceCounter if it equals to sharkReproducingRate', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(100, 10), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(2);
        expect(newPetMap[1][1]).toEqual(aShark(0, evolutionParams.sharkMaxEnergy));
        expect(getSharks(newPetMap).every(shark => shark.reproduceCounter === 0)).toBeTruthy();
      });

      it('should leave new shark on previous position and clear reproduceCounter if it is bigger then fishReproducingRate', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(110, 10), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(2);
        expect(newPetMap[1][1]).toEqual(aShark(0, evolutionParams.sharkMaxEnergy));
        expect(getSharks(newPetMap).every(shark => shark.reproduceCounter === 0)).toBeTruthy();
      });

      it('should increase reproduceCounter even if not moved', () => {
        const petMap: PetMap = [
          [null, aShark(1, 1), null],
          [aShark(1, 1), aShark(5, 10), aShark(1, 1)],
          [null, aShark(1, 1), null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]?.reproduceCounter).toBe(6);
        expect(getPopulation(newPetMap)).toBe(5);
      });

      it('should not reproduce if shark can not move', () => {
        const petMap: PetMap = [
          [null, aShark(1, 1), null],
          [aShark(1, 1), aShark(100, 10), aShark(1, 1)],
          [null, aShark(1, 1), null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]?.reproduceCounter).toBe(101);
        expect(getPopulation(newPetMap)).toBe(5);
      });
    });

    describe('dying', () => {
      it('should decrease energy each step', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(10, 10), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(1);
        expect(getSharks(newPetMap)[0].energy).toBe(9);
      });

      it('shark should die if energy reach 0 on the current step', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(10, 1), null],
          [null, null, null]
        ];
        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(0);
      });

      it('shark should restore energy to maximum after eating a fish', () => {
        const petMap: PetMap = [
          [null, aFish(10), null],
          [null, aShark(10, 10), null],
          [null, null, null]
        ];
        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(1);
        expect(getSharks(newPetMap)[0].energy).toBe(evolutionParams.sharkMaxEnergy);
      });

      it('shark should not die after eating a fish', () => {
        const petMap: PetMap = [
          [null, aFish(10), null],
          [null, aShark(10, 1), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(getPopulation(newPetMap)).toBe(1);
        expect(getSharks(newPetMap)[0].energy).toBe(evolutionParams.sharkMaxEnergy);
      });

      it('should reproduce before starving to death', () => {
        const petMap: PetMap = [
          [null, null, null],
          [null, aShark(100, 1), null],
          [null, null, null]
        ];

        const newPetMap = sharkStep({x: 1, y: 1}, petMap, oceanSize, evolutionParams);

        expect(newPetMap[1][1]).toEqual(aShark(0, evolutionParams.sharkMaxEnergy));
        expect(getPopulation(newPetMap)).toBe(1);
      });
    });
  });
});
