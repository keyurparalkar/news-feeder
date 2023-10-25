import { Source } from "../types/feeds";

export const getFetchFeedHandler = (source: Source) => {
  switch (source) {
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
