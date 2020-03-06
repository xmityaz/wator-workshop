import React from 'react';
import './App.css';
import {Ocean} from './Ocean/Ocean';
import {InitialParams, EvolutionParams, PetMap} from '../types';
import {initializePetMap} from '../implementation/logic';
import {Controls} from './Controls/Controls';

export type AppState = {
  initialParams: InitialParams;
  evolutionParams: EvolutionParams;
  initialPetMap: PetMap;
};

const DEFAULT_INITIAL_CONTROLS: InitialParams = {
  fishNumber: 300,
  sharkNumber: 50
};

const DEFAULT_EVOLUTION_CONTROLS: EvolutionParams = {
  fishReproducingRate: 85,
  sharkReproducingRate: 125,
  sharkMaxEnergy: 5,
  gameSpeed: 100
};

const OCEAN_SIZE = {width: 100, height: 100};

export class App extends React.Component<{}, AppState> {
  get config() {
    return {
      oceanSize: OCEAN_SIZE,
      ...this.state.evolutionParams
    };
  }

  onEvolutionControlChange = (name: keyof EvolutionParams, value: number) => {
    this.setState({
      evolutionParams: {
        ...this.state.evolutionParams,
        [name]: value
      }
    });
  };

  onInitialControlChange = (name: keyof InitialParams, value: number) => {
    this.setState({
      initialParams: {
        ...this.state.initialParams,
        [name]: value
      }
    });
  };

  onReset = () => {
    this.setState({
      initialPetMap: initializePetMap(this.state.initialParams, this.state.evolutionParams, OCEAN_SIZE)
    });
  };

  constructor(props: {}) {
    super(props);

    this.state = {
      initialParams: DEFAULT_INITIAL_CONTROLS,
      evolutionParams: DEFAULT_EVOLUTION_CONTROLS,
      initialPetMap: initializePetMap(DEFAULT_INITIAL_CONTROLS, DEFAULT_EVOLUTION_CONTROLS, OCEAN_SIZE)
    };
    this.onReset();
  }

  render() {
    return (
      <div className="App">
        <Ocean
          initialPetMap={this.state.initialPetMap}
          evolutionParams={this.state.evolutionParams}
          oceanSize={OCEAN_SIZE}
        />
        <Controls
          onEvolutionControlChange={this.onEvolutionControlChange}
          onInitialControlChange={this.onInitialControlChange}
          onReset={this.onReset}
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
