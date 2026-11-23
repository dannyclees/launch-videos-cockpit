/* ce-launch.js · Launch-Film Clees & Ernster v2 (Skill launch-films-luxemburg).
   C&E-Reel-Stil v2: Blau #2F6BFF, Montserrat 800 + IBM Plex Mono, Papier-Platten und mattes Glas, Mono-Pills, gerader blauer Pinselstrich unter dem Schlüsselwort.
   Bewegung: schnell-direkt, harte Schnitte alle 1,3–2,9 s, Reveals mit power4/expo, keine Fades zwischen Szenen.
   Story (Muster 1 + 5): Hook "Däi Betrib: Premium." -> Schmerz "Deng Ufroen: Zoufall." -> Wende "Et geet och planbar."
   -> System in 3 Schritten (Reklamm, Filter, Nofaassen) -> Kalender füllt sich -> "Kampagnen, déi zünden." -> Endkarte.
   Texte: texts/ce-launch.json, Sprache über ?l=lb|de|fr (export.mjs --lang). Keine Zahlen/Ergebnisse – Methode als Beweis. */
const BR=window.BRAND||{},QS=new URLSearchParams(location.search),LANG=(QS.get('l')||BR.lang||'lb').toLowerCase();
let TX={};const L=k=>{const v=(TX[LANG]||{})[k];return v==null||v===''?'⟦'+k+'⟧':v;};
const ACC='#2F6BFF',ACC1='#5A86F5',ACC2='#1A44C2',INK='#0c0f16',HF='Montserrat, sans-serif',MF='"IBM Plex Mono", monospace';
const TS=VERT?1:1.1,CX=FW/2,CY=VERT?780:540;
const S={hook:0,pain:1.9,turn:4.5,s1:5.8,s2:8.7,s3:11.5,plan:14.3,claim:17.1,end:19.7},DUR=24.6,EV=[];
const INI=()=>String(L('adname')).split(/\s+/).map(w=>w[0]||'').join('').slice(0,2).toUpperCase(),ex=u=>u>=1?1:1-Math.pow(2,-10*u),e4=u=>1-Math.pow(1-clamp(u),4);

/* ---------- Typo ---------- */
function fnt(w,s,m){return `${w} ${s}px ${m?MF:HF}`;}
function meas(x,s,f,ls){x.save();x.font=f;if('letterSpacing'in x)x.letterSpacing=ls+'px';const m=x.measureText(s).width;x.restore();return m;}
/* Headline, passt sich der Breite an; gibt Größe und Breite zurück. al: 'center' | 'left' */
function HL(x,s,X,Y,size,maxW,o={}){const w=o.w||800,ls=o.ls??-size*.035;let sz=size,m=meas(x,s,fnt(w,sz),ls);if(m>maxW){sz=Math.floor(size*maxW/m);m=meas(x,s,fnt(w,sz),sz/size*ls);}
  txt(x,s,X,Y,{f:fnt(w,sz),c:o.c||'#fff',al:o.al||'center',ls:sz/size*ls,a:o.a});return{sz,w:m};}
/* Zeile steigt aus einer Maske (Reveal statt Fade) */
function rise(x,s,X,Y,size,maxW,u,o={}){if(u<=0)return null;x.save();const k=e4(u);x.beginPath();x.rect(0,Y-size*1.05,FW,size*1.45);x.clip();x.translate(0,(1-k)*size*1.1);const r=HL(x,s,X,Y,size,maxW,o);x.restore();return r;}
function mono(x,s,X,Y,size,o={}){txt(x,s,X,Y,{f:fnt(o.w||500,size,1),c:o.c||'#fff',al:o.al||'center',ls:o.ls??3,a:o.a});}

