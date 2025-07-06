import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { message } from "antd";
import type { UploadFile } from "antd";

interface Grade {
  grade_id: string;
  gradename: string;
}

interface Class {
  class_id: string;
  classname: string;
  grade_id: string;
}

interface Role {
  roleid: string;
  rolename: string;
}

interface UserFormValues {
  name: string;
  email?: string;
  phone?: string | number;
  birthday?: dayjs.Dayjs;
  address?: string;
  class: string;
  grade: string;
  holyname: string;
  fathername: string;
  fatherphone?: string | number;
  mothername: string;
  motherphone?: string | number;
  baptismplace?: string;
  baptismdate?: dayjs.Dayjs;
  role?: string;
  role_id?: string;
  title?: string;
  isActive?: boolean;
  lastlogin?: dayjs.Dayjs;
  created_by?: string;
  updated_by?: string;
  firstCommunionDate?: dayjs.Dayjs;
  firstCommunionPlace?: string;
  confirmationDate?: dayjs.Dayjs;
  confirmationPlace?: string;
  professionOfFaithDate?: dayjs.Dayjs;
  professionOfFaithPlace?: string;
  catechistLevel?: string;
}

export const useUserForm = (isTeacher?: boolean, onClose?: () => void) => {
  const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradesRes, classesRes, rolesRes] = await Promise.all([
          fetch("http://localhost:3000/api/grade"),
          fetch("http://localhost:3000/api/classs"),
          fetch("http://localhost:3000/api/role"),
        ]);

        const [gradesData, classesData, rolesData] = await Promise.all([
          gradesRes.json(),
          classesRes.json(),
          rolesRes.json(),
        ]);

        setGrades(gradesData);
        setClasses(classesData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGrades([]);
        setClasses([]);
        setRoles([]);
      }
    };

    fetchData();
  }, []);

  const handleAvatarChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
    const latestFileList = fileList.slice(-1);

    if (latestFileList.length > 0 && !latestFileList[0].thumbUrl) {
      const file = latestFileList[0].originFileObj as File;
      latestFileList[0].thumbUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    setAvatarFileList(latestFileList);
  };

  const handleRemoveAvatar = () => {
    setAvatarFileList([]);
  };

  const handleFinishForm = async (values: UserFormValues) => {
    setSubmitting(true);
    try {
      const formatDate = (date: dayjs.Dayjs | undefined) =>
        date ? date.format("YYYY-MM-DD") : undefined;

      let role = values.role;
      let role_id = values.role_id;

      if (!isTeacher) {
        role = "Student";
        const studentRole = roles.find((r) => r.rolename === "Student");
        role_id = studentRole ? studentRole.roleid : "";
      }

      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone ? Number(values.phone) : undefined,
        birthday: formatDate(values.birthday),
        address: values.address,
        class: values.class,
        grade: values.grade,
        holyname: values.holyname,
        fathername: values.fathername,
        fatherphone: values.fatherphone,
        mothername: values.mothername,
        motherphone: values.motherphone,
        baptismplace: values.baptismplace,
        baptismdate: formatDate(values.baptismdate),
        role,
        role_id,
        title: values.title,
        isActive: true,
        lastlogin: null,
        created_by: values.created_by || "",
        updated_by: values.updated_by || "",
        firstCommunionDate: formatDate(values.firstCommunionDate),
        firstCommunionPlace: values.firstCommunionPlace,
        confirmationDate: formatDate(values.confirmationDate),
        confirmationPlace: values.confirmationPlace,
        professionOfFaithDate: formatDate(values.professionOfFaithDate),
        professionOfFaithPlace: values.professionOfFaithPlace,
        catechistLevel: values.catechistLevel,
      };

      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success("Tạo người dùng thành công!");
        onClose?.();
        return true;
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Có lỗi xảy ra khi tạo người dùng.");
        return false;
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo người dùng.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
  };

  const resetForm = () => {
    setAvatarFileList([]);
    setSelectedGrade(undefined);
  };

  return {
    // State
    avatarFileList,
    selectedGrade,
    submitting,
    grades,
    classes,
    roles,

    // Handlers
    handleAvatarChange,
    handleRemoveAvatar,
    handleFinishForm,
    handleGradeChange,
    resetForm,
  };
};
