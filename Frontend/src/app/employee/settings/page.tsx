"use client";

import { useEffect, useState } from "react";
import { Form } from "antd";
import { useStyles } from "./style/styles";
import { useRouter } from "next/navigation";

import { useEmployeeActions } from "@/providers/employee-provider";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

import "@ant-design/v5-patch-for-react-19";
import Loader from "@/components/loader/loader";
import ProfileForm from "@/components/ProfileForm/ProfileForm";

const SettingsPage = () => {
  const { styles } = useStyles();
  const router = useRouter();

  const { getCurrentUser } = useAuthActions();
  const { updateEmployee, deleteEmployee } = useEmployeeActions();
  const { user } = useAuthState();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    await getCurrentUser();

    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        emailAddress: user.emailAddress,
        roleNames: "Employee",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {loading && !user ? (
        <Loader />
      ) : (
        <div className={styles.updateContainer}>
          <ProfileForm
            userInfo={user}
            updateUser={updateEmployee}
            deleteUser={deleteEmployee}
            roleName={"Employee"}
            redirectAfterDelete={() => router.push("/login")} getCurrentUser={function (): Promise<void> {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      )}</>
  );
};

export default SettingsPage;