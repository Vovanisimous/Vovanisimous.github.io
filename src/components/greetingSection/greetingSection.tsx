import classes from "./grettingSection.module.scss";
import { ReactElement } from "react";

export const GreetingSection = (): ReactElement => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundImage} />
      <div className={classes.coupleNames}>
        <span>Vladimir</span>
        <span>18.05.2024</span>
        <span>Julia</span>
      </div>
      <div className={classes.title}>
        <h1>WEDDING</h1>
        <h1>DAY</h1>
      </div>
    </div>
  );
};
