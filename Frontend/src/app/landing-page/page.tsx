'use client';

import "@ant-design/v5-patch-for-react-19";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";

const Home: React.FC = () => {
    const router = useRouter();
    const { styles } = useStyles();

    return (
        <>
            <div className={styles.page}>
                <div className={styles.logo}>
                    <Image src="/Apex-IT-Logo.png" alt="Apex IT Logo" width={150} height={150} />
                    <div className={styles.sinceText}>Since 2025</div>
                </div>
                <h1 className={styles.heading}>Welcome to Apex IT</h1>
                <p className={styles.subHeading}>
                    Manage your office equipment with ease
                </p>
                <p className={styles.subHeading}>
                    “Track. Maintain. Simplify.”
                </p>
                <Button
                    type="primary"
                    className={styles.orangeButton}
                    size="large"
                    onClick={() => router.push("/register")}
                >
                    Get Started →
                </Button>
                <div className={styles.smallText}>Already a Member?</div>
                <Button
                    type="primary"
                    className={styles.button}
                    size="large"
                    onClick={() => router.push("/login")}
                >
                    Login →
                </Button>
            </div>
        </>
    )
}

export default Home;