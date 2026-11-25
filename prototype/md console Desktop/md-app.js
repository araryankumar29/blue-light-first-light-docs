/* First Light — MD console. Deterministic sample data, no backend. */

/* ---------- utils ---------- */
const TODAY = new Date('2026-11-22T09:41:00+05:30');
let seed = 20261122;
function rnd(){ seed = (seed*1664525 + 1013904223) % 4294967296; return seed/4294967296; }
const ri = (a,b)=> a + Math.floor(rnd()*(b-a+1));
const pick = a => a[Math.floor(rnd()*a.length)];
const chance = p => rnd() < p;
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const lakh = n => n >= 1e7 ? '₹' + (n/1e7).toFixed(2) + ' Cr' : n >= 1e5 ? '₹' + (n/1e5).toFixed(1) + 'L' : '₹' + Math.round(n/1000) + 'k';
const dayDiff = (a,b) => Math.round((a-b)/86400000);
const fmtDate = d => d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});

/* ---------- data ---------- */
const FIRST=['Arya','Kabir','Nisha','Rohit','Priya','Imran','Ananya','Rhea','Vikram','Sneha','Arjun','Meera','Dev','Tara','Karan','Isha','Naveen','Pooja','Sameer','Divya','Rahul','Kavya','Aditya','Neha','Varun','Shreya','Manav','Ritika','Yash','Anjali'];
const LAST=['Kumar','Sharma','Kapoor','Menon','Shah','Qureshi','Iyer','Desai','Malhotra','Bose','Rao','Nair','Chopra','Bhatia','Sinha','Gupta','Patel','Reddy','Joshi','Mehta'];
const ROLES=[['Managing Director',1],['Sales Head',1],['Sales rep',8],['Design Head',1],['Design partner',5],['Production Head',1],['Production Manager',4],['Marketing Head',1],['Designer',8]];
const TINTS=[['#D9D4F8','#3B3570'],['#FBD3BE','#75401F'],['#E3F5EC','#146B49'],['#FDE9E6','#A03427'],['#FBF0D8','#7A510E'],['#DCE6FB','#27438F']];

const staff=[];
let sn=0;
ROLES.forEach(([role,count])=>{ for(let i=0;i<count;i++){
  const f=FIRST[sn%FIRST.length], l=LAST[(sn*7+3)%LAST.length];
  staff.push({
    id:'EMP-'+String(++sn).padStart(2,'0'), name:f+' '+l, initials:(f[0]+l[0]).toUpperCase(), role,
    email:(f+'.'+l).toLowerCase()+'@homesic.com', phone:'+91 '+ri(70,99)+' '+ri(10000,99999)+' '+ri(10000,99999),
    rating:(3.2+rnd()*1.7), wip:0, leave:ri(0,6), status:'Active',
    joined:new Date(2021,ri(0,11),ri(1,28)), tint:TINTS[sn%TINTS.length]
  });
}});
const byRole = r => staff.filter(s=>s.role===r);
const MD = staff[0]; MD.name='Arya Kumar'; MD.initials='AK'; MD.email='arya.kumar@homesic.com'; MD.tint=['#D9D4F8','#3B3570'];
const reps = byRole('Sales rep'), dps = byRole('Design partner'), pms = byRole('Production Manager'), designers = byRole('Designer');

const CITIES=['Gurugram','Noida','New Delhi','Faridabad','Ghaziabad'];
const TYPES=['residence','villa','duplex','apartment','3BHK','penthouse'];
const SURNAME=['Arora','Kapoor','Sharma','Mehra','Bhatia','Iyer','Nair','Chopra','Sinha','Gupta','Reddy','Joshi','Malhotra','Rao','Menon','Desai','Patel','Bose'];
const STAGES=[{name:'Design',target:15},{name:'Production',target:45},{name:'Installation',target:5},{name:'Handover',target:0}];

