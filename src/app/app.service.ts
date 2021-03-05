import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly BASE_URL = 'https://aqi-reo13.herokuapp.com';
  cache: any = {};
  constructor(private http: HttpClient) {}

  retrieveData() {
    if (this.cache.hasOwnProperty('aqi')) {
      return of(this.cache.aqi);
    }
    return forkJoin([
      this.http.get(`${this.BASE_URL}/api/aqi/1`),
      this.http.get(`${this.BASE_URL}/api/aqi/3`),
      this.http.get(`${this.BASE_URL}/api/aqi/7`)
    ]).pipe(
      map(([bangkok, west, center]: any) => {
        const bangkokFilter = bangkok.stations;
        const westFilter = west.stations;
        const centerFilter = center.stations;
        this.cache.aqi = [...bangkokFilter, ...westFilter, ...centerFilter];
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

  updatePins(payload) {
    return this.http.put(
      `${this.BASE_URL}/api/pins/${payload.stationId}`,
      payload
    );
  }
}
