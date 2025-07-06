"use client";

import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Drawer,
  Space,
  message,
} from "antd";
import type { UploadProps, UploadFile } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import Image from "next/image";

interface UserFormProps {
  onClose?: () => void;
  open?: boolean;
  isTeacher?: boolean;
  onSuccess?: () => void;
  editUser?: Users; // User data for editing
  isEditMode?: boolean;
}

export interface Users {
  id: string;
  name: string;
  email?: string;
  phone?: string | number;
  birthday?: string;
  address?: string;
  class: string;
  grade: string;
  holyname: string;
  fathername: string;
  fatherphone?: string | number;
  mothername: string;
  motherphone?: string | number;
  baptismplace?: string;
  baptismdate?: string;
  role?: string;
  role_id?: string;
  title?: string;
  isActive?: boolean;
  lastlogin?: string;
  created_by?: string;
  updated_by?: string;
  firstCommunionDate?: string;
  firstCommunionPlace?: string;
  confirmationDate?: string;
  confirmationPlace?: string;
  professionOfFaithDate?: string;
  professionOfFaithPlace?: string;
  catechistLevel?: string;
  avatar?: string;
}

interface Grade {
  grade_id: string;
  gradename: string;
}

interface Class {
  class_id: string;
  classname: string;
  grade_id: string;
}

interface Role {
  roleid: string;
  rolename: string;
}

