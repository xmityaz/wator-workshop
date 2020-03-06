import {EvolutionParams, InitialParams} from '../../types';
import {initializePetMap} from '../logic';
import {getPopulation, getSharks, getFishes, getPets} from './testUtils';

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

  describe('initializePetMap', () => {
    it('should create correct number of shark and fish', () => {
      const initialParams: InitialParams = {fishNumber: 3, sharkNumber: 2};
      const petMap = initializePetMap(initialParams, evolutionParams, oceanSize);

      expect(getPopulation(petMap)).toBe(5);
      expect(getSharks(petMap)).toHaveLength(2);
      expect(getFishes(petMap)).toHaveLength(3);
    });

    it('should init all the pets with 0 reproduceCounter', () => {
      const initialParams: InitialParams = {fishNumber: 3, sharkNumber: 2};
      const petMap = initializePetMap(initialParams, evolutionParams, oceanSize);

      expect(getPets(petMap).every(pet => pet.reproduceCounter === 0)).toBeTruthy();
    });

    it('should init all sharks with max energy', () => {
      const initialParams: InitialParams = {fishNumber: 1, sharkNumber: 5};
      const petMap = initializePetMap(initialParams, evolutionParams, oceanSize);

      expect(getSharks(petMap).every(shark => shark.energy === evolutionParams.sharkMaxEnergy)).toBeTruthy();
    });
  });
});
