export type SaleDTO={
    id:number,
    company_id:string,
    item_id:string,
    employee_id?:string,
    user_id:string,
    status:string,
    price:string,
    pending_amount:string,
    paid_at:string,
    note:string
}

export type PendingSaleDTO={
    employee_id?:string,
    item_id:string,
    user_id:string,
    status?:string,
    price:string,
    pending_amount?:string,
    paid_at?:string,
    note?:string
}

