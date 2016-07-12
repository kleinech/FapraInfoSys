let dn: {
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

export function cn(value:string): string {
    let res = /[CcSs][Nn]=(.*?),/gi.exec(value);
    return res? res[1]: "";
}

export function escape(value:string): string{
    return value.replace(/(\u0022|\u0023|\u002b|\u002c|\u003b|\u003c|\u003d|\u003e|\u005c)/gm, function doReplace(str) {return dn[str];});
}