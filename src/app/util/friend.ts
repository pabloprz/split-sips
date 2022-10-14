export interface Friend {
    id: number;
    name: string;
    spent: number;
}

export interface SelectedFriend extends Friend {
    selected: boolean;
}
