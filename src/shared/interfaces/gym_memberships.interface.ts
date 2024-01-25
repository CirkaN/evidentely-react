export interface GymMembershipDTO {
    id: string;
    start_date: string;
    end_date: string;
    gym_membership_plan_id: string | number;
    member_id: number | string;
    price: number;
}
