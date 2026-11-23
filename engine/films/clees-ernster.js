/* clees-ernster.js · Launch-Film Clees & Ernster (aus lu-launch.js, Skill launch-films-luxemburg).
   Basis: Launch-Film für luxemburgische Betriebe. EINE Filmdatei, alle Sprachen.
   Texte liegen in engine/texts/<film>.json (ein Block pro Sprache), die Sprache kommt aus ?l=lb|fr|de|pt|en
   (export.mjs --lang xx setzt das) oder aus brand.json "lang". Fehlt ein Text, steht sichtbar ⟦schlüssel⟧ im Bild.
   Dramaturgie (Muster "Ein Problem, eine Lösung, ein Schritt" aus der Bibliothek):
   HOOK (Frame 1 lesbar) -> echtes Foto/Screenshot -> 3 Belege -> Angebot -> Endkarte: Gemeinden klicken im Takt, dann Marke + Button + Telefon.
   Kopieren nach engine/films/<name>.js, Texte nach engine/texts/<name>.json, Foto nach engine/shots/hero.jpg. Timeline-Form behalten. */
const BR=window.BRAND||{},QS=new URLSearchParams(location.search),LANG=(QS.get('l')||BR.lang||'lb').toLowerCase();
const FNAME=(QS.get('f')||'clees-ernster').replace(/[^a-z0-9_-]/gi,'');
let TX={};const L=k=>{const v=(TX[LANG]||{})[k];return v==null||v===''?'⟦'+k+'⟧':v;};
const ACC=BR.accent||'#2F6BFF',INK=BR.ink||'#fff',BG=BR.bg||'#0b0d12';
const T={hook:0,photo:2.3,proof:6.2,offer:10.4,end:12.6},STEP=.55,EV=[];

/* Text, der sich selbst auf die Breite einpasst (FR/DE/PT laufen länger als LB/EN) */
function fit(x,s,X,Y,size,maxW,o={}){const w0=o.w||600;x.save();if('letterSpacing'in x)x.letterSpacing=(o.ls||0)+'px';x.font=`${w0} ${size}px ${FONT}`;const m=x.measureText(s).width;x.restore();
  const sz=m>maxW?Math.floor(size*maxW/m):size;txt(x,s,X,Y,{...o,f:`${w0} ${sz}px ${FONT}`});return sz;}
/* große Zeile: würde sie um mehr als 20 % schrumpfen, bricht sie auf zwei Zeilen um. Gibt die Höhe zurück. */
function big(x,s,X,Y,size,maxW,o={}){x.save();x.font=`${o.w||600} ${size}px ${FONT}`;const m=x.measureText(s).width,Lw=m>maxW*1.2?wrap(x,s,maxW):[s];x.restore();
  const ls=Lw.length>2?[Lw[0],Lw.slice(1).join(' ')]:Lw;let sz=size;ls.forEach((l,i)=>{sz=Math.min(sz,fit(x,l,X,Y+i*size*1.1,size,maxW,o));});return{h:ls.length*size*1.1,sz};}

/* Beweisbild: echtes Foto (shots/hero.jpg) – sonst das C&E-System als Methode statt Zahlen:
   Werbung -> Filter -> Termin, Anfragen fließen als Punkte, nach dem Filter kommen nur noch wenige durch. */
function hero(x,W,H,t){if(IMG.hero){const z=lerp(1.04,1.14,eio(seg(t,T.photo,T.end)));x.save();x.translate(W/2,H/2);x.scale(z,z);cover(x,IMG.hero,-W/2,-H/2,W,H);x.restore();
    const g=x.createLinearGradient(0,H*.35,0,H);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.75)');x.fillStyle=g;x.fillRect(0,0,W,H);return;}
  glowBg(x,W,H,t);system(x,W,H,t);}
