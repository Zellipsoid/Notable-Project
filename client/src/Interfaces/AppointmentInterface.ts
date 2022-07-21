export interface AppointmentInterface {
    firstName: string;
    lastName: string;
    Time: Date;
    Kind: string;
    physicianId: number;
}
// TODO: make an enum for Kind with "New Patient" and "Follow Up"