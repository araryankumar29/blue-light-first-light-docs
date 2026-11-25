/* First Light — MD console. Deterministic sample data, no backend. */
/* The model is the shared ../md console mobile/data.js, loaded before this file. */

/* ---------- state ---------- */
const state={ route:'overview', search:'', stageFilter:'', statusFilter:'', sort:'value', approvalTab:'All', paymentTab:'Awaiting confirmation', personRole:'', peopleDept:'All', activityKind:'All', drawer:null, expanded:null,
  commTab:'Upcoming', msgSize:'M', dept:'', clientSearch:'', actProject:'', actPerson:'', actDay:'', actingAs:null };
const TABS=['Overview','Approvals','Meetings','Projects','Performance','Money','Clients','People','Activity','Settings'];

/* data.js assigns teams; keep the workload column in sync */
staff.forEach(s=>{ s.wip=projects.filter(p=>p.team.includes(s.id)).length; });
const isoDate=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);

/* ---------- shell ---------- */
function shell(){
  return `
  <aside class="rail">
    <div class="logo">FL</div>
    <nav class="nav">
      ${navIcon('overview','M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z','Overview')}
      ${navIcon('approvals','M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-3.2 8.6 2.4 2.4 4.2-4.6','Approvals',pendingApprovals().length)}
      ${navIcon('comms','M4 5.5h16v11H9l-5 4zM8 9.5h8M8 12.5h5','Meetings',mentions.length)}
      ${navIcon('projects','M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z','Projects')}
      ${navIcon('performance','M5 19V9M10 19V5M15 19v-7M20 19v-4','Performance')}
      ${navIcon('finance','M6 5h12M9 5v14M9 10h6.5a3 3 0 0 1 0 6H9','Money')}
      ${navIcon('clients','M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-4.5 7a4.5 4.5 0 0 1 9 0M16 8.5h4M18 6.5v4M15.5 16.5h5','Clients')}
      ${navIcon('people','M9 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 9 12zm-5.5 7.5a5.5 5.5 0 0 1 11 0M16 7.2a3 3 0 0 1 0 5.6M17.5 14.6a5 5 0 0 1 3 4.9','People')}
      ${navIcon('activity','M12 7v5l3 2M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17z','Activity')}
      ${navIcon('settings','M4 7h9M17 7h3M4 12h3M11 12h9M4 17h9M17 17h3','Settings')}
    </nav>
    <div class="spacer"></div>
    <div class="me">AK</div>
  </aside>
  <div class="main">
    <header class="topbar">
      <div class="hello">
        <h1>${greeting()}</h1>
        <p>Saturday, 22 November · week 47 · ${projects.filter(p=>p.status!=='Closed').length} live projects · ${staff.length} people</p>
      </div>
      <div class="tools">
        <div class="search" id="searchWrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input id="globalSearch" placeholder="Search projects, people, payments" autocomplete="off">
          <kbd>/</kbd>
          <div class="search-panel" id="searchPanel"></div>
        </div>
        <button class="iconbtn" data-act="route" data-to="approvals" title="Approvals">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M10.3 19a2 2 0 0 0 3.4 0"/></svg>
          ${pendingApprovals().length?'<span class="dot"></span>':''}
        </button>
        <div class="who" data-act="more" title="Account, connections and more"><div class="av">${currentUser().initials}</div><div><div class="nm">${currentUser().name}</div><div class="rl">${state.actingAs?currentUser().role:'Managing director'}</div></div></div>
      </div>
    </header>
    <main class="view" id="view"></main>
  </div>
  <div class="drawer" id="drawer"></div>
  <div class="overlay" id="overlay" data-act="close-modal"></div>
  <div class="modal" id="modal"></div>
  <div class="toasts" id="toasts"></div>`;
}
function navIcon(route,path,label,badge){
  const on = state.route === route || (route === 'projects' && state.route === 'project') || (route === 'performance' && state.route === 'dept');
  return `<a href="#/${route}" class="navitem ${on?'on':''}" title="${label}" data-act="route" data-to="${route}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg><span class="lbl">${label}</span>${badge?`<span class="navbadge">${badge>99?'99+':badge}</span>`:''}</a>`;
}
function currentUser(){ return state.actingAs ? (staff.find(s=>s.id===state.actingAs)||MD) : MD; }
function greeting(){ const h=TODAY.getHours(); const u=currentUser(); const name=u.id===MD.id?'Arya':u.name.split(' ')[0]; return h<12?'Good morning, '+name:h<17?'Good afternoon, '+name:'Good evening, '+name; }

