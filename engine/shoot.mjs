// node shoot.mjs <url> <name> [--mobile] [--full]
// Real screenshots for your film: desktop at 2x (3840 wide) or phone at 5x (iPhone size), saved to shots/<name>.png
import puppeteer from 'puppeteer';import path from 'path';import fs from 'fs';import {fileURLToPath} from 'url';
const HERE=path.dirname(fileURLToPath(import.meta.url)),[url,name='page']=process.argv.slice(2),M=process.argv.includes('--mobile'),FULL=process.argv.includes('--full');
if(!url){console.log('usage: node shoot.mjs <url> <name> [--mobile] [--full]');process.exit(1);}
fs.mkdirSync(path.join(HERE,'shots'),{recursive:true});
const b=await puppeteer.launch({headless:true,args:['--no-sandbox','--mute-audio']});
try{const p=await b.newPage();
  await p.setViewport(M?{width:390,height:844,deviceScaleFactor:5,isMobile:true,hasTouch:true}:{width:1920,height:1080,deviceScaleFactor:2});
  await p.goto(url,{waitUntil:'networkidle2',timeout:60000});await new Promise(r=>setTimeout(r,2500));
  const out=path.join(HERE,'shots',(M?'m_':'')+name+'.png');await p.screenshot({path:out,fullPage:FULL});console.log('saved',path.relative(HERE,out));}
finally{await b.close();}
