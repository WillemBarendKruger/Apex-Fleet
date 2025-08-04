export interface IConditionReport {
    id?: string,
    description: string,
    status: string,
    equipmentName: string,
    equipmentId?: string,
    reportingEmployeeName?: string,
    reportingEmployeeEmail: string,
    reportingEmployeeId?: number
}