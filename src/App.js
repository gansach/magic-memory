import React, { Component } from "react";

import Card from "./components/Card/Card";

import classes from "./App.module.css";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      turns: 0,
      choiceOne: null,
      choiceTwo: null,
    };
  }

  // Shuffle cards
  shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));

    this.setState({
      cards: shuffledCards,
      turns: 0,
      choiceOne: null,
      choiceTwo: null,
    });
  };

  // Handle a choice
  handleChoice = (card) => {
    this.setState(
      (state) => (state.choiceOne ? { choiceTwo: card } : { choiceOne: card }),
      // Compare 2 selected cards
      () => {
        if (this.state.choiceOne && this.state.choiceTwo) {
          if (this.state.choiceOne.src === this.state.choiceTwo.src) {
            this.setState((state) => ({
              cards: [...state.cards].map((c) =>
                c.src === card.src ? { ...c, matched: true } : c
              ),
            }));
            console.log("hello");
          }
          setTimeout(() => this.resetTurn(), 1000);
        }
      }
    );
  };

  resetTurn = () => {
    this.setState((state) => ({
      choiceOne: null,
      choiceTwo: null,
      turns: state.turns + 1,
    }));
  };

  render() {
    return (
      <div className={classes.App}>
        <h1>Magic Memory</h1>
        <button className={classes.Button} onClick={this.shuffleCards}>
          New Game
        </button>
        <h4>{this.state.turns}</h4>

        <div className={classes.CardGrid}>
          {[...this.state.cards].map((card) => (
            <Card
              key={card.id}
              c={card}
              flipped={
                card === this.state.choiceOne ||
                card === this.state.choiceTwo ||
                card.matched
              }
              choose={this.handleChoice}
              front={card.src}
              back={"/img/cover.png"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
