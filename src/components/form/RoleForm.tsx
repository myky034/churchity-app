import React from "react";
import { Button, Form, Input, Checkbox } from "antd";

interface RoleFormProps {
  onClose?: () => void;
  onFinish: (values: {
    rolename: string;
    roledescription: string;
    isactive: boolean;
  }) => void;
  loading?: boolean;
  form?: import("antd").FormInstance;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const RoleForm: React.FC<RoleFormProps> = ({
  onClose,
  loading,
  form,
  onFinish,
}) => {
  return (
    <div>
      <Form
        name="classform"
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        {...formItemLayout}
        variant={"outlined"}
        labelAlign="left"
      >
        <Form.Item
          label="Role Name"
          name="rolename"
          rules={[{ required: true, message: "Please input role name!" }]}
        >
          <Input autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="roledescription"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="isactive" valuePropName="checked" label={null}>
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button
            type="default"
            onClick={onClose}
            style={{ marginLeft: "8px" }}
            disabled={loading}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoleForm;
