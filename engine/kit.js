/* kit.js · tiny canvas film engine for launch films.
   A film is ONE pure function draw(x, t) that paints the frame at time t (seconds).
   Same function previews live in the browser (with a scrubber) and exports 4K frame by frame (export.mjs).
   Logical canvas: 1920x1080 (16:9) or 1080x1920 (9:16, add ?v=1). Export draws at 2x = 4K. */
const P=new URLSearchParams(location.search);
const VERT=P.get('v')==='1',FW=VERT?1080:1920,FH=VERT?1920:1080;
const TAU=Math.PI*2,clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v,seg=(t,a,b)=>clamp((t-a)/(b-a)),lerp=(a,b,u)=>a+(b-a)*u;
const eo=u=>1-Math.pow(1-u,3),eio=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2,eb=(u,s=1.6)=>1+(s+1)*Math.pow(u-1,3)+s*Math.pow(u-1,2);
const hash=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s);};
const FONT='Geist, system-ui, sans-serif',MONO='"Geist Mono", ui-monospace, monospace';

/* ---------- drawing helpers ---------- */
function rr(x,X,Y,w,h,r){x.beginPath();x.roundRect(X,Y,w,h,r);}
function txt(x,s,X,Y,o={}){x.save();x.globalAlpha*=o.a==null?1:o.a;x.font=o.f||`500 32px ${FONT}`;x.fillStyle=o.c||'#fff';x.textAlign=o.al||'left';
  if('letterSpacing'in x)x.letterSpacing=(o.ls||0)+'px';x.fillText(s,X,Y);x.restore();}
function wrap(x,s,maxW){const ls=x.letterSpacing;if('letterSpacing'in x)x.letterSpacing='0px';const w=String(s).split(' '),L=[];let cur='';
  w.forEach(v=>{const t=cur?cur+' '+v:v;if(x.measureText(t).width>maxW&&cur){L.push(cur);cur=v;}else cur=t;});if(cur)L.push(cur);if('letterSpacing'in x)x.letterSpacing=ls;return L;}
const IMG={};function loadImg(k,src){return new Promise(r=>{const i=new Image();i.onload=()=>{IMG[k]=i;r(i);};i.onerror=()=>r(null);i.src=src;});}
function cover(x,im,X,Y,W,H){if(!im)return;const s=Math.max(W/im.width,H/im.height),w=im.width*s,h=im.height*s;x.drawImage(im,X+(W-w)/2,Y+(H-h)/2,w,h);}
function spoken(s,u){const w=s.split(' ');return w.slice(0,Math.ceil(clamp(u)*w.length)).join(' ');}   // words appear as you talk

/* film grain: a few cached noise tiles, cycled */
const _GR=[];function grain(x,W,H,t,a=.05){if(!_GR.length)for(let k=0;k<5;k++){const c=document.createElement('canvas');c.width=480;c.height=270;const g=c.getContext('2d'),d=g.createImageData(480,270);
  for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}g.putImageData(d,0,0);_GR.push(c);}
  x.save();x.globalAlpha=a;x.globalCompositeOperation='overlay';x.drawImage(_GR[Math.floor(t*24)%5],0,0,W,H);x.restore();}

/* soft gradient background (two glows on a dark base) */
function glowBg(x,W,H,t,o={}){const B=window.BRAND||{};x.fillStyle=o.base||B.bg||'#0b0d0c';x.fillRect(0,0,W,H);[[o.c1||B.glow1||'#1f6f5a',.55,.25],[o.c2||B.glow2||'#3b3bd6',.35,.75]].forEach(([c,a,px],i)=>{
  const cx=W*(px+.08*Math.sin(t*.3+i*2)),cy=H*(.4+.1*Math.cos(t*.25+i)),g=x.createRadialGradient(cx,cy,0,cx,cy,Math.max(W,H)*.6);g.addColorStop(0,c+Math.round(a*255).toString(16).padStart(2,'0'));g.addColorStop(1,c+'00');x.fillStyle=g;x.fillRect(0,0,W,H);});
  const v=x.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,Math.max(W,H)*.8);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=v;x.fillRect(0,0,W,H);}

/* ---------- components ---------- */
/* a browser window; content(x,X,Y,w,h) paints the page (a screenshot via cover(), or drawn UI) */
function browser(x,X,Y,w,h,o={}){x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=60;x.shadowOffsetY=20;x.fillStyle='#fff';rr(x,X,Y,w,h,14);x.fill();x.restore();
  x.save();rr(x,X,Y,w,h,14);x.clip();x.fillStyle='#f1f1ef';x.fillRect(X,Y,w,52);['#ff5f57','#febc2e','#28c840'].forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(X+24+i*20,Y+26,6.5,0,TAU);x.fill();});
  x.fillStyle='#fff';rr(x,X+120,Y+12,w-240,28,14);x.fill();txt(x,o.url||'yourproduct.com',X+w/2,Y+31,{f:`400 15px ${FONT}`,c:'#666',al:'center'});
  if(o.content){x.save();x.beginPath();x.rect(X,Y+52,w,h-52);x.clip();o.content(x,X,Y+52,w,h-52);x.restore();}x.restore();}

