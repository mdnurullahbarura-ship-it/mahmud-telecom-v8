(function(){
"use strict";
function safeName(n){
  let s=String(n||"Mahmud_Telecom_Report").replace(/[\\/:*?"<>|]+/g,"_").replace(/\s+/g,"_");
  return s.toLowerCase().endsWith(".png") ? s : s+".png";
}

/* IMPORTANT: Chrome can reject an <a download> click if it happens after
   an async operation because the original user gesture has expired.
   Therefore we open the Save dialog IMMEDIATELY when the user clicks PNG,
   then render the image and write the resulting PNG into that file. */
async function pickSaveFile(file){
  if(!window.showSaveFilePicker) return null;
  try{
    return await window.showSaveFilePicker({
      suggestedName:file,
      types:[{description:"PNG Image",accept:{"image/png":[".png"]}}]
    });
  }catch(e){
    if(e && e.name === "AbortError") return "cancelled";
    return null;
  }
}

async function saveBlobToHandle(handle,blob){
  const writable=await handle.createWritable();
  try{ await writable.write(blob); await writable.close(); }
  catch(e){ try{await writable.abort();}catch(_){} throw e; }
}

function downloadBlob(blob,file){
  if(!blob) throw new Error("empty blob");
  const a=document.createElement("a");
  a.download=file; a.href=URL.createObjectURL(blob); a.rel="noopener";
  a.style.display="none"; document.body.appendChild(a);
  a.click();
  setTimeout(()=>{try{a.remove()}catch(e){};try{URL.revokeObjectURL(a.href)}catch(e){}},5000);
}

async function canvasToBlob(canvas){
  return await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error("PNG encoding failed")),"image/png"));
}

function waitImages(root){
  return Promise.all([...root.querySelectorAll("img")].map(img=>{
    if(img.complete) return Promise.resolve();
    return new Promise(r=>{
      img.addEventListener("load",r,{once:true});
      img.addEventListener("error",r,{once:true});
      setTimeout(r,3000);
    });
  }));
}
function px(v){const n=parseFloat(v);return Number.isFinite(n)?n:0;}
function visible(el){
  if(!(el instanceof Element)) return false;
  const cs=getComputedStyle(el);
  return cs.display!=="none"&&cs.visibility!=="hidden"&&parseFloat(cs.opacity||"1")!==0;
}
function directTextNodes(el){return [...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE&&n.nodeValue.trim());}
function fontFor(cs,scale){
  const style=cs.fontStyle&&cs.fontStyle!=="normal"?cs.fontStyle+" ":"";
  const weight=cs.fontWeight&&cs.fontWeight!=="normal"?cs.fontWeight+" ":"";
  return style+weight+(px(cs.fontSize)*scale)+"px "+(cs.fontFamily||"Arial,sans-serif");
}

async function drawLocalImage(ctx,img,r,scale){
  try{
    if(!img.complete || !img.naturalWidth) return;
    ctx.drawImage(img,r.x*scale,r.y*scale,r.w*scale,r.h*scale);
  }catch(e){}
}

async function renderOffline(root){
  const rootRect=root.getBoundingClientRect();
  const w=Math.max(1,Math.ceil(root.scrollWidth||rootRect.width));
  const h=Math.max(1,Math.ceil(root.scrollHeight||rootRect.height));
  const scale=Math.min(2,Math.max(1,window.devicePixelRatio||1));
  const canvas=document.createElement("canvas");
  canvas.width=Math.ceil(w*scale);canvas.height=Math.ceil(h*scale);
  const ctx=canvas.getContext("2d");
  if(!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.textBaseline="alphabetic";
  const els=[root,...root.querySelectorAll("*")].filter(visible);
  for(const el of els){
    if(el.classList&&el.classList.contains("mt-png-btn"))continue;
    const r=el.getBoundingClientRect(),x=r.left-rootRect.left,y=r.top-rootRect.top;
    if(r.width<=0||r.height<=0)continue;
    const cs=getComputedStyle(el),bg=cs.backgroundColor;
    if(bg&&bg!=="transparent"){ctx.fillStyle=bg;ctx.fillRect(x*scale,y*scale,r.width*scale,r.height*scale);}
    const bw=["Top","Right","Bottom","Left"].map(s=>px(cs["border"+s+"Width"]));
    const bc=[cs.borderTopColor,cs.borderRightColor,cs.borderBottomColor,cs.borderLeftColor];
    if(bw.some(v=>v>0)){
      ctx.strokeStyle=bc[0]||"#000";ctx.lineWidth=Math.max(1,bw[0]*scale);
      if(bw[0]>0&&cs.borderTopStyle!=="none"){ctx.beginPath();ctx.moveTo(x*scale,y*scale);ctx.lineTo((x+r.width)*scale,y*scale);ctx.stroke();}
      if(bw[1]>0&&cs.borderRightStyle!=="none"){ctx.strokeStyle=bc[1]||ctx.strokeStyle;ctx.lineWidth=Math.max(1,bw[1]*scale);ctx.beginPath();ctx.moveTo((x+r.width)*scale,y*scale);ctx.lineTo((x+r.width)*scale,(y+r.height)*scale);ctx.stroke();}
      if(bw[2]>0&&cs.borderBottomStyle!=="none"){ctx.strokeStyle=bc[2]||ctx.strokeStyle;ctx.lineWidth=Math.max(1,bw[2]*scale);ctx.beginPath();ctx.moveTo(x*scale,(y+r.height)*scale);ctx.lineTo((x+r.width)*scale,(y+r.height)*scale);ctx.stroke();}
      if(bw[3]>0&&cs.borderLeftStyle!=="none"){ctx.strokeStyle=bc[3]||ctx.strokeStyle;ctx.lineWidth=Math.max(1,bw[3]*scale);ctx.beginPath();ctx.moveTo(x*scale,y*scale);ctx.lineTo(x*scale,(y+r.height)*scale);ctx.stroke();}
    }
  }
  for(const el of els){
    if(el.classList&&(el.classList.contains("mt-png-btn")||el.classList.contains("mt-print-btn")||el.classList.contains("print-btn")||el.classList.contains("back-btn")))continue;
    const cs=getComputedStyle(el);ctx.fillStyle=cs.color||"#222";ctx.font=fontFor(cs,scale);ctx.textAlign=cs.textAlign==="center"?"center":cs.textAlign==="right"?"right":"left";
    for(const node of directTextNodes(el)){
      const range=document.createRange();range.selectNodeContents(node);
      for(const rr of [...range.getClientRects()]){
        if(rr.width<=0||rr.height<=0)continue;
        let x=rr.left-rootRect.left;if(ctx.textAlign==="center")x+=rr.width/2;else if(ctx.textAlign==="right")x=rr.width;
        const y=rr.top-rootRect.top+Math.min(rr.height,px(cs.fontSize)*0.86);ctx.fillText(node.nodeValue.trim(),x*scale,y*scale);
      }
    }
    if(el instanceof HTMLInputElement||el instanceof HTMLTextAreaElement||el instanceof HTMLSelectElement){
      const value=el.value||el.options?.[el.selectedIndex]?.text||"";if(value){const r=el.getBoundingClientRect();ctx.fillText(value,(r.left-rootRect.left+4)*scale,(r.top-rootRect.top+px(cs.fontSize)*.86)*scale);}
    }
  }
  for(const img of [...root.querySelectorAll("img")].filter(visible)){
    const r=img.getBoundingClientRect();if(r.width>0&&r.height>0)await drawLocalImage(ctx,img,{x:r.left-rootRect.left,y:r.top-rootRect.top,w:r.width,h:r.height},scale);
  }
  return canvasToBlob(canvas);
}

async function renderPNG(root){
  if(window.html2canvas){
    try{
      const cv=await window.html2canvas(root,{scale:2,useCORS:true,allowTaint:false,backgroundColor:"#fff",logging:false,imageTimeout:5000});
      return canvasToBlob(cv);
    }catch(e){console.warn("html2canvas failed; using offline renderer",e);}
  }
  return renderOffline(root);
}

async function downloadPNG(target,name){
  const el=typeof target==="string"?document.querySelector(target):target;
  if(!el){alert("রিপোর্ট অংশটি পাওয়া যায়নি।");return;}
  const file=safeName(name);

  /* This MUST happen before any await. It preserves Chrome's user gesture. */
  let saveHandle=null;
  if(window.showSaveFilePicker){
    saveHandle=await pickSaveFile(file);
    if(saveHandle==="cancelled") return;
  }

  const btns=[...el.querySelectorAll(".mt-png-btn,.mt-print-btn,.print-btn,.back-btn")];
  const old=btns.map(b=>[b,b.style.display]);btns.forEach(b=>b.style.display="none");
  try{
    await waitImages(el);
    const blob=await renderPNG(el);
    if(!blob||blob.size<100)throw new Error("Empty PNG");
    if(saveHandle){
      await saveBlobToHandle(saveHandle,blob);
      alert("PNG ফাইল সফলভাবে সংরক্ষণ হয়েছে: "+file);
    }else{
      downloadBlob(blob,file);
    }
  }catch(e){
    console.error("Mahmud Telecom PNG error:",e);
    alert("PNG তৈরি/ডাউনলোড করা যায়নি। আবার চেষ্টা করুন।\nError: "+(e.message||e));
  }finally{old.forEach(x=>x[0].style.display=x[1]);}
}
window.MahmudReportTools={printPage:()=>window.print(),downloadPNG};
})();
