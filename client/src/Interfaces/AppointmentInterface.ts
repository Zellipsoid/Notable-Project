export interface AppointmentInterface {
    id: number;
    firstName: string;
    lastName: string;
    datetime: Date;
    kind: string;
    physicianId: number;
}

export interface ReadableAppointmentInterface {
    id: number;
    name: string;
    readableDatetime: string;
    kind: string;
    physicianId: number;
}

// TODO: make an enum for Kind with "New Patient" and "Follow Up"