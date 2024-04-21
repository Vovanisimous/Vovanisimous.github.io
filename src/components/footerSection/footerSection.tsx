import { ReactElement } from "react";
import classes from "./footerSection.module.scss";

export const FooterSection = (): ReactElement => {
  return (
    <div className={classes.footerSectionWrapper}>
      <div>
        Присоединяйтесь к нашему телеграмм-каналу, задавайте вопросы,
        отправляйте фотографии с мероприятия
      </div>
      <a href={"https://t.me/+qKOHjz1W9zo5ZDdi"} target={"_blank"}>
        ссылка
      </a>
      <div>&#10084;</div>
    </div>
  );
};
