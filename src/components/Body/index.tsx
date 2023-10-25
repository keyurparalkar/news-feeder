import { Layout } from "antd";
import Container from "./Container";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const Body = () => {
  return (
    <Layout>
      <LeftSideBar />
      <Container />
      <RightSideBar />
    </Layout>
  );
};

export default Body;
