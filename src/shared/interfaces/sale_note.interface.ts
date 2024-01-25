export interface SaleNote {
    id: string;
    note: string;
    author_name: string;
    sale_id: string | number;
    created_at_human: string;
}
