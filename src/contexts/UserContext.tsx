/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

//state
export interface User {
  _id: string;
  email: string;
  pseudo: string;
  headshot: string;
  isAuthor: boolean;
  isAdmin: boolean;
  posts: string[];
}
//set context
export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
const defaultState = {
  user: {
    _id: '',
    email: '',
    pseudo: '',
    headshot: '',
    isAuthor: false,
    isAdmin: false,
    posts: [''],
  },
  setUser: (user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    _id: '',
    email: '',
    pseudo: '',
    headshot: '',
    isAuthor: false,
    isAdmin: false,
    posts: [''],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
