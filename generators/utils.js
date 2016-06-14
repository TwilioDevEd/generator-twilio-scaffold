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

String.prototype.toTitle = function()
{
    return this.split(' ').map(word => word.trim().capFirst()).join(' ');
}

String.prototype.toSlug = function()
{
   return this
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
}

String.prototype.capFirst = function()
{
  return this.charAt(0).toUpperCase() + this.slice(1);
}
