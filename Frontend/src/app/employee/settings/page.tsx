"use client";

import { useEffect } from "react";
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

  const refresh = async () => {
    await getCurrentUser();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <div className={styles.updateContainer}>
          <ProfileForm
            userInfo={user}
            updateUser={updateEmployee}
            deleteUser={deleteEmployee}
            roleName={"Employee"}
            redirectAfterDelete={() => router.push("/login")}
            getCurrentUser={getCurrentUser}
          />
        </div>
      )}</>
  );
};

export default SettingsPage;