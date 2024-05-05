import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.ts";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import { GreetingSection } from "./components/greetingSection/greetingSection.tsx";
import { InvitationSection } from "./components/invitationSection/invitationSection.tsx";
import { InformationSection } from "./components/informationSection/informationSection.tsx";
import { QuestionnaireSection } from "./components/questionnaireSection/questionnaireSection.tsx";
import { SeeYouSection } from "./components/seeYouSection/seeYouSection.tsx";
import { Login } from "./pages/login/login.tsx";
import { FooterSection } from "./components/footerSection/footerSection.tsx";
import classes from "./app.module.scss";

export interface IUserInformation {
  id: string;
  is_coming: boolean;
  coming_with_names: string;
  is_drinking_wine: boolean;
  is_drinking_cognac: boolean;
  is_drinking_champagne: boolean;
  is_drinking_whiskey: boolean;
  is_drinking_vodka: boolean;
  is_not_drinking: boolean;
}

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [userInformation, setUserInformation] = useState<IUserInformation>({
    id: "",
    is_coming: true,
    coming_with_names: "",
    is_drinking_wine: false,
    is_drinking_cognac: false,
    is_drinking_champagne: false,
    is_drinking_whiskey: false,
    is_drinking_vodka: false,
    is_not_drinking: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session);
    });
  }, []);

  useEffect(() => {
    if (currentSession?.user.id) {
      supabase
        .from("users_information")
        .upsert({ id: currentSession.user.id })
        .then((res: PostgrestSingleResponse<IUserInformation[] | null>) => {
          if (res.data) {
            setUserInformation(res.data?.[0]);
          }
        });
    }
  }, [currentSession]);

  if (!currentSession) {
    return <Login setCurrentSession={setCurrentSession} />;
  } else {
    return (
      <div className={classes.wrapper}>
        <GreetingSection />
        <InvitationSection />
        <InformationSection />
        <QuestionnaireSection
          userInformation={userInformation}
          userId={currentSession.user.id}
        />
        <SeeYouSection />
        <FooterSection />
      </div>
    );
  }
}

export default App;
