export interface IRequest {
    id?: string,
    status: string,
    description?: string,
    getDate?: string,
    returnDate?: string,
    equipmentId?: string,
    equipmentName: string,
    requestingEmployeeEmail: string,
    requestingEmployeeId?: number
}