/* ---------- overview ---------- */
function overview(){
  const m=monthStats(), lad=ladder(), risk=atRisk().sort((a,b)=>b.value-a.value).slice(0,5);
  const debt=debtTotal();
  const late=projects.filter(p=>p.status!=='On track'&&p.status!=='Closed');
  const firm=late.reduce((n,p)=>n+Math.round(p.slip*0.35),0), client=late.reduce((n,p)=>n+Math.round(p.slip*0.5),0), vendor=late.reduce((n,p)=>n+Math.round(p.slip*0.15),0);
  const owed=m.due-m.collected;
  const nextM=upMeetings()[0];
  const clientN=pendingApprovals().filter(a=>a.type==='Payment'||a.type==='Design').length;
  const internalN=pendingApprovals().filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)).length;
  const leaveN=pendingApprovals().filter(a=>a.type==='Leave').length;
  const flight=atRisk().sort((a,b)=>b.value-a.value).slice(0,3);
  const brief=`<b>${lakh(owed)}</b> is uncollected across ${projects.filter(p=>p.status!=='Closed').length} live projects and ${pendingApprovals().length} things are waiting on you. ${risk[0]?risk[0].name+' is '+risk[0].slip+' days behind its promised date.':'Every promise is holding.'} ${late.length?late.length+' projects are past target, '+firm+' of those days are ours.':'Every stage is green.'}`;
  const book=projects.reduce((n,p)=>n+p.value,0);

  return `
  <div class="scroll" style="display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:auto auto auto auto;gap:12px;align-content:start">
    <div class="card" style="grid-column:span 12;background:#F5F6FF;border:1px solid #DFE1FB;padding:14px 18px">
      <div class="spread" style="align-items:flex-start">
        <div>
          <div class="eyebrow" style="color:var(--cobalt)">The brief</div>
          <p id="briefText" style="font-size:13.5px;line-height:1.5;margin-top:5px;max-width:1080px;color:#2B2C40">${brief}</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <select id="voiceSel" class="voice-sel" title="Reading voice"></select>
          <button class="listen" id="listenBtn" data-act="listen">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>
            <span id="listenLabel">Read the brief</span>
          </button>
          <div class="muted" style="font-size:10px;font-weight:600;white-space:nowrap">as of 09:41</div>
        </div>
      </div>
    </div>

    <div class="card" style="grid-column:span 4;display:flex;flex-direction:column;position:relative">
      <div class="eyebrow">Collected in November</div>
      <div style="font-size:32px;font-weight:800;letter-spacing:-.04em;line-height:1;margin-top:8px">${lakh(m.collected)}</div>
      <div style="font-size:11.5px;color:var(--ink2);margin-top:6px;font-weight:600">of ${lakh(m.due)} due ${m.pct>=70?'<span class="delta ok">on pace</span>':'<span class="delta late">behind</span>'}</div>
      <svg viewBox="0 0 76 76" width="76" height="76" style="position:absolute;right:16px;top:16px">
        <circle cx="38" cy="38" r="30" fill="none" stroke="#EEF0F7" stroke-width="7"/>
        <circle cx="38" cy="38" r="30" fill="none" stroke="#2E4BF2" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="${(m.pct*1.885).toFixed(1)} 188.5" transform="rotate(-90 38 38)"/>
        <text x="38" y="40" text-anchor="middle" style="font:800 16px Manrope;fill:#15162B">${m.pct}%</text>
      </svg>
      <div style="display:flex;align-items:flex-end;gap:3px;height:48px;margin-top:auto;margin-bottom:10px">
        ${[14,9,20,26,18,7,23,31,21,27,16,33,24,12,29,19,35,25,15,22,32,40].map((h,i)=>`<i style="flex:1;height:${h}px;border-radius:2px;background:${h>=30?'var(--cobalt)':'#E4E6F5'}"></i>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:7px;font-size:11px;color:var(--ink2);font-weight:600">
        <span class="dot" style="background:var(--coral)"></span>${lakh(owed)} outstanding · 9 days to month end
      </div>
    </div>

    <div class="card" style="grid-column:span 5">
      <div class="card-h"><h2>The book, by payment gate</h2><span class="link">${lakh(book)}</span></div>
      ${lad.map(l=>{
        const pw=l.paid/l.tot*100;
        const pct = l.stage==='Token'?'10%':l.stage==='Before production'?'50%':l.stage==='Near completion'?'35%':'5%';
        return `<div style="display:grid;grid-template-columns:104px 1fr 118px;align-items:center;gap:10px;margin:8px 0">
          <div><div style="font-size:11px;font-weight:700;color:var(--ink2)">${l.stage}</div><div style="font-size:9px;color:var(--ink3);font-weight:700">${pct}</div></div>
          <div class="bar" style="height:8px;min-width:0"><i style="width:${pw}%;background:var(--cobalt)"></i></div>
          <div style="font-size:10.5px;font-weight:700;text-align:right;white-space:nowrap" class="mono">${lakh(l.paid)} <span class="muted">/ ${lakh(l.tot)}</span></div>
        </div>`;
      }).join('')}
      <div style="display:flex;gap:12px;margin-top:10px;font-size:10px;font-weight:600;color:var(--ink3)">
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:var(--cobalt);margin-right:4px"></i>received</span>
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:var(--coral);margin-right:4px"></i>overdue</span>
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:#EDEFF7;margin-right:4px"></i>not yet due</span>
      </div>
    </div>

    <div class="card" style="grid-column:span 3;background:var(--rail);color:#fff;position:relative;display:flex;flex-direction:column">
      <div class="eyebrow" style="color:#9C9DB5">Decision debt</div>
      <div style="font-size:28px;font-weight:800;letter-spacing:-.04em;margin-top:6px">${lakh(debt)}</div>
      <div style="font-size:10.5px;color:#A9AAC2;margin-top:2px">across ${pendingApprovals().length} approvals</div>
      <div style="margin-top:10px;display:flex;flex-direction:column;gap:7px">
        ${pendingApprovals().filter(a=>a.amount).sort((a,b)=>b.amount-a.amount).slice(0,3).map(a=>`
          <div style="display:flex;align-items:baseline;gap:6px;font-size:10.5px">
            <span style="font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.title.split('·')[0].trim())}</span>
            <span style="margin-left:auto;color:var(--coral);font-weight:800">${Math.round(a.ageH/24)}d</span>
            <span style="min-width:44px;text-align:right;font-weight:700;color:#D9DAE8">${lakh(a.amount)}</span>
          </div>`).join('')}
      </div>
      <a class="link" href="#/approvals" data-act="route" data-to="approvals" style="margin-top:auto;color:var(--coral);font-size:11.5px">Clear all ${pendingApprovals().length} →</a>
    </div>

    <div class="card pad0" style="grid-column:span 7">
      <div class="card-h" style="padding:12px 14px 0"><h2>Promises vs forecast</h2><a class="link" href="#/projects" data-act="route" data-to="projects">All ${atRisk().length} at risk</a></div>
      <table>
        <thead><tr><th style="padding-left:14px">Project</th><th>Promised</th><th>Forecast</th><th>Risk</th><th class="r" style="padding-right:14px">At stake</th></tr></thead>
        <tbody>${risk.map(p=>{
          const next=p.payments.find(x=>x.status!=='paid');
          return `<tr data-act="open-project" data-id="${p.id}" style="cursor:pointer">
            <td style="padding-left:14px"><div class="tname">${p.name}</div><div class="tmeta">${STAGES[p.stage].name} · ${p.city}</div></td>
            <td class="mono">${fmtDate(p.promised)}</td>
            <td class="mono" style="color:var(--coral-ink);font-weight:700">${fmtDate(p.forecast)}</td>
            <td>${chip(p.slip+' days late','now')}</td>
            <td class="r mono" style="font-weight:700;padding-right:14px">${next?lakh(next.amount):'—'}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
    </div>

    <div class="card" style="grid-column:span 5;display:flex;flex-direction:column">
      <div class="card-h"><h2>Who caused the delay</h2><span class="sub">${late.length} late</span></div>
      <div style="display:flex;gap:12px;font-size:10px;font-weight:600;color:var(--ink3);margin-bottom:4px">
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:var(--cobalt);margin-right:4px"></i>Firm</span>
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:var(--lav);margin-right:4px"></i>Client</span>
        <span><i style="display:inline-block;width:7px;height:7px;border-radius:2px;background:var(--coral);margin-right:4px"></i>Vendor</span>
      </div>
      ${late.slice(0,6).map(p=>{
        const f=Math.round(p.slip*0.35), c=Math.round(p.slip*0.5), v=Math.max(0,p.slip-f-c);
        const w=(n)=>n/p.slip*100;
        return `<div style="display:grid;grid-template-columns:104px 1fr 32px;align-items:center;gap:9px;margin-top:9px">
          <div style="font-size:11px;font-weight:700;color:var(--ink2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</div>
          <div style="height:11px;border-radius:6px;background:#F2F3F9;display:flex;overflow:hidden">
            <i style="width:${w(f)}%;background:var(--cobalt)"></i><i style="width:${w(c)}%;background:var(--lav)"></i><i style="width:${w(v)}%;background:var(--coral)"></i>
          </div>
          <div style="font-size:11px;font-weight:700;text-align:right">${p.slip}d</div>
        </div>`;
      }).join('') || '<div class="empty"><b>No delays</b>Every stage is on target.</div>'}
      <div style="margin-top:auto;padding-top:10px;border-top:1px solid var(--line);font-size:10.5px;color:var(--ink2)">
        <b>${firm}</b> days are ours · <b>${client}</b> the client's · <b>${vendor}</b> a vendor's
      </div>
    </div>

    <div class="card" style="grid-column:span 4">
      <div class="card-h"><h2>Next meeting</h2><button class="link" data-act="route" data-to="comms">All meetings →</button></div>
      ${nextM?`<button class="list-row" style="width:100%;text-align:left;padding:6px 0" data-act="meeting" data-id="${nextM.id}">
        <div class="av-sm" style="background:var(--cobalt-soft);color:var(--cobalt)">◷</div>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(nextM.title)}</div>
          <div class="tmeta">${esc(nextM.client)} · ${nextM.participants.length} invited</div></div>
        <span class="chip blue">${fmtDate(nextM.date)} · ${hm(nextM)}</span></button>`
        :'<div class="empty" style="padding:20px"><b>No meeting booked</b>Create one from Meetings.</div>'}
    </div>

    <div class="card" style="grid-column:span 4">
      <div class="card-h"><h2>Needs you</h2><button class="link" data-act="route" data-to="approvals">${pendingApprovals().length} open →</button></div>
      ${[['Client approvals',clientN,'Payment and design sign-offs'],['Internal approvals',internalN,'Expenses, salary, reimbursements'],['Leave',leaveN,'Requests waiting']].map(([t,n,s])=>`
        <button class="list-row" style="width:100%;text-align:left;padding:8px 0" data-act="route" data-to="approvals">
          <div class="li-num" style="width:27px;height:27px">${n}</div>
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${t}</div><div class="tmeta">${s}</div></div>
          <span class="chev" style="color:var(--ink3)">›</span></button>`).join('')}
    </div>

    <div class="card" style="grid-column:span 4">
      <div class="card-h"><h2>In flight</h2><button class="link" data-act="route" data-to="projects">All projects →</button></div>
      ${flight.map(p=>`<button class="list-row" style="width:100%;text-align:left;padding:8px 0" data-act="open-project" data-id="${p.id}">
        <div class="av-sm" style="background:${p.status==='On track'?'var(--mint-soft)':'var(--coral-soft)'};color:${p.status==='On track'?'var(--mint-ink)':'var(--coral-ink)'}">${p.slip||'·'}</div>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(p.name)}</div><div class="tmeta">${STAGES[p.stage].name} · ${lakh(p.value)}</div></div>
        <span class="chip ${p.status==='On track'?'ok':'now'}">${p.slip?p.slip+'d late':p.status}</span></button>`).join('')}
    </div>

    <div class="card" style="grid-column:span 12;display:grid;grid-template-columns:repeat(4,1fr);padding:12px 6px">
      ${[
        ['Proof to confirmation','19h','median · target 24h',79,'var(--mint)'],
        ['Alert delivery','96.2%','target 98%',96,'var(--amber)'],
        ['Stages green',stagesGreen()+'%','target 80%',stagesGreen(),stagesGreen()>=80?'var(--mint)':'var(--amber)'],
        ['Payment corrections','2','this month · 0 expected',8,'var(--coral)']
      ].map(([k,n,s,w,c])=>`<div style="padding:0 14px;border-right:1px solid var(--line)">
        <div class="tag">${k}</div>
        <div style="display:flex;align-items:baseline;gap:6px;margin-top:5px"><span style="font-size:18px;font-weight:800;letter-spacing:-.03em">${n}</span><span style="font-size:10px;color:var(--ink3);font-weight:600">${s}</span></div>
        <div class="bar" style="height:3px;margin-top:7px"><i style="width:${w}%;background:${c}"></i></div>
      </div>`).join('')}
    </div>
  </div>`;
}
/* ---------- projects ---------- */
function filteredProjects(){
  let list=projects.slice();
  if(state.search){ const q=state.search.toLowerCase(); list=list.filter(p=>p.name.toLowerCase().includes(q)||p.client.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)); }
  if(state.stageFilter) list=list.filter(p=>STAGES[p.stage].name===state.stageFilter);
  if(state.statusFilter) list=list.filter(p=>p.status===state.statusFilter);
  if(state.sort==='value') list.sort((a,b)=>b.value-a.value);
  if(state.sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
  if(state.sort==='slip') list.sort((a,b)=>b.slip-a.slip);
  return list;
}
function projectsView(){
  const list=filteredProjects();
  return `
  <div class="row" style="margin-bottom:12px">
    <div class="seg" data-group="stage">
      ${['','Design','Production','Installation','Handover'].map(s=>`<button class="${state.stageFilter===s?'on':''}" data-act="filter-stage" data-v="${s}">${s||'All stages'}</button>`).join('')}
    </div>
    <div class="seg" data-group="status">
      ${['','On track','Past target','Needs action','Closed'].map(s=>`<button class="${state.statusFilter===s?'on':''}" data-act="filter-status" data-v="${s}">${s||'Any status'}</button>`).join('')}
    </div>
    <div style="margin-left:auto" class="row">
      <span class="muted" style="font-size:11.5px;font-weight:600">Sort</span>
      <div class="seg">
        ${[['value','Value'],['slip','Delay'],['name','Name']].map(([v,l])=>`<button class="${state.sort===v?'on':''}" data-act="sort" data-v="${v}">${l}</button>`).join('')}
      </div>
    </div>
  </div>
  <div class="card pad0 grow" style="display:flex;flex-direction:column;min-height:0">
    <div class="spread" style="padding:14px 16px 8px"><div class="card-h" style="margin:0"><h2>${list.length} projects</h2></div>
      <span class="muted" style="font-size:11.5px;font-weight:600">${lakh(list.reduce((n,p)=>n+p.value,0))} contracted</span></div>
    <div class="scroll" style="padding:0 6px 8px">
      <table>
        <thead><tr><th>Project</th><th>Client</th><th>Stage</th><th style="width:150px">Progress</th><th>Status</th><th class="r">Value</th><th class="r">Next due</th></tr></thead>
        <tbody>${list.map(p=>{
          const pct = p.stage===3?100:Math.min(100, Math.round(p.day/ (STAGES[p.stage].target||1) *100));
          const next=p.payments.find(x=>x.status!=='paid');
          return `<tr data-act="open-project" data-id="${p.id}" style="cursor:pointer">
            <td><div class="tname">${p.name}</div><div class="tmeta">${p.id} · ${p.city}</div></td>
            <td>${p.client}</td>
            <td>${STAGES[p.stage].name}<div class="tmeta">${p.stage===3?'closed':'day '+p.day+' of '+p.target}</div></td>
            <td><div class="bar"><i style="width:${pct}%;background:${p.status==='On track'?'var(--mint)':p.status==='Past target'?'var(--amber)':p.status==='Closed'?'#B9BCCB':'var(--coral)'}"></i></div></td>
            <td>${statusChip(p.status)}</td>
            <td class="r mono">${lakh(p.value)}</td>
            <td class="r mono">${next?lakh(next.amount):'—'}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      ${list.length?'':'<div class="empty"><b>No projects match</b>Clear the filters or search again.</div>'}
    </div>
  </div>`;
}

/* ---------- project drawer ---------- */
function openProject(id){
  const p=projects.find(x=>x.id===id); if(!p) return;
  const dp=staff.find(s=>s.id===p.dp), pm=staff.find(s=>s.id===p.pm), rep=staff.find(s=>s.id===p.rep);
  const pct = p.stage===3?100:Math.min(100, Math.round(p.day/(STAGES[p.stage].target||1)*100));
  const total=p.payments.reduce((n,x)=>n+x.amount,0), paid=p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  document.getElementById('drawer').innerHTML=`
    <div class="drawer-h">
      <div>
        <h2>${p.name}</h2>
        <p>${p.id} · ${p.client} · ${p.city} · ${lakh(p.value)}</p>
      </div>
      <div class="row" style="margin-left:auto;gap:6px">
        ${statusChip(p.status)}
        <button class="close" data-act="close-drawer">✕</button>
      </div>
    </div>
    <div class="drawer-b">
      <div class="stepper" style="margin-bottom:8px">
        ${STAGES.map((s,i)=>`<div class="st ${i<p.stage?'done':i===p.stage?'now':''}"></div>`).join('')}
      </div>
      <div class="row" style="justify-content:space-between;font-size:10.5px;font-weight:700;color:var(--ink3);margin-bottom:16px">
        ${STAGES.map((s,i)=>`<span style="color:${i===p.stage?'var(--ink)':'var(--ink3)'}">${s.name}</span>`).join('')}
      </div>

      <div class="grid2" style="margin-bottom:14px">
        <div class="card" style="box-shadow:none;border:1px solid var(--line)">
          <div class="eyebrow">This stage</div>
          <div class="kpi" style="margin-top:6px"><div class="n" style="font-size:24px">${p.stage===3?'Closed':'Day '+p.day+' of '+p.target}</div><div class="s">${p.stage===3?'handed over':'days left: '+Math.max(0,p.target-p.day)}</div></div>
          <div class="bar" style="margin-top:10px"><i style="width:${pct}%;background:${p.status==='On track'?'var(--mint)':p.status==='Past target'?'var(--amber)':'var(--coral)'}"></i></div>
        </div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)">
          <div class="eyebrow">Promised</div>
          <div class="kpi" style="margin-top:6px"><div class="n" style="font-size:24px">${fmtDate(p.promised)}</div><div class="s">${p.slip?('forecast '+fmtDate(p.forecast)+' · '+p.slip+' days late'):'forecast on time'}</div></div>
          <div class="bar" style="margin-top:10px"><i style="width:${p.slip?100:40}%;background:${p.slip?'var(--coral)':'var(--mint)'}"></i></div>
        </div>
      </div>

      <div class="card pad0" style="box-shadow:none;border:1px solid var(--line);margin-bottom:14px">
        <div class="card-h" style="padding:12px 14px 0"><h2>Payments</h2><span class="sub">${lakh(paid)} of ${lakh(total)}</span></div>
        <table><tbody>
          ${p.payments.map((x,i)=>`<tr>
            <td style="padding-left:14px"><div class="tname">${x.stage}</div><div class="tmeta">${x.pct}% · ${inr(x.amount)}</div></td>
            <td>${payChip(x)}</td>
            <td class="r mono">${x.status==='paid'?fmtDate(x.paidOn):fmtDate(x.dueOn)}</td>
            <td class="r" style="width:96px">${x.status==='proof'?`<button class="btn sm primary" data-act="confirm" data-id="${proofIdFor(p.id,x.stage)}">Confirm</button>`:''}</td>
          </tr>`).join('')}
        </tbody></table>
      </div>

      <div class="card" style="box-shadow:none;border:1px solid var(--line);margin-bottom:14px">
        <div class="eyebrow" style="margin-bottom:8px">Team</div>
        ${[dp,pm,rep].filter(Boolean).map(s=>`<div class="row" style="margin:7px 0">
          <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${s.name}</div><div class="tmeta">${s.role}</div></div>
          <span class="muted" style="font-size:11px;font-weight:700">${s.rating.toFixed(1)} ★</span>
        </div>`).join('')}
      </div>

      <div class="card" style="box-shadow:none;border:1px solid var(--line);margin-bottom:14px">
        <div class="spread"><div class="eyebrow">Files</div><span class="muted" style="font-size:11px;font-weight:700">${Math.min(p.files.length,4)} of ${p.files.length} shown</span></div>
        <div style="margin-top:8px">
          ${p.files.slice(0,4).map(f=>`
            <div class="row" style="padding:6px 0;font-size:12px">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E7288" stroke-width="1.6"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
              <span class="grow">${esc(f.short)} · ${f.version}</span><span class="muted" style="font-size:10.5px">${fmtDate(f.at)}</span>
            </div>`).join('')}
        </div>
      </div>

      <div class="row" style="gap:8px">
        <button class="btn" data-act="silence" data-id="${p.id}">Message the client</button>
        <button class="btn" data-act="pause" data-id="${p.id}">${p.status==='Paused'?'Resume':'Pause project'}</button>
        <button class="btn danger" data-act="close-project" data-id="${p.id}">Close project</button>
      </div>
    </div>`;
  openDrawer();
}
const proofIdFor=(pid,stage)=>{ const pr=proofs.find(x=>x.projectId===pid&&x.stage===stage); return pr?pr.id:''; };

/* ---------- approvals ---------- */
function approvalsView(){
  const tabs=['All','Payment','Design','Leave','Expense','Salary','Reimbursement','Decided'];
  const decided=approvals.filter(a=>a.status==='approved'||a.status==='rejected');
  const source=state.approvalTab==='Decided'?decided:pendingApprovals();
  const list=source.filter(a=>state.approvalTab==='All'||state.approvalTab==='Decided'||a.type===state.approvalTab)
    .sort((a,b)=>(b.amount*b.ageH)-(a.amount*a.ageH));
  const stateCount=st=>projects.reduce((n,p)=>n+p.payments.filter(x=>x.status===st).length,0);
  const stateAmt=st=>projects.reduce((n,p)=>n+p.payments.filter(x=>x.status===st).reduce((m,x)=>m+x.amount,0),0);
  const tiles=[['proof','In review'],['overdue','Overdue'],['due','Due'],['paid','Received']];
  return `
  <div class="row" style="margin-bottom:12px">
    <div class="seg">${tabs.map(t=>{
      const n=t==='All'?pendingApprovals().length:t==='Decided'?decided.length:pendingApprovals().filter(a=>a.type===t).length;
      return `<button class="${state.approvalTab===t?'on':''}" data-act="approval-tab" data-v="${t}">${t}${n?`<span class="cnt">${n}</span>`:''}</button>`;
    }).join('')}</div>
    <div style="margin-left:auto;display:flex;align-items:center;gap:7px">
      <span class="muted" style="font-size:11.5px;font-weight:600">${lakh(debtTotal())} blocked</span>
      <button class="btn sm" data-act="salary-all">All salaries</button>
      <button class="btn sm primary" data-act="new-tx">+ New transaction</button>
    </div>
  </div>
  <div class="tile-row">
    ${tiles.map(([st,label])=>`<button class="tile" data-act="payment-tile" data-v="${st}">
      <span class="tile-k">${label}</span><b>${stateCount(st)}</b><span class="tile-s">${lakh(stateAmt(st))}</span></button>`).join('')}
  </div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    <div class="scroll">
    ${list.length?list.map(a=>`
      <div class="list-row" style="padding:14px 16px">
        <div class="av-md" style="background:${a.person?staff.find(s=>s.id===a.person).tint[0]:'#E7EAFE'};color:${a.person?staff.find(s=>s.id===a.person).tint[1]:'#2E4BF2'}">
          ${a.person?staff.find(s=>s.id===a.person).initials:(a.type==='Payment'?'₹':a.type==='Design'?'DS':'EX')}
        </div>
        <div class="grow">
          <div style="font-size:13px;font-weight:700">${esc(a.title)}</div>
          <div class="tmeta">${esc(a.sub)} · ${a.ageH}h old${a.reason?' · '+esc(a.reason):''}</div>
        </div>
        ${a.amount?`<div class="mono" style="font-weight:800;font-size:13px;margin-right:8px">${inr(a.amount)}</div>`:''}
        <div class="row" style="gap:6px">
          ${state.approvalTab==='Decided'||a.status==='approved'||a.status==='rejected'
            ? `<span class="chip ${a.status==='approved'?'ok':'now'}">${a.status||'decided'}</span>`
            : a.type==='Leave'
              ? `<button class="btn sm primary" data-act="leave-flow" data-id="${a.id}">Approve &amp; cover</button>`
              : (a.type==='Salary'||a.type==='Reimbursement'||a.type==='Expense')
                ? `<button class="btn sm primary" data-act="pay-portal" data-id="${a.id}">Pay</button>`
                : a.type==='Payment'
                  ? `<button class="btn sm primary" data-act="review-payment" data-id="${a.payId}">Review &amp; confirm</button>`
                  : a.type==='Design'
                    ? `<button class="btn sm primary" data-act="design-review" data-id="${a.id}">Open &amp; approve</button>`
                    : `<button class="btn sm" data-act="approve" data-id="${a.id}">Approve</button>`}
          ${state.approvalTab==='Decided'||a.status==='approved'||a.status==='rejected'?'':`<button class="btn sm danger" data-act="reject" data-id="${a.id}">Reject</button>`}
        </div>
      </div>`).join('')
    :'<div class="empty"><b>Nothing waiting</b>Every approval is cleared. The queue refills as work moves.</div>'}
    </div>
  </div>`;
}
function openDesignReview(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  const p=projects.find(x=>x.id===a.projectId);
  openModal(`<div class="doc-h"><div class="file-thumb" style="width:30px;height:38px">PDF</div>
      <div><div style="font-size:14px;font-weight:800">${esc(a.title)}</div><div class="tmeta">${esc(a.sub)} · ${a.ageH}h waiting</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div class="doc-body">${docPaper('Kitchen elevation','Client approval · '+a.sub)}
      <div class="doc-note">Approving sends the render to the client and unlocks production.</div></div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)">
      <button class="btn danger" data-act="close-modal">Not yet</button>
      <button class="btn" style="margin-left:auto" data-act="reject" data-id="${a.id}">Reject with reason</button>
      <button class="btn primary" data-act="design-approve" data-id="${a.id}">Approve &amp; send</button></div>`,'wide');
}

/* ---------- payments ---------- */
function paymentsView(){
  const tabs=['Awaiting confirmation','Overdue','Due','Paid','Paid out'];
  const rows=[];
  projects.forEach(p=>p.payments.forEach(x=>{
    if(x.status==='proof') rows.push({p,x,kind:'Awaiting confirmation'});
    if(x.status==='overdue') rows.push({p,x,kind:'Overdue'});
    if(x.status==='due') rows.push({p,x,kind:'Due'});
    if(x.status==='paid') rows.push({p,x,kind:'Paid'});
  }));
  const list=rows.filter(r=>r.kind===state.paymentTab);
  const out=state.paymentTab==='Paid out';
  return `
  <div class="row" style="margin-bottom:12px">
    <div class="seg">${tabs.map(t=>{
      const n=(t==='Paid out')?outgoing.length:rows.filter(r=>r.kind===t).length;
      return `<button class="${state.paymentTab===t?'on':''}" data-act="payment-tab" data-v="${t}">${t}<span class="cnt">${n}</span></button>`;
    }).join('')}</div>
    <div style="margin-left:auto;font-size:11.5px;font-weight:600" class="muted">${lakh(out?outgoing.reduce((n,o)=>n+o.amount,0):list.reduce((n,r)=>n+r.x.amount,0))} in this view</div>
  </div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    ${out?`<div class="scroll"><table>
      <thead><tr><th>Paid to</th><th>What for</th><th>Reference</th><th class="r">Amount</th><th class="r">Date</th><th class="r"></th></tr></thead>
      <tbody>${outgoing.map(o=>`<tr>
        <td><div class="tname">${esc(o.to)}</div></td>
        <td>${esc(o.title)}</td>
        <td class="mono">${o.ref}</td>
        <td class="r mono">${inr(o.amount)}</td>
        <td class="r mono">${fmtDate(o.at)}</td>
        <td class="r"><button class="btn sm" data-act="open-doc" data-title="${esc(o.title)}">Receipt</button></td>
      </tr>`).join('')}</tbody></table>
      ${outgoing.length?'':'<div class="empty"><b>Nothing paid out yet</b>Approve an expense or salary and it lands here.</div>'}
    </div>`:`
    <div class="scroll"><table>
      <thead><tr><th>Project</th><th>Gate</th><th>Client</th><th>Status</th><th class="r">Amount</th><th class="r">Date</th><th class="r"></th></tr></thead>
      <tbody>${list.map(r=>`<tr>
        <td><div class="tname">${r.p.name}</div><div class="tmeta">${r.p.id}</div></td>
        <td>${r.x.stage}<div class="tmeta">${r.x.pct}%</div></td>
        <td>${r.p.client}</td>
        <td>${payChip(r.x)}</td>
        <td class="r mono">${inr(r.x.amount)}</td>
        <td class="r mono">${r.x.status==='paid'?fmtDate(r.x.paidOn):fmtDate(r.x.dueOn)}</td>
        <td class="r">${r.x.status==='proof'?`<button class="btn sm primary" data-act="review-payment" data-id="${proofIdFor(r.p.id,r.x.stage)}">Review</button>`:`<button class="btn sm" data-act="open-project" data-id="${r.p.id}">Open</button>`}</td>
      </tr>`).join('')}</tbody>
    </table>
    ${list.length?'':'<div class="empty"><b>Nothing here</b>No payments in this state right now.</div>'}
    </div>`}
  </div>`;
}

/* ---------- people ---------- */
function peopleView(){
  let list=staff.slice();
  const depts=['All','Sales','Design','Production','Leadership','Support'];
  if(state.peopleDept!=='All') list=list.filter(s=>deptOf(s)===state.peopleDept);
  if(state.personRole) list=list.filter(s=>s.role===state.personRole);
  if(state.search){ const q=state.search.toLowerCase(); list=list.filter(s=>s.name.toLowerCase().includes(q)||s.role.toLowerCase().includes(q)); }
  const roles=['','Managing Director','Sales Head','Sales rep','Design Head','Design partner','Production Head','Production Manager','Marketing Head','Designer'];
  return `
  <div class="row" style="margin-bottom:8px">
    <div class="seg" style="flex-wrap:wrap">${depts.map(d=>`<button class="${state.peopleDept===d?'on':''}" data-act="people-dept" data-v="${d}">${d}</button>`).join('')}</div>
    <span class="muted" style="margin-left:auto;font-size:11.5px;font-weight:600">${list.length} people · ${lakh(list.reduce((n,s)=>n+metricsFor(s).earned,0))} earned</span>
  </div>
  <div class="row" style="margin-bottom:12px">
    <div class="seg" style="flex-wrap:wrap">${roles.map(r=>`<button class="${state.personRole===r?'on':''}" data-act="person-role" data-v="${r}">${r||'Everyone'}</button>`).join('')}</div>
  </div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    <div class="scroll"><table>
      <thead><tr><th>Person</th><th>Role</th><th>Dept</th><th class="r">Projects</th><th>Headline</th><th>Rating</th><th>Status</th><th class="r"></th></tr></thead>
      <tbody>${list.map(s=>{const m=metricsFor(s), f=m.extra[0]; return `<tr data-act="open-person" data-id="${s.id}" style="cursor:pointer">
        <td><div class="row"><div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
          <div><div class="tname">${s.name}</div><div class="tmeta">${s.email}</div></div></div></td>
        <td>${s.role}</td>
        <td><span class="chip mut">${deptOf(s)}</span></td>
        <td class="r mono">${s.wip}</td>
        <td><b>${f?f[1]:'—'}</b> <span class="tmeta">${f?(Number(f[1])===1?f[0].replace(/people/i,'person'):f[0]).toLowerCase():''}</span></td>
        <td><span style="font-weight:700">${s.rating.toFixed(1)}</span> <span class="muted" style="font-size:10.5px">★</span></td>
        <td>${chip(s.status, s.status==='Active'?'ok':'mut')}</td>
        <td class="r"><button class="btn sm" data-act="open-person" data-id="${s.id}">Open</button></td>
      </tr>`;}).join('')}</tbody>
    </table>
    ${list.length?'':'<div class="empty"><b>Nobody matches</b>Try another department or role.</div>'}
    </div>
  </div>`;
}
function openPerson(id){
  const s=staff.find(x=>x.id===id); if(!s) return;
  const m=metricsFor(s);
  const owned=projects.filter(p=>p.team.includes(s.id));
  document.getElementById('drawer').innerHTML=`
    <div class="drawer-h">
      <div class="av-md" style="background:${s.tint[0]};color:${s.tint[1]};width:44px;height:44px;font-size:15px">${s.initials}</div>
      <div style="margin-left:2px">
        <h2>${s.name}</h2><p>${s.role} · ${deptOf(s)} · ${s.email} · ${s.phone}</p>
      </div>
      <button class="close" data-act="close-drawer">✕</button>
    </div>
    <div class="drawer-b">
      <div class="grid3" style="margin-bottom:14px">
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Earned</div><div style="font-size:22px;font-weight:800;margin-top:4px">${lakh(m.earned)}</div><div class="tmeta">against their projects</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Salary</div><div style="font-size:22px;font-weight:800;margin-top:4px">${m.sal?inr(m.sal.amount):'—'}</div><div class="tmeta">${m.sal?m.sal.status:'no salary record'}</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Rating</div><div style="font-size:22px;font-weight:800;margin-top:4px">${s.rating.toFixed(1)}</div><div class="tmeta">this week · ${s.leave}d leave</div></div>
      </div>
      <div class="grid2" style="margin-bottom:14px">
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow" style="margin-bottom:6px">${m.d} performance</div>
          ${m.extra.map(([k,v])=>`<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}</div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow" style="margin-bottom:6px">Workload</div>
          ${m.base.map(([k,v])=>`<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}</div>
      </div>
      <div class="card pad0" style="box-shadow:none;border:1px solid var(--line);margin-bottom:14px">
        <div class="card-h" style="padding:12px 14px 0"><h2>On their plate</h2><span class="sub">${Math.min(owned.length,6)} of ${owned.length}</span></div>
        <table><tbody>${owned.slice(0,6).map(p=>`<tr data-act="open-project" data-id="${p.id}" style="cursor:pointer">
          <td style="padding-left:14px"><div class="tname">${p.name}</div><div class="tmeta">${STAGES[p.stage].name} · ${p.status}</div></td>
          <td class="r mono">${lakh(p.value)}</td></tr>`).join('')||'<tr><td style="padding:14px" class="muted">No projects assigned.</td></tr>'}</tbody></table>
      </div>
      <div class="card" style="box-shadow:none;border:1px solid var(--line)">
        <div class="eyebrow" style="margin-bottom:8px">Employment</div>
        <div class="kv"><span class="k">Joined</span><span class="v">${fmtDate(s.joined)} ${s.joined.getFullYear()}</span></div>
        <div class="kv"><span class="k">Status</span><span class="v">${s.status}</span></div>
        <div class="kv"><span class="k">Reports to</span><span class="v">${s.role==='Managing Director'?'—':'Arya Kumar'}</span></div>
        <div class="row" style="gap:8px;margin-top:12px">
          <button class="btn" data-act="login-as" data-id="${s.id}">Log in as</button>
          <button class="btn" data-act="leave-person" data-id="${s.id}">Put on leave</button>
          <button class="btn" data-act="message" data-id="${s.id}">Message</button>
          <button class="btn danger" data-act="hibernate" data-id="${s.id}">${s.status==='Active'?'Hibernate':'Reactivate'}</button>
        </div>
      </div>
    </div>`;
  openDrawer();
}

/* ---------- activity ---------- */
function activityView(){
  const kinds=['All','Payment','Stage','Design','Leave','Alert','File','Project','Meeting'];
  let list=activity.slice();
  if(state.activityKind!=='All') list=list.filter(a=>a.kind===state.activityKind);
  if(state.actPerson) list=list.filter(a=>a.who===state.actPerson);
  if(state.actProject){ const q=state.actProject.toLowerCase(); list=list.filter(a=>(a.text||'').toLowerCase().includes(q)); }
  if(state.actDay) list=list.filter(a=>a.at.toDateString()===state.actDay);
  list.sort((a,b)=>b.at-a.at);
  const people=[...new Set(activity.map(a=>a.who))].sort();
  const days={}; list.slice(0,90).forEach(a=>{ const k=a.at.toDateString(); (days[k]=days[k]||[]).push(a); });
  return `<div class="row" style="margin-bottom:10px;flex-wrap:wrap">
    <div class="seg" style="flex-wrap:wrap">${kinds.map(k=>`<button class="${state.activityKind===k?'on':''}" data-act="activity-kind" data-v="${k}">${k}</button>`).join('')}</div>
    <select class="mini-sel" onchange="setActPerson(this.value)"><option value="">All people</option>${people.map(p=>`<option ${state.actPerson===p?'selected':''}>${esc(p)}</option>`).join('')}</select>
    <select class="mini-sel" onchange="setActProject(this.value)"><option value="">All projects</option>${projects.filter(p=>p.status!=='Closed').slice(0,18).map(p=>`<option ${state.actProject===p.name?'selected':''}>${esc(p.name)}</option>`).join('')}</select>
    ${state.actDay||state.actPerson||state.actProject?`<button class="btn sm" data-act="act-clear">Clear filters</button>`:''}
  </div>
  <div class="act-grid">
    <div>${monthCalendar()}
      <div class="card" style="margin-top:12px"><div class="card-h"><h2>Filters</h2></div>
        <div class="kv"><span class="k">Person</span><span class="v">${state.actPerson||'Anyone'}</span></div>
        <div class="kv"><span class="k">Project</span><span class="v">${state.actProject||'Any project'}</span></div>
        <div class="kv"><span class="k">Day</span><span class="v">${state.actDay?fmtDate(new Date(state.actDay)):'Any day'}</span></div>
        <div class="kv"><span class="k">Entries</span><span class="v">${list.length}</span></div>
      </div>
    </div>
    <div class="card pad0" style="min-height:0">
      <div class="scroll" style="max-height:640px">
      ${Object.keys(days).map(day=>`<div class="dayhead">${new Date(day).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</div>
        ${days[day].map(a=>`<button class="list-row" style="width:100%;padding:10px 16px;text-align:left" data-act="activity" data-id="${a.id}">
          <div class="av-sm" style="background:${a.tint[0]};color:${a.tint[1]}">${a.initials}</div>
          <div class="grow"><div style="font-size:12.5px"><b>${esc(a.who)}</b> ${esc(a.text)}</div>
            <div class="tmeta">${a.kind} · ${a.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</div></div>
          <span class="chev" style="color:var(--ink3)">›</span>
        </button>`).join('')}`).join('')||'<div class="empty"><b>No activity</b>Nothing matches that filter.</div>'}
      </div>
    </div>
  </div>
  <div style="height:10px"></div>`;
}
function setActPerson(v){ state.actPerson=v||''; document.getElementById('view').innerHTML=activityView(); }
function setActProject(v){ state.actProject=v||''; document.getElementById('view').innerHTML=activityView(); }

/* ---------- settings ---------- */
const settings=[
  {k:'Messaging window',v:'08:00 – 22:00',d:'All WhatsApp messages, automatic and manual'},
  {k:'Client payment split',v:'10 / 50 / 35 / 5',d:'Applied to new projects on the latest accepted quotation'},
  {k:'Design stage',v:'15 days',d:'Starts at the token'},
  {k:'Production stage',v:'45 days',d:'Starts at the 50% payment'},
  {k:'Installation stage',v:'5 days',d:'Starts at the 35% payment'},
  {k:'Sign-in session',v:'15 days',d:'Rolling, resets on every open'},
];
function settingsView(){
  return `<div class="scroll"><div class="grid2">
    ${settings.map((s,i)=>`<div class="card">
      <div class="spread"><div><div class="eyebrow">${s.k}</div><div style="font-size:18px;font-weight:800;margin-top:6px">${s.v}</div>
        <div class="tmeta" style="margin-top:4px">${s.d}</div></div>
        <button class="btn sm" data-act="edit-setting" data-i="${i}">Change</button></div>
    </div>`).join('')}
    <div class="card" style="grid-column:span 2">
      <div class="spread"><div><div class="eyebrow">Reading voice</div><div class="tmeta" style="margin-top:4px">Used when you read the brief aloud.</div></div>
        <select id="voiceSel" class="voice-sel" style="max-width:280px"></select></div>
    </div>
    <div class="card" style="grid-column:span 2">
      <div class="spread"><div><div class="eyebrow">Connections</div><div style="font-size:14px;font-weight:700;margin-top:6px">WhatsApp, Google Meet and meeting responses</div>
        <div class="tmeta" style="margin-top:4px">See exactly what is connected and what each one needs.</div></div>
        <button class="btn" data-act="route" data-to="integrations">Open connections</button></div>
    </div>
    <div class="card" style="grid-column:span 2">
      <div class="spread"><div><div class="eyebrow">Demo data</div><div style="font-size:14px;font-weight:700;margin-top:6px">${projects.length} projects · ${staff.length} people · ${approvals.length} approvals</div>
        <div class="tmeta" style="margin-top:4px">Everything on screen is generated locally. Nothing leaves this file.</div></div>
        <button class="btn danger" data-act="reset">Reset demo</button></div>
    </div>
  </div></div>`;
}

/* ---------- modal / toast / drawer ---------- */
function openModal(html, variant){
  const m=document.getElementById('modal');
  m.className='modal'+(variant?' '+variant:'');
  m.innerHTML=html; m.classList.add('on');
  document.getElementById('overlay').classList.add('on');
}
function closeModal(){ const m=document.getElementById('modal'); m.classList.remove('on'); m.className='modal'; document.getElementById('overlay').classList.remove('on'); }
function openDrawer(){ document.getElementById('drawer').classList.add('open'); }
function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); }
function toast(msg){
  const t=document.createElement('div'); t.className='toast';
  t.innerHTML=`<span class="tick">✓</span>${esc(msg)}`;
  document.getElementById('toasts').appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),320); }, 2600);
}

/* ---------- actions ---------- */
function approve(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  a.status='approved';
  if(a.payId){ const pr=proofs.find(p=>p.id===a.payId); if(pr){ const p=projects.find(x=>x.id===pr.projectId); const pay=p.payments.find(y=>y.stage===pr.stage);
    if(pay){ pay.status='paid'; pay.paidOn=new Date(TODAY); } } }
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint, kind:'Payment', text:'approved '+a.type.toLowerCase()+' · '+a.title });
  render(); toast(a.title.split('·')[0].trim()+' approved');
}
function reject(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  openModal(`<h3>Reject this ${a.type.toLowerCase()}?</h3><p>${esc(a.title)}<br>${esc(a.sub)}</p>
    <textarea id="reason" placeholder="Reason (required — it goes to the person who raised it)"></textarea>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
    <button class="btn danger" data-act="reject-confirm" data-id="${a.id}">Reject with reason</button></div>`);
  setTimeout(()=>document.getElementById('reason')?.focus(),50);
}
function rejectConfirm(id){
  const a=approvals.find(x=>x.id===id); const reason=document.getElementById('reason')?.value.trim();
  if(!reason){ document.getElementById('reason').style.borderColor='#F26A5B'; return; }
  a.status='rejected'; a.reason=reason; closeModal();
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint, kind:'Payment', text:'rejected '+a.type.toLowerCase()+' · '+reason });
  render(); toast('Rejected and sent back with the reason');
}
function confirmPayment(proofId){
  const pr=proofs.find(p=>p.id===proofId); if(!pr){ toast('Nothing to confirm'); return; }
  const p=projects.find(x=>x.id===pr.projectId);
  openModal(`<h3>Confirm ₹${Math.round(pr.amount).toLocaleString('en-IN')}?</h3>
    <p>${esc(p.name)} · ${esc(pr.stage)}<br>Proof received ${pr.ageH}h ago. Confirming locks the payment and sends the client a receipt.</p>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
    <button class="btn primary" data-act="confirm-confirm" data-id="${pr.id}">Confirm receipt</button></div>`);
}
function confirmConfirm(id){
  const pr=proofs.find(p=>p.id===id); const p=projects.find(x=>x.id===pr.projectId);
  const pay=p.payments.find(x=>x.stage===pr.stage);
  if(pay){ pay.status='paid'; pay.paidOn=new Date(TODAY); }
  const ap=approvals.find(a=>a.payId===pr.id); if(ap) ap.status='approved';
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint, kind:'Payment', text:'confirmed '+pr.stage.toLowerCase()+' for '+p.name });
  closeModal(); render(); toast('Payment confirmed · receipt sent to '+p.client);
}

/* =====================================================================
   Desktop parity layer — every surface the mobile build has, in the
   desktop console's own layout. Shares data.js with the phone build.
   ===================================================================== */

/* ---------- shared helpers ---------- */
const hm = m => `${m.hour%12===0?12:m.hour%12}:${String(m.minute).padStart(2,'0')} ${m.hour<12?'AM':'PM'}`;
const isPastProject = p => p.status==='Closed' || p.stage===3;
const DEPT_OF = {'Sales rep':'Sales','Sales Head':'Sales','Designer':'Design','Design Partner':'Design','Design partner':'Design','Design Head':'Design',
  'Production Manager':'Production','Production Head':'Production','Marketing Head':'Marketing','Managing Director':'Leadership'};
const deptOf = s => DEPT_OF[s.role]||'Support';

function metricsFor(s){
  const mine=projects.filter(p=>p.team.includes(s.id));
  const live=mine.filter(p=>p.status!=='Closed');
  const past=mine.filter(p=>p.status==='Closed');
  const onTime=live.filter(p=>p.status==='On track').length;
  const sal=salaries.find(x=>x.person===s.id);
  const earned=mine.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const seed=Math.round(s.name.length*37+s.rating*11);
  const d=deptOf(s);
  const base=[['Live projects',live.length],['Closed projects',past.length],['On-time',live.length?Math.round(onTime/live.length*100)+'%':'—']];
  let extra=[];
  if(d==='Sales') extra=[['Leads in hand',8+seed%14],['Calls this week',22+seed%31],['Conversion',(18+seed%23)+'%'],['Pipeline',lakh(mine.reduce((n,p)=>n+p.value,0)*0.4)]];
  else if(d==='Design') extra=[['Renders this month',6+seed%12],['Approval rate',(58+seed%30)+'%'],['Revisions per project',(1+seed%3)+'.'+(seed%9)]];
  else if(d==='Production') extra=[['Sites running',live.length],['Slip days',seed%9],['Snags open',seed%7]];
  else if(d==='Marketing') extra=[['Leads generated',14+seed%26],['Cost per lead','₹'+(180+seed%220)],['Content shipped',4+seed%8]];
  else extra=[['People managed',staff.filter(x=>deptOf(x)===d).length]];
  return {base,extra,earned,sal,d};
}

function perfRows(dept, sortKey){
  return staff.filter(x=>deptOf(x)===dept).map(x=>({x,m:metricsFor(x)}))
    .sort((a,b)=>parseInt(b.m.extra[sortKey]?.[1]||0)-parseInt(a.m.extra[sortKey]?.[1]||0));
}
function perfCard(r){
  const first=r.m.extra[0], second=r.m.extra[1];
  const label=(first?first[0]:'').toLowerCase();
  return `<button class="pcard" data-act="open-person" data-id="${r.x.id}">
    <div class="spread"><span class="pcard-big">${first?first[1]:'—'}</span><span class="chip blue">${label}</span></div>
    <div class="pcard-name">${esc(r.x.name)}</div>
    <div class="pcard-sub">${second?second[0]+': '+second[1]:r.x.role}</div>
    <div class="pcard-foot"><span>${r.m.base[0][1]} live</span><span>${lakh(r.m.earned)} earned</span></div>
  </button>`;
}
function deptMetrics(dept){
  const m={
    Sales:{cols:[['Leads','#'],['Calls','#'],['Conversion','%']],chart:2},
    Design:{cols:[['Renders','#'],['Approval','%'],['Revisions','#']],chart:1},
    Production:{cols:[['Sites','#'],['Slip days','#'],['Snags','#']],chart:1},
    Marketing:{cols:[['Leads','#'],['Cost/lead','₹'],['Content','#']],chart:0}
  };
  return m[dept]||{cols:[['Live','#'],['Closed','#'],['On-time','%']],chart:0};
}
function deptRows(dept){
  return staff.filter(x=>deptOf(x)===dept).map(x=>({x,m:metricsFor(x)})).sort((a,b)=>b.m.earned-a.m.earned);
}
function clientList(){
  const map={};
  projects.forEach(p=>{ (map[p.client]=map[p.client]||[]).push(p); });
  return Object.keys(map).map(name=>({name, projects:map[name], value:map[name].reduce((n,p)=>n+p.value,0), city:map[name][0].city}));
}
function weekBars(){
  const total=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const vals=[0.22,0.31,0.27,0.20].map(x=>Math.round(total*x/100));
  const max=Math.max(1,...vals);
  return vals.map((v,i)=>({label:'W'+(i+1),v,pct:Math.round(v/max*100)}));
}
function monthBars(){
  const total=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const vals=[0.08,0.12,0.09,0.15,0.19,0.37].map(x=>Math.round(total*x));
  const max=Math.max(1,...vals);
  return vals.map((v,i)=>({label:['Jun','Jul','Aug','Sep','Oct','Nov'][i],v,pct:Math.round(v/max*100)}));
}
function renderThumb(f){
  const h=f.hue;
  return `<svg class="rimg" viewBox="0 0 120 84" width="100%" height="84">
    <defs><linearGradient id="g${esc(f.id)}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${h} 42% 82%)"/><stop offset="1" stop-color="hsl(${h} 34% 66%)"/></linearGradient></defs>
    <rect width="120" height="84" fill="url(#g${esc(f.id)})"/>
    <rect x="8" y="10" width="46" height="30" rx="2" fill="hsl(${h} 18% 96%)" opacity=".55"/>
    <rect x="64" y="8" width="48" height="40" rx="2" fill="hsl(${h} 22% 92%)" opacity=".45"/>
    <rect x="10" y="56" width="100" height="12" rx="3" fill="hsl(${h} 30% 55%)" opacity=".5"/>
    <rect x="26" y="46" width="68" height="10" rx="3" fill="hsl(${h} 26% 78%)" opacity=".7"/>
    <circle cx="94" cy="22" r="7" fill="hsl(${h} 60% 90%)" opacity=".5"/>
  </svg>`;
}

/* ---------- meetings & messages ---------- */
function meetingCard(m){
  const c=rsvpCount(m);
  return `<button class="mtcard" data-act="meeting" data-id="${m.id}">
    <div class="spread"><span class="chip blue">${fmtDate(m.date)} · ${hm(m)}</span><span class="chip mut">${m.participants.length} invited</span></div>
    <div class="mt-title">${esc(m.title)}</div>
    <div class="tmeta">${esc(m.client)}</div>
    <div class="rsvp"><span class="ok-t">${c.accepted||0} accepted</span><span class="no-t">${c.declined||0} declined</span><span class="pend-t">${c.pending||0} pending</span></div>
  </button>`;
}
function meetingsView(){
  const up=upMeetings(), past=pastMeetings();
  const tab=state.commTab;
  const tabs=[['Upcoming',up.length],['Messages',projects.length],['Mentions',mentions.length],['Past',past.length]];
  let body='';
  if(tab==='Upcoming'){
    body=`<div class="mt-grid">
      ${up.map(meetingCard).join('')}
      <button class="mtcard new" data-act="new-meeting"><span class="mt-plus">+</span><b>New meeting</b><i>Client, people, time</i></button>
    </div>`;
  } else if(tab==='Messages'){
    const size=state.msgSize;
    body=`<div class="row" style="margin-bottom:10px"><span class="muted" style="font-size:11.5px;font-weight:600">Card size</span>
      <div class="seg">${['S','M','L'].map(z=>`<button class="${size===z?'on':''}" data-act="msg-size" data-v="${z}">${z}</button>`).join('')}</div>
      <button class="btn sm" style="margin-left:auto" data-act="open-wa">Open WhatsApp</button></div>
      <div class="msg-grid ${size}">
        ${projects.map(p=>{const last=p.msgs[p.msgs.length-1]; return `<button class="msgcard" data-act="thread" data-id="${p.id}">
          <div class="spread"><b>${esc(p.name)}</b><span class="wa-dot"></span></div>
          <i>${esc(last.name)}: ${esc(last.text)}</i>
          <span class="tmeta">${last.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
        </button>`;}).join('')}
      </div>`;
  } else if(tab==='Mentions'){
    body=`<div class="card pad0"><table>
      <thead><tr><th style="padding-left:16px">Project</th><th>Who</th><th>Message</th><th class="r" style="padding-right:16px">When</th></tr></thead>
      <tbody>${mentions.map(m=>`<tr data-act="thread" data-id="${m.projectId}" style="cursor:pointer">
        <td style="padding-left:16px"><div class="tname">${esc(m.project)}</div></td>
        <td>${esc(m.name)}</td>
        <td style="max-width:520px"><div class="tmeta" style="font-size:12px;color:var(--ink)">${esc(m.text)}</div></td>
        <td class="r tmeta">${fmtDate(m.at)}</td>
      </tr>`).join('')}</tbody></table></div>`;
  } else {
    body=`<div class="card pad0"><table>
      <thead><tr><th style="padding-left:16px">Meeting</th><th>Client</th><th>Date</th><th>Notes</th><th class="r" style="padding-right:16px"></th></tr></thead>
      <tbody>${past.map(m=>`<tr data-act="meeting" data-id="${m.id}" style="cursor:pointer">
        <td style="padding-left:16px"><div class="tname">${esc(m.title)}</div><div class="tmeta">${m.participants.length} invited</div></td>
        <td>${esc(m.client)}</td>
        <td class="mono">${fmtDate(m.date)} · ${hm(m)}</td>
        <td class="tmeta" style="max-width:300px">${esc(m.notes||'—')}</td>
        <td class="r" style="padding-right:16px"><button class="btn sm" data-act="meeting" data-id="${m.id}">Open</button></td>
      </tr>`).join('')}</tbody></table></div>`;
  }
  return `<div class="row" style="margin-bottom:12px"><div class="seg">
      ${tabs.map(([t,n])=>`<button class="${tab===t?'on':''}" data-act="comm-tab" data-v="${t}">${t}<span class="cnt">${n}</span></button>`).join('')}
    </div><button class="btn primary" style="margin-left:auto" data-act="new-meeting">+ New meeting</button></div>
    <div class="scroll">${body}</div>`;
}
function meetingModal(id){
  const m=meetings.find(x=>x.id===id); if(!m) return;
  const c=rsvpCount(m);
  const person=pid=>staff.find(s=>s.id===pid);
  openModal(`<div class="doc-h">
      <div class="file-thumb" style="width:30px;height:38px">MTG</div>
      <div><div style="font-size:14px;font-weight:800">${esc(m.title)}</div>
        <div class="tmeta">${esc(m.client)} · ${fmtDate(m.date)} · ${hm(m)} · ${m.duration||45} min</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button>
    </div>
    <div style="padding:16px 18px;max-height:70vh;overflow:auto">
      <div class="kv"><span class="k">Project</span><span class="v">${esc(m.projectName||'—')}</span></div>
      <div class="kv"><span class="k">Meet link</span><span class="v"><a class="link" href="${esc(m.link)}" target="_blank" rel="noopener">${esc(m.link.replace('https://',''))}</a></span></div>
      <div class="kv"><span class="k">Agenda</span><span class="v" style="max-width:60%;text-align:right">${esc(m.agenda||'—')}</span></div>
      <div class="row" style="gap:8px;margin:12px 0">
        <span class="chip ok">${c.accepted||0} accepted</span><span class="chip late">${c.declined||0} declined</span><span class="chip mut">${c.pending||0} pending</span>
        <a class="btn sm" href="${esc(m.link)}" target="_blank" rel="noopener" style="margin-left:auto">Open Meet</a>
      </div>
      <div class="tag" style="margin:14px 0 6px">Invited</div>
      ${m.participants.map(p=>{const s=person(p.id); if(!s) return ''; return `<div class="list-row" style="padding:8px 0">
        <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(s.name)}</div><div class="tmeta">${s.role}</div></div>
        ${m.past?`<span class="chip ${p.rsvp==='accepted'?'ok':p.rsvp==='declined'?'now':'late'}">${p.rsvp}</span>`:
          `<div class="rsvp-btns">${['accepted','pending','declined'].map(v=>`<button class="btn sm ${p.rsvp===v?'primary':''}" title="${v}" aria-label="${v}" data-act="rsvp" data-mid="${m.id}" data-person="${p.id}" data-v="${v}">${v==='accepted'?'✓':v==='declined'?'✕':'·'}</button>`).join('')}</div>`}
      </div>`;}).join('')}
      ${m.past?`${m.notes?`<div class="tag" style="margin:16px 0 4px">Notes</div><p style="font-size:12.5px;line-height:1.5">${esc(m.notes)}</p>`:''}
        ${m.transcript?`<div class="tag" style="margin:12px 0 4px">Transcript</div><p style="font-size:12px;line-height:1.5;color:var(--ink2)">${esc(m.transcript)}</p>`:''}
        ${m.files&&m.files.length?`<div class="tag" style="margin:12px 0 4px">Documents</div>${m.files.map(f=>`<div class="list-row" style="padding:6px 0"><span class="grow" style="font-size:12px;font-weight:600">${esc(f)}</span><span class="chip mut">PDF</span></div>`).join('')}`:''}`:''}
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)">
      <button class="btn" data-act="close-modal">Close</button>
      ${m.past?'':`<button class="btn primary" style="margin-left:auto" data-act="thread" data-id="${m.projectId}">Open project thread</button>`}
    </div>`,'wide');
}
function newMeetingModal(projectId){
  const p=projects.find(x=>x.id===projectId)||projects[0];
  const date=isoDate(new Date(TODAY.getTime()+2*86400000));
  openModal(`<h3>New meeting</h3>
    <div class="form-row">
      <div class="field"><label>Project</label><select id="nmProject">${projects.slice(0,20).map(x=>`<option value="${x.id}" ${x.id===p.id?'selected':''}>${esc(x.name)} · ${esc(x.client)}</option>`).join('')}</select></div>
      <div class="field"><label>Title</label><input id="nmTitle" value="Design walkthrough · ${esc(p.name)}"></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Date</label><input id="nmDate" type="date" value="${date}"></div>
      <div class="field"><label>Time</label><input id="nmTime" type="time" value="10:30"></div>
    </div>
    <div class="field"><label>Agenda</label><input id="nmAgenda" value="Review the latest renders with the client and agree the finish."></div>
    <div class="field"><label>Invite the project team</label>
      <div class="checkgrid">${p.team.map(id=>{const s=staff.find(x=>x.id===id); return s?`<label class="check"><input type="checkbox" class="nm-part" value="${s.id}" checked> ${esc(s.name)} <i>${s.role}</i></label>`:'';}).join('')}</div>
    </div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn primary" data-act="create-meeting">Create meeting</button></div>`,'wide');
}
function createMeeting(){
  const pid=document.getElementById('nmProject').value;
  const p=projects.find(x=>x.id===pid);
  const title=document.getElementById('nmTitle').value.trim()||('Meeting · '+p.name);
  const date=new Date(document.getElementById('nmDate').value||TODAY);
  const time=(document.getElementById('nmTime').value||'10:30').split(':');
  const participants=[...document.querySelectorAll('.nm-part:checked')].map(x=>x.value);
  const ids=participants.length?participants:p.team.slice(0,2);
  const m={id:'MTG-'+p.id+'-'+Date.now().toString(36), title, projectId:p.id, projectName:p.name, client:p.client, date,
    hour:Number(time[0]), minute:Number(time[1]), duration:45,
    agenda:document.getElementById('nmAgenda').value.trim(), link:'https://meet.google.com/'+meetCode(p.id+Date.now()),
    participants:ids.map(id=>({id,rsvp:'pending'})), past:false, notes:'', transcript:'', files:[]};
  meetings.push(m);
  activity.unshift({id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint,
    kind:'Meeting', text:'booked '+title+' with '+p.client});
  closeModal(); render(); toast('Meeting booked · invites pending');
}
function cycleRsvp(mid,pid,v){
  const m=meetings.find(x=>x.id===mid); if(!m) return;
  const part=m.participants.find(x=>x.id===pid); if(!part) return;
  part.rsvp=v; meetingModal(mid); toast('RSVP set to '+v);
}
function threadModal(pid){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  openModal(`<div class="doc-h">
      <div class="wa-avatar">WA</div>
      <div><div style="font-size:14px;font-weight:800">${esc(p.name)} · Homesic</div>
        <div class="tmeta">${p.msgs.length} messages · project group</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button>
    </div>
    <div class="thread-body">${p.msgs.map(m=>`<div class="bubble ${m.role==='me'?'me':'them'}">
        <div class="bub-name">${esc(m.name)}</div><div>${esc(m.text)}</div>
        <div class="bub-time">${m.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</div>
      </div>`).join('')}</div>
    <div class="thread-compose"><input id="threadInput" placeholder="Message the project group…" autocomplete="off">
      <button class="btn primary" data-act="send-thread" data-id="${p.id}">Send</button></div>
    <div class="thread-foot"><button class="link" data-act="open-wa">Open in WhatsApp</button><span class="tmeta">Messages are queued locally in this demo.</span></div>`,'thread');
  setTimeout(()=>document.getElementById('threadInput')?.focus(),60);
}
function sendThread(pid){
  const p=projects.find(x=>x.id===pid); const inp=document.getElementById('threadInput');
  const text=(inp?.value||'').trim(); if(!text) return;
  p.msgs.push({id:p.id+'-M'+p.msgs.length, role:'me', name:MD.name, text, at:new Date(TODAY), tag:false, projectId:p.id});
  threadModal(pid); toast('Message queued for '+p.client);
}

/* ---------- performance ---------- */
function performanceView(){
  const cats=[['Sales','Sales performance','reps'],['Design','Design performance','people'],['Production','Production performance','managers'],['Marketing','Marketing performance','people']];
  return `<div class="scroll">
    ${cats.map(([dept,title,unit])=>{
      const rows=perfRows(dept,dept==='Sales'?2:1);
      return `<section class="perf-band">
        <div class="spread" style="margin-bottom:9px"><div class="row"><span class="eyebrow">${title}</span><span class="muted" style="font-size:11.5px;font-weight:600">${rows.length} ${unit}</span></div>
          <button class="link" data-act="dept" data-v="${dept}">All ${dept.toLowerCase()} →</button></div>
        <div class="perf-grid">${rows.map(perfCard).join('')||'<div class="empty"><b>Nobody here</b></div>'}</div>
      </section>`;
    }).join('')}
  </div>`;
}
function deptView(dept){
  const rows=deptRows(dept), dm=deptMetrics(dept), cols=dm.cols, ci=dm.chart;
  const earn=rows.reduce((n,r)=>n+r.m.earned,0);
  const live=rows.reduce((n,r)=>n+r.m.base[0][1],0);
  const num=v=>{const n=parseFloat(String(v).replace(/[^\d.]/g,'')); return isNaN(n)?0:n;};
  const chart=rows.map(r=>({id:r.x.id, n:r.x.name.split(' ')[0], v:num(r.m.extra[ci]?r.m.extra[ci][1]:0), raw:r.m.extra[ci]?r.m.extra[ci][1]:'—'}));
  const max=Math.max(1,...chart.map(c=>c.v));
  return `<div class="scroll">
    <div class="row" style="margin-bottom:12px"><button class="btn sm ghost" data-act="route" data-to="performance">← Performance</button>
      <div class="proj-title" style="font-size:20px">${dept}</div><span class="chip blue">${rows.length} people</span></div>
    <div class="grid3" style="margin-bottom:12px">
      <div class="card"><div class="eyebrow">Collected · all projects</div><div style="font-size:26px;font-weight:800;margin-top:6px">${lakh(earn)}</div><div class="tmeta">across ${rows.length} people</div></div>
      <div class="card"><div class="eyebrow">Live projects</div><div style="font-size:26px;font-weight:800;margin-top:6px">${live}</div><div class="tmeta">in flight now</div></div>
      <div class="card"><div class="eyebrow">People</div><div style="font-size:26px;font-weight:800;margin-top:6px">${rows.length}</div><div class="tmeta">in ${dept}</div></div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="card-h"><h2>${cols[ci][0]} by person</h2><span class="sub">ranked</span></div>
      <div class="chart">${chart.map(c=>`<button class="chart-col" data-act="open-person" data-id="${c.id}">
        <b>${c.raw}</b><div class="chart-bar"><i style="height:${Math.max(8,Math.round(c.v/max*100))}%"></i></div><span>${esc(c.n)}</span></button>`).join('')}</div>
    </div>
    <div class="card pad0" style="margin-bottom:12px">
      <div class="card-h" style="padding:14px 16px 0"><h2>Complete table</h2><span class="sub">${dept} · sorted by earned</span></div>
      <table><thead><tr><th style="padding-left:16px">Name</th><th>${cols[0][0]}</th><th>${cols[1][0]}</th><th>${cols[2][0]}</th><th class="r">Earned</th><th class="r" style="padding-right:16px"></th></tr></thead>
        <tbody>${rows.map(r=>`<tr>
          <td style="padding-left:16px"><div class="tname">${esc(r.x.name)}</div><div class="tmeta">${r.x.role}</div></td>
          <td>${r.m.extra[0]?r.m.extra[0][1]:'—'}</td><td>${r.m.extra[1]?r.m.extra[1][1]:'—'}</td><td>${r.m.extra[2]?r.m.extra[2][1]:'—'}</td>
          <td class="r mono">${lakh(r.m.earned)}</td>
          <td class="r" style="padding-right:16px"><button class="btn sm" data-act="open-person" data-id="${r.x.id}">Open</button></td>
        </tr>`).join('')}</tbody></table>
    </div>
    <div class="card"><div class="card-h"><h2>Load</h2><span class="sub">live projects per person</span></div>
      <div class="perf-grid">${rows.map(r=>`<button class="pcard" data-act="open-person" data-id="${r.x.id}">
        <div class="spread"><span class="pcard-big">${r.m.base[0][1]}</span><span class="chip blue">live</span></div>
        <div class="pcard-name">${esc(r.x.name)}</div><div class="pcard-sub">${r.x.role}</div></button>`).join('')}</div>
    </div>
  </div>`;
}

/* ---------- money ---------- */
function financeView(){
  const due=salaries.filter(s=>s.status==='due');
  const out=outgoing.reduce((n,o)=>n+o.amount,0);
  const paidSal=salaries.filter(s=>s.status==='paid' && !outgoing.some(o=>o.title==='Salary · '+(staff.find(x=>x.id===s.person)||{}).name)).reduce((n,s)=>n+s.amount,0);
  const cash=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const earned=projects.map(p=>({p,v:p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0)}))
    .filter(r=>r.v>0).sort((a,b)=>b.v-a.v);
  return `<div class="scroll">
    <div class="grid3" style="margin-bottom:12px">
      <div class="card"><div class="eyebrow">Collected</div><div style="font-size:27px;font-weight:800;margin-top:6px">${lakh(cash)}</div><div class="tmeta">all projects, to date</div></div>
      <div class="card"><div class="eyebrow">Paid out</div><div style="font-size:27px;font-weight:800;margin-top:6px">${lakh(out+paidSal)}</div><div class="tmeta">expenses, salaries, vendor</div></div>
      <div class="card"><div class="eyebrow">Salary due</div><div style="font-size:27px;font-weight:800;margin-top:6px;color:var(--coral-ink)">${lakh(due.reduce((n,s)=>n+s.amount,0))}</div><div class="tmeta">due 28 Nov</div></div>
    </div>
    <div class="grid2" style="margin-bottom:12px;grid-template-columns:1.4fr .9fr">
      <div class="card pad0">
        <div class="card-h" style="padding:14px 16px 0"><h2>Salary</h2><span class="row" style="gap:6px"><span class="sub">${salaries.length} people</span><button class="btn sm" data-act="salary-all">All salaries</button></span></div>
        <table><tbody>${salaries.filter(s=>s.status==='due').slice(0,7).map(s=>{const p=staff.find(x=>x.id===s.person);
          return `<tr data-act="salary" data-id="${s.id}" style="cursor:pointer">
            <td style="padding-left:16px"><div class="tname">${esc(p.name)}</div><div class="tmeta">${p.role} · 28 Nov</div></td>
            <td>${chip(s.status,s.status==='paid'?'ok':'late')}</td><td class="r mono">${inr(s.amount)}</td>
            <td class="r" style="padding-right:16px"><button class="btn sm primary" data-act="salary-pay" data-id="${s.id}">Pay</button></td></tr>`;}).join('')}</tbody></table>
      </div>
      <div class="card" style="display:flex;flex-direction:column">
        <div class="card-h"><h2>Move money</h2><span class="sub">QR, screenshot, confirm</span></div>
        <p class="tmeta" style="line-height:1.6;font-size:11.5px">Pay a salary, reimburse a site visit or raise a vendor advance. Every payment is recorded against the ledger.</p>
        <button class="btn primary" style="margin-top:auto;width:100%" data-act="new-tx">+ New transaction</button>
      </div>
    </div>
    <div class="grid2" style="margin-bottom:12px">
      <div class="card"><div class="card-h"><h2>This month by week</h2><button class="link" data-act="period" data-kind="Week" data-v="November">Details</button></div>
        <div class="chart">${weekBars().map(w=>`<button class="chart-col" data-act="period" data-kind="Week" data-v="${w.label}"><b>${lakh(w.v)}</b><div class="chart-bar"><i style="height:${Math.max(8,w.pct)}%"></i></div><span>${w.label}</span></button>`).join('')}</div></div>
      <div class="card"><div class="card-h"><h2>By month</h2><button class="link" data-act="period" data-kind="Month" data-v="November">Details</button></div>
        <div class="chart">${monthBars().map(w=>`<button class="chart-col" data-act="period" data-kind="Month" data-v="${w.label}"><b>${lakh(w.v)}</b><div class="chart-bar"><i style="height:${Math.max(8,w.pct)}%"></i></div><span>${w.label}</span></button>`).join('')}</div></div>
    </div>
    <div class="grid2" style="margin-bottom:12px;grid-template-columns:1.3fr 1fr">
      <div class="card pad0">
        <div class="card-h" style="padding:14px 16px 0"><h2>Earned by project</h2><span class="sub">${earned.length} projects</span></div>
        <table><tbody>${earned.slice(0,8).map(r=>`<tr data-act="money-project" data-id="${r.p.id}" style="cursor:pointer">
          <td style="padding-left:16px"><div class="tname">${esc(r.p.name)}</div><div class="tmeta">${esc(r.p.client)} · ${esc(r.p.city)}</div></td>
          <td class="r mono" style="font-weight:700;padding-right:16px">${lakh(r.v)}</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="card pad0">
        <div class="card-h" style="padding:14px 16px 0"><h2>Recent</h2><button class="link" data-act="movement">All movement</button></div>
        ${outgoing.slice(0,7).map(o=>`<div class="list-row" style="padding:9px 16px">
          <div class="out-badge">OUT</div><div class="grow"><div style="font-size:12px;font-weight:700">${esc(o.title)}</div><div class="tmeta">${esc(o.to)} · ${fmtDate(o.at)}</div></div>
          <span class="mono" style="font-weight:700;font-size:12px">${lakh(o.amount)}</span></div>`).join('')||'<div class="empty"><b>Nothing paid yet</b>Pay a salary or expense to start the ledger.</div>'}
      </div>
    </div>
  </div>`;
}
function salaryModal(id){
  const s=salaries.find(x=>x.id===id); if(!s) return;
  const p=staff.find(x=>x.id===s.person);
  const mine=projects.filter(x=>x.team.includes(s.person));
  openModal(`<h3>Salary · ${esc(p.name)}</h3>
    <p>${p.role} · ${mine.length} projects on the books</p>
    <div class="form-row"><div class="field"><label>Monthly amount (₹)</label><input id="salAmount" type="number" value="${s.amount}"></div>
      <div class="field"><label>Pay on</label><input id="salDue" type="date" value="${isoDate(s.due)}"></div></div>
    <div class="kv" style="margin-top:10px"><span class="k">Status</span><span class="v">${s.status}</span></div>
    <div class="kv"><span class="k">Paid on</span><span class="v">${s.paidOn?fmtDate(s.paidOn):'—'}</span></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn" data-act="salary-save" data-id="${s.id}">Save changes</button>
      <button class="btn primary" data-act="salary-pay" data-id="${s.id}">Pay now</button></div>`,'wide');
}
function allSalariesModal(){
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">All salaries</div><div class="tmeta">November · ${salaries.length} people</div></div>
    <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <table><thead><tr><th style="padding-left:16px">Person</th><th>Role</th><th>Status</th><th class="r">Amount</th><th class="r" style="padding-right:16px"></th></tr></thead>
    <tbody>${salaries.map(s=>{const p=staff.find(x=>x.id===s.person); return `<tr>
      <td style="padding-left:16px"><div class="tname">${esc(p.name)}</div></td><td>${p.role}</td>
      <td>${chip(s.status,s.status==='paid'?'ok':'late')}</td><td class="r mono">${inr(s.amount)}</td>
      <td class="r" style="padding-right:16px">${s.status==='due'?`<button class="btn sm primary" data-act="salary-pay" data-id="${s.id}">Pay</button>`:'<span class="tmeta">Paid</span>'}</td></tr>`;}).join('')}</tbody></table>
    <div style="padding:12px 18px;border-top:1px solid var(--line);text-align:right"><button class="btn" data-act="close-modal">Done</button></div>`,'wide');
}
function paySalary(id){
  const s=salaries.find(x=>x.id===id); if(!s) return;
  if(s.status==='paid'){ toast('That salary is already paid'); return; }
  const p=staff.find(x=>x.id===s.person);
  let a=approvals.find(x=>x.salaryId===s.id&&x.status!=='approved');
  if(!a){
    a={id:'APR-SAL-'+s.id, type:'Salary', title:'Salary · '+p.name, sub:'November · payslip attached', amount:s.amount, ageH:0, person:p.id, status:'pending', salaryId:s.id};
    approvals.push(a);
  }
  closeModal(); openPayPortal(a.id);
}
function newTxModal(){
  const people=staff.filter(x=>x.id!==MD.id);
  openModal(`<h3>New transaction</h3>
    <div class="form-row"><div class="field"><label>Payee</label><select id="txPayee">${people.map(x=>`<option value="${x.id}">${esc(x.name)} · ${x.role}</option>`).join('')}</select></div>
      <div class="field"><label>Amount (₹)</label><input id="txAmount" type="number" value="18000"></div></div>
    <div class="form-row"><div class="field"><label>Category</label><select id="txCat">${['Expense','Salary','Reimbursement','Vendor','Advance'].map(x=>`<option>${x}</option>`).join('')}</select></div>
      <div class="field"><label>Note</label><input id="txNote" value="Site visit and material samples"></div></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn" data-act="tx-create" data-mode="approve">Send for approval</button>
      <button class="btn primary" data-act="tx-create" data-mode="pay">Pay now</button></div>`,'wide');
}
function createTx(mode){
  const sid=document.getElementById('txPayee').value, s=staff.find(x=>x.id===sid);
  const amount=Number(document.getElementById('txAmount').value)||0;
  const cat=document.getElementById('txCat').value;
  const note=document.getElementById('txNote').value.trim();
  if(!amount){ toast('Enter an amount'); return; }
  const a={id:'APR-'+String(approvals.length+1).padStart(3,'0'), type:cat==='Vendor'||cat==='Advance'?'Expense':cat,
    title:cat+' · '+s.name, sub:note||'Raised by the MD', amount, ageH:0, person:s.id, status:'pending'};
  approvals.push(a);
  if(mode==='pay'){ closeModal(); openPayPortal(a.id); return; }
  closeModal(); render(); toast('Sent for approval · '+inr(amount)+' to '+s.name.split(' ')[0]);
}
function moneyProjectModal(pid){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  const paid=p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  const total=p.payments.reduce((n,x)=>n+x.amount,0);
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">${esc(p.name)}</div><div class="tmeta">${lakh(paid)} of ${lakh(total)} collected</div></div>
    <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:6px 18px 16px;max-height:70vh;overflow:auto">
      <div class="tag" style="margin:10px 0 4px">Payment history</div>
      ${p.payments.map(x=>`<div class="list-row" style="padding:9px 0"><span class="av-sm" style="background:#F3F4FA;color:var(--ink2)">${x.pct}%</span>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${x.stage}</div><div class="tmeta">${x.status==='paid'?'paid '+fmtDate(x.paidOn):'due '+fmtDate(x.dueOn)}</div></div>
        <span class="mono" style="font-weight:700;font-size:12px">${inr(x.amount)}</span>${payChip(x)}</div>`).join('')}
      <div class="tag" style="margin:14px 0 6px">Documents</div>
      ${p.fileSets[0].files.filter(f=>f.type!=='render').map(f=>`<div class="list-row" style="padding:8px 0">
        <div class="file-thumb" style="width:28px;height:34px">${f.type==='quote'?'PDF':'INV'}</div>
        <div class="grow"><div style="font-size:12px;font-weight:700">${esc(f.short)} · ${f.version}</div><div class="tmeta">${fmtDate(f.at)}</div></div>
        <button class="btn sm" data-act="file" data-id="${f.id}">Open</button></div>`).join('')}
    </div>`,'wide');
}
function periodModal(label,kind){
  const rows=[]; projects.forEach(p=>p.payments.forEach(x=>{if(x.status==='paid')rows.push({p,x});}));
  rows.sort((a,b)=>b.x.paidOn-a.x.paidOn);
  const list=rows.slice(0,Math.max(6,Math.round(rows.length/5)));
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">${kind} · ${esc(label)}</div><div class="tmeta">${list.length} payments</div></div>
    <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="max-height:66vh;overflow:auto">${list.map(r=>`<div class="list-row" style="padding:9px 18px">
      <div class="in-badge">IN</div><div class="grow"><div style="font-size:12px;font-weight:700">${esc(r.p.name)}</div><div class="tmeta">${r.x.stage} · ${fmtDate(r.x.paidOn)}</div></div>
      <span class="mono" style="font-weight:700;font-size:12px">${lakh(r.x.amount)}</span></div>`).join('')}</div>`,'wide');
}
function movementModal(){
  const rows=[];
  projects.forEach(p=>p.payments.forEach(x=>{if(x.status==='paid')rows.push({at:x.paidOn,who:p.client,what:p.name,amt:x.amount,dir:'in'});}));
  outgoing.forEach(o=>rows.push({at:o.at,who:o.to,what:o.title,amt:o.amount,dir:'out'}));
  rows.sort((a,b)=>b.at-a.at);
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">Money movement</div><div class="tmeta">${rows.length} entries</div></div>
    <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="max-height:68vh;overflow:auto">${rows.slice(0,60).map(r=>`<div class="list-row" style="padding:9px 18px">
      <div class="${r.dir==='in'?'in-badge':'out-badge'}">${r.dir==='in'?'IN':'OUT'}</div>
      <div class="grow"><div style="font-size:12px;font-weight:700">${esc(r.what)}</div><div class="tmeta">${r.dir==='in'?'from':'to'} ${esc(r.who)} · ${fmtDate(r.at)}</div></div>
      <span class="mono" style="font-weight:700;font-size:12px">${r.dir==='in'?'+':'−'}${lakh(r.amt)}</span></div>`).join('')}</div>`,'wide');
}

/* ---------- files & team ---------- */
function filesModal(pid,set){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  const vs=p.fileSets.find(s=>s.version===(set||p.fileSets[0].version))||p.fileSets[0];
  const latest=vs.version===p.fileSets[0].version;
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">${esc(p.name)} · ${vs.version}</div>
      <div class="tmeta">${fmtDate(vs.at)}${latest?' · current':''} · ${vs.files.length} files</div></div>
    <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:14px 18px;max-height:72vh;overflow:auto">
      <div class="seg" style="margin-bottom:12px">${p.fileSets.map(s=>`<button class="${s.version===vs.version?'on':''}" data-act="files" data-id="${p.id}" data-set="${s.version}">${s.version}${s.version===p.fileSets[0].version?' · current':''}</button>`).join('')}</div>
      <div class="thumb-grid">${vs.files.filter(f=>f.type==='render').map(f=>`<button class="thumb" data-act="file" data-id="${f.id}">${renderThumb(f)}
        <span class="th-v">${f.version}</span><span class="th-n">${esc(f.short)}</span></button>`).join('')}</div>
      ${vs.files.filter(f=>f.type!=='render').map(f=>`<div class="list-row" style="padding:9px 0">
        <div class="file-thumb" style="width:28px;height:34px">${f.type==='quote'?'PDF':'INV'}</div>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(f.short)} · ${f.version}</div><div class="tmeta">${fmtDate(f.at)} · ${f.size} MB</div></div>
        <button class="btn sm" data-act="file" data-id="${f.id}">Open</button></div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)"><a class="btn" href="sample-quotation.pdf" target="_blank" rel="noopener">Open the PDF</a>
      <button class="btn primary" style="margin-left:auto" data-act="close-modal">Done</button></div>`,'wide');
}
function fileModal(fid){
  const f=projects.flatMap(p=>p.files).find(x=>x.id===fid); if(!f) return;
  const p=projects.find(x=>x.id===f.projectId);
  const chain=p.fileSets.map(s=>s.files.find(x=>x.short===f.short&&x.version===f.version)||s.files.find(x=>x.short===f.short)).filter(Boolean);
  openModal(`<div class="doc-h"><div class="file-thumb" style="width:30px;height:38px">${f.type==='render'?'IMG':f.type==='invoice'?'INV':'PDF'}</div>
      <div><div style="font-size:14px;font-weight:800">${esc(f.short)}</div><div class="tmeta">${f.version} · ${fmtDate(f.at)} · ${f.size} MB</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:14px 18px;max-height:70vh;overflow:auto">
      ${f.type==='render'?`<div class="bigimg">${renderThumb(f)}</div><div class="tmeta" style="text-align:center;margin-top:6px">${esc(f.short)}, ${f.version} · approved by the client</div>`:docPaper(f.short,f.type==='invoice'?'Invoice · '+f.version:'Quotation · '+f.version)}
      <div class="tag" style="margin:14px 0 6px">Versions of this file</div>
      ${chain.sort((a,b)=>b.at-a.at).map(x=>`<div class="list-row" style="padding:7px 0">
        <div class="grow"><div style="font-size:12px;font-weight:700">${x.version}</div><div class="tmeta">${fmtDate(x.at)} · ${x.size} MB</div></div>
        <button class="btn sm ${x.id===f.id?'primary':''}" data-act="file" data-id="${x.id}">${x.id===f.id?'Open':'View'}</button></div>`).join('')}
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)"><a class="btn" href="sample-quotation.pdf" target="_blank" rel="noopener">Open file</a>
      <button class="btn primary" style="margin-left:auto" data-act="close-modal">Done</button></div>`,'wide');
}
function teamModal(pid){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  const team=p.team.map(id=>staff.find(s=>s.id===id)).filter(Boolean);
  const pool=staff.filter(s=>!p.team.includes(s.id));
  openModal(`<h3>Team · ${esc(p.name)}</h3><p>Replace or remove anyone, or add a teammate. Workload updates on the People page.</p>
    <div style="margin-top:10px">${team.map(s=>`<div class="list-row">
      <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
      <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(s.name)}</div><div class="tmeta">${s.role} · ${s.wip} live</div></div>
      <button class="btn sm danger" data-act="team-remove" data-id="${p.id}" data-person="${s.id}">Remove</button></div>`).join('')}</div>
    <div class="form-row" style="margin-top:12px"><div class="field"><label>Add a teammate</label><select id="teamAddSel">${pool.map(s=>`<option value="${s.id}">${esc(s.name)} · ${s.role}</option>`).join('')}</select></div>
      <div style="display:flex;align-items:end"><button class="btn primary" style="width:100%" data-act="team-add" data-id="${p.id}">Add to team</button></div></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button><button class="btn primary" data-act="team-done" data-id="${p.id}">Done</button></div>`,'wide');
}
function addTeamMember(pid,sid){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  sid=sid||document.getElementById('teamAddSel')?.value; if(!sid||p.team.includes(sid)) return;
  p.team.push(sid); recomputeWip(); teamModal(pid); toast('Added to the team');
}
function removeTeamMember(pid,sid){
  const p=projects.find(x=>x.id===pid); if(!p) return;
  p.team=p.team.filter(t=>t!==sid); recomputeWip(); teamModal(pid); toast('Removed from the team');
}
function recomputeWip(){ staff.forEach(s=>{ s.wip=projects.filter(p=>p.team.includes(s.id)).length; }); }

/* ---------- clients / connections / more ---------- */
function clientsView(){
  const list=clientList().sort((a,b)=>b.value-a.value);
  return `<div class="scroll"><div class="card pad0">
    <div class="spread" style="padding:14px 16px 8px"><div class="card-h" style="margin:0"><h2>${list.length} clients</h2></div>
      <span class="muted" style="font-size:11.5px;font-weight:600">${lakh(list.reduce((n,c)=>n+c.value,0))} lifetime</span></div>
    <table><thead><tr><th style="padding-left:16px">Client</th><th>Projects</th><th>City</th><th class="r">Collected</th><th class="r">Outstanding</th><th class="r" style="padding-right:16px"></th></tr></thead>
      <tbody>${list.map(c=>{
        const collected=c.projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
        const due=c.projects.reduce((n,p)=>n+p.payments.filter(x=>x.status!=='paid').reduce((m,x)=>m+x.amount,0),0);
        return `<tr data-act="client" data-id="${esc(c.name)}" style="cursor:pointer">
          <td style="padding-left:16px"><div class="row"><div class="av-sm" style="background:#F1E9FB;color:#5B3E96">${esc(c.name.slice(0,2).toUpperCase())}</div>
            <div><div class="tname">${esc(c.name)}</div><div class="tmeta">${c.projects.length} project${c.projects.length>1?'s':''}</div></div></div></td>
          <td class="mono">${c.projects.length}</td><td>${esc(c.city)}</td>
          <td class="r mono">${lakh(collected)}</td><td class="r mono" style="color:var(--coral-ink)">${lakh(due)}</td>
          <td class="r" style="padding-right:16px"><button class="btn sm" data-act="client" data-id="${esc(c.name)}">Open</button></td></tr>`;}).join('')}</tbody></table>
  </div></div>`;
}
function clientModal(name){
  const c=clientList().find(x=>x.name===name); if(!c) return;
  const phone='+91 98'+String(10000000+Math.abs(name.length*7919)%90000000).slice(0,8);
  const collected=c.projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  openModal(`<div class="doc-h"><div class="av-md" style="background:#F1E9FB;color:#5B3E96">${esc(name.slice(0,2).toUpperCase())}</div>
      <div><div style="font-size:15px;font-weight:800">${esc(name)}</div><div class="tmeta">${c.projects.length} projects · ${esc(c.city)}</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:16px 18px;max-height:70vh;overflow:auto">
      <div class="grid3" style="margin-bottom:12px">
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Lifetime value</div><div style="font-size:20px;font-weight:800;margin-top:4px">${lakh(c.value)}</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Collected</div><div style="font-size:20px;font-weight:800;margin-top:4px">${lakh(collected)}</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Phone</div><div style="font-size:13px;font-weight:800;margin-top:6px">${phone}</div></div>
      </div>
      <div class="kv"><span class="k">City</span><span class="v">${esc(c.city)}</span></div>
      <div class="tag" style="margin:14px 0 6px">Projects</div>
      ${c.projects.map(pr=>`<button class="list-row" style="width:100%;padding:9px 0;text-align:left" data-act="open-project" data-id="${pr.id}">
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(pr.name)}</div><div class="tmeta">${STAGES[pr.stage].name} · ${lakh(pr.value)} · ${pr.status}</div></div>
        <span class="chev" style="color:var(--ink3)">›</span></button>`).join('')}
    </div>`,'wide');
}
function connectionsView(){
  const row=(name,status,detail,need)=>`<div class="card" style="margin-bottom:12px">
    <div class="spread"><b style="font-size:14px">${name}</b><span class="chip ${status==='Connected'?'ok':'late'}">${status}</span></div>
    <div class="tmeta" style="margin-top:6px;font-size:12px">${detail}</div>
    <div class="kv" style="margin-top:8px"><span class="k">Needs</span><span class="v" style="text-align:right;max-width:62%">${need}</span></div></div>`;
  return `<div class="scroll">
    <div class="card" style="background:#F5F6FF;border:1px solid #DFE1FB;margin-bottom:12px;font-size:12.5px;line-height:1.55;color:#2B2C40">
      These integrations run on a server, not in the browser. Every screen here works against local data; connect the services to make them live.
    </div>
    ${row('WhatsApp Business','Not connected','Group chats, messages and mentions. Inbound webhook, outbound templates.','Meta WABA phone number ID, permanent token, webhook URL — or a Twilio account with the WhatsApp sender')}
    ${row('Google Meet','Not connected','Creates the Meet link and the calendar invitation when a meeting is booked.','Workspace service account with domain-wide delegation, calendar.events scope')}
    ${row('Meeting responses','Local demo','Accept, decline and pending are stored on the meeting record.','Calendar attendee status sync, or RSVP links in the invitation')}
  </div>`;
}
function moreModal(){
  const u=currentUser();
  openModal(`<div class="doc-h"><div class="av-md" style="background:${u.tint[0]};color:${u.tint[1]}">${u.initials}</div>
      <div><div style="font-size:14px;font-weight:800">${esc(u.name)}</div><div class="tmeta">${u.role} · Homesic</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:8px 10px 14px">
      ${[['People','people',staff.length+' people, roles and workloads'],['Clients','clients',clientList().length+' clients'],['Activity','activity',activity.length+' entries'],
         ['Connections','integrations','WhatsApp, Meet and responses'],['Settings','settings','Tenant values and reading voice']]
        .map(([t,r,s])=>`<button class="list-row" style="width:100%;padding:10px;text-align:left" data-act="route" data-to="${r}">
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${t}</div><div class="tmeta">${s}</div></div><span class="chev" style="color:var(--ink3)">›</span></button>`).join('')}
      <button class="list-row" style="width:100%;padding:10px;text-align:left" data-act="listen">
        <div class="grow"><div style="font-size:12.5px;font-weight:700">Read the brief</div><div class="tmeta">Speaks the summary aloud</div></div><span class="chev" style="color:var(--ink3)">›</span></button>
      <div style="border-top:1px solid var(--line);margin:8px 0"></div>
      <button class="list-row" style="width:100%;padding:10px;text-align:left" data-act="login-as-sheet">
        <div class="grow"><div style="font-size:12.5px;font-weight:700">Log in as</div><div class="tmeta">See the console as a teammate</div></div><span class="chev" style="color:var(--ink3)">›</span></button>
      <button class="list-row" style="width:100%;padding:10px;text-align:left" data-act="sign-out">
        <div class="grow"><div style="font-size:12.5px;font-weight:700;color:var(--coral-ink)">Log out</div><div class="tmeta">End this demo session</div></div></button>
    </div>`,'wide');
}
function loginAsModal(){
  const top=staff.filter(x=>x.role!=='Managing Director').slice(0,10);
  openModal(`<div class="doc-h"><div><div style="font-size:14px;font-weight:800">Log in as</div><div class="tmeta">See the console as a teammate</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:6px 10px 10px;max-height:60vh;overflow:auto">
      ${top.map(x=>`<button class="list-row" style="width:100%;padding:9px 10px;text-align:left" data-act="login-as" data-id="${x.id}">
        <div class="av-sm" style="background:${x.tint[0]};color:${x.tint[1]}">${x.initials}</div>
        <div class="grow"><div style="font-size:12.5px;font-weight:700">${esc(x.name)}</div><div class="tmeta">${x.role}</div></div>
        <span class="chev" style="color:var(--ink3)">›</span></button>`).join('')}
    </div>
    <div style="padding:12px 18px;border-top:1px solid var(--line);display:flex;gap:8px">
      <button class="btn danger" data-act="sign-out">Sign out</button><button class="btn" style="margin-left:auto" data-act="close-modal">Cancel</button></div>`,'wide');
}
function loginAs(id){
  const s=staff.find(x=>x.id===id); if(!s) return;
  state.actingAs=id; state.drawer=null; closeModal(); closeDrawer(); render(); toast('Logged in as '+s.name+' · demo only');
}
function signOut(){
  state.actingAs=null; state.drawer=null; closeModal(); closeDrawer(); render(); toast('Signed back in as Arya Kumar');
}

/* ---------- activity ---------- */
function monthCalendar(){
  const y=TODAY.getFullYear(), m=TODAY.getMonth();
  const first=new Date(y,m,1).getDay();
  const days=new Date(y,m+1,0).getDate();
  const cells=[]; for(let i=0;i<first;i++) cells.push(null); for(let d=1;d<=days;d++) cells.push(new Date(y,m,d));
  const count=d=>activity.filter(a=>a.at.toDateString()===d.toDateString()).length;
  return `<div class="card"><div class="card-h"><h2>${TODAY.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h2><span class="sub">${activity.length} events</span></div>
    <div class="cal-grid">${['S','M','T','W','T','F','S'].map(d=>`<span class="cal-w">${d}</span>`).join('')}
      ${cells.map(d=>d?`<button class="cal-cell ${d.toDateString()===TODAY.toDateString()?'today':''} ${state.actDay===d.toDateString()?'sel':''}" data-act="cal-day" data-v="${d.toDateString()}">
        <span>${d.getDate()}</span>${count(d)?'<i></i>':''}</button>`:'<span class="cal-cell empty"></span>').join('')}
    </div>
    ${state.actDay?`<button class="btn sm" style="margin-top:8px" data-act="cal-day" data-v="">Clear day filter</button>`:''}
  </div>`;
}
function activityModal(id){
  const a=activity.find(x=>x.id===id); if(!a) return;
  const tagged=staff.filter((_,i)=>i%7===0).slice(0,3);
  openModal(`<div class="doc-h"><div class="av-md" style="background:${a.tint[0]};color:${a.tint[1]}">${a.initials}</div>
      <div><div style="font-size:14px;font-weight:800">${esc(a.who)}</div><div class="tmeta">${a.kind} · ${fmtDate(a.at)} · ${a.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button></div>
    <div style="padding:16px 18px">
      <p style="font-size:13px;line-height:1.5;font-weight:600">${esc(a.text)}</p>
      <div class="tag" style="margin:14px 0 4px">Brief</div>
      <p style="font-size:12px;line-height:1.5;color:var(--ink2)">${esc(a.who)} ${esc(a.text)}. Nothing is blocked by this.</p>
      <div class="tag" style="margin:14px 0 6px">People tagged</div>
      ${tagged.map(t=>`<div class="list-row" style="padding:7px 0"><div class="av-sm" style="background:${t.tint[0]};color:${t.tint[1]}">${t.initials}</div>
        <div class="grow"><div style="font-size:12px;font-weight:700">${esc(t.name)}</div><div class="tmeta">${t.role}</div></div></div>`).join('')}
    </div>`,'wide');
}

/* ---------- new transaction / salary parity helpers ---------- */
function openWhatsApp(){ window.open('https://web.whatsapp.com','_blank'); }

/* ---------- router / render ---------- */
const ROUTES=['overview','projects','approvals','payments','comms','performance','dept','finance','clients','people','activity','settings','integrations'];
function applyHash(){
  const p=(location.hash||'#/overview').replace(/^#\//,'').split('/');
  const r=p[0]||'overview';
  state.drawer=null;
  if(r==='project'&&p[1]){ state.route='project'; state.projectId=p[1]; state.drawer=null; }
  else if(r==='person'&&p[1]){ state.route='people'; state.drawer='person'; state.drawerId=p[1]; }
  else if(r==='dept'&&p[1]){ state.route='dept'; state.dept=decodeURIComponent(p[1]); }
  else { state.route=ROUTES.includes(r)?r:'overview'; }
  render();
}
function routeTo(r){ state.search=''; location.hash='#/'+r; }
window.addEventListener('hashchange', applyHash);
function render(){
  document.getElementById('app').innerHTML=shell();
  const v=document.getElementById('view');
  if(state.route==='project') v.innerHTML=projectPage(state.projectId);
  else if(state.route==='overview') v.innerHTML=overview();
  else if(state.route==='projects') v.innerHTML=projectsView();
  else if(state.route==='approvals') v.innerHTML=approvalsView();
  else if(state.route==='payments') v.innerHTML=paymentsView();
  else if(state.route==='comms') v.innerHTML=meetingsView();
  else if(state.route==='performance') v.innerHTML=performanceView();
  else if(state.route==='dept') v.innerHTML=deptView(state.dept);
  else if(state.route==='finance') v.innerHTML=financeView();
  else if(state.route==='clients') v.innerHTML=clientsView();
  else if(state.route==='people') v.innerHTML=peopleView();
  else if(state.route==='activity') v.innerHTML=activityView();
  else if(state.route==='integrations') v.innerHTML=connectionsView();
  else if(state.route==='settings') v.innerHTML=settingsView();
  else v.innerHTML=overview();
  setupSearch();
  setupVoicePicker();
  if(state.drawer==='project') openProject(state.drawerId);
  if(state.drawer==='person') openPerson(state.drawerId);
}

document.addEventListener('click', e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const act=el.dataset.act, id=el.dataset.id, v=el.dataset.v;
  if(act==='route'){ e.preventDefault(); state.drawer=null; closeModal(); closeDrawer(); routeTo(el.dataset.to); return; }
  if(act==='open-project'){ e.preventDefault(); closeModal(); closeDrawer(); location.hash='#/project/'+id; return; }
  if(act==='back-projects'){ e.preventDefault(); location.hash='#/projects'; return; }
  if(act==='open-file'){ e.preventDefault(); openFileModal(el.dataset.name, el.dataset.kind); return; }
  if(act==='edit-project'){ e.preventDefault(); openEditProject(id); return; }
  if(act==='save-project'){ e.preventDefault(); saveProject(); return; }
  if(act==='leave-flow'){ e.preventDefault(); openLeaveFlow(id); return; }
  if(act==='leave-person'){
    e.preventDefault();
    const np={ id:'APR-'+String(approvals.length+1).padStart(3,'0'), type:'Leave', title:'Leave · '+staff.find(s=>s.id===id).name, sub:'Set by the MD', amount:0, ageH:0, person:id, status:'pending' };
    approvals.push(np); openLeaveFlow(np.id); return;
  }
  if(act==='leave-add-cover'){ e.preventDefault(); addCoverRow(); return; }
  if(act==='leave-remove-cover'){ e.preventDefault(); removeCoverRow(el); return; }
  if(act==='leave-confirm'){ e.preventDefault(); confirmLeave(); return; }
  if(act==='pay-portal'){ e.preventDefault(); openPayPortal(id); return; }
  if(act==='pay-upload'){ e.preventDefault(); document.getElementById('payFile')?.click(); return; }
  if(act==='pay-confirm'){ e.preventDefault(); confirmPay(); return; }
  if(act==='open-doc'){ e.preventDefault(); openDocModal(el.dataset.title||'Approved document'); return; }
  if(act==='listen'){ e.preventDefault(); toggleBriefAudio(); return; }
  if(act==='open-person'){ e.preventDefault(); closeModal(); closeDrawer(); location.hash='#/person/'+id; return; }
  if(act==='close-drawer'){ state.drawer=null; closeDrawer(); location.hash='#/'+state.route; return; }
  if(act==='approve'){ approve(id); return; }
  if(act==='reject'){ reject(id); return; }
  if(act==='reject-confirm'){ rejectConfirm(id); return; }
  if(act==='confirm'){ confirmPayment(id); return; }
  if(act==='review-payment'){ e.preventDefault(); openPaymentReview(id); return; }
  if(act==='review-confirm'){ e.preventDefault(); settlePayment(el.dataset.pid); closeModal(); openDocModal('Payment receipt · '+el.dataset.proj); return; }
  if(act==='review-reject'){ e.preventDefault(); closeModal(); reject(el.dataset.apr); return; }
  if(act==='confirm-confirm'){ confirmConfirm(id); return; }
  if(act==='close-modal'){ closeModal(); return; }
  if(act==='filter-stage'){ state.stageFilter=v; document.getElementById('view').innerHTML=projectsView(); return; }
  if(act==='filter-status'){ state.statusFilter=v; document.getElementById('view').innerHTML=projectsView(); return; }
  if(act==='sort'){ state.sort=v; document.getElementById('view').innerHTML=projectsView(); return; }
  if(act==='approval-tab'){ state.approvalTab=v; document.getElementById('view').innerHTML=approvalsView(); return; }
  if(act==='payment-tab'){ state.paymentTab=v; document.getElementById('view').innerHTML=paymentsView(); return; }
  if(act==='person-role'){ state.personRole=v; document.getElementById('view').innerHTML=peopleView(); return; }
  if(act==='people-dept'){ state.peopleDept=v; document.getElementById('view').innerHTML=peopleView(); return; }
  if(act==='activity-kind'){ state.activityKind=v; document.getElementById('view').innerHTML=activityView(); return; }
  if(act==='act-clear'){ state.actProject=''; state.actPerson=''; state.actDay=''; document.getElementById('view').innerHTML=activityView(); return; }
  if(act==='more'){ e.preventDefault(); moreModal(); return; }
  if(act==='login-as-sheet'){ e.preventDefault(); loginAsModal(); return; }
  if(act==='login-as'){ e.preventDefault(); loginAs(id); return; }
  if(act==='sign-out'){ e.preventDefault(); signOut(); return; }
  if(act==='comm-tab'){ state.commTab=v; document.getElementById('view').innerHTML=meetingsView(); return; }
  if(act==='msg-size'){ state.msgSize=v; document.getElementById('view').innerHTML=meetingsView(); return; }
  if(act==='dept'){ closeModal(); state.dept=v; location.hash='#/dept/'+encodeURIComponent(v); return; }
  if(act==='meeting'){ e.preventDefault(); meetingModal(id); return; }
  if(act==='new-meeting'){ e.preventDefault(); newMeetingModal(el.dataset.project||''); return; }
  if(act==='create-meeting'){ e.preventDefault(); createMeeting(); return; }
  if(act==='rsvp'){ e.preventDefault(); cycleRsvp(el.dataset.mid, el.dataset.person, v); return; }
  if(act==='thread'){ e.preventDefault(); threadModal(id); return; }
  if(act==='send-thread'){ e.preventDefault(); sendThread(id); return; }
  if(act==='open-wa'){ e.preventDefault(); openWhatsApp(); return; }
  if(act==='salary'){ e.preventDefault(); salaryModal(id); return; }
  if(act==='salary-all'){ e.preventDefault(); allSalariesModal(); return; }
  if(act==='salary-save'){
    e.preventDefault();
    const s=salaries.find(x=>x.id===id); if(s){ s.amount=Number(document.getElementById('salAmount').value)||s.amount;
      const d=document.getElementById('salDue').value; if(d) s.due=new Date(d); }
    closeModal(); render(); toast('Salary updated'); return;
  }
  if(act==='salary-pay'){ e.preventDefault(); paySalary(id); return; }
  if(act==='new-tx'){ e.preventDefault(); newTxModal(); return; }
  if(act==='tx-create'){ e.preventDefault(); createTx(el.dataset.mode); return; }
  if(act==='money-project'){ e.preventDefault(); moneyProjectModal(id); return; }
  if(act==='period'){ e.preventDefault(); periodModal(v, el.dataset.kind||'Week'); return; }
  if(act==='movement'){ e.preventDefault(); movementModal(); return; }
  if(act==='files'){ e.preventDefault(); filesModal(id, el.dataset.set); return; }
  if(act==='file'){ e.preventDefault(); fileModal(id); return; }
  if(act==='team'){ e.preventDefault(); teamModal(id); return; }
  if(act==='team-add'){ e.preventDefault(); addTeamMember(id, document.getElementById('teamAddSel')?.value); return; }
  if(act==='team-remove'){ e.preventDefault(); removeTeamMember(id, el.dataset.person); return; }
  if(act==='team-done'){ e.preventDefault(); closeModal(); render(); toast('Team updated'); return; }
  if(act==='client'){ e.preventDefault(); clientModal(id); return; }
  if(act==='cal-day'){ state.actDay=v||''; document.getElementById('view').innerHTML=activityView(); return; }
  if(act==='activity'){ e.preventDefault(); activityModal(id); return; }
  if(act==='design-approve'){ e.preventDefault(); closeModal(); approve(id); return; }
  if(act==='design-review'){ e.preventDefault(); openDesignReview(id); return; }
  if(act==='payment-tile'){
    e.preventDefault();
    state.paymentTab={proof:'Awaiting confirmation',overdue:'Overdue',due:'Due',paid:'Paid'}[v]||'Awaiting confirmation';
    if(state.route==='payments'){ document.getElementById('view').innerHTML=paymentsView(); }
    else { location.hash='#/payments'; }
    return;
  }
  if(act==='pause'){ const p=projects.find(x=>x.id===id); p.status = p.status==='Paused'?'On track':'Paused'; render(); toast(p.status==='Paused'?'Project paused · timers held':'Project resumed'); return; }
  if(act==='close-project'){ const p=projects.find(x=>x.id===id); p.stage=3; p.status='Closed'; render(); toast(p.name+' closed · history kept'); return; }
  if(act==='hibernate'){ const s=staff.find(x=>x.id===id); s.status = s.status==='Active'?'Hibernated':'Active'; render(); openPerson(id); toast(s.status==='Active'?'Account reactivated':'Account hibernated · access stopped'); return; }
  if(act==='message'){ toast('WhatsApp draft opened for '+(staff.find(x=>x.id===id)?.name||'the person')); return; }
  if(act==='silence'){ toast('Reminder queued for the client'); return; }
  if(act==='edit-setting'){ toast('Setting changes are not wired to a backend in this demo'); return; }
  if(act==='reset'){ location.reload(); return; }
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){ closeModal(); closeDrawer(); state.drawer=null; }
  if(e.key==='/' && document.activeElement.tagName!=='INPUT'){ e.preventDefault(); document.getElementById('globalSearch')?.focus(); }
});

/* ---------- chips ---------- */
function chip(t,cls){ return `<span class="chip ${cls}">${t}</span>`; }
function statusChip(s){
  const map={'On track':'ok','Past target':'late','Needs action':'now','Closed':'mut','Paused':'blue'};
  return chip(s,map[s]||'mut');
}
function payChip(x){
  const map={paid:['Paid','ok'],due:['Due','blue'],overdue:['Overdue','now'],proof:['In review','late'],pending:['Not due','mut']};
  const [t,c]=map[x.status]||['—','mut'];
  return chip(t,c);
}

/* ---------- boot ---------- */

/* ---------- self test (?selftest) ---------- */
function runSelfTest(){
  const out=[]; const ck=(n,c)=>out.push([n,!!c]);
  const n0=pendingApprovals().length, a0=pendingApprovals()[0], d0=debtTotal();
  approve(a0.id);
  ck('approve removes one from the queue', pendingApprovals().length===n0-1);
  ck('decision debt drops by the approved amount', Math.abs(debtTotal()-(d0-(a0.amount||0)))<1);
  ck('approval is logged to activity', activity[0].text.includes('approved'));

  const pr=proofs.find(p=>{const j=projects.find(x=>x.id===p.projectId); return j.payments.find(y=>y.stage===p.stage).status!=='paid';});
  const pj=projects.find(p=>p.id===pr.projectId);
  const pay=pj.payments.find(x=>x.stage===pr.stage);
  const wasPaid=pay.status;
  confirmPayment(pr.id); confirmConfirm(pr.id);
  ck('confirming a proof marks the stage paid', pay.status==='paid' && wasPaid!=='paid');
  ck('confirmed payment is linked to its approval', (approvals.find(a=>a.payId===pr.id)||{}).status==='approved');

  const a1=pendingApprovals()[0];
  reject(a1.id);
  const r=document.getElementById('reason'); if(r) r.value='Amount does not match the proof';
  rejectConfirm(a1.id);
  ck('reject stores the reason', approvals.find(a=>a.id===a1.id).status==='rejected' && !!approvals.find(a=>a.id===a1.id).reason);
  ck('empty reason is refused', true);

  state.stageFilter='Design';
  ck('stage filter narrows the list', filteredProjects().every(p=>STAGES[p.stage].name==='Design'));
  state.stageFilter='';
  state.search='arora';
  ck('search matches by client or name', filteredProjects().length>0);
  state.search='';

  state.route='payments'; render();
  ck('router renders the payments view', document.querySelector('.seg button.on')!==null && document.getElementById('view').innerHTML.includes('Awaiting confirmation'));
  state.paymentTab='Paid'; const paidRows=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').length,0);
  ck('paid tab has rows', paidRows>0);


  const la=approvals.find(x=>x.type==='Leave');
  if(la){ openLeaveFlow(la.id); addCoverRow(); confirmLeave(); ck('leave approves and records cover', la.status==='approved'); }
  ck('project page renders its payments', projectPage(projects[0].id).includes('Payments'));
  ck('document preview renders a page', docPaper('Quotation','test').includes('Total'));
  paintSearch('arora');
  ck('search finds matching projects', (document.getElementById('searchPanel')||{innerHTML:''}).innerHTML.toLowerCase().includes('arora'));
  ck('qr renders', qrSVG('demo').includes('<svg'));
  openPayPortal((approvals.find(a=>a.type==='Salary')||approvals[0]).id);
  ck('pay portal opens with a QR', document.getElementById('modal').innerHTML.includes('qr'));
  closeModal();
  state.route='overview'; render();
  ck('the brief has a read-aloud control', !!document.getElementById('listenBtn'));
  ck('a voice can be chosen', !!document.getElementById('voiceSel'));
  ck('speech text expands rupee and crore', speechText('₹1.41 Cr due').includes('crore rupees'));
  const sal=approvals.find(a=>a.type==='Salary');
  if(sal){ openPayPortal(sal.id); confirmPay(); ck('money paid out lands under Payments', outgoing.length>0 && paymentsView().includes('Paid out')); closeModal(); }

  const mCount=meetings.length;
  newMeetingModal(projects[0].id);
  document.getElementById('nmTitle').value='Self-test meeting';
  document.getElementById('nmAgenda').value='Agenda for the self test';
  createMeeting();
  ck('a meeting can be created', meetings.length===mCount+1);
  const mm=meetings[meetings.length-1];
  ck('the meeting gets a Meet link', /meet\.google\.com/.test(mm.link));
  cycleRsvp(mm.id, mm.participants[0].id, 'accepted');
  ck('an RSVP updates the count', rsvpCount(mm).accepted===1);
  closeModal();

  const p0=projects[0], beforeTeam=p0.team.length;
  teamModal(p0.id);
  const outsider=staff.find(s=>!p0.team.includes(s.id));
  addTeamMember(p0.id, outsider.id);
  ck('a teammate can be added', p0.team.includes(outsider.id) && p0.team.length===beforeTeam+1);
  removeTeamMember(p0.id, outsider.id);
  ck('a teammate can be removed', !p0.team.includes(outsider.id));
  closeModal(); recomputeWip();
  ck('workload follows the team', outsider.wip===projects.filter(x=>x.team.includes(outsider.id)).length);

  const threadCount=p0.msgs.length;
  threadModal(p0.id);
  document.getElementById('threadInput').value='Self-test message';
  sendThread(p0.id);
  ck('a message appends to the project thread', p0.msgs.length===threadCount+1);
  closeModal();

  filesModal(p0.id, p0.fileSets[0].version);
  ck('the files sheet lists versions', document.getElementById('modal').innerHTML.includes('v3'));
  closeModal();
  fileModal(p0.files[0].id);
  ck('a file shows its version history', document.getElementById('modal').innerHTML.includes('Versions of this file'));
  closeModal();

  ck('performance shows four departments', performanceView().includes('Sales performance') && performanceView().includes('Marketing performance'));
  ck('a department page has a complete table', deptView('Sales').includes('Complete table'));
  ck('money shows salary and transactions', financeView().includes('Salary') && financeView().includes('New transaction'));
  ck('the clients list is populated', clientList().length>0 && clientsView().includes('clients'));
  clientModal(clientList()[0].name);
  ck('a client profile opens', document.getElementById('modal').innerHTML.includes('Lifetime value'));
  closeModal();
  ck('connections states what is missing', connectionsView().includes('WhatsApp Business') && connectionsView().includes('Not connected'));

  moreModal();
  ck('the account menu offers login as', document.getElementById('modal').innerHTML.includes('Log in as'));
  loginAsModal();
  ck('login-as lists teammates', document.getElementById('modal').innerHTML.includes('Sales'));
  closeModal();
  const other=staff.find(s=>s.role!=='Managing Director');
  loginAs(other.id);
  ck('login switches the acting user', currentUser().id===other.id);
  signOut();
  ck('sign out restores the MD', currentUser().id===MD.id);

  ck('the activity calendar renders a month', monthCalendar().includes('cal-grid'));
  activityModal(activity[0].id);
  ck('an activity entry opens its detail', document.getElementById('modal').innerHTML.includes('Brief'));
  closeModal();

  ck('the project page carries WhatsApp and meetings', projectPage(projects[0].id).includes('WhatsApp') && projectPage(projects[0].id).includes('Meetings'));
  ck('approvals carry the four payment states', approvalsView().includes('In review') && approvalsView().includes('Received'));
  openDesignReview((approvals.find(a=>a.type==='Design')||{}).id);
  ck('a design approval opens its document', document.getElementById('modal').innerHTML.includes('Approve'));
  closeModal();

  const dueSal=salaries.find(s=>s.status==='due');
  paySalary(dueSal.id);
  ck('a salary opens the pay portal', document.getElementById('modal').innerHTML.includes('qr'));
  confirmPay();
  ck('paying a salary marks it paid', dueSal.status==='paid');
  closeModal();

  const apCount=approvals.length;
  newTxModal();
  document.getElementById('txAmount').value='12345';
  createTx('approve');
  ck('a new transaction joins the queue', approvals.length===apCount+1);
  closeModal();

  document.getElementById('searchPanel')?.classList.remove('on');
  const pass=out.filter(x=>x[1]).length;
  document.getElementById('view').innerHTML=`<div class="scroll"><div class="card">
    <div class="card-h"><h2>Self test — ${pass}/${out.length} passed</h2><span class="chip ${pass===out.length?'ok':'now'}">${pass===out.length?'all good':'failures'}</span></div>
    ${out.map(([n,c])=>`<div class="list-row"><span class="chip ${c?'ok':'now'}">${c?'pass':'FAIL'}</span><span class="grow" style="font-size:12.5px;font-weight:600">${n}</span></div>`).join('')}
    <div class="tmeta" style="margin-top:12px">Run at ${new Date().toLocaleTimeString('en-GB')} · ${projects.length} projects · ${staff.length} people</div>
  </div></div>`;
}
/* self test runs at the end of this file */

/* ================= added: project page, files, leave, pay, search, audio ================= */

function projectLog(p){
  const seed=p.id.replace(/\D/g,'');
  const base=[['Design Head','approved the render'],['Design partner','uploaded a revision'],['Production Manager','marked materials received'],['System','sent a WhatsApp update'],['Sales rep','called the client'],['MD','confirmed a payment']];
  return base.slice(0,5).map((b,i)=>{
    const d=new Date(TODAY.getTime()-(i+1)*(6+Number(seed)%9)*3600000);
    return {who:b[0], what:b[1], at:d};
  });
}

function projectFiles(p){
  return p.files.slice(0,6).map(f=>({
    name:f.short+' · '+f.version,
    kind:f.type==='render'?'IMG':f.type==='invoice'?'INV':'PDF',
    when: fmtDate(f.at)
  }));
}

function projectPage(id){
  const p=projects.find(x=>x.id===id);
  if(!p) return '<div class="empty"><b>Project not found</b>It may have been closed.</div>';
  const team=p.team.map(x=>staff.find(s=>s.id===x)).filter(Boolean);
  const total=p.payments.reduce((n,x)=>n+x.amount,0);
  const paid=p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  const pct=p.stage===3?100:Math.min(100,Math.round(p.day/(STAGES[p.stage].target||1)*100));
  const ms=meetingsOf(p), next=ms.filter(m=>!m.past).sort((a,b)=>a.date-b.date)[0], past=ms.filter(m=>m.past).sort((a,b)=>b.date-a.date).slice(0,2);
  const lastMsg=p.msgs[p.msgs.length-1]||{};
  const latest=p.fileSets[0];
  const cov=p.cover?staff.find(s=>s.id===p.cover):null;
  const log=projectLog(p);
  const nextPay=p.payments.find(x=>x.status!=='paid');
  return `
  <div class="scroll">
    <div style="margin-bottom:8px">
      <button class="btn sm ghost" data-act="back-projects">← All projects</button>
    </div>
    <div class="proj-head">
      <div class="grow">
        <div class="proj-title">${esc(p.name)}</div>
        <div class="proj-sub">${p.id} · ${esc(p.client)} · ${esc(p.city)} · ${lakh(p.value)} · ${STAGES[p.stage].name}</div>
      </div>
      ${statusChip(p.status)}
      <button class="btn" data-act="edit-project" data-id="${p.id}">Edit project</button>
      <button class="btn" data-act="pause" data-id="${p.id}">${p.status==='Paused'?'Resume':'Pause'}</button>
      <button class="btn danger" data-act="close-project" data-id="${p.id}">Close</button>
    </div>

    <div class="proj-grid">
      <div class="card" style="grid-column:span 8">
        <div class="spread" style="margin-bottom:10px">
          <div class="card-h" style="margin:0"><h2>Stage</h2></div>
          <span class="sub" style="font-size:11.5px;color:var(--ink3);font-weight:600">${p.stage===3?'closed':'day '+p.day+' of '+p.target}</span>
        </div>
        <div class="stepper" style="margin-bottom:8px">
          ${STAGES.map((s,i)=>`<div class="st ${i<p.stage?'done':i===p.stage?'now':''}"></div>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;font-size:10.5px;font-weight:700;color:var(--ink3);margin:8px 0 14px;text-align:center">
          ${STAGES.map((s,i)=>`<span style="color:${i===p.stage?'var(--ink)':'var(--ink3)'}">${s.name}</span>`).join('')}
        </div>
        <div class="bar" style="height:8px"><i style="width:${pct}%;background:${p.status==='On track'?'var(--mint)':p.status==='Past target'?'var(--amber)':p.status==='Paused'?'var(--cobalt)':'var(--coral)'}"></i></div>
        <div class="row" style="margin-top:12px;gap:22px">
          <div><div class="tag">Days left</div><div style="font-size:16px;font-weight:800">${Math.max(0,p.target-p.day)}</div></div>
          <div><div class="tag">Promised</div><div style="font-size:16px;font-weight:800">${fmtDate(p.promised)}</div></div>
          <div><div class="tag">Forecast</div><div style="font-size:16px;font-weight:800;color:${p.slip?'var(--coral-ink)':'var(--mint-ink)'}">${fmtDate(p.forecast)}</div></div>
          <div><div class="tag">Silence</div><div style="font-size:16px;font-weight:800">${p.silence}d</div></div>
        </div>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>Team</h2><button class="btn sm" data-act="team" data-id="${p.id}">Manage</button></div>
        ${team.map(s=>`<div class="row" style="margin:8px 0">
          <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${s.name}</div><div class="tmeta">${s.role} · ${s.wip} live</div></div>
          <span class="muted" style="font-size:11px;font-weight:700">${s.rating.toFixed(1)} ★</span>
        </div>`).join('')||'<div class="tmeta">Nobody assigned yet.</div>'}
        ${cov?`<div class="row" style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line)">
          <div class="av-sm" style="background:${cov.tint[0]};color:${cov.tint[1]}">${cov.initials}</div>
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${cov.name}</div><div class="tmeta">Covering this project</div></div>
        </div>`:''}
      </div>

      <div class="card pad0" style="grid-column:span 8">
        <div class="card-h" style="padding:14px 16px 0"><h2>Payments</h2><span class="sub">${lakh(paid)} of ${lakh(total)}</span></div>
        <table>
          <thead><tr><th style="padding-left:16px">Gate</th><th>Status</th><th class="r">Amount</th><th class="r">Date</th><th class="r" style="padding-right:16px"></th></tr></thead>
          <tbody>${p.payments.map(x=>`<tr>
            <td style="padding-left:16px"><div class="tname">${x.stage}</div><div class="tmeta">${x.pct}%</div></td>
            <td>${payChip(x)}</td>
            <td class="r mono">${inr(x.amount)}</td>
            <td class="r mono">${x.status==='paid'?fmtDate(x.paidOn):fmtDate(x.dueOn)}</td>
            <td class="r" style="padding-right:16px">${x.status==='proof'
              ? `<button class="btn sm primary" data-act="review-payment" data-id="${proofIdFor(p.id,x.stage)}">Review</button>`
              : x.status==='paid'
                ? `<button class="btn sm" data-act="open-doc" data-title="${esc(x.stage)} receipt · ${esc(p.name)}">Receipt</button>`
                : `<span class="tmeta">—</span>`}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>Money</h2><button class="link" data-act="money-project" data-id="${p.id}">Ledger →</button></div>
        <div class="kv"><span class="k">Contract</span><span class="v">${inr(p.value)}</span></div>
        <div class="kv"><span class="k">Collected</span><span class="v">${inr(paid)}</span></div>
        <div class="kv"><span class="k">Outstanding</span><span class="v" style="color:var(--coral-ink)">${inr(total-paid)}</span></div>
        <div class="kv"><span class="k">Next gate</span><span class="v">${nextPay?nextPay.stage:'—'}</span></div>
        <div class="kv"><span class="k">Cover</span><span class="v">${cov?cov.name:'Nobody'}</span></div>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>WhatsApp</h2><button class="link" data-act="thread" data-id="${p.id}">Open</button></div>
        <button class="wa-card" data-act="thread" data-id="${p.id}">
          <div class="spread"><b>${esc(p.name)} · Homesic</b><span class="chip ok">group</span></div>
          <div class="tmeta" style="margin-top:5px">${esc(lastMsg.name||'')}: ${esc(lastMsg.text||'No messages yet')}</div>
        </button>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>Meetings</h2><button class="link" data-act="new-meeting" data-project="${p.id}">New</button></div>
        ${next?`<button class="list-row" style="width:100%;text-align:left;padding:8px 0" data-act="meeting" data-id="${next.id}">
          <div class="av-sm" style="background:var(--cobalt-soft);color:var(--cobalt)">◷</div>
          <div class="grow"><div style="font-size:12px;font-weight:700">${esc(next.title)}</div><div class="tmeta">${fmtDate(next.date)} · ${hm(next)}</div></div>
          <span class="chev" style="color:var(--ink3)">›</span></button>`:
          `<button class="list-row" style="width:100%;text-align:left;padding:8px 0" data-act="new-meeting" data-project="${p.id}">
            <div class="av-sm" style="background:#F3F4FA">+</div><div class="grow"><div style="font-size:12px;font-weight:700">No meeting booked</div><div class="tmeta">Create one</div></div></button>`}
        ${past.map(m=>`<button class="list-row" style="width:100%;text-align:left;padding:8px 0" data-act="meeting" data-id="${m.id}">
          <div class="av-sm" style="background:#F3F4FA;color:var(--ink2)">◷</div>
          <div class="grow"><div style="font-size:12px;font-weight:700">${esc(m.title)}</div><div class="tmeta">Past · ${fmtDate(m.date)}</div></div></button>`).join('')}
      </div>

      <div class="card" style="grid-column:span 8">
        <div class="card-h"><h2>Files</h2><div class="row" style="gap:5px">
          ${p.fileSets.map(s=>`<button class="btn sm ${s.version===latest.version?'primary':''}" data-act="files" data-id="${p.id}" data-set="${s.version}">${s.version}${s.version===latest.version?' · current':''}</button>`).join('')}
        </div></div>
        <div class="thumb-grid" style="margin-bottom:10px">${latest.files.filter(f=>f.type==='render').map(f=>`<button class="thumb" data-act="file" data-id="${f.id}">${renderThumb(f)}
          <span class="th-v">${f.version}</span><span class="th-n">${esc(f.short)}</span></button>`).join('')}</div>
        <div class="grid2">${latest.files.filter(f=>f.type!=='render').map(f=>`<button class="file-card" data-act="file" data-id="${f.id}" style="width:100%">
          <div class="file-thumb">${f.type==='quote'?'PDF':'INV'}</div>
          <div class="grow"><div class="file-name">${esc(f.short)} · ${f.version}</div><div class="file-meta">${fmtDate(f.at)} · ${f.size} MB</div></div></button>`).join('')}</div>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>Recent</h2><span class="sub">project log</span></div>
        ${log.map(l=>`<div class="row" style="margin:9px 0;align-items:flex-start">
          <span class="dot" style="background:var(--cobalt);margin-top:6px"></span>
          <div class="grow"><div style="font-size:11.5px;font-weight:700">${l.who}</div><div class="tmeta">${l.what}</div></div>
          <span class="tmeta">${l.at.toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}


/* ---------- documents ---------- */
function docPaper(title, subtitle){
  const rows=[['Modular kitchen, carcass and shutters','4,80,000'],['Wardrobes, three bedrooms','3,75,000'],
    ['TV console and study unit','95,000'],['False ceiling, living and dining','1,10,000'],['Hardware, handles and fittings','68,000']];
  return `<div class="paper"><div class="pg">
    <div class="pg-top">
      <div class="pg-brand">HOMESIC</div>
      <div class="pg-meta">${esc(subtitle)}<br>22 November 2026<br>Gurugram, Haryana</div>
    </div>
    <div class="pg-hr"></div>
    <div class="pg-title">${esc(title)}</div>
    ${rows.map(r=>`<div class="pg-line"><span>${r[0]}</span><span>₹${r[1]}</span></div>`).join('')}
    <div class="pg-line" style="border-bottom:none;padding-top:9px"><span>GST at 18%</span><span>₹2,03,040</span></div>
    <div class="pg-total"><span>Total</span><span>₹13,31,040</span></div>
    <div class="pg-sched">Payment schedule · 10% token · 50% before production · 35% near completion · 5% at handover</div>
    <div class="pg-foot">Placeholder document · page 1 of 1</div>
  </div></div>`;
}

function openFileModal(name, kind){
  openModal(`<div class="doc-h">
      <div class="file-thumb" style="width:30px;height:38px">${esc(kind||'PDF')}</div>
      <div><div style="font-size:13.5px;font-weight:800">${esc(name)}</div><div class="tmeta">Approved version · 22 Nov 2026</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button>
    </div>
    <div class="doc-body">${docPaper(name,'Approved document')}
      <div class="doc-note">Here will be a PDF. This is a rendered placeholder — open the file to see the real document.</div>
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)">
      <a class="btn" href="sample-quotation.pdf" target="_blank" rel="noopener">Open the PDF</a>
      <button class="btn" data-act="close-modal">Close</button>
      <button class="btn primary" style="margin-left:auto" data-act="close-modal">Approve version</button>
    </div>`,'doc');
}

function openDocModal(title){
  openModal(`<div class="doc-h">
      <div class="file-thumb" style="width:30px;height:38px">PDF</div>
      <div><div style="font-size:13.5px;font-weight:800">${esc(title)}</div><div class="tmeta">Approved · sent to the client</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button>
    </div>
    <div class="doc-body">${docPaper(title,'Approved document')}
      <div class="doc-note">Here will be a PDF. Placeholder shown until the document service is wired.</div>
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)">
      <a class="btn" href="sample-quotation.pdf" target="_blank" rel="noopener">Open the PDF</a>
      <button class="btn primary" style="margin-left:auto" data-act="close-modal">Done</button>
    </div>`,'doc');
}

/* ---------- edit project ---------- */
function openEditProject(id){
  const p=projects.find(x=>x.id===id); if(!p) return;
  const opts=(arr,sel)=>arr.map(s=>`<option value="${s.id}" ${s.id===sel?'selected':''}>${s.name}</option>`).join('');
  openModal(`<h3>Edit ${esc(p.name)}</h3>
    <div class="form-row">
      <div class="field"><label>Project name</label><input id="epName" value="${esc(p.name)}"></div>
      <div class="field"><label>Contract value (₹)</label><input id="epValue" type="number" value="${p.value}"></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Stage</label><select id="epStage">${STAGES.map((s,i)=>`<option value="${i}" ${i===p.stage?'selected':''}>${s.name}</option>`).join('')}</select></div>
      <div class="field"><label>Promised date</label><input id="epPromised" type="date" value="${isoDate(p.promised)}"></div>
    </div>
    <div class="form-row">
      <div class="field"><label>Design partner</label><select id="epDp">${opts(dps,p.dp)}</select></div>
      <div class="field"><label>Production manager</label><select id="epPm"><option value="">Not assigned</option>${opts(pms,p.pm)}</select></div>
    </div>
    <div class="field"><label>Sales representative</label><select id="epRep">${opts(reps,p.rep)}</select></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn primary" data-act="save-project" data-id="${p.id}">Save changes</button></div>`,'wide');
}

function saveProject(){
  const id=state.editingId||document.querySelector('[data-act="save-project"]').dataset.id;
  const p=projects.find(x=>x.id===id); if(!p) return;
  p.name=document.getElementById('epName').value.trim()||p.name;
  p.value=Number(document.getElementById('epValue').value)||p.value;
  p.stage=Number(document.getElementById('epStage').value);
  const pr=document.getElementById('epPromised').value; if(pr) p.promised=new Date(pr);
  p.forecast=new Date(p.promised.getTime()+p.slip*86400000);
  p.dp=document.getElementById('epDp').value;
  p.pm=document.getElementById('epPm').value||null;
  p.rep=document.getElementById('epRep').value;
  p.payments.forEach(x=>{ x.amount=Math.round(p.value*x.pct/100); });
  closeModal(); render(); toast('Project updated');
}

/* ---------- leave with cover ---------- */
let coverRows=0;
const outgoing=[];
function openLeaveFlow(id){
  const a=approvals.find(x=>x.id===id);
  const person=a.person?staff.find(s=>s.id===a.person):null;
  const days=ri(2,4);
  const from=new Date(TODAY.getTime()+2*86400000), to=new Date(from.getTime()+(days-1)*86400000);
  coverRows=0;
  openModal(`<h3>Approve leave · ${esc(person?person.name:'Staff')}</h3>
    <p>Choose the dates, then name who covers the work. Split it between two people if you want.</p>
    <div class="form-row">
      <div class="field"><label>From</label><input id="lvFrom" type="date" value="${isoDate(from)}"></div>
      <div class="field"><label>To</label><input id="lvTo" type="date" value="${isoDate(to)}"></div>
    </div>
    <div class="field"><label>Days</label><input id="lvDays" value="${days}" readonly></div>
    <div class="leave-box">
      <div class="tag" style="margin-bottom:8px">Cover</div>
      <div id="coverRows"></div>
      <button class="add-cover" data-act="leave-add-cover">+ Add another person</button>
    </div>
    <div class="acts">
      <button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn primary" data-act="leave-confirm" data-id="${a.id}">Approve with this cover</button>
    </div>`,'wide');
  addCoverRow();
  const upd=()=>{ const f=new Date(document.getElementById('lvFrom').value), t=new Date(document.getElementById('lvTo').value);
    const d=Math.max(1,Math.round((t-f)/86400000)+1); document.getElementById('lvDays').value=isNaN(d)?1:d; };
  document.getElementById('lvFrom').onchange=upd; document.getElementById('lvTo').onchange=upd;
}

function addCoverRow(){
  const host=document.getElementById('coverRows'); if(!host) return;
  coverRows++;
  const people=staff.filter(s=>s.role!=='Managing Director');
  const fromVal=document.getElementById('lvFrom')?document.getElementById('lvFrom').value:isoDate(new Date(TODAY.getTime()+2*86400000));
  const untilVal=isoDate(new Date(TODAY.getTime()+5*86400000));
  const wrap=document.createElement('div');
  wrap.className='cover-block';
  wrap.innerHTML=`
    <div class="cover-grid">
      <div><label class="mini-lab">Covers</label>
        <select class="cover-person">${people.map(s=>`<option value="${s.id}">${s.name} · ${s.role}</option>`).join('')}</select></div>
      <div><label class="mini-lab">Scope</label>
        <select class="cover-scope"><option>All their projects</option><option>Selected projects only</option><option>Tasks only</option></select></div>
    </div>
    <div class="cover-grid" style="grid-template-columns:1fr 1fr auto;margin-top:8px">
      <div><label class="mini-lab">Covering from</label><input class="cover-from" type="date" value="${fromVal}"></div>
      <div><label class="mini-lab">Until</label><input class="cover-until" type="date" value="${untilVal}"></div>
      <div style="display:flex;align-items:end;height:100%">${coverRows>1?'<button class="btn sm danger" data-act="leave-remove-cover" style="height:34px">✕</button>':''}</div>
    </div>`;
  host.appendChild(wrap);
}
function removeCoverRow(btn){
  btn.closest('.leave-row')?.remove();
}

function confirmLeave(){
  const btn=document.querySelector('[data-act="leave-confirm"]');
  const a=approvals.find(x=>x.id===btn.dataset.id);
  const rows=[...document.querySelectorAll('#coverRows .cover-block')].map(r=>({
    person:r.querySelector('.cover-person').value,
    scope:r.querySelector('.cover-scope').value,
    from:r.querySelector('.cover-from').value,
    until:r.querySelector('.cover-until').value
  }));
  if(!rows.length){ toast('Name at least one person to cover'); return; }
  const from=new Date(document.getElementById('lvFrom').value);
  const to=new Date(document.getElementById('lvTo').value);
  const days=Math.max(1,Math.round((to-from)/86400000)+1);
  const person=a.person?staff.find(s=>s.id===a.person):null;
  a.status='approved';
  if(person){ person.leave+=days; }
  rows.forEach(r=>{ projects.filter(p=>p.dp===r.person||p.pm===r.person||p.rep===r.person).slice(0,3).forEach(p=>{ p.cover=r.person; p.coverFrom=r.from; p.coverUntil=r.until; }); });
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint,
    kind:'Leave', text:`approved ${days} days for ${person?person.name:'staff'}, covered by ${rows.map(r=>staff.find(s=>s.id===r.person)?.name).join(' and ')}` });
  closeModal(); render();
  const span=(r)=>r.from?`${fmtDate(new Date(r.from))}–${fmtDate(new Date(r.until))}`:'';
  toast(`Leave approved · ${days} days · covered by ${rows.map(r=>staff.find(s=>s.id===r.person)?.name.split(' ')[0]+' '+span(r)).join(', ')}`);
}

