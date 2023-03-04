export interface albumType {
    userId: number;
    id: number;
    title: string;
}
export interface PhotoType {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface UserType {
    id: number;
    name: string;
    username: string;
    email: string;
    address: any;
    phone: string;
    website: string;
    company: any
}
