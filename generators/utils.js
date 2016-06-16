/** Hack the Dom **/
Object.prototype.toArray = function(){
    var result = new Array();
    for(i in this)
    {
        if(typeof this[i] != "function")
          result.push(this[i]);
    }
    return result;
}

String.prototype.toSlug = function()
{
   return this
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
}

String.prototype.minimize = function(){
     return this
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace('[-|_]', '')
            ;
}

String.prototype.capFirst = function()
{
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.unCapFirst = function()
{
  return this.charAt(0).toLowerCase() + this.slice(1);
}