/* ---------- Material ---------- */
/* gerader blauer Pinselstrich (C&E-Signatur), schnappt mit expo auf */
function brush(x,X,Y,len,u,th=18){if(u<=0)return;const l=len*ex(u);x.save();const g=x.createLinearGradient(X,0,X+len,0);g.addColorStop(0,ACC1);g.addColorStop(.55,ACC);g.addColorStop(1,ACC2);x.fillStyle=g;
  x.beginPath();x.moveTo(X+th*.3,Y-th*.45);const n=Math.max(4,Math.round(l/40));for(let i=1;i<=n;i++){const px=X+l*i/n;x.lineTo(px,Y-th*.5+(hash(i*3.1)-.5)*th*.14);}
  x.quadraticCurveTo(X+l+th*.35,Y,X+l-th*.1,Y+th*.5);for(let i=n;i>=0;i--){const px=X+l*i/n;x.lineTo(px,Y+th*.45+(hash(i*7.3)-.5)*th*.18);}x.quadraticCurveTo(X-th*.4,Y,X+th*.3,Y-th*.45);x.fill();
  x.globalAlpha=.22;x.strokeStyle='#fff';x.lineWidth=1.4;for(let k=0;k<3;k++){x.beginPath();const yy=Y-th*.25+k*th*.22;x.moveTo(X+l*.08+k*20,yy);x.lineTo(X+l*(.55+.12*k),yy+(hash(k)-.5)*3);x.stroke();}x.restore();}
function paper(x,X,Y,w,h,r=26){x.save();x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=70;x.shadowOffsetY=34;x.fillStyle='#B5AC9A';rr(x,X,Y+9,w,h,r);x.fill();x.restore();
  [['#B5AC9A',9],['#C9C1B1',6],['#D6CFC1',3]].forEach(([c,o])=>{x.fillStyle=c;rr(x,X,Y+o,w,h,r);x.fill();});
  const g=x.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,'#F7F4EE');g.addColorStop(1,'#ECE7DD');x.fillStyle=g;rr(x,X,Y,w,h,r);x.fill();}
function glass(x,X,Y,w,h,r=30){x.save();x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=60;x.shadowOffsetY=24;x.fillStyle='rgba(14,19,30,.82)';rr(x,X,Y,w,h,r);x.fill();x.restore();
  x.save();rr(x,X,Y,w,h,r);x.clip();const g=x.createLinearGradient(X,Y,X+w,Y+h);g.addColorStop(0,'rgba(255,255,255,.07)');g.addColorStop(.5,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(X,Y,w,h);x.restore();
  x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=1.5;rr(x,X,Y,w,h,r);x.stroke();}
/* Mono-Pill: blau, Glas oder hell */
function pill(x,cx,cy,s,o={}){const sz=o.size||22,f=fnt(600,sz,1),w=meas(x,s,f,3)+sz*2.2+(o.check?sz*1.3:0),h=sz*2.2;x.save();x.translate(cx,cy);if(o.rot)x.rotate(o.rot*Math.PI/180);if(o.scale!=null)x.scale(o.scale,o.scale);
  if(o.kind==='blue'){x.shadowColor='rgba(47,107,255,.45)';x.shadowBlur=30;const g=x.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,ACC1);g.addColorStop(.6,ACC);g.addColorStop(1,ACC2);x.fillStyle=g;rr(x,-w/2,-h/2,w,h,h/2);x.fill();x.shadowBlur=0;}
  else if(o.kind==='light'){x.fillStyle='#F7F4EE';rr(x,-w/2,-h/2,w,h,h/2);x.fill();x.strokeStyle='#D6CFC1';x.lineWidth=1.5;x.stroke();}
  else{x.fillStyle='rgba(14,19,30,.8)';rr(x,-w/2,-h/2,w,h,h/2);x.fill();x.strokeStyle='rgba(255,255,255,.2)';x.lineWidth=1.5;x.stroke();}
  const c=o.kind==='light'?INK:'#fff';let tx=0;if(o.check){tick(x,-w/2+sz*1.5,0,sz*.55,1,c,3);tx=sz*.6;}
  mono(x,s,tx,sz*.36,sz,{w:600,c});x.restore();return w;}
function tick(x,cx,cy,r,u,c,lw=5){if(u<=0)return;x.save();x.strokeStyle=c;x.lineWidth=lw;x.lineCap='round';x.lineJoin='round';const p=[[-r*.8,0],[-r*.2,r*.6],[r,-r*.6]],k=clamp(u)*2;x.beginPath();x.moveTo(cx+p[0][0],cy+p[0][1]);
  const a=Math.min(1,k);x.lineTo(cx+lerp(p[0][0],p[1][0],a),cy+lerp(p[0][1],p[1][1],a));if(k>1)x.lineTo(cx+lerp(p[1][0],p[2][0],k-1),cy+lerp(p[1][1],p[2][1],k-1));x.stroke();x.restore();}
