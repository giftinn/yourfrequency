const drag=document.getElementById("drag");
const needle=document.getElementById("needle");
const display=document.getElementById("display");
const audio=document.getElementById("audio");
const noise=document.getElementById("noise");
const lamp=document.getElementById("lamp");

let percent=0;
let dragging=false;
let currentStation=null;

const stations=[
{
f:88.7,
html:`
<div class="songCard">
<img class="cover" src="src/pict.jpg">
<div class="songInfo">
<div>Mystery of Love</div>
<div style="font-size:12px;opacity:.7;margin-bottom:10px">Sufjan Stevens</div>

<div class="player">
<div class="topRow">
<div class="playIcon" id="playBtn" onclick="togglePlay()">▶</div>
<div class="progressWrap" onclick="seek(event)">
<div class="progressBar" id="progressBar"></div>
</div>
</div>
<div class="timeRow">
<span id="current">0:00</span>
<span id="duration">0:00</span>
</div>
</div>

</div>
</div>
`
},

{
f:95.5,
html:`

<!-- FILM STRIP -->
<div style="position:absolute;top:5px;width:100%;overflow:hidden;">
<div class="filmTrack">

<img src="src/1.jpg" class="filmPic">
<img src="src/2.jpg" class="filmPic">
<img src="src/3.jpg" class="filmPic">
<img src="src/4.jpg" class="filmPic">
<img src="src/5.jpg" class="filmPic">
<img src="src/pict.jpg" class="filmPic">

<img src="src/1.jpg" class="filmPic">
<img src="src/2.jpg" class="filmPic">
<img src="src/3.jpg" class="filmPic">
<img src="src/4.jpg" class="filmPic">
<img src="src/5.jpg" class="filmPic">
<img src="src/pict.jpg" class="filmPic">

</div>
</div>

<!-- CONTENT -->
<div style="width:100%;display:flex;flex-direction:column;align-items:center;margin-top:55px;">

<div style="font-size:16px;font-weight:500;">Voice Letter</div>
<div style="font-size:12px;opacity:.65;margin-bottom:6px">private recording</div>

<div class="player" style="width:100%">

<div class="topRow">
<div class="playIcon" onclick="playVoice('src/audio.mp3',this)">▶</div>

<div class="progressWrap" onclick="seek(event)">
<div class="progressBar" id="progressBar"></div>
</div>
</div>

<div class="timeRow">
<span id="current">0:00</span>
<span id="duration">0:00</span>
</div>

</div>

<div class="waveWrap">
<div class="waveBar"></div>
<div class="waveBar"></div>
<div class="waveBar"></div>
<div class="waveBar"></div>
<div class="waveBar"></div>
</div>

</div>
`
},

{
f:99.3,
html:`

<div class="letterStation">

<div class="letterScroll">

<div class="letterContent">

<span class="signal">TRANSMISSION START</span><br><br>

TRANSMISSION START

Sometimes I wonder if you notice how softly you exist inside my universe. Sometimes I wonder if you notice how softly you exist inside my universe.
Sometimes I wonder if you notice how softly you exist inside my universe.

Sometimes I wonder if you notice how softly you exist inside my universe. Not loud. Not chaotic.

But like late night radio waves that stay playing even when the world sleeps.

END SIGNAL
<span class="signal">END SIGNAL</span>

</div>
</div>
</div>
<style>

/* FULL CARD */
.letterStation{
width:100%;
height:170px;
position:relative;
border-radius:16px;
overflow:hidden;
background:
linear-gradient(#0a0a0a,#000);
box-shadow:
inset 0 0 40px rgba(255,200,120,.15),
0 0 25px rgba(0,0,0,.8);
}

/* SCROLL */
.letterScroll{
height:100%;
overflow:auto;
padding:18px 18px 20px;
scrollbar-width:none;
}
.letterScroll::-webkit-scrollbar{
display:none;
}

/* TEXT */
.letterContent{
font-size:13px;
line-height:1.8;
white-space:pre-line;
text-align:justify;
}

/* SIGNAL LABEL */
.signal{
display:block;
text-align:center;
font-size:9px;
letter-spacing:3px;
opacity:.45;
margin:2px 0;
}

/* FULL CARD SCANLINES */
.letterStation::before{
content:"";
position:absolute;
inset:0;
background:
repeating-linear-gradient(
to bottom,
rgba(255,255,255,.035),
rgba(255,255,255,.035) 1px,
transparent 1px,
transparent 3px
);
pointer-events:none;
}

/* GLOW ATMOSPHERE */
.letterStation::after{
content:"";
position:absolute;
inset:0;
background:
radial-gradient(circle at 50% 120%, rgba(255,200,120,.25), transparent 70%);
pointer-events:none;
}

</style>
`
},

{
f: 103.5,
html: `

<div class="loveStation">

<style>
.loveStation{
width:100%;
height:170px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background:
repeating-linear-gradient(
0deg,
rgba(255,180,80,.05),
rgba(255,180,80,.05) 2px,
transparent 2px,
transparent 4px
),
linear-gradient(#0a0a0a,#000);
border-radius:18px;
box-shadow: inset 0 0 30px rgba(255,170,70,.15);
font-family:Inter,sans-serif;
}

.loveTitle{
font-size:13px;
letter-spacing:3px;
color:#ffbf69;
margin-bottom:12px;
text-shadow:0 0 8px rgba(255,170,70,.8);
}

.meterWrap{
width:100%;
display:flex;
justify-content:center;
margin-bottom:8px;
}

.meterBars{
display:flex;
gap:4px;
justify-content:center;
align-items:end;
height:30px;
margin:14px 0;
}

.meterBars span{
display:block;
width:6px;
height:28px;
background:linear-gradient(to top,#5a3b14,#ffd27a);
border-radius:2px;
transform-origin:bottom;
transition:.18s;
box-shadow:0 0 6px rgba(255,190,90,.4);
}

.meterBars span:nth-child(2){animation-delay:.1s}
.meterBars span:nth-child(3){animation-delay:.2s}
.meterBars span:nth-child(4){animation-delay:.3s}
.meterBars span:nth-child(5){animation-delay:.4s}
.meterBars span:nth-child(6){animation-delay:.5s}
.meterBars span:nth-child(7){animation-delay:.6s}
.meterBars span:nth-child(8){animation-delay:.7s}
.meterBars span:nth-child(9){animation-delay:.8s}
.meterBars span:nth-child(10){animation-delay:.9s}

@keyframes equalize{
0%,100%{height:15%}
50%{height:100%}
}

.lovePercent{
font-size:24px;
color:#ffd27a;
text-shadow:0 0 14px rgba(255,170,70,.9);
margin-bottom:4px;
}

.loveStatus{
font-size:11px;
letter-spacing:1px;
color:#ffbf69;
opacity:.85;
margin-bottom:6px;
}

.loveHint{
font-size:9px;
letter-spacing:2px;
opacity:.4;
color:#ffbf69;
}
</style>

<div class="loveTitle">LOVE SIGNAL</div>

<div class="meterWrap">
<div class="meterBars">
<span></span><span></span><span></span><span></span><span></span>
<span></span><span></span><span></span><span></span><span></span>
</div>
</div>

<div class="lovePercent" id="lovePercent">72%</div>
<div class="loveStatus" id="loveStatus">Thinking of you</div>
<div class="loveHint">HOLD TO BOOST LOVE</div>

</div>

`
},

];

