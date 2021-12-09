import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Row, Col, message } from "antd";
import axios from "axios";

function SigninScreen() {
  const [type, setType] = useState("sign in");

  const navigate = useNavigate();

  const submit = async ({ username, password }) => {
    console.log(username, " ", password);

    // sign in request to the server
    if (type === "sign in") {
      try {
        const result = await axios.post(
          "http://localhost:4000/api/v1/admin/signin",
          {
            username,
            password,
          },
          { withCredentials: true }
        );

        console.log("result: ", result);
        if (result.status === 200) {
          navigate("/dashboard", { state: { username: result.data.data.admin.username } });
        }
      } catch (e) {
        console.log(e);
        message.error("no user found");
      }
      // sing up requres to the server
    } else {
      const result = await axios({
        method: "post",
        url: "http://localhost:4000/api/v1/admin/signup",
        data: {
          username,
          password,
        },
        headers: { withCredentials: true },
      });
      console.log("result: ", result);
      if (result.status === 201) {
        navigate("/dashboard", { state: { username: result.data.data.admin.username } });
      }
    }
  };

  return (
    <Row justify="center" gutter={[0, 40]}>
      <div className="singinBox">
        <Row justify="center" gutter={[20]} style={{ marginBottom: "20px" }}>
          <Col>
            <Button type="primary" shape="round" size={"middle"} onClick={() => setType("sign in")}>
              Sign in
            </Button>
          </Col>

          <Col>
            <Button type="primary" shape="round" size={"middle"} onClick={() => setType("sign up")}>
              Sign up
            </Button>
          </Col>
        </Row>
        <Form
          name="singin"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={submit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {type}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
}

export default SigninScreen;
