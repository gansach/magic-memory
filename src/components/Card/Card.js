import React from "react";

import classes from "./Card.module.css";

const card = (props) => {
  const classList = [classes.Card];
  if (props.flipped) classList.push(classes.Flipped);

  return (
    <div className={classList.join(" ")}>
      <img className={classes.Front} src={props.front} alt="card front"></img>
      <img
        className={classes.Back}
        src={props.back}
        alt="card back"
        onClick={() => props.choose(props.c)}
      ></img>
    </div>
  );
};
export default card;
