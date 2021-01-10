import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly BASE_URL = 'https://lit-beach-78782.herokuapp.com';
  cache: any = {};
  constructor(private http: HttpClient) {}

  retrieveData() {
    if (this.cache.hasOwnProperty('aqi')) {
      return of(this.cache.aqi);
    }
    return forkJoin([
      this.http.get(`${this.BASE_URL}/api/aqi/1`),
      this.http.get(`${this.BASE_URL}/api/aqi/3`),
    ]).pipe(
      map(([bangkok, west]) => {
        const bangkokFilter = this.filterBangkok(bangkok);
        const westFilter = this.filterWest(west);
        this.cache.aqi = [...bangkokFilter, ...westFilter];
        return this.cache.aqi;
      })
    );
  }

  getPins() {
    if (this.cache.hasOwnProperty('pins')) {
      return of(this.cache.pins);
    }
    return this.http.get(`${this.BASE_URL}/api/pins`).pipe(
      map((pins: any) => {
        const out = [];
        for (const [key, value] of Object.entries(pins)) {
          out.push(value);
        }

        this.cache.pins = out.sort((pinA, pinB) => pinA.index - pinB.index);
        return this.cache.pins;
      })
    );
  }

  addPins(payload) {
    return this.http.post(`${this.BASE_URL}/api/pins`, payload);
  }

  deletePins(id) {
    return this.http.delete(`${this.BASE_URL}/api/pins/${id}`);
  }

  updatePins(payload) {
    return this.http.put(
      `${this.BASE_URL}/api/pins/${payload.stationId}`,
      payload
    );
  }

  private filterBangkok(bangkok) {
    return bangkok.stations.filter((station) => {
      return station.areaTH.includes('สมุทรปราการ');
    });
  }

  private filterWest(west) {
    return west.stations.filter((station) => {
      return (
        !station.areaTH.includes('ปราจีนบุรี') &&
        !station.areaTH.includes('สระแก้ว')
      );
    });
  }
}
