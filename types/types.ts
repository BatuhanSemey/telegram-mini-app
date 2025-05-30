export interface IdsType {
    [key: number]: string;
}

export interface DbUserDataType {
    telegram_id: string,
    login: string,
    full_name: string,
    role: string,
    branch_id: number,
    created_at: Date,
    updated_at: Date
}