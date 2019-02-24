import React, { Component } from 'react';
import logo from './picz/scattergories.png';
import './App.scss';
import Countdown from 'react-countdown-now';
import soundOn from './picz/on.svg';
import soundOff from './picz/off.svg';
import play from './picz/play.svg';
import pause from './picz/pause.svg';

import horn from './sounds/horn.wav';
import clock from './sounds/clock.wav';
import Lists from './Lists';

const Completionist = () => <span>You are good to go!</span>;

class App extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.pause = this.pause.bind(this);
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
        <span className="time">
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
        <div className="wrapper">
          {/* <img onClick={this.reset} src={logo} className="logo" alt="play" /> */}
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
            <div className="letterWrapper"><h1 className="letter">{letter}</h1></div>
            <Countdown
              date={this.state.countdownDate}
              autoStart={false}
              ref="countdown"
              renderer={this.renderer}
              onComplete={() => this.complete()}
            />
            <div className="buttons">
            {!isStarted && (
              <button className="button" onClick={this.startTimer}><img src={play} alt="play"/></button>
            )}
            {isStarted && (
              // <input
              //   type="button"
              //   value={isCountingDown ? 'Pausa' : 'Fortsätt'}
              //   onClick={isCountingDown ? this.pause : this.resumeTimer}
              // />
              <button
                className="button"
                type="button"
                // value={isCountingDown ? 'Pausa' : 'Fortsätt'}
                onClick={isCountingDown ? this.pause : this.resumeTimer}
              >
              <img src={isCountingDown ? pause : play} alt="pause"/>
              </button>
            )}
            {isStarted && (
              <input type="button" value={'Nollställ'} onClick={this.reset} />
            )}
            </div>
          </div>
          <Lists />
        </div>
      </div>
    );
  }
}

export default App;
