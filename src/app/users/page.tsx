import React from "react";
import InteractiveTable from "@/components/table/UsersTable";
import { getUser } from "@/lib/user";
import { Divider, Button, Flex } from "antd";

export default async function UsersPage() {
  const data = await getUser();

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "16px" }}
      >
        <h1>Users Page</h1>
        <Flex gap="8px">
          <Button type="primary" href="/users/create">
            Create User
          </Button>
          <Button type="default" href="/users/import">
            Import Users
          </Button>
        </Flex>
      </Flex>
      <Divider />
      <InteractiveTable data={data} />
    </div>
  );
}
