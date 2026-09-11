import{g as i}from"./supabase.Q5xbx09H.js";const s=t=>String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),c=t=>t.split(" ").map(e=>e[0]).join("").slice(0,2).toUpperCase(),d=t=>`<svg class="h-4 w-4 ${t?"":"text-slate-200"}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5z"/></svg>`,u=t=>`
    <figure class="flex h-full w-[85vw] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:w-[22rem] lg:w-auto">
      <div class="flex items-center gap-1 text-accent-500">
        ${Array.from({length:5},(e,o)=>d(o<t.rating)).join("")}
      </div>
      <blockquote class="mt-4 flex-1 text-sm leading-relaxed text-slate-700">"${s(t.quote)}"</blockquote>
      <figcaption class="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        ${t.photo?`<img src="${s(t.photo)}" alt="${s(t.name)}" class="h-11 w-11 rounded-full object-cover" />`:`<span class="grid h-11 w-11 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">${s(c(t.name))}</span>`}
        <div class="min-w-0">
          <p class="truncate text-sm font-bold text-brand-950">${s(t.name)}</p>
          <p class="truncate text-xs text-slate-500">${s(t.town)} &middot; ${s(t.trade)}</p>
        </div>
      </figcaption>
    </figure>`,m=async()=>{const t=i();if(!t)return;const e=document.querySelectorAll("[data-testimonials-root]");if(!e.length)return;const{data:o,error:a}=await t.from("testimonials").select("name, town, trade, rating, quote, photo").eq("published",!0).order("sort_order",{ascending:!0}).limit(24);a||!o||!o.length||e.forEach(r=>{const l=r.querySelector("[data-testimonials-list]"),n=r.dataset.layout==="grid"?o:o.slice(0,6);l.innerHTML=n.map(u).join("")})};m();
