import { Observable, catchError, throwError } from "rxjs"
import { Dog } from "../model/dog"
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DogService {
  dogsUrl: string

  constructor(private http: HttpClient) {
    this.dogsUrl = "http://localhost:18081";
  }

  public getDog(dogId: number): Observable<Dog> {
    return this.http.get<Dog>(`${this.dogsUrl}/dog/${dogId}`);
  }
  

  public getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl + '/dogs/');
  }

  public addDog(dog : Dog): Observable<Object>{
    return this.http.post(`${this.dogsUrl + '/add-dog/'}`, dog)
   }
    
   public deleteDog(dogId: number): Observable<Object> {
    return this.http.get(`${this.dogsUrl}/delete/${dogId}`);
  }

  public updateDog(dogId: number, dog: Dog): Observable<Object> {
    return this.http.put(`${this.dogsUrl}/update/${dogId}`, dog);
  }
  
}
