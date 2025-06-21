"use client";

import React, { useState } from "react";
import UserTable from "@/components/table/UsersTable";
import { getUser } from "@/lib/user";
import { Button, Flex, Divider } from "antd";
import UserForm from "@/components/form/UsersForm";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

const UsersPage: React.FC = ({}) => {
  const [data, setData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const users = await getUser();
      setData(users);
    };
    fetchData();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h1>Users</h1>
        <Flex gap="8px">
          <Button type="primary" onClick={showDrawer}>
            Create User
          </Button>
          <Button type="default" href="/users/import">
            Import Users
          </Button>
        </Flex>
      </Flex>
      <UserForm onClose={onClose} open={open} />
      <Divider />
      <UserTable
        data={data.map((user) => ({
          key: user.id,
          name: user.name,
          email: user.email,
          phone: 0, // or user.phone if available and is a number
          class: "", // or user.class if available
          holyname: "", // or user.holyname if available
          avatar: "", // or user.avatar if available
        }))}
      />
    </div>
  );
};

export default UsersPage;
