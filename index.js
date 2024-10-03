let btn = document.getElementById('botton-new-timer');
let btnStart = document.getElementById('start');
let newTimer = document.getElementById('window');
let hours= document.getElementById('input-hours');
let minuts= document.getElementById('input-minuts');
let secounds= document.getElementById('input-secounds');
let hoursText = document.getElementById('hours');
let minutsText = document.getElementById('minuts');
let secoundsText = document.getElementById('secounds');
var audio = new Audio('./time.mp3');

btn.onclick=()=>{
    newTimer.style.display='block'
}
let hoursValue;
btnStart.onclick=()=>{
    
    console.log(hours.value,minuts.value,secounds.value)
    newTimer.style.display='none';
    Atimer(hours.value,minuts.value,secounds.value);
}
function   Atimer(h=0,m=0,s=0){
    if (h<10){
        hoursText.innerText = '0'+h;
    }else{
        hoursText.innerText = h;
    }
    if (m<10){
        minutsText.innerText = '0'+m;
    }else{
        minutsText.innerText = m;
    }
    if (s<10){
        secoundsText.innerText = '0'+s;
    }else{
        secoundsText.innerText = s;
    }
    let t = setInterval(()=>{
        s--;
        if(s==-1){
            m--;
            s=59;
        }
        if(m==-1){
            h--;
            m=59;
        }
        if(h==0 &&m==0&&s==0){
            clearInterval(t);
            audio.play()
        }
        if (h<10){
            hoursText.innerText = '0'+h;
        }else{
            hoursText.innerText = h;
        }
        if (m<10){
            minutsText.innerText = '0'+m;
        }else{
            minutsText.innerText = m;
        }
        if (s<10){
            secoundsText.innerText = '0'+s;
        }else{
            secoundsText.innerText = s;
        }
    },1000)
}
