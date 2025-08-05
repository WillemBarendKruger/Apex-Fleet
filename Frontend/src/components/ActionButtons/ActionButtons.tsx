import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
    label: string;
    route: string;
    type?: "primary" | "dashed" | "default" | "link" | "text";
    className?: string;
}

const QuickActionButton: React.FC<Props> = ({ label, route, type = "default", className }) => {
    const router = useRouter();

    return (
        <Button
            type={type}
            size="large"
            block
            className={className}
            onClick={() => router.push(route)}
        >
            {label}
        </Button>
    );
};

export default QuickActionButton;