import { AuthProvider } from "@/providers/auth-provider";
import { ConfigProvider, theme } from "antd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { darkAlgorithm } = theme;

  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff6500",
            colorInfo: "#ff6500",
            colorTextBase: "#ffffff",
            colorBgBase: "#1e3e62",
            fontSize: 14,
          },
          components: {
            Input: {
              colorText: "rgb(255,255,255)",
            },
          },
          algorithm: darkAlgorithm,
        }}
      >
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}
