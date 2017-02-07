import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersAdminComponent implements OnInit, AfterViewInit {
  public users: any;
  public currentUser: any;
  public editingUser: boolean = false;

  constructor(
    private http: Http
  ) {
    
  }

  ngOnInit() {
    this.setBlankUser();
  }

  ngAfterViewInit() {
    this.getAllUsers();
  }

  //=========================================================
  // get all users
  //---------------------------------------------------------
  getAllUsers() {
    return this.http.get('http://localhost:7070/api/users')
      .map(res => res.json())
      .subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
  }

  //=========================================================
  // add new user
  //---------------------------------------------------------
  addNewUser(currentUser: any) {
    currentUser.admin = false;
    this.http.post(
      'http://localhost:7070/api/users',
      currentUser
    )
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.getAllUsers();
        this.setBlankUser();
      });
  }

  //=========================================================
  // update user
  //---------------------------------------------------------
  updateUser(user: any) {
    this.http.put(
      `http://localhost:7070/api/users/${user._id}`,
      user
    )
      .map(res => res.json())
      .subscribe(res => {
        // this.users = users;
        console.log(res);
        this.getAllUsers();
        this.disableUserEditMode();
      });
  }

  //=========================================================
  // remove a user
  //---------------------------------------------------------
  removeUser(user: any) {

    this.http.delete(
      `http://localhost:7070/api/users/${user._id}`,
      user
    )
      .map(res => res.json())
      .subscribe(res => {
        // this.users = users;
        console.log(res);
        this.getAllUsers();
      });
  }

  //=========================================================
  // enable user edit mode
  //---------------------------------------------------------
  enableUserEditMode(user: any) {
    this.currentUser = user;
    this.editingUser = true;
  }

  //=========================================================
  // disable user edit mode
  //---------------------------------------------------------
  disableUserEditMode() {
    this.setBlankUser();
    this.editingUser = false;
  }

  //=========================================================
  // set blank user
  //---------------------------------------------------------
  setBlankUser() {
    this.currentUser = {
      name: '',
      email: '',
      username: '',
      password: ''
    };

    this.editingUser = false;
  }
}
