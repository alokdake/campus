import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  httpOption = {
    headers: this.headers,
  };
  registerUrl = 'http://localhost:1000/registeredStudents';
  getUserDetailsByIdUrl = 'http://localhost:1000/registeredStudents/';
  apiUrl!: string;
  constructor(private http: HttpClient) {}
  getUserdetails() {
    let header = new HttpHeaders();
    return this.http.get<any>(this.registerUrl);
  }

  getAllUsers() {
    return this.http.get<any>(this.registerUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getUserById(userId: string): Observable<any> {
    console.log(userId);
    return this.http.get<any>(this.getUserDetailsByIdUrl + '/' + userId);
  }
  update(userId: any, value: any) {
    console.log(value);
    return this.http.put<any>(this.registerUrl + '/' + userId, value);
  }
  delete(id: number) {
    return this.http.delete<any>(this.registerUrl + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
