import { Layout } from "antd";
import { useContext, useEffect } from "react";
import { fetchFeed } from "../../apis";
import { FeedContext, FeedDispatchContext } from "../../context";
import { FETCH_FEED } from "../../context/actions";
import Container from "./Container";
import LeftSideBar from "./LeftSideBar";

const Body = () => {
  const { selectedSource, feedSources } = useContext(FeedContext);
  const dispatch = useContext(FeedDispatchContext);

  const handleFeedResponse = async (source: string) => {
    const resp = await fetchFeed(source);
    dispatch({ type: FETCH_FEED, payload: resp.response?.results });
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
      <Container feeds={feedSources[selectedSource]} />
    </Layout>
  );
};

export default Body;
