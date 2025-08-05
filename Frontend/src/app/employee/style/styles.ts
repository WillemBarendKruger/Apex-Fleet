import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  imageContainer: css`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-bottom: 1px solid #303030;
    margin-bottom: 8px;
  `,

  image: css`
    transition: all 0.3s ease;
    object-fit: contain;
  `,

  headerTitle: css`
    height: 64px;
    padding: 0 24px;
    background: ${token.colorBgContainer};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  `,

  toggleButton: css`
    position: absolute;
    top: 10px;
    z-index: 1000;
    font-size: 16px;
    width: 40px;
    height: 40px;
    background: ${token.colorBgContainer};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.2s ease;
  `,

  contentContainer: css`
    height: calc(100vh - 64px);
    overflow: hidden;
    padding: 16px;
    background: #374151;
  `,

  scrollableContent: css`
    height: 100%;
    overflow-y: auto;
    padding-right: 8px;
  `,

  title: css`
    margin: 0;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
  `,

  logoutBtn: css`
    color: ${token.colorText};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;

    &:hover {
      color: ${token.colorError};
    }
  `,

  logout: css`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 8px;
  `,
}));