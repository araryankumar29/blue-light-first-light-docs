/* First Light · mobile views. Model comes from data.js. */

/* ======================= v2 UI ======================= */

const outGo=[];
const md={ tab:'home', apTab:'Approvals', apOpen:{}, payTab:'Payments', payOpen:{}, commTab:'Meetings', pid:null, q:'', stage:'',
  meetingDraft:null, thread:null, picker:null };

const TABS=[
  {id:'home',label:'Dashboard',icon:'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z'},
  {id:'approvals',label:'Approvals',icon:'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm-3.2 8.6 2.4 2.4 4.2-4.6'},
  {id:'comms',label:'Meetings',icon:'M4 5.5h16v11H9l-5 4z'},
  {id:'projects',label:'Projects',icon:'M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z'},
  {id:'performance',label:'Performance',icon:'M4 19V9m5 10V5m5 14v-7m5 7V3'}
];
const TITLES={home:'Dashboard',approvals:'Approvals & Payments',comms:'Meetings & Messages',projects:'Projects',more:'More',
  project:'Project',people:'People',activity:'Activity',settings:'Settings',integrations:'Connections',finance:'Money',sales:'Sales',clients:'Clients',performance:'Performance',dept:'Performance'};

function tabIcon(p,size){
  const s=size||21;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg>`;
}

function shell(){
  const r=md.tab;
  const pending=pendingApprovals().length;
  const isSub=['project','people','activity','settings','integrations','dept','clients','sales'].includes(r);
  const active=(t)=>{
    if(t.id===r) return true;
    if(t.id==='projects'&&r==='project') return true;
    if(t.id==='more'&&['people','activity','settings','integrations','more'].includes(r)) return true;
    if(t.id==='projects'&&r==='project') return true;
    return false;
  };
  return `
  <header class="top">
    ${isSub||r==='project'?`<button class="iconbtn back" data-act="back">‹</button>`:''}
    <div class="ttl">
      <h1>${r==='project'?esc((projects.find(p=>p.id===md.pid)||{}).name||'Project'):TITLES[r]||'First Light'}</h1>
      <p>${r==='home'?'Saturday, 22 November · week 47':r==='project'?esc((projects.find(p=>p.id===md.pid)||{}).client||''):''}</p>
    </div>
    <button class="iconbtn money" data-act="go-tab" data-to="finance">₹</button>
    <button class="iconbtn" data-act="more-sheet"><span class="av">AK</span></button>
  </header>
  <main id="view" class="body"></main>
  <nav class="tabs">
    ${TABS.map(t=>`<a class="tab ${active(t)?'on':''}" data-act="go-tab" data-to="${t.id}">
      ${tabIcon(t.icon)}
      <span>${t.label}</span>
      ${t.id==='approvals'&&pending?`<i class="badge">${pending}</i>`:''}
      ${t.id==='comms'&&mentions.length?`<i class="badge" style="background:var(--cobalt);right:8px">${mentions.length}</i>`:''}
    </a>`).join('')}
  </nav>`;
}


function perfStrip(){
  const live=projects.filter(p=>p.status!=='Closed');
  const ok=live.filter(p=>p.status==='On track').length;
  const risk=live.filter(p=>p.status==='Past target').length;
  const bad=live.filter(p=>p.status==='Needs action').length;
  const total=live.length||1;
  const stages=STAGES.map((st,i)=>({name:st.name, n:projects.filter(p=>p.stage===i&&p.status!=='Closed').length}));
  const smax=Math.max(1,...stages.map(x=>x.n));
  const pc=n=>Math.round(n/total*100);
  return `<section class="dchart">
    <div class="dchart-h"><b>Delivery health</b><span class="mut">${live.length} live</span></div>
    <div class="stack">
      <i class="ok" style="width:${pc(ok)}%"></i>
      <i class="warn" style="width:${pc(risk)}%"></i>
      <i class="bad" style="width:${pc(bad)}%"></i>
    </div>
    <div class="legend">
      <span><i class="dot ok"></i>${ok} on track</span>
      <span><i class="dot warn"></i>${risk} past target</span>
      <span><i class="dot bad"></i>${bad} need action</span>
    </div>
    <div class="dchart-h" style="margin-top:14px"><b>Where the work sits</b></div>
    <div class="stagebars">
      ${stages.map(x=>`<div class="sb"><b>${x.n}</b><div class="sbar"><i style="height:${Math.max(10,Math.round(x.n/smax*100))}%"></i></div><span>${x.name.slice(0,4)}</span></div>`).join('')}
    </div>
  </section>`;
}

function goodNews(){
  const paid=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const steady=projects.filter(p=>p.status==='On track').length;
  const m=monthStats();
  const next=upMeetings()[0];
  return `${lakh(m.collected)} came in this month, ${steady} projects are running to plan${next?`, and your next meeting is ${fmtDate(next.date)} at ${hm(next)}`:''}. Everything else can wait until after your coffee.`;
}

/* ---------- home ---------- */
function homeView(){
  const m=monthStats(), debt=debtTotal(), pend=pendingApprovals();
  const risk=atRisk().sort((a,b)=>b.value-a.value).slice(0,3);
  const next=upMeetings()[0];
  const brief=`<b>${lakh(m.due-m.collected)}</b> is uncollected and ${pend.length} things are waiting on you. ${risk[0]?risk[0].name+' is '+risk[0].slip+' days behind.':'Every promise is holding.'}`;
  return `
  ${perfStrip()}
  <section class="greet">
    <button class="speak" data-act="listen" aria-label="Play the brief">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 6a9 9 0 0 1 0 12"/></svg>
    </button>
    <div class="greet-t">
      <b>Hi Arya — good morning</b>
      <i id="briefText">${goodNews()}</i>
    </div>
  </section>


  ${next?`<button class="card next" data-act="meeting" data-id="${next.id}">
    <div class="spread"><span class="lab">Next meeting</span><span class="chip blue">${fmtDate(next.date)} · ${hm(next)}</span></div>
    <b style="font-size:13.5px;display:block;margin-top:6px">${esc(next.title)}</b>
    <div class="sub">${esc(next.client)} · ${next.participants.length} invited</div>
  </button>`:''}

  <div class="card money">
    <div class="spread">
      <div><div class="lab">Collected in November</div><div class="big">${lakh(m.collected)}</div><div class="sub">of ${lakh(m.due)} due</div></div>
      <svg viewBox="0 0 76 76" width="70" height="70">
        <circle cx="38" cy="38" r="30" fill="none" stroke="#EEF0F7" stroke-width="7"/>
        <circle cx="38" cy="38" r="30" fill="none" stroke="#2E4BF2" stroke-width="7" stroke-linecap="round"
          stroke-dasharray="${(m.pct*1.885).toFixed(1)} 188.5" transform="rotate(-90 38 38)"/>
        <text x="38" y="41" text-anchor="middle" style="font:800 15px Manrope;fill:#15162B">${m.pct}%</text></svg>
    </div>
    <div class="bars">${[14,9,20,26,18,7,23,31,21,27,16,33,24,12,29,19,35,25,15,22,32,40].map(h=>`<i style="height:${h*0.7}px;background:${h>=30?'var(--cobalt)':'#E4E6F5'}"></i>`).join('')}</div>
    <div class="sub" style="margin-top:8px">${lakh(m.due-m.collected)} outstanding · 9 days to month end</div>
  </div>

  <button class="card dark" data-act="go-tab" data-to="approvals">
    <div class="spread"><div><div class="lab light">Decision debt</div><div class="big" style="color:#fff">${lakh(debt)}</div>
      <div class="sub light">across ${pend.length} approvals</div></div><span class="chev" style="color:var(--coral)">›</span></div>
  </button>

  <div class="sechead"><span>Needs you</span><span class="mut">${pend.length} items</span></div>
  <div class="card pad0">
    ${catRows()}
  </div>

  <div class="sechead"><span>In flight</span><span class="mut" data-act="go-tab" data-to="projects">See all</span></div>
  ${risk.map(p=>projCard(p)).join('')}`;
}

function catRows(){
  const c1=pendingApprovals().filter(a=>a.type==='Payment'||a.type==='Design').length;
  const c2=pendingApprovals().filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)).length;
  const c3=pendingApprovals().filter(a=>a.type==='Leave').length;
  return [['Client approvals',c1,'Payment and design sign-offs'],['Internal approvals',c2,'Expenses, salary, reimbursements'],['Leave',c3,'Requests waiting']]
    .map(([t,n,s])=>`<button class="li" data-act="go-tab" data-to="approvals">
      <span class="li-num">${n}</span><span class="li-main"><b>${t}</b><i>${s}</i></span><span class="chev">›</span></button>`).join('');
}

const pastCard=p=>`<button class="card proj past" data-act="project" data-id="${p.id}">
  <div class="spread"><b>${esc(p.name)}</b><span class="chip mut">Closed</span></div>
  <div class="sub">${esc(p.client)} · ${esc(p.city)} · handed over ${fmtDate(p.promised)}</div>
  <div class="sub" style="margin-top:4px">${lakh(p.value)} · ${p.payments.filter(x=>x.status==='paid').length} of ${p.payments.length} payments settled</div>
</button>`;
const projCard=p=>`<button class="card proj" data-act="project" data-id="${p.id}">
  <div class="spread"><b>${esc(p.name)}</b>${statusChip(p.status)}</div>
  <div class="sub">${STAGES[p.stage].name} · ${p.stage===3?'closed':'day '+p.day+' of '+p.target} · ${esc(p.city)}</div>
  <div class="bar"><i style="width:${p.stage===3?100:Math.min(100,Math.round(p.day/(STAGES[p.stage].target||1)*100))}%;background:${p.status==='On track'?'var(--mint)':p.status==='Past target'?'var(--amber)':'var(--coral)'}"></i></div>
</button>`;

/* ---------- approvals + payments ---------- */
function ring(pct,size){
  const s=size||34, c=2*Math.PI*14;
  return `<svg class="ring" width="${s}" height="${s}" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="14" fill="none" stroke="#EEF0F7" stroke-width="3.4"/>
    <circle cx="18" cy="18" r="14" fill="none" stroke="url(#rg)" stroke-width="3.4" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${c.toFixed(1)}" data-off="${(c*(1-Math.min(100,pct)/100)).toFixed(1)}"
      transform="rotate(-90 18 18)"/>
    <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E4BF2"/><stop offset="1" stop-color="#8E7BF2"/></linearGradient></defs>
  </svg>`;
}

const BAND_KEY={'Client approvals':'client','Internal approvals':'internal','Leave':'leave','Payroll':'payroll',
  'Payments to receive':'receive','Payments to make':'tomake','Other transactions':'other','Decided':'decided',
  'Upcoming meetings':'upmeet','Messages':'msgs','Mentions':'mentions','Past meetings':'pastmeet',
  'Earned by project':'byproject','This month by week':'weeks','By month':'months','Recent':'recent','Salary':'payroll'};

function band(icon,tint,title,sub,children,pct,listKey){
  const lead = pct!==undefined
    ? `<span class="band-ring">${ring(pct,40)}<em style="color:${tint[1]}">${icon}</em></span>`
    : `<span class="band-i" style="background:${tint[0]};color:${tint[1]}">${icon}</span>`;
  const key = listKey || BAND_KEY[title] || '';
  const btn = key ? `<button class="band-more" data-act="list" data-k="${key}" data-t="${esc(title)}">All ${title.split(' ')[0].toLowerCase()}</button>` : '';
  return `<section class="band">
    <div class="band-h">${lead}<div class="band-t"><b>${title}</b><i>${sub}</i></div>${btn}</div>
    ${children}
  </section>`;
}

function apView(){
  const pend=pendingApprovals();
  const client=pend.filter(a=>a.type==='Payment'||a.type==='Design');
  const internal=pend.filter(a=>['Expense','Salary','Reimbursement'].includes(a.type));
  const leave=pend.filter(a=>a.type==='Leave');
  const rows=[]; projects.forEach(p=>p.payments.forEach(x=>rows.push({p,x})));
  const byState=st=>rows.filter(r=>r.x.status===st);
  const stateCard=(st,label,tint)=>`<button class="scard" data-act="state" data-v="${st}">
      <span class="scard-t">${label}</span>
      <b>${byState(st).length}</b>
      <span class="scard-s">${lakh(byState(st).reduce((n,r)=>n+r.x.amount,0))}</span>
      ${ring(Math.min(100,byState(st).length),30)}
    </button>`;

  return `
  <div class="bandwrap">
    <button class="btn primary" style="width:100%;margin-bottom:2px" data-act="new-tx">+ New transaction</button>
    ${band('₹',['#E3F5EC','#146B49'],'Client approvals',
        client.length+' waiting · '+lakh(client.reduce((n,a)=>n+(a.amount||0),0))+'',
        `<div class="rail">${client.map(a=>apCard(a)).join('')||'<div class="empty-row">Nothing waiting</div>'}</div>`,
        client.length/19*100,'client')}

    ${band('▤',['#FBF0D8','#7A510E'],'Internal approvals', internal.length+' requests',
        `<div class="rail">${internal.map(a=>apCard(a)).join('')||'<div class="empty-row">None</div>'}</div>`,'internal')}

    ${band('◔',['#FDEADF','#B4531F'],'Leave', leave.length+' requests',
        `<div class="rail">${leave.map(a=>apCard(a)).join('')||'<div class="empty-row">None</div>'}</div>`,'leave')}

    ${band('◔',['#E0F2F7','#0E6B84'],'Payroll',salaries.filter(s=>s.status==='due').length+' salaries due 28 Nov',
        `<div class="rail">
          ${salaries.filter(s=>s.status==='due').slice(0,8).map(s=>{const p=staff.find(x=>x.id===s.person);
            return `<button class="acard" data-act="salary" data-id="${s.id}">
              <div class="acard-top"><span class="chip late">Salary</span><b>${inr(s.amount)}</b></div>
              <div class="acard-name">${esc(p.name)}</div>
              <div class="acard-sub">${p.role} · pay 28 Nov</div></button>`;}).join('')}
          <button class="card acard newcard" data-act="salary-all"><span class="plus">+</span><b>All salaries</b><i>Edit and pay</i></button>
        </div>`,'payroll')}

    ${band('↓',['#E7EAFE','#2E4BF2'],'Payments to receive', rows.length+' stage payments',
        `<div class="rail">
          ${stateCard('proof','In review',['#FBF0D8','#7A510E'])}
          ${stateCard('overdue','Overdue',['#FDE9E6','#A03427'])}
          ${stateCard('due','Due',['#E7EAFE','#2E4BF2'])}
          ${stateCard('paid','Received',['#E3F5EC','#146B49'])}
        </div>`,undefined,'receive')}

    ${band('↑',['#FDE9E6','#A03427'],'Payments to make',
        pendingApprovals().filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)).length+' to pay',
        `<div class="rail">${pendingApprovals().filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)).map(a=>apCard(a)).join('')||'<div class="empty-row">Nothing to pay</div>'}</div>`,undefined,'tomake')}

    ${band('◇',['#F3F4FA','#5A5D74'],'Other transactions','Adjustments and corrections',
        `<div class="rail"><div class="empty-row">Nothing recorded</div></div>`)}

    ${approvals.filter(a=>a.status==='approved'||a.status==='rejected').length
      ? band('✓',['#E3F5EC','#146B49'],'Decided','Recently closed',
          `<div class="rail">${approvals.filter(a=>a.status==='approved'||a.status==='rejected').map(a=>apCard(a)).join('')}</div>`,undefined,'decided')
      : ''}
  </div>`;
}

function apRow(a){
  const p=a.projectId?projects.find(x=>x.id===a.projectId):null;
  const per=a.person?staff.find(x=>x.id===a.person):null;
  const title=p?p.name:(per?per.name:a.title);
  const kind=a.type==='Payment'?'Payment proof':a.type==='Design'?'Design approval':a.type;
  const who=a.type==='Payment'?(p?p.client:''):(per?per.name:a.sub);
  const st=a.status==='approved'?'<span class="chip ok">Approved</span>':a.status==='rejected'?'<span class="chip now">Rejected</span>':`<span class="chip" style="background:${typeTint(a.type)[0]};color:${typeTint(a.type)[1]}">${a.ageH}h</span>`;
  return `<button class="li" data-act="approval" data-id="${a.id}">
    <span class="li-av" style="background:${typeTint(a.type)[0]};color:${typeTint(a.type)[1]}">${a.type==='Leave'?'LV':a.type==='Design'?'DS':a.type==='Expense'?'EX':a.type==='Salary'?'₹₹':'₹'}</span>
    <span class="li-main"><b>${esc(title)}</b><i>${kind} · ${esc(who)}</i></span>
    ${a.amount?`<span class="li-amt">${lakh(a.amount)}</span>`:''}
    ${st}
  </button>`;
}

function apCard(a){
  const p=a.projectId?projects.find(x=>x.id===a.projectId):null;
  const per=a.person?staff.find(x=>x.id===a.person):null;
  return `<button class="acard" data-act="approval" data-id="${a.id}">
    <div class="acard-top"><span class="chip" style="background:${typeTint(a.type)[0]};color:${typeTint(a.type)[1]}">${a.status||a.type}</span>
      ${a.amount?`<b>${lakh(a.amount)}</b>`:''}</div>
    <div class="acard-name">${esc(p?p.name:(per?per.name:a.title))}</div>
    <div class="acard-sub">${a.type==='Payment'?'Payment proof':a.type==='Design'?'Design approval':a.type} · ${a.ageH}h</div>
  </button>`;
}

const emptyRow=t=>`<div class="empty-row">${t}</div>`;

function payRow(r){
  return `<button class="li" data-act="${r.x.status==='proof'?'review':'project'}" data-id="${r.x.status==='proof'?proofIdFor(r.p.id,r.x.stage):r.p.id}">
    <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${r.x.pct}%</span>
    <span class="li-main"><b>${esc(r.p.name)}</b><i>${r.x.stage} · ${esc(r.p.client)}</i></span>
    <span class="li-amt">${lakh(r.x.amount)}</span>${payChip(r.x)}</button>`;
}

const hm=m=>{ const h=m.hour%12===0?12:m.hour%12; return `${h}:${String(m.minute).padStart(2,'0')} ${m.hour<12?'AM':'PM'}`; };
function typeTint(t){
  const m={Payment:['#E3F5EC','#146B49'],Design:['#E7EAFE','#2E4BF2'],Expense:['#FBF0D8','#7A510E'],
    Salary:['#E0F2F7','#0E6B84'],Reimbursement:['#F1E9FB','#5B3E96'],Leave:['#FDEADF','#B4531F'],Vendor:['#F3F4FA','#5A5D74']};
  return m[t]||['#F3F4FA','#5A5D74'];
}
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
const proofIdFor=(pid,stage)=>{ const pr=proofs.find(x=>x.projectId===pid&&x.stage===stage); return pr?pr.id:''; };
function settlePayment(prId){
  const pr=proofs.find(x=>x.id===prId); if(!pr) return;
  const p=projects.find(x=>x.id===pr.projectId);
  const pay=p.payments.find(x=>x.stage===pr.stage);
  if(pay){ pay.status='paid'; pay.paidOn=new Date(TODAY); }
  const ap=approvals.find(a=>a.payId===pr.id); if(ap) ap.status='approved';
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(TODAY), who:MD.name, initials:'AK', tint:MD.tint,
    kind:'Payment', text:'confirmed '+pr.stage.toLowerCase()+' for '+p.name });
  render();
}

/* ---------- meetings & messages ---------- */
function commsView(){
  const up=upMeetings(), past=pastMeetings();
  const convs=projects.slice(0,10);
  return `
  <div class="bandwrap">
    ${band('◷',['#E7EAFE','#2E4BF2'],'Upcoming meetings',up.length+' scheduled',
      `<div class="rail">
        ${up.slice(0,8).map(m=>meetingCard(m)).join('')}
        <button class="mcard new" data-act="new-meeting" data-project="">
          <span class="plus">+</span><b>New meeting</b><i>Client, people, time</i></button>
      </div>
      <button class="btn primary" style="width:100%;margin-top:2px" data-act="new-meeting" data-project="">+ New meeting</button>`)}

    ${band('✉',['#E3F5EC','#146B49'],'Messages',convs.length+' project groups',
      `<div class="sizebar"><span class="mut" style="margin-right:auto">Card size</span>
        ${['S','M','L'].map(z=>`<button class="chip-btn" style="height:24px;padding:0 9px;font-size:10px;${md.msgSize===z?'background:#15162B;color:#fff;border-color:#15162B':''}" data-act="size" data-v="${z}">${z}</button>`).join('')}
      </div>
      <div class="rail ${md.msgSize==='S'?'msgS':md.msgSize==='L'?'msgL':''}">
        ${convs.map(p=>{const last=p.msgs[p.msgs.length-1];
          return `<button class="mcard msg" data-act="thread" data-id="${p.id}">
            <div class="msg-h"><span class="wa-dot"></span><b>${esc(p.name)}</b></div>
            <i class="cl">${esc(last.name)}: ${esc(last.text)}</i>
            <span class="msg-t">${last.at.getHours()}:${String(last.at.getMinutes()).padStart(2,'0')}</span>
          </button>`;}).join('')}
        <button class="mcard new" data-act="open-wa"><span class="plus">↗</span><b>WhatsApp</b><i>Open the app</i></button>
      </div>`)}

    ${band('@',['#FDE9E6','#A03427'],'Mentions',mentions.length+' times you were tagged',
      `<div class="rail">${mentions.slice(0,6).map(m=>`<button class="mcard msg" data-act="thread" data-id="${m.projectId}">
        <div class="msg-h"><span class="wa-dot coral"></span><b>${esc(m.project)}</b></div>
        <i class="cl">${esc(m.name)}: ${esc(m.text)}</i></button>`).join('')||'<div class="empty-row">None</div>'}</div>`)}

    ${band('◷',['#F3F4FA','#5A5D74'],'Past meetings',past.length+' recorded',
      `<div class="list">${past.slice(0,8).map(m=>`
        <button class="li" data-act="meeting" data-id="${m.id}">
          <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${tabIcon('M4 5.5h16v11H9l-5 4z',16)}</span>
          <span class="li-main"><b>${esc(m.title)}</b><i>${fmtDate(m.date)} · ${hm(m)} · ${esc(m.client)}</i></span>
          <span class="chev">›</span></button>`).join('')}</div>`)}
  </div>`;
}

function meetingsView(){
  const up=upMeetings();
  return `
  <div class="sechead" style="margin-top:2px"><span>Upcoming</span><span class="mut" data-act="all-meetings">View all ${up.length}</span></div>
  <div class="hscroll">
    ${up.slice(0,8).map(m=>meetingCard(m)).join('')||'<div class="empty-row" style="min-width:100%">No upcoming meetings</div>'}
    <button class="mcard new" data-act="new-meeting" data-project="">
      <span class="plus">+</span><b>New meeting</b><i>Pick client, people, time</i>
    </button>
  </div>

  <button class="btn primary" style="width:100%;margin:4px 0 6px" data-act="new-meeting" data-project="">+ New meeting</button>

  ${pastMeetings().length?`<div class="sechead"><span>Past meetings</span><span class="mut">${pastMeetings().length}</span></div>
    ${pastMeetings().slice(0,10).map(m=>`
      <button class="card li" data-act="meeting" data-id="${m.id}">
        <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${tabIcon('M4 5.5h16v11H9l-5 4z',16)}</span>
        <span class="li-main"><b>${esc(m.title)}</b><i>${fmtDate(m.date)} · ${hm(m)} · ${esc(m.client)}</i></span>
        <span class="chev">›</span>
      </button>`).join('')}`:''}`;
}

function meetingCard(m){
  const c=rsvpCount(m);
  return `<button class="mcard" data-act="meeting" data-id="${m.id}">
    <div class="spread"><span class="chip blue">${fmtDate(m.date)} · ${hm(m)}</span><span class="chip mut">${m.participants.length} invited</span></div>
    <b>${esc(m.title)}</b>
    <i class="cl">${esc(m.client)}</i>
    <div class="rsvp"><span class="ok">${c.accepted||0} accepted</span><span class="no">${c.declined||0} declined</span><span class="pend">${c.pending||0} pending</span></div>
  </button>`;
}

/* ---------- projects ---------- */
function projectsView(){
  const isPast=p=>p.status==='Closed'||p.stage===3;
  let list=projects.slice();
  if(md.q){ const q=md.q.toLowerCase(); list=list.filter(p=>p.name.toLowerCase().includes(q)||p.client.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)); }
  if(md.stage==='Past') list=list.filter(isPast);
  else if(md.stage==='Active') list=list.filter(p=>!isPast(p));
  else if(md.stage) list=list.filter(p=>!isPast(p)&&STAGES[p.stage].name===md.stage);

  const active=list.filter(p=>!isPast(p)).sort((a,b)=>b.value-a.value);
  const past=list.filter(isPast).sort((a,b)=>b.promised-a.promised);
  const chips=['','Active','Past','Design','Production','Installation'];
  return `
  <div class="search">${tabIcon('M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-3.5-3.5',14)}
    <input id="q" placeholder="Search projects or clients" value="${esc(md.q)}"></div>
  <div class="chips">${chips.map(c=>`<button class="chip-btn ${md.stage===c?'on':''}" data-act="stage" data-v="${c}">${c||'All'}</button>`).join('')}</div>
  <div class="sub" style="margin:2px 0 10px">${active.length} active${past.length?' · '+past.length+' past':''} · ${lakh(list.reduce((n,p)=>n+p.value,0))}</div>

  ${md.stage==='Past'?past.map(pastCard).join(''):active.map(projCard).join('')}

  ${past.length&&md.stage!=='Past'?`<button class="card pastlink" data-act="stage" data-v="Past">
    <div class="spread"><div><b>Past projects</b><i>${past.length} closed · ${lakh(past.reduce((n,p)=>n+p.value,0))}</i></div>
      <span class="pill-go">View all ›</span></div>
  </button>`:''}
  ${!active.length&&!past.length?'<div class="empty"><b>Nothing here</b>Try another filter.</div>':''}`;
}

function projectView(){
  const p=projects.find(x=>x.id===md.pid);
  if(!p) return '<div class="empty"><b>Project not found</b></div>';
  const paid=p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  const total=p.payments.reduce((n,x)=>n+x.amount,0);
  const team=p.team.map(id=>staff.find(s=>s.id===id)).filter(Boolean);
  const ms=meetingsOf(p), next=ms.filter(m=>!m.past)[0], lastMsg=p.msgs[p.msgs.length-1];
  return `
  <div class="card">
    <div class="spread"><div><div class="lab">Stage</div><div class="big">${p.stage===3?'Closed':'Day '+p.day+' of '+p.target}</div></div>${statusChip(p.status)}</div>
    <div class="stepper">${STAGES.map((s,i)=>`<i class="${i<p.stage?'done':i===p.stage?'now':''}"></i>`).join('')}</div>
    <div class="stages">${STAGES.map((s,i)=>`<span class="${i===p.stage?'on':''}">${s.name}</span>`).join('')}</div>
  </div>

  <div class="trio">
    <div><span class="lab">Days left</span><b>${Math.max(0,p.target-p.day)}</b></div>
    <div><span class="lab">Promised</span><b>${fmtDate(p.promised)}</b></div>
    <div><span class="lab">Forecast</span><b class="${p.slip?'coral':''}">${fmtDate(p.forecast)}</b></div>
  </div>

  <div class="sechead"><span>Team</span><span class="mut" data-act="team" data-id="${p.id}">Manage</span></div>
  <div class="card">
    <div class="teamrow">
      ${team.map(s=>`<div class="tm"><span class="li-av" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</span><i>${s.name.split(' ')[0]}</i></div>`).join('')}
      <button class="tm add" data-act="team" data-id="${p.id}"><span class="li-av" style="background:#F3F4FA;color:var(--cobalt)">+</span><i>Add</i></button>
    </div>
  </div>

  <div class="sechead"><span>WhatsApp</span><span class="mut" data-act="thread" data-id="${p.id}">Open</span></div>
  <button class="card wa" data-act="thread" data-id="${p.id}">
    <div class="spread"><b>${esc(p.name)} · Homesic</b><span class="chip ok">group</span></div>
    <div class="sub">${esc(lastMsg.name)}: ${esc(lastMsg.text)}</div>
  </button>

  <div class="sechead"><span>Meetings</span><span class="mut" data-act="new-meeting" data-project="${p.id}">New</span></div>
  ${next?`<button class="card li" data-act="meeting" data-id="${next.id}">
      <span class="li-av" style="background:var(--cobalt-soft);color:var(--cobalt)">${tabIcon('M4 5.5h16v11H9l-5 4z',16)}</span>
      <span class="li-main"><b>${esc(next.title)}</b><i>${fmtDate(next.date)} · ${hm(next)} · ${next.participants.length} invited</i></span><span class="chev">›</span>
    </button>`
    :`<button class="card li" data-act="new-meeting" data-project="${p.id}"><span class="li-av" style="background:#F3F4FA">+</span>
      <span class="li-main"><b>No meeting booked</b><i>Create one for this project</i></span><span class="chev">›</span></button>`}
  ${ms.filter(m=>m.past).slice(0,2).map(m=>`<button class="card li" data-act="meeting" data-id="${m.id}">
      <span class="li-av" style="background:#F3F4FA">${tabIcon('M4 5.5h16v11H9l-5 4z',16)}</span>
      <span class="li-main"><b>${esc(m.title)}</b><i>Past · ${fmtDate(m.date)}</i></span><span class="chev">›</span></button>`).join('')}

  <div class="sechead"><span>Files</span><span class="mut" data-act="files" data-id="${p.id}" data-set="${p.fileSets[0].version}">Latest ${p.fileSets[0].version} ›</span></div>
  <div class="filetiles">
    ${[['render','Renders','IMG'],['quote','Quotations','PDF'],['invoice','Invoices','INV']].map(([t,label,ab])=>{
      const n=p.fileSets[0].files.filter(f=>f.type===t).length;
      return `<button class="ftile" data-act="files" data-id="${p.id}" data-set="${p.fileSets[0].version}">
        <span class="ft-ico ${t}">${ab}</span><b>${label}</b><i>${n} in ${p.fileSets[0].version}</i></button>`;}).join('')}
  </div>
  <div class="rail" style="margin-top:-4px">
    ${p.fileSets[0].files.filter(f=>f.type==='render').map(f=>`
      <button class="thumb" data-act="file" data-id="${f.id}">
        ${renderThumb(f)}
        <span class="th-v">${f.version}</span>
        <span class="th-n">${esc(f.short)}</span>
      </button>`).join('')}
  </div>
  <div class="verslist">
    ${p.fileSets.slice(1).map(set=>`<button class="vrow" data-act="files" data-id="${p.id}" data-set="${set.version}">
      <span class="vtag">${set.version}</span>
      <span class="vmain"><b>${set.version} set</b><i>${set.files.length} files · ${fmtDate(set.at)}</i></span>
      <span class="chev">›</span></button>`).join('')}
  </div>

  <div class="sechead"><span>Payments</span><span class="mut">${lakh(paid)} of ${lakh(total)}</span></div>
  <div class="card pad0">
    ${p.payments.map(x=>`<div class="li">
      <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${x.pct}%</span>
      <span class="li-main"><b>${x.stage}</b><i>${inr(x.amount)} · ${x.status==='paid'?fmtDate(x.paidOn):fmtDate(x.dueOn)}</i></span>
      ${x.status==='proof'?`<button class="btn xs primary" data-act="review" data-id="${proofIdFor(p.id,x.stage)}">Review</button>`:payChip(x)}
    </div>`).join('')}
  </div>

  <div class="row-btns">
    <button class="btn" data-act="edit" data-id="${p.id}">Edit</button>
    <button class="btn" data-act="pause" data-id="${p.id}">${p.status==='Paused'?'Resume':'Pause'}</button>
    <button class="btn danger" data-act="close-proj" data-id="${p.id}">Close</button>
  </div>
  <div style="height:8px"></div>`;
}


/* ---------- money ---------- */

const MONTH_NAMES=['Jun','Jul','Aug','Sep','Oct','Nov'];
function dayBars(){
  const days=[];
  for(let i=6;i>=0;i--){
    const d=new Date(TODAY.getTime()-i*86400000);
    const inflow=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid'&&Math.abs((x.paidOn||TODAY)-d)<86400000).reduce((m,x)=>m+x.amount,0),0);
    const outflow=outGo.filter(o=>Math.abs(o.at-d)<86400000).reduce((n,o)=>n+o.amount,0);
    days.push({label:d.toLocaleDateString('en-GB',{weekday:'short'}).slice(0,2),v:inflow||outflow,dir:inflow?'in':'out'});
  }
  const max=Math.max(1,...days.map(d=>d.v));
  return days.map(d=>({...d,pct:Math.round(d.v/max*100)}));
}
function weekBars(){
  const total=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const parts=[0.22,0.31,0.27,0.20];
  const vals=parts.map(x=>Math.round(total*x/100));
  const max=Math.max(...vals);
  return vals.map((v,i)=>({label:'W'+(i+1),v,pct:Math.round(v/max*100)}));
}
function monthBars(){
  const total=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const parts=[0.08,0.12,0.09,0.15,0.19,0.37];
  const vals=parts.map(x=>Math.round(total*x));
  const max=Math.max(...vals);
  return vals.map((v,i)=>({label:MONTH_NAMES[i],v,pct:Math.round(v/max*100)}));
}

function financeView(){
  const due=salaries.filter(s=>s.status==='due');
  const paidTotal=salaries.filter(s=>s.status==='paid').reduce((n,s)=>n+s.amount,0);
  const cash=projects.reduce((n,p)=>n+p.payments.filter(x=>x.status==='paid').reduce((m,x)=>m+x.amount,0),0);
  const out=outGo.reduce((n,o)=>n+o.amount,0);
  return `
  <div class="bandwrap">
    ${band('₹',['#E7EAFE','#2E4BF2'],'Money this month','',
      `<div class="card moneyrow">
        <div><span class="lab">Collected</span><b>${lakh(cash)}</b></div>
        <div><span class="lab">Paid out</span><b>${lakh(out+paidTotal)}</b></div>
        <div><span class="lab">Salary due</span><b class="coral">${lakh(due.reduce((n,s)=>n+s.amount,0))}</b></div>
      </div>`)}
    ${band('◔',['#FBF0D8','#7A510E'],'Salary',salaries.length+' people · due 28 Nov',
      `<div class="rail">
        ${salaries.filter(s=>s.status==='due').slice(0,8).map(s=>{const p=staff.find(x=>x.id===s.person);
          return `<button class="acard" data-act="salary" data-id="${s.id}">
            <div class="acard-top"><span class="chip ${s.status==='paid'?'ok':'late'}">${s.status}</span><b>${inr(s.amount)}</b></div>
            <div class="acard-name">${esc(p.name)}</div>
            <div class="acard-sub">${p.role} · 28 Nov</div>
          </button>`;}).join('')}
        <button class="acard newcard" data-act="salary-all"><span class="plus">+</span><b>All salaries</b><i>Edit amounts and dates</i></button>
      </div>`)}
    ${band('↑',['#FDE9E6','#A03427'],'Move money','',
      `<button class="btn primary" style="width:100%" data-act="new-tx">+ New transaction</button>`)}
    ${band('▦',['#E7EAFE','#2E4BF2'],'Earned by project','',
      `<div class="list">${projects.map(p=>({p,v:p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0)}))
        .filter(r=>r.v>0).sort((a,b)=>b.v-a.v).slice(0,8).map(r=>`
        <div class="li"><span class="li-main"><b>${esc(r.p.name)}</b><i>${esc(r.p.client)} · ${esc(r.p.city)}</i></span>
          <span class="li-amt">${lakh(r.v)}</span></div>`).join('')}</div>`)}

    ${band('◷',['#E3F5EC','#146B49'],'This month by week','',
      `<div class="card"><div class="wk">${weekBars().map(w=>`
        <div class="wcol"><b>${lakh(w.v)}</b><div class="wbar"><i style="height:${Math.max(8,w.pct)}%"></i></div><span>${w.label}</span></div>`).join('')}</div></div>`)}

    ${band('▤',['#FBF0D8','#7A510E'],'By month','',
      `<div class="card"><div class="wk">${monthBars().map(w=>`
        <div class="wcol"><b>${lakh(w.v)}</b><div class="wbar"><i style="height:${Math.max(8,w.pct)}%"></i></div><span>${w.label}</span></div>`).join('')}</div></div>`)}

    ${band('◇',['#F3F4FA','#5A5D74'],'Recent',outGo.length+' transactions',
      `<div class="list">${outGo.slice(0,8).map(o=>`<div class="li">
        <span class="li-av" style="background:var(--mint-soft);color:var(--mint-ink)">OUT</span>
        <span class="li-main"><b>${esc(o.title)}</b><i>${esc(o.to)} · ${fmtDate(o.at)}</i></span>
        <span class="li-amt">${lakh(o.amount)}</span></div>`).join('')||'<div class="empty-row">Nothing paid yet</div>'}</div>`)}
  </div>`;
}

/* ---------- file bits ---------- */
function renderThumb(f){
  const h=f.hue;
  return `<svg class="rimg" viewBox="0 0 120 84" width="100%" height="84">
    <defs><linearGradient id="g${f.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${h} 42% 82%)"/><stop offset="1" stop-color="hsl(${h} 34% 66%)"/></linearGradient></defs>
    <rect width="120" height="84" fill="url(#g${f.id})"/>
    <rect x="8" y="10" width="46" height="30" rx="2" fill="hsl(${h} 18% 96%)" opacity=".55"/>
    <rect x="64" y="8" width="48" height="40" rx="2" fill="hsl(${h} 22% 92%)" opacity=".45"/>
    <rect x="10" y="56" width="100" height="12" rx="3" fill="hsl(${h} 30% 55%)" opacity=".5"/>
    <rect x="26" y="46" width="68" height="10" rx="3" fill="hsl(${h} 26% 78%)" opacity=".7"/>
    <circle cx="94" cy="22" r="7" fill="hsl(${h} 60% 90%)" opacity=".5"/>
  </svg>`;
}
function fileRow(f){
  const ab={render:'IMG',quote:'PDF',invoice:'INV',plan:'PDF'}[f.type]||'PDF';
  return `<button class="li" data-act="file" data-id="${f.id}">
    <span class="li-av ft-ico ${f.type}" style="border-radius:9px">${ab}</span>
    <span class="li-main"><b>${esc(f.short)}</b><i>${f.version} · ${fmtDate(f.at)} · ${f.size} MB</i></span>
    <span class="chev">›</span></button>`;
}

function versionFiles(p,set){
  return p.fileSets.find(s=>s.version===set)||p.fileSets[0];
}

function filesSheet(projectId,set){
  const p=projects.find(x=>x.id===projectId);
  const vs=versionFiles(p,set||p.fileSets[0].version);
  const isLatest=vs.version===p.fileSets[0].version;
  openSheet(sheetHead(esc(p.name)+' · '+vs.version, fmtDate(vs.at)+(isLatest?' · current':''))+`
    <div class="sheet-body">
      <div class="cats">
        ${p.fileSets.map(s=>`<button class="chip-btn ${s.version===vs.version?'on':''}" data-act="files" data-id="${p.id}" data-set="${s.version}">
          ${s.version}${s.version===p.fileSets[0].version?' · current':''}</button>`).join('')}
      </div>
      <div class="fgrid">
        ${vs.files.filter(f=>f.type==='render').map(f=>`
          <button class="fcell" data-act="file" data-id="${f.id}">${renderThumb(f)}
            <span class="fc-n">${esc(f.short)}</span><span class="fc-v">${f.version}</span></button>`).join('')}
      </div>
      <div class="list" style="margin-top:10px">${vs.files.filter(f=>f.type!=='render').map(fileRow).join('')}</div>
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

