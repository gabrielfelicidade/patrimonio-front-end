import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations-patrimonies',
  template: ''
})
export class LocationsPatrimoniesComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationService.getLocationsPatrimoniesReport().subscribe(
      (obj) => {
        let blob = new Blob([obj], {type: 'application/pdf'});
        let reportURL = URL.createObjectURL(blob);
        window.open(reportURL, '_blank');
        this.router.navigate(['home']);
      });
  }

}
