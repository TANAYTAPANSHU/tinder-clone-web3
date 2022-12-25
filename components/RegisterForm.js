import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Notification from "./Notification";

function RegisterForm(props) {
  const [userDetails, setUserDetails] = React.useState({
    username: null,
    wallet_address: props.wallet_address,
    age: null,
    email: null,
    school: null,
    city: null,
    country: null,
    image_url: null,
  });
  const onFinish = (values) => {
    setUserDetails({...userDetails, ...values})
    props.createAccount({...userDetails, ...values});
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div class="w-5/12  bg-white flex flex-col items-center justify-center  py-8 rounded-3xl 2xl:w-4/12  xl:w-5/12   lg:w-7/12">
      <Form
        name="dinder_registration"
        labelCol={{}}
        wrapperCol={{}}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="font-bold text-3xl relative mb-10 right-9 ">Create Account</h1>
        <div
        className="mb-5"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            label="Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            style={{
              marginLeft: 15,
            }}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </div>

        <Form.Item
          label="Image URL"
          name="image_url"
          rules={[
            {
              required: true,
              message: "Please input your image URL!",
            },
          ]}
        >
          <Input type="url" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <Input type="number" min={18} />
          </Form.Item>

          <Form.Item
            style={{
              marginLeft: 15,
            }}
            label="School"
            name="school"
          >
            <Input />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            style={{
              marginLeft: 15,
            }}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            style={{
              background: "#ef4444",
              position: "relative",
              left: 40,
              height: 40,
              width: 100,
            }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2022 Dinder. All rights reserved.
      </p>
    </div>
  );
}

export default RegisterForm;
