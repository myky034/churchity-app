import React from "react";
import InteractiveForm from "@/components/form/InteractiveForm";
import { Divider } from "antd";

export default function CreateUserPage() {
  return (
    <div>
      <h1>Create User</h1>
      <Divider />
      <InteractiveForm />
    </div>
  );
}
