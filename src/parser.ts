var expressions = require("angular-expressions");

expressions.filters.lower = function (input) {
    // This condition should be used to make sure that if your input is
    // undefined, your output will be undefined as well and will not
    // throw an error
    if (!input) return input;
    return input.toLowerCase();
};

export function staplerParser(tag: string){
    if (!tag) return;
    const sanitizedTag = tag.replace(/^\.$/, 'this')
    .replace(/^\.$/, "this")
    .replace(/(’|‘)/g, "'")
    .replace(/(“|”)/g, '"');

    const expr = expressions.compile(sanitizedTag);

    return {
        get(scope: any, context: any){
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;

            for (let i = 0, len = num+1; i< len; i++){
                obj = {...obj, ...scopeList[i]};
            }

            return expr(scope,obj)
        }
    }
}