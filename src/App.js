import React, { Component } from 'react';
import './App.scss';
import Countdown from 'react-countdown-now';
import soundOn from './picz/on.svg';
import soundOff from './picz/off.svg';
import shuffle from './picz/shuffle.svg';
import play from './picz/play.svg';
import pause from './picz/pause.svg';

import horn from './sounds/horn.wav';
import clock from './sounds/clock.wav';
import Lists from './Lists';
const Completionist = () => <span>Tiden ute!!</span>;

class App extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.pause = this.pause.bind(this);
    this.randomLetter = this.randomLetter.bind(this);
    this.state = {
      countdownDate: Date.now() + 90 * 1000,
      letter: '',
      isCountingDown: false,
      isStarted: false,
      volume: true,
      isDone: false,
    };
  }
  componentDidMount() {
    this.randomLetter();
  }

  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span className="">
          {minutes}:{seconds}
        </span>
      );
    }
  };

  startTimer = event => {
    this.refs.countdown.getApi().start();
    this.setState({ isStarted: true, isCountingDown: true });
  };

  resumeTimer = event => {
    this.refs.countdown.getApi().start();
    this.setState({ isCountingDown: true });
  };

  pause = event => {
    this.refs.countdown.getApi().pause();
    this.setState({ isCountingDown: false });
  };

  reset() {
    window.location.reload();
  }

  complete() {
    this.setState({ isCountingDown: false, isDone: true });
  }

  sound() {
    const { volume } = this.state;
    if (volume) {
      this.setState({ volume: false });
      return;
    }
    this.setState({ volume: true });
  }

  randomLetter() {
    const letters = 'abcdefghijklmnoprstuv';
    const splittedLetters = letters.split('');
    const letter = splittedLetters[
      Math.floor(Math.random() * splittedLetters.length)
    ].toUpperCase();
    this.setState({ letter });
  }
  render() {
    const { letter, isCountingDown, isStarted, isDone, volume } = this.state;
    return (
      <div className="App">
        <span className="newLetter" onClick={this.randomLetter}>
          Ny bokstav <img src={shuffle} alt="new-letter" />
        </span>
        <div className="wrapper">
          {isCountingDown && (
            <div className="sound">
              {volume && (
                <img
                  onClick={() => this.sound()}
                  src={soundOn}
                  alt="sound off"
                />
              )}
              {!volume && (
                <img
                  onClick={() => this.sound()}
                  src={soundOff}
                  alt="sound off"
                />
              )}
            </div>
          )}
          {volume && isCountingDown && <audio autoPlay loop src={clock} />}
          {isDone && !isCountingDown && <audio autoPlay={true} src={horn} />}
          <div className="player">
            <div className="letterWrapper">
              <h1 className="letter">{letter}</h1>
            </div>
            <span className="time" style={{ display: isStarted ? 'block' : 'none'}}>
                <Countdown
              date={this.state.countdownDate}
              autoStart={false}
              ref="countdown"
              renderer={this.renderer}
              onComplete={() => this.complete()}
            /> 
            </span> 
            <span style={{ display: isStarted ? 'none' : 'block'}} className="time">1:30</span>
            <div className="buttons">
              {!isStarted && (
                <button className="button" onClick={this.startTimer}>
                  <img src={play} alt="play" />
                </button>
              )}
              {isStarted && (
                <button
                  className="button"
                  type="button"
                  onClick={isCountingDown ? this.pause : this.resumeTimer}
                >
                  <img src={isCountingDown ? pause : play} alt="pause" />
                </button>
              )}
              {isStarted && (
                <input type="button" value={'Nollställ'} onClick={this.reset} />
              )}
            </div>
          </div>
          {/* <Lists /> */}
        </div>
      </div>
    );
  }
}

export default App;
