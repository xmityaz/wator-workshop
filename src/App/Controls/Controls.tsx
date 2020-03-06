import React from 'react';
import './Controls.css';
import {InitialParams, EvolutionParams} from '../../types';

export type ControlsProps = {
  onEvolutionControlChange: (name: keyof EvolutionParams, value: number) => void;
  onInitialControlChange: (name: keyof InitialParams, value: number) => void;
  onReset: () => void;
  initialParams: InitialParams;
  evolutionParams: EvolutionParams;
};

export class Controls extends React.Component<ControlsProps> {
  getEvolutionHandler = (name: keyof EvolutionParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onEvolutionControlChange(name, Number(event.target.value));
  };

  getInitialHandler = (name: keyof InitialParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onInitialControlChange(name, Number(event.target.value));
  };

  renderEvolutionInput(name: keyof EvolutionParams, min: number, max: number) {
    return (
      <div className="controls-field">
        <label>{name}</label>
        <input
          type="range"
          className="controls-range"
          value={this.props.evolutionParams[name]}
          onChange={this.getEvolutionHandler(name)}
          max={max}
          min={min}
        />
      </div>
    );
  }

  renderInitialInput(name: keyof InitialParams) {
    return (
      <div className="controls-field">
        <label>{name}</label>
        <input
          type="range"
          className="controls-range"
          value={this.props.initialParams[name]}
          onChange={this.getInitialHandler(name)}
          max={1000}
          min={1}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="controls">
        <button className="controls-reset" onClick={this.props.onReset}>
          Reset
        </button>

        <div className="controls-initial">
          {this.renderInitialInput('fishNumber')}
          {this.renderInitialInput('sharkNumber')}
        </div>

        <div className="controls-evolution">
          {this.renderEvolutionInput('fishReproducingRate', 80, 150)}
          {this.renderEvolutionInput('sharkReproducingRate', 120, 160)}
          {this.renderEvolutionInput('sharkMaxEnergy', 5, 105)}
          {this.renderEvolutionInput('gameSpeed', 5, 105)}
        </div>
      </div>
    );
  }
}
