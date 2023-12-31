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

export enum FeedsByCategoryKeys {
  BUSINESS = "business",
  SPORTS = "sport",
  SCIENCE = "science",
}

export enum FeedsByAuthor {
  "Tim de Lisle" = "profile/timdelisle", // guardian
  "ET Markets" = "etmarkets", // newsAPI
  "Lisa" = "Lisa", //nyt
}

export const selectOptions = Object.entries({ ...GlobalKeys, ...FeedsKey }).map(
  ([key, value]) => ({
    value,
    label: key,
  })
);
