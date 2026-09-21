const WHATSAPP_NUMBER="5562992288422";

function whatsappLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".js-whatsapp").forEach(link=>{
  const message=link.dataset.message || "Olá! Vi seu site e gostaria de saber mais sobre seus serviços.";
  link.href=whatsappLink(message);
  link.target="_blank";
  link.rel="noopener noreferrer";
});

const menuToggle=document.querySelector(".menu-toggle");
const menu=document.querySelector("#main-menu");
if(menuToggle && menu){
  menuToggle.addEventListener("click",()=>{
    const open=menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(open));
    document.body.classList.toggle("menu-open",open);
  });
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded","false");
    document.body.classList.remove("menu-open");
  }));
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter");
const portfolioItems=document.querySelectorAll(".portfolio-item");
filters.forEach(filter=>{
  filter.addEventListener("click",()=>{
    filters.forEach(f=>f.classList.remove("active"));
    filter.classList.add("active");
    const value=filter.dataset.filter;
    portfolioItems.forEach(item=>{
      const show=value==="all" || item.dataset.category===value;
      item.hidden=!show;
    });
  });
});

const modal=document.querySelector("#portfolio-modal");
const modalImage=document.querySelector("#modal-image");
const modalPlaceholder=document.querySelector("#modal-placeholder");
const modalTitle=document.querySelector("#modal-title");
const modalClose=document.querySelector(".modal-close");

portfolioItems.forEach(item=>{
  item.addEventListener("click",()=>{
    const src=item.dataset.src;
    modalTitle.textContent=item.dataset.title || "Projeto ZENIXZ";
    if(src){
      modalImage.src=src;
      modalImage.alt=item.dataset.title || "Trabalho do portfólio ZENIXZ";
      modalImage.style.display="block";
      modalPlaceholder.style.display="none";
    }else{
      modalImage.removeAttribute("src");
      modalImage.style.display="none";
      modalPlaceholder.style.display="block";
      modalPlaceholder.textContent="Adicione a imagem deste projeto no atributo data-src.";
      modalPlaceholder.style.color="#a1a1aa";
      modalPlaceholder.style.padding="80px 20px";
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
modalClose?.addEventListener("click",closeModal);
modal?.addEventListener("click",e=>{if(e.target===modal) closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape" && modal?.classList.contains("open")) closeModal()});

document.querySelector("#year").textContent=new Date().getFullYear();
