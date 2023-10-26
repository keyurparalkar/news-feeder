import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { fetchFeed, fetchFeedByCategory } from "../../apis";
import { aggregateApiResponse } from "../../apis/utils";
import { FeedContext, FeedDispatchContext } from "../../context";
import { FETCH_FEED } from "../../context/actions";
import {
  Feed,
  FeedsByCategoryKeys,
  FeedsKey,
  GlobalKeys,
  Source,
} from "../../types/feeds";
import Container from "./Container";
import LeftSideBar from "./LeftSideBar";

const Body = () => {
  const { selectedSource, feedSources, filteredData } = useContext(FeedContext);
  const dispatch = useContext(FeedDispatchContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAllFeedResponse = async (
    param: string,
    fetchCallback: (source: string) => Promise<any>
  ) => {
    try {
      setIsLoading(true);
      const responses = await fetchCallback(param);

      let aggregatedData: Feed[] = [];

      Object.values(FeedsKey).forEach(async (feedSource, idx) => {
        const response = await responses[idx];
        if (response.status === "fulfilled") {
          const data = await response.value.json();
          const transformedResp = aggregateApiResponse(
            data?.response ?? data,
            feedSource
          );
          aggregatedData = [...aggregatedData, ...transformedResp];
          dispatch({
            type: FETCH_FEED,
            payload: aggregatedData,
          });
        }
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleFeedResponse = async (source: Source) => {
    try {
      setIsLoading(true);
      const resp = await fetchFeed(source);
      const transformedResp = aggregateApiResponse(
        resp?.response ?? resp,
        source
      );
      dispatch({ type: FETCH_FEED, payload: transformedResp });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  // const handleFeedsByCategory = (source: Source) => {
  //   try {
  //     setIsLoading(true);
  //     const resp = await fetchFeed(source, GlobalKeys.ALL);
  //     const transformedResp = aggregateApiResponse(
  //       resp?.response ?? resp,
  //       source
  //     );
  //     dispatch({ type: FETCH_FEED, payload: transformedResp });
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    try {
      if (
        (Object.values(FeedsByCategoryKeys) as string[]).includes(
          selectedSource
        )
      ) {
        handleAllFeedResponse(selectedSource, fetchFeedByCategory);
      } else if (selectedSource === GlobalKeys.ALL) {
        handleAllFeedResponse(GlobalKeys.ALL, fetchFeed);
      } else {
        handleFeedResponse(selectedSource);
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [selectedSource]);

  let dataFeedSource = feedSources[selectedSource];
  if (filteredData && filteredData.length > 0) {
    dataFeedSource = filteredData;
  }

  return (
    <Layout>
      <LeftSideBar />
      <Container
        feeds={dataFeedSource}
        isLoading={isLoading}
        dispatch={dispatch}
        selectedSource={selectedSource}
      />
    </Layout>
  );
};

export default Body;
