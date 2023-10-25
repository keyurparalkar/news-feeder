import { Feed, Source } from "../types/feeds";

/**
 * Transforms the API response to an array of Feed.
 * @param response -API response
 * @returns Feed[]
 */
export const aggregateApiResponse = (
  response: any[],
  source: Source
): Feed[] => {
  switch (source) {
    default: {
      return response.map((item) => ({
        createdAt: item.webPublicationDate,
        author: "",
        category: item.section,
        title: item.webTitle,
        url: item.webUrl,
      }));
    }
  }
};