/* the "AI command" card that hangs from the top edge: listening -> confirm -> sent -> answer. Pass the moment's state. */
function commandCard(x,cx,w,t,s){const k=w/640,pad=24*k,fs=26*k,h0=96*k;x.save();
  const shell=(h,a)=>{const Y=-h*(1-eo(a));x.save();x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=40*k;x.shadowOffsetY=8*k;x.fillStyle='#0D0D0D';x.beginPath();x.moveTo(cx-w/2,Y-4);x.lineTo(cx+w/2,Y-4);x.lineTo(cx+w/2,Y+h-22*k);
    x.quadraticCurveTo(cx+w/2,Y+h,cx+w/2-22*k,Y+h);x.lineTo(cx-w/2+22*k,Y+h);x.quadraticCurveTo(cx-w/2,Y+h,cx-w/2,Y+h-22*k);x.closePath();x.fill();x.restore();return Y;};
  const badge=(X,Y)=>{x.fillStyle=s.accent||'#BFF549';rr(x,X-14*k,Y-14*k,28*k,28*k,8*k);x.fill();txt(x,(s.brand||'A')[0],X,Y+8*k,{f:`700 ${18*k}px ${FONT}`,c:'#000',al:'center'});};
  if(s.state==='listen'){x.font=`500 ${fs}px ${FONT}`;const L=wrap(x,s.text||'Hey! What can I help with?',w-pad*2-50*k).slice(-2),h=Math.max(h0,pad*2+L.length*fs*1.4),Y=shell(h,s.a);
    L.forEach((l,i)=>txt(x,l,cx-w/2+pad,Y+h/2-(L.length*fs*1.4)/2+fs*1.05+i*fs*1.4,{f:`500 ${fs}px ${FONT}`,c:s.text?'#fff':'rgba(255,255,255,.7)'}));badge(cx+w/2-pad-14*k,Y+h/2);
    const g=x.createLinearGradient(cx-w/2,0,cx+w/2,0),c=.3+.4*(.5+.5*Math.sin(t*1.3));g.addColorStop(0,'rgba(191,245,73,0)');g.addColorStop(c,(s.accent||'#BFF549'));g.addColorStop(1,'rgba(191,245,73,0)');x.fillStyle=g;x.globalAlpha=.8;x.fillRect(cx-w/2+20*k,Y+h-4*k,w-40*k,3*k);}
  if(s.state==='confirm'){x.font=`400 ${fs*.9}px ${FONT}`;const L=wrap(x,s.text,w-pad*2-28*k).slice(0,3),h=pad+50*k+L.length*fs*1.3+30*k+52*k+pad,Y=shell(h,s.a);
    badge(cx-w/2+pad+14*k,Y+pad+18*k);txt(x,'Send to '+(s.to||'Agent'),cx-w/2+pad+40*k,Y+pad+27*k,{f:`600 ${fs}px ${FONT}`});
    L.forEach((l,i)=>txt(x,l,cx-w/2+pad,Y+pad+80*k+i*fs*1.3,{f:`400 ${fs*.9}px ${FONT}`,c:'rgba(255,255,255,.85)'}));
    const by=Y+h-pad-44*k,sw=120*k;x.fillStyle=s.accent||'#BFF549';rr(x,cx+w/2-pad-sw,by,sw,44*k,8*k);x.fill();txt(x,'Send ↵',cx+w/2-pad-sw/2,by+29*k,{f:`600 ${fs*.85}px ${FONT}`,c:'#000',al:'center'});
    x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=1.5;rr(x,cx+w/2-pad-sw-130*k,by,118*k,44*k,8*k);x.stroke();txt(x,'Cancel',cx+w/2-pad-sw-71*k,by+29*k,{f:`500 ${fs*.85}px ${FONT}`,c:'rgba(255,255,255,.7)',al:'center'});
    if(s.cd!=null){x.fillStyle=s.accent||'#BFF549';x.fillRect(cx-w/2+pad,Y+h-6*k,(w-pad*2)*s.cd,3*k);}}
  if(s.state==='sent'){const Y=shell(h0,s.a);x.fillStyle=s.accent||'#BFF549';x.beginPath();x.arc(cx-w/2+pad+14*k,Y+h0/2,14*k,0,TAU);x.fill();
    txt(x,'✓',cx-w/2+pad+14*k,Y+h0/2+7*k,{f:`700 ${18*k}px ${FONT}`,c:'#000',al:'center'});txt(x,'Sent to '+(s.to||'Agent'),cx-w/2+pad+40*k,Y+h0/2+9*k,{f:`500 ${fs}px ${FONT}`});}
  if(s.state==='answer'){x.font=`400 ${fs*.9}px ${FONT}`;const L=[];String(s.text).split('\n').forEach(p=>wrap(x,p,w-pad*2).forEach(l=>L.push(l)));const h=pad+52*k+L.length*fs*1.3+pad,Y=shell(h,s.a);
    badge(cx-w/2+pad+14*k,Y+pad+18*k);txt(x,(s.to||'Agent')+' ↗',cx-w/2+pad+40*k,Y+pad+27*k,{f:`600 ${fs}px ${FONT}`});
    L.forEach((l,i)=>txt(x,l,cx-w/2+pad,Y+pad+82*k+i*fs*1.3,{f:`400 ${fs*.9}px ${FONT}`,c:'#fff'}));}
  x.restore();}

