import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/users.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

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

  openAdressDialog() {

  }

}
