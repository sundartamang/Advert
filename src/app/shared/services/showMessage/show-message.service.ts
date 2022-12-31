import { Injectable, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  @Input() message = '';

  constructor(
    private _toastr: ToastrService
  ) { }

  // toast success message
  toastSuccess(message) {
    this._toastr.success(message, 'Sucsss!', { progressBar: true });
  }

  // toast warning message
  toastWarning(message: string) {
    this._toastr.warning(message, '', { progressBar: true });
  }

  // toast info message
  toastInfo(message: string) {
    this._toastr.info(message, '', { progressBar: true });
  }

  // toast error message
  toastError(message: string) {
    this._toastr.error(message, 'Opps!', { progressBar: true });
  }

}