/* end card, "click, click, click": "<lead> <item 1>" -> "<item 2>" ... -> brand + button + subline, each a hard cut on a beat */
function endCard(x,W,H,t,t0,o){const items=o.items||['every app'],hits=items.map((_,i)=>t0+i*(o.step||.55)),tb=t0+items.length*(o.step||.55),S=VERT?1.15:1.25,ink=o.ink||'#fff';
  x.save();x.translate(W/2,H/2);x.scale(S,S);x.translate(-W/2,-H/2);
  if(t<tb){let i=0;hits.forEach((h,k)=>{if(t>=h)i=k;});const pu=1+.07*(1-eo(seg(t,hits[i]-.02,hits[i]+.14)));
    txt(x,o.lead||'Built for',W/2,H/2-40,{f:`400 76px ${FONT}`,c:ink,al:'center',ls:-2,a:eo(seg(t,t0-.3,t0))});x.save();x.translate(W/2,H/2+60);x.scale(pu,pu);txt(x,items[i],0,20,{f:`600 76px ${FONT}`,c:o.accent||'#BFF549',al:'center',ls:-2});x.restore();}
  else{if(o.post)o.post(x,W,H,t);const pu=1+.07*(1-eo(seg(t,tb-.02,tb+.14)));x.save();x.translate(W/2,H/2-50);x.scale(pu,pu);txt(x,o.brand||'Your product',0,30,{f:`700 110px ${FONT}`,c:ink,al:'center',ls:-3});x.restore();
    const bu=seg(t,tb+.5,tb+.85),ps=bu>0?eb(bu,1.8):0;if(ps>0){x.save();x.translate(W/2,H/2+110);x.scale(ps,ps);const bw=Math.max(380,(o.cta||'Try it free').length*18+120);
      x.fillStyle=ink;rr(x,-bw/2,-38,bw,76,38);x.fill();txt(x,o.cta||'Try it free',0,11,{f:`600 30px ${FONT}`,c:o.bg||'#000',al:'center'});x.restore();}
    if(o.sub)txt(x,o.sub,W/2,H/2+200,{f:`500 28px ${FONT}`,c:ink,al:'center',a:.6*eo(seg(t,tb+.8,tb+1.1))});}
  x.restore();return{hits,tb};}

/* vertical safe zones (Instagram/TikTok/Shorts): top 14% and bottom 35% are covered by the app. Press G in preview to show them. */
let SHOWSAFE=false;function safeZones(x,W,H){if(!SHOWSAFE||!VERT)return;x.save();x.fillStyle='rgba(255,43,58,.25)';x.fillRect(0,0,W,H*.14);x.fillRect(0,H*.65,W,H*.35);x.restore();}

/* ---------- film runner ---------- */
function film(def){const cv=document.getElementById('c');const SC=navigator.webdriver?2:1;cv.width=FW*SC;cv.height=FH*SC;const X=cv.getContext('2d');
  const paint=t=>{X.setTransform(SC,0,0,SC,0,0);def.draw(X,clamp(t,0,def.dur-1e-3));safeZones(X,FW,FH);};
  window.FILM={dur:def.dur,events:def.events||[],paint};
  document.fonts.load(`600 40px ${FONT}`).then(()=>Promise.all(def.load||[])).then(()=>{window.__ready=true;if(navigator.webdriver)return;
    const sl=document.getElementById('scrub'),pb=document.getElementById('play'),tm=document.getElementById('tm');let t=0,play=true,last=performance.now();sl.max=def.dur;
    pb.onclick=()=>{play=!play;pb.textContent=play?'Pause':'Play';};sl.oninput=()=>{t=+sl.value;play=false;pb.textContent='Play';};
    addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();pb.click();}if(e.key==='g')SHOWSAFE=!SHOWSAFE;if(e.key==='ArrowRight')t=Math.min(def.dur,t+1/30);if(e.key==='ArrowLeft')t=Math.max(0,t-1/30);});
    (function loop(now){if(play){t+=(now-last)/1000;if(t>=def.dur)t=0;}last=now;sl.value=t;tm.textContent=t.toFixed(2)+' / '+def.dur.toFixed(1)+'s';paint(t);requestAnimationFrame(loop);})(last);});}
