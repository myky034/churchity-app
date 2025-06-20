import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox, Select } from "antd";

interface Grade {
  id: string;
  name: string;
  isactive: boolean;
}

interface ClassFormProps {
  onClose?: () => void;
  loading?: boolean;
  onFinish: (values: {
    classname: string;
    grade: string;
    isactive: boolean;
  }) => void;
  form?: import("antd").FormInstance; // Use FormInstance type from Ant Design
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

const ClassForm: React.FC<ClassFormProps> = ({
  onClose,
  loading,
  onFinish,
  form,
}) => {
  const [grades, setGrades] = React.useState<Grade[]>([]);

  useEffect(() => {
    // Fetch grades from API or state management
    const fetchGrades = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/grade", {
          method: "GET",
        });
        const data = await response.json();
        console.log("Fetched grades:", data);
        // Map data to { key, name }
        const mapped = data.map(
          (
            g: Partial<Grade> & {
              grade_id?: string;
              gradename?: string;
              key?: string;
              isactive?: boolean;
            }
          ) => ({
            id: g.grade_id ?? g.id ?? g.key ?? "",
            name: g.gradename ?? g.name ?? "",
            isactive: g.isactive ?? false,
          })
        );
        const activeGrades = mapped.filter((g: Grade) => g.isactive === true);
        setGrades(activeGrades);
      } catch {
        // Handle error if needed
      }
    };
    fetchGrades();
  }, []);

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
          label="Class Name"
          name="classname"
          rules={[{ required: true, message: "Please input class name!" }]}
        >
          <Input autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Grade"
          name="grade"
          rules={[{ required: true, message: "Please select grade!" }]}
        >
          <Select placeholder="Select a grade">
            {grades.map((grade) => (
              <Select.Option key={grade.id} value={grade.id}>
                {grade.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="isactive" valuePropName="checked" label={null}>
          <Checkbox>Active</Checkbox>
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

export default ClassForm;
