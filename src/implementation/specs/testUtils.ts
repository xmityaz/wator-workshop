import {PetMap, Fish, Shark} from '../../types';

const isFish = (el: Fish | Shark | null) => {
  return !!el && !('energy' in el);
};

export function getPets(petMap: PetMap): (Fish | Shark)[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(pet => !!pet) as (Fish | Shark)[];
}

export function getPopulation(petMap: PetMap) {
  return getPets(petMap).length;
}

export function getSharks(petMap: PetMap): Shark[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(pet => pet && !isFish(pet)) as Shark[];
}

export function getFishes(petMap: PetMap): Fish[] {
  return petMap.reduce((acc, pet) => acc.concat(pet), []).filter(isFish) as Fish[];
}

export const aFish = (reproduceCounter: number): Fish => ({reproduceCounter});
export const aShark = (reproduceCounter: number, energy: number): Shark => ({reproduceCounter, energy});