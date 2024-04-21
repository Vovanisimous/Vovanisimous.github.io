import { ReactElement, useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient.ts";
import { IUserInformation } from "../../App.tsx";
import classes from "./questionnaireSection.module.scss";

export const QuestionnaireSection = ({
  userInformation: { id, ...formValues },
}: {
  userInformation: IUserInformation;
}): ReactElement => {
  const [form, setForm] = useState(formValues);
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setForm(formValues);
  }, [
    formValues.coming_with_names,
    formValues.is_coming,
    formValues.is_drinking_wine,
    formValues.is_drinking_vodka,
    formValues.is_drinking_champagne,
    formValues.is_drinking_cognac,
    formValues.is_drinking_whiskey,
    formValues.is_not_drinking,
  ]);

  const onSubmitAsync = async () => {
    if (loaderRef.current) {
      loaderRef.current.hidden = false;
    }

    setSubmitButtonDisabled(true);

    const result = await supabase
      .from("users_information")
      .update(form)
      .eq("id", id);

    if (result.error) {
      window.alert("Произошла ошибка. Обновите страницу и попробуйте снова");
    } else {
      window.alert("Анкета успешно отправлена!");
    }

    setSubmitButtonDisabled(false);

    if (loaderRef.current) {
      loaderRef.current.hidden = true;
    }
  };

  return (
    <div className={classes.wrapper}>
      <h3>Анкета гостя</h3>
      <div>Ваши ответы на вопросы очень помогут нам в организации свадьбы</div>
      <div className={classes.inputsContainer}>
        <div className={classes.namesContainer}>
          <div>Имя и Фамилия</div>
          <div className={classes.comment}>
            *Если вы будете с парой или с семьей, впишите в форму.
          </div>
          <input
            className={classes.input}
            value={form.coming_with_names}
            onChange={(e) =>
              setForm({ ...form, coming_with_names: e.target.value })
            }
            placeholder={"Исуповы Оля и Женя, Аня (3 года)"}
          />
        </div>
        <div className={classes.alcoholContainer}>
          <div>Предпочтения по алкоголю</div>
          <div className={classes.alcoholChooseContainer}>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_drinking_wine}
                onChange={() =>
                  setForm({ ...form, is_drinking_wine: !form.is_drinking_wine })
                }
              />
              <div>Вино</div>
            </div>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_drinking_cognac}
                onChange={() =>
                  setForm({
                    ...form,
                    is_drinking_cognac: !form.is_drinking_cognac,
                  })
                }
              />
              <div>Коньяк</div>
            </div>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_drinking_champagne}
                onChange={() =>
                  setForm({
                    ...form,
                    is_drinking_champagne: !form.is_drinking_champagne,
                  })
                }
              />
              <div>Шампанское</div>
            </div>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_drinking_whiskey}
                onChange={() =>
                  setForm({
                    ...form,
                    is_drinking_whiskey: !form.is_drinking_whiskey,
                  })
                }
              />
              <div>Виски</div>
            </div>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_drinking_vodka}
                onChange={() =>
                  setForm({
                    ...form,
                    is_drinking_vodka: !form.is_drinking_vodka,
                  })
                }
              />
              <div>Водка</div>
            </div>
            <div className={classes.selectWrapper}>
              <input
                type={"checkbox"}
                checked={form.is_not_drinking}
                onChange={() =>
                  setForm({ ...form, is_not_drinking: !form.is_not_drinking })
                }
              />
              <div>Не пью</div>
            </div>
          </div>
        </div>
        <div className={classes.isComingContainer}>
          <div>Присутствие</div>
          <div className={classes.selectWrapper}>
            <input
              type="radio"
              checked={form.is_coming}
              onChange={() => setForm({ ...form, is_coming: true })}
            />
            <span>Я приду! / Мы придем!</span>
          </div>
          <div className={classes.selectWrapper}>
            <input
              type="radio"
              checked={!form.is_coming}
              onChange={() => setForm({ ...form, is_coming: false })}
            />
            <span>Не смогу прийти</span>
          </div>
        </div>
        <div className={classes.submitButtonContainer}>
          <button
            disabled={isSubmitButtonDisabled}
            className={classes.button}
            onClick={onSubmitAsync}
          >
            Отправить <div ref={loaderRef} className={classes.loader} hidden />
          </button>
        </div>
      </div>
      <img
        src={
          window.innerWidth > 680
            ? "src/assets/questionnaire-section-image.png"
            : "src/assets/questionnaire-section-image-mobile.png"
        }
        alt={"image"}
      />
    </div>
  );
};
