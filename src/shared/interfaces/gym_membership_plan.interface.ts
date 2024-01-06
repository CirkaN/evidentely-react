export interface GymMembershipPlanDTO {
    id: string | number
    name: string
    description: string,
    archived:boolean,
    price: number,
    duration_months: number
}