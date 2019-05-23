import { Component, OnInit } from '@angular/core';
import { Log } from '../../model/log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  rows: Log[] = [];

  constructor() { }

  ngOnInit() {
  }

}
