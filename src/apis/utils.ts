import { Feed, FeedsKey, Source } from "../types/feeds";

/**
 * Transforms the API response to an array of Feed.
 * @param response -API response
 * @returns Feed[]
 */
export const aggregateApiResponse = (response: any, source: Source): Feed[] => {
  switch (source) {
    case FeedsKey.BBC: {
      return response?.articles.map((item: any) => ({
        createdAt: item.publishedAt,
        author: item.author,
        category: "",
        title: item.title,
        url: item.url,
      }));
    }

    case FeedsKey.NYT: {
      return response?.docs.map((item: any) => ({
        createdAt: item.pub_date,
        author: "",
        category: item.section_name,
        title: item.headline?.main,
        url: item.web_url,
      }));
    }

    default: {
      return response?.results.map((item: any) => ({
        createdAt: item.webPublicationDate,
        author: "",
        category: item.section,
        title: item.webTitle,
        url: item.webUrl,
      }));
    }
  }
};
