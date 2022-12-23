import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/userModal';
import $ from 'jquery';
import { UserService } from '../service/user.service';
import {
  DataStateChangeEvent,
  GridDataResult,
  PageChangeEvent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  // variable
  adverId
  adverData: any = []
  advertname: string = ""
  editMode: boolean = false;
  title: string;
  buttonName: string;
  userForm: FormGroup;
  user: User
  gridData: any = []

  public gridView: GridDataResult;
  serviceCategoryDetail: any = [];
  isLoading: boolean;
  public skip = 0;
  public pageSize = 15;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 10;
  public allowUnsort = true;

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildUserForm();
    this.getData();
  }

  // form builder
  buildUserForm() {
    const user = this.user;
    this.userForm = this._fb.group({
      id: [
        user ? user.id : "",
      ],
      name: [
        user ? user.name : "",
        [Validators.required]
      ],
      email: [
        user ? user.email : "",
        [Validators.required]
      ],
    });

  }

  openCreateModal() {
    this.editMode = false;
    this.title = "Add";
    this.buttonName = "Save";

  }


  // on submit book
  onSubmit(): void {
    if (this.editMode) {
      this.updateUser();
    } else {
      this.createuser();

    }
  }


  createuser() {
    console.log("users data is => ", this.userForm.value)
    this._userService.addUser(this.userForm.value).subscribe((res) => {
      console.log("RES = > ", res)
      if (res) {
        this.getData();
        this.closeModal();
      }
    })
  }

  updateUser() {

  }

  getData() {
    this._userService.getUsers().subscribe((res) => {
      this.gridData = res
    })
  }

  // page change
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }


  // close modal
  closeModal() {
    $('.modal-backdrop').remove();
    document.getElementById("modal").click();
  }

}
