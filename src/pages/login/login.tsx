import { ReactElement, useRef, useState } from "react";
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
  const loaderRef = useRef<HTMLDivElement>(null);

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
          onClick={() => {
            if (loaderRef.current) {
              loaderRef.current.hidden = false;
            }

            setSubmitButtonDisabled(true);

            supabase.auth
              .signInWithPassword({
                email: `${login}@wedding-invitation.com`,
                password,
              })
              .then((data) => {
                setCurrentSession(data.data.session);
              });

            if (loaderRef.current) {
              loaderRef.current.hidden = true;
            }

            setSubmitButtonDisabled(false);
          }}
        >
          Войти <div ref={loaderRef} className={classes.loader} hidden />
        </button>
      </div>
    </div>
  );
};
