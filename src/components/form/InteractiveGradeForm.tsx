import type { FormProps } from "antd";
import { Button, Form, Input, Checkbox, message } from "antd";
import React, { useState } from "react";

type FieldType = {
  gradename?: string;
  gradedescription?: string;
  isactive?: boolean;
};

interface InteractiveGradeFormProps {
  handleCancel: () => void;
  handleOk: () => void;
}

export default function InteractiveGradeForm({
  handleCancel,
  handleOk,
}: InteractiveGradeFormProps) {
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create grade");
      }

      message.success("Grade created successfully!");
      handleOk();
    } catch (error) {
      message.error("Failed to create grade");
      console.error("Error creating grade:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Grade Name"
          name="gradename"
          rules={[{ required: true, message: "Please input grade!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="gradedescription"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item<FieldType>
          name="isactive"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Acive</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleOk}
            loading={loading}
          >
            Submit
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginLeft: "8px" }}
            disabled={loading}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
