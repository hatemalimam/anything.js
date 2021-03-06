var doABarrelRoll = function(duration, clockwise){
    var currentDegrees = 0;
    var timePassed = 0;
    var time;
    if(clockwise == undefined){
        clockwise = true;
    }
    if(duration == undefined){
        duration = 5000;
    }
    
    console.log(clockwise);
    
    var animateTheBarrelRoll = function(){
        if(currentDegrees != 360 && clockwise || currentDegrees != -360 && !clockwise){
            requestAnimationFrame(animateTheBarrelRoll);
        }
        
        var now = new Date().getTime(),
        dt = now - (time || now);
        time = now;
        timePassed += dt;
        
        if(clockwise){
            currentDegrees =  (timePassed / duration) * 360;
            if(currentDegrees > 360){
                currentDegrees = 360;
            }
        }else{
            currentDegrees = (timePassed / duration) * -360;
            if(currentDegrees < -360){
                currentDegrees = -360;
            }
        }
        
        document.body.style.transform = "rotate(" + currentDegrees + "deg)";
    }
    animateTheBarrelRoll();
}

anything.prototype.doABarrelRoll = doABarrelRoll;
