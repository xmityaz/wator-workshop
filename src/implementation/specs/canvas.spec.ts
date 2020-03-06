import {drawPetMap, PET_SIZE} from '../canvas';
import {aFish, aShark} from './testUtils';

describe('canvas', () => {
  let canvas: HTMLCanvasElement;
  const oceanSize = {width: 3, height: 3};

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.height = oceanSize.height * PET_SIZE;
    canvas.width = oceanSize.width * PET_SIZE;
  });

  describe('drawPetMap', () => {
    it('case 1 ', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const petMap = [
        [null, aFish(1), null],
        [null, aFish(1), null],
        [null, aFish(1), null]
      ];

      drawPetMap(petMap, oceanSize, ctx);

      expect(ctx.__getDrawCalls()).toMatchSnapshot();
    });

    it('case 2', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const petMap = [
        [aFish(1), aShark(1, 1), aFish(1)],
        [aShark(1, 1), aFish(1), aShark(1, 1)],
        [aFish(1), aShark(1, 1), aFish(1)]
      ];

      drawPetMap(petMap, oceanSize, ctx);

      expect(ctx.__getDrawCalls()).toMatchSnapshot();
    });

    it('case 3', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const petMap = [
        [aShark(1, 1), aShark(1, 1), aShark(1, 1)],
        [aShark(1, 1), null, aShark(1, 1)],
        [null, aShark(1, 1), null]
      ];

      drawPetMap(petMap, oceanSize, ctx);

      expect(ctx.__getDrawCalls()).toMatchSnapshot();
    });

    it('case 4', () => {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const petMap = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];

      drawPetMap(petMap, oceanSize, ctx);

      expect(ctx.__getDrawCalls()).toMatchSnapshot();
    });
  });
});
