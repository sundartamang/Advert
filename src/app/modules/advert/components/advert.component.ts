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
import { Router } from '@angular/router';
import {
  SortDescriptor,
} from "@progress/kendo-data-query";


@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit {

  // variable declaration
  editMode: boolean=false;
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
    private _adverService : AdvertService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.buildAdvertorm();
    this.getData();
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
      maxPrice: [
        advert ? advert.maxPrice : "",
        [Validators.required]
      ],
      customerId: [
        advert ? advert.customerId : "",
        [Validators.required]
      ],
      channelId: [
        advert ? advert.channelId : "",
        [Validators.required]
      ],
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
    if(this.editMode){
      this.updateAdvert();
    }else{
      this.createAdvert();

    }
  }

  // create advert
  createAdvert() {
    console.log("create submit function called")
    // console.log(this.advertForm.value)
    this._adverService.addAdvert(this.advertForm.value).subscribe((res)=>{
      console.log("RES = > ",res)
      if(res){
        this.getData();
        this.closeModal();
        this.advertForm.reset();
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


  getData() {
    this._adverService.getAdvert().subscribe((res)=>{
      console.log("RESPONSE ADVERT IS => ", res)
      this.gridData = res
    })
  }


  // close modal
  closeModal() {
    $('.modal-backdrop').remove();
    document.getElementById("modal").click();
  }

  redirect(id:any){
    this._router.navigate([`/request-channerl/${id}`])
  }



}