function system(x,W,H,t){const s=VERT?230:240,P=VERT?[[W/2,H*.22],[W/2,H*.37],[W/2,H*.52]]:[[W*.24,H*.44],[W*.5,H*.44],[W*.76,H*.44]];
  const t0=T.photo+.15,ap=i=>t0+i*.55;
  // Verbindungslinien schnappen auf (Akzentlinie = C&E-Signatur), dann fließen Anfragen
  for(let i=0;i<2;i++){const [a,b]=[P[i],P[i+1]],u=eo(seg(t,ap(i)+.25,ap(i+1)+.1));if(u<=0)continue;
    const ax=VERT?a[0]:a[0]+s/2,ay=VERT?a[1]+s/2:a[1],bx=VERT?b[0]:b[0]-s/2,by=VERT?b[1]-s/2:b[1];
    x.save();x.strokeStyle=ACC;x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(ax,ay);x.lineTo(lerp(ax,bx,u),lerp(ay,by,u));x.stroke();
    if(u>=1){const n=i===0?6:2,sp=i===0?.9:.45;for(let k=0;k<n;k++){const f=((t-ap(i+1))*sp+k/n)%1;if(f<0)continue;
      x.fillStyle=i===0?'#ffffff':ACC;x.globalAlpha=Math.sin(f*Math.PI);x.beginPath();x.arc(lerp(ax,bx,f),lerp(ay,by,f),i===0?7:10,0,TAU);x.fill();}}x.restore();}
  ['d1','d2','d3'].forEach((k,i)=>{const u=seg(t,ap(i),ap(i)+.35);if(u<=0)return;const [cx,cy]=P[i],z=eb(u,1.2);x.save();x.translate(cx,cy);x.scale(z,z);
    x.fillStyle='rgba(13,20,38,.92)';x.strokeStyle=i===2?ACC:'rgba(255,255,255,.18)';x.lineWidth=i===2?3:1.5;rr(x,-s/2,-s/2,s,s,28);x.fill();x.stroke();
    x.strokeStyle=ACC;x.fillStyle=ACC;x.lineWidth=5;x.lineJoin='round';x.lineCap='round';const r=s*.2,iy=-s*.1;
    if(i===0){rr(x,-r*1.2,iy-r*.8,r*2.4,r*1.6,10);x.stroke();x.beginPath();x.moveTo(-r*.3,iy-r*.45);x.lineTo(r*.45,iy);x.lineTo(-r*.3,iy+r*.45);x.closePath();x.fill();}
    if(i===1){x.beginPath();x.moveTo(-r*1.2,iy-r*.8);x.lineTo(r*1.2,iy-r*.8);x.lineTo(r*.25,iy+r*.15);x.lineTo(r*.25,iy+r*.85);x.lineTo(-r*.25,iy+r*.6);x.lineTo(-r*.25,iy+r*.15);x.closePath();x.stroke();}
    if(i===2){rr(x,-r*1.1,iy-r*.9,r*2.2,r*1.9,10);x.stroke();x.beginPath();x.moveTo(-r*1.1,iy-r*.35);x.lineTo(r*1.1,iy-r*.35);x.stroke();
      const c=eo(seg(t,ap(2)+.5,ap(2)+.8));if(c>0){x.beginPath();x.moveTo(-r*.45,iy+r*.25);x.lineTo(lerp(-r*.45,-r*.1,Math.min(1,c*2)),lerp(iy+r*.25,iy+r*.6,Math.min(1,c*2)));if(c>.5)x.lineTo(lerp(-r*.1,r*.55,(c-.5)*2),lerp(iy+r*.6,iy-r*.05,(c-.5)*2));x.stroke();}}
    fit(x,L(k),0,s*.32,VERT?32:34,s-24,{w:600,c:'#fff',al:'center'});x.restore();});}

function proofCard(x,X,Y,w,s,u){if(u<=0)return;const h=VERT?124:104,dx=(1-eb(clamp(u),1.4))*-80;x.save();x.globalAlpha*=clamp(u*2);x.translate(dx,0);
  x.save();x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=30;x.shadowOffsetY=10;x.fillStyle='rgba(255,255,255,.96)';rr(x,X,Y,w,h,22);x.fill();x.restore();
  x.fillStyle=ACC;x.beginPath();x.arc(X+h/2,Y+h/2,h*.26,0,TAU);x.fill();x.strokeStyle='#fff';x.lineWidth=6;x.lineCap='round';x.beginPath();
  x.moveTo(X+h/2-h*.11,Y+h/2);x.lineTo(X+h/2-h*.02,Y+h/2+h*.09);x.lineTo(X+h/2+h*.13,Y+h/2-h*.1);x.stroke();
  fit(x,s,X+h+6,Y+h/2+(VERT?15:13),VERT?44:38,w-h-36,{w:600,c:'#111'});x.restore();}

