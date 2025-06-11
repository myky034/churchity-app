"use client";

import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Upload,
  Flex,
} from "antd";
import type { GetProp, UploadProps, UploadFile } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    style: { textAlign: "left" } as const,
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export default function InteractiveForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new window.Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div>
      <Form {...formItemLayout} form={form} style={{ maxWidth: "100%" }}>
        {/* <Flex dir="column" gap="16px"></Flex> */}
        {/* <Flex vertical gap="16px"></Flex> */}
        <Form.Item>
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              onPreview={onPreview}
              maxCount={1}
            >
              {loading ? (
                <LoadingOutlined />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="Holy Name"
          name="holyname"
          rules={[{ required: true, message: "Please input holy name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please input full name!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="TextArea"
          name="TextArea"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Mentions"
          name="Mentions"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Mentions />
        </Form.Item>

        <Form.Item
          label="Select"
          name="Select"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Cascader"
          name="Cascader"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Cascader />
        </Form.Item>

        <Form.Item
          label="TreeSelect"
          name="TreeSelect"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <TreeSelect />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="RangePicker"
          name="RangePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
