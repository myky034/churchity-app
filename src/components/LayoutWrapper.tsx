// app/LayoutWrapper.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import { usePathname } from "next/navigation";

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

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname();

  // Helper to build breadcrumb items from path
  const getBreadcrumbItems = () => {
    const pathSnippets = pathname.split("/").filter((i) => i);
    const breadcrumbItems = [
      {
        title: <Link href="/">Home</Link>,
        key: "home",
      },
    ];

    let url = "";
    pathSnippets.forEach((snippet) => {
      url += `/${snippet}`;
      const navItem = navItems.find((item) => item.url === url);
      breadcrumbItems.push({
        title: navItem ? (
          <Link href={navItem.url}>{navItem.label}</Link>
        ) : (
          <span>{snippet.charAt(0).toUpperCase() + snippet.slice(1)}</span>
        ),
        key: url,
      });
    });

    return breadcrumbItems;
  };

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
          selectedKeys={[
            navItems.find((item) => item.url === pathname)?.key || "home",
          ]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }} items={getBreadcrumbItems()} />
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