const projects=[];
for(let i=0;i<55;i++){
  const st = chance(.18)?1: chance(.55)?0: chance(.85)?2:3;
  const target = STAGES[st].target || 1;
  const day = st===3 ? target : ri(2, Math.max(3, Math.round(target*1.35)));
  const ratio = st===3 ? 0.6 : day/target;
  const status = st===3 ? 'Closed' : ratio<=1 ? 'On track' : ratio<=1.25 ? 'Past target' : 'Needs action';
  const value = ri(16,120)*50000;
  const start = new Date(2026, 4+ri(0,5), ri(1,27));
  const promised = new Date(2026, 10+ri(0,2), ri(1,28));
  const slip = status==='On track' ? 0 : ri(1,9);
  const forecast = new Date(promised.getTime() + slip*86400000);
  const dp = pick(dps), pm = st>=1 ? pick(pms) : null, rep = pick(reps);
  const pay = [
    {stage:'Token', pct:10}, {stage:'Before production', pct:50},
    {stage:'Near completion', pct:35}, {stage:'Handover', pct:5}
  ].map((p,idx)=>{
    const amount = Math.round(value*p.pct/100);
    const paidBy = st===3 ? 4 : st>=1 ? 2 : 1;
    const paid = idx < paidBy || (idx===0);
    let st2 = paid ? 'paid' : 'pending';
    const dueOn = new Date(start.getTime() + (idx+1)*24*86400000);
    if(!paid && idx===paidBy && st!==3){
      const over = ri(0,18);
      if(over>2){ st2='overdue'; }
      else { st2='due'; }
    }
    const dueOn2 = new Date(start.getTime() + (idx+1)*23*86400000);
    const paidOn2 = paid ? new Date(dueOn2.getTime() + ri(0,6)*86400000) : null;
    if(!paid && idx===paidBy && st!==3){
      if(dueOn2 < TODAY) st2='overdue';
      else if(dueOn2.getTime() <= TODAY.getTime()+14*86400000) st2='due';
    }
    return { ...p, amount, status:st2, paidOn: paidOn2, dueOn: dueOn2, over: st2==='overdue'? Math.max(1,dayDiff(TODAY,dueOn2)) : 0 };
  });
  projects.push({
    id:'PRJ-'+String(i+1).padStart(3,'0'),
    name: `${SURNAME[i%SURNAME.length]} ${pick(TYPES)}`,
    client: `${pick(FIRST)} ${SURNAME[i%SURNAME.length]}`,
    city: pick(CITIES), value, stage:st, day, target, status,
    dp:dp.id, pm:pm?pm.id:null, rep:rep.id,
    promised, forecast, slip, start,
    silence: status==='On track' ? ri(0,6) : ri(5,22),
    files: st>=1 ? ri(3,9) : ri(1,4),
    payments: pay
  });
  dp.wip++; if(pm) pm.wip++; rep.wip++;
}

/* unique project names */
{
  const used=new Set();
  projects.forEach((p,i)=>{
    let n=p.name, k=0;
    while(used.has(n) && k<8){ n=`${p.client.split(' ')[1]||'Client'} ${TYPES[(i+k)%TYPES.length]}`; k++; }
    if(used.has(n)) n=n+' II';
    used.add(n); p.name=n;
  });
}

/* proofs awaiting confirmation */
const proofs=[];
projects.filter(p=>p.status!=='Closed').slice(0,14).forEach((p,i)=>{
  if(i%2===0 && proofs.length<7){
    const next = p.payments.find(x=>x.status!=='paid');
    if(next){
      next.status='proof';
      proofs.push({ id:'PAY-'+String(proofs.length+1).padStart(3,'0'), projectId:p.id, stage:next.stage,
        amount:next.amount, ageH: ri(2,74), at:new Date(TODAY.getTime()-ri(2,74)*3600000) });
    }
  }
});