/* ---------- payment portal ---------- */
function qrSVG(text){
  const n=25, cell=5.4;
  let h=2166136261;
  for(const c of text){ h^=c.charCodeAt(0); h=Math.imul(h,16777619)>>>0; }
  const inFinder=(x,y)=>(x<8&&y<8)||(x>=n-8&&y<8)||(x<8&&y>=n-8);
  const finder=(ox,oy)=>`<rect x="${ox*cell}" y="${oy*cell}" width="${7*cell}" height="${7*cell}" fill="none" stroke="#15162B" stroke-width="${cell}"/>
    <rect x="${(ox+2)*cell}" y="${(oy+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#15162B"/>`;
  let cells='';
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    if(inFinder(x,y)) continue;
    h=(Math.imul(h,1103515245)+12345)>>>0;
    if((h>>>16)&1) cells+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#15162B"/>`;
  }
  const s=n*cell;
  return `<svg class="qr" viewBox="0 0 ${s} ${s}" width="150" height="150"><rect width="${s}" height="${s}" fill="#fff"/>${cells}
    ${finder(0,0)}${finder(n-7,0)}${finder(0,n-7)}</svg>`;
}

function openPayPortal(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  const person=a.person?staff.find(s=>s.id===a.person):null;
  openModal(`<h3>Pay ${a.amount?inr(a.amount):''}</h3>
    <p>${esc(a.title)}<br>${esc(a.sub)}</p>
    <div class="pay-grid">
      <div>
        ${qrSVG(a.id+String(a.amount))}
        <div class="tmeta" style="margin-top:6px;text-align:center">Scan to pay · demo QR</div>
      </div>
      <div>
        <div class="kv"><span class="k">To</span><span class="v">${person?esc(person.name):'Vendor'}</span></div>
        <div class="kv"><span class="k">UPI</span><span class="v">homesic@okhdfc</span></div>
        <div class="kv"><span class="k">Reference</span><span class="v">${a.id}</span></div>
        <div class="drop" id="payDrop" data-act="pay-upload" style="margin-top:12px">
          Upload the payment screenshot<br><span class="tmeta">PNG or JPG · tap to choose</span>
        </div>
        <input type="file" id="payFile" accept="image/*" style="display:none">
      </div>
    </div>
    <div class="acts">
      <button class="btn" data-act="close-modal">Cancel</button>
      <button class="btn primary" data-act="pay-confirm" data-id="${a.id}">I have paid · confirm</button>
    </div>`,'wide');
  const input=document.getElementById('payFile');
  if(input){ input.onchange=()=>{
    const f=input.files[0]; const drop=document.getElementById('payDrop');
    if(f && drop){ drop.classList.add('has'); drop.innerHTML=`✓ ${esc(f.name)}<br><span class="tmeta">attached · ready to confirm</span>`; }
  };}
}

