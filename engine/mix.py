# python3 mix.py <film> [--vertical] [--music your-licensed-track.mp3] [--offset 0]
# Adds the click sounds from the film's events (+ optional music you have a licence for) -> out/<film>[_v]_final.mp4
import json,subprocess,sys,os
a=sys.argv;name=a[1];tag=name+('_v' if '--vertical' in a else '');H=os.path.dirname(os.path.abspath(__file__))
music=a[a.index('--music')+1] if '--music' in a else None;off=a[a.index('--offset')+1] if '--offset' in a else '0'
src=f'{H}/out/{tag}.mp4';ev=json.load(open(f'{H}/out/{tag}.events.json'))
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',src]))
cmd=['ffmpeg','-v','error','-y','-i',src];fc=[];lab=[];k=1
if music:cmd+=['-ss',off,'-i',music];fc.append(f"[1:a]aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-20:TP=-3,atrim=0:{dur},afade=t=in:d=0.3,afade=t=out:st={max(0,dur-1.5)}:d=1.5[m]");lab.append('[m]');k=2
for i,e in enumerate(ev):
    ms=max(1,int(e['t']*1000));cmd+=['-i',f"{H}/sfx/{e['s']}.wav"];fc.append(f"[{k+i}:a]aresample=48000,aformat=channel_layouts=stereo,volume={e.get('v',.5)},adelay={ms}|{ms}[s{i}]");lab.append(f'[s{i}]')
fc.append(''.join(lab)+f'amix=inputs={len(lab)}:normalize=0,alimiter=limit=0.9,apad,atrim=0:{dur}[o]')
subprocess.run(cmd+['-filter_complex',';'.join(fc),'-map','0:v','-map','[o]','-c:v','copy','-c:a','aac','-b:a','256k',f'{H}/out/{tag}_final.mp4'],check=True);print('done ->',f'out/{tag}_final.mp4')
