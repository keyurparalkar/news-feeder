import { Feed, FeedsKey, Source } from "../types/feeds";

/**
 * Transforms the API response to an array of Feed.
 * @param response -API response
 * @returns Feed[]
 */
export const aggregateApiResponse = (response: any, source: Source): Feed[] => {
  switch (source) {
    case FeedsKey.BBC: {
      if (response?.articles && response?.articles.length > 0) {
        return response?.articles.map((item: any) => ({
          createdAt: item.publishedAt,
          author: item.author,
          category: "",
          title: item.title,
          url: item.url,
          source,
        }));
      }
      return [];
    }

    case FeedsKey.NYT: {
      if (response?.docs && response?.docs.length > 0) {
        return response?.docs.map((item: any) => ({
          createdAt: item.pub_date,
          author: "",
          category: item.news_desk,
          title: item.headline?.main,
          url: item.web_url,
          source,
        }));
      }
      return [];
    }

    default: {
      if (response?.results && response?.results.length > 0) {
        return response?.results.map((item: any) => ({
          createdAt: item.webPublicationDate,
          author: "",
          category: item.sectionName,
          title: item.webTitle,
          url: item.webUrl,
          source,
        }));
      }
      return [];
    }
  }
};
