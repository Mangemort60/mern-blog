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
import { PostTypes } from '../App';

//set context
export interface PostContextInterface {
  posts: PostTypes[];
  setPosts: Dispatch<SetStateAction<PostTypes[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  posts: [
    {
      _id: '',
      author: {
        _id: '',
        email: '',
        pseudo: '',
        headshot: '',
        isAuthor: false,
        isAdmin: false,
        bio: '',
        posts: [''],
      },
      body: '',
      comment: [''],
      date: new Date(),
      img: '',
      tags: [''],
      title: '',
      intro: '',
    },
  ],
  setPosts: (_post: PostTypes[]) => {},
  isLoading: true,
  setIsLoading: (_loading: boolean) => {},
} as PostContextInterface;

export const PostContext = createContext(defaultState);

interface PostProviderProps {
  children: ReactNode;
}

export default function PostProvider({ children }: PostProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState<PostTypes[]>([
    {
      _id: '',
      author: {
        _id: '',
        email: '',
        pseudo: '',
        headshot: '',
        isAuthor: false,
        isAdmin: false,
        bio: '',
        posts: [''],
      },
      body: '',
      comment: [''],
      date: null,
      img: '',
      tags: [''],
      title: '',
      intro: '',
    },
  ]);

  return (
    <PostContext.Provider value={{ posts, setPosts, isLoading, setIsLoading }}>
      {children}
    </PostContext.Provider>
  );
}
