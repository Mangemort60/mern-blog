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
}

const defaultState = {
  posts: [
    {
      _id: '',
      author: null,
      body: '',
      comment: [''],
      date: new Date(),
      img: '',
      tags: [''],
      title: '',
      intro: '',
    },
  ],
  setPosts: (post: PostTypes[]) => {},
} as PostContextInterface;

export const PostContext = createContext(defaultState);

interface PostProviderProps {
  children: ReactNode;
}

export default function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<PostTypes[]>([
    {
      _id: '',
      author: null,
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
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
}
