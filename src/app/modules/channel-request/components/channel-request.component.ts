import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../service/channel.service';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Channel } from 'src/app/modules/channel-request/models/channelModal';
import $ from 'jquery';
import { Location } from '@angular/common';
import {
  DataStateChangeEvent,
  GridDataResult,
  PageChangeEvent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-channel-request',
  templateUrl: './channel-request.component.html',
  styleUrls: ['./channel-request.component.scss']
})
export class ChannelRequestComponent implements OnInit {

  // variable
  adverId
  adverData: any = []
  advertname: string = ""
  editMode: boolean = false;
  title: string;
  buttonName: string;
  advertForm: FormGroup;
  channel: Channel
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

  constructor(
    private _activateRoute: ActivatedRoute,
    private _channelService: ChannelService,
    private _fb: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.adverId = this._activateRoute.snapshot.params['id']
    this.getAdverDetail();
    this.buildChannerlForm();
    this.getData();
  }

  getAdverDetail() {
    this._channelService.getAdvertDetail(this.adverId).subscribe((res) => {
      this.adverData = res
      this.advertname = res.name
    })
  }


  // form builder
  buildChannerlForm() {
    const channel = this.channel;
    this.advertForm = this._fb.group({
      id: [
        channel ? channel.id : "",
      ],
      name: [
        channel ? channel.name : "",
        [Validators.required]
      ],
      channel_id: [
        channel ? channel.channel_id : this.adverData.name
      ],
      maximum_bid_price: [
        channel ? channel.maximum_bid_price : "",
        [Validators.required]
      ],
      budget: [
        channel ? channel.budget : "",
        [Validators.required]
      ],
      image: [
        channel ? channel.image : ""
      ],
      type: [
        channel ? channel.type : "",
        [Validators.required]
      ],
      user: [
        channel ? channel.user : "",
        [Validators.required]
      ]
    });

  }

  openCreateModal() {
    this.editMode = false;
    this.title = "Add";
    this.buttonName = "Save";
    this.getUserList();

  }

  onSubmit() {
    if (this.editMode) {
      this.updateChannel();
    } else {
      this.createChannel();

    }
  }

  createChannel() {
    console.log(this.advertForm.value)
    this._channelService.addChannel(this.advertForm.value).subscribe((res) => {
      console.log("RES = > ", res)
      if (res) {
        this.getData();
        this.closeModal();
      }
    })
  }

  updateChannel() {

  }

  getData() {
    this._channelService.getChannel().subscribe((res) => {
      this.gridData = res
    })
  }

  // 
  imageSrc: string;
  readImageURL(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  // close modal
  closeModal() {
    $('.modal-backdrop').remove();
    document.getElementById("modal").click();
  }

  //back to previous page
  back() {
    this._location.back();
  }

  // get user list
  userData : any = [];
  getUserList() {
    this._channelService.getUsers().subscribe((res) => {
      this.userData = res
    })
  }




}
