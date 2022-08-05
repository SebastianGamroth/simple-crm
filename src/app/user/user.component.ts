import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
// import { User } from 'src/models/users.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // user = new User();
  allUsers = [];

  constructor(public dialog: MatDialog, private firestor: AngularFirestore) { }

  ngOnInit(): void {
    this.firestor.collection('users').valueChanges().subscribe((changes: any) => {
      console.log(changes);
      this.allUsers = changes;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
