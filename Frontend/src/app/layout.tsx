import { AuthProvider } from "@/providers/auth-provider";
import { ConfigProvider, theme } from "antd";
import "./globals.css";
import { EmployeeProvider } from "@/providers/employee-provider";
import { EquipmentsProvider } from "@/providers/equipment-provider";
import { CategoriesProvider } from "@/providers/category-provider";

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
            colorPrimary: "#13c2c2",
            colorInfo: "#E55C00",
            colorTextBase: "#ffffff",
            colorBgBase: "#374151",
            fontSize: 15,
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
            <EmployeeProvider>
              <CategoriesProvider>
                <EquipmentsProvider>
                  {children}
                </EquipmentsProvider>
              </CategoriesProvider>
            </EmployeeProvider>
          </AuthProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}
