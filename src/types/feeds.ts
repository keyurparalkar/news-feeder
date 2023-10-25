import { Dayjs } from "dayjs";

export type Feed = {
  title: string;
  content: string;
  author: string;
  createdAt: Dayjs;
  category: string;
};

export type Source = string;

export type Feeds = Record<Source, Feed[]>;
