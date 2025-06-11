import React, { useState, useEffect } from "react";
import { Space, Table, Badge, Flex, Button, Divider } from "antd";
import type { TableProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import InteractiveGradeForm from "@/components/form/InteractiveGradeForm";

interface DataType {
  key: string;
  name: string;
  description: string;
  isActive: number;
  createdBy: string;
  created: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Grade name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
    render: (isActive) => (
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
    render: () => (
      <Space
        size="middle"
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <a>
          <EditOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </Space>
    ),
  },
];

export default function InteractiveGradeTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/grade");
      const grades = await response.json();
      // Map API data to DataType
      interface GradeApiType {
        id?: string;
        grade_id?: string;
        gradename: string;
        gradedescription: string;
        isactive: boolean | number;
        createdBy?: string;
        created?: string;
      }
      const mapped = grades.map((g: GradeApiType) => ({
        key: g.id || g.grade_id || g.gradename, // adjust according to your API
        name: g.gradename,
        description: g.gradedescription,
        isActive: g.isactive ? 1 : 0,
        createdBy: g.createdBy || "admin", // adjust if you have this field
        created: g.created || new Date().toLocaleDateString(), // adjust if you have this field
      }));
      setData(mapped);
    } catch {
      // Optionally handle error
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          <Button type="default" href="/grades/import">
            Import Grades
          </Button>
        </Flex>
      </Flex>
      {isModalOpen && (
        <InteractiveGradeForm handleOk={handleOk} handleCancel={handleCancel} />
      )}
      <Divider />
      <Table<DataType>
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
