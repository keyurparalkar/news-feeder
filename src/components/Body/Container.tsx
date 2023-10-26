import {
  Avatar,
  Card,
  ConfigProvider,
  DatePicker,
  Empty,
  Layout,
  List,
  Space,
  Tag,
  Typography,
} from "antd";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from "lodash";
import { ChangeEvent, Dispatch } from "react";

import { ActionProps } from "../../context";
import { FILTER_DATA } from "../../context/actions";
import { Feed, GlobalKeys, Source } from "../../types/feeds";

dayjs.extend(relativeTime);
const { RangePicker } = DatePicker;
const { Text } = Typography;
const dateFormat = "YYYY/MM/DD";

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#F3F4FD",
  padding: 10,
};

type ItemRendererProps = {
  item: Feed;
  index: number;
  selectedSource: Source;
};

const ListItemRenderer = ({
  item,
  index,
  selectedSource,
}: ItemRendererProps) => {
  const createdAt = dayjs(item.createdAt).fromNow();
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
          />
        }
        title={<a href={item.url}>{item.title}</a>}
        description={
          <Space>
            <Tag>{item.category}</Tag>
            {selectedSource === GlobalKeys.ALL && <Tag>{item.source}</Tag>}
            <Text>{createdAt}</Text>
          </Space>
        }
      />
    </List.Item>
  );
};

type ContainerProps = {
  feeds: Feed[];
  isLoading: boolean;
  dispatch: Dispatch<ActionProps>;
  selectedSource: Source;
};

const Container = ({
  feeds,
  isLoading,
  dispatch,
  selectedSource,
}: ContainerProps) => {
  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FILTER_DATA, payload: e.target.value });
  }, 700);

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
        <Card
          title="Feeds"
          extra={
            <>
              <Search
                placeholder="input search text"
                style={{ width: 200 }}
                onChange={handleSearch}
              />
              <RangePicker
                defaultValue={[
                  dayjs("2015/01/01", dateFormat),
                  dayjs("2015/01/01", dateFormat),
                ]}
                format={dateFormat}
              />
            </>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={feeds}
            renderItem={(item, index) => (
              <ListItemRenderer
                item={item}
                index={index}
                selectedSource={selectedSource}
              />
            )}
            loading={isLoading}
          />
        </Card>
      </Layout.Content>
    </ConfigProvider>
  );
};

export default Container;
