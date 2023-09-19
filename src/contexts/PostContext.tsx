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
  post: PostTypes[];
  setPost: Dispatch<SetStateAction<PostTypes[]>>;
}

const defaultState = {
  post: [
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
  setPost: (post: PostTypes[]) => {},
} as PostContextInterface;

export const PostContext = createContext(defaultState);

interface PostProviderProps {
  children: ReactNode;
}

export default function PostProvider({ children }: PostProviderProps) {
  const [post, setPost] = useState<PostTypes[]>([
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
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
