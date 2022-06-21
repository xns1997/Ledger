function throttle(cd,time=300){
    var t = null;
    return function(){
        if(t) return;
        t = setTimeout(() => {
            cd.call(this);
            t = null;
        }, time);
    }
}

module.exports = {throttle};