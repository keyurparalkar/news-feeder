import { Card, Col, Flex, Row, Space, Tag, Typography } from "antd";
import {
  UserOutlined,
  CheckCircleTwoTone,
  CommentOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const { Text } = Typography;

const rightSliderStyle: React.CSSProperties = {
  backgroundColor: "white",
  overflowY: "scroll",
  maxHeight: "90vh",
};

const infoCardStyles: React.CSSProperties = {
  backgroundColor: "#f5faff",
  border: "1px solid #9cbffa",
};

const verifyCardStyles: React.CSSProperties = {
  backgroundColor: "#f0ffe9",
  borderRadius: "10px",
  height: 150,
  border: "1px solid #9EDE81",
};

const RightSider = () => {
  //   const { datasources, selectedTable } = useContext(DataContext);

  return (
    <Sider style={rightSliderStyle} width="800px">
      <Card style={{ borderRadius: "0" }} title="Datasource Overview">
        Right Sider
      </Card>
    </Sider>
  );
};

export default RightSider;
