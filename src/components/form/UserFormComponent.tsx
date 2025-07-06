"use client";

import React from "react";
import dayjs from "dayjs";
import {
  Image,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Drawer,
  Space,
} from "antd";
import type { UploadProps } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useUserForm } from "./useUserForm";

interface UserFormProps {
  onClose?: () => void;
  open?: boolean;
  isTeacher?: boolean;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    style: { textAlign: "left" } as const,
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const UserFormComponent: React.FC<UserFormProps> = ({
  onClose,
  open,
  isTeacher,
}) => {
  const [form] = Form.useForm();

  const {
    avatarFileList,
    selectedGrade,
    submitting,
    grades,
    classes,
    roles,
    handleAvatarChange,
    handleRemoveAvatar,
    handleFinishForm,
    handleGradeChange,
    resetForm,
  } = useUserForm(isTeacher, onClose);

  const handleSubmitClick = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    resetForm();
    onClose?.();
  };

  const onFinish = async (values: any) => {
    const success = await handleFinishForm(values);
    if (success) {
      form.resetFields();
      resetForm();
    }
  };

  return (
    <div>
      <Drawer
        title={isTeacher ? "Create a new teacher" : "Create a new student"}
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
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              onClick={handleSubmitClick}
              type="primary"
              htmlType="submit"
              loading={submitting}
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
          onFinish={onFinish}
        >
          <Form.Item name="avatar" className={styles.userform}>
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
            label="Tên Thánh"
            name="holyname"
            rules={[
              { required: true, message: "Hãy nhập tên thánh người dùng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Họ Tên"
            name="name"
            rules={[{ required: true, message: "Hãy nhập họ tên người dùng!" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Khối"
            name="grade"
            rules={[{ required: true, message: "Hãy chọn khối người dùng!" }]}
          >
            <Select
              placeholder="Chọn khối"
              onChange={(value) => {
                handleGradeChange(value);
                form.setFieldsValue({ class: undefined });
              }}
              allowClear
            >
              {grades.map((grade) => (
                <Select.Option key={grade.grade_id} value={grade.grade_id}>
                  {grade.gradename}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Lớp"
            name="class"
            rules={[{ required: true, message: "Hãy chọn lớp người dùng!" }]}
          >
            <Select placeholder="Chọn lớp">
              {classes
                .filter((cls) => cls.grade_id === selectedGrade)
                .map((cls) => (
                  <Select.Option key={cls.class_id} value={cls.class_id}>
                    {cls.classname}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: isTeacher ? true : false,
                message: "Hãy nhập email người dùng!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="phone"
            rules={[
              {
                required: isTeacher ? true : false,
                message: "Hãy nhập số điện thoại người dùng!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Ngày Sinh"
            name="birthday"
            rules={[{ required: false }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Ngày Rửa Tội"
            name="baptismdate"
            rules={[{ required: false }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Nơi Rửa Tội"
            name="baptismplace"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày Rước Lễ Lần Đầu"
            name="firstCommunionDate"
            rules={[{ required: false }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Nơi Rước Lễ Lần Đầu"
            name="firstCommunionPlace"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày Thêm Sức"
            name="confirmationDate"
            rules={[{ required: false }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Nơi Thêm Sức"
            name="confirmationPlace"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày Bao Đồng"
            name="professionOfFaithDate"
            rules={[{ required: false }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Nơi Bao Đồng"
            name="professionOfFaithPlace"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa Chỉ"
            name="address"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Tên Thánh & Họ Tên Cha"
            name="fathername"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ tên Cha của người dùng!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại Cha"
            name="fatherphone"
            rules={[
              {
                required: isTeacher ? true : false,
                message: "Hãy nhập số điện thoại người dùng!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Tên Thánh & Họ Tên Mẹ"
            name="mothername"
            rules={[
              { required: true, message: "Hãy nhập họ tên Mẹ của người dùng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại Mẹ"
            name="motherphone"
            rules={[
              {
                required: isTeacher ? true : false,
                message: "Hãy nhập số điện thoại người dùng!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          {isTeacher && (
            <>
              <Form.Item
                label="Quyền"
                name="role"
                rules={[
                  { required: true, message: "Hãy chọn quyền cho người dùng!" },
                ]}
              >
                <Select />
              </Form.Item>

              <Form.Item
                label="Chức Vụ"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn chức vụ cho người dùng!",
                  },
                ]}
              >
                <Select />
              </Form.Item>
            </>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default UserFormComponent;
