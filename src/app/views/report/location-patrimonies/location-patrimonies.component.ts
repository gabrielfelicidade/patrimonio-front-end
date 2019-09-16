import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { PatrimonyService } from '../../../services/patrimony/patrimony.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '../../../model/location';
import { ReportService } from '../../../services/report/report.service';

@Component({
  selector: 'app-location-patrimonies',
  templateUrl: './location-patrimonies.component.html',
  styleUrls: ['./location-patrimonies.component.scss']
})
export class LocationPatrimoniesComponent implements OnInit {

  locations: Location[] = [];
  selectedLocationId: number = 0;

  constructor(
    private locationService: LocationService,
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.locationService.getAll().subscribe(
      (data) => {
        this.locations = data;
      });
  }

  openReport() {
    if (this.selectedLocationId) {
      this.reportService.getByLocationReport(this.selectedLocationId).subscribe(
        (obj) => {
          let blob = new Blob([obj], { type: 'application/pdf' });
          let reportURL = URL.createObjectURL(blob);
          window.open(reportURL, '_blank');
        });
    }else{
      this.reportService.getLocationsPatrimoniesReport().subscribe(
        (obj) => {
          let blob = new Blob([obj], { type: 'application/pdf' });
          let reportURL = URL.createObjectURL(blob);
          window.open(reportURL, '_blank');
        });
    }
  }

}
