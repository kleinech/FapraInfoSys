import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userfilter'
})
export class UserFilter implements PipeTransform {
    transform(users: Array<Object>, args: any = []){
        return users.filter((user) => user["shortname"].indexOf(args) > -1);
    }
}