import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    dashboardContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 24px;
  `,
    summaryRow: css`
    width: 100%;
    margin-bottom: 24px;
  `,
    summaryCard: css`
    h3 {
      margin-bottom: 8px;
    }
    p {
      margin: 0;
    }
    .count {
      font-size: 24px;
      font-weight: bold;
    }
  `,
    quickActionsRow: css`
    width: 100%;
    margin-bottom: 24px;
  `,
    quickActionButton: css`
    width: 100%;
  `,
    incidentCard: css`
    width: 100%;
  `,

});
