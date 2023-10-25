import { Dayjs } from "dayjs";

export type Feed = {
  title: string;
  url: string;
  author: string;
  createdAt: Dayjs;
  category: string;
};

export type Source = string;

export type Feeds = Record<Source, Feed[]>;

export enum FeedsKey {
  GUARDIAN = "theguardian",
  NYT = "newyorktimes",
  BBC = "bbc-news",
}
