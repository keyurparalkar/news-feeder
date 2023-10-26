import { Dayjs } from "dayjs";

export type Feed = {
  title: string;
  url: string;
  author: string;
  createdAt: Dayjs;
  category: string;
  source: Source;
};

export type Source = string;

export type Feeds = Record<Source, Feed[]>;

export enum FeedsKey {
  GUARDIAN = "theguardian",
  NYT = "newyorktimes",
  BBC = "bbc-news",
}

export enum GlobalKeys {
  ALL = "all",
}

export const selectOptions = Object.entries({ ...GlobalKeys, ...FeedsKey }).map(
  ([key, value]) => ({
    value,
    label: key,
  })
);
