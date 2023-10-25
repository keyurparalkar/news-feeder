import { FeedsKey, Source } from "../types/feeds";

export const getFetchFeedHandler = (source: Source) => {
  switch (source) {
    case FeedsKey.BBC: {
      const BASE_URL = "https://newsapi.org/v2/top-headlines?sources=bbc-news";
      const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
      return (props?: any) => fetch(`${BASE_URL}&apiKey=${API_KEY}`);
    }

    case FeedsKey.NYT: {
      const BASE_URL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election";
      const API_KEY = process.env.REACT_APP_NYT_API_KEY;
      return (props?: any) => fetch(`${BASE_URL}&api-key=${API_KEY}`);
    }

    default: {
      const BASE_URL = "https://content.guardianapis.com/search?";
      const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
      return (props?: any) => fetch(`${BASE_URL}api-key=${API_KEY}`);
    }
  }
};

export const fetchFeed = async (source: Source) => {
  const fetchHandler = getFetchFeedHandler(source);
  const resp = await fetchHandler();
  const data = await resp.json();
  return data;
};