function updatePosition(clientX){
 const rect=drag.getBoundingClientRect();
 percent=(clientX-rect.left)/rect.width;
 percent=Math.max(0,Math.min(1,percent));
 needle.style.left=(percent*100)+"%";
 checkStation();
}

/* mouse support */
drag.addEventListener("mousedown",()=>dragging=true);
window.addEventListener("mouseup",()=>dragging=false);
window.addEventListener("mousemove",e=>{
 if(!dragging) return;
 updatePosition(e.clientX);
});

/* touch support (HP) */
drag.addEventListener("touchstart",()=>dragging=true);
window.addEventListener("touchend",()=>dragging=false);
window.addEventListener("touchmove",e=>{
 if(!dragging) return;
 updatePosition(e.touches[0].clientX);
});

function checkStation(){
 const freq=(88+percent*20);
 let found=null;

 stations.forEach(s=>{
  if(Math.abs(freq-s.f)<0.25) found=s;
 });

 if(found){
  if(currentStation!==found){
   lamp.classList.add("on");
   noise.pause();
   display.innerHTML=found.html;
   currentStation=found;
  }
 }
 
 else{
  if(currentStation!==null){
   lamp.classList.remove("on");
   audio.pause();
   noise.play();
   currentStation=null;
  }
  display.innerHTML=`${freq.toFixed(1)} FM<div class="staticLayer"></div>`;
 }
}


