import { Injectable } from '@angular/core';

@Injectable()
export class LdapService{
    private dn: {
            '\u0022': '\\"', // "
            '\u0023': '\\#', // #
            '\u002b': '\\+', // +
            '\u002c': '\\,', // ,
            '\u003b': '\\;', // ;
            '\u003c': '\\<', // <
            '\u003d': '\\=', // =
            '\u003e': '\\>', // >
            '\u005c': '\\\\' // \
    }

    public cn(value:string): string {
        let res = /[Cc][Nn]=(.*?),/gi.exec(value);
        return res? res[1]: "";
    }

    public escape(value:string){
        return value.replace(/(\u0022|\u0023|\u002b|\u002c|\u003b|\u003c|\u003d|\u003e|\u005c)/gm, function doReplace(str) {return this.dn[str];});
    }

}