import{t as e}from"./supabase.DPHuoPeA.js";import{n as t,t as n}from"./format.B-9uZt33.js";var r=document.getElementById(`schedule-status`),i=document.getElementById(`schedule-list`),a=document.getElementById(`subject-filters`),o=[],s=`All`;function c(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function l(){if(!i)return;let e=s===`All`?o:o.filter(e=>e.classes?.subject===s),r=new Map;for(let t of e){let e=r.get(t.day_of_week)??[];e.push(t),r.set(t.day_of_week,e)}let a=n.filter(e=>r.has(e));if(a.length===0){i.innerHTML=`<p class="text-sm text-slate-500">No classes match that filter.</p>`;return}i.innerHTML=a.map(e=>`
          <div>
            <h2 class="text-lg font-bold text-slate-900">${e}</h2>
            <div class="mt-3 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              ${[...r.get(e)??[]].sort((e,t)=>e.start_time.localeCompare(t.start_time)).map(e=>`
                <div class="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p class="font-semibold text-slate-900">${c(e.classes?.name??`Class`)}</p>
                    <p class="mt-1 text-sm text-slate-500">
                      ${e.classes?.instructors?.name?`Taught by ${c(e.classes.instructors.name)}`:``}
                      ${e.location?` &middot; ${c(e.location)}`:``}
                    </p>
                  </div>
                  <div class="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">${c(e.classes?.subject??``)}</span>
                    <span class="text-sm font-medium text-slate-700">${t(e.start_time)} - ${t(e.end_time)}</span>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        `).join(``)}function u(){a&&(a.innerHTML=[`All`,...Array.from(new Set(o.map(e=>e.classes?.subject).filter(e=>!!e)))].map(e=>`
        <button
          type="button"
          data-subject="${c(e)}"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition ${e===s?`border-indigo-600 bg-indigo-600 text-white`:`border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600`}"
        >${c(e)}</button>
      `).join(``),a.querySelectorAll(`button`).forEach(e=>{e.addEventListener(`click`,()=>{s=e.getAttribute(`data-subject`)??`All`,u(),l()})}))}async function d(){let{data:t,error:n}=await e.from(`schedule`).select(`id, day_of_week, start_time, end_time, location, classes(name, subject, instructors(name))`);if(n){console.error(`Supabase schedule query failed:`,n),r&&(r.textContent=`Schedule could not be loaded. Check that PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set in .env, and that sql/schema.sql has been run in your Supabase project.`);return}o=t??[],r&&(r.textContent=o.length===0?`No schedule yet, add class times in Supabase.`:``),u(),l()}d();