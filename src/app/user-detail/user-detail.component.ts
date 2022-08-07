import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/users.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();  // new User() is empty for ng test

  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId)
    this.getUser();
  }

  getUser() {
    if (this.userId) {
      this.firestore.collection('users').doc(this.userId).valueChanges().subscribe((user: any) => {
        this.user = new User(user);
        console.log(this.user)
      })
    }
  }

  /**
   * const dialog get value from DialogEditAddressComponent
   * this.user.toJSON() <- old Date from this.user in JSON (copy from old user)
   * new User <- create new User with old Date user
   * DialogEditUserComponent.user get new User with old Date
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userId;
  }

  /**
   * const dialog get value from DialogEditAddressComponent
   * this.user.toJSON() <- old Date from this.user in JSON (copy from old user)
   * new User <- create new User with old Date user
   * DialogEditAddressComponent.user get new User with old Date
   */
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userID = this.userId;
  }

}