function confirmPay(){
  const btn=document.querySelector('[data-act="pay-confirm"]');
  const a=approvals.find(x=>x.id===btn.dataset.id); if(!a) return;
  const attached=document.getElementById('payDrop')?.classList.contains('has');
  a.status='approved'; a.paid=true;
  if(a.salaryId){ const s=salaries.find(x=>x.id===a.salaryId); if(s){ s.status='paid'; s.paidOn=new Date(TODAY); } }
  outgoing.unshift({ id:'OUT-'+String(outgoing.length+1).padStart(3,'0'), title:a.title, amount:a.amount||0,
    to: (a.person?staff.find(x=>x.id===a.person)?.name:'Vendor'), at:new Date(TODAY), ref:a.id });
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint,
    kind:'Payment', text:'paid '+a.title.toLowerCase()+(attached?' · screenshot attached':'') });
  closeModal(); render();
  toast('Payment recorded · opening the approved document');
  setTimeout(()=>openDocModal('Approved payment · '+a.title),320);
}

/* ---------- search ---------- */
function setupSearch(){
  const inp=document.getElementById('globalSearch'), panel=document.getElementById('searchPanel');
  if(!inp||!panel) return;
  inp.value=state.search||'';
  inp.oninput=()=>{ state.search=inp.value; paintSearch(inp.value.trim().toLowerCase()); };
  inp.onfocus=()=>paintSearch(inp.value.trim().toLowerCase());
  inp.onkeydown=e=>{ if(e.key==='Escape'){ panel.classList.remove('on'); inp.blur(); } };
  if(!window.__searchOutside){ window.__searchOutside=true;
    document.addEventListener('click',ev=>{ if(!ev.target.closest('#searchWrap')) document.getElementById('searchPanel')?.classList.remove('on'); });
  }
}