function rot(x,cx,cy,deg,fn){x.save();x.translate(cx,cy);x.rotate(deg*Math.PI/180);x.translate(-cx,-cy);fn();x.restore();}
function pop(x,cx,cy,u,fn,s=1.3){if(u<=0)return;const k=eb(clamp(u),s);x.save();x.translate(cx,cy);x.scale(k,k);x.translate(-cx,-cy);x.globalAlpha*=clamp(u*3);fn();x.restore();}

/* ---------- Hintergründe ---------- */
function dark(x,W,H,t){x.fillStyle='#05070c';x.fillRect(0,0,W,H);const g=x.createRadialGradient(W*(.5+.06*Math.sin(t*.4)),H*.32,0,W*.5,H*.32,Math.max(W,H)*.75);g.addColorStop(0,'rgba(11,31,69,.95)');g.addColorStop(1,'rgba(11,31,69,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  const g2=x.createRadialGradient(W*.8,H*.9,0,W*.8,H*.9,Math.max(W,H)*.5);g2.addColorStop(0,'rgba(47,107,255,.14)');g2.addColorStop(1,'rgba(47,107,255,0)');x.fillStyle=g2;x.fillRect(0,0,W,H);
  x.fillStyle='rgba(255,255,255,.045)';for(let yy=24;yy<H;yy+=48)for(let xx=24;xx<W;xx+=48){x.fillRect(xx,yy,2,2);}}
function light(x,W,H){const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#F7F4EE');g.addColorStop(1,'#E9E3D7');x.fillStyle=g;x.fillRect(0,0,W,H);x.fillStyle='rgba(12,15,22,.05)';for(let yy=24;yy<H;yy+=48)for(let xx=24;xx<W;xx+=48)x.fillRect(xx,yy,2,2);}

/* Layout: Hochformat alles mittig im sicheren Bereich (250–1300 px), Querformat Text links, Bild rechts */
const LY=VERT?{tx:CX,ty:330,tw:940,vx:CX,vy:900}:{tx:FW*.27,ty:CY-150,tw:660,vx:FW*.7,vy:CY};
/* Szenenkopf: Mono-Pill "SCHRËTT 01", Headline, Unterzeile */
function head(x,t,a,n,title,sub){const u=t-a;pill(x,LY.tx,LY.ty-70*TS,`${L('step')} 0${n}`,{size:20*TS,kind:'glass',scale:eb(clamp(u/.3),1.4)});
  const r=rise(x,title,LY.tx,LY.ty+40*TS,74*TS,LY.tw,seg(t,a+.08,a+.45));if(r)brush(x,LY.tx-r.w/2,LY.ty+64*TS,r.w,seg(t,a+.4,a+.85),12*TS);
  rise(x,sub,LY.tx,LY.ty+128*TS,34*TS,LY.tw,seg(t,a+.25,a+.6),{w:500,c:'rgba(255,255,255,.72)',ls:0});}

/* ---------- Szenen ---------- */
function sHook(x,W,H,t){dark(x,W,H,t);const z=1+.035*seg(t,0,S.pain);x.save();x.translate(CX,CY);x.scale(z,z);x.translate(-CX,-CY);
  const s=VERT?124:150,y1=CY-s*.55,y2=CY+s*.65,mw=VERT?960:1500;HL(x,L('hook1'),CX,y1,s,mw);const r=HL(x,L('hook2'),CX,y2,s,mw);
  brush(x,CX-r.w/2,y2+s*.2,r.w,seg(t,.2,.7),22*TS);pill(x,CX+r.w/2-20,y1-s*1.05,L('tag'),{size:20*TS,kind:'blue',rot:-4,scale:eb(clamp(seg(t,.55,.85)),1.6)});x.restore();}

function sPain(x,W,H,t){const a=S.pain;dark(x,W,H,t);rise(x,L('pain'),CX,VERT?330:150,92*TS,VERT?960:1500,seg(t,a,a+.35));
  const M=L('msgs'),cw=VERT?860:820,ch=112,gap=24,y0=(VERT?CY+10:CY+60)-(M.length*(ch+gap)-gap)/2;
  (M instanceof Array?M:[]).forEach((m,i)=>{const u=seg(t,a+.25+i*.3,a+.6+i*.3);if(u<=0)return;const Y=y0+i*(ch+gap)-(1-e4(u))*80,X=CX-cw/2;
    x.save();x.globalAlpha=clamp(u*3);rot(x,CX,Y+ch/2,i%2?1.2:-1.2,()=>{paper(x,X,Y,cw,ch,22);x.fillStyle='#cfc8bb';x.beginPath();x.arc(X+58,Y+ch/2,30,0,TAU);x.fill();
      txt(x,String.fromCharCode(65+((i*7+3)%26)),X+58,Y+ch/2+11,{f:fnt(700,28),c:'#fff',al:'center'});mono(x,`${L('msgfrom')} · ${L('msgtime')}`,X+108,Y+40,15,{al:'left',c:'#8a8476',ls:2});
      HL(x,m,X+108,Y+82,34,cw-140,{w:600,c:'#1b1d22',al:'left',ls:-.5});});x.restore();});
  const u=seg(t,a+1.75,a+1.95);if(u>0){x.fillStyle=`rgba(5,7,12,${.62*u})`;x.fillRect(0,0,W,H);const k=lerp(1.35,1,e4(u));x.save();x.translate(CX,CY+40);x.scale(k,k);
    const r=HL(x,L('slam'),0,0,VERT?170:200,VERT?960:1400,{a:u});x.restore();brush(x,CX-r.w*.5,CY+40+(VERT?52:62),r.w,seg(t,a+1.9,a+2.25),20*TS);}}

function sTurn(x,W,H,t){const a=S.turn;light(x,W,H);const s=VERT?118:140,y1=CY-s*.5,y2=CY+s*.7,mw=VERT?960:1500;
  rise(x,L('turn1'),CX,y1,s,mw,seg(t,a,a+.35),{c:INK});x.save();x.font=fnt(800,s);const w2=Math.min(mw,meas(x,L('turn2'),fnt(800,s),-s*.035));x.restore();
  brush(x,CX-w2/2,y2+s*.2,w2,seg(t,a+.35,a+.75),24*TS);rise(x,L('turn2'),CX,y2,s,mw,seg(t,a+.12,a+.47),{c:INK});
  const kx=CX+w2/2+70,ky=y2-s*.32;pop(x,kx,ky,seg(t,a+.6,a+.9),()=>{x.fillStyle=ACC;x.beginPath();x.arc(kx,ky,38,0,TAU);x.fill();tick(x,kx,ky,17,seg(t,a+.7,a+1),'#fff',6);});}

function adImg(x,X,Y,w,h){const g=x.createLinearGradient(X,Y,X,Y+h);g.addColorStop(0,'#e8dccb');g.addColorStop(1,'#b8997a');x.fillStyle=g;x.fillRect(X,Y,w,h);
  x.fillStyle='rgba(255,255,255,.35)';x.fillRect(X+w*.55,Y+h*.08,w*.35,h*.45);x.fillStyle='#6b5443';x.fillRect(X,Y+h*.66,w,h*.34);x.fillStyle='#3f3129';x.fillRect(X+w*.12,Y+h*.6,w*.62,h*.1);
  x.fillStyle='#2b2320';x.fillRect(X+w*.16,Y+h*.7,w*.54,h*.3);[.28,.48].forEach(p=>{x.strokeStyle='#2b2320';x.lineWidth=2;x.beginPath();x.moveTo(X+w*p,Y);x.lineTo(X+w*p,Y+h*.26);x.stroke();x.fillStyle='#f5d58a';x.beginPath();x.arc(X+w*p,Y+h*.29,w*.035,0,TAU);x.fill();});
  x.fillStyle='rgba(0,0,0,.09)';for(let yy=Y+3;yy<Y+h;yy+=7)for(let xx=X+3+((yy/7)%2)*3.5;xx<X+w;xx+=7){x.beginPath();x.arc(xx,yy,1.3,0,TAU);x.fill();}}
function sStep1(x,W,H,t){const a=S.s1;dark(x,W,H,t);head(x,t,a,1,L('s1'),L('s1sub'));
  const pw=VERT?470:470,ph=VERT?700:760,u=e4(seg(t,a+.15,a+.6)),px=LY.vx,py=LY.vy+(VERT?40:0)+(1-u)*140;if(u<=0)return;
  x.save();x.globalAlpha=clamp(u*2);rot(x,px,py,-2.5,()=>{const X=px-pw/2,Y=py-ph/2;glass(x,X,Y,pw,ph,56);const sx=X+16,sy=Y+16,sw=pw-32,sh=ph-32;x.save();rr(x,sx,sy,sw,sh,42);x.clip();x.fillStyle='#fff';x.fillRect(sx,sy,sw,sh);
    x.fillStyle=ACC;x.beginPath();x.arc(sx+48,sy+64,24,0,TAU);x.fill();txt(x,INI(),sx+48,sy+72,{f:fnt(800,18),c:'#fff',al:'center'});HL(x,L('adname'),sx+84,sy+60,24,sw-110,{w:700,c:'#111',al:'left',ls:0});txt(x,L('adsp'),sx+84,sy+86,{f:fnt(500,18),c:'#888'});
    const iy=sy+112,ih=sh*.5;adImg(x,sx,iy,sw,ih);HL(x,L('adline'),sx+24,iy+ih+52,28,sw-48,{w:700,c:'#111',al:'left',ls:-.3});
    x.fillStyle='#eef1f6';rr(x,sx+20,iy+ih+80,sw-40,58,14);x.fill();HL(x,L('adcta')+'  →',sx+sw/2,iy+ih+117,22,sw-80,{w:700,c:ACC2,ls:0});
    x.fillStyle='#e6e8ec';[0,1,2].forEach(i=>{rr(x,sx+24+i*90,iy+ih+164,70,14,7);x.fill();});x.restore();
    // Fadenkreuz sucht und rastet auf dem Bild ein
    const cu=seg(t,a+1.05,a+1.6),lk=seg(t,a+1.6,a+1.75);if(cu>0){const k=e4(cu),cx=lerp(X+pw*.95,X+pw/2,k),cy=lerp(Y+ph*.15,iy+ih*.5,k),R=lerp(140,78,k);x.save();x.globalAlpha=clamp(cu*3);x.strokeStyle=lk>0?ACC:'#fff';x.lineWidth=5;
      x.beginPath();x.arc(cx,cy,R,0,TAU);x.stroke();[0,1,2,3].forEach(q=>{const an=q*Math.PI/2;x.beginPath();x.moveTo(cx+Math.cos(an)*(R-18),cy+Math.sin(an)*(R-18));x.lineTo(cx+Math.cos(an)*(R+22),cy+Math.sin(an)*(R+22));x.stroke();});
      if(lk>0){x.globalAlpha=(1-lk)*.8;x.beginPath();x.arc(cx,cy,R*(1+lk*.8),0,TAU);x.stroke();}x.restore();}});x.restore();
  // Satelliten: Zielgruppen-Chips überlappen das Handy
  const C=L('chips');(C instanceof Array?C:[]).forEach((c,i)=>{const sp=VERT?[[px-250,py-120],[px+240,py+40],[px-220,py+200]]:[[px-300,py-170],[px+290,py-10],[px-270,py+180]];
    pill(x,sp[i][0],sp[i][1],c,{size:21*TS,kind:i===1?'blue':'light',rot:[-4,3,-2][i],check:true,scale:eb(clamp(seg(t,a+1.75+i*.15,a+2.05+i*.15)),1.6)});});}

function sStep2(x,W,H,t){const a=S.s2;dark(x,W,H,t);head(x,t,a,2,L('s2'),L('s2sub'));const fw=VERT?860:680,fh=VERT?600:600,u=e4(seg(t,a+.15,a+.55));if(u<=0)return;
  const fx=LY.vx-fw/2,fy=LY.vy+(VERT?40:0)-fh/2+(1-u)*120;x.save();x.globalAlpha=clamp(u*2);rot(x,LY.vx,fy+fh/2,1.6,()=>{paper(x,fx,fy,fw,fh,30);mono(x,L('form'),fx+44,fy+62,18,{al:'left',c:'#8a8476',ls:4});
    x.fillStyle='#D6CFC1';x.fillRect(fx+44,fy+82,fw-88,2);const Q=L('q'),O=[L('o1'),L('o2'),L('o3')],sel=[0,1,0];
    (Q instanceof Array?Q:[]).forEach((q,i)=>{const qy=fy+150+i*((fh-180)/3);HL(x,q,fx+44,qy,32,fw-88,{w:700,c:INK,al:'left',ls:-.4});let ox=fx+44;const su=seg(t,a+.75+i*.45,a+.95+i*.45);
      (O[i] instanceof Array?O[i]:[]).forEach((o,j)=>{const f=fnt(600,22),w=meas(x,o,f,0)+56+(j===sel[i]?30:0),on=j===sel[i]&&su>0,k=on?eb(su,1.8):1;x.save();x.translate(ox+w/2,qy+56);x.scale(on?k:1,on?k:1);
        if(on){const g=x.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,ACC1);g.addColorStop(1,ACC2);x.fillStyle=g;x.globalAlpha*=1;}else x.fillStyle='rgba(12,15,22,.06)';rr(x,-w/2,-25,w,50,25);x.fill();
        if(!on){x.strokeStyle='rgba(12,15,22,.16)';x.lineWidth=1.5;x.stroke();}if(on)tick(x,-w/2+26,0,9,su,'#fff',3.5);txt(x,o,on?14:0,8,{f,c:on?'#fff':'#3a3d45',al:'center'});x.restore();ox+=w+14;});});
    pill(x,fx+fw-120,fy-6,L('qual'),{size:22,kind:'blue',rot:5,check:true,scale:eb(clamp(seg(t,a+2.15,a+2.45)),1.8)});});x.restore();}

function bubble(x,X,Y,maxW,s,out,u){if(u<=0)return 0;x.save();x.font=fnt(600,28);const Lw=wrap(x,s,maxW-56),w=Math.min(maxW,Math.max(...Lw.map(l=>x.measureText(l).width))+56),h=Lw.length*38+34;x.restore();
  const bx=out?X-w:X,k=eb(clamp(u),1.4);x.save();x.translate(out?X:X,Y+h);x.scale(k,k);x.translate(-(out?X:X),-(Y+h));
  if(out){const g=x.createLinearGradient(bx,0,bx+w,0);g.addColorStop(0,ACC1);g.addColorStop(1,ACC2);x.fillStyle=g;}else x.fillStyle='#F7F4EE';rr(x,bx,Y,w,h,26);x.fill();
  Lw.forEach((l,i)=>txt(x,l,bx+28,Y+46+i*38,{f:fnt(600,28),c:out?'#fff':INK}));x.restore();return h;}
function dots(x,X,Y,t,out){const w=96;x.fillStyle=out?'rgba(47,107,255,.55)':'rgba(247,244,238,.85)';rr(x,out?X-w:X,Y,w,52,26);x.fill();[0,1,2].forEach(i=>{x.fillStyle=out?'#fff':'#777';x.globalAlpha=.4+.6*Math.max(0,Math.sin(t*10-i*.9));x.beginPath();x.arc((out?X-w:X)+28+i*20,Y+26,6,0,TAU);x.fill();x.globalAlpha=1;});}
function sStep3(x,W,H,t){const a=S.s3;dark(x,W,H,t);head(x,t,a,3,L('s3'),L('s3sub'));const cw=VERT?880:700,chh=VERT?470:480,u=e4(seg(t,a+.15,a+.55));if(u<=0)return;
  const X=LY.vx-cw/2,Y=LY.vy+(VERT?40:0)-chh/2+(1-u)*120;x.save();x.globalAlpha=clamp(u*2);rot(x,LY.vx,Y+chh/2,-1.4,()=>{glass(x,X,Y,cw,chh,34);x.fillStyle=ACC;x.beginPath();x.arc(X+56,Y+56,24,0,TAU);x.fill();
    txt(x,INI(),X+56,Y+64,{f:fnt(800,18),c:'#fff',al:'center'});HL(x,L('adname'),X+96,Y+52,24,cw-340,{w:700,al:'left',ls:0});mono(x,'● '+L('chatmode'),X+96,Y+80,15,{al:'left',c:ACC1,ls:2});
    x.fillStyle='rgba(255,255,255,.12)';x.fillRect(X,Y+106,cw,1.5);const bw=cw*.74;
    if(t<a+.95)dots(x,X+cw-32,Y+140,t,1);const h1=bubble(x,X+cw-32,Y+140,bw,L('out'),1,seg(t,a+.95,a+1.2));
    const y2=Y+140+(h1||0)+28;if(t>=a+1.45&&t<a+1.8)dots(x,X+32,y2,t,0);bubble(x,X+32,y2,bw,L('in'),0,seg(t,a+1.8,a+2.05));});x.restore();
  pill(x,LY.vx,Y+chh+(VERT?10:6),L('booked'),{size:22*TS,kind:'blue',check:true,scale:eb(clamp(seg(t,a+2.2,a+2.5)),1.8)});}

function sPlan(x,W,H,t){const a=S.plan;dark(x,W,H,t);const ty=VERT?360:190;const r=rise(x,L('plan'),CX,ty,(VERT?130:120),VERT?960:1500,seg(t,a,a+.35));if(r)brush(x,CX-r.w/2,ty+28*TS,r.w,seg(t,a+.3,a+.7),20*TS);
  const cw=VERT?900:1080,chh=VERT?620:620,u=e4(seg(t,a+.1,a+.5));if(u<=0)return;const X=CX-cw/2,Y=(VERT?CY+130:CY+90)-chh/2+(1-u)*120;
  x.save();x.globalAlpha=clamp(u*2);rot(x,CX,Y+chh/2,-1.5,()=>{paper(x,X,Y,cw,chh,30);mono(x,L('week'),X+40,Y+56,18,{al:'left',c:'#8a8476',ls:4});const D=L('days'),gx=X+40,gy=Y+90,gw=cw-80,gh=chh-130,cl=gw/5,rh=gh/5;
    (D instanceof Array?D:[]).forEach((d,i)=>{txt(x,d,gx+cl*i+cl/2,gy+34,{f:fnt(700,24),c:INK,al:'center'});});x.strokeStyle='rgba(12,15,22,.1)';x.lineWidth=1.5;
    for(let i=0;i<=5;i++){x.beginPath();x.moveTo(gx+cl*i,gy+54);x.lineTo(gx+cl*i,gy+gh);x.stroke();}for(let j=1;j<5;j++){x.beginPath();x.moveTo(gx,gy+54+((gh-54)/4)*j);x.lineTo(gx+gw,gy+54+((gh-54)/4)*j);x.stroke();}
    const B=[[0,1],[1,0],[2,2],[3,1],[1,3],[4,0],[0,3],[3,3],[2,0],[4,2]],ch=(gh-54)/4;B.forEach(([c,rw],i)=>{const bu=seg(t,a+.6+i*.17,a+.85+i*.17);if(bu<=0)return;const bx=gx+cl*c+8,by=gy+54+ch*rw+8,bw2=cl-16,bh=ch-16;
      pop(x,bx+bw2/2,by+bh/2,bu,()=>{const g=x.createLinearGradient(bx,by,bx+bw2,by+bh);g.addColorStop(0,ACC1);g.addColorStop(1,ACC2);x.fillStyle=g;rr(x,bx,by,bw2,bh,12);x.fill();x.fillStyle='rgba(255,255,255,.75)';rr(x,bx+14,by+16,bw2*.55,9,4.5);x.fill();x.fillStyle='rgba(255,255,255,.4)';rr(x,bx+14,by+34,bw2*.35,8,4);x.fill();},1.6);});});x.restore();}

function sClaim(x,W,H,t){const a=S.claim;dark(x,W,H,t);const s=VERT?120:146,y1=CY-s*.5,y2=CY+s*.72,mw=VERT?960:1600;rise(x,L('claim1'),CX,y1,s,mw,seg(t,a,a+.32));
  x.save();const w2=Math.min(mw,meas(x,L('claim2'),fnt(800,s),-s*.035));x.restore();brush(x,CX-w2/2,y2+s*.22,w2,seg(t,a+.38,a+.78),24*TS);rise(x,L('claim2'),CX,y2,s,mw,seg(t,a+.1,a+.42));
  const su=seg(t,a+.75,a+1.45);if(su>0){const ox=CX+w2/2+8,oy=y2+s*.22;for(let i=0;i<16;i++){const an=-Math.PI*.95+hash(i)*Math.PI*1.1,d=e4(su)*(60+hash(i+9)*140),r=(1-su)*(4+hash(i+3)*6);
    x.fillStyle=i%3?ACC1:'#fff';x.globalAlpha=1-su;x.beginPath();x.arc(ox+Math.cos(an)*d,oy+Math.sin(an)*d,r,0,TAU);x.fill();}x.globalAlpha=1;}
  mono(x,L('claimsub'),CX,y2+s*.95+(VERT?40:30),22*TS,{a:e4(seg(t,a+.9,a+1.2))*.8,ls:4});}

function sEnd(x,W,H,t){const a=S.end;dark(x,W,H,t);const it=L('items'),I=it instanceof Array?it:[String(it)],st=.55,tb=a+I.length*st+.05;
  if(t<tb){let i=0;I.forEach((_,k)=>{if(t>=a+k*st)i=k;});const pu=1+.08*(1-e4(seg(t,a+i*st,a+i*st+.16)));
    HL(x,L('lead'),CX,CY-60,66*TS,VERT?960:1500,{w:500,ls:-1,a:e4(seg(t,a-.1,a+.15))});x.save();x.translate(CX,CY+60);x.scale(pu,pu);HL(x,I[i],0,30,92*TS,VERT?960:1500,{c:ACC1});x.restore();return;}
  const u=t-tb,lg=eb(clamp(u/.35),1.6),ly=CY-(VERT?190:200);x.save();x.translate(CX,ly);x.scale(lg,lg);glass(x,-80,-80,160,160,40);txt(x,'c',-22,32,{f:fnt(800,104),c:'#fff',al:'center'});txt(x,'e',30,32,{f:fnt(800,104),c:ACC1,al:'center'});x.restore();
  const r=rise(x,'Clees & Ernster',CX,CY+40,(VERT?96:110),VERT?960:1400,clamp(u/.4));if(r)brush(x,CX-r.w/2,CY+70,r.w,seg(u,.3,.7),12);
  const bu=seg(u,.55,.9);if(bu>0){const k=eb(bu,1.8),f=fnt(700,32*TS),bw=meas(x,L('cta'),f,0)+110;x.save();x.translate(CX,CY+(VERT?175:185));x.scale(k,k);x.fillStyle='#fff';rr(x,-bw/2,-40,bw,80,40);x.fill();txt(x,L('cta'),0,11,{f,c:INK,al:'center'});x.restore();}
  mono(x,L('sub'),CX,CY+(VERT?285:290),26*TS,{a:.75*e4(seg(u,.85,1.15)),ls:2});}

const film_=film({dur:DUR,events:EV,
 load:[new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href='fonts/fonts.css';l.onload=l.onerror=r;document.head.appendChild(l);})
   .then(()=>Promise.all(['800','700','600','500'].map(w=>document.fonts.load(`${w} 40px Montserrat`,'ËéäçÜ'))).then(()=>Promise.all(['500','600'].map(w=>document.fonts.load(`${w} 20px "IBM Plex Mono"`,'ËÉ'))))),
   fetch('texts/ce-launch.json',{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({})).then(j=>{TX=j||{};const n=(L('items')instanceof Array?L('items'):[]).length||1,A=(t,s,v)=>EV.push({t,s,v});
     A(.2,'key_1',.3);A(S.pain,'key_2',.35);[0,1,2,3].forEach(i=>A(S.pain+.3+i*.3,'key_2',.25));A(S.pain+1.75,'click_send',.45);A(S.turn,'key_1',.4);A(S.turn+.4,'key_2',.3);
     A(S.s1,'key_1',.35);A(S.s1+1.6,'key_1',.4);A(S.s1+1.8,'key_2',.25);A(S.s2,'key_1',.35);[0,1,2].forEach(i=>A(S.s2+.75+i*.45,'key_1',.3));A(S.s2+2.15,'done',.35);
     A(S.s3,'key_1',.35);A(S.s3+.95,'click_send',.4);A(S.s3+1.8,'key_2',.3);A(S.s3+2.2,'done',.35);A(S.plan,'key_1',.35);for(let i=0;i<10;i+=2)A(S.plan+.6+i*.17,'key_2',.22);
     A(S.claim,'key_1',.35);A(S.claim+.4,'click_send',.45);for(let i=0;i<n;i++)A(S.end+i*.55,'key_1',.3);A(S.end+n*.55+.05,'key_2',.4);A(S.end+n*.55+.6,'done',.3);})],
 draw(x,t){const W=FW,H=FH;
  if(t<S.pain)sHook(x,W,H,t);else if(t<S.turn)sPain(x,W,H,t);else if(t<S.s1)sTurn(x,W,H,t);else if(t<S.s2)sStep1(x,W,H,t);else if(t<S.s3)sStep2(x,W,H,t);
  else if(t<S.plan)sStep3(x,W,H,t);else if(t<S.claim)sPlan(x,W,H,t);else if(t<S.end)sClaim(x,W,H,t);else sEnd(x,W,H,t);
  grain(x,W,H,t,.035);}});
