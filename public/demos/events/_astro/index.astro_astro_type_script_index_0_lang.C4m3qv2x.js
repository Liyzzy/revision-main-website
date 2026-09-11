import{n as e,t}from"./supabase.DN9TGFjf.js";var n=document.getElementById(`admin-root`),r=JSON.parse(n.dataset.events),i=document.getElementById(`admin-login`),a=document.getElementById(`admin-panel`),o=document.getElementById(`event-picker`),s=document.getElementById(`login-note`);e||(s.textContent=`Supabase is not configured yet. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to .env, run supabase/schema.sql, then create a host account in the Supabase dashboard.`,s.classList.remove(`hidden`),document.getElementById(`login-form`).querySelector(`button`).disabled=!0);for(let e of r){let t=document.createElement(`option`);t.value=e.slug,t.textContent=e.title,o.appendChild(t)}function c(e){return String(e??``).replace(/[<>&"]/g,e=>({"<":`&lt;`,">":`&gt;`,"&":`&amp;`,'"':`&quot;`})[e])}function l(e,t,n){return`<div class="rounded-3xl border border-ink-200 bg-white p-6">
      <p class="text-xs uppercase tracking-widest text-ink-400">${c(e)}</p>
      <p class="font-display mt-2 text-4xl text-brand-600">${c(t)}</p>
      ${n?`<p class="mt-1 text-xs text-ink-400">${c(n)}</p>`:``}
    </div>`}async function u(e){let n=r.find(t=>t.slug===e),[i,a,s]=await Promise.all([t.from(`rsvps`).select(`*`).eq(`event_slug`,e).order(`created_at`,{ascending:!1}),t.from(`wishes`).select(`*`).eq(`event_slug`,e).order(`created_at`,{ascending:!1}),t.from(`contributions`).select(`*`).eq(`event_slug`,e).order(`created_at`,{ascending:!1})]),f=i.data??[],p=a.data??[],m=s.data??[],h={};for(let e of n.sessions)h[e.id]=0;for(let e of f)for(let t of e.sessions??[])h[t.session_id]!==void 0&&(h[t.session_id]+=t.pax);let g=f.reduce((e,t)=>e+(t.total_pax??0),0),_=m.reduce((e,t)=>e+(t.amount??0),0);document.getElementById(`stat-row`).innerHTML=[l(`Responses`,f.length,`individual replies`),l(`Total pax`,g,`across all sessions`),l(`Wishes`,p.length,`${p.filter(e=>!e.published).length} awaiting approval`),l(n.ticketed?`Payments`:`Contributions`,`RM ${_.toFixed(0)}`,`${m.length} entries`)].join(``);let v=n.sessions.map(e=>`<div class="rounded-2xl border border-ink-200 bg-ink-50 px-5 py-4">
          <p class="text-sm font-medium text-ink-900">${c(e.name)}</p>
          <p class="font-display text-3xl text-brand-600">${h[e.id]}</p>
          <p class="text-xs text-ink-400">pax confirmed</p>
        </div>`).join(``),y=f.length?f.map(e=>{let t=(e.sessions??[]).map(e=>`${c(n.sessions.find(t=>t.id===e.session_id)?.name??e.session_id)} (${e.pax})`).join(`, `);return`<tr class="border-t border-ink-200">
              <td class="px-4 py-3 text-sm">${c(e.guest_name)}<div class="text-xs text-ink-400">${c(e.phone)}</div></td>
              <td class="px-4 py-3 text-sm text-ink-600">${t}</td>
              <td class="px-4 py-3 text-center text-sm font-medium">${c(e.total_pax)}</td>
              <td class="px-4 py-3 text-sm text-ink-600">${c(e.meal??``)}</td>
              <td class="px-4 py-3 text-sm text-ink-600">${c(e.note??``)}</td>
            </tr>`}).join(``):`<tr><td colspan="5" class="px-4 py-8 text-center text-sm text-ink-400">No responses yet.</td></tr>`;document.getElementById(`panel-rsvps`).innerHTML=`
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${v}</div>
      <div class="mt-5 flex justify-end">
        <button id="export-csv" class="rounded-full border border-ink-200 px-4 py-2 text-sm text-ink-600">Export CSV</button>
      </div>
      <div class="mt-3 overflow-x-auto rounded-3xl border border-ink-200 bg-white">
        <table class="w-full min-w-[720px]">
          <thead class="bg-ink-100 text-left text-xs uppercase tracking-widest text-ink-400">
            <tr><th class="px-4 py-3">Guest</th><th class="px-4 py-3">Sessions</th><th class="px-4 py-3 text-center">Pax</th><th class="px-4 py-3">Meal</th><th class="px-4 py-3">Note</th></tr>
          </thead>
          <tbody>${y}</tbody>
        </table>
      </div>`,document.getElementById(`export-csv`).addEventListener(`click`,()=>d(f,n)),document.getElementById(`panel-wishes`).innerHTML=p.length?p.map(e=>`<div class="mb-3 rounded-2xl border border-ink-200 bg-white p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-medium text-ink-900">${c(e.name)}</p>
                  <p class="mt-1 text-sm text-ink-600">${c(e.message)}</p>
                </div>
                <button data-wish="${e.id}" data-published="${e.published}" class="wish-toggle shrink-0 rounded-full px-3 py-1.5 text-xs ${e.published?`bg-ink-100 text-ink-600`:`bg-brand-600 text-white`}">
                  ${e.published?`Hide`:`Approve`}
                </button>
              </div>
            </div>`).join(``):`<p class="rounded-3xl border border-ink-200 bg-white p-8 text-center text-sm text-ink-400">No wishes yet.</p>`;for(let e of document.querySelectorAll(`.wish-toggle`))e.addEventListener(`click`,async()=>{let n=e.dataset.published!==`true`;await t.from(`wishes`).update({published:n}).eq(`id`,e.dataset.wish),u(o.value)});document.getElementById(`panel-contributions`).innerHTML=m.length?`<div class="overflow-x-auto rounded-3xl border border-ink-200 bg-white">
          <table class="w-full min-w-[560px]">
            <thead class="bg-ink-100 text-left text-xs uppercase tracking-widest text-ink-400">
              <tr><th class="px-4 py-3">From</th><th class="px-4 py-3">Amount</th><th class="px-4 py-3">Reference</th><th class="px-4 py-3">Message</th></tr>
            </thead>
            <tbody>${m.map(e=>`<tr class="border-t border-ink-200">
                  <td class="px-4 py-3 text-sm">${c(e.name)}</td>
                  <td class="px-4 py-3 text-sm font-medium">${e.amount?`RM `+c(e.amount):`—`}</td>
                  <td class="px-4 py-3 text-sm text-ink-600">${c(e.reference??``)}</td>
                  <td class="px-4 py-3 text-sm text-ink-600">${c(e.message??``)}</td>
                </tr>`).join(``)}</tbody>
          </table>
        </div>`:`<p class="rounded-3xl border border-ink-200 bg-white p-8 text-center text-sm text-ink-400">Nothing recorded yet.</p>`}function d(e,t){let n=[[`Name`,`Phone`,`Email`,`Total pax`,...t.sessions.map(e=>e.name),`Meal`,`Note`],...e.map(e=>{let n=t.sessions.map(t=>(e.sessions??[]).find(e=>e.session_id===t.id)?.pax??0);return[e.guest_name,e.phone,e.email??``,e.total_pax,...n,e.meal??``,e.note??``]})].map(e=>e.map(e=>`"${String(e).replace(/"/g,`""`)}"`).join(`,`)).join(`
`),r=URL.createObjectURL(new Blob([n],{type:`text/csv`})),i=document.createElement(`a`);i.href=r,i.download=`${t.slug}-guest-list.csv`,i.click(),URL.revokeObjectURL(r)}function f(e){for(let t of document.querySelectorAll(`.tab`)){let n=t.dataset.panel===e;t.className=`tab rounded-full px-4 py-2 text-sm ${n?`bg-brand-600 text-white`:`border border-ink-200 text-ink-600`}`,document.getElementById(`panel-${t.dataset.panel}`).classList.toggle(`hidden`,!n)}}for(let e of document.querySelectorAll(`.tab`))e.addEventListener(`click`,()=>f(e.dataset.panel));f(`rsvps`);async function p(){if(!e)return;let{data:n}=await t.auth.getSession(),r=!!n.session;i.classList.toggle(`hidden`,r),a.classList.toggle(`hidden`,!r),r&&u(o.value)}document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let n=new FormData(e.target),r=document.getElementById(`login-status`),{error:i}=await t.auth.signInWithPassword({email:n.get(`email`),password:n.get(`password`)});if(i){r.textContent=`Wrong email or password.`,r.style.color=`#b91c1c`,r.classList.remove(`hidden`);return}r.classList.add(`hidden`),p()}),document.getElementById(`sign-out`).addEventListener(`click`,async()=>{await t.auth.signOut(),p()}),o.addEventListener(`change`,()=>u(o.value)),p();