import{g as w}from"./supabase.Q5xbx09H.js";const n=document.querySelector("[data-inbox]"),p=document.querySelector("[data-counts]"),b=["new","contacted","scheduled","done","cancelled"],o=w(),s=d=>String(d??"").replace(/[&<>"']/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[l]),c=d=>`<p class="rounded-xl border border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">${d}</p>`;if(!o)n.innerHTML=c("Supabase is not configured yet. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file, then run the SQL in supabase/schema.sql."),p.remove();else{let d=[],l="all";const u={new:"bg-brand-50 text-brand-700 border-brand-200",contacted:"bg-amber-50 text-amber-700 border-amber-200",scheduled:"bg-violet-50 text-violet-700 border-violet-200",done:"bg-emerald-50 text-emerald-700 border-emerald-200",cancelled:"bg-slate-100 text-slate-500 border-slate-200"},m=e=>new Date(e).toLocaleString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}),f=e=>`
      <article class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-base font-bold text-brand-950">${s(e.name)}</h2>
              <span class="rounded-full border px-2.5 py-0.5 text-[11px] font-bold capitalize ${u[e.status]||u.new}">${s(e.status)}</span>
              ${e.urgency==="emergency"?'<span class="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-700">Emergency</span>':""}
            </div>
            <p class="mt-1 text-sm text-slate-500">
              ${s(e.trade)} &middot; ${s(e.area)} &middot; ${m(e.created_at)}
            </p>
          </div>
          <div class="flex gap-2">
            <a href="tel:${s(e.phone)}" class="rounded-lg bg-brand-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-brand-800">Call</a>
            <a href="https://wa.me/${s(String(e.phone).replace(/\D/g,""))}" target="_blank" rel="noopener" class="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700">WhatsApp</a>
          </div>
        </div>

        <dl class="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          <div><dt class="text-xs text-slate-400">Phone</dt><dd class="font-medium text-slate-700">${s(e.phone)}</dd></div>
          <div><dt class="text-xs text-slate-400">Email</dt><dd class="font-medium break-all text-slate-700">${s(e.email||"—")}</dd></div>
          <div><dt class="text-xs text-slate-400">Preferred date</dt><dd class="font-medium text-slate-700">${s(e.preferred_date||"Any")}</dd></div>
        </dl>

        ${e.message?`<p class="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">${s(e.message)}</p>`:""}

        <div class="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <label class="text-xs font-semibold text-slate-500">Status</label>
          <select data-set-status="${e.id}" class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm capitalize outline-none focus:border-brand-600">
            ${b.map(t=>`<option value="${t}" ${t===e.status?"selected":""}>${t}</option>`).join("")}
          </select>
        </div>
      </article>`,i=()=>{const e=l==="all"?d:d.filter(t=>t.status===l);p.innerHTML=b.map(t=>{const a=d.filter(r=>r.status===t).length;return`<div class="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p class="text-xs text-slate-400 capitalize">${t}</p>
            <p class="mt-0.5 text-xl font-extrabold text-brand-950">${a}</p>
          </div>`}).join(""),n.innerHTML=e.length?e.map(f).join(""):c("Nothing here yet."),n.querySelectorAll("[data-set-status]").forEach(t=>{t.addEventListener("change",async()=>{const a=t.dataset.setStatus,r=t.value,{error:v}=await o.from("booking_requests").update({status:r}).eq("id",a);if(v){alert("Could not update that. Please try again.");return}const x=d.find(y=>y.id===a);x&&(x.status=r),i()})})},g=async()=>{const{data:e,error:t}=await o.from("booking_requests").select("*").order("created_at",{ascending:!1}).limit(200);if(t){n.innerHTML=c("Could not load bookings. Check that you are signed in and the table exists.");return}d=e||[],i()},h=async()=>{const{data:e}=await o.auth.getSession();if(!e.session){window.location.replace("/demos/maintenance/admin/login");return}document.querySelector("[data-user-email]").textContent=e.session.user.email,g()};document.querySelectorAll("[data-status-filter]").forEach(e=>{e.addEventListener("click",()=>{l=e.dataset.statusFilter,document.querySelectorAll("[data-status-filter]").forEach(t=>{const a=t===e;t.classList.toggle("border-brand-700",a),t.classList.toggle("bg-brand-700",a),t.classList.toggle("text-white",a),t.classList.toggle("border-slate-200",!a),t.classList.toggle("bg-white",!a),t.classList.toggle("text-slate-600",!a)}),i()})}),document.querySelector("[data-refresh]")?.addEventListener("click",g),document.querySelector("[data-signout]")?.addEventListener("click",async()=>{await o.auth.signOut(),window.location.replace("/demos/maintenance/admin/login")}),h()}
