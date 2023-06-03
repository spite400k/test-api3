import { StorageObject } from '@/components/storage/types/obj'
import { Timestamp } from 'firebase/firestore'

export type PostType = {
  id: string
  title: string;
  category?: string;
  slug: string;
  publish: boolean;
  releaseDate: Timestamp;
  markdown?: string;
  thumbnail: StorageObject;
  excerpt: string;
  ogImage: StorageObject;
  // content: string;
  tags: string[];

  custom?: any
};
