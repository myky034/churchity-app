import React, { useEffect } from "react";
import { Modal, Form } from "antd";
import GradeForm from "@/components/form/GradeForm";

interface GradeModalFormProps {
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  onFinish: (values: {
    gradename: string;
    gradedescription: string;
    isactive: boolean;
  }) => void;
  onFinishFailed?: () => void;
  initialValues?: {
    gradename: string;
    gradedescription: string;
    isactive: boolean;
  };
  mode: "create" | "edit";
}

const GradeModalForm: React.FC<GradeModalFormProps> = ({
  visible,
  onClose,
  loading,
  onFinish,
  onFinishFailed,
  initialValues,
  mode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible && !initialValues) {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form]);
  return (
    <div>
      <Modal
        open={visible}
        title={mode === "create" ? "Create Grade" : "Edit Grade"}
        //onOk={handleOk}
        onCancel={onClose}
        footer={null}
      >
        <GradeForm
          onClose={onClose}
          loading={loading}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={
            initialValues ?? {
              gradename: "",
              gradedescription: "",
              isactive: false,
            }
          }
          form={form}
        />
      </Modal>
    </div>
  );
};

export default GradeModalForm;
