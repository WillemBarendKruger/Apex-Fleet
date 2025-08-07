import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    reportsContainer: css`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    reportsTable: css`
        width: 100%;
    `,
    descriptionCell: css` 
        white-space: normal;
        word-break: break-word;
        max-width: 300px;
        overflow-wrap: anywhere;
        line-height: 1.5;`
    ,

});
