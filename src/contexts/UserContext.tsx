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
  bio: string;
  isAdmin: boolean;
  posts: string[];
}
//set context
export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isUserLoading: boolean;
  setIsUserLoading: Dispatch<SetStateAction<boolean>>;
}
const defaultState = {
  user: {
    _id: '',
    email: '',
    pseudo: '',
    headshot: '',
    isAuthor: false,
    bio: '',
    isAdmin: false,
    posts: [''],
  },
  setUser: (_user: User) => {},
  isUserLoading: true,
  setIsUserLoading: (_loading: boolean) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);

// provider
interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<User>({
    _id: '',
    email: '',
    pseudo: '',
    headshot: '',
    isAuthor: false,
    isAdmin: false,
    bio: '',
    posts: [''],
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, isUserLoading, setIsUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}
