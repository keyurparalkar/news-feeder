import { useContext } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Empty,
  Flex,
  Layout,
  Row,
  Tabs,
  TabsProps,
} from "antd";

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#F3F4FD",
  padding: 10,
};

const Container = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemSelectedColor: "#0000FF",
            inkBarColor: "#0000FF",
          },
        },
      }}
      renderEmpty={() => <Empty />}
    >
      <Layout.Content style={contentStyle}>
        <Card title="Query">
          <Row>
            <Col span={16}></Col>
            <Col span={1} />
            <Col span={7}>
              <Flex vertical justify={"space-between"} gap="middle">
                <Button type="primary" style={{ backgroundColor: "#0000FF" }}>
                  Run Query
                </Button>
              </Flex>
            </Col>
          </Row>
          <Divider />
          <Row></Row>
          <Divider />
        </Card>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default Container;
