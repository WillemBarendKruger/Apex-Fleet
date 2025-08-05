export interface IRequest {
    id?: string,
    status: string,
    description?: string,
    equipmentId?: string,
    equipmentName: string,
    requestingEmployeeEmail: string,
    requestingEmployeeId?: number
}