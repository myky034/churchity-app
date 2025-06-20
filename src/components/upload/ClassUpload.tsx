import React, { useState, useEffect } from "react";
import { Upload, Button, message, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

const REQUIRED_HEADERS = ["class_name", "grade_name", "isactive"];

export interface ClassUploadProps {
  classes: {
    classname: string;
    grade?: { gradename: string };
    isactive: boolean;
  }[];
  onUploadSuccess: () => void;
}

interface Grade {
  grade_id: string;
  gradename: string;
  isactive: boolean;
}

interface PreviewRow {
  class_name: string;
  grade_name: string;
  isactive: boolean;
  _error: boolean;
  _errorMsg: string;
  _isUpdate: boolean;
}

const ClassUpload: React.FC<ClassUploadProps> = ({
  classes,
  onUploadSuccess,
}) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
  const [headerError, setHeaderError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/grade");
        const data = await res.json();
        setGrades(data);
      } catch {
        message.error("Failed to load grades");
      }
    };
    fetchGrades();
  }, []);

  const validateHeaders = (headers: string[]) => {
    if (headers.length !== REQUIRED_HEADERS.length) {
      return { valid: false, message: "Header count does not match." };
    }
    for (let i = 0; i < REQUIRED_HEADERS.length; i++) {
      if (headers[i] !== REQUIRED_HEADERS[i]) {
        return {
          valid: false,
          message: `Expected header "${REQUIRED_HEADERS[i]}" at position ${
            i + 1
          }.`,
        };
      }
    }
    return { valid: true };
  };

  const handleUpload = (json: Record<string, unknown>[]) => {
    if (!json.length) {
      setHeaderError("File is empty.");
      setPreviewData([]);
      return;
    }
    const headers = Object.keys(json[0]);
    const headerValidation = validateHeaders(headers);
    if (!headerValidation.valid) {
      setHeaderError(headerValidation.message || null);
      setPreviewData([]);
      return;
    }
    setHeaderError(null);

    const validated = json.map((row) => {
      const className = row.class_name as string;
      const gradeName = row.grade_name as string;
      const isactive =
        row.isactive === true ||
        row.isactive === "true" ||
        row.isactive === 1 ||
        row.isactive === "1";

      const gradeValid = grades.some((g) => g.gradename === gradeName);
      const classExists = classes.some(
        (c) => c.classname === className && c.grade?.gradename === gradeName
      );

      return {
        class_name: className,
        grade_name: gradeName,
        isactive,
        _error: !gradeValid || !className,
        _errorMsg: !gradeValid
          ? "Grade not found"
          : !className
          ? "Class name missing"
          : "",
        _isUpdate: classExists,
      };
    });

    setPreviewData(validated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      for (const row of previewData) {
        if (row._error) continue;

        const gradeObj = grades.find((g) => g.gradename === row.grade_name);
        if (!gradeObj) continue;

        if (row._isUpdate) {
          // Update
          await fetch("http://localhost:3000/api/classs", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              classname: row.class_name,
              grade_id: gradeObj.grade_id,
              isactive: row.isactive,
            }),
          });
          console.log("Saving row:", {
            classname: row.class_name,
            grade_id: gradeObj.grade_id,
            isactive: row.isactive,
          });
        } else {
          // Create
          await fetch("http://localhost:3000/api/classs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              classname: row.class_name,
              grade_id: gradeObj.grade_id,
              isactive: row.isactive,
            }),
          });
        }
      }
      message.success("Upload complete!");
      setPreviewData([]);
      onUploadSuccess();
    } catch {
      message.error("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isExcel =
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".csv");
    if (!isExcel) {
      message.error("You can only upload Excel or CSV files!");
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      }) as Record<string, unknown>[];
      handleUpload(json);
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  const allValid =
    previewData.length > 0 && previewData.every((row) => !row._error);

  return (
    <div>
      <Upload
        beforeUpload={beforeUpload}
        showUploadList={false}
        accept=".xlsx,.xls,.csv"
      >
        <Button icon={<UploadOutlined />}>Import file</Button>
      </Upload>
      {headerError && (
        <div style={{ color: "red", marginTop: 8 }}>{headerError}</div>
      )}
      {previewData.length > 0 && (
        <Table
          dataSource={previewData}
          rowKey={(row) => row.class_name + row.grade_name}
          columns={[
            { title: "Class Name", dataIndex: "class_name" },
            { title: "Grade Name", dataIndex: "grade_name" },
            {
              title: "Active",
              dataIndex: "isactive",
              render: (val) => (val ? "1" : "0"),
            },
          ]}
          pagination={false}
          style={{ marginTop: 16 }}
        />
      )}
      {allValid && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <Button onClick={() => setPreviewData([])} disabled={loading}>
            Clear Data
          </Button>
          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
            disabled={!allValid}
          >
            Save to Database
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClassUpload;
