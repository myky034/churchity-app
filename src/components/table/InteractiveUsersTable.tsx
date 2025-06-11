"use client";

import React, { useRef, useState, useMemo } from "react";
import {
  Table,
  TableColumnsType,
  TableColumnType,
  TableProps,
  InputRef,
  Avatar,
  Dropdown,
} from "antd";
import { Button, Input, Space, Flex } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  phone: number;
  class: string;
  holyname: string;
  avatar: string;
}

interface Props {
  data: DataType[];
}

type DataIndex = keyof DataType;

const InteractiveTable: React.FC<Props> = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const nameFilters = Array.from(new Set(data.map((item) => item.class))).map(
    (classes) => ({
      text: classes,
      value: classes,
    })
  );

  const generateColorFromName = (name: string): string => {
    const colors = [
      "#f56a00",
      "#7265e6",
      "#ffbf00",
      "#00a2ae",
      "#52c41a",
      "#eb2f96",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const generateGapFromName = (name: string): number => {
    const gaps = [1, 2, 3, 4];
    const charCodeSum = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gaps[charCodeSum % gaps.length];
  };

  const { colorMap, gapMap } = useMemo(() => {
    const colorMap: Record<string, string> = {};
    const gapMap: Record<string, number> = {};

    data.forEach((user) => {
      colorMap[user.name] = generateColorFromName(user.name);
      gapMap[user.name] = generateGapFromName(user.name);
    });

    return { colorMap, gapMap };
  }, [data]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Avatar",
      dataIndex: "name",
      render: (name: string) => (
        <Avatar
          key={name}
          style={{
            backgroundColor: colorMap[name] || "#ccc",
            verticalAlign: "middle",
          }}
          size="large"
          gap={gapMap[name] || 3}
        >
          {name[0]}
        </Avatar>
      ),
      width: 70,
    },
    {
      title: "Holy Name",
      dataIndex: "holyname",
      ...getColumnSearchProps("holyname"),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Class",
      dataIndex: "class",
      filters: nameFilters,
      onFilter: (value, record) => record.class.includes(value as string),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 60,
      render: () => (
        <Flex align="flex-start" gap="small" vertical>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
          >
            <Button type="text" icon={<MoreOutlined />}></Button>
          </Dropdown>
        </Flex>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const items = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
    {
      key: "3",
      label: "Send email",
    },
  ];

  return (
    <Table<DataType> columns={columns} dataSource={data} onChange={onChange} rowKey="id"/>
  );
};

export default InteractiveTable;
