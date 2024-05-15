import "./App.css";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

Amplify.configure(outputs);

const Main = () => {
  const { authStatus } = useAuthenticator();

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchAuthSession().then((auth) => {
        const groups = auth.tokens?.idToken?.payload["cognito:groups"];
        console.log(groups);
      });
    }
  }, [authStatus]);

  return null;
};

export function App() {
  return (
    <>
      <Authenticator.Provider>
        <Authenticator socialProviders={["google"]} hideSignUp>
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
        <Main />
      </Authenticator.Provider>
    </>
  );
}

export default App;
