import React, { useEffect, useCallback } from "react";
import {
  Flex,
  Button,
  Divider,
  Table,
  Badge,
  Space,
  Popconfirm,
  message,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ClassModalForm from "../modal/ClassModalForm";
import ClassUpload from "@/components/upload/ClassUpload";

interface Class {
  id: string;
  name: string;
  grade: string;
  grade_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
  isactive: boolean;
}

const ClassTable: React.FC = () => {
  const [classes, setClasses] = React.useState<Class[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [uploadModalVisible, setUploadModalVisible] =
    React.useState<boolean>(false);
  const [mode, setMode] = React.useState<"create" | "edit">("create");
  const [editingClass, setEditingClass] = React.useState<Class | null>(null);

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/classs");
      const data = await res.json();
      setClasses(mapClasses(data));
    } catch {
      message.error("Failed to load classes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleCreate = () => {
    setMode("create");
    setEditingClass(null);
    setModalVisible(true);
  };

  const handleEdit = (record: Class) => {
    setMode("edit");
    setEditingClass(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/api/classs/${id}`, {
        method: "DELETE",
      });
      await fetchClasses();
      message.success("Class deleted");
    } catch {
      message.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: {
    classname: string;
    grade: string;
    isactive: boolean;
  }) => {
    setLoading(true);
    try {
      const url =
        mode === "create"
          ? "http://localhost:3000/api/classs"
          : `http://localhost:3000/api/classs/${editingClass?.id}`;
      const method = mode === "create" ? "POST" : "PUT";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classname: values.classname,
          grade_id: values.grade,
          isActive: values.isactive,
        }),
      });
      await fetchClasses();
      message.success(mode === "create" ? "Class created" : "Class updated");
      setModalVisible(false);
      setEditingClass(null);
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Class name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "created_by",
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Updated By",
      dataIndex: "updated_by",
      key: "updated_by",
    },
    {
      title: "Status",
      dataIndex: "isactive",
      key: "isactive",
      render: (isActive: number) => (
        <span>
          <Badge
            status={isActive ? "success" : "default"}
            text={isActive ? "Active" : "Inactive"}
          />
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_: unknown, record: Class) => (
        <Space
          size="middle"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="Are you sure delete this class?"
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const mapClasses = (data: Record<string, unknown>[]): Class[] =>
    data.map((g) => {
      // Format created and updated dates
      const createdRaw = g.created_at as string;
      const updatedRaw = g.updated_at as string;
      const created_at = createdRaw
        ? new Date(createdRaw).toLocaleDateString("en-GB")
        : new Date().toLocaleDateString("en-GB");
      const updated_at = updatedRaw
        ? new Date(updatedRaw).toLocaleDateString("en-GB")
        : "";
      const grade_id =
        (typeof g.grade_id === "string" && g.grade_id) ||
        (g.grade && typeof g.grade === "object" && "grade_id" in g.grade
          ? (g.grade as { grade_id?: string }).grade_id
          : "");

      return {
        id:
          (g.id as string) || (g.class_id as string) || (g.classname as string),
        name: g.classname as string,
        grade:
          (g.grade && typeof g.grade === "object" && "gradename" in g.grade
            ? (g.grade as { gradename?: string }).gradename
            : undefined) ||
          (g as { gradename?: string }).gradename ||
          grade_id ||
          "",
        grade_id,
        isactive: typeof g.isactive === "boolean" ? g.isactive : !!g.isactive,
        created_by: (g.created_by as string) || "admin",
        created_at,
        updated_at,
        updated_by: (g.updated_by as string) || "",
      };
    });

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h1>Class</h1>
        <Flex gap="8px">
          <Button type="primary" onClick={handleCreate}>
            Create Class
          </Button>
          <Button
            icon={<UploadOutlined />}
            onClick={() => setUploadModalVisible(true)}
          >
            Import Class
          </Button>
        </Flex>
      </Flex>
      <ClassModalForm
        visible={modalVisible}
        mode={mode}
        onClose={() => {
          setModalVisible(false);
          setEditingClass(null);
        }}
        onFinish={handleSubmit}
        loading={loading}
        initialValues={{
          classname: editingClass ? editingClass.name : "",
          grade: editingClass ? editingClass.grade_id ?? "" : "",
          isactive: editingClass ? editingClass.isactive : false,
        }}
      />
      <Modal
        title="Import Class Data"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={800}
      >
        <ClassUpload
          classes={classes.map((c) => ({
            classname: c.name,
            grade: c.grade ? { gradename: c.grade } : undefined,
            isactive: c.isactive,
          }))}
          onUploadSuccess={() => {
            fetchClasses();
            setUploadModalVisible(false);
          }}
        />
      </Modal>
      <Divider />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={classes}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ClassTable;