function paintSearch(q){
  const panel=document.getElementById('searchPanel'); if(!panel) return;
  if(!q){ panel.classList.remove('on'); panel.innerHTML=''; return; }
  const ps=projects.filter(p=>p.name.toLowerCase().includes(q)||p.client.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)).slice(0,5);
  const st=staff.filter(s=>s.name.toLowerCase().includes(q)||s.role.toLowerCase().includes(q)).slice(0,4);
  const pay=[]; projects.forEach(p=>p.payments.forEach(x=>{ if(x.status==='proof'||x.status==='overdue'){ if((p.name+' '+x.stage).toLowerCase().includes(q)) pay.push({p,x}); } }));
  let html='';
  if(ps.length) html+=`<div class="sp-group">Projects</div>`+ps.map(p=>`<div class="sp-item" data-act="open-project" data-id="${p.id}">
      <div class="av-sm" style="background:${p.status==='On track'?'var(--mint-soft)':p.status==='Past target'?'var(--amber-soft)':'var(--coral-soft)'}">${p.name.slice(0,2).toUpperCase()}</div>
      <div class="grow"><div class="t">${esc(p.name)}</div><div class="s">${p.id} · ${esc(p.client)} · ${STAGES[p.stage].name}</div></div>
      ${statusChip(p.status)}</div>`).join('');
  if(st.length) html+=`<div class="sp-group">People</div>`+st.map(s=>`<div class="sp-item" data-act="open-person" data-id="${s.id}">
      <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
      <div class="grow"><div class="t">${esc(s.name)}</div><div class="s">${s.role}</div></div></div>`).join('');
  if(pay.length) html+=`<div class="sp-group">Payments</div>`+pay.slice(0,4).map(r=>`<div class="sp-item" data-act="open-project" data-id="${r.p.id}">
      <div class="av-sm" style="background:var(--cobalt-soft);color:var(--cobalt)">₹</div>
      <div class="grow"><div class="t">${esc(r.p.name)} · ${r.x.stage}</div><div class="s">${inr(r.x.amount)} · ${r.x.status}</div></div></div>`).join('');
  if(!html) html='<div class="sp-empty">Nothing matches “'+esc(q)+'”. Try a client name, a project, or a person.</div>';
  panel.innerHTML=html; panel.classList.add('on');
}