interface UserFormValues {
  name: string;
  email?: string;
  phone?: string | number;
  birthday?: dayjs.Dayjs;
  address?: string;
  class: string;
  grade: string;
  holyname: string;
  fathername: string;
  fatherphone?: string | number;
  mothername: string;
  motherphone?: string | number;
  baptismplace?: string;
  baptismdate?: dayjs.Dayjs;
  role?: string;
  role_id?: string;
  title?: string;
  isActive?: boolean;
  lastlogin?: dayjs.Dayjs;
  created_by?: string;
  updated_by?: string;
  firstCommunionDate?: dayjs.Dayjs;
  firstCommunionPlace?: string;
  confirmationDate?: dayjs.Dayjs;
  confirmationPlace?: string;
  professionOfFaithDate?: dayjs.Dayjs;
  professionOfFaithPlace?: string;
  catechistLevel?: string;
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

const UserForm: React.FC<UserFormProps> = ({
  onClose,
  open,
  isTeacher,
  onSuccess,
  editUser,
  isEditMode = false,
}) => {
  const [form] = Form.useForm();
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // API functions
  const fetchGrades = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/grade");
      const data = await res.json();
      setGrades(data);
    } catch {
      setGrades([]);
    }
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/classs");
      const data = await res.json();
      setClasses(data);
    } catch {
      setClasses([]);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/role");
      const data = await res.json();
      setRoles(data);
    } catch {
      setRoles([]);
    }
  }, []);

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchGrades(), fetchClasses(), fetchRoles()]);
    };
    initializeData();
  }, [fetchGrades, fetchClasses, fetchRoles]);

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && editUser) {
      console.log("Populating form with edit user:", editUser);

      // Convert date strings to dayjs objects
      const formatDateString = (dateString?: string) => {
        return dateString ? dayjs(dateString) : undefined;
      };

      form.setFieldsValue({
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        birthday: formatDateString(editUser.birthday),
        address: editUser.address,
        class: editUser.class,
        grade: editUser.grade,
        holyname: editUser.holyname,
        fathername: editUser.fathername,
        fatherphone: editUser.fatherphone,
        mothername: editUser.mothername,
        motherphone: editUser.motherphone,
        baptismplace: editUser.baptismplace,
        baptismdate: formatDateString(editUser.baptismdate),
        role: editUser.role,
        role_id: editUser.role_id,
        title: editUser.title,
        firstCommunionDate: formatDateString(editUser.firstCommunionDate),
        firstCommunionPlace: editUser.firstCommunionPlace,
        confirmationDate: formatDateString(editUser.confirmationDate),
        confirmationPlace: editUser.confirmationPlace,
        professionOfFaithDate: formatDateString(editUser.professionOfFaithDate),
        professionOfFaithPlace: editUser.professionOfFaithPlace,
        catechistLevel: editUser.catechistLevel,
      });

      // Set avatar if exists
      if (editUser.avatar) {
        setAvatarFileList([
          {
            uid: "-1",
            name: "avatar.jpg",
            status: "done",
            url: editUser.avatar,
            thumbUrl: editUser.avatar,
          },
        ]);
      }
    }
  }, [isEditMode, editUser, form]);

  // Avatar handling
  const handleAvatarChange: UploadProps["onChange"] = ({ fileList }) => {
    console.log("Avatar change:", fileList);

    // Create preview URL for the selected file
    const latestFile = fileList.slice(-1)[0];
    if (latestFile && latestFile.originFileObj) {
      const previewUrl = URL.createObjectURL(latestFile.originFileObj);
      console.log("Created preview URL:", previewUrl);

      // Create a new file object with the URL
      const fileWithUrl = {
        ...latestFile,
        url: previewUrl,
        thumbUrl: previewUrl,
        preview: previewUrl,
      };

      console.log("File with URL:", fileWithUrl);
      setAvatarFileList([fileWithUrl]);
    } else {
      setAvatarFileList(fileList.slice(-1));
    }
  };

  const handleRemoveAvatar = () => {
    // Clean up preview URL to prevent memory leaks
    if (avatarFileList[0]?.url && avatarFileList[0].url.startsWith("blob:")) {
      URL.revokeObjectURL(avatarFileList[0].url);
    }
    setAvatarFileList([]);
  };

  // Form submission
  const handleFinishForm = async (values: UserFormValues) => {
    setSubmitting(true);
    try {
      let avatarUrl = "";

      // Only upload if a file is selected
      if (avatarFileList.length > 0 && avatarFileList[0].originFileObj) {
        console.log("Uploading file:", avatarFileList[0].originFileObj);

        const formData = new FormData();
        formData.append("file", avatarFileList[0].originFileObj as File);

        try {
          const res = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error("Upload failed:", res.status, errorText);
            message.error("Không thể tải lên hình ảnh. Vui lòng thử lại.");
            return;
          }

          const data = await res.json();
          console.log("Upload response:", data);

          if (data.url) {
            avatarUrl = data.url;
            console.log("Avatar URL:", avatarUrl);
          } else {
            console.error("No URL in upload response:", data);
            message.error("Không thể lấy URL hình ảnh. Vui lòng thử lại.");
            return;
          }
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          message.error("Lỗi khi tải lên hình ảnh. Vui lòng thử lại.");
          return;
        }
      }

      const formatDate = (date: dayjs.Dayjs | undefined) =>
        date ? date.format("YYYY-MM-DD") : undefined;

      let role = values.role;
      let role_id = values.role_id;

      if (!isTeacher) {
        role = "Student";
        const studentRole = roles.find((r) => r.rolename === "Student");
        role_id = studentRole ? studentRole.roleid : "";
      }

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone ? String(values.phone) : undefined,
        birthday: formatDate(values.birthday),
        address: values.address,
        class: values.class,
        grade: values.grade,
        holyname: values.holyname,
        fathername: values.fathername,
        fatherphone: values.fatherphone,
        mothername: values.mothername,
        motherphone: values.motherphone,
        baptismplace: values.baptismplace,
        baptismdate: formatDate(values.baptismdate),
        role,
        role_id,
        title: values.title,
        isActive: true,
        lastlogin: null,
        created_by: values.created_by || "",
        updated_by: values.updated_by || "",
        firstCommunionDate: formatDate(values.firstCommunionDate),
        firstCommunionPlace: values.firstCommunionPlace,
        confirmationDate: formatDate(values.confirmationDate),
        confirmationPlace: values.confirmationPlace,
        professionOfFaithDate: formatDate(values.professionOfFaithDate),
        professionOfFaithPlace: values.professionOfFaithPlace,
        catechistLevel: values.catechistLevel,
        avatar: avatarUrl,
      };

      const url = isEditMode
        ? `http://localhost:3000/api/users/${editUser?.id}`
        : "http://localhost:3000/api/users";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const successMessage = isEditMode
          ? "Cập nhật người dùng thành công!"
          : "Tạo người dùng thành công!";
        message.success(successMessage);
        form.resetFields();
        setAvatarFileList([]);
        onSuccess?.();
        onClose?.();
        console.log("Submitting user payload:", payload);
      } else {
        const errorData = await response.json();
        const errorMessage = isEditMode
          ? "Có lỗi xảy ra khi cập nhật người dùng."
          : "Có lỗi xảy ra khi tạo người dùng.";
        message.error(errorData.message || errorMessage);
      }
    } catch {
      message.error("Có lỗi xảy ra khi tạo người dùng.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitClick = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setAvatarFileList([]);
    onClose?.();
  };

  // Avatar component
  const AvatarComponent = () => {
    const currentFile = avatarFileList[0];
    let imageUrl =
      currentFile?.url || currentFile?.thumbUrl || currentFile?.preview;

    // If no URL is set but we have an originFileObj, create a preview URL
    if (!imageUrl && currentFile?.originFileObj) {
      imageUrl = URL.createObjectURL(currentFile.originFileObj);
      // Update the file object with the URL
      currentFile.url = imageUrl;
      currentFile.thumbUrl = imageUrl;
      currentFile.preview = imageUrl;
    }

    console.log("AvatarComponent - currentFile:", currentFile);
    console.log("AvatarComponent - imageUrl:", imageUrl);

    return (
      <div
        style={{
          position: "relative",
          width: 120,
          height: 120,
          margin: "0 auto",
        }}
      >
        {avatarFileList.length > 0 && imageUrl ? (
          <>
            <Image
              src={imageUrl}
              fill
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
              <span style={{ color: "#ff4d4f", fontWeight: "bold" }}>×</span>
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
    );
  };

  return (
    <div>
      <Drawer
        title={
          isEditMode
            ? isTeacher
              ? "Edit the teacher"
              : "Edit the student"
            : isTeacher
            ? "Create a new teacher"
            : "Create a new student"
        }
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
              {isEditMode ? "Update" : "Submit"}
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
          <Form.Item name="avatar" className={styles.userform}>
            <AvatarComponent />
          </Form.Item>

          <Form.Item
            label="Tên Thánh"
            name="holyname"
            rules={[{ required: false }]}
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
                setSelectedGrade(value);
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
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không đúng định dạng!",
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
              {
                pattern: /^[0-9+\-\s()]+$/,
                message:
                  "Số điện thoại chỉ được chứa số, dấu +, -, khoảng trắng và dấu ngoặc!",
              },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  // Remove all non-digit characters for length check
                  const digitsOnly = value.replace(/\D/g, "");

                  if (digitsOnly.length < 10) {
                    return Promise.reject(
                      new Error("Số điện thoại phải có ít nhất 10 chữ số!")
                    );
                  }

                  if (digitsOnly.length > 15) {
                    return Promise.reject(
                      new Error("Số điện thoại không được quá 15 chữ số!")
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
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
                message: "Hãy nhập số điện thoại Cha!",
              },
              {
                pattern: /^[0-9+\-\s()]+$/,
                message:
                  "Số điện thoại chỉ được chứa số, dấu +, -, khoảng trắng và dấu ngoặc!",
              },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  // Remove all non-digit characters for length check
                  const digitsOnly = value.replace(/\D/g, "");

                  if (digitsOnly.length < 10) {
                    return Promise.reject(
                      new Error("Số điện thoại phải có ít nhất 10 chữ số!")
                    );
                  }

                  if (digitsOnly.length > 15) {
                    return Promise.reject(
                      new Error("Số điện thoại không được quá 15 chữ số!")
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
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
                message: "Hãy nhập số điện thoại Mẹ!",
              },
              {
                pattern: /^[0-9+\-\s()]+$/,
                message:
                  "Số điện thoại chỉ được chứa số, dấu +, -, khoảng trắng và dấu ngoặc!",
              },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  // Remove all non-digit characters for length check
                  const digitsOnly = value.replace(/\D/g, "");

                  if (digitsOnly.length < 10) {
                    return Promise.reject(
                      new Error("Số điện thoại phải có ít nhất 10 chữ số!")
                    );
                  }

                  if (digitsOnly.length > 15) {
                    return Promise.reject(
                      new Error("Số điện thoại không được quá 15 chữ số!")
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
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

export default UserForm;
