const menuBtn=document.querySelector(".menu-btn"),nav=document.querySelector(".nav");
menuBtn?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h>0?(scrollY/h)*100:0)+"%"},{passive:true});

document.getElementById("year").textContent=new Date().getFullYear();

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const filter=btn.dataset.filter;
    document.querySelectorAll(".work").forEach(item=>{
      const show=filter==="all"||item.dataset.category===filter;
      item.style.display=show?"block":"none";
    });
  });
});