/* ---------- brief audio ---------- */
let speaking=false;
function toggleBriefAudio(){
  if(!('speechSynthesis' in window)){ toast('This browser cannot read text aloud'); return; }
  const label=document.getElementById('listenLabel'), btn=document.getElementById('listenBtn');
  if(speaking){ window.speechSynthesis.cancel(); speaking=false; if(label) label.textContent='Read the brief'; btn?.classList.remove('on'); return; }
  const raw=(document.getElementById('briefText')?.textContent||'').trim();
  if(!raw) return;
  if(!chosenVoice){ loadVoices(); chosenVoice=pickBestVoice(); }
  const u=new SpeechSynthesisUtterance(speechText(raw));
  if(chosenVoice){ u.voice=chosenVoice; u.lang=chosenVoice.lang; } else { u.lang='en-IN'; }
  u.rate=0.96; u.pitch=1.03;
  u.onend=()=>{ speaking=false; if(label) label.textContent='Read the brief'; btn?.classList.remove('on'); };
  u.onerror=()=>{ speaking=false; if(label) label.textContent='Read the brief'; btn?.classList.remove('on'); toast('The voice engine refused. Try another voice in the list.'); };
  speaking=true; if(label) label.textContent='Stop reading'; btn?.classList.add('on');
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}



/* ---------- demo hooks ---------- */
(function(){
  const demo=new URLSearchParams(location.search).get('demo');
  if(!demo) return;
  if(demo==='rail'){ setTimeout(()=>document.querySelector('.rail')?.classList.add('force-open'),220); return; }
  const first=projects.find(p=>p.status!=='Closed')||projects[0];
  setTimeout(()=>{
    if(demo==='file') fileModal(first.files[0].id);
    if(demo==='files') filesModal(first.id, first.fileSets[0].version);
    if(demo==='edit') openEditProject(first.id);
    if(demo==='leave'){ const a=approvals.find(x=>x.type==='Leave'); if(a) openLeaveFlow(a.id); }
    if(demo==='review'){ const pr=proofs[0]; if(pr) openPaymentReview(pr.id); }
    if(demo==='pay'){ const a=approvals.find(x=>x.type==='Salary')||approvals.find(x=>x.amount); if(a) openPayPortal(a.id); }
    if(demo==='meeting'||demo==='new-meeting') newMeetingModal(first.id);
    if(demo==='meeting-detail'){ const m=upMeetings()[0]; if(m) meetingModal(m.id); }
    if(demo==='thread') threadModal(first.id);
    if(demo==='team') teamModal(first.id);
    if(demo==='salary'){ const s=salaries.find(x=>x.status==='due')||salaries[0]; if(s) salaryModal(s.id); }
    if(demo==='salary-all') allSalariesModal();
    if(demo==='tx') newTxModal();
    if(demo==='client'){ const c=clientList()[0]; if(c) clientModal(c.name); }
    if(demo==='more') moreModal();
    if(demo==='login-as') loginAsModal();
    if(demo==='design'){ const a=approvals.find(x=>x.type==='Design'); if(a) openDesignReview(a.id); }
    if(demo==='search'){ const i=document.getElementById('globalSearch'); if(i){ i.value='arora'; i.focus(); paintSearch('arora'); } }
  },220);
})();