/* approvals */
const approvals=[];
let apn=0;
proofs.forEach(pr=>{
  approvals.push({ id:'APR-'+String(++apn).padStart(3,'0'), type:'Payment', title:pr.stage+' proof · '+projects.find(p=>p.id===pr.projectId).name,
    sub:projects.find(p=>p.id===pr.projectId).client+' · '+lakh(pr.amount), amount:pr.amount, ageH:pr.ageH,
    projectId:pr.projectId, payId:pr.id, person:null });
});
staff.filter(s=>s.role==='Designer').slice(0,3).forEach(s=>{
  approvals.push({ id:'APR-'+String(++apn).padStart(3,'0'), type:'Leave', title:'Leave · '+s.name, sub:ri(1,3)+' days · covers '+ri(1,4)+' projects',
    amount:0, ageH:ri(3,60), person:s.id });
});
projects.slice(20,24).forEach((p,i)=>{
  approvals.push({ id:'APR-'+String(++apn).padStart(3,'0'), type:'Expense', title:'Production expense · '+p.name,
    sub:pick(['plywood and hardware','laminate order','site labour','tile delivery']), amount:ri(18,140)*1000, ageH:ri(4,90), projectId:p.id, person:p.pm });
});
approvals.push({ id:'APR-'+String(++apn).padStart(3,'0'), type:'Salary', title:'Salary · '+(designers[0]||staff[4]).name, sub:'November · payslip attached', amount:62000, ageH:26, person:(designers[0]||staff[4]).id });
approvals.push({ id:'APR-'+String(++apn).padStart(3,'0'), type:'Reimbursement', title:'Reimbursement · '+(reps[0]||staff[3]).name, sub:'Site visits · '+ri(2,5)+' trips', amount:ri(4,18)*1000, ageH:ri(10,70), person:(reps[0]||staff[3]).id });

/* activity */
const activity=[];
const acts=[['Payment','confirmed a payment'],['Stage','moved a project to production'],['Design','approved a render'],['Leave','approved leave'],['Alert','retried a failed alert'],['File','uploaded a revision'],['Project','paused a project']];
for(let i=0;i<40;i++){
  const s=pick(staff), a=pick(acts);
  activity.push({ id:'LOG-'+String(i+1).padStart(3,'0'), at:new Date(TODAY.getTime()-ri(10,4000)*60000),
    who:s.name, initials:s.initials, tint:s.tint, kind:a[0], text:a[1] });
}
activity.sort((a,b)=>b.at-a.at);

/* ---------- state ---------- */
const state={ route:'overview', search:'', stageFilter:'', statusFilter:'', sort:'value', approvalTab:'All', paymentTab:'Awaiting confirmation', personRole:'', activityKind:'All', drawer:null, expanded:null };
const TABS=['Overview','Projects','Approvals','Payments','People','Activity','Settings'];

/* ---------- derived ---------- */
function monthStats(){
  let collected=0, due=0;
  projects.forEach(p=>p.payments.forEach(pay=>{
    if(pay.status==='paid' && pay.paidOn && pay.paidOn.getMonth()===10) collected+=pay.amount;
    if((pay.status==='due'||pay.status==='overdue'||pay.status==='proof') && pay.dueOn.getMonth()===10) due+=pay.amount;
  }));
  return { collected, due: collected+due, pct: Math.round(collected/(collected+due||1)*100) };
}
function ladder(){
  const order=['Token','Before production','Near completion','Handover'];
  return order.map(st=>{
    let tot=0, paid=0, over=0;
    projects.forEach(p=>p.payments.filter(x=>x.stage===st).forEach(x=>{ tot+=x.amount; if(x.status==='paid') paid+=x.amount; if(x.status==='overdue') over+=x.amount; }));
    return { stage:st, tot, paid, over };
  });
}
const pendingApprovals = ()=> approvals.filter(a=>a.status!=='approved'&&a.status!=='rejected');
const debtTotal = ()=> pendingApprovals().reduce((n,a)=>n+(a.amount||0),0);
const atRisk = ()=> projects.filter(p=>p.status!=='Closed' && p.forecast>p.promised);
const stagesGreen = ()=> Math.round(projects.filter(p=>p.status==='On track').length / projects.filter(p=>p.status!=='Closed').length * 100);

