import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  // encrypt and decrypt token
  encryptToken(token) {
    const tokenInfo = CryptoJS.AES.encrypt(JSON.stringify(token), 'my_token').toString()
    localStorage.setItem('currentUser', JSON.stringify(tokenInfo))
  }

  decryptToken() {
    if (localStorage.getItem('currentUser')) {
      const eText = JSON.parse(localStorage.getItem('currentUser'))
      const decryptedWord = CryptoJS.AES.decrypt(eText, 'my_token')
      const decryptedData = JSON.parse(decryptedWord.toString(CryptoJS.enc.Utf8));
      return decryptedData['jsonWebToken']
    } else {
      return null
    }
  }


}
