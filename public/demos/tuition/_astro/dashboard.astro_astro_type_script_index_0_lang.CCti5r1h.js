import{t as e}from"./supabase.DPHuoPeA.js";import{n as t,t as n}from"./format.B-9uZt33.js";var r=document.getElementById(`dashboard-loading`),i=document.getElementById(`dashboard-content`),a=document.getElementById(`welcome-heading`),o=document.getElementById(`profile-card`),s=document.getElementById(`enrollments-list`),c=document.getElementById(`logout-btn`);function l(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function u(e){o&&a&&(a.textContent=`Welcome back, ${e.full_name.split(` `)[0]||e.full_name}`,o.innerHTML=`
      <dl class="grid gap-4 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Name</dt>
          <dd class="mt-1 text-sm text-slate-700">${l(e.full_name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</dt>
          <dd class="mt-1 text-sm text-slate-700">${l(e.email)}</dd>
        </div>
        ${e.phone?`<div>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Phone</dt>
          <dd class="mt-1 text-sm text-slate-700">${l(e.phone)}</dd>
        </div>`:``}
        ${e.is_minor?`<div>
          <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Guardian</dt>
          <dd class="mt-1 text-sm text-slate-700">${l(e.guardian_name??``)}${e.guardian_phone?` &middot; ${l(e.guardian_phone)}`:``}</dd>
        </div>`:``}
      </dl>
    `)}function d(r){if(s){if(r.length===0){s.innerHTML=`
        <div class="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
          You are not enrolled in any classes yet.
          <a href="/demos/tuition/classes" class="font-semibold text-indigo-600 hover:text-indigo-700">Browse classes</a> to get started.
        </div>
      `;return}s.innerHTML=r.map(e=>{let r=e.classes;if(!r)return``;let i=[...r.schedule].sort((e,t)=>n.indexOf(e.day_of_week)-n.indexOf(t.day_of_week)||e.start_time.localeCompare(t.start_time));return`
          <div class="rounded-2xl border border-slate-200 p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">${l(r.subject)}</span>
                <h3 class="mt-2 text-lg font-semibold text-slate-900">${l(r.name)}</h3>
                ${r.instructors?.name?`<p class="mt-1 text-sm text-slate-500">Taught by ${l(r.instructors.name)}</p>`:``}
              </div>
              <button data-enrollment-id="${e.id}" class="drop-btn shrink-0 text-sm font-medium text-rose-600 hover:text-rose-700">Drop</button>
            </div>
            ${i.length>0?`<ul class="mt-4 space-y-1 border-t border-slate-100 pt-4 text-sm text-slate-600">
              ${i.map(e=>`<li>${e.day_of_week}, ${t(e.start_time)} - ${t(e.end_time)}${e.location?` &middot; ${l(e.location)}`:``}</li>`).join(``)}
            </ul>`:``}
          </div>
        `}).join(``),s.querySelectorAll(`.drop-btn`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.getAttribute(`data-enrollment-id`);n&&(t.disabled=!0,t.textContent=`Dropping…`,await e.from(`enrollments`).delete().eq(`id`,n),f())})})}}async function f(){let{data:t}=await e.auth.getSession(),n=t.session?.user;if(!n){window.location.href=`/demos/tuition/login`;return}let{data:a}=await e.from(`students`).select(`full_name, email, phone, is_minor, guardian_name, guardian_phone`).eq(`id`,n.id).maybeSingle(),{data:o}=await e.from(`enrollments`).select(`id, classes(id, name, subject, level, instructors(name), schedule(day_of_week, start_time, end_time, location))`).eq(`student_id`,n.id);a&&u(a),d(o??[]),r?.classList.add(`hidden`),i?.classList.remove(`hidden`)}c?.addEventListener(`click`,async()=>{await e.auth.signOut(),window.location.href=`/demos/tuition/login`}),f();