import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import RoleForm from "../form/RoleForm";

interface RoleModalFormProps {
  visible: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  onFinish: (values: {
    rolename: string;
    roledescription: string;
    isactive: boolean;
  }) => void;
  initialValues: {
    rolename: string;
    roledescription: string;
    isactive: boolean;
  };
  loading?: boolean;
}

const RoleModalForm: React.FC<RoleModalFormProps> = ({
  visible,
  mode,
  onClose,
  onFinish,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form]);

  return (
    <div>
      <Modal
        title={mode === "create" ? "Create Class" : "Edit Role"}
        centered
        open={visible}
        onCancel={onClose}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={null}
      >
        <RoleForm
          form={form}
          onClose={onClose}
          loading={loading}
          onFinish={onFinish}
        />
      </Modal>
    </div>
  );
};

export default RoleModalForm;
