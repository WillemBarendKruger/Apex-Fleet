export interface IEquipment {
    id?: string,
    name: string,
    serialNumber: string,
    maintenancePeriod: number,
    getDate?: string,
    returnDate?: string,
    LastMaintenanceDate?: string,
    status: string,
    categoryId?: string,
    categoryName: string,
    handlerId?: number,
    handlerEmail: string
}