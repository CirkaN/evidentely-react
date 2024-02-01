export type ItemDTO = {
    id: string;
    type: "product" | "service" | "package";
    name: string;
    description?: string;
    selling_price: string;
    price: string;
    duration: string;
    color: string;
    note: string;
};
