import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    EmployeesContainer: css`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    EmployeesTable: css`
        width: 100%;
    `,
    CloseBtn: css`
        background-color: #84CC16;
        border-color: #84CC16;
        color: #1E1E1E;
        font-weight: bold;
        &:hover {
            background-color: #1E1E1E !important;
            border-color: #84CC16;
            box-shadow: 0 4px 10px #84CC16;
        }
    `,
    cellStyle: css`
        padding: 12px 16px;
        border-bottom: 1px solid #3F3F3F;
        vertical-align: top;
`,
});
