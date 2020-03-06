import React from 'react';
import {PetMap, OceanSize, EvolutionParams} from '../../types';
import {processDay} from '../../implementation/logic';
import './Ocean.css';
import {PET_SIZE, drawPetMap} from '../../implementation/canvas';

export type OceanProps = {
  initialPetMap: PetMap;
  oceanSize: OceanSize;
  evolutionParams: EvolutionParams;
};

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export class Ocean extends React.PureComponent<OceanProps> {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  petMap: PetMap;
  gameLoop: any;

  liveDay = () => {
    this.petMap = processDay(this.petMap, this.props.oceanSize, this.props.evolutionParams);
    drawPetMap(this.petMap, this.props.oceanSize, this.ctx);
  };

  initCanvas = (el: HTMLCanvasElement) => {
    this.canvas = el;
    this.ctx = el.getContext('2d') as CanvasRenderingContext2D;

    this.startGameLoop();
  };

  startGameLoop = () => {
    clearInterval(this.gameLoop);
    this.gameLoop = setInterval(
      () => requestAnimationFrame(this.liveDay),
      this.props.evolutionParams.gameSpeed
    );
  };

  constructor(props: OceanProps) {
    super(props);
    this.petMap = cloneDeep(this.props.initialPetMap);
  }

  componentDidUpdate(prevProps: OceanProps) {
    if (this.props.initialPetMap !== prevProps.initialPetMap) {
      this.petMap = this.props.initialPetMap;
    }

    if (this.props.evolutionParams.gameSpeed !== prevProps.evolutionParams.gameSpeed) {
      this.startGameLoop();
    }
  }

  componentWillUnmount() {
    clearInterval(this.gameLoop);
  }

  render() {
    const {oceanSize} = this.props;

    return (
      <canvas
        className="ocean"
        ref={this.initCanvas}
        width={PET_SIZE * oceanSize.width}
        height={PET_SIZE * oceanSize.height}
      />
    );
  }
}
