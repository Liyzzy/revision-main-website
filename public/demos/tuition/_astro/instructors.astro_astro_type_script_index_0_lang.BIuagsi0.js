import{t as e}from"./supabase.DPHuoPeA.js";import{r as t}from"./format.B-9uZt33.js";var n=document.getElementById(`instructors-status`),r=document.getElementById(`instructors-grid`),i=[`bg-indigo-600`,`bg-amber-500`,`bg-emerald-600`,`bg-rose-500`,`bg-sky-600`];function a(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function o(e){r&&(r.innerHTML=e.map((e,n)=>`
        <details class="group rounded-2xl border border-slate-200 p-6 open:shadow-sm">
          <summary class="flex cursor-pointer list-none items-start gap-4">
            <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${i[n%i.length]} text-lg font-bold text-white">
              ${a(t(e.name))}
            </span>
            <span class="flex-1">
              <span class="block font-semibold text-slate-900">${a(e.name)}</span>
              ${e.title?`<span class="block text-sm text-slate-500">${a(e.title)}</span>`:``}
              <span class="mt-2 flex flex-wrap gap-1.5">
                ${e.subjects.map(e=>`<span class="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">${a(e)}</span>`).join(``)}
              </span>
            </span>
            <svg class="mt-2 h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
            ${e.bio?`<p>${a(e.bio)}</p>`:``}
            ${e.qualifications?`<p class="text-slate-500">${a(e.qualifications)}</p>`:``}
            ${e.years_experience?`<p class="text-slate-500">${e.years_experience} years teaching experience</p>`:``}
          </div>
        </details>
      `).join(``))}async function s(){let{data:t,error:r}=await e.from(`instructors`).select(`id, name, title, subjects, bio, qualifications, years_experience`).order(`name`,{ascending:!0});if(r){console.error(`Supabase instructors query failed:`,r),n&&(n.textContent=`Instructors could not be loaded. Check that PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set in .env, and that sql/schema.sql has been run in your Supabase project.`);return}let i=t??[];n&&(n.textContent=i.length===0?`No instructors yet, add some in Supabase.`:``),o(i)}s();