import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => ({
  page: css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    position: relative;
    overflow: hidden;
    padding: 2rem 1rem;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 50%, rgba(132, 204, 22, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(132, 204, 22, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(132, 204, 22, 0.08) 0%, transparent 50%);
      pointer-events: none;
    }
  `,

  container: css`
    max-width: 1200px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    
    @media (max-width: 968px) {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
  `,

  leftSection: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    @media (max-width: 968px) {
      order: 2;
    }
  `,

  rightSection: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    
    @media (max-width: 968px) {
      order: 1;
    }
  `,

  logo: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
    
    img {
      filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.05) rotate(2deg);
      }
    }
  `,

  sinceText: css`
    margin-top: 1rem;
    color: rgba(132, 204, 22, 0.8);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    position: relative;
    background: rgba(132, 204, 22, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 1px solid rgba(132, 204, 22, 0.2);
  `,

  brandSection: css`
    margin-bottom: 3rem;
  `,

  heading: css`
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 800;
    color: white;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #ffffff, #e2e8f0);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.1;
    
    @media (max-width: 968px) {
      text-align: center;
    }
  `,

  subHeading: css`
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 1rem;
    font-weight: 400;
    line-height: 1.6;
    
    &:nth-of-type(2) {
      margin-bottom: 0.5rem;
    }
    
    @media (max-width: 968px) {
      text-align: center;
    }
  `,

  tagline: css`
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
    color: #84cc16;
    font-weight: 600;
    font-style: italic;
    margin-bottom: 3rem;
    position: relative;
    text-shadow: 0 0 20px rgba(132, 204, 22, 0.3);
    
    &::before, &::after {
      content: '"';
      font-size: 1.2em;
      opacity: 0.7;
      color: rgba(132, 204, 22, 0.6);
    }
    
    @media (max-width: 968px) {
      text-align: center;
    }
  `,

  buttonSection: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    @media (max-width: 968px) {
      align-items: center;
    }
  `,

  orangeButton: css`
    background: linear-gradient(135deg, #65a30d, #84cc16);
    border: none;
    height: 58px;
    padding: 0 3rem;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 12px;
    box-shadow: 
      0 8px 25px rgba(132, 204, 22, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    min-width: 200px;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      background: linear-gradient(135deg, #4d7c0f, #65a30d);
      transform: translateY(-3px);
      box-shadow: 
        0 15px 35px rgba(132, 204, 22, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      
      &::before {
        left: 100%;
      }
    }
    
    &:focus {
      background: linear-gradient(135deg, #4d7c0f, #65a30d);
      box-shadow: 
        0 15px 35px rgba(132, 204, 22, 0.6),
        0 0 0 3px rgba(132, 204, 22, 0.3);
    }
  `,

  loginSection: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    
    @media (max-width: 968px) {
      align-items: center;
    }
  `,

  smallText: css`
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-weight: 500;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, rgba(132, 204, 22, 0.3), transparent);
    }
  `,

  button: css`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(132, 204, 22, 0.3);
    color: white;
    height: 48px;
    padding: 0 2.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    min-width: 200px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(132, 204, 22, 0.1), rgba(132, 204, 22, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      background: rgba(132, 204, 22, 0.1);
      border-color: rgba(132, 204, 22, 0.5);
      color: #84cc16;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(132, 204, 22, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:focus {
      background: rgba(132, 204, 22, 0.1);
      border-color: rgba(132, 204, 22, 0.5);
      color: #84cc16;
      box-shadow: 
        0 10px 25px rgba(132, 204, 22, 0.2),
        0 0 0 3px rgba(132, 204, 22, 0.2);
    }
  `,

  decorativeElements: css`
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    
    &::before {
      content: '';
      position: absolute;
      top: 20%;
      right: -50px;
      width: 200px;
      height: 200px;
      border: 2px solid rgba(132, 204, 22, 0.1);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 20%;
      left: -30px;
      width: 150px;
      height: 150px;
      border: 1px solid rgba(132, 204, 22, 0.05);
      border-radius: 50%;
      animation: float 8s ease-in-out infinite reverse;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
  `
}));