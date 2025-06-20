import React from "react";
import { Form, Input, Button, Checkbox } from "antd";

interface GradeFormProps {
  initialValues: {
    gradename: string;
    gradedescription: string;
    isactive: boolean;
  };
  onFinish: (values: {
    gradename: string;
    gradedescription: string;
    isactive: boolean;
  }) => void;
  onFinishFailed?: () => void;
  onClose?: () => void;
  loading?: boolean;
  form: import("antd").FormInstance; // Use FormInstance type from Ant Design
}

const GradeForm: React.FC<GradeFormProps> = ({
  onClose,
  loading,
  onFinish,
  onFinishFailed,
  initialValues,
  form,
}) => {
  return (
    <div>
      <Form
        name="gradeform"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
        variant={"outlined"}
        labelAlign="left"
      >
        <Form.Item
          label="Grade Name"
          name="gradename"
          rules={[{ required: true, message: "Please input grade!" }]}
        >
          <Input autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="gradedescription"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="isactive" valuePropName="checked" label={null}>
          <Checkbox>Acive</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            //onClick={handleOk}
            loading={loading}
          >
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

export default GradeForm;
