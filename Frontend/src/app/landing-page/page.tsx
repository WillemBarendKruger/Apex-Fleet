'use client';

import "@ant-design/v5-patch-for-react-19";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";

const LandingPage: React.FC = () => {
    const router = useRouter();
    const { styles } = useStyles();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Left Section - Content */}
                <div className={styles.leftSection}>
                    <div className={styles.brandSection}>
                        <h1 className={styles.heading}>Welcome to Apex IT</h1>
                        <p className={styles.subHeading}>
                            Manage your office equipment with ease
                        </p>
                        <p className={styles.tagline}>
                            Track. Maintain. Simplify.
                        </p>
                    </div>

                    <div className={styles.buttonSection}>
                        <Button
                            type="primary"
                            className={styles.orangeButton}
                            size="large"
                            onClick={() => router.push("/register")}
                        >
                            Get Started →
                        </Button>

                        <div className={styles.loginSection}>
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
                    </div>
                </div>

                {/* Right Section - Logo */}
                <div className={styles.rightSection}>
                    <div className={styles.logo}>
                        <Image
                            src="/ApexIT-Green-Name.png"
                            alt="Apex IT Logo"
                            width={250}
                            height={250}
                        />
                        <div className={styles.sinceText}>Since 2025</div>
                    </div>
                    <div className={styles.decorativeElements}></div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;