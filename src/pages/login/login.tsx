import { ReactElement, useState } from "react";
import classes from "./login.module.scss";
import { supabase } from "../../supabaseClient.ts";
import { Session } from "@supabase/supabase-js";

export const Login = ({
  setCurrentSession,
}: {
  setCurrentSession: (session: Session | null) => void;
}): ReactElement => {
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.wrapper}>
      <div className={classes.loginContainer}>
        <div>Добро пожаловать!</div>
        <div className={classes.comment}>
          *Войдите в систему по персональному логину и паролю
        </div>
        <input
          onChange={(e) => setLogin(e.target.value)}
          placeholder={"Логин"}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          placeholder={"Пароль"}
        />
        <button
          disabled={isSubmitButtonDisabled}
          onClick={async () => {
            if (!login || !password) {
              window.alert("Заполните поля");
              return;
            }

            setSubmitButtonDisabled(true);

            await supabase.auth
              .signInWithPassword({
                email: `${login}@wedding-invitation.com`,
                password,
              })
              .then((data) => {
                if (data.error?.message === "Invalid login credentials") {
                  window.alert("Неправильный логин или пароль");
                  return;
                }

                if (data.error) {
                  window.alert("Произошла ошибка, попробуйте снова");
                  return;
                }

                setCurrentSession(data.data.session);
              });

            setSubmitButtonDisabled(false);
          }}
        >
          Войти{" "}
          <div className={classes.loader} hidden={!isSubmitButtonDisabled} />
        </button>
      </div>
    </div>
  );
};
