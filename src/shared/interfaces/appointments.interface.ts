interface Appointment {
    user_id: string;
    price: string | number;
    amount_paid?: string;
    due_amount: string;
    paid_at?: string;
    employee_id?: string;
    title: string;
    start: string;
    end: string;
    color?: string;
    remind_client: boolean;
    item_id?: string;
    status: string;
    note?: string;
    remind_setting: {
        remind_day_before: boolean;
        remind_same_day: boolean;
        remind_now: boolean;
        remind_for_upcoming: boolean;
        settings_for_upcoming: {
            date: string;
            custom_text_message: string;
        };
    };
}

export type AppointmentDTO = Appointment;
