import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../service/channel.service';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Channel } from 'src/app/modules/channel-request/models/channelModal';
import $ from 'jquery';
import {Location} from '@angular/common';
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
      id: new FormControl(channel ? channel.id : ""),
      name: new FormControl(channel ? channel.name : "", Validators.required),
      max_price: new FormControl(channel ? channel.max_price : "", Validators.required),
      channel_id: new FormControl(this.advertname),
      click_through_url: new FormControl(channel ? channel.click_through_url : "", Validators.required),
      start_time: new FormControl(channel ? channel.start_time : "", Validators.required),
      end_time: new FormControl(channel ? channel.end_time : "", Validators.required),

      // id: [
      //   channel ? channel.id : "",
      // ],
      // name: [
      //   channel ? channel.name : "",
      //   [Validators.required]
      // ],
      // channel_id: [
      //   channel ? channel.channel_id :  this.adverData.name
      // ],
      // max_price: [
      //   channel ? channel.max_price : "",
      //   [Validators.required]
      // ],
      // click_through_url: [
      //   channel ? channel.click_through_url : "",
      //   [Validators.required]
      // ],
      // start_time: [
      //   channel ? channel.start_time : "",
      //   [Validators.required]
      // ],
      // end_time: [
      //   channel ? channel.end_time : "",
      //   [Validators.required]
      // ]
    });

  }

  openCreateModal() {
    this.editMode = false;
    this.title = "Add";
    this.buttonName = "Save";

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

  // close modal
  closeModal() {
    $('.modal-backdrop').remove();
    document.getElementById("modal").click();
  }

  //back to previous page
  back(){
    this._location.back();
  }

}
