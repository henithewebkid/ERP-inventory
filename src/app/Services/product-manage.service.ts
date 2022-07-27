import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductManageService {

  constructor(private http : HttpClient,private authenticator: AuthenticationService) { }

  createProduct(productName:string,productWidth:number,productHeight:number,productThickness:number,productPrice:number): Observable<any>{
    const body={productName,productWidth,productHeight,productThickness,productPrice};
    
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/keste-damena/product/',body, {headers, responseType: 'text', observe: 'response'})
  }
  getAllProduct(): Observable<any>{
    const headers= new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/api/keste-damena/product', {headers, responseType: 'text', observe: 'response'})
  }
  updateProduct(id:any,body:{productName:string,productWidth:number,productHeight:number,productThickness:number,productPrice:number}): Observable<any>{
    
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/api/keste-damena/product/' + id ,body, {headers, responseType: 'text', observe: 'response'})
  }
  deleteProduct(id : any): Observable<any>{
    const token: any = this.authenticator.getAccessToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' +  token });
    headers.set('Content-Type', 'application/json');

    return this.http.delete('http://localhost:3000/api/keste-damena/product/' + id, {headers, responseType: 'text', observe: 'response'})
  }
}
