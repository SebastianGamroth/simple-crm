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
  user: User = new User();

  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId)
    this.getUser();
  }

  getUser() {
    this.firestore.collection('users').doc(this.userId).valueChanges().subscribe((user: any) => {
      this.user = new User(user);
      console.log(this.user)
    })
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.user;
  }

  /**
   * const dialog get value from DialogEditAddressComponent
   * DialogEditAddressComponent.user get value from this.user
   */
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }

}
