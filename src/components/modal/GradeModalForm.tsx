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
}

const GradeModalForm: React.FC<GradeModalFormProps> = ({
  visible,
  onClose,
  loading,
  onFinish,
  onFinishFailed,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible && !initialValues) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);
  return (
    <div>
      <Modal
        open={visible}
        title="Title"
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
