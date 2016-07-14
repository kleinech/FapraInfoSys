import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpAuthenticationService {
    private token: string = "";
    
    constructor(private http: Http){}
    
    public get(url: string, options:any = {} ){
        options.headers = options.headers ? options.headers : new Headers();
        this.getAuthenticationHeader(options.headers);
        this.getContentTypeHeader(options.headers);
        return this.http.get(url, options);
    }
    
    public put(url: string, body: string, options: any = {}){
        options.headers = options.headers ? options.headers : new Headers(); 
        this.getAuthenticationHeader(options.headers);
        return this.http.put(url, body, options);
    }
    
    public delete(url: string, options: any = {}){
        options.headers = options.headers ? options.headers : new Headers();
        this.getAuthenticationHeader(options.headers);
        return this.http.delete(url, options);
    }
    
    private getAuthenticationHeader(headers: Headers){
        headers.append('Authorization', 'Baerer ' + this.getToken());
    }
    
    private getContentTypeHeader(headers: Headers){
        headers.append('Content-Type', 'application/json');
    }
    
    private getToken(): string{
        // TODO check token
        return this.token;
    }
    
    public authenticate(url: string, username:string, password: string): Observable<any>{
        return Observable.create(observer => {

            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            let params = {
                username: username,
                password: password
            };
            
            this.http.post(url, this.urlEncode(params), { headers: headers }).
            subscribe(token => {
                this.token = token['_body'];
                observer.next("ready");
                observer.complete;
            });
        });   
    }
    
    private urlEncode(obj: Object): string{
        let urlSearchParams = new URLSearchParams();
        for(let key in obj){
            urlSearchParams.append(key, obj[key]);
        }
        return urlSearchParams.toString();
    }
    

}