const film_=film({dur:16.8,events:EV,
 load:[loadImg('hero','shots/hero.jpg'),BR.logo?loadImg('logo',BR.logo):null,
   fetch('texts/'+FNAME+'.json',{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({})).then(j=>{TX=j||{};
     const n=(L('items')instanceof Array?L('items'):[]).length||1;   // Klicks auf der Endkarte passen sich der Zahl der Gemeinden an
     EV.push({t:T.photo,s:'key_2',v:.25},{t:T.proof,s:'key_1',v:.3},{t:T.proof+.8,s:'key_1',v:.3},{t:T.proof+1.6,s:'key_1',v:.3},{t:T.offer,s:'click_send',v:.4});
     for(let i=0;i<n;i++)EV.push({t:T.end+i*STEP,s:'key_1',v:.3});EV.push({t:T.end+n*STEP,s:'key_2',v:.35});})],
 draw(x,t){const W=FW,H=FH,mw=W*(VERT?.86:.8);x.fillStyle=BG;x.fillRect(0,0,W,H);
  // 1 HOOK: Frame 1 ist das Vorschaubild. Zwei kurze Zeilen, zweite in Akzentfarbe.
  if(t<T.photo+.3){glowBg(x,W,H,t);const a=1-seg(t,T.photo-.2,T.photo+.3),y=H*(VERT?.38:.42),s=VERT?92:104;
    fit(x,L('hook1'),W/2,y,s,mw,{c:INK,al:'center',ls:-2,a});big(x,L('hook2'),W/2,y+s*1.18,s,mw,{c:ACC,al:'center',ls:-2,a:a*eo(seg(t,.45,.8))});}
  // 2 ECHTES BILD + Bildunterschrift (wer, wo) – Text nie über dem Motiv, unten im Verlauf
  if(t>=T.photo&&t<T.offer+.3){x.save();x.globalAlpha=eo(seg(t,T.photo,T.photo+.4))*(1-seg(t,T.offer,T.offer+.3));hero(x,W,H,t);
    if(t<T.proof+.2)fit(x,L('caption'),VERT?W*.07:W*.06,VERT?H*.635:H*.86,VERT?50:54,mw,{c:'#fff',a:eo(seg(t,T.photo+.5,T.photo+.9))*(1-seg(t,T.proof-.2,T.proof+.2))});
    // 3 DREI BELEGE: abdunkeln, Karten kommen im Takt der Klicks
    if(t>=T.proof){x.fillStyle=`rgba(0,0,0,${(IMG.hero?.5:.75)*eo(seg(t,T.proof,T.proof+.4))})`;x.fillRect(0,0,W,H);
      const X=VERT?W*.07:W*.07,w=VERT?W*.86:W*.5,Y0=VERT?H*.2:H*.24,gap=VERT?160:136;
      ['p1','p2','p3'].forEach((k,i)=>proofCard(x,X,Y0+i*gap,w,L(k),seg(t,T.proof+i*.8,T.proof+i*.8+.45)));}
    x.restore();}
  // 4 ANGEBOT: ein Satz, Akzentstrich wächst unter dem Satz
  if(t>=T.offer&&t<T.end){glowBg(x,W,H,t);const a=eo(seg(t,T.offer+.1,T.offer+.5))*(1-seg(t,T.end-.3,T.end)),y=H*(VERT?.4:.48);
    const fs=VERT?84:96,r=big(x,L('offer'),W/2,y,fs,mw,{c:INK,al:'center',ls:-2,a}),sz=r.sz,yb=y+r.h-fs*1.1+sz*.32;
    x.save();x.font=`600 ${sz}px ${FONT}`;const lw=Math.min(mw,x.measureText(L('offer')).width/(r.h>fs*1.2?1.8:1));x.restore();
    const u=eio(seg(t,T.offer+.5,T.offer+1.1));x.save();x.globalAlpha=a;x.strokeStyle=ACC;x.lineWidth=VERT?12:14;x.lineCap='round';x.beginPath();x.moveTo(W/2-lw/2,yb);x.lineTo(W/2-lw/2+lw*u,yb);x.stroke();x.restore();
    if(L('offer_sub')!=='⟦offer_sub⟧')fit(x,L('offer_sub'),W/2,yb+fs*.9,VERT?40:42,mw,{w:500,c:INK,al:'center',a:a*.7});}
  // 5 ENDKARTE: "Mir sinn do an" -> Gemeinden klicken -> Marke, Button, Telefon
  if(t>=T.end){x.fillStyle='#000';x.fillRect(0,0,W,H);const it=L('items');
    endCard(x,W,H,t,T.end,{lead:L('lead'),items:it instanceof Array?it:[String(it)],brand:BR.name||'⟦brand.name⟧',cta:L('cta'),sub:L('sub'),accent:ACC,ink:INK,step:STEP,
      post:IMG.logo?(x,W,H)=>{const s=Math.min(160/IMG.logo.height,420/IMG.logo.width);x.drawImage(IMG.logo,W/2-IMG.logo.width*s/2,H/2-230-IMG.logo.height*s/2,IMG.logo.width*s,IMG.logo.height*s);}:null});}
  grain(x,W,H,t,.035);}});
