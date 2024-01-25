export type SaleDTO = {
    id: number;
    company_id: string;
    item_id: string;
    employee_id?: string;
    user_id: string;
    status: string;
    price: string;
    pending_amount: string;
    paid_at: string;
    note: string;
};

export type PendingSaleDTO = {
    employee_id?: string;
    item_id: string;
    user_id: string;
    status?: string;
    price: string;
    pending_amount?: string;
    paid_at?: string;
    paid_via?: string;
    note?: string;
    sale_made_at?: string;
};

export interface SaleInfo {
    id: string;
    sold_to_name: string;
    pending_amount: string;
    total_paid: string;
    price: string;
    sold_time_human: string;
    expected_profit: string;
    item: {
        price: string;
    };
}
