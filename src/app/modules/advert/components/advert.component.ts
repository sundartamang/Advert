import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Advert } from '../models/advertModal';
import {
  DataStateChangeEvent,
  GridDataResult,
  PageChangeEvent
} from "@progress/kendo-angular-grid";
import { AdvertService } from '../service/advert.service';
import $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SortDescriptor,
} from "@progress/kendo-data-query";
import { ShowMessageService } from 'src/app/shared/services/showMessage/show-message.service';


@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {

  // variable declaration
  editMode: boolean = false;
  title: string;
  buttonName: string;
  advertForm: FormGroup;
  advertDetail: Advert

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
  channelName: any;
  customerList : any = []

  //sorting kendo data
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
    {
      field: "",
      dir: "asc",
    },
  ];

  constructor(
    private _fb: FormBuilder,
    private _adverService: AdvertService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.channelName = this._activateRoute.snapshot.params['id']

    this.buildAdvertorm();
    this.getAdvertList();
  }

  // form builder
  buildAdvertorm() {
    const advert = this.advertDetail;
    this.advertForm = this._fb.group({
      id: [
        advert ? advert.id : "",
      ],
      name: [
        advert ? advert.name : "",
        [Validators.required]
      ],
      max_price: [
        advert ? advert.max_price : "",
        [Validators.required]
      ],
      customer_id: [advert ? advert.customer_id : "", [Validators.required]],
      channel_id: [
        advert ? advert.channel_id : this.channelName,
        [Validators.required]
      ],
    });

  }

  openCreateModal() {
    this.editMode = false;
    this.title = "Add";
    this.buttonName = "Save";

    this.getUsers();
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
      this.createAdvert();

    }
  }

  // create advert
  createAdvert() {
    console.log("create submit function called")
    let advert = {
      advert: this.advertForm.value
    }
    console.log("adverts => ", advert)

    this._adverService.addAdvert(advert).subscribe((res) => {
      console.log("RES = > ", res)
      if (res) {
        this.getAdvertList();
        this.closeModal();
        this.advertForm.reset();
        this._showMessage.toastSuccess("Advert create successfully")
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


  getAdvertList() {
    let adverts = {
      adverts: {
        channelId: this.channelName,
      }
    }

    this._adverService.getAdvert(adverts).subscribe((res)=>{
      console.log("RESPONSE ADVERT IS => ", res)
      if(res){
        this.gridData = res
      }else{
        this.gridData = []
      }
    })
  }


  // get customer list
  getUsers() {
    this._adverService.getUsersList().subscribe((res) => {
      if(res){
        console.log("Get customers list => ",res['customers'] )
        this.customerList = res['customers']
      }
      else{
        this.customerList = []
      }
    })
  }

  selectCustomer(event){
    console.log("Selected customer => ", event)
  }


  // close modal
  closeModal() {
    $('.modal-backdrop').remove();
    document.getElementById("modal").click();
  }

  redirect(id: any) {
    this._router.navigate([`/request-channerl/${id}`])
  }



}
