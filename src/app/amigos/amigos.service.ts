import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Amigo } from './amigos'
import { UsersService } from "../users/users.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {
  constructor(private http: HttpClient, private usersService: UsersService, public router: Router) { }
  private getHeaders(): HttpHeaders | null {
    const token = this.usersService.getToken();
    if (!token) {
      // redirect the user to the login page if token does not exist
      this.router.navigate(['/login']);
      return null;
    }

    // setting up headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return headers;
  }
  getAmigos(): Observable<Amigo[]>{
    const headers = this.getHeaders();
    if (!headers) {
      return of([]);
    }
    return this.http.get<Amigo[]>("http://localhost:4000/amistad/listarAmigos", { headers })
  }
}
