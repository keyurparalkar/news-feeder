import type { MenuProps } from "antd";
import { Menu } from "antd";

import Sider from "antd/es/layout/Sider";
import { useContext } from "react";
import { FeedDispatchContext } from "../../context";
import { SELECT_SOURCE } from "../../context/actions";
import { FeedsByCategoryKeys, FeedsKey, GlobalKeys } from "../../types/feeds";

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
    "sourceGroup",
    null,
    [
      getItem("Business", FeedsByCategoryKeys.BUSINESS),
      getItem("Science", FeedsByCategoryKeys.SCIENCE),
      getItem("Sports", FeedsByCategoryKeys.SPORTS),
    ],
    "group"
  ),
  // getItem(
  //   "By Authors",
  //   "sourceGroup",
  //   null,
  //   [
  //     getItem("The Guardian", FeedsKey.GUARDIAN),
  //     getItem("New York Times", FeedsKey.NYT),
  //     getItem("BBC News", FeedsKey.BBC),
  //   ],
  //   "group"
  // ),
];

export const LeftSider = () => {
  const dispatch = useContext(FeedDispatchContext);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    dispatch({ type: SELECT_SOURCE, payload: key });
  };

  return (
    <Sider style={leftSiderStyle}>
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
