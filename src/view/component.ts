import {Component, Input, Output, EventEmitter} from "@angular/core";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'main-view',
  templateUrl: './template.html',
  styleUrls: ['./styles.scss']
})
export class MainView {
  loaded:boolean = false;
  public formModel:any;
  public searchForm: FormGroup = null;
  
  constructor(private _fb: FormBuilder, private http:Http) {
  }
  
  ngOnInit() {
    let promise = this.http.get("/assets/mock.json").toPromise();
    promise.then((response) => {
      return response.json();
    }).then((data) => {
      this.formModel = {
        wordphrase: new FormControl({value:'',disabled:false}, []),
        auto: new FormControl({value:false,disabled:true}, []),
        rangeType: new FormControl({value:'',disabled:false}, [])
      }
      this.searchForm = this._fb.group(this.formModel);
      this.loaded = true;
    }).catch((e) => {
      console.warn("Ajax error getting mock data:");
      console.error(e);
    });
  }
  
  ngOnDestroy() {
  }
}