import {SelectedFriend} from "./friend";

export interface Expense {
    id: number,
    concept: string,
    amount?: number,
    friends: SelectedFriend[]
    nSelected: number;
}
