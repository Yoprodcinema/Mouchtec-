const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let moving = !reduced.matches;
const motion = document.querySelector('#motion');
function setMotion(value) { moving = value; document.body.classList.toggle('paused', !moving); motion.textContent = `MOUVEMENT : ${moving ? 'ON' : 'OFF'}`; motion.setAttribute('aria-pressed', String(moving)); }
setMotion(moving);
motion.addEventListener('click', () => setMotion(!moving));
reduced.addEventListener('change', event => setMotion(!event.matches));
const hero = document.querySelector('.hero');
hero.addEventListener('pointermove', e => { if (!moving || e.pointerType === 'touch') return; const r=hero.getBoundingClientRect(); document.querySelector('.photo').style.transform=`translate(${(e.clientX-r.left-r.width/2)*-.018}px, ${(e.clientY-r.top-r.height/2)*-.018}px) scale(1.025)`; });
hero.addEventListener('pointerleave', () => document.querySelector('.photo').style.transform='');
const snow = document.querySelector('#snow'), snowContext=snow.getContext('2d');
let sw=0, sh=0, heroVisible=true, last=0;
const flakes=Array.from({length:65},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.3,s:Math.random()*.025+.008}));
function fitSnow(){const r=hero.getBoundingClientRect();sw=r.width;sh=r.height;const d=Math.min(devicePixelRatio,2);snow.width=sw*d;snow.height=sh*d;snowContext.setTransform(d,0,0,d,0,0);}
new ResizeObserver(fitSnow).observe(hero);
new IntersectionObserver(entries=>heroVisible=entries[0].isIntersecting).observe(hero);
function animate(time){const dt=Math.min((time-last)/1000,.05);last=time;if(moving&&heroVisible&&!document.hidden){snowContext.clearRect(0,0,sw,sh);snowContext.fillStyle='#ffffff85';for(const f of flakes){f.y=(f.y+f.s*dt)%1;f.x=(f.x+.008*dt)%1;snowContext.beginPath();snowContext.arc(f.x*sw,f.y*sh,f.r,0,Math.PI*2);snowContext.fill();}}else snowContext.clearRect(0,0,sw,sh);requestAnimationFrame(animate);}requestAnimationFrame(animate);
const canvas=document.querySelector('#tracks'), ctx=canvas.getContext('2d'), hint=document.querySelector('.terrain-hint'), status=document.querySelector('#trace-status');
let width=0,height=0,drawing=false,previous=null,segments=[];
function fitTracks(){const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const d=Math.min(devicePixelRatio,2);canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);redraw();}
function stroke(a,b){const dx=(b.x-a.x)*width,dy=(b.y-a.y)*height,len=Math.hypot(dx,dy);if(len<.1)return;const nx=-dy/len*5,ny=dx/len*5;ctx.lineCap='round';ctx.lineWidth=2;ctx.shadowColor='#d6fd55';ctx.shadowBlur=7;ctx.strokeStyle='#d6fd55';for(const side of [-1,1]){ctx.beginPath();ctx.moveTo(a.x*width+nx*side,a.y*height+ny*side);ctx.lineTo(b.x*width+nx*side,b.y*height+ny*side);ctx.stroke();}ctx.shadowBlur=0;}
function redraw(){ctx.clearRect(0,0,width,height);segments.forEach(s=>stroke(s[0],s[1]));}
function point(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height};}
canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;drawing=true;previous=point(e);canvas.setPointerCapture(e.pointerId);hint.style.opacity=0;status.textContent='VOTRE LIGNE, VOTRE STYLE';});
canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e);segments.push([previous,p]);stroke(previous,p);previous=p;});
for(const name of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(name,()=>{drawing=false;previous=null;});
document.querySelector('#clear').addEventListener('click',()=>{segments=[];redraw();hint.style.opacity=1;status.textContent='À VOTRE TOUR';});
document.querySelector('#demo').addEventListener('click',()=>{segments=[];for(let i=1;i<=160;i++){const p=t=>({x:.5+Math.sin(t*14)*.2,y:.1+t*.7});segments.push([p((i-1)/160),p(i/160)]);}redraw();hint.style.opacity=0;status.textContent='À VOUS D’INVENTER LA SUITE';});
new ResizeObserver(fitTracks).observe(canvas);
const control=document.querySelector('#turn-control');
function turn(){const v=Number(control.value);document.querySelector('#rider-pose').style.transform=`translateX(${v*.3}px) rotate(${v*.13}deg) skewX(${v*.06}deg)`;document.querySelector('#turn-label').textContent=Math.abs(v)<10?'EN TRANSITION':v<0?'VIRAGE À GAUCHE':'VIRAGE À DROITE';}
control.addEventListener('input',turn);turn();
