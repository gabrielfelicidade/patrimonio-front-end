import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private activeModal: NgbModal
  ) { }

  ngOnInit() {
  }

  confirm() {
    this.passEntry.emit(true);
    this.close();
  }

  close() {
    this.activeModal.dismissAll();
  }

}
