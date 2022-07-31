export interface AppointmentInterface {
    id: number;
    firstName: string;
    lastName: string;
    datetime: Date;
    kind: string;
    physicianId: string;
}
// TODO: make an enum for Kind with "New Patient" and "Follow Up"