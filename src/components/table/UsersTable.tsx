import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  Table,
  TableColumnsType,
  TableColumnType,
  TableProps,
  InputRef,
  Avatar,
  Dropdown,
  message,
} from "antd";
import { Button, Input, Space, Flex } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

interface Users {
  id: string;
  key: React.Key;
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

interface Props {
  data?: Users[];
  onEdit?: (user: Users) => void;
}

type DataIndex = keyof Users;

const UserTable: React.FC<Props> = ({ data, onEdit }) => {
  const [classes, setClasses] = useState<
    { class_id: string; classname: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  // Color generation utilities
  const generateColorFromName = (name: string | null | undefined): string => {
    if (name === null || name === undefined || name.trim() === "") {
      return "#ccc";
    }
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

  // API functions
  const fetchClasses = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/classs");
      const data = await res.json();
      setClasses(data);
    } catch {
      message.error("Failed to load classes.");
    }
  }, []);

  // Data mapping
  const mappedUsers = useCallback(
    (users: Users[]) => {
      return users.map((user) => {
        const classObj = classes.find((c) => c.class_id === user.class);
        return {
          ...user,
          key: user.id,
          class: classObj ? classObj.classname : user.class,
        };
      });
    },
    [classes]
  );

  // Effects
  useEffect(() => {
    const initializeData = async () => {
      await fetchClasses();
      setIsLoading(false);
    };
    initializeData();
  }, [fetchClasses]);

  // Search functionality
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
  ): TableColumnType<Users> => ({
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
      (record[dataIndex]?.toString() || "")
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

  // Use mappedUsers for table data
  const tableData = useMemo(() => {
    if (!data) return [];
    return mappedUsers(data);
  }, [data, mappedUsers]);

  // Memoized data
  const nameFilters = Array.from(
    new Set((data || []).map((item) => item.class))
  ).map((className) => ({
    text: className,
    value: className,
  }));

  const { colorMap, gapMap } = useMemo(() => {
    const colorMap: Record<string, string> = {};
    const gapMap: Record<string, number> = {};

    (tableData || []).forEach((user) => {
      colorMap[user.name] = generateColorFromName(user.name);
      gapMap[user.name] = generateGapFromName(user.name);
    });

    return { colorMap, gapMap };
  }, [tableData]);

  // Table columns
  const columns: TableColumnsType<Users> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string, record: Users) =>
        avatar ? (
          <Avatar
            src={avatar}
            alt={record.name}
            size="large"
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: colorMap[record.name] || "#ccc",
              verticalAlign: "middle",
            }}
            size="large"
            gap={gapMap[record.name] || 3}
          >
            {record.name
              ? record.name.split(" ").pop()?.[0] || record.name[0]
              : "?"}
          </Avatar>
        ),
      width: 70,
    },
    {
      title: "Holy Name",
      dataIndex: "holyname",
      key: "holyname",
      ...getColumnSearchProps("holyname"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      filters: nameFilters,
      onFilter: (value, record) => record.class.includes(value as string),
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 60,
      render: (_, record: Users) => {
        const items = [
          {
            key: "1",
            label: "Edit",
            onClick: () => onEdit?.(record),
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
          <Flex align="flex-start" gap="small" vertical>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button type="text" icon={<MoreOutlined />}></Button>
            </Dropdown>
          </Flex>
        );
      },
    },
  ];

  const onChange: TableProps<Users>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table<Users>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      rowKey="key"
      loading={isLoading}
    />
  );
};

export default UserTable;
