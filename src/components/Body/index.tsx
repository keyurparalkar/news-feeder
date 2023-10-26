import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { fetchFeed } from "../../apis";
import { aggregateApiResponse } from "../../apis/utils";
import { FeedContext, FeedDispatchContext } from "../../context";
import { FETCH_FEED } from "../../context/actions";
import { FeedsKey, GlobalKeys, Source } from "../../types/feeds";
import Container from "./Container";
import LeftSideBar from "./LeftSideBar";

const Body = () => {
  const { selectedSource, feedSources, filteredData } = useContext(FeedContext);
  const dispatch = useContext(FeedDispatchContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleAllFeedResponse = async () => {
    try {
      setIsLoading(true);
      const responses = await fetchFeed(GlobalKeys.ALL);

      // let aggregatedData: Feed[] = [];

      Object.values(FeedsKey).forEach(async (feedSource, idx) => {
        const response = await responses[idx];
        if (response.status === "fulfilled") {
          const data = await response.value.json();
          const transformedResp = aggregateApiResponse(
            data?.response ?? data,
            feedSource
          );
          // aggregatedData = [...aggregatedData, ...transformedResp];
          dispatch({
            type: FETCH_FEED,
            payload: { transformedResp, feedSource },
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

  useEffect(() => {
    try {
      if (selectedSource === GlobalKeys.ALL) {
        handleAllFeedResponse();
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
  } else if (selectedSource === GlobalKeys.ALL) {
    dataFeedSource = Object.values(feedSources).flat();
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
