"use client";

import { useEffect, useState } from "react";
import { useStyles } from "./style/styles";
import { useRouter } from "next/navigation";

import { useSupervisorActions } from "@/providers/supervisor-provider";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

import "@ant-design/v5-patch-for-react-19";
import Loader from "@/components/loader/loader";
import ProfileForm from "@/components/ProfileForm/ProfileForm";

const SupervisorSettings = () => {
  const { styles } = useStyles();
  const { getCurrentUser } = useAuthActions();
  const { updateSupervisor, deleteSupervisor } = useSupervisorActions();
  const { user } = useAuthState();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading || !user) return <Loader />;

  return (
    <div className={styles.updateContainer}>
      <ProfileForm
        userInfo={user}
        updateUser={updateSupervisor}
        deleteUser={deleteSupervisor}
        roleName={"Supervisor"}
        redirectAfterDelete={() => router.push("/login")} getCurrentUser={function (): Promise<void> {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default SupervisorSettings;