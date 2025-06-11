import React, { useState } from "react";
import { Space, Table, Badge, Flex, Button, Divider } from "antd";
import type { TableProps } from "antd";
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
    title: "isActive",
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
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    description: "New York No. 1 Lake Park",
    isActive: 1,
    createdBy: "admin",
    created: "6/10/2025",
  },
  {
    key: "2",
    name: "Jim Green",
    description: "London No. 1 Lake Park",
    isActive: 1,
    createdBy: "admin",
    created: "6/10/2025",
  },
  {
    key: "3",
    name: "Joe Black",
    description: "Sydney No. 1 Lake Park",
    isActive: 1,
    createdBy: "admin",
    created: "6/10/2025",
  },
];

export default function InteractiveGradeTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Flex justify="space-between" align="center" style={{ marginBottom: "16px" }}>
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
        <InteractiveGradeForm
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
      <Divider />
      <Table<DataType> columns={columns} dataSource={data} pagination={{pageSize: 10}} />
    </div>
  );
}
