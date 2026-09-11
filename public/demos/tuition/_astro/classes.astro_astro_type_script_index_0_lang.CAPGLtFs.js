import{t as e}from"./supabase.DPHuoPeA.js";var t=document.getElementById(`classes-status`),n=document.getElementById(`classes-grid`),r=document.getElementById(`subject-filters`),i=[],a=`All`;function o(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function s(){n&&(n.innerHTML=(a===`All`?i:i.filter(e=>e.subject===a)).map(e=>`
        <div class="rounded-2xl border border-slate-200 p-6">
          <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">${o(e.subject)}</span>
          <h3 class="mt-3 text-lg font-semibold text-slate-900">${o(e.name)}</h3>
          ${e.level?`<p class="mt-1 text-sm text-slate-500">${o(e.level)}</p>`:``}
          ${e.description?`<p class="mt-3 text-sm text-slate-600">${o(e.description)}</p>`:``}
          ${e.instructors?.name?`<p class="mt-4 text-xs font-medium text-slate-500">Taught by ${o(e.instructors.name)}</p>`:``}
          <a href="/demos/tuition/schedule" class="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">See schedule &rarr;</a>
        </div>
      `).join(``))}function c(){r&&(r.innerHTML=[`All`,...Array.from(new Set(i.map(e=>e.subject)))].map(e=>`
        <button
          type="button"
          data-subject="${o(e)}"
          class="rounded-full border px-4 py-1.5 text-sm font-medium transition ${e===a?`border-indigo-600 bg-indigo-600 text-white`:`border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600`}"
        >${o(e)}</button>
      `).join(``),r.querySelectorAll(`button`).forEach(e=>{e.addEventListener(`click`,()=>{a=e.getAttribute(`data-subject`)??`All`,c(),s()})}))}async function l(){let{data:n,error:r}=await e.from(`classes`).select(`id, name, subject, level, description, instructors(name)`).order(`subject`,{ascending:!0});if(r){console.error(`Supabase classes query failed:`,r),t&&(t.textContent=`Classes could not be loaded. Check that PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set in .env, and that sql/schema.sql has been run in your Supabase project.`);return}i=n??[],t&&(t.textContent=i.length===0?`No classes yet, add some in Supabase.`:``),c(),s()}l();