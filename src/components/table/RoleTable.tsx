import React, { useState, useCallback, useEffect } from "react";
import {
  Flex,
  Button,
  Divider,
  Table,
  Badge,
  Space,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RoleModalForm from "../modal/RoleModalForm";

interface Role {
  roleid: string;
  rolename: string;
  roledescription: string;
  isactive: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

const RoleTable: React.FC = () => {
  const [role, setRole] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [modalVisible, setModalVisible] = useState(false);
  const [edittingRole, setEditingRole] = useState<Role | null>(null);

  const fetchRole = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/role");
      const data = await res.json();
      setRole(mappedRole(data));
    } catch {
      message.error("Failed to load role.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const handleCreateRole = () => {
    setMode("create");
    setModalVisible(true);
    setEditingRole(null);
  };

  const handleEditRole = (record: Role) => {
    setMode("edit");
    setEditingRole(record);
    setModalVisible(true);
  };

  const handleDeleteRole = async (role_id: string) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/api/role/${role_id}`, {
        method: "DELETE",
      });
      await fetchRole();
      message.success("Class deleted");
    } catch {
      message.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: {
    rolename: string;
    roledescription: string;
    isactive: boolean;
  }) => {
    setLoading(true);
    try {
      const url =
        mode === "create"
          ? "http://localhost:3000/api/role"
          : `http://localhost:3000/api/role/${edittingRole?.roleid}`;
      const method = mode === "create" ? "POST" : "PUT";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rolename: values.rolename,
          roledescription: values.roledescription,
          isactive: values.isactive,
        }),
      });
      await fetchRole();
      message.success(mode === "create" ? "Role created" : "Role updated");
      setModalVisible(false);
      setEditingRole(null);
    } catch {
      message.error("Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const mappedRole = (data: Record<string, unknown>[]): Role[] =>
    data.map((r) => {
      const createdRaw = r.created_at as string;
      const updatedRaw = r.updated_at as string;
      const created_at = createdRaw
        ? new Date(createdRaw).toLocaleDateString("en-GB")
        : new Date().toLocaleDateString("en-GB");
      const updated_at = updatedRaw
        ? new Date(updatedRaw).toLocaleDateString("en-GB")
        : "";

      return {
        roleid:
          (r.role_id as string) ||
          (r.roleid as string) ||
          (r.rolename as string),
        rolename: r.rolename as string,
        roledescription: (r.roledescription as string) || "",
        isactive: typeof r.isactive === "boolean" ? r.isactive : !!r.isactive,
        created_by: (r.created_by as string) || "admin",
        created_at,
        updated_at,
        updated_by: (r.updated_by as string) || "",
      };
    });

  const columns = [
    {
      title: "Role name",
      dataIndex: "rolename",
      key: "rolename",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "roledescription", // <-- correct spelling
      key: "roledescription",
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
      render: (_: unknown, record: Role) => (
        <Space
          size="middle"
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <a onClick={() => handleEditRole(record)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="Are you sure delete this role?"
            okText="Delete"
            okType="danger"
            cancelText="Cancel"
            onConfirm={() => handleDeleteRole(record.roleid)}
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h1>Role</h1>
        <Flex gap="8px">
          <Button type="primary" onClick={handleCreateRole}>
            Create Role
          </Button>
        </Flex>
      </Flex>
      <RoleModalForm
        visible={modalVisible}
        mode={mode}
        onClose={() => {
          setModalVisible(false);
          setEditingRole(null);
        }}
        onFinish={handleSubmit}
        loading={loading}
        initialValues={{
          rolename: edittingRole ? edittingRole.rolename : "",
          roledescription: edittingRole ? edittingRole.roledescription : "",
          isactive: edittingRole ? edittingRole.isactive : false,
        }}
      />
      <Divider />
      <Table
        rowKey="role_id"
        columns={columns}
        dataSource={role}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RoleTable;
