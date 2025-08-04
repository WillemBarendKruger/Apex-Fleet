import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
    aiContainer: {
        padding: "24px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },

    imagePreview: {
        width: "100%",
        maxHeight: "300px",
        objectFit: "contain",
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
    },

    promptInput: {
        padding: "8px 12px",
        fontSize: "16px",
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorder}`,
        outline: "none",
        width: "100%",
    },

    analyzeButton: {
        padding: "10px 16px",
        fontSize: "16px",
        backgroundColor: token.colorPrimary,
        color: token.colorWhite,
        border: "none",
        borderRadius: token.borderRadius,
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: token.colorPrimaryHover,
        },
        "&:disabled": {
            backgroundColor: token.colorBgContainerDisabled,
            cursor: "not-allowed",
        },
    },

    responseBox: {
        backgroundColor: token.colorFillSecondary,
        padding: "16px",
        borderRadius: token.borderRadius,
        border: `1px solid ${token.colorBorderSecondary}`,
        fontSize: "14px",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
    },
}));