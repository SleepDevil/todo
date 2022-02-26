import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./home.css";
import { Link, Route, Routes } from "react-router-dom";
import Todo from "./todo";
import Calculator from "../components/calculator";
import Olympic from "../components/Olympic/index";

export default function Home() {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout style={{ height: "100%" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["todo"]}>
          <Menu.Item key="todo" icon={<UserOutlined />}>
            <Link to="/home/todo">代办清单</Link>
          </Menu.Item>
          <Menu.Item key="calculator" icon={<VideoCameraOutlined />}>
            <Link to="/home/calculator">计算器</Link>
          </Menu.Item>
          <Menu.Item key="olympic" icon={<UploadOutlined />}>
            <Link to="/olympic">冰墩墩</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route path="/todo" element={<Todo />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>SleepDevil ©2022</Footer>
      </Layout>
    </Layout>
  );
}
