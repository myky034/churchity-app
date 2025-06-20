"use client";

import React, { useState } from "react";
import { Card, Divider } from "antd";
import GradeTable from "@/components/table/GradeTable";
import ClassTable from "@/components/table/ClassTable";
import RoleTable from "@/components/table/RoleTable";

const tabListNoTitle = [
  {
    key: "grade",
    label: "Grade",
  },
  {
    key: "class",
    label: "Class",
  },
  {
    key: "role",
    label: "Role",
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  grade: <GradeTable />,
  class: <ClassTable />,
  role: <RoleTable />,
};

export default function SettingsPage() {
  const [activeTabKey, setActiveTabKey] = useState<string>("grade");

  const onTab2Change = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <div>
      <h1>Settings</h1>
      <Divider />
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        //tabBarExtraContent={<a href="#">More</a>}
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </div>
  );
}