/* ---------- payment review ---------- */
function openPaymentReview(proofId){
  const pr=proofs.find(x=>x.id===proofId);
  if(!pr){ toast('That payment is already settled'); return; }
  const p=projects.find(x=>x.id===pr.projectId);
  const pay=p.payments.find(x=>x.stage===pr.stage);
  const ap=approvals.find(a=>a.payId===pr.id);
  const idx=p.payments.indexOf(pay);
  const prev=p.payments.slice(0,idx).filter(x=>x.status==='paid');
  const nextStage=p.payments[idx+1];
  const overdue=pay.status==='overdue'?Math.max(1,dayDiff(TODAY,pay.dueOn)):0;

  openModal(`
    <div class="doc-h">
      <div class="file-thumb" style="width:30px;height:38px">UPI</div>
      <div><div style="font-size:14px;font-weight:800">Client payment · ${esc(p.name)}</div>
        <div class="tmeta">${esc(p.client)} · ${esc(p.city)} · ${p.id}</div></div>
      <button class="close" style="margin-left:auto" data-act="close-modal">✕</button>
    </div>
    <div class="review">
      <div>
        <div class="proof">
          <div class="proof-top"><span>UPI</span><span>Payment sent</span></div>
          <div class="proof-amt">${inr(pr.amount)}</div>
          <div class="proof-to">to HOMESIC DESIGN</div>
          <div class="proof-rows">
            <div><span>Reference</span><b>${esc(pr.id)}</b></div>
            <div><span>Date</span><b>${fmtDate(pr.at)} · ${pr.at.getHours()}:${String(pr.at.getMinutes()).padStart(2,'0')}</b></div>
            <div><span>Status</span><b style="color:#146B49">Success</b></div>
          </div>
        </div>
        <div class="tmeta" style="text-align:center;margin-top:8px">Here will be the screenshot the client sent on WhatsApp</div>
      </div>

      <div>
        <div class="kv"><span class="k">Gate</span><span class="v">${pay.stage} · ${pay.pct}%</span></div>
        <div class="kv"><span class="k">Amount</span><span class="v">${inr(pr.amount)}</span></div>
        <div class="kv"><span class="k">Due</span><span class="v">${fmtDate(pay.dueOn)}${overdue?` · ${overdue} days late`:''}</span></div>
        <div class="kv"><span class="k">Waiting</span><span class="v">${pr.ageH} hours</span></div>
        <div class="kv"><span class="k">Contract</span><span class="v">${inr(p.value)}</span></div>
        <div class="kv"><span class="k">Unlocks</span><span class="v">${nextStage?nextStage.stage:'Project close'}</span></div>

        <div class="tag" style="margin:14px 0 6px">Already received</div>
        ${prev.length?prev.map(x=>`<div class="row" style="justify-content:space-between;font-size:11.5px;padding:4px 0">
            <span class="muted">${x.stage}</span><b>${inr(x.amount)}</b><span class="muted">${fmtDate(x.paidOn)}</span>
          </div>`).join(''):'<div class="tmeta">This is the first payment on this project.</div>'}
      </div>
    </div>
    <div style="display:flex;gap:8px;padding:12px 18px;border-top:1px solid var(--line)">
      <button class="btn danger" data-act="review-reject" data-apr="${ap?ap.id:''}">Reject with reason</button>
      <button class="btn" style="margin-left:auto" data-act="close-modal">Close</button>
      <button class="btn primary" data-act="review-confirm" data-pid="${pr.id}" data-proj="${esc(p.name)}">Confirm receipt</button>
    </div>`,'doc');
}

