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
        this.getAcceptHeader(options.headers);
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
    
    private getAcceptHeader(headers: Headers){
        headers.append('Accept', 'application/json');
    }
    
    public getToken(): string{
        // TODO check token
        return this.token;
    }
    
    public authenticate(url: string, username:string, password: string): Observable<any>{
        return Observable.create(observer => {
            let headers = new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            this.getAcceptHeader(headers);
            let params = {
                username: username,
                password: password
            };
            
            this.http.post(url, this.urlEncode(params), { headers: headers }).
            subscribe(
                token => {
                this.token = token['_body'];
                observer.next("ready");
                observer.complete; 
                },
                error => {
                    this.token = "";
                    console.log(error);
                    observer.next("not ready");
                    observer.complete; 
                }
            );
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