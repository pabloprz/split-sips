export interface Friend {
    id: number;
    name: string;
    spent: number;
    color: string;
}

export interface SelectedFriend extends Friend {
    selected: boolean;
}
