"use client";

import React, { useState } from "react";
import {
  Image,
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
  Drawer,
  Space,
} from "antd";
import type { UploadProps, UploadFile } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";

interface UserFormProps {
  onClose?: () => void;
  open?: boolean;
}

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

const UserForm: React.FC<UserFormProps> = ({ onClose, open }) => {
  const [form] = Form.useForm();
  //const [loading, setLoading] = useState(false);
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);

  const handleAvatarChange: UploadProps["onChange"] = async ({ fileList }) => {
    // Only keep the latest file
    const latestFileList = fileList.slice(-1);

    // Generate preview for the new file if needed
    if (latestFileList.length > 0 && !latestFileList[0].thumbUrl) {
      const file = latestFileList[0].originFileObj as File;
      latestFileList[0].thumbUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setAvatarFileList(latestFileList);
  };

  const handleFinishForm = () => {
    console.log("Submit user");
  };

  const handleSubmitClick = () => {
    form.submit(); // This will trigger validation and call onFinish if valid
  };

  const handleRemoveAvatar = () => {
    setAvatarFileList([]);
  };

  return (
    <div>
      <Drawer
        title="Create a new student"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                form.resetFields(); // Reset all form fields and validation
                setAvatarFileList([]); // Clear the avatar preview
                onClose?.(); // Close the drawer if provided
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitClick}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          {...formItemLayout}
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={handleFinishForm}
        >
          <Form.Item
            label={<span style={{ color: "transparent" }}>Avatar</span>}
            name="avatar"
          >
            <div
              style={{
                position: "relative",
                width: 120,
                height: 120,
                margin: "0 auto",
              }}
            >
              {avatarFileList.length > 0 ? (
                <>
                  <Image
                    src={avatarFileList[0].thumbUrl}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      border: "2px solid #eee",
                      background: "#fafafa",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "#fff",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      cursor: "pointer",
                      border: "1px solid #e6e6e6",
                    }}
                    onClick={handleRemoveAvatar}
                  >
                    <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>
                      ×
                    </span>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "2px solid #eee",
                    background: "#fafafa",
                    fontSize: 64,
                    color: "#bfbfbf",
                  }}
                >
                  <UserOutlined />
                </div>
              )}

              {/* Upload luôn có mặt, user có thể chọn lại sau khi xóa */}
              <Upload
                showUploadList={false}
                accept="image/png,image/jpeg,image/jpg"
                beforeUpload={() => false}
                onChange={handleAvatarChange}
                fileList={avatarFileList}
                maxCount={1}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -6,
                    right: -6,
                    background: "#fff",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    border: "1px solid #e6e6e6",
                    cursor: "pointer",
                  }}
                >
                  <CameraOutlined style={{ fontSize: 20, color: "#1890ff" }} />
                </div>
              </Upload>
            </div>
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
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Please select grade!" }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: "Please select class!" }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: false }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Baptism Date"
            name="baptismdate"
            rules={[{ required: true, message: "Please select baptism date!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Baptism Place"
            name="baptismplace"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Father name"
            name="fathername"
            rules={[{ required: true, message: "Please input father name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mother name"
            name="mothername"
            rules={[{ required: true, message: "Please input mother name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UserForm;
