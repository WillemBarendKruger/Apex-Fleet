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
            colorPrimary: "#84CC16",       // Lime green
            colorInfo: "#F59E0B",          // Amber
            colorTextBase: "#E5E7EB",      // Light gray
            colorBgBase: "#1E1E1E",        // Charcoal
            fontSize: 15,
            fontWeightStrong: 600,
          },
          components: {
            Card: {
              colorBgContainer: "#2C2C2C",
              colorBorderSecondary: "#84CC16",
            },
            Table: {
              headerBg: "#3F3F3F",
              colorBgContainer: "#2C2C2C",
              colorText: "#E5E7EB",
            },
            Modal: {
              contentBg: "#2C2C2C",
              headerBg: "#2C2C2C",
              colorText: "#E5E7EB",
            },
            Button: {
              colorPrimary: "#84CC16",
              colorText: "#E5E7EB",
              colorBgTextHover: "#F59E0B",
            },
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
