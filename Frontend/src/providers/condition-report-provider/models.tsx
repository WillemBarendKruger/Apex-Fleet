export interface IConditionReport {
    id?: string,
    description: string,
    priority: string,
    equipmentName: string,
    equipmentId?: string,
    reportingEmployeeName: string,
    reportingEmployeeEmail: string,
    reportingEmployeeId?: number
}