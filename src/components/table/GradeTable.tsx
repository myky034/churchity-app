import React, { useState, useEffect } from "react";
import {
  Badge,
  Space,
  Flex,
  Button,
  Divider,
  Table,
  message,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import GradeModalForm from "@/components/modal/GradeModalForm";

interface Grade {
  key: string;
  name: string;
  description: string;
  isActive: number;
  createdBy: string;
  created: string;
}

const GradeTable: React.FC = () => {
  //const { confirm } = Modal;

  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const columns = [
    {
      title: "Grade name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
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
      render: (_: unknown, record: Grade) => (
        <Space
          size="middle"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <a
            onClick={() => {
              setMode("edit");
              setEditingGrade(record);
              setModalVisible(true);
            }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="Are you sure delete this grade?"
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
            onConfirm={() => handleDeleteGrade(record.key)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const mapGrades = (data: Record<string, unknown>[]): Grade[] =>
    data.map((g) => ({
      key:
        (g.id as string) || (g.grade_id as string) || (g.gradename as string),
      name: g.gradename as string,
      description: g.gradedescription as string,
      isActive: g.isactive ? 1 : 0,
      createdBy: (g.createdBy as string) || "admin",
      created: (g.created as string) || new Date().toLocaleDateString(),
    }));

  // Handle create or Edit grade
  const handleSubmitGrade = async (values: {
    gradename: string;
    gradedescription: string;
    isactive: boolean;
  }) => {
    setLoading(true);
    try {
      const url =
        mode === "create"
          ? "http://localhost:3000/api/grade"
          : `http://localhost:3000/api/grade${
              editingGrade ? `/${editingGrade.key}` : ""
            }`;
      const method = mode === "create" ? "POST" : "PUT";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      await fetchGrades(); // Always refresh from GET after mutation
      setModalVisible(false);
      setEditingGrade(null);
      message.success(
        mode === "create"
          ? "Grade created successfully!"
          : "Grade updated successfully!"
      );
      //console.log(data);
    } catch (error) {
      console.error("Error creating grade:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishFailed = () => {
    console.error("Failed to create grade");
    message.error("Failed to create grade");
  };

  const handleDeleteGrade = async (key: string) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/api/grade/${key}`, {
        method: "DELETE",
      });
      await fetchGrades(); // Refresh the list after deletion
      message.success("Grade deleted successfully!");
    } catch (error) {
      console.error("Error deleting grade:", error);
      message.error("Failed to delete grade");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setMode("create");
    setEditingGrade(null);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  // Fetch grades from API
  const fetchGrades = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/grade", {
        method: "GET",
      });
      const data = await response.json();
      // Map API data to DataType
      const mapped = mapGrades(data);
      if (!Array.isArray(mapped)) {
        throw new Error("Mapped data is not an array");
      }
      setGrades(mapped);
      console.log(data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h1>Grades</h1>
        <Flex gap="8px">
          <Button type="primary" onClick={showModal}>
            Create Grade
          </Button>
          {/* <Button type="default" href="/grades/import">
            Import Grades
          </Button> */}
        </Flex>
      </Flex>
      <GradeModalForm
        visible={modalVisible}
        onClose={handleModalClose}
        loading={loading}
        onFinish={handleSubmitGrade}
        onFinishFailed={handleFinishFailed}
        initialValues={
          editingGrade
            ? {
                gradename: editingGrade.name,
                gradedescription: editingGrade.description,
                isactive: !!editingGrade.isActive,
              }
            : undefined
        }
        mode={mode}
      />
      <Divider />
      <Table
        rowKey="key"
        columns={columns}
        dataSource={grades}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default GradeTable;
