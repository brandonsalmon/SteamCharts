import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { LibraryActions } from 'app/app.actions';
import { IAppState } from 'app/app.store';

@Component({
  selector: 'sc-lookup-account',
  templateUrl: './lookup-account.component.html',
  styleUrls: ['./lookup-account.component.css']
})
export class LookupAccountComponent implements OnInit {
  userForm = new FormGroup({
    steamId: new FormControl()
  });

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: LibraryActions) {
  }

  ngOnInit() {
  }

  linkAccount() {
    this.ngRedux.dispatch(this.actions.linkAccount(this.userForm.controls['steamId'].value));
  }

  refreshAccount() {
  }
}
