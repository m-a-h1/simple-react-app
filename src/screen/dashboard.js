import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { Form, Input, Button, Row, Space, Col, message } from "antd";
import axios from "axios";

function DashboardScreen() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const username = state.username;
  console.log("username: ", username);

  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getMyUsers();
  }, []);

  // it get all logs
  const getLogs = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/v1/admin/getlogs`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result: ", result);
        if (result.status === 200) setLogs(result.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMyUsers = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/v1/admin/get-my-users`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result: ", result);
        if (result.status === 200) setUsers(result.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/v1/admin/signout`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result: ", result);
        message.warning("you logged out successfully");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ margin: "50px" }}>
      <div>
        <p>your name is: {username}</p>
      </div>
      <Row justify="space-between">
        <Col>
          <FormComponent getMyUsers={getMyUsers} />
        </Col>
        <Col>
          <Space>
            <Button style={{ backgroundColor: "lightgreen" }} onClick={getLogs}>
              get logs
            </Button>
            <Button style={{ backgroundColor: "red" }} onClick={logout}>
              log out
            </Button>
          </Space>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginLeft: "50px", marginRight: "5px" }}>
        <Col>
          {users.map((user, i) => {
            return (
              <div key={i + 100}>
                <span>
                  {user.name} - {user.number}
                </span>
              </div>
            );
          })}
        </Col>
        <Col>
          {logs.map((log, i) => {
            return (
              <div key={i}>
                <span>
                  {log.name} - {log.number} - {log.adminName}
                </span>
              </div>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}

const FormComponent = ({ getLogs, getMyUsers }) => {
  const submit = async ({ name, number }) => {
    console.log(name, " ", number);

    axios
      .post(
        `${process.env.REACT_APP_URL}/api/v1/user/createUser`,
        {
          name,
          number,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log("result: ", result);
        if (result.status === 200) {
          message.success("user created successfully");
        }
        getMyUsers();
      })
      .catch((e) => {
        console.log("error: ", e);
        message.error("please signin first");
      });
  };

  return (
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
        label="name"
        name="name"
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
        label="number"
        name="number"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          create user
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DashboardScreen;
