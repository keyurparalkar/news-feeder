import { FeedsKey, GlobalKeys, Source } from "../types/feeds";

export const getFetchFeedHandler = (source: Source) => {
  switch (source) {
    case FeedsKey.BBC: {
      const BASE_URL = "https://newsapi.org/v2/";
      const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
      const fetchApi = (props?: any) =>
        fetch(
          `${BASE_URL}${
            props?.author ? `everything?q=${props.author}&` : "top-headlines?"
          }apiKey=${API_KEY}${
            props?.category
              ? "&category=" + props.category
              : "&sources=bbc-news"
          }`
        );
      return fetchApi;
    }

    case FeedsKey.NYT: {
      const BASE_URL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      const API_KEY = process.env.REACT_APP_NYT_API_KEY;
      const fetchApi = (props?: any) =>
        fetch(
          `${BASE_URL}?${
            props?.category
              ? `fq=news_desk:("${props.category}")`
              : "q=election"
          }&api-key=${API_KEY}${
            props?.author ? `&fq=persons.contains:(${props.author})` : ""
          }`
        );
      return fetchApi;
    }

    default: {
      const BASE_URL = "https://content.guardianapis.com/";
      const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
      const fetchApi = (props?: any) => {
        return fetch(
          `${BASE_URL}${
            props?.category
              ? props.category
              : props?.author
              ? props.author
              : "search"
          }?api-key=${API_KEY}`
        );
      };
      return fetchApi;
    }
  }
};

export const fetchFeed = async (source: Source) => {
  if (source === GlobalKeys.ALL) {
    const allFetchHandlers = Object.values(FeedsKey).map((feed) =>
      getFetchFeedHandler(feed)()
    );
    const resps = await Promise.allSettled(allFetchHandlers);
    return resps;
  } else {
    const fetchHandler = getFetchFeedHandler(source);
    const resp = await fetchHandler();
    const data = await resp.json();
    return data;
  }
};

export const fetchFeedByCategory = async (category: string) => {
  const allFetchHandlers = Object.values(FeedsKey).map((feed) => {
    const fetchHandler = getFetchFeedHandler(feed);
    return fetchHandler({ category });
  });
  const resps = await Promise.allSettled(allFetchHandlers);
  return resps;
};

export const fetchFeedByAuthor = async (author: string) => {
  const allFetchHandlers = Object.values(FeedsKey).map((feed) => {
    const fetchHandler = getFetchFeedHandler(feed);
    return fetchHandler({ author });
  });
  const resps = await Promise.allSettled(allFetchHandlers);
  return resps;
};
