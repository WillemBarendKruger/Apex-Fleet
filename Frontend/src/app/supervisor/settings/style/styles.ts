import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
    profileCard: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    `,
    updateContainer: css`
        max-width: 600px;
        margin: 40px auto;
        padding: 24px;
        background: #616F39;
        border-radius: ${token.borderRadiusLG};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,

}));
