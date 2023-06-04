export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
}

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
}

export interface Subscription {
    id: string;
    user_id: string;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
}


export interface Product {
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
}

export interface Song {
    id: string;
    user_id: string;
    title: string;
    author: string;
    song_path: string;
    image_path: string;
}