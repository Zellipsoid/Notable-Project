export interface AppointmentInterface {
    _id: string;
    firstName: string;
    lastName: string;
    datetime: Date;
    kind: string;
    physicianId: number;
}

export interface ReadableAppointmentInterface {
    id: string;
    name: string;
    readableDatetime: string;
    kind: string;
    physicianId: number;
}

// TODO: make an enum for Kind with "New Patient" and "Follow Up"