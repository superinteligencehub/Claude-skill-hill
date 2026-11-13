// Мини-генератор QR-кода (байтовый режим, уровень коррекции L, версии 1–15). Без внешних библиотек.
// window.qrMatrix(text) → массив строк из true/false (true — тёмный модуль) или null, если текст слишком длинный.
(function(){
const EC=[0,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22],NB=[0,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6];
const TOT=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655];
const ALIGN=[[],[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70]];
function mul(x,y){let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z}
function rsDiv(deg){const r=new Array(deg).fill(0);r[deg-1]=1;let root=1;
 for(let i=0;i<deg;i++){for(let j=0;j<deg;j++){r[j]=mul(r[j],root);if(j+1<deg)r[j]^=r[j+1]}root=mul(root,2)}return r}
function rsRem(data,div){const r=div.map(()=>0);for(const b of data){const f=b^r.shift();r.push(0);div.forEach((c,i)=>r[i]^=mul(c,f))}return r}
window.qrMatrix=function(text){
 const data=[...new TextEncoder().encode(text)];let v=1;
 for(;v<=15;v++){if(4+(v<10?8:16)+8*data.length<=(TOT[v]-EC[v]*NB[v])*8)break}
 if(v>15)return null;
 const cap=TOT[v]-EC[v]*NB[v],bits=[];const put=(val,len)=>{for(let i=len-1;i>=0;i--)bits.push((val>>>i)&1)};
 put(4,4);put(data.length,v<10?8:16);data.forEach(b=>put(b,8));
 put(0,Math.min(4,cap*8-bits.length));put(0,(8-bits.length%8)%8);
 for(let pad=0xEC;bits.length<cap*8;pad^=0xEC^0x11)put(pad,8);
 const cw=[];for(let i=0;i<bits.length;i+=8){let b=0;for(let j=0;j<8;j++)b=(b<<1)|bits[i+j];cw.push(b)}
 // блоки и коррекция ошибок
 const nb=NB[v],ec=EC[v],short=nb-TOT[v]%nb,sLen=Math.floor(TOT[v]/nb)-ec,div=rsDiv(ec),D=[],E=[];
 for(let i=0,k=0;i<nb;i++){const len=sLen+(i<short?0:1),d=cw.slice(k,k+len);k+=len;D.push(d);E.push(rsRem(d,div))}
 const out=[];for(let i=0;i<=sLen;i++)D.forEach(d=>{if(i<d.length)out.push(d[i])});
 for(let i=0;i<ec;i++)E.forEach(e=>out.push(e[i]));
 // матрица
 const n=17+4*v,M=[],F=[];for(let y=0;y<n;y++){M.push(new Array(n).fill(false));F.push(new Array(n).fill(false))}
 const set=(x,y,dark)=>{if(x>=0&&x<n&&y>=0&&y<n){M[y][x]=!!dark;F[y][x]=true}};
 for(let i=0;i<n;i++){set(6,i,i%2===0);set(i,6,i%2===0)}
 [[3,3],[n-4,3],[3,n-4]].forEach(([cx,cy])=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy));set(cx+dx,cy+dy,d!==2&&d!==4)}});
 const al=ALIGN[v],m=al.length;
 for(let i=0;i<m;i++)for(let j=0;j<m;j++){if((i===0&&j===0)||(i===0&&j===m-1)||(i===m-1&&j===0))continue;
  for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)set(al[i]+dx,al[j]+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)}
 const drawFormat=mask=>{const d=(1<<3)|mask;let rem=d;for(let i=0;i<10;i++)rem=(rem<<1)^((rem>>>9)*0x537);
  const b=((d<<10)|rem)^0x5412,bit=i=>((b>>>i)&1)!==0;
  for(let i=0;i<=5;i++)set(8,i,bit(i));set(8,7,bit(6));set(8,8,bit(7));set(7,8,bit(8));for(let i=9;i<15;i++)set(14-i,8,bit(i));
  for(let i=0;i<8;i++)set(n-1-i,8,bit(i));for(let i=8;i<15;i++)set(8,n-15+i,bit(i));set(8,n-8,true)};
 drawFormat(0);
 if(v>=7){let rem=v;for(let i=0;i<12;i++)rem=(rem<<1)^((rem>>>11)*0x1F25);const b=(v<<12)|rem;
  for(let i=0;i<18;i++){const bt=((b>>>i)&1)!==0,a=n-11+i%3,c=Math.floor(i/3);set(a,c,bt);set(c,a,bt)}}
 // данные зигзагом
 let k=0;for(let right=n-1;right>=1;right-=2){if(right===6)right=5;
  for(let vert=0;vert<n;vert++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)===0,y=up?n-1-vert:vert;
   if(!F[y][x]&&k<out.length*8){M[y][x]=((out[k>>>3]>>>(7-(k&7)))&1)!==0;k++}}}
 // маска: выбираем ту, где меньше длинных полос и квадратов 2×2
 const MASK=[(x,y)=>(x+y)%2===0,(x,y)=>y%2===0,(x,y)=>x%3===0,(x,y)=>(x+y)%3===0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2===0,
  (x,y)=>x*y%2+x*y%3===0,(x,y)=>(x*y%2+x*y%3)%2===0,(x,y)=>((x+y)%2+x*y%3)%2===0];
 const apply=i=>{for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(!F[y][x]&&MASK[i](x,y))M[y][x]=!M[y][x]};
 const penalty=()=>{let p=0;
  for(let y=0;y<n;y++){let rx=1,ry=1;for(let x=1;x<n;x++){
   if(M[y][x]===M[y][x-1]){rx++;if(rx===5)p+=3;else if(rx>5)p++}else rx=1;
   if(M[x][y]===M[x-1][y]){ry++;if(ry===5)p+=3;else if(ry>5)p++}else ry=1}}
  for(let y=0;y<n-1;y++)for(let x=0;x<n-1;x++){const c=M[y][x];if(c===M[y][x+1]&&c===M[y+1][x]&&c===M[y+1][x+1])p+=3}
  return p};
 let best=0,bp=Infinity;for(let i=0;i<8;i++){apply(i);drawFormat(i);const p=penalty();if(p<bp){bp=p;best=i}apply(i)}
 apply(best);drawFormat(best);return M};
})();
