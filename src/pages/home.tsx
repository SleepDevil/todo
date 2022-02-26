import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import "./home.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Todo from "./todo";
import Calculator from "../components/calculator";
import NewArticle from "./NewArticle";
import Articles from "./article";
import ViewArticle from "../components/ViewArticle";

export default function Home() {
  let navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[localStorage.getItem("currentMenu") ?? "todo"]}
          onClick={(e) => localStorage.setItem("currentMenu", e.key)}
          selectedKeys={[localStorage.getItem("currentMenu") ?? "todo"]}
        >
          <Menu.Item key="todo" icon={<UserOutlined />}>
            <Link to="/home/todo">代办清单</Link>
          </Menu.Item>
          <Menu.Item key="calculator" icon={<VideoCameraOutlined />}>
            <Link to="/home/calculator">计算器</Link>
          </Menu.Item>
          <Menu.Item key="olympic" icon={<UploadOutlined />}>
            <Link to="/olympic">冰墩墩</Link>
          </Menu.Item>
          <Menu.Item key="articles" icon={<UserOutlined />}>
            <Link to="/home/articles">文章</Link>
          </Menu.Item>
          <Menu.Item key="newarticle" icon={<HighlightOutlined />}>
            <Link to="/home/newarticle">写文章</Link>
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
              <Route
                path="/newarticle"
                element={<NewArticle navigate={navigate} />}
              />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ViewArticle />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>SleepDevil ©2022</Footer>
      </Layout>
    </Layout>
  );
}
