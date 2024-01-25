export interface ChargeSale {
    amount: number;
    sale_id: number;
    payment_method: string;
    reference_id: string | null;
}

export interface SalePayment {
    id: number;
    amount: number;
    sale_id: number;
    payment_method: string;
    reference_id: string | null;
}
