export interface IRequest {
    id?: string,
    status: string,
    equipmentId?: string,
    equipmentName: string,
    requestingEmployeeEmail: string,
    requestingEmployeeId?: number
}