export interface IEquipment {
    id?: string,
    name: string,
    serialNumber: string,
    maintenancePeriod: number,
    status: string,
    categoryId?: string,
    categoryName: string,
    handlerId?: number,
    handlerEmail: string
}