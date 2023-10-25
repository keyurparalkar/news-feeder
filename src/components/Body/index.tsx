import { Layout } from "antd";
import { useContext, useEffect, useState } from "react";
import { fetchFeed } from "../../apis";
import { aggregateApiResponse } from "../../apis/utils";
import { FeedContext, FeedDispatchContext } from "../../context";
import { FETCH_FEED } from "../../context/actions";
import Container from "./Container";
import LeftSideBar from "./LeftSideBar";

const Body = () => {
  const { selectedSource, feedSources } = useContext(FeedContext);
  const dispatch = useContext(FeedDispatchContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFeedResponse = async (source: string) => {
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
      handleFeedResponse(selectedSource);
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [selectedSource]);

  return (
    <Layout>
      <LeftSideBar />
      <Container feeds={feedSources[selectedSource]} isLoading={isLoading} />
    </Layout>
  );
};

export default Body;
