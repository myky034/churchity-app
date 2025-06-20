import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import ClassForm from "@/components/form/ClassForm";

interface ClassModalFormProps {
  visible: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  loading?: boolean;
  onFinish: (values: {
    classname: string;
    grade: string;
    isactive: boolean;
  }) => void;
  initialValues: {
    classname: string;
    grade: string;
    isactive: boolean;
  };
}

const ClassModalForm: React.FC<ClassModalFormProps> = ({
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
        title={mode === "create" ? "Create Class" : "Edit Class"}
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
        <ClassForm
          form={form}
          onClose={onClose}
          loading={loading}
          onFinish={onFinish}
        />
      </Modal>
    </div>
  );
};

export default ClassModalForm;
