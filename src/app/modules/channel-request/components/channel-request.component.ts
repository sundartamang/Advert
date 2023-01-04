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
import { ShowMessageService } from 'src/app/shared/services/showMessage/show-message.service';

@Component({
  selector: 'app-channel-request',
  templateUrl: './channel-request.component.html',
  styleUrls: ['./channel-request.component.scss']
})
export class ChannelRequestComponent implements OnInit {


  // variable declaration
  editMode: boolean = false;
  title: string;
  buttonName: string;
  channelForm: FormGroup;
  channelDetail: Channel

  public gridView: GridDataResult;
  serviceCategoryDetail: any = [];
  isLoading: boolean;
  public skip = 0;
  public pageSize = 15;
  orderByKey = "";
  dirKey = "asc";
  public currentPage = 1;
  public pagelimtit = 10;
  gridData: any = [];

  //sorting kendo data
  public allowUnsort = true;
  // public sort: SortDescriptor[] = [
  //   {
  //     field: "",
  //     dir: "asc",
  //   },
  // ];


  constructor(
    private _fb: FormBuilder,
    private _channelService: ChannelService,
    private _router: Router,
    private _showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.buildAdvertorm();
    this.getData();
  }

  
  // get channel list
  getData() {
    this._channelService.getChannelList().subscribe((res) => {
      console.warn("RESPONSE channel IS => ", res['channels'])
      this.gridData = res['channels']
    })
  }

  // form builder
  buildAdvertorm() {
    const channel = this.channelDetail;
    this.channelForm = this._fb.group({
      name: [
        channel ? channel.name : "",
        [Validators.required]
      ],
      parent: [
        channel ? channel.parent : "",
      ]
    });

  }

  openCreateModal() {
    this.editMode = false;
    this.title = "Add";
    this.buttonName = "Save";

  }

  openEditModal() {
    this.editMode = true;
    this.title = "Update";
    this.buttonName = "Submit";
  }


  // on submit book
  onSubmit(): void {
    if (this.editMode) {
      this.updateAdvert();
    } else {
      this.createChannel();

    }
  }

  // create advert
  createChannel() {
    let channel = {
      channel : this.channelForm.value
    }
    this._channelService.addChannel(channel).subscribe((res) => {
      console.log("RES = > ", res)
      if (res) {
        this.getData();
        this.closeModal();
        this.channelForm.reset();
        this._showMessage.toastSuccess("Channel create successfully")
      }
    })
  }

  // update advert
  updateAdvert() {

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

  redirect(id: any) {
    console.log("Channel id is => ", id)
    this._router.navigate([`/dashboard/advert/${id}`])
  }



}
