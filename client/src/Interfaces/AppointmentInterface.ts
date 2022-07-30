export interface AppointmentInterface {
    id: number;
    firstName: string;
    lastName: string;
    time: Date;
    kind: string;
    physicianId: number;
}

export interface ReadableAppointmentInterface {
    id: number;
    firstName: string;
    lastName: string;
    time: string;
    kind: string;
    physicianId: number;
}

// TODO: make an enum for Kind with "New Patient" and "Follow Up"