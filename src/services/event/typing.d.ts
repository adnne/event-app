declare namespace API {
    interface Event {
        id: number;
        title: string;
        date_time: string;
        image: string|null;
        location: string;
        guest_limit: number|null;
    }
}