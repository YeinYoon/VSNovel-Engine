exports.getTimestamp = ()=>{
    function pad(n) {return n<10 ? "0"+n : n}
    var d = new Date();
    return d.getFullYear()+"-"+
    pad(d.getMonth()+1)+"-"+
    pad(d.getDate())+" "+
    pad(d.getHours())+":"+
    pad(d.getMinutes())+":"+
    pad(d.getSeconds())
}