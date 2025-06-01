// app/LayoutWrapper.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Layout, Menu, Breadcrumb, theme } from "antd";

const { Header, Content, Footer } = Layout;

const navItems = [
  { label: "Home", url: "/", key: "home" },
  { label: "Students", url: "/users", key: "users" },
  { label: "Events", url: "/events", key: "events" },
  { label: "About", url: "/about", key: "about" },
  { label: "Setting", url: "/setting", key: "setting" },
];

const items = navItems.map((item) => ({
  key: item.key,
  label: <Link href={item.url}>{item.label}</Link>,
}));

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", overflowY: "auto" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "auto",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}