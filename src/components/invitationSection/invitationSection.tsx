import { ReactElement } from "react";
import classes from "./invitationSection.module.scss";

export const InvitationSection = (): ReactElement => {
  return (
    <div className={classes.wrapper}>
      <h3>Дорогие друзья и родные</h3>
      <div>
        Мы счастливы сообщить вам радостную новость. С большим удовольствием
        приглашаем вас на знаменательный праздник - нашу свадьбу.
      </div>
      <h3>18.05.2024</h3>
      <img
        src={
          window.innerWidth > 680
            ? "src/assets/invitation-section-image.png"
            : "src/assets/invitation-section-image-mobile.png"
        }
        alt="Wedding Background"
      />
    </div>
  );
};
