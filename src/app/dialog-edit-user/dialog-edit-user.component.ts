import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/users.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {
  user: User = new User();  // new User() is empty for ng test
  userID: string;
  loading = false;
  birthDate: any = Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  /**
   * loading is disabled
   * update user date
   * then loading is enabled and dialog close
   */
  saveUser() {
    this.loading = true;
    if (this.userID) {
      this.firestore
        .collection('users')
        .doc(this.userID)
        .update(this.user.toJSON())
        .then(() => {
          this.loading = false;
          this.dialogRef.close();
        });
    } else {
      // Throw Error
    }
  }

}
