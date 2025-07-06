"use client";

import React, { useState } from "react";
import UserTable from "@/components/table/UsersTable";
import { getUser } from "@/lib/user";
import { Button, Flex, Divider } from "antd";
import UserForm from "@/components/form/UsersForm";
import type { Users } from "@/components/form/UsersForm";

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string | number;
  birthday?: string;
  address?: string;
  class: string;
  grade: string;
  holyname: string;
  fathername: string;
  fatherphone?: string | number;
  mothername: string;
  motherphone?: string | number;
  baptismplace?: string;
  baptismdate?: string;
  role?: string;
  role_id?: string;
  title?: string;
  isActive?: boolean;
  lastlogin?: string;
  created_by?: string;
  updated_by?: string;
  firstCommunionDate?: string;
  firstCommunionPlace?: string;
  confirmationDate?: string;
  confirmationPlace?: string;
  professionOfFaithDate?: string;
  professionOfFaithPlace?: string;
  catechistLevel?: string;
  avatar?: string;
}

const UsersPage: React.FC = ({}) => {
  const [data, setData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchData = async () => {
    const users = await getUser();
    setData(users);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const showDrawer = () => {
    setEditUser(undefined);
    setIsEditMode(false);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditUser(undefined);
    setIsEditMode(false);
  };

  // Handle edit user
  const handleEditUser = (user: Users) => {
    console.log("Editing user:", user);
    setEditUser(user);
    setIsEditMode(true);
    setOpen(true);
  };

  // Called after successful form submit
  const handleFormSuccess = () => {
    fetchData(); // Refresh users table
    setOpen(false); // Close the form
    setEditUser(undefined);
    setIsEditMode(false);
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
      <UserForm
        onClose={onClose}
        open={open}
        isTeacher={false}
        onSuccess={handleFormSuccess}
        editUser={editUser}
        isEditMode={isEditMode}
      />
      <Divider />
      <UserTable
        data={data.map((user) => ({
          ...user,
          key: user.id,
        }))}
        onEdit={handleEditUser}
      />
    </div>
  );
};

export default UsersPage;