function fileSheet(fileId){
  const f=projects.flatMap(p=>p.files).find(x=>x.id===fileId);
  if(!f) return;
  const p=projects.find(x=>x.id===f.projectId);
  const chain=p.fileSets.map(s=>s.files.find(x=>x.short===f.short&&x.version===f.version)||s.files.find(x=>x.short===f.short)).filter(Boolean);
  openSheet(sheetHead(esc(f.short),f.version+' · '+fmtDate(f.at)+' · '+f.size+' MB')+`
    <div class="sheet-body">
      ${f.type==='render'
        ? `<div class="bigimg">${renderThumb(f)}</div><div class="sub center">${esc(f.short)}, ${f.version} · approved by the client</div>`
        : `${docPaper(f.short,f.type==='invoice'?'Invoice · '+f.version:'Quotation · '+f.version)}`}
      <div class="lab" style="margin:14px 0 6px">Versions of this file</div>
      ${chain.sort((a,b)=>b.at-a.at).map(x=>`
        <button class="li" data-act="file" data-id="${x.id}" style="padding:8px 0">
          <span class="li-main"><b>${x.version}</b><i>${fmtDate(x.at)} · ${x.size} MB</i></span>
          <span class="chip ${x.id===f.id?'blue':'mut'}">${x.id===f.id?'open':'view'}</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><a class="btn" href="sample-quotation.pdf" target="_blank">Open file</a>
      <button class="btn primary" data-act="close">Done</button></div>`);
}

/* ---------- shared pay flow ---------- */
function payFlow(title, to, amount, ref, done){
  window.__payDone = done;
  openSheet(sheetHead('Pay '+inr(amount), title)+`
    <div class="sheet-body">
      <div class="pay">${qrSVG(ref+String(amount))}
        <div><div class="kv"><span>To</span><b>${esc(to)}</b></div>
        <div class="kv"><span>UPI</span><b>homesic@okhdfc</b></div>
        <div class="kv"><span>Ref</span><b>${esc(ref)}</b></div></div></div>
      <button class="drop" data-act="upload" id="drop">Upload the payment screenshot<br><i>PNG or JPG — required before it is marked paid</i></button>
      ${attachBlock()}
      <div class="kv"><span>Category</span><b>${esc(title.split('·')[0].trim())}</b></div>
      <div class="note">The screenshot is what the payee sees as proof. It is filed against this payment.</div>
    </div>
    <div class="sheet-foot"><button class="btn" data-act="doc" data-name="Payment slip">Slip</button>
      <button class="btn primary" data-act="payflow-done">I have paid</button></div>`);
}


function _listRows(title, rows, sub){
  openSheet(sheetHead(title, rows.length+' items')+`
    <div class="sheet-body" style="padding:6px 0 8px">${rows.join('')||'<div class="empty-row">Nothing here</div>'}</div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

function listSheet(key,title){
  const pend=pendingApprovals();


  if(key==='ps-sales'||key==='ps-design'||key==='ps-prod'){
    const dept=key==='ps-sales'?'Sales':key==='ps-design'?'Design':'Production';
    const rows=staff.filter(x=>deptOf(x)===dept);
    return _listRows(dept+' performance', rows.map(x=>{const m=metricsFor(x);
      return `<button class="li" data-act="person" data-id="${x.id}">
        <span class="li-av" style="background:${x.tint[0]};color:${x.tint[1]}">${x.initials}</span>
        <span class="li-main"><b>${esc(x.name)}</b><i>${x.role} · ${m.base[0][1]} live · ${m.extra[0][1]} ${m.extra[0][0].toLowerCase()}</i></span>
        <span class="chev">›</span></button>`;}));
  }
  if(key==='upmeet'){
    return _listRows('Upcoming meetings', upMeetings().map(m=>`<button class="li" data-act="meeting" data-id="${m.id}">
      <span class="li-av" style="background:var(--cobalt-soft);color:var(--cobalt)">◷</span>
      <span class="li-main"><b>${esc(m.title)}</b><i>${fmtDate(m.date)} · ${hm(m)} · ${esc(m.client)}</i></span><span class="chev">›</span></button>`));
  }
  if(key==='msgs'){
    return _listRows('Messages', projects.map(p=>{const l=p.msgs[p.msgs.length-1];
      return `<button class="li" data-act="thread" data-id="${p.id}">
        <span class="li-av" style="background:var(--mint-soft);color:var(--mint-ink)">WA</span>
        <span class="li-main"><b>${esc(p.name)}</b><i>${esc(l.name)}: ${esc(l.text)}</i></span><span class="chev">›</span></button>`;}));
  }
  if(key==='mentions'){
    return _listRows('Mentions', mentions.map(m=>`<button class="li" data-act="thread" data-id="${m.projectId}">
      <span class="li-av" style="background:var(--coral-soft);color:var(--coral-ink)">@</span>
      <span class="li-main"><b>${esc(m.project)}</b><i>${esc(m.name)}: ${esc(m.text)}</i></span><span class="chev">›</span></button>`));
  }
  if(key==='pastmeet'){
    return _listRows('Past meetings', pastMeetings().map(m=>`<button class="li" data-act="meeting" data-id="${m.id}">
      <span class="li-av" style="background:#F3F4FA">◷</span>
      <span class="li-main"><b>${esc(m.title)}</b><i>${fmtDate(m.date)} · ${hm(m)} · ${esc(m.client)}</i></span><span class="chev">›</span></button>`));
  }
  if(key==='byproject'){
    return _listRows('Earned by project', projects.map(p=>({p,v:p.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0)}))
      .filter(r=>r.v>0).sort((a,b)=>b.v-a.v).map(r=>`<button class="li" data-act="money-project" data-id="${r.p.id}">
        <span class="li-av" style="background:#E7EAFE;color:#2E4BF2">₹</span>
        <span class="li-main"><b>${esc(r.p.name)}</b><i>${esc(r.p.client)} · ${esc(r.p.city)}</i></span>
        <span class="li-amt">${lakh(r.v)}</span></button>`));
  }
  if(key==='weeks'||key==='months'){
    const bars=key==='weeks'?weekBars():monthBars();
    const kind=key==='weeks'?'Week':'Month';
    return _listRows(kind+'ly earnings', bars.map(b=>`<button class="li" data-act="period" data-v="${b.label}" data-kind="${kind}">
      <span class="li-av" style="background:#E3F5EC;color:#146B49">₹</span>
      <span class="li-main"><b>${b.label}</b><i>${key==='weeks'?'that week':'that month'}</i></span>
      <span class="li-amt">${lakh(b.v)}</span></button>`));
  }
  if(key==='movement'||key==='recent'){ return movementSheet(); }
  if(key==='other'){ return _listRows('Other transactions', []); }
  if(key==='receive'){
    const rows=[]; projects.forEach(p=>p.payments.forEach(x=>{ if(x.status!=='paid') rows.push({p,x}); }));
    openSheet(sheetHead('Payments to receive',rows.length+' payments')+`
      <div class="sheet-body" style="padding:6px 0 8px">${rows.slice(0,60).map(payRow).join('')}</div>
      <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
    return;
  }
  const map={
    client:()=>pend.filter(a=>a.type==='Payment'||a.type==='Design'),
    internal:()=>pend.filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)),
    tomake:()=>pend.filter(a=>['Expense','Salary','Reimbursement'].includes(a.type)),
    leave:()=>pend.filter(a=>a.type==='Leave'),
    payroll:()=>salaries.filter(s=>s.status==='due'),
    decided:()=>approvals.filter(a=>a.status==='approved'||a.status==='rejected')
  };
  if(map[key]){
    const items=map[key]();
    openSheet(sheetHead(title,items.length+' items')+`
      <div class="sheet-body" style="padding:6px 0 8px">
        ${key==='payroll'
          ? items.map(s=>{const p=staff.find(x=>x.id===s.person);
              return `<div class="li"><span class="li-av" style="background:${p.tint[0]};color:${p.tint[1]}">${p.initials}</span>
                <span class="li-main"><b>${esc(p.name)}</b><i>${p.role} · 28 Nov</i></span>
                <span class="li-amt">${inr(s.amount)}</span>
                <button class="btn xs primary" data-act="salary-pay" data-id="${s.id}">Pay</button></div>`;}).join('')
          : items.map(apRow).join('')||'<div class="empty-row">Nothing here</div>'}
      </div>
      <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
    return;
  }
  const rows=[]; projects.forEach(p=>p.payments.forEach(x=>{ if(x.status===key) rows.push({p,x}); }));
  openSheet(sheetHead(title,rows.length+' payments')+`
    <div class="sheet-body" style="padding:6px 0 8px">${rows.slice(0,40).map(payRow).join('')||'<div class="empty-row">Nothing here</div>'}</div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}


/* ---------- activity detail ---------- */
function activitySheet(id){
  const a=activity.find(x=>x.id===id); if(!a) return;
  const tagged=staff.filter((_,i)=>i%7===0).slice(0,3);
  openSheet(sheetHead(a.who,(a.kind||'Activity')+' · '+fmtDate(a.at)+' '+a.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}))+`
    <div class="sheet-body">
      <p style="font-size:13px;line-height:1.5;font-weight:600">${esc(a.text)}</p>
      <div class="brief" style="margin-top:12px"><span class="lab">Brief</span>
        <p style="font-size:12px;margin-top:6px">${esc(a.who)} ${esc(a.text)}. Nothing is blocked by this.</p></div>
      <div class="lab" style="margin:14px 0 6px">People tagged</div>
      ${tagged.map(t=>`<div class="li"><span class="li-av" style="background:${t.tint[0]};color:${t.tint[1]}">${t.initials}</span>
        <span class="li-main"><b>${t.name}</b><i>${t.role}</i></span></div>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

/* ---------- clients ---------- */
function clientList(){
  const map={};
  projects.forEach(p=>{ (map[p.client]=map[p.client]||[]).push(p); });
  return Object.keys(map).map(name=>({name, projects:map[name],
    value:map[name].reduce((n,p)=>n+p.value,0), city:map[name][0].city}));
}
function clientsView(){
  return clientList().sort((a,b)=>b.value-a.value).map(c=>`
    <button class="card li" data-act="client" data-id="${esc(c.name)}">
      <span class="li-av" style="background:#F1E9FB;color:#5B3E96">${c.name.slice(0,2).toUpperCase()}</span>
      <span class="li-main"><b>${esc(c.name)}</b><i>${c.projects.length} project${c.projects.length>1?'s':''} · ${esc(c.city)}</i></span>
      <span class="li-amt">${lakh(c.value)}</span>
    </button>`).join('');
}
function clientSheet(name){
  const c=clientList().find(x=>x.name===name); if(!c) return;
  const phone='+91 98'+String(10000000+Math.abs(name.length*7919)%90000000).slice(0,8);
  openSheet(sheetHead(esc(name),c.projects.length+' projects · '+lakh(c.value))+`
    <div class="sheet-body">
      <div class="kv"><span>Phone</span><b>${phone}</b></div>
      <div class="kv"><span>City</span><b>${esc(c.city)}</b></div>
      <div class="kv"><span>Lifetime value</span><b>${lakh(c.value)}</b></div>
      <div class="lab" style="margin:14px 0 6px">Brief</div>
      <p style="font-size:12.5px;line-height:1.5">${esc(name)} has ${c.projects.length} project${c.projects.length>1?'s':''} with Homesic, all in ${esc(c.city)}.</p>
      <div class="lab" style="margin:14px 0 6px">Projects</div>
      ${c.projects.map(pr=>`<button class="li" data-act="project" data-id="${pr.id}">
        <span class="li-main"><b>${esc(pr.name)}</b><i>${STAGES[pr.stage].name} · ${lakh(pr.value)}</i></span>
        <span class="chev">›</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

/* ---------- money drill-downs ---------- */
function moneyProjectSheet(pid){
  const pr=projects.find(x=>x.id===pid); if(!pr) return;
  const paid=pr.payments.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0);
  const total=pr.payments.reduce((n,x)=>n+x.amount,0);
  openSheet(sheetHead(esc(pr.name),lakh(paid)+' of '+lakh(total))+`
    <div class="sheet-body">
      <div class="lab" style="margin-bottom:6px">Payment history</div>
      ${pr.payments.map(x=>`<div class="li" style="padding:10px 0">
        <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${x.pct}%</span>
        <span class="li-main"><b>${x.stage}</b><i>${x.status==='paid'?'paid '+fmtDate(x.paidOn):'due '+fmtDate(x.dueOn)}</i></span>
        <span class="li-amt">${inr(x.amount)}</span>${payChip(x)}</div>`).join('')}
      <div class="lab" style="margin:16px 0 6px">Documents</div>
      ${pr.fileSets[0].files.filter(f=>f.type!=='render').map(f=>`
        <button class="li" data-act="file" data-id="${f.id}" style="padding:10px 0">
          <span class="li-av ft-ico ${f.type}" style="border-radius:9px">${f.type==='quote'?'PDF':'INV'}</span>
          <span class="li-main"><b>${esc(f.short)}</b><i>${f.version} · ${fmtDate(f.at)}</i></span>
          <span class="chev">›</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

function periodSheet(label,kind){
  const rows=[]; projects.forEach(pr=>pr.payments.forEach(x=>{ if(x.status==='paid') rows.push({p:pr,x}); }));
  rows.sort((a,b)=>b.x.paidOn-a.x.paidOn);
  const list=rows.slice(0, Math.max(4, Math.round(rows.length/6)));
  openSheet(sheetHead(kind+' · '+label, list.length+' payments')+`
    <div class="sheet-body" style="padding:6px 0 8px">
      ${list.map(r=>`<button class="li" data-act="project" data-id="${r.p.id}">
        <span class="li-av" style="background:var(--mint-soft);color:var(--mint-ink)">₹</span>
        <span class="li-main"><b>${esc(r.p.name)}</b><i>${r.x.stage} · paid ${fmtDate(r.x.paidOn)}</i></span>
        <span class="li-amt">${lakh(r.x.amount)}</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

function movementSheet(){
  const rows=[];
  projects.forEach(pr=>pr.payments.forEach(x=>{ if(x.status==='paid') rows.push({at:x.paidOn,who:pr.client,what:pr.name,amt:x.amount,dir:'in'}); }));
  outGo.forEach(o=>rows.push({at:o.at,who:o.to,what:o.title,amt:o.amount,dir:'out'}));
  rows.sort((a,b)=>b.at-a.at);
  openSheet(sheetHead('Money movement',rows.length+' entries')+`
    <div class="sheet-body" style="padding:6px 0 8px">
      ${rows.slice(0,50).map(r=>`<div class="li">
        <span class="li-av" style="background:${r.dir==='in'?'#E3F5EC':'#FDE9E6'};color:${r.dir==='in'?'#146B49':'#A03427'}">${r.dir==='in'?'IN':'OUT'}</span>
        <span class="li-main"><b>${esc(r.what)}</b><i>${r.dir==='in'?'from':'to'} ${esc(r.who)} · ${fmtDate(r.at)}</i></span>
        <span class="li-amt">${r.dir==='in'?'+':'−'}${lakh(r.amt)}</span></div>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

/* ---------- login as ---------- */
function loginAsSheet(){
  const top=staff.filter(x=>x.role!=='Managing Director').slice(0,8);
  openSheet(sheetHead('Log in as','See the app as a teammate')+`
    <div class="sheet-body" style="padding:6px 0 8px">
      ${top.map(x=>`<button class="li" data-act="login-as" data-id="${x.id}">
        <span class="li-av" style="background:${x.tint[0]};color:${x.tint[1]}">${x.initials}</span>
        <span class="li-main"><b>${x.name}</b><i>${x.role}</i></span><span class="chev">›</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn danger" data-act="sign-out">Sign out</button>
      <button class="btn primary" data-act="close">Cancel</button></div>`);
}

/* ---------- more ---------- */
function moreView(){
  return `
  <div class="card"><div class="row2">
    <span class="li-av" style="background:#D9D4F8;color:#3B3570;width:44px;height:44px;font-size:14px">AK</span>
    <div class="li-main"><b>Arya Kumar</b><i>Managing director</i></div></div></div>
  ${[['People','people',staff.length+' people'],['Activity','activity','40 entries'],
     ['Connections','integrations','WhatsApp and Google Meet'],['Settings','settings','Tenant values']]
    .map(([t,r,s])=>`<button class="card li" data-act="go-tab" data-to="${r}">
      <span class="li-av" style="background:#F3F4FA;color:var(--ink2)">${tabIcon('M5 12h14M12 5v14',15)}</span>
      <span class="li-main"><b>${t}</b><i>${s}</i></span><span class="chev">›</span></button>`).join('')}
  <button class="card li" data-act="listen"><span class="li-av" style="background:var(--cobalt-soft);color:var(--cobalt)">${tabIcon('M11 5 6 9H3v6h3l5 4z',15)}</span>
    <span class="li-main"><b>Read the brief</b><i>Speaks the summary aloud</i></span><span class="chev">›</span></button>`;
}


/* ---------- performance ---------- */
const DEPT={'Sales rep':'Sales','Sales Head':'Sales','Designer':'Design','Design Partner':'Design','Design Head':'Design',
  'Production Manager':'Production','Production Head':'Production','Marketing Head':'Marketing','Managing Director':'Leadership'};
const deptOf=s=>DEPT[s.role]||'Support';

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
  if(d==='Sales'){
    extra=[['Leads in hand',8+seed%14],['Calls this week',22+seed%31],['Conversion',(18+seed%23)+'%'],
      ['Pipeline',lakh(mine.reduce((n,p)=>n+p.value,0)*0.4)]];
  } else if(d==='Design'){
    extra=[['Renders this month',6+seed%12],['Approval rate',(58+seed%30)+'%'],['Revisions per project',(1+seed%3)+'.'+(seed%9)]];
  } else if(d==='Production'){
    extra=[['Sites running',live.length],['Slip days',seed%9],['Snags open',seed%7]];
  } else if(d==='Marketing'){
    extra=[['Leads generated',14+seed%26],['Cost per lead','₹'+(180+seed%220)],['Content shipped',4+seed%8]];
  } else {
    extra=[['People managed',staff.filter(x=>deptOf(x)===d).length]];
  }
  return {base,extra,earned,sal,d};
}

function personSheet(id){
  const s=staff.find(x=>x.id===id); if(!s) return;
  const m=metricsFor(s);
  const mine=projects.filter(p=>p.team.includes(s.id));
  openSheet(sheetHead(s.name,s.role+' · '+m.d)+`
    <div class="sheet-body">
      <div class="trio">
        <div><span class="lab">Earned</span><b>${lakh(m.earned)}</b></div>
        <div><span class="lab">Salary</span><b>${m.sal?inr(m.sal.amount):'—'}</b></div>
        <div><span class="lab">Rating</span><b>${s.rating.toFixed(1)}</b></div>
      </div>
      <div class="lab" style="margin:12px 0 4px">${m.d} performance</div>
      ${m.extra.map(([k,v])=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('')}
      <div class="lab" style="margin:14px 0 4px">Workload</div>
      ${m.base.map(([k,v])=>`<div class="kv"><span>${k}</span><b>${v}</b></div>`).join('')}
      <div class="lab" style="margin:14px 0 6px">Projects</div>
      ${mine.slice(0,6).map(p=>`<button class="li" data-act="project" data-id="${p.id}" style="padding:9px 0">
        <span class="li-main"><b>${esc(p.name)}</b><i>${STAGES[p.stage].name} · ${p.status}</i></span>
        <span class="chip ${p.status==='On track'?'ok':p.status==='Closed'?'mut':'late'}">${p.status}</span></button>`).join('')}
    </div>
    <div class="sheet-foot"><button class="btn" data-act="login-as" data-id="${s.id}">Log in as</button>
      <button class="btn danger" data-act="hibernate" data-id="${s.id}">${s.status==='Active'?'Hibernate':'Reactivate'}</button></div>`);
}

function peopleView(){
  const depts=['All','Sales','Design','Production','Leadership','Support'];
  const list=staff.filter(x=>!md.dept||md.dept==='All'||deptOf(x)===md.dept);
  return `
  <div class="row2">${depts.map(d=>`<button class="chip-btn ${(md.dept||'All')===d?'on':''}" data-act="dept" data-v="${d}">${d}</button>`).join('')}</div>
  ${list.map(x=>{const m=metricsFor(x);return `
    <button class="card li" data-act="person" data-id="${x.id}">
      <span class="li-av" style="background:${x.tint[0]};color:${x.tint[1]}">${x.initials}</span>
      <span class="li-main"><b>${x.name}</b><i>${x.role} · ${projects.filter(p=>p.team.includes(x.id)).length} projects</i></span>
      <span class="li-amt">${m.extra[0]?m.extra[0][1]:''}</span>
    </button>`;}).join('')}`;
}


function perfRows(dept,sortKey){
  return staff.filter(x=>deptOf(x)===dept).map(x=>({x,m:metricsFor(x)}))
    .sort((a,b)=>parseInt(b.m.extra[sortKey]?.[1]||0)-parseInt(a.m.extra[sortKey]?.[1]||0));
}
function perfCard(r,dept){
  const first=r.m.extra[0], second=r.m.extra[1];
  const label=(first?first[0]:'').toLowerCase();
  return `<button class="acard" data-act="person" data-id="${r.x.id}">
    <div class="acard-top"><span class="acard-big">${first?first[1]:'—'}</span><span class="chip blue">${label}</span></div>
    <div class="acard-name">${esc(r.x.name)}</div>
    <div class="acard-sub">${second?second[0]+': '+second[1]:r.x.role}</div>
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
  return staff.filter(x=>deptOf(x)===dept).map(x=>({x,m:metricsFor(x)}))
    .sort((a,b)=>b.m.earned-a.m.earned);
}
function deptView(dept){
  const rows=deptRows(dept);
  const dm=deptMetrics(dept), cols=dm.cols, ci=dm.chart;
  const earn=rows.reduce((n,r)=>n+r.m.earned,0);
  const live=rows.reduce((n,r)=>n+r.m.base[0][1],0);
  const num=(v)=>{const n=parseFloat(String(v).replace(/[^\d.]/g,'')); return isNaN(n)?0:n;};
  const chart=rows.map(r=>({n:r.x.name.split(' ')[0], v:num(r.m.extra[ci]?r.m.extra[ci][1]:0), raw:r.m.extra[ci]?r.m.extra[ci][1]:'—'}));
  const max=Math.max(1,...chart.map(c=>c.v));
  return `
  <div class="bandwrap">
    ${band('₹',['#E3F5EC','#146B49'],'Collected',dept+' · all projects',`
      <div class="card moneyrow">
        <div><span class="lab">Total</span><b>${lakh(earn)}</b></div>
        <div><span class="lab">Live</span><b>${live}</b></div>
        <div><span class="lab">People</span><b>${rows.length}</b></div>
      </div>`)}

    ${band('▥',['#E7EAFE','#2E4BF2'],cols[ci][0]+' by person',cols[ci][0]+' ranked',`
      <div class="card"><div class="wk">${chart.map(c=>`
        <div class="wcol"><b>${c.raw}</b><div class="wbar"><i style="height:${Math.max(8,Math.round(c.v/max*100))}%"></i></div><span>${esc(c.n)}</span></div>`).join('')}</div></div>`)}

    ${band('▤',['#F1E9FB','#5B3E96'],'Complete table','',`
      <div class="card">
        <div class="pt-h"><span>Name</span><span>${cols[0][0]}</span><span>${cols[1][0]}</span><span>${cols[2][0]}</span><span>Earned</span></div>
        ${rows.map(r=>`<button class="pt-row" data-act="person" data-id="${r.x.id}">
          <b>${esc(r.x.name.split(' ')[0])}<i>${r.x.role.slice(0,10)}</i></b>
          <span class="ok">${r.m.extra[0]?r.m.extra[0][1]:'—'}</span><span>${r.m.extra[1]?r.m.extra[1][1]:'—'}</span>
          <span>${r.m.extra[2]?r.m.extra[2][1]:'—'}</span><span class="amt">${lakh(r.m.earned)}</span>
        </button>`).join('')}
      </div>`)}

    ${band('◔',['#FBF0D8','#7A510E'],'Load','Live projects per person',`
      <div class="rail">${rows.map(r=>`<button class="acard" data-act="person" data-id="${r.x.id}">
        <div class="acard-top"><span class="acard-big">${r.m.base[0][1]}</span><span class="chip blue">live</span></div>
        <div class="acard-name">${esc(r.x.name)}</div><div class="acard-sub">${r.x.role}</div></button>`).join('')}</div>`)}
  </div>`;
}

function performanceView(){
  const sales=perfRows('Sales',2), design=perfRows('Design',1), prod=perfRows('Production',1), mkt=perfRows('Marketing',0);
  const strip=(rows,dept)=>`<div class="rail">${rows.map(r=>perfCard(r,dept)).join('')||'<div class="empty-row">Nobody here</div>'}</div>`;
  return `
  <div class="bandwrap">
    ${band('▤',['#E7EAFE','#2E4BF2'],'Sales performance',sales.length+' reps',strip(sales,'Sales'),undefined,'ps-sales').replace('<section class="band">','<section class="band" data-dept="Sales">')}
    ${band('◈',['#F1E9FB','#5B3E96'],'Design performance',design.length===1?'1 person':design.length+' people',strip(design,'Design'),undefined,'ps-design')}
    ${band('⚙',['#FBF0D8','#7A510E'],'Production performance',prod.length+' managers',strip(prod,'Production'),undefined,'ps-prod')}
    ${band('◎',['#E3F5EC','#146B49'],'Marketing performance',mkt.length===1?'1 person':mkt.length+' people',strip(mkt,'Marketing'),undefined,'ps-marketing')}
  </div>`;
}

function salesView(){
  const reps=staff.filter(x=>deptOf(x)==='Sales');
  const rows=reps.map(r=>{const m=metricsFor(r);
    return {r,m,leads:m.extra[0][1],calls:m.extra[1][1],conv:m.extra[2][1],pipe:m.extra[3][1],earned:m.earned};});
  rows.sort((a,b)=>parseInt(b.conv)-parseInt(a.conv));
  return `
  <div class="bandwrap">
    ${band('▤',['#E7EAFE','#2E4BF2'],'Sales board',rows.length+' reps',`
      <div class="card"><div class="lead-h"><span>Rep</span><span>Leads</span><span>Calls</span><span>Conv</span><span>Pipeline</span></div>
      ${rows.map(r=>`<div class="lead-row"><b>${esc(r.r.name.split(' ')[0])}</b><span>${r.leads}</span><span>${r.calls}</span>
        <span class="ok">${r.conv}</span><span>${r.pipe}</span></div>`).join('')}</div>`)}
    ${band('◔',['#E3F5EC','#146B49'],'Pipeline by rep','Open value in hand',`
      <div class="rail">${rows.map(r=>`<button class="acard" data-act="person" data-id="${r.r.id}">
        <div class="acard-top"><span class="chip blue">${r.conv}</span><b>${r.pipe}</b></div>
        <div class="acard-name">${esc(r.r.name)}</div><div class="acard-sub">${r.leads} leads · ${r.calls} calls</div></button>`).join('')}</div>`)}
    ${band('₹',['#FBF0D8','#7A510E'],'Collected by rep','Against the projects they own',`
      <div class="list">${rows.map(r=>`<button class="li" data-act="person" data-id="${r.r.id}">
        <span class="li-av" style="background:${r.r.tint[0]};color:${r.r.tint[1]}">${r.r.initials}</span>
        <span class="li-main"><b>${esc(r.r.name)}</b><i>${r.m.base[0][1]} live projects</i></span>
        <span class="li-amt">${lakh(r.earned)}</span></button>`).join('')}</div>`)}
  </div>`;
}

function calendarStrip(){
  const days=[];
  for(let i=0;i<7;i++){
    const d=new Date(TODAY.getTime()-(6-i)*86400000);
    const n=activity.filter(a=>a.at.toDateString()===d.toDateString()).length;
    days.push({d,n});
  }
  return `<div class="cal">${days.map(x=>`
    <button class="cal-d ${x.d.toDateString()===TODAY.toDateString()?'today':''}" data-act="cal-day" data-v="${x.d.toDateString()}">
      <span>${x.d.toLocaleDateString('en-GB',{weekday:'short'}).slice(0,1)}</span>
      <b>${x.d.getDate()}</b>
      <i class="${x.n?'on':''}"></i>
    </button>`).join('')}</div>`;
}


function monthCalendar(){
  const y=TODAY.getFullYear(), m=TODAY.getMonth();
  const first=new Date(y,m,1).getDay();
  const days=new Date(y,m+1,0).getDate();
  const cells=[];
  for(let i=0;i<first;i++) cells.push(null);
  for(let d=1;d<=days;d++) cells.push(new Date(y,m,d));
  const count=d=>activity.filter(a=>a.at.toDateString()===d.toDateString()).length;
  return `<div class="cal-m">
    <div class="cal-mh"><b>${TODAY.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</b>
      <span class="mut">${activity.length} events</span></div>
    <div class="cal-grid">
      ${['S','M','T','W','T','F','S'].map(d=>`<span class="cal-w">${d}</span>`).join('')}
      ${cells.map(d=>d?`<button class="cal-cell ${d.toDateString()===TODAY.toDateString()?'today':''}" data-act="cal-day" data-v="${d.toDateString()}">
        <span>${d.getDate()}</span>${count(d)?'<i></i>':''}</button>`:'<span class="cal-cell empty"></span>').join('')}
    </div></div>`;
}

function activityView(){
  let list=activity.slice();
  if(md.actProject) list=list.filter(a=>a.text.toLowerCase().includes(String(md.actProject).toLowerCase())||String(a.text).includes(md.actProject));
  if(md.actPerson) list=list.filter(a=>a.who===md.actPerson);
  if(md.actDay) list=list.filter(a=>a.at.toDateString()===md.actDay);
  list.sort((a,b)=>b.at-a.at);
  const days={};
  list.slice(0,80).forEach(a=>{ const k=a.at.toDateString(); (days[k]=days[k]||[]).push(a); });
  return `
  <div class="row2">
    <button class="chip-btn ${md.actProject?'on':''}" data-act="act-project">${md.actProject?esc(md.actProject):'All projects'}</button>
    <button class="chip-btn ${md.actPerson?'on':''}" data-act="act-person">${md.actPerson?esc(md.actPerson):'All people'}</button>
    ${md.actProject||md.actPerson?'<button class="chip-btn" data-act="act-clear">Clear</button>':''}
  </div>
  ${monthCalendar()}
  ${Object.keys(days).map(day=>`
    <div class="dayhead">${new Date(day).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'})}</div>
    ${days[day].map(a=>`<button class="card li" data-act="activity" data-id="${a.id}">
      <span class="li-av" style="background:${a.tint[0]};color:${a.tint[1]}">${a.initials}</span>
      <span class="li-main"><b>${a.who}</b><i>${a.text}</i></span>
      <span class="li-time">${a.at.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>
    </button>`).join('')}`).join('')||'<div class="empty"><b>No activity</b>Nothing matches that filter.</div>'}`;
}

function settingsView(){
  return `<div class="card pad0">
    ${[['Messaging window','08:00 – 22:00'],['Client split','10 / 50 / 35 / 5'],['Design stage','15 days'],['Production stage','45 days'],['Installation stage','5 days'],['Session','15 days']]
      .map(([k,v])=>`<div class="li"><span class="li-main"><b>${k}</b><i>Changeable by the MD</i></span><span class="li-amt">${v}</span></div>`).join('')}
  </div>
  <div class="sechead"><span>Reading voice</span></div>
  <div class="card"><select id="voiceSel" class="voice"></select>
    <div class="sub" style="margin-top:8px">Used when you tap Listen.</div></div>`;
}

function integrationsView(){
  const row=(name,status,detail,need)=>`<div class="card">
    <div class="spread"><b>${name}</b><span class="chip ${status==='Connected'?'ok':'late'}">${status}</span></div>
    <div class="sub" style="margin-top:6px">${detail}</div>
    <div class="kv" style="margin-top:8px"><span>Needs</span><b style="text-align:right;max-width:60%">${need}</b></div>
  </div>`;
  return `
  <div class="note">These two integrations run on a server, not in the browser. The screens here work against local data; connect the services to make them live.</div>
  ${row('WhatsApp Business','Not connected','Group chats, messages and mentions. Inbound webhook, outbound templates.','Meta WABA phone number ID, permanent token, webhook URL — or a Twilio account with the WhatsApp sender')}
  ${row('Google Meet','Not connected','Creates the meet link and the calendar invitation when a meeting is booked.','Workspace service account with domain-wide delegation, calendar.events scope')}
  ${row('Meeting responses','Local demo','Accept, decline and pending are stored on the meeting record.','Calendar attendee status sync, or RSVP links in the invitation')}`;
}

/* ---------- sheets ---------- */
function openSheet(html){ const s=document.getElementById('sheet'); s.innerHTML=`<div class="grab"></div>${html}`;
  document.getElementById('shade').classList.add('on'); s.classList.add('on'); }
function closeSheet(){ document.getElementById('sheet').classList.remove('on'); document.getElementById('shade').classList.remove('on'); }
function toast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('on');
  clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('on'),2400); }
const sheetHead=(t,s)=>`<div class="sheet-head"><div><b>${t}</b><i>${s}</i></div><button class="x" data-act="close">✕</button></div>`;

function attachBlock(){
  return `<div class="attach">
    <a class="att" href="sample-quotation.pdf" target="_blank">
      <span class="att-prev">${renderThumb({id:'att1',hue:205})}</span>
      <span class="att-t"><b>screenshot.jpg</b><i>Payment screenshot</i></span>
    </a>
    <a class="att" href="sample-quotation.pdf" target="_blank">
      <span class="att-prev pdf">PDF</span>
      <span class="att-t"><b>bill.pdf</b><i>Supporting document</i></span>
    </a>
  </div>`;
}

/* pickers */
let pickCb=null, pickSet=null;
function pickOne(title,items,current,cb){
  pickCb=cb;
  openSheet(sheetHead(title,'Choose one')+`<div class="sheet-body" style="padding:6px 0 14px">
    ${items.map(it=>`<button class="li" data-act="pick-one" data-id="${it.id}">
      <span class="li-av" style="background:${it.tint?it.tint[0]:'#F3F4FA'};color:${it.tint?it.tint[1]:'#5A5D74'}">${it.initials||it.id.slice(0,2)}</span>
      <span class="li-main"><b>${esc(it.name)}</b><i>${esc(it.sub||it.role||'')}</i></span>
      ${current===it.id?'<span class="chip blue">current</span>':''}</button>`).join('')}
  </div>`);
}
function pickMany(title,items,selected,cb){
  pickCb=cb; pickSet=new Set(selected);
  openSheet(sheetHead(title,'Choose any number')+`<div class="sheet-body" style="padding:6px 0 0">
    <div id="pickList">${pickRows(items)}</div>
  </div><div class="sheet-foot"><button class="btn primary" data-act="pick-done">Done (${pickSet.size})</button></div>`);
}
function pickRows(items){
  return items.map(it=>`<button class="li" data-act="pick-toggle" data-id="${it.id}">
    <span class="li-av" style="background:${it.tint?it.tint[0]:'#F3F4FA'};color:${it.tint?it.tint[1]:'#5A5D74'}">${it.initials||it.id.slice(0,2)}</span>
    <span class="li-main"><b>${esc(it.name)}</b><i>${esc(it.role||it.sub||'')}</i></span>
    <span class="tick ${pickSet.has(it.id)?'on':''}">✓</span></button>`).join('');
}

/* team */
function teamSheet(projectId){
  const p=projects.find(x=>x.id===projectId);
  openSheet(sheetHead('Team · '+esc(p.name), p.team.length+' people')+`
    <div class="sheet-body" style="padding:6px 0 4px">
      ${p.team.map(id=>{ const s=staff.find(x=>x.id===id); if(!s) return '';
        return `<div class="li">
          <span class="li-av" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</span>
          <span class="li-main"><b>${s.name}</b><i>${s.role}</i></span>
          <button class="btn xs" data-act="team-replace" data-id="${p.id}" data-who="${s.id}">Replace</button>
          <button class="btn xs danger" data-act="team-remove" data-id="${p.id}" data-who="${s.id}">✕</button>
        </div>`;}).join('')}
      <button class="add" data-act="team-add" data-id="${p.id}">+ Add team member</button>
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

/* payments */
function reviewSheet(proofId){
  const pr=proofs.find(x=>x.id===proofId);
  if(!pr){ toast('Already settled'); return; }
  const p=projects.find(x=>x.id===pr.projectId);
  const pay=p.payments.find(x=>x.stage===pr.stage);
  const ap=approvals.find(a=>a.payId===pr.id);
  openSheet(sheetHead('Confirm payment',esc(p.name)+' · '+esc(p.client))+`
    <div class="sheet-body">
      <div class="proof">
        <div class="proof-top"><span>UPI</span><span>Payment sent</span></div>
        <div class="proof-amt">${inr(pr.amount)}</div>
        <div class="proof-to">to HOMESIC DESIGN</div>
        <div class="proof-rows"><div><span>Reference</span><b>${pr.id}</b></div>
          <div><span>Sent</span><b>${fmtDate(pr.at)}</b></div><div><span>Status</span><b style="color:#146B49">Success</b></div></div>
      </div>
      
      <div class="kv"><span>Gate</span><b>${pay.stage} · ${pay.pct}%</b></div>
      <div class="kv"><span>Due</span><b>${fmtDate(pay.dueOn)}</b></div>
      <div class="kv"><span>Waiting</span><b>${pr.ageH} hours</b></div>
      ${attachBlock()}
    </div>
    <div class="sheet-foot"><button class="btn danger" data-act="review-reject" data-apr="${ap?ap.id:''}">Reject</button>
      <button class="btn primary" data-act="review-confirm" data-pid="${pr.id}">Confirm receipt</button></div>`);
}

function paySheet(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  const person=a.person?staff.find(s=>s.id===a.person):null;
  openSheet(sheetHead('Pay '+inr(a.amount||0),esc(a.title))+`
    <div class="sheet-body">
      <div class="pay">${qrSVG(a.id+String(a.amount))}
        <div><div class="kv"><span>To</span><b>${person?esc(person.name):'Vendor'}</b></div>
          <div class="kv"><span>UPI</span><b>homesic@okhdfc</b></div>
          <div class="kv"><span>Ref</span><b>${a.id}</b></div></div></div>
      <button class="drop" data-act="upload" id="drop">Upload the payment screenshot<br><i>PNG or JPG</i></button>
      <div class="kv"><span>Raised by</span><b>${a.type==='Salary'?'Payroll':'Production Manager'}</b></div>
      <div class="kv"><span>Approved by</span><b>You</b></div>
      ${attachBlock()}
    </div>
    <div class="sheet-foot"><button class="btn" data-act="doc" data-name="Bill">View bill</button>
      <button class="btn primary" data-act="pay-confirm" data-id="${a.id}">I have paid</button></div>`);
}

function leaveSheet(id){
  const a=approvals.find(x=>x.id===id); if(!a) return;
  const person=a.person?staff.find(s=>s.id===a.person):null;
  const from=new Date(TODAY.getTime()+2*86400000), to=new Date(from.getTime()+2*86400000);
  openSheet(sheetHead('Approve leave',person?esc(person.name):'Staff')+`
    <div class="sheet-body">
      <div class="two"><label>From<input type="date" id="lvFrom" value="${from.toISOString().slice(0,10)}"></label>
        <label>To<input type="date" id="lvTo" value="${to.toISOString().slice(0,10)}"></label></div>
      <div class="lab" style="margin-top:14px">Cover</div>
      <div id="coverRows"><div class="cover">
        <select class="cover-person">${staff.filter(s=>s.role!=='Managing Director').map(s=>`<option value="${s.id}">${s.name} · ${s.role}</option>`).join('')}</select>
        <select class="cover-scope"><option>All their projects</option><option>Selected only</option><option>Tasks only</option></select>
        <div class="two"><label>From<input class="cover-from" type="date" value="${from.toISOString().slice(0,10)}"></label>
          <label>Until<input class="cover-until" type="date" value="${to.toISOString().slice(0,10)}"></label></div>
      </div></div>
      <button class="add" data-act="add-cover">+ Add another person</button>
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="leave-confirm" data-id="${a.id}">Approve with this cover</button></div>`);
}

function docPaper(title,sub){
  return `<div class="paper"><div class="pg-top"><b>HOMESIC</b><span>${esc(sub)}</span></div>
    <div class="pg-title">${esc(title)}</div>
    ${[['Modular kitchen','4,80,000'],['Wardrobes','3,75,000'],['TV console','95,000'],['False ceiling','1,10,000'],['GST 18%','2,03,040']].map(r=>`<div class="pg-line"><span>${r[0]}</span><span>₹${r[1]}</span></div>`).join('')}
    <div class="pg-total"><span>Total</span><span>₹13,31,040</span></div></div>`;
}
function docSheet(name){
  openSheet(sheetHead(esc(name),'Approved · 22 Nov 2026')+`
    <div class="sheet-body">${docPaper(name,'Quotation · 22 Nov 2026')}</div>
    <div class="sheet-foot"><a class="btn" href="sample-quotation.pdf" target="_blank">Open the PDF</a>
      <button class="btn primary" data-act="close">Done</button></div>`);
}

function editSheet(id){
  const p=projects.find(x=>x.id===id); if(!p) return;
  openSheet(sheetHead('Edit project',esc(p.name))+`
    <div class="sheet-body">
      <label class="fld">Name<input id="epName" value="${esc(p.name)}"></label>
      <label class="fld">Value (₹)<input id="epValue" type="number" value="${p.value}"></label>
      <label class="fld">Stage<select id="epStage">${STAGES.map((s,i)=>`<option value="${i}" ${i===p.stage?'selected':''}>${s.name}</option>`).join('')}</select></label>
      <label class="fld">Promised<input id="epPromised" type="date" value="${p.promised.toISOString().slice(0,10)}"></label>
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="save" data-id="${p.id}">Save</button></div>`);
}


/* ---------- meetings ---------- */
function newMeetingSheet(projectId){
  const p=projectId?projects.find(x=>x.id===projectId):null;
  const d=new Date(TODAY.getTime()+2*86400000);
  md.meetingDraft={
    projectId:projectId||null, client:p?p.client:'', participants:(p?p.team.slice():[]),
    date:d.toISOString().slice(0,10), hour:10, minute:0, ampm:'AM', agenda:'', title:p?('Design walkthrough · '+p.name):''
  };
  openSheet(sheetHead('New meeting', p?esc(p.name):'No project selected')+`
    <div class="sheet-body">
      <label class="fld">Subject<input id="mTitle" value="${esc(md.meetingDraft.title)}" placeholder="What is this meeting about?"></label>

      <div class="lab">Client</div>
      <button class="pickrow" data-act="pick-client">
        <span>${md.meetingDraft.client?esc(md.meetingDraft.client):'No client'}</span><span class="chev">›</span>
      </button>
      <button class="linkbtn" data-act="clear-client">Remove client</button>

      <div class="lab" style="margin-top:14px">Participants</div>
      <div id="partChips" class="chips" style="margin:6px 0 0;padding:0;overflow:visible;flex-wrap:wrap">
        ${md.meetingDraft.participants.map(id=>{const s=staff.find(x=>x.id===id);return s?`<button class="chip-btn" data-act="unpart" data-id="${id}">${s.name.split(' ')[0]} ✕</button>`:'';}).join('')}
      </div>
      <button class="add" data-act="pick-people">+ Add people by designation</button>

      <div class="two" style="margin-top:14px">
        <label>Date<input type="date" id="mDate" value="${md.meetingDraft.date}"></label>
        <label>Time<select id="mTime">
          ${Array.from({length:12},(_,i)=>i+1).map(h=>`<option ${h===10?'selected':''}>${String(h).padStart(2,'0')}</option>`).join('')}</select></label>
      </div>
      <div class="two" style="margin-top:8px">
        <label>Minutes<select id="mMin"><option selected>00</option><option>15</option><option>30</option><option>45</option></select></label>
        <label>AM / PM<select id="mAmPm"><option>AM</option><option>PM</option></select></label>
      </div>

      <label class="fld" style="margin-top:14px">Agenda<textarea id="mAgenda" rows="4" placeholder="Purpose and topics"></textarea></label>
      
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="create-meeting">Create meeting</button></div>`);
}

function meetingSheet(id){
  const m=meetings.find(x=>x.id===id); if(!m) return;
  const c=rsvpCount(m);
  openSheet(sheetHead(esc(m.title),fmtDate(m.date)+' · '+hm(m)+' · '+esc(m.client))+`
    <div class="sheet-body">
      <div class="kv"><span>Project</span><b>${esc(m.projectName||'')}</b></div>
      <div class="kv"><span>Google Meet</span><b><a href="${m.link}" target="_blank" rel="noopener">Open link</a></b></div>
      <div class="kv"><span>Agenda</span><b style="max-width:60%;text-align:right">${esc(m.agenda)}</b></div>
      <div class="kv"><span>Accepted</span><b>${c.accepted||0} of ${m.participants.length}</b></div>
      <div class="kv"><span>Declined</span><b>${c.declined||0}</b></div>
      <div class="kv"><span>Pending</span><b>${c.pending||0}</b></div>

      <div class="lab" style="margin:14px 0 6px">Invited</div>
      ${m.participants.map(x=>{const s=staff.find(y=>y.id===x.id); if(!s) return '';
        return `<div class="li"><span class="li-av" style="background:${s.tint[0]};color:${s.tint[1]}">${s.initials}</span>
          <span class="li-main"><b>${s.name}</b><i>${s.role}</i></span>
          <span class="chip ${x.rsvp==='accepted'?'ok':x.rsvp==='declined'?'now':'late'}">${x.rsvp}</span>
          <button class="btn xs" data-act="rsvp" data-id="${m.id}" data-who="${s.id}" data-v="${x.rsvp==='accepted'?'declined':'accepted'}">toggle</button></div>`;}).join('')}

      ${m.past?`
        <div class="lab" style="margin:16px 0 6px">Notes</div><div class="sub">${esc(m.notes||'—')}</div>
        <div class="lab" style="margin:14px 0 6px">Transcript</div><div class="sub">${esc(m.transcript||'—')}</div>
        <div class="lab" style="margin:14px 0 6px">Documents</div>
        ${(m.files||[]).map(f=>`<div class="kv"><span>${esc(f)}</span><b><a href="sample-quotation.pdf" target="_blank">open</a></b></div>`).join('')||'<div class="sub">None</div>'}`
      :``}
    </div>
    <div class="sheet-foot"><a class="btn" href="${m.link}" target="_blank" rel="noopener">Join</a>
      <button class="btn primary" data-act="close">Done</button></div>`);
}


/* ---------- money sheets ---------- */
function salarySheet(id){
  const s=salaries.find(x=>x.id===id); if(!s) return;
  const p=staff.find(x=>x.id===s.person);
  openSheet(sheetHead('Salary · '+esc(p.name),p.role)+`
    <div class="sheet-body">
      <label class="fld">Monthly amount (₹)<input id="salAmt" type="number" value="${s.amount}"></label>
      <label class="fld">Pay on<input id="salDue" type="date" value="${s.due.toISOString().slice(0,10)}"></label>
      <div class="kv"><span>Status</span><b>${s.status}</b></div>
      <div class="kv"><span>Projects</span><b>${projects.filter(x=>x.team.includes(p.id)).length}</b></div>
      
    </div>
    <div class="sheet-foot"><button class="btn" data-act="salary-save" data-id="${s.id}">Save changes</button>
      ${s.status!=='paid'?`<button class="btn primary" data-act="salary-pay" data-id="${s.id}">Pay now</button>`:''}</div>`);
}

function salaryAllSheet(){
  openSheet(sheetHead('All salaries','28 Nov run')+`
    <div class="sheet-body" style="padding:6px 0 8px">
      ${salaries.map(s=>{const p=staff.find(x=>x.id===s.person);
        return `<button class="li" data-act="salary" data-id="${s.id}">
          <span class="li-av" style="background:${p.tint[0]};color:${p.tint[1]}">${p.initials}</span>
          <span class="li-main"><b>${esc(p.name)}</b><i>${p.role} · 28 Nov</i></span>
          <span class="li-amt">${inr(s.amount)}</span>
          <span class="chip ${s.status==='paid'?'ok':'late'}">${s.status}</span></button>`;}).join('')}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

function txSheet(){
  openSheet(sheetHead('New transaction','')+`
    <div class="sheet-body">
      <div class="lab">Payee</div>
      <button class="pickrow" id="txPayee" data-act="pick-payee"><span>Choose a person</span><span class="chev">›</span></button>
      <label class="fld" style="margin-top:12px">Amount (₹)<input id="txAmt" type="number" placeholder="0"></label>
      <label class="fld">Category<select id="txCat">
        <option value="Salary">Salary</option><option value="Expense">Production expense</option>
        <option value="Reimbursement">Reimbursement</option><option value="Vendor">Vendor bill</option>
        <option value="Advance">Advance</option></select></label>
      <label class="fld">Note<input id="txNote" placeholder="What is this for?"></label>
      
    </div>
    <div class="sheet-foot"><button class="btn" data-act="tx-create" data-mode="approve">Send for approval</button>
      <button class="btn primary" data-act="tx-create" data-mode="pay">Pay now</button></div>`);
}

function moreSheet(){
  const acting = md.actingAs;
  openSheet(sheetHead('More','')+`
    <div class="sheet-body" style="padding:14px 16px 4px">
      <div class="me">
        <span class="me-av">AK</span>
        <div class="me-t"><b>Arya Kumar</b><i>Managing director · Homesic</i></div>
        <span class="chip blue">MD</span>
      </div>
      <div class="mgroup">Company</div>
      <div class="mlist">
        <button class="li" data-act="go-tab" data-to="people">
          <span class="li-av" style="background:#E7EAFE;color:#2E4BF2">P</span>
          <span class="li-main"><b>People</b><i>${staff.length} people, roles and workloads</i></span><span class="chev">›</span></button>
        <button class="li" data-act="go-tab" data-to="clients">
          <span class="li-av" style="background:#F1E9FB;color:#5B3E96">C</span>
          <span class="li-main"><b>Clients</b><i>${clientList().length} clients, history and contacts</i></span><span class="chev">›</span></button>
        <button class="li" data-act="go-tab" data-to="activity">
          <span class="li-av" style="background:#E3F5EC;color:#146B49">A</span>
          <span class="li-main"><b>Activity</b><i>Every action, by day and by project</i></span><span class="chev">›</span></button>
      </div>
      <div class="mgroup">System</div>
      <div class="mlist">
        <button class="li" data-act="go-tab" data-to="integrations">
          <span class="li-av" style="background:#FBF0D8;color:#7A510E">K</span>
          <span class="li-main"><b>Connections</b><i>WhatsApp and Google Meet</i></span>
          <span class="chip late">2 off</span></button>
        <button class="li" data-act="go-tab" data-to="settings">
          <span class="li-av" style="background:#F3F4FA;color:#5A5D74">S</span>
          <span class="li-main"><b>Settings</b><i>Stages, splits, voice and rules</i></span><span class="chev">›</span></button>
      </div>
      <div class="mgroup">Account</div>
      <div class="mlist">
        <button class="li" data-act="login-as-sheet">
          <span class="li-av" style="background:#E7EAFE;color:#2E4BF2">⇄</span>
          <span class="li-main"><b>Log in as</b><i>${acting?'Currently acting as '+esc(acting):'Use the app as a teammate'}</i></span><span class="chev">›</span></button>
        <button class="li" data-act="sign-out">
          <span class="li-av" style="background:#FDE9E6;color:#A03427">⏻</span>
          <span class="li-main"><b style="color:var(--coral-ink)">Log out</b><i>End this session</i></span></button>
      </div>
      
    </div>`);
}

/* ---------- thread ---------- */
function threadSheet(p){
  openSheet(`
    <div class="sheet-head"><div><b>${esc(p.name)}</b><i>${esc(p.client)} · WhatsApp group</i></div>
      <button class="btn xs" data-act="open-wa-group" data-id="${p.id}">Open</button>
      <button class="x" data-act="close">✕</button></div>
    <div class="sheet-body" style="padding:0">
      <div class="wrap-msgs">
        ${p.msgs.map(m=>`<div class="bub ${m.role==='client'?'in':'out'}">
          <span class="who">${esc(m.name)}</span><div>${esc(m.text)}</div>
          <span class="tm">${m.at.getHours()}:${String(m.at.getMinutes()).padStart(2,'0')}</span></div>`).join('')}
      </div>
    </div>
    <div class="sheet-foot"><input id="msgIn" class="msgbox" placeholder="Message the group">
      <button class="btn primary" data-act="send" data-id="${p.id}">Send</button></div>`);
}

/* ---------- router ---------- */
function route(r,id){
  if(r==='more') r='home';
  md.tab=r; if(id) md.pid=id;
  location.hash='#/'+r+(id?'/'+id:'');
  render();
}
const SUBTABS=['approvals','comms','projects','home','more'];
function paint(){
  const v=document.getElementById('view'); if(!v) return;
  v.innerHTML = md.tab==='home'?homeView()
    : md.tab==='approvals'?apView()
    : md.tab==='comms'?commsView()
    : md.tab==='projects'?projectsView()
    : md.tab==='project'?projectView()
    : md.tab==='more'?homeView()
    : md.tab==='people'?peopleView()
    : md.tab==='activity'?activityView()
    : md.tab==='settings'?settingsView()
    : md.tab==='integrations'?integrationsView()
    : md.tab==='finance'?financeView()
    : md.tab==='more'?homeView()
    : md.tab==='clients'?clientsView()
    : md.tab==='sales'?salesView()
    : md.tab==='performance'?performanceView()
    : md.tab==='dept'?deptView(md.deptId||'Sales') : homeView();
  const q=document.getElementById('q');
  if(q){ q.oninput=e=>{ md.q=e.target.value; v.innerHTML=projectsView(); const q2=document.getElementById('q'); q2.focus(); q2.setSelectionRange(q2.value.length,q2.value.length); }; }
  const vs=document.getElementById('voiceSel');
  if(vs){ vs.innerHTML=voices.filter(x=>/^en|^hi/i.test(x.lang)).map(x=>`<option value="${esc(x.name)}" ${chosen&&chosen.name===x.name?'selected':''}>${esc(x.name)} (${x.lang})</option>`).join('');
    vs.onchange=()=>{ chosen=voices.find(x=>x.name===vs.value)||chosen; toast('Voice: '+chosen.name); }; }
  window.scrollTo(0,0);
  const RAF = (typeof requestAnimationFrame==='function')?requestAnimationFrame:(f=>setTimeout(f,16));
  RAF(()=>{ document.querySelectorAll('.ring circle[data-off]').forEach(c=>{ c.style.strokeDashoffset=c.dataset.off; }); });
}
function render(){ document.getElementById('app').innerHTML=shell(); paint(); }

function openStateSheet(st){
  const label={proof:'In review',overdue:'Overdue',due:'Due',paid:'Received'}[st];
  const rows=[]; projects.forEach(p=>p.payments.forEach(x=>{ if(x.status===st) rows.push({p,x}); }));
  openSheet(sheetHead(label, rows.length+' payments')+`
    <div class="sheet-body" style="padding:6px 0 8px">
      ${rows.slice(0,40).map(payRow).join('')||'<div class="empty-row">Nothing here</div>'}
    </div>
    <div class="sheet-foot"><button class="btn primary" data-act="close">Done</button></div>`);
}

/* ---------- design approval ---------- */
function designSheet(a){
  const p=projects.find(x=>x.id===a.projectId);
  openSheet(sheetHead('Design approval',esc(p?p.name:'')+' · '+esc(a.sub))+`
    <div class="sheet-body">
      ${docPaper('Kitchen elevation v3','Render · '+fmtDate(new Date(TODAY)))}
      <div class="sub center">Here will be the PDF, sent to the client on WhatsApp</div>
      <div class="kv"><span>Waiting</span><b>${a.ageH}h</b></div>
    </div>
    <div class="sheet-foot"><button class="btn danger" data-act="reject-approval" data-id="${a.id}">Reject</button>
      <button class="btn primary" data-act="approve-approval" data-id="${a.id}">Approve &amp; send</button></div>`);
}

/* ---------- speech ---------- */
let voices=[], chosen=null, speaking=false;
if('speechSynthesis' in window){
  const load=()=>{ voices=speechSynthesis.getVoices()||[]; if(!chosen) chosen=bestVoice(); };
  load(); speechSynthesis.onvoiceschanged=load;
}
function bestVoice(){
  const en=voices.filter(v=>/^en/i.test(v.lang));
  const inIN=en.filter(v=>/en[-_]IN/i.test(v.lang));
  const fem=/(heera|veena|kalpana|neerja|aditi|swara|priya)/i;
  return inIN.find(v=>fem.test(v.name))||inIN[0]||en.find(v=>fem.test(v.name))||en[0]||voices[0]||null;
}
function speechText(t){
  return t.replace(/₹\s?([\d.,]+)\s?Cr\b/gi,'$1 crore rupees').replace(/₹\s?([\d.,]+)\s?L\b/gi,'$1 lakh rupees')
    .replace(/₹\s?([\d,]+)/g,'$1 rupees').replace(/·/g,', ').replace(/\s+/g,' ').trim();
}
function listen(){
  if(!('speechSynthesis' in window)){ toast('No voice on this device'); return; }
  const label=document.getElementById('listenLabel');
  if(speaking){ speechSynthesis.cancel(); speaking=false; if(label) label.textContent='Listen'; return; }
  const raw=(document.getElementById('briefText')?.textContent||'').trim(); if(!raw) return;
  const u=new SpeechSynthesisUtterance(speechText(raw));
  if(!chosen){ voices=speechSynthesis.getVoices()||[]; chosen=bestVoice(); }
  if(chosen){ u.voice=chosen; u.lang=chosen.lang; } else u.lang='en-IN';
  u.rate=.96; u.pitch=1.03;
  u.onend=()=>{ speaking=false; if(label) label.textContent='Listen'; };
  speaking=true; if(label) label.textContent='Stop';
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
function qrSVG(text){
  const n=25, cell=5.4; let h=2166136261;
  for(const c of text){ h^=c.charCodeAt(0); h=Math.imul(h,16777619)>>>0; }
  const inF=(x,y)=>(x<8&&y<8)||(x>=n-8&&y<8)||(x<8&&y>=n-8);
  const finder=(ox,oy)=>`<rect x="${ox*cell}" y="${oy*cell}" width="${7*cell}" height="${7*cell}" fill="none" stroke="#15162B" stroke-width="${cell}"/><rect x="${(ox+2)*cell}" y="${(oy+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#15162B"/>`;
  let cells='';
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){ if(inF(x,y)) continue; h=(Math.imul(h,1103515245)+12345)>>>0; if((h>>>16)&1) cells+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#15162B"/>`; }
  const s=n*cell;
  return `<svg class="qr" viewBox="0 0 ${s} ${s}" width="132" height="132"><rect width="${s}" height="${s}" fill="#fff"/>${cells}${finder(0,0)}${finder(n-7,0)}${finder(0,n-7)}</svg>`;
}

/* ---------- team edits ---------- */
function recomputeWip(){ staff.forEach(s=>{ s.wip=projects.filter(p=>p.team.includes(s.id)).length; }); }
function addTeam(pid,ids){
  const p=projects.find(x=>x.id===pid);
  ids.forEach(id=>{ if(!p.team.includes(id)) p.team.push(id); });
  recomputeWip(); render();
  const names=ids.map(id=>(staff.find(s=>s.id===id)||{}).name).filter(Boolean);
  toast(names.length?names.join(', ')+' added to the team':'No one added');
}

/* ---------- message send ---------- */
function sendMessage(pid){
  const p=projects.find(x=>x.id===pid);
  const el=document.getElementById('msgIn'); const text=(el&&el.value||'').trim();
  if(!text){ toast('Type a message first'); return; }
  p.msgs.push({ id:p.id+'-M'+p.msgs.length, role:'me', name:'Arya Kumar', text, at:new Date(), tag:false, projectId:p.id });
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(), who:'Arya Kumar', initials:'AK', tint:MD.tint,
    kind:'Message', text:'messaged '+p.name });
  threadSheet(p);
  toast('Message queued · connect WhatsApp to deliver');
}

/* ---------- meeting create ---------- */
function createMeeting(){
  const d=md.meetingDraft;
  const title=(document.getElementById('mTitle')||{}).value||d.title||'Meeting';
  const date=new Date((document.getElementById('mDate')||{}).value||d.date);
  const hour=Number((document.getElementById('mTime')||{}).value||10);
  const minute=Number((document.getElementById('mMin')||{}).value||0);
  const ampm=(document.getElementById('mAmPm')||{}).value||'AM';
  const agenda=(document.getElementById('mAgenda')||{}).value||'';
  const h24=(hour%12)+(ampm==='PM'?12:0);
  const p=d.projectId?projects.find(x=>x.id===d.projectId):null;
  const m={
    id:'MTG-'+Date.now().toString(36), title, projectId:d.projectId, projectName:p?p.name:'',
    client:d.client||'', date, hour:h24, minute, duration:45, agenda,
    link:'https://meet.google.com/'+meetCode(title+date.toISOString()),
    participants:d.participants.map(id=>({id,rsvp:'pending'})), past:false, notes:'', transcript:'', files:[]
  };
  meetings.push(m);
  activity.unshift({ id:'LOG-'+String(activity.length+1).padStart(3,'0'), at:new Date(), who:'Arya Kumar', initials:'AK', tint:MD.tint,
    kind:'Meeting', text:'scheduled '+title+' with '+m.participants.length+' people' });
  closeSheet(); render(); meetingSheet(m.id);
  toast('Meeting created · invites queued for '+m.participants.length+' people');
}

/* ---------- actions ---------- */
document.addEventListener('click', e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const a=el.dataset.act, id=el.dataset.id, v=el.dataset.v;
  const stop=()=>{ e.preventDefault(); };

  if(a==='go-tab'){ stop(); closeSheet(); route(el.dataset.to); return; }
  if(a==='back'){ stop(); const map={project:'projects',people:'home',activity:'home',settings:'home',integrations:'home',finance:'home',more:'home',dept:'performance',clients:'home',sales:'performance'};
    route(map[md.tab]||'home'); return; }
  if(a==='close'){ stop(); closeSheet(); return; }
  if(a==='state'){ stop(); openStateSheet(v); return; }
  if(a==='comm-tab'){ stop(); md.commTab=v; paint(); return; }
  if(a==='acc'){ stop(); md.apOpen[el.dataset.k]=!md.apOpen[el.dataset.k]; paint(); return; }
  if(a==='stage'){ stop(); md.stage=v; paint(); return; }
  if(a==='tags'){ stop(); md.tagOnly=!md.tagOnly; paint(); return; }
  if(a==='project'){ stop(); route('project',id); return; }
  if(a==='all-meetings'){ stop(); md.commTab='Meetings'; route('comms'); return; }

  if(a==='approval'){
    stop(); const ap=approvals.find(x=>x.id===id); if(!ap) return;
    if(ap.status==='approved'||ap.status==='rejected'){ toast('Already '+ap.status); return; }
    if(ap.type==='Payment') return reviewSheet(ap.payId);
    if(ap.type==='Design') return designSheet(ap);
    if(ap.type==='Leave') return leaveSheet(ap.id);
    return paySheet(ap.id);
  }
  if(a==='review'){ stop(); reviewSheet(id); return; }
  if(a==='review-confirm'){ stop(); settlePayment(id); closeSheet(); toast('Payment confirmed · receipt sent'); return; }
  if(a==='review-reject'){ stop(); closeSheet(); toast('Rejection sent back with a reason'); return; }

  if(a==='approve-approval'){
    const ap=approvals.find(x=>x.id===id); ap.status='approved'; closeSheet(); render(); toast('Approved and sent to the client'); return; }
  if(a==='reject-approval'){
    const ap=approvals.find(x=>x.id===id); ap.status='rejected'; closeSheet(); render(); toast('Rejected · the design partner is told why'); return; }

  if(a==='pay-confirm'){
    const ap=approvals.find(x=>x.id===id); ap.status='approved'; ap.paid=true;
    outGo.unshift({title:ap.title, amount:ap.amount||0, to:(ap.person?staff.find(s=>s.id===ap.person)?.name:'Vendor'), at:new Date(TODAY)});
    closeSheet(); render(); toast('Paid · receipt saved'); return; }

  if(a==='leave-confirm'){
    const ap=approvals.find(x=>x.id===id); ap.status='approved';
    const person=ap.person?staff.find(s=>s.id===ap.person):null;
    const rows=[...document.querySelectorAll('#coverRows .cover')].map(r=>({person:r.querySelector('.cover-person').value,
      from:r.querySelector('.cover-from').value, until:r.querySelector('.cover-until').value}));
    if(person) person.leave+=3;
    rows.forEach(r=>projects.filter(p=>p.team.includes(r.person)).slice(0,3).forEach(p=>{p.cover=r.person;}));
    closeSheet(); render(); toast('Leave approved · '+rows.length+' cover'+(rows.length>1?'s':'')); return; }
  if(a==='add-cover'){
    const host=document.getElementById('coverRows');
    const div=document.createElement('div'); div.className='cover';
    div.innerHTML=`<select class="cover-person">${staff.filter(s=>s.role!=='Managing Director').map(s=>`<option value="${s.id}">${s.name} · ${s.role}</option>`).join('')}</select>
      <select class="cover-scope"><option>All their projects</option><option>Selected only</option><option>Tasks only</option></select>
      <div class="two"><label>From<input class="cover-from" type="date" value="${new Date(TODAY.getTime()+2*86400000).toISOString().slice(0,10)}"></label>
        <label>Until<input class="cover-until" type="date" value="${new Date(TODAY.getTime()+5*86400000).toISOString().slice(0,10)}"></label></div>`;
    host.appendChild(div); return; }

  if(a==='doc'){ stop(); docSheet(el.dataset.name); return; }
  if(a==='edit'){ stop(); editSheet(id); return; }
  if(a==='save'){
    const p=projects.find(x=>x.id===id);
    p.name=document.getElementById('epName').value||p.name;
    p.value=Number(document.getElementById('epValue').value)||p.value;
    p.stage=Number(document.getElementById('epStage').value);
    p.payments.forEach(x=>x.amount=Math.round(p.value*x.pct/100));
    closeSheet(); render(); toast('Project updated'); return; }
  if(a==='pause'){ const p=projects.find(x=>x.id===id); p.status=p.status==='Paused'?'On track':'Paused'; render(); toast('Project '+p.status.toLowerCase()); return; }
  if(a==='close-proj'){ const p=projects.find(x=>x.id===id); p.stage=3; p.status='Closed'; route('projects'); toast(p.name+' closed'); return; }

  if(a==='team'){ stop(); teamSheet(id); return; }
  if(a==='team-remove'){
    const p=projects.find(x=>x.id===id); p.team=p.team.filter(t=>t!==el.dataset.who); recomputeWip(); teamSheet(id); toast('Removed from the team'); return; }
  if(a==='team-add'){ stop(); pickMany('Add team members', staff.filter(s=>!projects.find(x=>x.id===id).team.includes(s.id)), [], ids=>{
      addTeam(id, ids); teamSheet(id); }); return; }
  if(a==='team-replace'){ stop(); pickOne('Replace with', staff.filter(s=>!projects.find(x=>x.id===id).team.includes(s.id)&&s.id!==el.dataset.who), null, who=>{
      const p=projects.find(x=>x.id===id); const at=p.team.indexOf(el.dataset.who); if(at>=0) p.team[at]=who;
      recomputeWip(); render(); teamSheet(id); toast('Team member replaced'); }); return; }
  if(a==='pick-one'){ stop(); const cb=pickCb; closeSheet(); if(cb) cb(id); return; }
  if(a==='pick-toggle'){
    if(pickSet.has(id)) pickSet.delete(id); else pickSet.add(id);
    el.querySelector('.tick').classList.toggle('on', pickSet.has(id));
    const btn=document.querySelector('[data-act="pick-done"]'); if(btn) btn.textContent='Done ('+pickSet.size+')';
    return; }
  if(a==='pick-done'){ const cb=pickCb, ids=[...pickSet]; closeSheet(); if(cb) cb(ids); return; }

  if(a==='pick-client'){
    const clients=[...new Set(projects.map(p=>p.client))].map((c,i)=>({id:c,name:c,role:'Client',initials:c.slice(0,2).toUpperCase(),tint:['#E3F5EC','#146B49']}));
    pickOne('Choose a client', clients, md.meetingDraft.client, c=>{ md.meetingDraft.client=c; newMeetingSheet(md.meetingDraft.projectId); return; });
    return; }
  if(a==='clear-client'){ md.meetingDraft.client=''; newMeetingSheet(md.meetingDraft.projectId); return; }
  if(a==='pick-people'){
    pickMany('Add participants', staff, md.meetingDraft.participants, ids=>{ md.meetingDraft.participants=ids; newMeetingSheet(md.meetingDraft.projectId); });
    return; }
  if(a==='unpart'){ md.meetingDraft.participants=md.meetingDraft.participants.filter(x=>x!==id); newMeetingSheet(md.meetingDraft.projectId); return; }

  if(a==='new-meeting'){ stop(); newMeetingSheet(el.dataset.project||null); return; }
  if(a==='create-meeting'){ stop(); createMeeting(); return; }
  if(a==='meeting'){ stop(); meetingSheet(id); return; }
  if(a==='rsvp'){ const m=meetings.find(x=>x.id===id); const pr=m.participants.find(x=>x.id===el.dataset.who); pr.rsvp=el.dataset.v;
    meetingSheet(id); return; }

  if(a==='more-sheet'){ stop(); moreSheet(); return; }
  if(a==='salary'){ stop(); salarySheet(id); return; }
  if(a==='salary-all'){ stop(); salaryAllSheet(); return; }
  if(a==='salary-save'){
    const sal=salaries.find(x=>x.id===id);
    sal.amount=Number(document.getElementById('salAmt').value)||sal.amount;
    sal.due=new Date(document.getElementById('salDue').value||sal.due);
    closeSheet(); render(); toast('Salary updated'); return; }
  if(a==='salary-pay'){
    const sal=salaries.find(x=>x.id===id); const p=staff.find(x=>x.id===sal.person);
    payFlow('Salary · '+p.name, p.name, sal.amount, sal.id, ()=>{
      sal.status='paid';
      outGo.unshift({title:'Salary · '+p.name, amount:sal.amount, to:p.name, at:new Date(TODAY)});
      render(); toast('Salary paid · screenshot filed');
    });
    return; }
  if(a==='payflow-done'){
    const fn=window.__payDone; closeSheet(); if(fn) fn(); return; }
  if(a==='list'){
    stop();
    const k=el.dataset.k||'';
    if(k.startsWith('ps-')){ md.deptId=k==='ps-sales'?'Sales':k==='ps-design'?'Design':k==='ps-marketing'?'Marketing':'Production'; route('dept'); return; }
    listSheet(k, el.dataset.t); return;
  }
  if(a==='new-tx'){ stop(); txSheet(); return; }
  if(a==='pick-payee'){ pickOne('Choose a payee', staff, null, who=>{ md.txPayee=who;
      txSheet(); const el=document.getElementById('txPayee');
      const p=staff.find(x=>x.id===who); if(el) el.firstElementChild.textContent=p.name; }); return; }
  if(a==='tx-create'){
    const payee=document.getElementById('txPayee');
    const who=md.txPayee;
    const amount=Number(document.getElementById('txAmt').value)||0;
    const cat=document.getElementById('txCat').value;
    const note=document.getElementById('txNote').value||cat;
    if(!who||!amount){ toast('Pick a person and an amount'); return; }
    const person=staff.find(x=>x.id===who);
    if(el.dataset.mode==='pay'){
      outGo.unshift({title:cat+' · '+note, amount, to:person.name, at:new Date(TODAY)});
      closeSheet(); render(); toast('Paid '+inr(amount)+' to '+person.name);
    } else {
      approvals.push({ id:'APR-T'+Date.now().toString(36), type:cat==='Salary'?'Salary':cat==='Reimbursement'?'Reimbursement':'Expense',
        title:cat+' · '+note, sub:person.name, amount, ageH:0, person:who, status:'pending' });
      closeSheet(); route('approvals'); toast('Sent for approval');
    }
    return; }
  if(a==='dept'){ stop(); md.dept=v; paint(); return; }
  if(a==='dept-page'){ stop(); md.deptId=el.dataset.v; route('dept'); return; }
  if(a==='cal-clear'){ stop(); md.actDay=null; paint(); return; }
  if(a==='cal-day'){ stop(); md.actDay=v; route('activity'); return; }
  if(a==='activity'){ stop(); activitySheet(id); return; }
  if(a==='act-project'){
    stop();
    const names=[...new Set(projects.slice(0,12).map(p=>p.name))];
    pickOne('Filter by project', names.map(n=>({id:n,name:n,role:'Project',initials:n.slice(0,2).toUpperCase(),tint:['#E7EAFE','#2E4BF2']})), md.actProject,
      v=>{ md.actProject=v; route('activity'); });
    return; }
  if(a==='act-person'){
    stop();
    pickOne('Filter by person', staff, null, v=>{ md.actPerson=(staff.find(s=>s.id===v)||{}).name; route('activity'); });
    return; }
  if(a==='act-clear'){ md.actProject=null; md.actPerson=null; paint(); return; }
  if(a==='client'){ stop(); clientSheet(el.dataset.id); return; }
  if(a==='money-project'){ stop(); moneyProjectSheet(id); return; }
  if(a==='period'){ stop(); periodSheet(el.dataset.v, el.dataset.kind||'Week'); return; }
  if(a==='movement'){ stop(); movementSheet(); return; }
  if(a==='login-as-sheet'){ stop(); loginAsSheet(); return; }
  if(a==='login-as'){
    const s2=staff.find(x=>x.id===id); md.actingAs=s2.name; closeSheet(); render();
    toast('Now viewing as '+s2.name); return; }
  if(a==='sign-out'){ md.actingAs=null; closeSheet(); render(); toast('Signed out'); return; }
  if(a==='project-activity'){ stop();
    const p=projects.find(x=>x.id===id); md.actProject=p.name; md.actPerson=null; route('activity'); return; }
  if(a==='files'){ stop(); filesSheet(id, el.dataset.set||null); return; }
  if(a==='file'){ stop(); fileSheet(id); return; }
  if(a==='size'){ stop(); md.msgSize=v; paint(); return; }
  if(a==='thread'){ stop(); threadSheet(projects.find(p=>p.id===id)); return; }
  if(a==='send'){ stop(); sendMessage(id); return; }
  if(a==='open-wa'){ toast('Opening WhatsApp…'); window.open('https://web.whatsapp.com','_blank'); return; }
  if(a==='open-wa-group'){ toast('Opening the project group in WhatsApp…'); window.open('https://web.whatsapp.com','_blank'); return; }

  if(a==='person'){ stop(); personSheet(id); return; }
  if(a==='hibernate'){ const s=staff.find(x=>x.id===id); s.status=s.status==='Active'?'Hibernated':'Active'; closeSheet(); render(); toast(s.name+' · '+s.status); return; }
  if(a==='message'){ toast('WhatsApp draft opened'); return; }
  if(a==='upload'){ const d=document.getElementById('drop'); d.classList.add('has'); d.innerHTML='✓ screenshot attached'; return; }
  if(a==='listen'){ listen(); return; }
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeSheet(); });

/* ---------- boot ---------- */
(function(){
  const seg=(location.hash||'#/home').replace(/^#\//,'').split('/');
  md.tab=(seg[0]==='more'?'home':seg[0])||'home'; if(seg[1]) md.pid=seg[1];
  render();
  const params=new URLSearchParams(location.search);
  if(params.get('selftest')) return selfTest();
  const demo=params.get('demo');
  if(!demo) return;
  setTimeout(()=>{
    if(demo==='meeting') newMeetingSheet(projects[0].id);
    else if(demo==='meeting-detail') meetingSheet(upMeetings()[0].id);
    else if(demo==='thread') threadSheet(projects[0]);
    else if(demo==='team') teamSheet(projects[0].id);
    else if(demo==='more'){ render(); moreSheet(); }
    else if(demo==='list'){ md.tab='approvals'; render(); listSheet('client','Client approvals'); }
    else if(demo==='files'){ md.tab='project'; md.pid=projects[0].id; render(); filesSheet(projects[0].id,'all'); }
    else if(demo==='file'){ md.tab='project'; md.pid=projects[0].id; render(); fileSheet(projects[0].files[0].id); }
    else if(demo==='salary'){ md.tab='finance'; render(); salarySheet(salaries[0].id); }
    else if(demo==='tx'){ md.tab='finance'; render(); txSheet(); }
    else if(demo==='past'){ md.tab='projects'; md.stage='Past'; render(); }
    else if(demo==='comms'){ md.tab='comms'; render(); }
    else if(demo==='approvals'){ md.tab='approvals'; md.apOpen={c1:true,c2:true}; render(); }
    else if(demo==='payments'){ md.tab='approvals'; md.apTab='Payments'; md.apOpen={r0:true}; render(); }
    else if(demo==='integr'){ md.tab='integrations'; render(); }
  },180);
})();

/* ---------- self test ---------- */
function selfTest(){
  const out=[]; const ck=(n,c)=>out.push([n,!!c]);

  const p=projects[0];
  const before=p.team.length;
  const outsider=staff.find(s=>!p.team.includes(s.id));
  addTeam(p.id,[outsider.id]);
  ck('a member can be added to the team', p.team.includes(outsider.id) && p.team.length===before+1);
  ck('employee assignment follows the team', outsider.wip===projects.filter(x=>x.team.includes(outsider.id)).length);
  p.team=p.team.filter(t=>t!==outsider.id); recomputeWip();
  ck('a member can be removed', !p.team.includes(outsider.id));

  const mBefore=meetings.length;
  md.meetingDraft={projectId:p.id, client:p.client, participants:p.team.slice(0,2), date:new Date(TODAY.getTime()+3*86400000).toISOString().slice(0,10),
    hour:10, minute:0, ampm:'AM', agenda:'test', title:'Test meeting'};
  newMeetingSheet(p.id);
  document.getElementById('mTitle').value='Test meeting';
  document.getElementById('mAgenda').value='Agenda for the test';
  createMeeting();
  ck('a meeting can be created', meetings.length===mBefore+1);
  const created=meetings[meetings.length-1];
  ck('the meeting gets a Meet link', /meet\.google\.com/.test(created.link));
  ck('participants start as pending', created.participants.every(x=>x.rsvp==='pending'));
  created.participants[0].rsvp='accepted';
  ck('a response updates the count', (rsvpCount(created).accepted||0)===1);
  ck('the meeting is tied to its project', created.projectId===p.id);
  closeSheet();

  const msgCount=p.msgs.length;
  p.msgs.push({id:'x',role:'me',name:'Arya Kumar',text:'hello',at:new Date(),tag:false,projectId:p.id});
  ck('messages append to the project thread', p.msgs.length===msgCount+1);
  ck('a project only sees its own thread', projects.every(x=>x.msgs.every(m=>!m.projectId||m.projectId===x.id)));

  ck('meetings are scoped to their project', meetingsOf(p).every(m=>m.projectId===p.id));
  ck('approvals split into client, internal and leave',
    ['Payment','Design'].some(t=>pendingApprovals().some(a=>a.type===t)) &&
    ['Expense','Salary','Reimbursement'].some(t=>pendingApprovals().some(a=>a.type===t)) &&
    pendingApprovals().some(a=>a.type==='Leave'));
  ck('payments keep their four states',
    projects.some(x=>x.payments.some(y=>y.status==='paid')) && projects.some(x=>x.payments.some(y=>y.status==='overdue')));

  const pass=out.filter(x=>x[1]).length;
  document.getElementById('view').innerHTML=`<div class="card">
    <div class="spread"><b>Mobile self test</b><span class="chip ${pass===out.length?'ok':'now'}">${pass}/${out.length}</span></div>
    ${out.map(([n,c])=>`<div class="kv"><span>${n}</span><b style="color:${c?'#146B49':'#A03427'}">${c?'pass':'fail'}</b></div>`).join('')}</div>`;
}
