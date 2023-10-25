import { Avatar, Card, ConfigProvider, Empty, Layout, List } from "antd";
import { Feed } from "../../types/feeds";

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#F3F4FD",
  padding: 10,
};

const ListItemRenderer = (item: Feed, index: number) => (
  <List.Item>
    <List.Item.Meta
      avatar={
        <Avatar
          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
        />
      }
      title={<a href={item.url}>{item.title}</a>}
      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
    />
  </List.Item>
);

type ContainerProps = {
  feeds: Feed[];
  isLoading: boolean;
};

const Container = ({ feeds, isLoading }: ContainerProps) => {
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
        <Card title="Feeds">
          <List
            itemLayout="horizontal"
            dataSource={feeds}
            renderItem={ListItemRenderer}
            loading={isLoading}
          />
        </Card>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default Container;
