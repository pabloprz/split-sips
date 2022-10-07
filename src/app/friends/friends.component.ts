import {Component, OnInit} from '@angular/core';

export interface Friend {
  id: number;
  name: string;
  spent: number;
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  total?: number;
  friends: Friend[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  addFriend() {
    this.friends.push({id: this.friends.length, name: '', spent: 0});
  }

  removeFriend(friend: Friend) {
    this.friends.splice(this.friends.findIndex(f => f.id === friend.id))
  }
}
