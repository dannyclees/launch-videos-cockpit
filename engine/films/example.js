/* example.js · a complete 18 s launch film for a made-up product, "Nimbus".
   Structure (the one that wins most often in the library): HOOK on frame 1 -> real screen -> ONE use case shown end to end -> result -> end card that clicks on the beat.
   Copy this file, rename it, change the words, the page and the brand. Keep the timeline shape. */
// your brand comes from engine/brand.json (Claude writes it from your answers in questions.md)
const BR=window.BRAND||{},B={brand:BR.name||'Nimbus',accent:BR.accent||'#BFF549',to:BR.agent||'Claude Code',cta:BR.cta||'Try it free',sub:BR.sub||'Mac and Windows',ink:BR.ink||'#fff',lead:BR.lead||'Built for',items:BR.items||['Claude Code','Codex']};
const T={hook:0,screen:2.2,listen:3.4,confirm:6.8,sent:8.6,answer:10.2,end:14.2},DUR=18.2;
const SAY='Summarize this thread and send it to my team.';
const ANSWER='Sent to #team:\n1. Launch moves to Friday 9am.\n2. PR 555 needs one review.\n3. Pricing page still says $15, should be $17.';
// the page on screen: draw it, or put a screenshot in engine/shots/ and use cover(x,IMG.page,...)
function page(x,X,Y,w,h){x.fillStyle='#fff';x.fillRect(X,Y,w,h);x.fillStyle='#4a154b';x.fillRect(X,Y,w*.2,h);
  txt(x,'# launch',X+w*.24,Y+56,{f:`700 30px ${FONT}`,c:'#111'});
  [['Ava','Crash fix is in PR 555. Needs one review.'],['Ben','Can we move the launch to Friday 9am?'],['Mia','Pricing page still says $15.'],['Leo','Fine by me, I will record the demo.'],['Ava','Webinar clash on Thursday, so Friday works.']]
  .forEach(([n,m],i)=>{const yy=Y+120+i*86;x.fillStyle=['#e8912d','#2bac76','#36c5f0','#e01e5a','#e8912d'][i];rr(x,X+w*.24,yy-28,44,44,8);x.fill();txt(x,n,X+w*.24+60,yy-8,{f:`700 22px ${FONT}`,c:'#111'});txt(x,m,X+w*.24+60,yy+22,{f:`400 22px ${FONT}`,c:'#333'});});}
const film_=film({dur:DUR,events:[{t:T.listen,s:'key_2',v:.25},{t:T.confirm,s:'key_1',v:.25},{t:T.sent,s:'click_send',v:.4},{t:T.answer,s:'key_2',v:.3},{t:T.end,s:'key_1',v:.3},{t:T.end+.55,s:'key_1',v:.3},{t:T.end+1.1,s:'key_1',v:.3},{t:T.end+1.6,s:'key_2',v:.3}],
 draw(x,t){const W=FW,H=FH;glowBg(x,W,H,t);
  // 1 HOOK: readable on frame 1 (it is the thumbnail on X)
  if(t<T.screen+.3){const a=1-seg(t,T.screen-.2,T.screen+.3);txt(x,'142 unread messages.',W/2,H*.42,{f:`600 ${VERT?84:96}px ${FONT}`,c:'#fff',al:'center',ls:-2,a});
    txt(x,'One sentence.',W/2,H*.42+(VERT?110:120),{f:`600 ${VERT?84:96}px ${FONT}`,c:B.accent,al:'center',ls:-2,a:a*eo(seg(t,.5,.8))});}
  if(t>=T.screen&&t<T.end){// 2 SCREEN: camera eases in, the page stays real and readable
    const u=eio(seg(t,T.screen,T.screen+1.2)),z=lerp(.9,1,u),bw=VERT?W*.92:W*.78,bh=VERT?H*.62:H*.78;x.save();x.globalAlpha=eo(seg(t,T.screen,T.screen+.4));x.translate(W/2,H*(VERT?.52:.55));x.scale(z,z);
    browser(x,-bw/2,-bh/2,bw,bh,{url:'app.slack.com/client/team/launch',content:page});x.restore();
    // 3 THE ONE USE CASE: listen -> confirm -> sent -> answer, hanging from the top edge
    const cx=W/2,cw=VERT?W*.9:W*.42,top=VERT?H*.14:0;x.save();x.translate(0,top);
    if(t>=T.listen&&t<T.confirm)commandCard(x,cx,cw,t,{state:'listen',a:seg(t,T.listen,T.listen+.3),text:t<T.listen+.6?'':spoken(SAY,seg(t,T.listen+.6,T.confirm-.4)),...B});
    else if(t>=T.confirm&&t<T.sent)commandCard(x,cx,cw,t,{state:'confirm',a:1,text:SAY,cd:1-seg(t,T.confirm+.2,T.sent-.1),...B});
    else if(t>=T.sent&&t<T.answer)commandCard(x,cx,cw,t,{state:'sent',a:1-seg(t,T.answer-.3,T.answer),...B});
    else if(t>=T.answer)commandCard(x,cx,cw,t,{state:'answer',a:seg(t,T.answer,T.answer+.35)*(1-seg(t,T.end-.3,T.end)),text:ANSWER,...B});x.restore();}
  if(t>=T.end){x.fillStyle='#000';x.globalAlpha=1;x.fillRect(0,0,W,H);// 4 END: click, click, click, then brand + button
    endCard(x,W,H,t,T.end,{lead:B.lead,items:B.items,brand:B.brand,cta:B.cta,sub:B.sub,accent:B.accent,ink:B.ink});}
  grain(x,W,H,t,.04);}});
