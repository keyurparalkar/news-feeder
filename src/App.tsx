import React from "react";
import { Layout, Space, Typography } from "antd";
import Body from "./components/Body";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  color: "#fff",
};

function App() {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Typography.Title level={3} style={{ color: "white", marginTop: 18 }}>
            News Feeder
          </Typography.Title>
        </Header>
        <Body />
      </Layout>
    </Space>
  );
}

export default App;
