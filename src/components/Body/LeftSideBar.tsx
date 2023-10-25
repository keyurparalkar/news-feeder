import { Menu } from "antd";
import type { MenuProps } from "antd";

import Sider from "antd/es/layout/Sider";
import { useContext } from "react";
import { FeedDispatchContext } from "../../context";
import { SELECT_SOURCE } from "../../context/actions";

const leftSiderStyle: React.CSSProperties = {
  backgroundColor: "white",
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
  getItem("The Guardian", "theguardian"),
  getItem("New York Times", "newyorktimes"),
  getItem("BBC News", "bbcnews"),
];

export const LeftSider = () => {
  const dispatch = useContext(FeedDispatchContext);

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    dispatch({ type: SELECT_SOURCE, payload: key });
  };

  return (
    <Sider style={leftSiderStyle}>
      <Menu
        defaultSelectedKeys={["theguardian"]}
        mode="inline"
        items={items}
        onClick={handleClick}
        style={menuStyles}
      />
    </Sider>
  );
};

export default LeftSider;
