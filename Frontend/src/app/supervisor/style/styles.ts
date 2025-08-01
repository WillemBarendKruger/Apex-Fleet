import { createStyles, css } from "antd-style";

export const useStyles = createStyles({
    imageContainer: css`
     height: 64px;
     display: flex;
     align-items: center;
     justify-content: center;
     padding: collapsed ? 8px : 16px;
     border-bottom: 1px solid #303030;
     margin-bottom: 8px;
  `,
    image: css`
     transition: all 0.3s ease;
     objectfit: contain;
 `,
    headerTitle: css`
     padding: 0;
     background: colorBgContainer;
     display: flex;
     align-items: center;
     justify-content: center;
     position: relative;
 `,
    toggleButton: css`
    position: absolute;
    top: 10px;
    z-index: 1000;
    font-size: 16px;
    width: 40px;
    height: 40px;
    background: colorBgContainer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.2s ease;
  `,
    contentContainer: css`
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
    background: colorBgContainer;
    border-radius: borderRadiusLG;
  `,
    title: css`
    margin: 0;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  logoutBtn: css`
  color: colorBgContainer
    display: flex;
    align-items: center;
    justify-content: collapsed ? center : flex-start;
    height: 50px;
    &:hover {
      color: danger;
    }
  `,
  logout: css`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 8px;
  `,
})