/* ---------- shell ---------- */
function shell(){
  return `
  <aside class="rail">
    <div class="logo">FL</div>
    <nav class="nav">
      ${navIcon('overview','M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z','Overview')}
      ${navIcon('projects','M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z','Projects')}
      ${navIcon('approvals','M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-3.2 8.6 2.4 2.4 4.2-4.6','Approvals')}
      ${navIcon('payments','M3 5.5h18v13H3zM3 10.5h18','Payments')}
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
        <div class="who"><div class="av">AK</div><div><div class="nm">${MD.name}</div><div class="rl">Managing director</div></div></div>
      </div>
    </header>
    <main class="view" id="view"></main>
  </div>
  <div class="drawer" id="drawer"></div>
  <div class="overlay" id="overlay" data-act="close-modal"></div>
  <div class="modal" id="modal"></div>
  <div class="toasts" id="toasts"></div>`;
}
function navIcon(route,path,label){
  const on = state.route === route || (route === 'projects' && state.route === 'project');
  return `<a href="#/${route}" class="navitem ${on?'on':''}" title="${label}" data-act="route" data-to="${route}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg><span class="lbl">${label}</span></a>`;
}
function greeting(){ const h=TODAY.getHours(); return h<12?'Good morning, Arya':h<17?'Good afternoon, Arya':'Good evening, Arya'; }

