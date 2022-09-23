import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SignInContext {
  setUser: Dispatch<SetStateAction<string>>;
  user: string;
}

export const SignInContext = createContext<SignInContext>({} as SignInContext);

export const SignInProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState("");
  return (
    <SignInContext.Provider value={{ setUser, user }}>
      {props.children}
    </SignInContext.Provider>
  );
};
