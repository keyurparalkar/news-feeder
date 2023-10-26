import type { MenuProps } from "antd";
import { Menu } from "antd";

import Sider from "antd/es/layout/Sider";
import { useContext } from "react";
import { FeedDispatchContext } from "../../context";
import { SELECT_SOURCE } from "../../context/actions";
import {
  FeedsByAuthor,
  FeedsByCategoryKeys,
  FeedsKey,
  GlobalKeys,
} from "../../types/feeds";

const leftSiderStyle: React.CSSProperties = {
  backgroundColor: "white",
  maxHeight: "90vh",
  overflowY: "scroll",
};

const menuStyles: React.CSSProperties = {
  fontWeight: "bold",
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "By Source",
    "sourceGroup",
    null,
    [
      getItem("The Guardian", FeedsKey.GUARDIAN),
      getItem("New York Times", FeedsKey.NYT),
      getItem("BBC News", FeedsKey.BBC),
      getItem("All Sources", GlobalKeys.ALL),
    ],
    "group"
  ),
  getItem(
    "By Categories",
    "categoryGroup",
    null,
    [
      getItem("Business", FeedsByCategoryKeys.BUSINESS),
      getItem("Science", FeedsByCategoryKeys.SCIENCE),
      getItem("Sports", FeedsByCategoryKeys.SPORTS),
    ],
    "group"
  ),
  getItem(
    "By Authors",
    "authorGroup",
    null,
    [
      getItem("Tim de Lisle", FeedsByAuthor["Tim de Lisle"]),
      getItem("ET Markets", FeedsByAuthor["ET Markets"]),
      getItem("Lisa", FeedsByAuthor.Lisa),
    ],
    "group"
  ),
];

export const LeftSider = () => {
  const dispatch = useContext(FeedDispatchContext);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    dispatch({ type: SELECT_SOURCE, payload: key });
  };

  return (
    <Sider style={leftSiderStyle} breakpoint="sm">
      <Menu
        defaultSelectedKeys={[FeedsKey.GUARDIAN]}
        mode="inline"
        items={items}
        onClick={handleClick}
        style={menuStyles}
      />
    </Sider>
  );
};

export default LeftSider;
