// node export.mjs <film> [--vertical] [--lang xx]  ->  out/<film>[_xx][_v].mp4 (4K, silent) + out/<film>[_xx][_v].events.json
// needs: npm i puppeteer (once), ffmpeg on PATH. Serves this folder locally, renders every frame at 2x, encodes H.264 crf 16.
import puppeteer from 'puppeteer';import http from 'http';import fs from 'fs';import path from 'path';import {execFileSync} from 'child_process';import {fileURLToPath} from 'url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),name=process.argv[2]||'example',V=process.argv.includes('--vertical'),LI=process.argv.indexOf('--lang'),LG=LI>0?(process.argv[LI+1]||'').replace(/[^a-z]/gi,''):'',tag=name+(LG?'_'+LG:'')+(V?'_v':'');
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.wav':'audio/wav','.mp3':'audio/mpeg','.css':'text/css','.woff2':'font/woff2'};
const srv=http.createServer((q,r)=>{const f=path.join(HERE,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(HERE)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end();}r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await puppeteer.launch({headless:true,args:['--no-sandbox','--mute-audio'],executablePath:process.env.PUPPETEER_EXECUTABLE_PATH||undefined});
try{const p=await b.newPage();p.on('pageerror',e=>console.error('[page]',e.message));
  await p.goto(`http://127.0.0.1:${srv.address().port}/film.html?f=${name}${V?'&v=1':''}${LG?'&l='+LG:''}`,{waitUntil:'networkidle0'});await p.waitForFunction('window.__ready===true',{timeout:60000});
  const dur=await p.evaluate(()=>FILM.dur),n=Math.round(dur*30),dir=path.join(HERE,'out','frames-'+tag);fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(HERE,'out',tag+'.events.json'),JSON.stringify(await p.evaluate(()=>FILM.events)));
  for(let i=0;i<n;i++){const d=await p.evaluate(t=>{FILM.paint(t);return document.getElementById('c').toDataURL('image/jpeg',.94);},i/30);fs.writeFileSync(path.join(dir,String(i).padStart(5,'0')+'.jpg'),Buffer.from(d.split(',')[1],'base64'));if(i%60===0)process.stdout.write(`\r${tag}: ${i}/${n} frames`);}
  execFileSync('ffmpeg',['-v','error','-y','-framerate','30','-i',path.join(dir,'%05d.jpg'),'-c:v','libx264','-crf','16','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart',path.join(HERE,'out',tag+'.mp4')]);
  fs.rmSync(dir,{recursive:true,force:true});console.log(`\n${tag}: done -> out/${tag}.mp4 (${n} frames)`);}
finally{await b.close();srv.close();}
