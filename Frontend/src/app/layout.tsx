import { AuthProvider } from "@/providers/auth-provider";
import { ConfigProvider, theme } from "antd";
import "./globals.css";
import { EmployeeProvider } from "@/providers/employee-provider";
import { EquipmentsProvider } from "@/providers/equipment-provider";
import { CategoriesProvider } from "@/providers/category-provider";
import { RequestsProvider } from "@/providers/request-provider";
import { ConditionReportsProvider } from "@/providers/condition-report-provider";
import { SupervisorProvider } from "@/providers/supervisor-provider";

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
            colorPrimary: "#A7D129",
            colorInfo: "#e55c00",
            colorTextBase: "#ffffff",
            colorBgBase: "#374151",
            fontSize: 15,
          },
          components: {
            Input: {
              colorText: "rgb(255,255,255)",
            },
            Card: {
              colorBorderSecondary: "#e55c00",
              colorBgContainer: "transparent",
            },
            Table: {
              colorBgContainer: "#374151",
              colorText: "#ffffff",
              colorBgTextHover: "#616F39",
              colorBgTextActive: "#616F39",
              headerBg: "#616F39",
            },
            Divider: {
              colorSplit: "#ffffff"
            },
            Modal: {
              contentBg: "#616F39",
              headerBg: "#616F39",
              colorText: "#ffffff",
            }
          },
          algorithm: darkAlgorithm,
        }}
      >
        <body>
          <AuthProvider>
            <SupervisorProvider>
              <EmployeeProvider>
                <CategoriesProvider>
                  <EquipmentsProvider>
                    <RequestsProvider>
                      <ConditionReportsProvider>
                        {children}
                      </ConditionReportsProvider>
                    </RequestsProvider>
                  </EquipmentsProvider>
                </CategoriesProvider>
              </EmployeeProvider>
            </SupervisorProvider>
          </AuthProvider>
        </body>
      </ConfigProvider>
    </html>
  );
}
