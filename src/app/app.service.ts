import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  retrieveData() {
    return forkJoin([
      this.http.get(
        `https://cors-anywhere.herokuapp.com/http://air4thai.pcd.go.th/services/getNewAQI_JSON.php?region=1`
      ),
      this.http.get(
        `https://cors-anywhere.herokuapp.com/http://air4thai.pcd.go.th/services/getNewAQI_JSON.php?region=3`
      ),
    ]).pipe(
      map(([bangkok, west]) => {
        const bangkokFilter = this.filterBangkok(bangkok);
        const westFilter = this.filterWest(west);
        return [...bangkokFilter, ...westFilter];
      })
    );
  }

  filterBangkok(bangkok) {
    return bangkok.stations.filter((station) => {
      return station.areaTH.includes('สมุทรปราการ');
    });
  }

  filterWest(west) {
    return west.stations.filter((station) => {
      return (
        !station.areaTH.includes('ปราจีนบุรี') &&
        !station.areaTH.includes('สระแก้ว')
      );
    });
  }
}
