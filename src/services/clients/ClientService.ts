
export interface ClientDTO {
    id: number,
    name: string
}

export interface Clients {
    id: number,
    name: string,
    settings: ClientSettings
}
export interface ClientDocumentDTO {
    id: number,
    media_url?: string
}
export interface ClientSettings {
    email: string,
    phone_number: string,
    address: string,
    country: string,
    occupation: string,
    receive_sms: boolean,
    receive_emails: boolean,
    sms_remind_day_before: boolean,
    sms_remind_same_day: boolean,
    sms_remind_when_appointment_is_created: boolean,
    sms_send_thank_you_note: boolean,
    sms_send_happy_birthday_note: boolean,
    email_remind_day_before: boolean,
    email_remind_same_day: boolean,
    email_remind_when_appointment_is_created: boolean,
    email_send_thank_you_note: boolean,
    email_send_happy_birthday_note: boolean,
}