function togglePlay(){
const btn=document.getElementById("playBtn");
if(audio.paused){
audio.src="src/song.mp3";
audio.play();
btn.textContent="⏸";
}else{
audio.pause();
btn.textContent="▶";
}
}

function playVoice(src,el){
if(audio.src.includes(src)&&!audio.paused){
audio.pause();
el.textContent="▶";
}else{
audio.src=src;
audio.play();
document.querySelectorAll(".playIcon").forEach(i=>i.textContent="▶");
el.textContent="⏸";
}
}

audio.onloadedmetadata=()=>{
const d=document.getElementById("duration");
if(d) d.textContent=format(audio.duration);
};

audio.ontimeupdate=()=>{
const bar=document.getElementById("progressBar");
const cur=document.getElementById("current");
if(bar) bar.style.width=(audio.currentTime/audio.duration*100)+"%";
if(cur) cur.textContent=format(audio.currentTime);
};

function format(sec){
let m=Math.floor(sec/60);
let s=Math.floor(sec%60).toString().padStart(2,"0");
return m+":"+s;
}

function seek(e){
const rect=e.currentTarget.getBoundingClientRect();
const percent=(e.clientX-rect.left)/rect.width;
audio.currentTime=percent*audio.duration;
}

const bars=document.querySelectorAll(".bar");
const percentText=document.getElementById("lovePercent");
const statusText=document.getElementById("loveStatus");

const spikeSound=new Audio("https://cdn.freesound.org/previews/250/250629_4486188-lq.mp3");

let love = 72;
let holding = false;

function isLoveTarget(e){
 return e.target.closest(".loveStation");
}

/* mouse */
document.addEventListener("mousedown",e=>{
 if(isLoveTarget(e)) holding=true;
});
document.addEventListener("mouseup",()=>holding=false);

/* touch */
document.addEventListener("touchstart",e=>{
 if(isLoveTarget(e)) holding=true;
},{passive:true});

document.addEventListener("touchend",()=>holding=false);
document.addEventListener("touchcancel",()=>holding=false);

/* MAIN ENGINE */
setInterval(()=>{
const percentEl=document.getElementById("lovePercent");
const statusEl=document.getElementById("loveStatus");
const bars=document.querySelectorAll(".meterBars span");

if(!percentEl) return;

/* logic */
if(holding){
love+=1.4;
}else{
love-=0.35;
}

/* clamp */
love=Math.max(0,Math.min(100,love));

/* text */
percentEl.textContent=Math.floor(love)+"%";

/* status */
if(love >= 100){
statusEl.textContent = "Maximum Love Reached ❤️";

}else if(holding){
statusEl.textContent = "BOOSTING SIGNAL";

}else{
const mood=[
"Thinking of you",
"Signal stable",
"Heart synced",
"Connected",
"Emotion detected"
];
statusEl.textContent=mood[Math.floor(Math.random()*mood.length)];
}

/* bars animation */
bars.forEach(bar=>{
const level=Math.random()*100;
if(level<love){
bar.style.opacity="1";
bar.style.transform=`scaleY(${0.4+Math.random()*1.6})`;
}else{
bar.style.opacity=".15";
bar.style.transform="scaleY(.3)";
}
});

},250);
