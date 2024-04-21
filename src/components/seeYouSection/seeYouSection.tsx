import { ReactElement } from "react";
import classes from "./seeYouSectiom.module.scss";

export const SeeYouSection = (): ReactElement => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundImage} />
      <div>ДО ВСТРЕЧИ!</div>
      <img src="/assets/arrow.svg" alt="logo" />
    </div>
  );
};
