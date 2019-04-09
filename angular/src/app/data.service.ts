import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  httpOptions: { headers; observe; } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response'
  };

  registerPerson(person) {
    return this.http.post('http://localhost:1000/api/v1/add', person, this.httpOptions );
  }

}
