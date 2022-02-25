import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useLocalStorage } from "react-use";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form] = useForm();

  let navigate = useNavigate();

  const [dbUsername, setDbUsername, removeDbUsername] = useLocalStorage<
    string | null
  >("username");
  const [dbPassword, setDbPassword, removeDbPassword] = useLocalStorage<
    string | null
  >("password");

  const handleLogin = (val: { username: string; password: string }) => {
    console.log("login", val);
    const { username: inputUsername, password: inputPassword } = val;
    if (inputUsername === dbUsername && inputPassword === dbPassword) {
      message.success("登录成功");
      setTimeout(() => {
        navigate("/todo");
      }, 2000);
    } else {
      message.warning("账号或密码错误，请重试");
    }
  };

  const handleRegister = (val: { username: string; password: string }) => {
    const { username: inputUsername, password: inputPassword } = val;
    setDbUsername(inputUsername);
    setDbPassword(inputPassword);
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="header">{isLogin ? "Login" : "Register"}</div>
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={(val) => {
            isLogin ? handleLogin(val) : handleRegister(val);
          }}
          onFinishFailed={() => {
            console.log("fail");
          }}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                textAlign: "center",
                padding: "10px",
                height: "45px",
              }}
              className="btn"
              type="primary"
              htmlType="submit"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form.Item>
        </Form>

        <div className="msg">
          {isLogin ? "Don't have account ?" : "Already have an account ?"}

          <span
            className="registerBtn"
            onClick={() => {
              setIsLogin(!isLogin);
              form.resetFields();
            }}
          >
            {isLogin ? " Sign up" : " Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}