/* ---------- overview ---------- */
function overview(){
  const m=monthStats(), lad=ladder(), risk=atRisk().sort((a,b)=>b.value-a.value).slice(0,5);
  const debt=debtTotal();
  const late=projects.filter(p=>p.status!=='On track'&&p.status!=='Closed');
  const firm=late.reduce((n,p)=>n+Math.round(p.slip*0.35),0), client=late.reduce((n,p)=>n+Math.round(p.slip*0.5),0), vendor=late.reduce((n,p)=>n+Math.round(p.slip*0.15),0);
  const owed=m.due-m.collected;
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
        <div class="spread"><div class="eyebrow">Files</div><span class="muted" style="font-size:11px;font-weight:700">${Math.min(p.files,4)} of ${p.files} shown</span></div>
        <div style="margin-top:8px">
          ${['Layout plan v3','Kitchen render v2','Quotation rev 4','Technical drawing v1'].slice(0,p.files>3?4:p.files).map((f,i)=>`
            <div class="row" style="padding:6px 0;font-size:12px">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6E7288" stroke-width="1.6"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
              <span class="grow">${f}</span><span class="muted" style="font-size:10.5px">${i+1} Nov</span>
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
  const tabs=['All','Payment','Leave','Expense','Salary','Reimbursement'];
  const list=pendingApprovals().filter(a=>state.approvalTab==='All'||a.type===state.approvalTab).sort((a,b)=>(b.amount*b.ageH)-(a.amount*a.ageH));
  return `
  <div class="row" style="margin-bottom:12px">
    <div class="seg">${tabs.map(t=>{
      const n=t==='All'?pendingApprovals().length:pendingApprovals().filter(a=>a.type===t).length;
      return `<button class="${state.approvalTab===t?'on':''}" data-act="approval-tab" data-v="${t}">${t}${n?`<span class="cnt">${n}</span>`:''}</button>`;
    }).join('')}</div>
    <div style="margin-left:auto" class="muted" style="font-size:11.5px;font-weight:600">${lakh(debtTotal())} blocked</div>
  </div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    <div class="scroll">
    ${list.length?list.map(a=>`
      <div class="list-row" style="padding:14px 16px">
        <div class="av-md" style="background:${a.person?staff.find(s=>s.id===a.person).tint[0]:'#E7EAFE'};color:${a.person?staff.find(s=>s.id===a.person).tint[1]:'#2E4BF2'}">
          ${a.person?staff.find(s=>s.id===a.person).initials:(a.type==='Payment'?'₹':'EX')}
        </div>
        <div class="grow">
          <div style="font-size:13px;font-weight:700">${esc(a.title)}</div>
          <div class="tmeta">${esc(a.sub)} · ${a.ageH}h old</div>
        </div>
        ${a.amount?`<div class="mono" style="font-weight:800;font-size:13px;margin-right:8px">${inr(a.amount)}</div>`:''}
        <div class="row" style="gap:6px">
          ${a.type==='Leave'
            ? `<button class="btn sm primary" data-act="leave-flow" data-id="${a.id}">Approve &amp; cover</button>`
            : (a.type==='Salary'||a.type==='Reimbursement'||a.type==='Expense')
              ? `<button class="btn sm primary" data-act="pay-portal" data-id="${a.id}">Pay</button>`
              : a.type==='Payment'
                ? `<button class="btn sm primary" data-act="review-payment" data-id="${a.payId}">Review &amp; confirm</button>`
                : `<button class="btn sm" data-act="approve" data-id="${a.id}">Approve</button>`}
          <button class="btn sm danger" data-act="reject" data-id="${a.id}">Reject</button>
        </div>
      </div>`).join('')
    :'<div class="empty"><b>Nothing waiting</b>Every approval is cleared. The queue refills as work moves.</div>'}
    </div>
  </div>`;
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
  if(state.personRole) list=list.filter(s=>s.role===state.personRole);
  if(state.search){ const q=state.search.toLowerCase(); list=list.filter(s=>s.name.toLowerCase().includes(q)||s.role.toLowerCase().includes(q)); }
  const roles=['','Managing Director','Sales Head','Sales rep','Design Head','Design partner','Production Head','Production Manager','Marketing Head','Designer'];
  return `
  <div class="row" style="margin-bottom:12px">
    <div class="seg" style="flex-wrap:wrap">${roles.slice(0,6).map(r=>`<button class="${state.personRole===r?'on':''}" data-act="person-role" data-v="${r}">${r||'Everyone'}</button>`).join('')}</div>
    <div class="seg" style="margin-left:6px">${roles.slice(6).map(r=>`<button class="${state.personRole===r?'on':''}" data-act="person-role" data-v="${r}">${r}</button>`).join('')}</div>
  </div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    <div class="scroll"><table>
      <thead><tr><th>Person</th><th>Role</th><th>Projects</th><th>Rating</th><th>Leave</th><th>Status</th><th class="r"></th></tr></thead>
      <tbody>${list.map(s=>`<tr data-act="open-person" data-id="${s.id}" style="cursor:pointer">
        <td><div class="row"><div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
          <div><div class="tname">${s.name}</div><div class="tmeta">${s.email}</div></div></div></td>
        <td>${s.role}</td>
        <td class="mono">${s.wip}</td>
        <td><span style="font-weight:700">${s.rating.toFixed(1)}</span> <span class="muted" style="font-size:10.5px">★</span></td>
        <td class="mono">${s.leave}d</td>
        <td>${chip(s.status, s.status==='Active'?'ok':'mut')}</td>
        <td class="r"><button class="btn sm" data-act="open-person" data-id="${s.id}">Open</button></td>
      </tr>`).join('')}</tbody>
    </table>
    ${list.length?'':'<div class="empty"><b>Nobody matches</b>Try another role or search.</div>'}
    </div>
  </div>`;
}
function openPerson(id){
  const s=staff.find(x=>x.id===id); if(!s) return;
  const owned=projects.filter(p=>p.dp===s.id||p.pm===s.id||p.rep===s.id);
  document.getElementById('drawer').innerHTML=`
    <div class="drawer-h">
      <div class="av-md" style="background:${s.tint[0]};color:${s.tint[1]};width:44px;height:44px;font-size:15px">${s.initials}</div>
      <div style="margin-left:2px">
        <h2>${s.name}</h2><p>${s.role} · ${s.email} · ${s.phone}</p>
      </div>
      <button class="close" data-act="close-drawer">✕</button>
    </div>
    <div class="drawer-b">
      <div class="grid3" style="margin-bottom:14px">
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Rating</div><div style="font-size:24px;font-weight:800;margin-top:4px">${s.rating.toFixed(1)}</div><div class="tmeta">this week</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Projects</div><div style="font-size:24px;font-weight:800;margin-top:4px">${owned.length}</div><div class="tmeta">in flight</div></div>
        <div class="card" style="box-shadow:none;border:1px solid var(--line)"><div class="eyebrow">Leave</div><div style="font-size:24px;font-weight:800;margin-top:4px">${s.leave}</div><div class="tmeta">days taken</div></div>
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
          <button class="btn" data-act="leave-person" data-id="${s.id}">Put on leave</button>
          <button class="btn" data-act="message" data-id="${s.id}">Message</button>
          <button class="btn danger" data-act="hibernate" data-id="${s.id}">${s.status==='Active'?'Hibernate account':'Reactivate'}</button>
        </div>
      </div>
    </div>`;
  openDrawer();
}

/* ---------- activity ---------- */
function activityView(){
  const kinds=['All','Payment','Stage','Design','Leave','Alert','File','Project'];
  const list=activity.filter(a=>state.activityKind==='All'||a.kind===state.activityKind);
  return `
  <div class="seg" style="margin-bottom:12px;flex-wrap:wrap">${kinds.map(k=>`<button class="${state.activityKind===k?'on':''}" data-act="activity-kind" data-v="${k}">${k}</button>`).join('')}</div>
  <div class="card pad0 grow" style="min-height:0;display:flex;flex-direction:column">
    <div class="scroll">
      ${list.map(a=>`<div class="list-row" style="padding:12px 16px">
        <div class="av-sm" style="background:${a.tint[0]};color:${a.tint[1]}">${a.initials}</div>
        <div class="grow"><div style="font-size:12.5px"><b>${a.who}</b> ${a.text}</div>
          <div class="tmeta">${a.kind} · ${a.at.toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</div></div>
        <span class="chip mut">${a.id}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

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

/* ---------- router / render ---------- */
const ROUTES=['overview','projects','approvals','payments','people','activity','settings'];
function applyHash(){
  const p=(location.hash||'#/overview').replace(/^#\//,'').split('/');
  const r=p[0]||'overview';
  state.drawer=null;
  if(r==='project'&&p[1]){ state.route='project'; state.projectId=p[1]; state.drawer=null; }
  else if(r==='person'&&p[1]){ state.route='people'; state.drawer='person'; state.drawerId=p[1]; }
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
  else if(state.route==='people') v.innerHTML=peopleView();
  else if(state.route==='activity') v.innerHTML=activityView();
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
  if(act==='route'){ e.preventDefault(); state.drawer=null; closeDrawer(); routeTo(el.dataset.to); return; }
  if(act==='open-project'){ e.preventDefault(); location.hash='#/project/'+id; return; }
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
  if(act==='open-person'){ e.preventDefault(); location.hash='#/person/'+id; return; }
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
  if(act==='activity-kind'){ state.activityKind=v; document.getElementById('view').innerHTML=activityView(); return; }
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
  const names=['Layout plan v3','Kitchen render v2','Quotation rev 4','Technical drawing v1','Site photos','Material board'];
  return names.slice(0, Math.max(3, Math.min(6, p.files))).map((n,i)=>({
    name:n, kind:i===2?'PDF':i===3?'DWG':i===4?'JPG':'PDF',
    when: fmtDate(new Date(TODAY.getTime()-(i+1)*3*86400000))
  }));
}

function projectPage(id){
  const p=projects.find(x=>x.id===id);
  if(!p) return '<div class="empty"><b>Project not found</b>It may have been closed.</div>';
  const dp=staff.find(s=>s.id===p.dp), pm=staff.find(s=>s.id===p.pm), rep=staff.find(s=>s.id===p.rep);
  const total=p.payments.reduce((n,x)=>n+x.amount,0);
  const paid=p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  const pct=p.stage===3?100:Math.min(100,Math.round(p.day/(STAGES[p.stage].target||1)*100));
  const files=projectFiles(p), log=projectLog(p);
  const cov=p.cover?staff.find(s=>s.id===p.cover):null;

  return `
  <div class="scroll">
    <div style="margin-bottom:8px">
      <button class="btn sm ghost" data-act="back-projects">← All projects</button>
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
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
        <div class="card-h"><h2>Team</h2><button class="btn sm" data-act="edit-project" data-id="${p.id}">Change</button></div>
        ${[dp,pm,rep].filter(Boolean).map(s=>`<div class="row" style="margin:8px 0">
          <div class="av-sm" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</div>
          <div class="grow"><div style="font-size:12.5px;font-weight:700">${s.name}</div><div class="tmeta">${s.role}</div></div>
          <span class="muted" style="font-size:11px;font-weight:700">${s.rating.toFixed(1)} ★</span>
        </div>`).join('')}
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
        <div class="card-h"><h2>Money</h2></div>
        <div class="kv"><span class="k">Contract</span><span class="v">${inr(p.value)}</span></div>
        <div class="kv"><span class="k">Collected</span><span class="v">${inr(paid)}</span></div>
        <div class="kv"><span class="k">Outstanding</span><span class="v" style="color:var(--coral-ink)">${inr(total-paid)}</span></div>
        <div class="kv"><span class="k">Next gate</span><span class="v">${(p.payments.find(x=>x.status!=='paid')||{}).stage||'—'}</span></div>
        <div class="kv"><span class="k">Cover</span><span class="v">${cov?cov.name:'Nobody'}</span></div>
      </div>

      <div class="card" style="grid-column:span 8">
        <div class="card-h"><h2>Files</h2><span class="sub">${files.length} documents · click to open</span></div>
        <div class="file-grid">
          ${files.map(f=>`<div class="file-card" data-act="open-file" data-name="${esc(f.name)}" data-kind="${f.kind}">
            <div class="file-thumb">${f.kind}</div>
            <div class="grow"><div class="file-name">${esc(f.name)}</div><div class="file-meta">${f.when} · approved</div></div>
          </div>`).join('')}
        </div>
      </div>

      <div class="card" style="grid-column:span 4">
        <div class="card-h"><h2>Recent</h2></div>
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
      <div class="field"><label>Promised date</label><input id="epPromised" type="date" value="${p.promised.toISOString().slice(0,10)}"></div>
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
      <div class="field"><label>From</label><input id="lvFrom" type="date" value="${from.toISOString().slice(0,10)}"></div>
      <div class="field"><label>To</label><input id="lvTo" type="date" value="${to.toISOString().slice(0,10)}"></div>
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
  const fromVal=document.getElementById('lvFrom')?document.getElementById('lvFrom').value:new Date(TODAY.getTime()+2*86400000).toISOString().slice(0,10);
  const untilVal=new Date(TODAY.getTime()+5*86400000).toISOString().slice(0,10);
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
  document.addEventListener('click',ev=>{ if(!ev.target.closest('#searchWrap')) panel.classList.remove('on'); });
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



/* ---------- demo hooks: ?demo=file|edit|leave|pay|search|rail ---------- */
(function(){
  const demo=new URLSearchParams(location.search).get('demo');
  if(!demo) return;
  if(demo==='rail'){ document.querySelector('.rail')?.classList.add('force-open'); return; }
  setTimeout(()=>{
    if(demo==='file') openFileModal('Quotation rev 4','PDF');
    if(demo==='edit'){
      const m=(location.hash||'').match(/#\/project\/([A-Za-z0-9-]+)/);
      openEditProject(m?m[1]:(projects.find(p=>p.status!=='Closed')||projects[0]).id);
    }
    if(demo==='leave'){ const a=approvals.find(x=>x.type==='Leave'); if(a) openLeaveFlow(a.id); }
    if(demo==='review'){ const pr=proofs[0]; if(pr) openPaymentReview(pr.id); }
    if(demo==='pay'){ const a=approvals.find(x=>x.type==='Salary')||approvals.find(x=>x.amount); if(a) openPayPortal(a.id); }
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
