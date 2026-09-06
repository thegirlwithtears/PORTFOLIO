/* --- original: accordion + filters --- */
document.querySelectorAll(".row").forEach(row=>{
  row.addEventListener("click",()=>{
    const project=row.parentElement;
    const gallery=project.querySelector(".gallery");
    const opening=!project.classList.contains("open");
    project.classList.toggle("open");
    if(!gallery) return;

    if(opening){
      gallery.style.maxHeight=gallery.scrollHeight+"px";

      gallery.querySelectorAll("img").forEach(img=>{
        if(!img.complete){
          img.addEventListener("load",()=>{
            if(project.classList.contains("open")){
              gallery.style.maxHeight=gallery.scrollHeight+"px";
            }
          });
        }
      });

      gallery.querySelectorAll("video").forEach(video=>{
        if(video.readyState<1){
          video.addEventListener("loadedmetadata",()=>{
            if(project.classList.contains("open")){
              gallery.style.maxHeight=gallery.scrollHeight+"px";
            }
          });
        }
      });
    } else {
      gallery.style.maxHeight=null;
    }
  });
});
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  let f=b.dataset.filter;
  document.querySelectorAll(".project").forEach(p=>{
    p.style.display=f==="all"||p.dataset.type.includes(f)?"block":"none";
    p.classList.remove("open");
  });
}));
/* --- lightbox con navegación siguiente/anterior --- */
(function(){
  const lightbox=document.getElementById('lightbox');
  const lightboxImg=document.getElementById('lightboxImg');
  const prevBtn=document.getElementById('lightboxPrev');
  const nextBtn=document.getElementById('lightboxNext');
  if(!lightbox) return;

  let currentImages=[];
  let currentIndex=0;

  function show(){
    const img=currentImages[currentIndex];
    lightboxImg.src=img.src;
    lightboxImg.alt=img.alt;
  }
  function openAt(images,index){
    currentImages=images;
    currentIndex=index;
    show();
    lightbox.classList.add('open');
  }
  function close(){
    lightbox.classList.remove('open');
    lightboxImg.src='';
  }
  function next(){currentIndex=(currentIndex+1)%currentImages.length;show();}
  function prev(){currentIndex=(currentIndex-1+currentImages.length)%currentImages.length;show();}

  document.querySelectorAll('.gallery').forEach(gallery=>{
    const images=Array.from(gallery.querySelectorAll('img'));
    images.forEach((img,i)=>{
      img.addEventListener('click',()=>openAt(images,i));
    });
  });

  nextBtn.addEventListener('click',e=>{e.stopPropagation();next();});
  prevBtn.addEventListener('click',e=>{e.stopPropagation();prev();});
  lightbox.addEventListener('click',e=>{if(e.target===lightbox) close();});
  document.addEventListener('keydown',e=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key==='Escape') close();
    if(e.key==='ArrowRight') next();
    if(e.key==='ArrowLeft') prev();
  });
})();
/* --- custom cursor: a small dot + a lagging ring, desktop only --- */
(function(){
  const isFine=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if(!isFine) return;

  const dot=document.createElement("div");
  dot.className="cursor-dot";
  dot.setAttribute("aria-hidden","true");

  const ring=document.createElement("div");
  ring.className="cursor-ring";
  ring.setAttribute("aria-hidden","true");

  const label=document.createElement("span");
  label.className="cursor-label";
  label.textContent="VER";
  ring.appendChild(label);

  document.body.append(dot,ring);

  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener("mousemove",e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });

  (function loop(){
    rx+=(mx-rx)*.18;
    ry+=(my-ry)*.18;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a,button,.row").forEach(el=>{
    el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-hover"));
  });

  document.querySelectorAll(".main-img").forEach(el=>{
    el.addEventListener("mouseenter",()=>document.body.classList.add("cursor-view"));
    el.addEventListener("mouseleave",()=>document.body.classList.remove("cursor-view"));
  });
})();

/* --- reveal on scroll: classes added here, no HTML edits needed --- */
(function(){
  const targets=document.querySelectorAll(".project,.head,.about-grid>*,.contact>*");
  targets.forEach(el=>el.classList.add("reveal"));

  if(!("IntersectionObserver" in window)){
    targets.forEach(el=>el.classList.add("in-view"));
    return;
  }
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  },{threshold:.15});
  targets.forEach(el=>io.observe(el));
})();

/* --- subtle magnetic pull on nav links, filters and logo --- */
(function(){
  const isFine=window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  if(!isFine) return;

  document.querySelectorAll("nav a,.filters button,.logo").forEach(el=>{
    el.addEventListener("mousemove",e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2;
      const y=e.clientY-r.top-r.height/2;
      el.style.transform=`translate(${x*.3}px,${y*.4}px)`;
    });
    el.addEventListener("mouseleave",()=>{el.style.transform="";});
  });
})();
/* --- pantalla de carga (línea) + animación de escritura del nombre --- */
(function(){
  const line1=document.getElementById('typeLine1');
  const line2=document.getElementById('typeLine2');
  const loader=document.getElementById('loader');
  const loaderLine=document.getElementById('loaderLine');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeName(){
    if(!line1||!line2) return;
    const word1='JULIA', word2='FERNÁNDEZ';

    if(reduced){
      line1.textContent=word1;
      line2.textContent=word2;
      return;
    }

    const speed=90, pause=250;
    let i=0,j=0;
    line1.classList.add('typing');

    function typeWord1(){
      if(i<word1.length){
        line1.textContent+=word1[i];
        i++;
        setTimeout(typeWord1,speed);
      } else {
        line1.classList.remove('typing');
        setTimeout(function(){
          line2.classList.add('typing');
          typeWord2();
        },pause);
      }
    }

    function typeWord2(){
      if(j<word2.length){
        line2.textContent+=word2[j];
        j++;
        setTimeout(typeWord2,speed);
      } else {
        setTimeout(function(){line2.classList.remove('typing')},600);
      }
    }

    typeWord1();
  }

  if(!loader || reduced){
    if(loader) loader.remove();
    document.body.classList.remove('loading');
    typeName();
    return;
  }

  document.body.classList.add('loading');

setTimeout(function(){
    loader.classList.add('open');
    document.body.classList.remove('loading');
    typeName();
    setTimeout(function(){loader.remove()},900);
  },800);
})();