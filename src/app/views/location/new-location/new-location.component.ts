import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location/location.service';
import { Location } from '../../../model/location';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {

  locationId: number;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) { }

  newLocationForm = this.fb.group({
    description: ['', Validators.required],
    status: [true]
  });

  ngOnInit() {
  }

  save() {
    let obj: Location = this.newLocationForm.value;
    this.locationService.insert(obj).subscribe(
      (data) => {
        console.log(data);
      });
  }

  cancel() {
    this.newLocationForm.reset();
  }

}