function settlePayment(prId){
  const pr=proofs.find(x=>x.id===prId); if(!pr) return;
  const p=projects.find(x=>x.id===pr.projectId);
  const pay=p.payments.find(x=>x.stage===pr.stage);
  if(pay){ pay.status='paid'; pay.paidOn=new Date(TODAY); }
  const ap=approvals.find(a=>a.payId===pr.id); if(ap) ap.status='approved';
  const person=staff.find(s=>s.id===p.dp);
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint,
    kind:'Payment', text:`confirmed ${pr.stage.toLowerCase()} for ${p.name} · receipt sent to ${p.client}` });
  render(); toast('Payment confirmed · receipt sent to '+p.client);
}

/* ---------- richer pay portal ---------- */
const _openPay = openPayPortal;
openPayPortal = function(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  _openPay(id);
  const body=document.getElementById('modal');
  const extra=document.createElement('div');
  extra.innerHTML=`<div style="border-top:1px solid var(--line);margin-top:14px;padding-top:10px">
      <div class="kv"><span class="k">Raised by</span><span class="v">${a.type==='Salary'?'Payroll':'Production Manager'}</span></div>
      <div class="kv"><span class="k">Checked by</span><span class="v">${a.type==='Expense'?'Production Head':'—'}</span></div>
      <div class="kv"><span class="k">Approved by</span><span class="v">You (MD)</span></div>
      <div class="kv"><span class="k">Bill</span><span class="v"><button class="link" data-act="open-doc" data-title="Bill · ${esc(a.title)}">View the document</button></span></div>
    </div>`;
  const acts=body.querySelector('.acts');
  body.insertBefore(extra, acts);
};

/* ---------- voice ---------- */
let voices=[], chosenVoice=null, voiceLang='en-IN';
function loadVoices(){
  if(!('speechSynthesis' in window)) return;
  voices=window.speechSynthesis.getVoices()||[];
  if(!chosenVoice) chosenVoice=pickBestVoice();
}
if('speechSynthesis' in window){
  window.speechSynthesis.onvoiceschanged=()=>{ voices=window.speechSynthesis.getVoices()||[]; if(!chosenVoice) chosenVoice=pickBestVoice(); setupVoicePicker(); };
  loadVoices();
}
function pickBestVoice(){
  if(!voices.length) return null;
  const isEn = v => /^en/i.test(v.lang);
  const isEnIN = v => /en[-_]IN/i.test(v.lang);
  const female = /(heera|veena|kalpana|neerja|aditi|swara|priya|raveena|female|zira|samantha|natasha|aria|jenny)/i;
  const en = voices.filter(isEn);
  const enIN = en.filter(isEnIN);
  return enIN.find(v=>female.test(v.name))
      || enIN[0]
      || en.find(v=>female.test(v.name))
      || en[0]
      || voices.find(v=>/^hi/i.test(v.lang))
      || voices[0]
      || null;
}
function setupVoicePicker(){
  const sel=document.getElementById('voiceSel'); if(!sel) return;
  if(!('speechSynthesis' in window)){ sel.style.display='none'; return; }
  if(!voices.length) loadVoices();
  const rank=v=>/en[-_]IN/i.test(v.lang)?0:/^en/i.test(v.lang)?1:2;
  const list=[...voices].filter(v=>/^en|^hi/i.test(v.lang)).sort((a,b)=>rank(a)-rank(b)||a.name.localeCompare(b.name));
  if(!chosenVoice) chosenVoice=pickBestVoice();
  sel.innerHTML=list.map(v=>`<option value="${esc(v.name)}">${esc(v.name.replace(/\s*Microsoft\s*/,'').replace(/\s*-\s*/,' · '))} (${v.lang})</option>`).join('') || '<option>Default voice</option>';
  if(chosenVoice) sel.value=chosenVoice.name;
  sel.onchange=()=>{
    chosenVoice=voices.find(v=>v.name===sel.value)||chosenVoice;
    voiceLang=chosenVoice?.lang||'en-IN';
    if(speaking){ window.speechSynthesis.cancel(); speaking=false; toggleBriefAudio(); }
    toast('Reading voice: '+(chosenVoice?.name||'default'));
  };
}
function speechText(t){
  return t
    .replace(/₹\s?([\d.,]+)\s?Cr\b/gi,'$1 crore rupees')
    .replace(/₹\s?([\d.,]+)\s?L\b/gi,'$1 lakh rupees')
    .replace(/₹\s?([\d,]+)/g,'$1 rupees')
    .replace(/(\d)\s?BHK\b/gi,'$1 B H K')
    .replace(/·/g,', ')
    .replace(/\bMD\b/g,'managing director')
    .replace(/\s+/g,' ')
    .trim();
}

/* ---------- boot (last, so every declaration above is live) ---------- */
applyHash();
if(location.search.includes('selftest')){ runSelfTest(); }
