export interface PackageDTO {
    id: string;
    price: string;
    sale_price?: string;
    expiration_date?: string;
    name: string;
    description: string;
    package_items?: PackageItem[];
    service_ids?: Array<number>;
    expired: boolean;
}
export interface PackageItem {
    package_id: string;
    service_id: string;
}
