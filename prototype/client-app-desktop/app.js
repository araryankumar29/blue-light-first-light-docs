/* First Light · client desktop prototype. Same client model and flows as the mobile build. */

const app = document.getElementById('app');

const state = {
  auth:false, route:'home', signStep:'mobile', phone:CLIENT.phone, otp:'123456',
  terms:false, termsAt:null, email:'', emailAsked:false,
  proof:'none', proofReason:'', proofAmt:'', proofUrl:'',
  designV:5, designCat:'All', docV:5, itemId:null,
  joined:false, thread:'studio', msgs:MSGS.map(m=>({...m})),
  catQ:'', catFilter:'all', change:null
};

const NAV = [
  ['home','Home','M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z'],
  ['project','Project','M3.5 3.5h17v17h-17zM3.5 9.5h17M9.5 9.5v11'],
  ['designs','Designs','M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M14 5l6 0 0 6'],
  ['payments','Payments','M3 5.5h18v13H3zM3 10.5h18'],
  ['meetings','Meetings','M4 5.5h16v14H4zM8 3v5M16 3v5M4 10h16'],
  ['messages','Messages','M4 5.5h16v11H9l-5 4zM8 9.5h8M8 12.5h5'],
  ['catalogue','Catalogue','M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z'],
  ['settings','Settings','M4 7h9M17 7h3M4 12h3M11 12h9M4 17h9M17 17h3']
];

function art(kind,fit){
  const wall='#EEEFF5', floor='#D7D8E2', sofa='#2E4BF2', rug='#B9B3F2', plant='#1F9D6B', lamp='#C98A14';
  const win=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#DCE6FB"/><path d="M${x} ${y+h*.7} Q${x+w*.4} ${y+h*.5} ${x+w} ${y+h*.75} L${x+w} ${y+h} L${x} ${y+h} Z" fill="#B9B3F2"/><circle cx="${x+w*.75}" cy="${y+h*.3}" r="${h*.1}" fill="#FBF0D8"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="none" stroke="#FFF" stroke-width="5"/>`;
  const plantSvg=(x,y)=>`<rect x="${x-12}" y="${y-18}" width="24" height="22" rx="6" fill="#F26A5B"/><ellipse cx="${x-14}" cy="${y-40}" rx="12" ry="20" fill="${plant}" transform="rotate(-20 ${x-14} ${y-40})"/><ellipse cx="${x+12}" cy="${y-44}" rx="12" ry="22" fill="#1F9D6B" transform="rotate(18 ${x+12} ${y-44})"/><ellipse cx="${x}" cy="${y-58}" rx="10" ry="18" fill="${plant}"/>`;
  let s='';
  if(kind==='kitchen'){
    s=`<rect width="400" height="260" fill="${wall}"/>`;
    for(let i=0;i<8;i++)for(let j=0;j<3;j++) s+=`<rect x="${i*50}" y="${40+j*14}" width="50" height="14" fill="#F7F8FC" stroke="#E6E7F0"/>`;
    s+=win(250,28,110,70)+`<rect x="28" y="36" width="170" height="78" rx="10" fill="#FFF"/><rect x="28" y="36" width="170" height="78" rx="10" fill="none" stroke="#2E4BF2" stroke-width="2"/><path d="M113 36 V114" stroke="#2E4BF2" stroke-width="2"/><circle cx="106" cy="76" r="3" fill="#2E4BF2"/><circle cx="120" cy="76" r="3" fill="#2E4BF2"/>`;
    s+=`<rect y="150" width="400" height="110" fill="${floor}"/><rect x="20" y="150" width="360" height="12" rx="4" fill="#2E4BF2"/>`;
    s+=`<rect x="28" y="162" width="150" height="90" rx="6" fill="#2E4BF2"/><rect x="190" y="162" width="200" height="90" rx="6" fill="#FFF" stroke="#2E4BF2" stroke-width="2"/><path d="M290 162 V252" stroke="#2E4BF2" stroke-width="2"/>`;
    s+=`<circle cx="120" cy="196" r="3" fill="#C98A14"/><circle cx="260" cy="200" r="3" fill="#C98A14"/>`;
  } else if(kind==='bedroom'){
    s=`<rect width="400" height="260" fill="#E7EAFE"/><rect y="170" width="400" height="90" fill="#D7D8E2"/>`;
    s+=win(262,30,96,96)+`<path d="M255 24 Q262 60 255 130" stroke="#2E4BF2" stroke-width="8" fill="none"/><path d="M364 24 Q357 60 364 130" stroke="#2E4BF2" stroke-width="8" fill="none"/>`;
    s+=`<rect x="30" y="112" width="200" height="22" rx="10" fill="#B9B3F2"/><rect x="36" y="134" width="188" height="48" rx="10" fill="#FFF"/><rect x="30" y="140" width="200" height="60" rx="12" fill="#2E4BF2"/>`;
    s+=`<rect x="46" y="120" width="60" height="22" rx="10" fill="#FBF0D8"/><rect x="118" y="120" width="60" height="22" rx="10" fill="#FBF0D8"/>`;
    s+=`<rect x="240" y="170" width="60" height="6" rx="3" fill="#B9B3F2"/><rect x="250" y="150" width="40" height="22" rx="6" fill="#C98A14"/>`;
    s+=plantSvg(360,200)+`<rect x="16" y="200" width="46" height="60" rx="6" fill="#B9B3F2" opacity=".7"/>`;
  } else if(kind==='plan'){
    s=`<rect width="400" height="260" fill="#FBF0D8"/><path d="M50 40 H350 V220 H50 Z M50 140 H200 M200 40 V140 M200 140 V220 M270 140 V220" fill="none" stroke="#2E4BF2" stroke-width="6" stroke-linejoin="round"/><rect x="60" y="50" width="130" height="80" fill="#B9B3F2" opacity=".6"/><circle cx="300" cy="90" r="22" fill="#2E4BF2" opacity=".7"/>`;
  } else {
    s=`<rect width="400" height="260" fill="${wall}"/>`;
    s+=win(40,30,120,96)+`<path d="M100 30 V126 M40 78 H160" stroke="#FFF" stroke-width="4"/>`;
    s+=`<rect x="210" y="46" width="64" height="48" rx="4" fill="#2E4BF2"/><rect x="216" y="52" width="52" height="36" rx="2" fill="#C98A14"/><circle cx="242" cy="70" r="8" fill="#B9B3F2" opacity=".8"/>`;
    s+=`<rect y="170" width="400" height="90" fill="${floor}"/><ellipse cx="200" cy="232" rx="150" ry="20" fill="${rug}"/>`;
    s+=`<rect x="70" y="128" width="200" height="60" rx="18" fill="${sofa}"/><rect x="60" y="150" width="220" height="44" rx="14" fill="#F26A5B"/>`;
    s+=`<rect x="84" y="112" width="48" height="36" rx="12" fill="${lamp}"/><rect x="200" y="112" width="48" height="36" rx="12" fill="#B9B3F2"/>`;
    s+=`<rect x="300" y="110" width="8" height="78" rx="3" fill="#2E4BF2"/><path d="M286 110 Q304 92 322 110 Z" fill="${lamp}"/>`;
    s+=plantSvg(360,184);
  }
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="${fit==='meet'?'xMidYMid meet':'xMidYMid slice'}" aria-hidden="true">${s}</svg>`;
}

function visual(img,kind,alt=''){ return img?`<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy">`:art(kind); }
function chip(t,cls=''){ return `<span class="chip ${cls}">${t}</span>`; }
function statusChip(status){
  const map={'paid':'ok','due':'late','later':'mut','done':'ok','now':'blue','next':'mut','approved':'ok'};
  return chip(status,map[status]||'mut');
}
function nowLabel(){ return new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'})+' · '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}); }
function toast(msg){
  const t=document.createElement('div'); t.className='toast';
  t.innerHTML=`<span class="tick">✓</span>${esc(msg)}`;
  document.getElementById('toasts').appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),320); },2400);
}
function openModal(html,cls=''){ const m=document.getElementById('modal'); m.className='modal '+(cls||''); m.innerHTML=html; m.classList.add('on'); document.getElementById('overlay').classList.add('on'); }
function closeModal(){ const m=document.getElementById('modal'); if(m){ m.classList.remove('on'); m.className='modal'; } document.getElementById('overlay')?.classList.remove('on'); }
function openDoc(html){ openModal(html,'wide'); }

/* ================= auth ================= */
function authHTML(){
  const step=state.signStep;
  let body='';
  if(step==='mobile'){
    body=`<div class="field"><label>Mobile number</label><input id="auth-phone" type="tel" value="${esc(state.phone)}" autocomplete="tel"></div>
      <p class="hint">Use the number on your enquiry. Demo number: ${esc(CLIENT.phone)}. Change it to see the mismatch state.</p>
      <label class="check"><input type="checkbox" id="auth-terms" ${state.terms?'checked':''}> <span>I agree to the <a href="#" data-act="terms">Terms and Conditions</a> (version 1).</span></label>
      <button class="btn primary" style="width:100%;margin-top:12px" data-act="send-code">Send code</button>
      <p class="hint" style="margin-top:10px">Google sign-in is optional. The mobile number and code are still required.</p>`;
  } else if(step==='otp'){
    body=`<p class="hint">Demo code sent to ${esc(state.phone)}. No SMS or WhatsApp message is sent.</p>
      <div class="field"><label>Six-digit code</label><input id="auth-otp" type="text" inputmode="numeric" maxlength="6" value="${esc(state.otp)}" style="letter-spacing:.3em;font-size:18px"></div>
      <button class="btn primary" style="width:100%;margin-top:12px" data-act="verify">Verify and continue</button>
      <div class="row" style="margin-top:10px"><button class="btn sm" data-act="change-number">Change number</button><button class="btn sm" data-act="resend">Resend code</button></div>`;
  } else {
    body=`<p class="hint">Add an email for receipts and documents. It is optional, and you can skip it.</p>
      <div class="field"><label>Email</label><input id="auth-email" type="email" value="${esc(state.email)}" placeholder="you@example.com"></div>
      <button class="btn primary" style="width:100%;margin-top:12px" data-act="save-email">Save and continue</button>
      <button class="btn" style="width:100%;margin-top:8px" data-act="skip-email">Skip for now</button>`;
  }
  return `<div class="auth">
    <aside class="auth-art">
      <div class="logo-lg">H</div>
      <div class="auth-kicker">HOMESIC · Client portal</div>
      <h1>Your home, designed and built without the running around.</h1>
      <p>One calm place for the design, the quotation, payments and the dates that matter. Your project is already in motion.</p>
      <div class="auth-project"><span class="lab">Your project</span><b>Villa 4B · Ms. Rao</b><span>Design · 9 days left · On track</span></div>
      <div class="auth-foot">Prototype · nothing is sent or stored outside this page.</div>
    </aside>
    <main class="auth-main">
      <div class="auth-brand"><span class="mark">H</span><b>HOMESIC</b><span class="auth-signin">Sign in</span></div>
      <h2>Welcome back.</h2>
      <p class="auth-sub">Clients sign in with the mobile number on their enquiry. Your studio team uses company email.</p>
      <div class="card auth-card">${body}</div>
      <p class="hint auth-note">The portal is optional. Your project runs through WhatsApp and your design partner without it.</p>
    </main>
    <div class="overlay" id="overlay" data-act="close-modal"></div>
    <div class="modal" id="modal"></div>
    <div class="toasts" id="toasts"></div>
  </div>`;
}

function renderAuth(){ app.className='app auth-mode'; app.innerHTML=authHTML(); }

function finishAuth(){
  state.auth=true; state.termsAt=nowLabel(); state.signStep='mobile'; state.route='home';
  toast('Signed in'); render();
}

/* ================= shell ================= */
function navIcon(route,label,path){
  const on=state.route===route || (route==='settings' && ['settings','warranty','terms'].includes(state.route));
  return `<a href="#" class="navitem ${on?'on':''}" data-act="route" data-to="${route}" title="${label}">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg><span class="lbl">${label}</span></a>`;
}
function shell(){
  const due=owedNow();
  return `<aside class="rail">
    <div class="logo">H</div>
    <nav class="nav">${NAV.map(([r,l,p])=>navIcon(r,l,p)).join('')}</nav>
    <div class="spacer"></div>
    <div class="me" title="Ms. Rao">M</div>
  </aside>
  <div class="main">
    <header class="topbar">
      <div class="hello"><h1>Villa 4B</h1><p>Ms. Rao · Design · 9 days left · <b style="color:var(--mint-ink)">On track</b></p></div>
      <div class="tools">
        ${due?`<button class="btn primary sm" data-act="pay">Pay ${inr(amtOf(due))}</button>`:''}
        <button class="iconbtn" data-act="notifications" title="Notifications"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M10.3 19a2 2 0 0 0 3.4 0"/></svg><span class="dot"></span></button>
        <button class="who" data-act="route" data-to="settings"><div class="av">M</div><div><div class="nm">Ms. Rao</div><div class="rl">Client · Villa 4B</div></div></button>
      </div>
    </header>
    <main class="view" id="view"></main>
  </div>
  <div class="overlay" id="overlay" data-act="close-modal"></div>
  <div class="modal" id="modal"></div>
  <div class="toasts" id="toasts"></div>`;
}

function render(){
  if(!state.auth) return renderAuth();
  app.className='app';
  app.innerHTML=shell();
  document.getElementById('view').innerHTML=views[state.route]?views[state.route]():homeView();
}

/* ================= views ================= */
function stageTrack(){
  return `<div class="stage-track">${STAGES.map((s,i)=>{
    const done=i<PROJECT.stage, now=i===PROJECT.stage;
    return `<button class="stage-step ${done?'done':now?'now':'next'}" data-act="stage" data-i="${i}">
      <span class="sd"></span><b>${esc(s[0])}</b><span>${done?'Done':now?'You are here':'Next'}</span></button>`;
  }).join('')}</div>`;
}
function renderCard(r,wide){
  return `<button class="render-card ${wide?'wide':''}" data-act="render" data-id="${r.id}">
    <div class="render-img">${visual(r.img,r.kind,r.name)}</div>
    <div class="render-meta"><b>${esc(r.name)}</b><span>v${r.v} · ${esc(r.date)}</span></div>
  </button>`;
}
function homeView(){
  const due=owedNow();
  return `<div class="scroll">
    <div class="client-hero">
      <button class="render-hero" data-act="route" data-to="designs">
        <div class="render-art">${visual(RENDERS[0].img,RENDERS[0].kind,RENDERS[0].name)}</div>
        <div class="render-cap"><span class="chip ok">Approved render</span><b>${RENDERS[0].name}</b><span>Version 5 · pinned by the design team</span></div>
      </button>
      <div class="stack">
        <div class="card">
          <div class="card-h"><h2>At a glance</h2>${chip('On track','ok')}</div>
          <div class="kv"><span class="k">Stage</span><span class="v">Design · 6 of 14</span></div>
          <div class="kv"><span class="k">Days left</span><span class="v">9 days</span></div>
          <div class="kv"><span class="k">Next meeting</span><span class="v">${NEXT_MEET.date} · ${NEXT_MEET.time}</span></div>
          <div class="kv"><span class="k">Payment due</span><span class="v">${inr(amtOf(due))} · ${due.date}</span></div>
          <div class="row" style="gap:8px;margin-top:12px"><button class="btn primary" data-act="pay">Pay now</button><button class="btn" data-act="route" data-to="designs">View designs</button></div>
        </div>
        <div class="card">
          <div class="card-h"><h2>Need help?</h2><button class="link" data-act="call-office">Call office</button></div>
          <div class="row"><div class="av-md" style="background:#E7EAFE;color:#2E4BF2">N</div><div class="grow"><b class="tname">Neha, your sales representative</b><div class="tmeta">${OFFICE.tel}</div></div></div>
        </div>
      </div>
    </div>

    <div class="grid3" style="margin-top:12px">
      <div class="card"><div class="lab">Stage</div><div class="big-num">6 / 14</div><div class="tmeta">Design · 9 days left</div></div>
      <div class="card"><div class="lab">Next meeting</div><div class="big-num" style="font-size:22px">${NEXT_MEET.date} · ${NEXT_MEET.time}</div><div class="tmeta">${NEXT_MEET.who}</div></div>
      <div class="card"><div class="lab">Payment due</div><div class="big-num">${inr(amtOf(due))}</div><div class="tmeta">due ${due.date} · ${inr(remaining())} remaining</div></div>
    </div>

    <div class="home-cols">
      <div>
        <div class="card">
          <div class="card-h"><h2>What happens next</h2><button class="link" data-act="route" data-to="project">Open project</button></div>
          <div class="next-list">
            <div><span class="dot ok"></span><div><b>Design</b><span>We finish the drawings and send the final render and quotation for approval.</span></div><span class="tmeta">now</span></div>
            <div><span class="dot"></span><div><b>Quotation</b><span>Review version 5 and accept it. Nothing moves to production without it.</span></div><span class="tmeta">next</span></div>
            <div><span class="dot"></span><div><b>Token payment</b><span>10% of the quotation starts the design stage.</span></div><span class="tmeta">later</span></div>
            <div><span class="dot"></span><div><b>Production</b><span>50% before production. We plan deliveries and installation.</span></div><span class="tmeta">later</span></div>
          </div>
        </div>
        <div class="card" style="margin-top:12px">
          <div class="card-h"><h2>Designs · version 5</h2><button class="link" data-act="route" data-to="designs">View all</button></div>
          <div class="render-grid">${RENDERS.filter(r=>r.v===5).map(r=>renderCard(r)).join('')}</div>
        </div>
        <div class="card pad0" style="margin-top:12px">
          <div class="card-h" style="padding:14px 16px 0"><h2>Current files</h2><button class="link" data-act="route" data-to="designs">History</button></div>
          <table><tbody>${FILES.filter(f=>f.v===5).slice(0,4).map(f=>`<tr data-act="file" data-id="${f.id}" style="cursor:pointer">
            <td><div class="tname">${esc(f.name)}</div><div class="tmeta">${esc(f.meta)}</div></td><td class="r">${chip(f.cat,'mut')}</td><td class="r"><button class="btn sm">Open</button></td></tr>`).join('')}</tbody></table>
        </div>
      </div>
      <div>
        <div class="card">
          <div class="card-h"><h2>Payments</h2><button class="link" data-act="route" data-to="payments">Open</button></div>
          <div class="due-box"><span class="lab">You owe now</span><b>${inr(amtOf(due))}</b><span>due ${due.date} · ${inr(remaining())} remaining</span></div>
          <div style="margin-top:10px">${PAYS.map(p=>`<div class="kv"><span class="k">${esc(p.label)} <span class="mut">${p.pct}%</span></span><span class="v">${p.status==='paid'?inr(amtOf(p))+' · paid':(p.status==='due'?inr(amtOf(p))+' · due '+p.date:'later')}</span></div>`).join('')}</div>
        </div>
        <div class="card" style="margin-top:12px">
          <div class="card-h"><h2>Your team</h2><button class="link" data-act="route" data-to="messages">Message</button></div>
          ${Object.entries(TEAM).map(([k,t])=>`<div class="row" style="padding:8px 0"><div class="av-md" style="background:#E7EAFE;color:#2E4BF2">${t.name[0]}</div><div class="grow"><b class="tname" data-act="team" data-id="${k}" style="cursor:pointer">${t.name}</b><div class="tmeta">${t.role} · studio line</div></div><button class="btn sm" data-act="call">Call</button></div>`).join('')}
        </div>
        <div class="card" style="margin-top:12px">
          <div class="card-h"><h2>Ideas for this project</h2><button class="link" data-act="route" data-to="catalogue">View more</button></div>
          <div class="ideas">${REFERENCES.map(ref=>{const it=itemById(ref.id); return `<button class="idea" data-act="item" data-id="${it.id}"><div class="idea-art">${visual(it.img,ref.id==='wardrobe'?'bedroom':'kitchen',it.name)}</div><b>${esc(ref.label)}</b><span>${esc(ref.note)}</span></button>`;}).join('')}</div>
        </div>
      </div>
    </div>
  </div>`;
}

function projectView(){
  const info=STAGE_INFO[PROJECT.stage];
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Project</div><h2>Villa 4B · Ms. Rao</h2><p class="tmeta">Gurugram · Villa · ${inr(TOTAL)} quotation</p></div><div class="row">${chip('Design · 9 days left','ok')}<button class="btn" data-act="route" data-to="designs">Designs</button><button class="btn primary" data-act="pay">Pay ${inr(amtOf(owedNow()))}</button></div></div>
    <div class="card">${stageTrack()}</div>
    <div class="project-grid">
      <div class="card" style="grid-column:span 7">
        <div class="card-h"><h2>${info.title}</h2><span class="sub">${info.start} → ${info.end}</span></div>
        <div class="stage-art">${PROJECT.stage===5?visual(RENDERS[0].img,RENDERS[0].kind,RENDERS[0].name):art('plan','meet')}</div>
        <p class="body-copy">${info.need}</p>
        <div class="grid3" style="margin-top:12px">
          <div class="mini"><span class="lab">Days left</span><b>${PROJECT.daysLeft}</b></div>
          <div class="mini"><span class="lab">Owner</span><b>Arjun</b><span>Design partner</span></div>
          <div class="mini"><span class="lab">Next</span><b>Quotation</b><span>after approval</span></div>
        </div>
      </div>
      <div class="card" style="grid-column:span 5">
        <div class="card-h"><h2>Next actions</h2></div>
        <div class="next-list compact">
          <div><span class="dot"></span><div><b>Review the final render</b><span>Version 5 is with you. The quotation follows.</span></div><button class="btn sm" data-act="route" data-to="designs">Open</button></div>
          <div><span class="dot warn"></span><div><b>${inr(amtOf(owedNow()))} due ${owedNow().date}</b><span>Near completion, 35% of quotation v5.</span></div><button class="btn sm" data-act="pay">Pay</button></div>
          <div><span class="dot"></span><div><b>${NEXT_MEET.date} · ${NEXT_MEET.time}</b><span>${NEXT_MEET.who}</span></div><button class="btn sm" data-act="route" data-to="meetings">Open</button></div>
        </div>
      </div>
      <div class="card" style="grid-column:span 7">
        <div class="card-h"><h2>Stage history</h2><span class="sub">read-only</span></div>
        <table><thead><tr><th>Stage</th><th>Status</th><th>Date</th><th>Held by</th></tr></thead><tbody>
          ${STAGES.slice(0,8).map((s,i)=>`<tr><td><b class="tname">${esc(s[0])}</b></td><td>${statusChip(i<PROJECT.stage?'done':'next')}</td><td>${s[2]||'—'}</td><td>${i<6?'Studio':'—'}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="card" style="grid-column:span 5">
        <div class="card-h"><h2>Team</h2><button class="link" data-act="route" data-to="messages">Messages</button></div>
        ${Object.entries(TEAM).map(([k,t])=>`<div class="row" style="padding:8px 0"><div class="av-md" style="background:#E7EAFE;color:#2E4BF2">${t.name[0]}</div><div class="grow"><b class="tname" data-act="team" data-id="${k}" style="cursor:pointer">${t.name}</b><div class="tmeta">${t.role}</div></div><button class="btn sm" data-act="call">Call</button></div>`).join('')}
        <div class="kv" style="margin-top:8px"><span class="k">Office</span><span class="v">${OFFICE.tel}</span></div>
      </div>
    </div>
  </div>`;
}

function designsView(){
  const active=state.designV, round=roundFor(active);
  const cats=['All','Renders','Quotations','Drawings','Invoices','Receipts'];
  const show=c=>state.designCat==='All'||state.designCat===c;
  const files=FILES.filter(f=>f.v===active);
  const renders=RENDERS.filter(r=>r.v===active);
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Project files</div><h2>Designs and files</h2><p class="tmeta">Only approved versions appear. Older versions are view-only.</p></div><div class="row"><button class="btn" data-act="route" data-to="project">Back to project</button></div></div>
    <div class="version-row">${ROUNDS.map(r=>`<button class="version ${r.v===active?'on':''}" data-act="version" data-v="${r.v}"><b>v${r.v}</b><span>${r.date}${r.current?' · current':''}</span></button>`).join('')}</div>
    <div class="card version-brief"><div class="row"><b>Version ${round.v} · ${round.date}</b>${chip(round.current?'Current':'View only',round.current?'ok':'mut')}</div><p class="tmeta">${esc(round.brief)}</p></div>
    <div class="seg" style="margin:12px 0">${cats.map(c=>`<button class="${state.designCat===c?'on':''}" data-act="dcat" data-c="${c}">${c}</button>`).join('')}</div>
    ${show('Renders')?`<div class="card" style="margin-bottom:12px"><div class="card-h"><h2>Renders</h2><span class="sub">${renders.length} approved</span></div><div class="render-grid wide">${renders.map(r=>renderCard(r)).join('')}</div></div>`:''}
    ${show('Quotations')||show('Drawings')||show('Invoices')?`<div class="card pad0"><table><thead><tr><th>File</th><th>Type</th><th>Version</th><th>Change</th><th class="r">Open</th></tr></thead><tbody>
      ${files.filter(f=>show(f.cat)).map(f=>`<tr data-act="file" data-id="${f.id}" style="cursor:pointer"><td><b class="tname">${esc(f.name)}</b><div class="tmeta">${esc(f.meta)}</div></td><td>${chip(f.cat,'mut')}</td><td>v${f.v}</td><td class="tmeta">${esc(f.brief||'')}</td><td class="r"><button class="btn sm">Open</button></td></tr>`).join('')}
    </tbody></table></div>`:''}
    ${show('Receipts')&&active===5?`<div class="card pad0" style="margin-top:12px"><div class="card-h" style="padding:14px 16px 0"><h2>Receipts</h2></div><table><tbody>${RECEIPTS.map(r=>`<tr><td><b>${r.label}</b><div class="tmeta">${r.no} · ${r.date}</div></td><td class="r num">${inr(r.amt)}</td><td class="r tmeta">balance ${inr(r.bal)}</td></tr>`).join('')}</tbody></table></div>`:''}
    <div class="card" style="margin-top:12px"><div class="card-h"><h2>HOMESIC documents</h2><span class="sub">proxy · opens the PDF</span></div><table><thead><tr><th>Document</th><th>Spec</th><th>Amount</th><th>Pages</th><th class="r"></th></tr></thead><tbody>${PROXY_DOCS.map(d=>`<tr><td><b class="tname">${esc(d.name)}</b><div class="tmeta">${d.kind} · ${esc(d.date)}</div></td><td class="tmeta">${esc(d.spec)}</td><td class="num">${d.amount?inr(d.amount):'—'}</td><td>${d.pages}</td><td class="r"><a class="btn sm" href="${d.file}" target="_blank" rel="noopener">Open</a></td></tr>`).join('')}</tbody></table><p class="tmeta" style="margin-top:8px">Proxy HOMESIC quotations and proposals for layout testing. They are not Ms. Rao's contract.</p></div>
  </div>`;
}

function paymentsView(){
  const due=owedNow();
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Money</div><h2>Payments</h2><p class="tmeta">Only the MD confirms a payment. Every amount has its due date.</p></div><div class="row"><button class="btn" data-act="route" data-to="project">Project</button><button class="btn primary" data-act="pay">Pay ${inr(amtOf(due))}</button></div></div>
    <div class="due-hero"><div><span class="lab light">You owe now</span><b>${inr(amtOf(due))}</b><span>Due ${due.date} · remaining balance ${inr(remaining())}</span></div><div class="due-actions"><button class="btn primary" data-act="pay">Pay now</button><button class="btn" data-act="proof">Submit proof</button></div></div>
    <div class="grid3" style="margin-top:12px">
      <div class="card"><div class="lab">Next payment</div><div class="medium">${due.label} · ${due.pct}%</div><div class="tmeta">${inr(amtOf(due))} · due ${due.date}</div></div>
      <div class="card"><div class="lab">Paid so far</div><div class="medium">${inr(paidTotal())}</div><div class="tmeta">${RECEIPTS.length} receipts</div></div>
      <div class="card"><div class="lab">Remaining</div><div class="medium">${inr(remaining())}</div><div class="tmeta">after this payment ${inr(remaining()-amtOf(due))}</div></div>
    </div>
    <div class="pay-grid">
      <div class="card" style="grid-column:span 7">
        <div class="card-h"><h2>Schedule</h2><span class="sub">10 / 50 / 35 / 5</span></div>
        <table><thead><tr><th>Stage</th><th>Share</th><th class="r">Amount</th><th>Status</th><th class="r">Date</th></tr></thead><tbody>
          ${PAYS.map(p=>`<tr><td><b class="tname">${esc(p.label)}</b></td><td>${p.pct}%</td><td class="r num">${inr(amtOf(p))}</td><td>${statusChip(p.status)}</td><td class="r tmeta">${p.status==='paid'?p.date:p.status==='due'?'due '+p.date:'on handover'}</td></tr>`).join('')}
        </tbody></table>
        <p class="tmeta" style="margin-top:10px">Based on the latest accepted quotation of ${inr(TOTAL)}.</p>
      </div>
      <div class="card" style="grid-column:span 5">
        <div class="card-h"><h2>Documents</h2></div>
        <div class="doc-list">
          <button data-act="doc" data-kind="quote" data-v="5"><span class="doc-ico">Q</span><div><b>Quotation v5</b><span>2 Nov · current</span></div><span class="chev">›</span></button>
          <button data-act="doc" data-kind="invoice" data-v="5"><span class="doc-ico">I</span><div><b>Invoice INV-205</b><span>${inr(amtOf(due))} · due 14 Dec</span></div><span class="chev">›</span></button>
          <button data-act="route" data-to="designs"><span class="doc-ico">R</span><div><b>Receipts</b><span>${inr(paidTotal())} received</span></div><span class="chev">›</span></button>
        </div>
      </div>
    </div>
    <div class="card pad0" style="margin-top:12px"><div class="card-h" style="padding:14px 16px 0"><h2>Receipts</h2><span class="sub">balance after each payment</span></div>
      <table><thead><tr><th>Receipt</th><th>Payment</th><th class="r">Amount</th><th class="r">Balance after</th></tr></thead><tbody>${RECEIPTS.map(r=>`<tr><td class="num">${r.no}</td><td>${r.label} · ${r.date}</td><td class="r num">${inr(r.amt)}</td><td class="r num">${inr(r.bal)}</td></tr>`).join('')}</tbody></table>
    </div>
  </div>`;
}

function meetingsView(){
  const ch=state.change;
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Calendar</div><h2>Meetings</h2><p class="tmeta">Google Meet links come from the studio. Everyone tagged has to confirm a change.</p></div><div class="row"><button class="btn" data-act="change">Request a new time</button></div></div>
    <div class="meeting-hero"><div><span class="lab light">Next · ${NEXT_MEET.date}, ${NEXT_MEET.time}</span><h2>Google Meet · Villa 4B design walkthrough</h2><p>${NEXT_MEET.who} · ${NEXT_MEET.people} tagged</p></div><div class="row"><a class="btn primary" href="${MEET_LINK}" target="_blank" rel="noopener">Join Google Meet</a><button class="btn" data-act="change">Change time</button></div></div>
    ${ch?`<div class="card" style="margin-top:12px"><div class="card-h"><h2>Requested time</h2><span class="sub">${esc(ch.date)} · ${esc(ch.time)}</span></div>
      ${ch.conf.map(c=>`<div class="kv"><span class="k">${esc(c[1])}</span><span class="v">${c[0]?'Confirmed':'Waiting'}</span></div>`).join('')}
      <p class="tmeta" style="margin-top:8px">${ch.final?'Everyone confirmed. The new time is final.':'Waiting for everyone tagged to confirm.'}</p></div>`:''}
    <div class="card pad0" style="margin-top:12px"><div class="card-h" style="padding:14px 16px 0"><h2>Past meetings</h2></div>
      <table><thead><tr><th>Meeting</th><th>Date</th><th>Notes</th><th class="r"></th></tr></thead><tbody>
        <tr><td><b class="tname">Site visit</b><div class="tmeta">Arjun, Imran</div></td><td>12 Nov</td><td class="tmeta">Measurements confirmed; kitchen wall checked.</td><td class="r"><button class="btn sm" data-act="meeting-past">Open</button></td></tr>
        <tr><td><b class="tname">Survey</b><div class="tmeta">Arjun</div></td><td>4 Nov</td><td class="tmeta">Brief and site survey completed.</td><td class="r"><button class="btn sm" data-act="meeting-past">Open</button></td></tr>
      </tbody></table></div>
  </div>`;
}

function messagesView(){
  const msgs=state.msgs;
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Communication</div><h2>Messages</h2><p class="tmeta">${state.joined?'You are in the project group.':'Messages go to your private number until you join the group.'}</p></div></div>
    <div class="msg-grid">
      <div class="card pad0 msg-list">
        <button class="thread-row ${state.thread==='studio'?'on':''}" data-act="thread" data-t="studio"><span class="av-sm" style="background:#E7EAFE;color:#2E4BF2">S</span><div><b>Studio</b><span>Arjun · design partner</span></div><span class="chip mut">private</span></button>
        <button class="thread-row ${state.thread==='group'?'on':''}" data-act="thread" data-t="group"><span class="av-sm" style="background:#E3F5EC;color:#146B49">G</span><div><b>Project group</b><span>${state.joined?'Arjun, Imran and you':'Invitation only'}</span></div><span class="chip ${state.joined?'ok':'mut'}">${state.joined?'joined':'locked'}</span></button>
        <div class="msg-team"><span class="lab">Your team</span>${Object.entries(TEAM).map(([k,t])=>`<div class="row" style="padding:8px 0"><div class="av-sm" style="background:#E7EAFE;color:#2E4BF2">${t.name[0]}</div><div class="grow"><b class="tname" data-act="team" data-id="${k}" style="cursor:pointer">${t.name}</b><div class="tmeta">${t.role}</div></div><button class="btn sm" data-act="call">Call</button></div>`).join('')}</div>
        <div class="msg-office"><span class="lab">Office</span><b>${OFFICE.tel}</b><button class="btn sm" data-act="call-office">Call the office</button></div>
      </div>
      <div class="card pad0 chat">
        <div class="chat-head"><div><b>${state.thread==='group'?'Project group':'Studio thread'}</b><span>${state.thread==='group'?'Villa 4B · group':'Private with the studio'}</span></div>${state.thread==='group'&&!state.joined?'<button class="btn sm primary" data-act="join-group">Open invitation</button>':''}</div>
        <div class="chat-body" id="chat-body">${msgs.map(m=>`<div class="bubble ${m.me?'me':''}"><span>${esc(m.who)} · ${esc(m.at)}</span>${esc(m.t)}</div>`).join('')}</div>
        <form class="chat-compose" data-form="msg"><input id="msg-input" placeholder="${state.thread==='group'?'Write to the group':'Write to the studio'}" autocomplete="off"><button class="btn primary" type="submit">Send</button></form>
      </div>
    </div>
  </div>`;
}

function catalogueView(){
  const q=state.catQ.toLowerCase().trim();
  const items=ITEMS.filter(it=>(state.catFilter==='all'||it.cat.includes(state.catFilter))&&(!q||(it.name+' '+it.room+' '+it.desc).toLowerCase().includes(q)));
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Packages</div><h2>Catalogue</h2><p class="tmeta">Lead times and prices are examples until the catalogue supplies real values.</p></div><div class="row"><input class="field" id="cat-search" value="${esc(state.catQ)}" placeholder="Search kitchens, wardrobes, doors" style="width:280px"><button class="btn" data-act="cat-search">Search</button></div></div>
    <div class="seg" style="margin-bottom:12px">${[['all','All'],['kitchen','Kitchen'],['bedroom','Bedroom'],['home','Whole home'],['commercial','Commercial']].map(([k,l])=>`<button class="${state.catFilter===k?'on':''}" data-act="cat-filter" data-k="${k}">${l}</button>`).join('')}</div>
    <div class="cat-grid">${items.map(it=>`<button class="cat-card" data-act="item" data-id="${it.id}"><div class="cat-art">${visual(it.img,it.id==='wardrobe'?'bedroom':(it.room==='Kitchen'||it.room==='Commercial'?'kitchen':'living'),it.name)}</div><div class="cat-body"><span class="lab">${esc(it.room)}</span><b>${esc(it.name)}</b><span>${it.days} days · example ${inr(it.price)}</span></div></button>`).join('')||'<div class="empty"><b>No packages match</b>Try another word, or choose All.</div>'}</div>
  </div>`;
}

function settingsView(){
  return `<div class="scroll">
    <div class="page-head"><div><div class="lab">Account</div><h2>Settings</h2><p class="tmeta">Your profile, the office, and what happens after handover.</p></div><button class="btn" data-act="logout">Log out</button></div>
    <div class="settings-grid">
      <div class="card"><div class="row"><div class="av-md" style="background:#FDE9E6;color:#A03427;width:48px;height:48px;font-size:16px">M</div><div class="grow"><b style="font-size:15px">Ms. Rao</b><div class="tmeta">${CLIENT.display} · verified</div><div class="tmeta">${state.email?esc(state.email):'No email added'}</div></div><button class="btn sm" data-act="email">${state.email?'Change':'Add email'}</button></div></div>
      <div class="card"><div class="card-h"><h2>Office</h2></div><div class="kv"><span class="k">Call</span><span class="v">${OFFICE.tel}</span></div><div class="kv"><span class="k">WhatsApp</span><span class="v">${OFFICE.tel}</span></div><div class="kv"><span class="k">Email</span><span class="v">${OFFICE.email}</span></div><div class="row" style="gap:8px;margin-top:12px"><button class="btn sm primary" data-act="call-office">Call</button><button class="btn sm" data-act="copy" data-t="${OFFICE.email}">Copy email</button></div></div>
      <div class="card"><div class="card-h"><h2>Warranty</h2>${chip('After handover','mut')}</div><p class="tmeta">10 years from handover, when the final payment is made.</p><button class="btn sm" style="margin-top:12px" data-act="route" data-to="warranty">View warranty</button></div>
      <div class="card"><div class="card-h"><h2>Terms</h2>${chip('v1','mut')}</div><p class="tmeta">${state.termsAt?'Agreed '+esc(state.termsAt):'Version 1 · 22 Nov 2026'}</p><button class="btn sm" style="margin-top:12px" data-act="route" data-to="terms">Read terms</button></div>
      <div class="card" style="grid-column:span 2"><div class="card-h"><h2>Devices and sessions</h2></div><table><tbody><tr><td><b>Chrome · Mumbai</b><div class="tmeta">This device</div></td><td class="r">${chip('Current','ok')}</td></tr><tr><td><b>iPhone · Pune</b><div class="tmeta">Last seen 2 days ago</div></td><td class="r"><button class="btn sm" data-act="signout-device">Sign out</button></td></tr></tbody></table></div>
    </div>
  </div>`;
}

function warrantyView(){
  return `<div class="scroll"><div class="page-head"><div><div class="lab">After handover</div><h2>Warranty</h2><p class="tmeta">Ten years from handover, which is the final payment.</p></div><button class="btn" data-act="route" data-to="settings">Back to settings</button></div>
    <div class="grid2">
      <div class="card"><div class="card-h"><h2>Status</h2>${chip('Not active yet','mut')}</div><div class="medium">Starts at handover</div><p class="body-copy">The 10-year warranty starts when the project is handed over and the final payment is made.</p></div>
      <div class="card"><div class="card-h"><h2>Cover</h2></div><div class="kv"><span class="k">Length</span><span class="v">10 years</span></div><div class="kv"><span class="k">Claims</span><span class="v">Your sales representative decides coverage</span></div><div class="kv"><span class="k">Uncovered</span><span class="v">Written reason</span></div><button class="btn" style="margin-top:12px" disabled>Raise a claim after handover</button></div>
    </div></div>`;
}
function termsView(){
  return `<div class="scroll"><div class="page-head"><div><div class="lab">Terms</div><h2>Terms and Conditions</h2><p class="tmeta">Version 1 · 22 November 2026</p></div><button class="btn" data-act="route" data-to="settings">Back</button></div>
    <div class="card" style="max-width:780px"><p class="body-copy">[Full terms text. Wording is not drafted yet. This is a placeholder for the prototype.]</p>${state.termsAt?`<p class="tmeta" style="margin-top:10px">Agreed on this device: ${esc(state.termsAt)}</p>`:''}</div></div>`;
}

const views={home:homeView,project:projectView,designs:designsView,payments:paymentsView,meetings:meetingsView,messages:messagesView,catalogue:catalogueView,settings:settingsView,warranty:warrantyView,terms:termsView};

/* ================= overlays ================= */
function openPay(){
  const due=owedNow();
  openModal(`<div class="modal-head"><div><h3>Pay ${inr(amtOf(due))}</h3><p>${due.label} · ${due.pct}% · due ${due.date}</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="pay-wrap"><div class="qr-card">${qrSvg('VB4B-'+due.k)}<p class="tmeta">Demo QR · the live code is in the studio app</p></div>
    <div><div class="kv"><span class="k">Payee</span><span class="v">HOMESIC</span></div><div class="kv"><span class="k">Reference</span><span class="v">VB4B-${due.k.toUpperCase()}</span></div><div class="kv"><span class="k">Amount</span><span class="v">${inr(amtOf(due))}</span></div><div class="kv"><span class="k">Due</span><span class="v">${due.date}</span></div></div></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button><button class="btn primary" data-act="proof">I have paid · submit proof</button></div>`,'wide');
}
function openProof(){
  const due=owedNow();
  openModal(`<div class="modal-head"><div><h3>Payment proof</h3><p>One screenshot goes straight to the MD. The stage waits until the MD confirms.</p></div><button class="close" data-act="close-modal">✕</button></div>
    ${state.proof==='sent'?`<div class="notice">Sent. Waiting for the MD to confirm.</div><div class="acts"><button class="btn" data-act="sim-reject">Demo · reject</button><button class="btn primary" data-act="sim-confirm">Demo · confirm</button></div>`:
      state.proof==='rejected'?`<div class="notice bad">Rejected: ${esc(state.proofReason)}. Add a corrected screenshot.</div>${proofForm()}`:
      state.proof==='confirmed'?`<div class="notice ok">Confirmed. Receipt added.</div><div class="acts"><button class="btn primary" data-act="close-modal">Done</button></div>`:proofForm()}`,'wide');
}
function proofForm(){
  return `<div class="proof-form"><label class="proof-drop" id="proof-drop">${state.proofUrl?'<img src="'+state.proofUrl+'" alt="Payment proof">':'<b>Add a screenshot</b><span>JPG or PNG, one image</span>'}<input type="file" id="proof-file" accept="image/*" style="display:none"></label>
    <div class="grid2"><div class="field"><label>Amount paid</label><input id="proof-amt" type="number" value="${state.proofAmt||amtOf(owedNow())}"></div><div class="field"><label>Date paid</label><div class="dt-field"><span class="dt-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg></span><input id="proof-date" type="date" value="2026-11-25"></div></div></div></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button><button class="btn primary" data-act="send-proof" ${state.proofUrl?'':'disabled'}>Send for confirmation</button></div>`;
}
function humanDate(v){
  if(!v) return 'Thursday 26 Nov';
  const d=new Date(v+'T12:00:00');
  return d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
}
function humanTime(v){
  if(!v) return '4:30 PM';
  const [h,m]=v.split(':').map(Number);
  const ap=h>=12?'PM':'AM'; const hh=h%12||12;
  return hh+':'+String(m||0).padStart(2,'0')+' '+ap;
}
function updateChangePreview(){
  const d=document.getElementById('ch-date')?.value, t=document.getElementById('ch-time')?.value;
  const el=document.getElementById('dt-preview');
  if(el) el.textContent=humanDate(d)+' · '+humanTime(t);
}
function openChange(){
  openModal(`<div class="modal-head"><div><h3>Request a new time</h3><p>Everyone tagged in the meeting has to confirm.</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="grid2"><div class="field"><label>Date</label><div class="dt-field"><span class="dt-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg></span><input id="ch-date" type="date" value="2026-11-26"></div></div><div class="field"><label>Time</label><div class="dt-field"><span class="dt-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg></span><input id="ch-time" type="time" value="16:30"></div></div></div>
    <div class="dt-preview" id="dt-preview">Thu 26 Nov · 4:30 PM</div>
    <div class="field"><label>Note</label><input id="ch-note" value="Can we move the walkthrough to Thursday?"></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button><button class="btn primary" data-act="send-change">Request change</button></div>`);
  setTimeout(function(){
    ['ch-date','ch-time'].forEach(function(id){ document.getElementById(id)?.addEventListener('input',updateChangePreview); });
    updateChangePreview();
  },0);
}
function openItem(id){
  const it=itemById(id); if(!it) return;
  openModal(`<div class="modal-head"><div><h3>${esc(it.name)}</h3><p>${esc(it.room)} · ${it.days} days · example ${inr(it.price)}</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="item-art">${visual(it.img,it.room==='Kitchen'?'kitchen':it.room==='Bedroom'?'bedroom':'living',it.name)}</div>
    <p class="body-copy">${esc(it.desc)}</p>
    <div class="acts"><button class="btn" data-act="share-item" data-id="${it.id}">Share on WhatsApp</button><button class="btn primary" data-act="enquire" data-id="${it.id}">Ask about this package</button></div>`,'wide');
}
function openEmail(){
  openModal(`<div class="modal-head"><div><h3>Email for receipts</h3><p>Optional. Used for receipts and documents only.</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="field"><label>Email</label><input id="set-email" type="email" value="${esc(state.email)}" placeholder="you@example.com"></div>
    <div class="acts"><button class="btn" data-act="close-modal">Cancel</button><button class="btn primary" data-act="save-email">Save email</button></div>`);
}
function openDoc(kind,v){
  v=Number(v)||5;
  const q=kind==='quote';
  const title=q?'Quotation v'+v:(v===5?'Invoice INV-205':'Invoice INV-198');
  const date=q?roundFor(v).date+' 2026':(v===5?'25 Nov 2026':'18 Oct 2026');
  openModal(`<div class="modal-head"><div><h3>${title}</h3><p>${date}</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="paper">
      <div class="paper-head"><div><b>HOMESIC</b><span>GSTIN 06AAACH1234F1Z5 · Gurugram, Haryana</span></div><div class="r"><b>${title}</b><span>${date}</span></div></div>
      <div class="paper-to"><span class="lab">Prepared for</span><b>Ms. Rao · Villa 4B</b><span>Gurugram</span></div>
      ${q?`<table class="paper-table"><tbody><tr><td>Modular kitchen, carcass and shutters</td><td class="r">₹ 2,10,000</td></tr><tr><td>Walk-in wardrobe, three bedrooms</td><td class="r">₹ 1,25,000</td></tr><tr><td>Island, worktop and fittings</td><td class="r">₹ 65,000</td></tr><tr class="total"><td>Total quotation</td><td class="r">${inr(TOTAL)}</td></tr></tbody></table>`:
      `<table class="paper-table"><tbody><tr><td>${v===5?'Near completion · 35% of quotation v5':'Before production · 50% of quotation v4'}</td><td class="r">${v===5?inr(140000):inr(200000)}</td></tr><tr class="total"><td>${v===5?'Amount due · 14 Dec 2026':'Paid · 20 Oct 2026'}</td><td class="r">${v===5?inr(140000):inr(200000)}</td></tr></tbody></table>`}
      <p class="paper-note">${q?'Payment split 10 / 50 / 35 / 5. This is a prototype document, not a tax invoice.':(v===5?'GST included. Pay by UPI; the studio confirms every payment.':'Paid in full. This earlier invoice is view-only.')}</p>
    </div>
    <div class="acts"><button class="btn" data-act="download">${v===5?'Download':'View only'}</button><button class="btn" data-act="close-modal">Close</button>${!q&&v===5?'<button class="btn primary" data-act="pay">Pay this invoice</button>':''}</div>`,'wide');
}
function openStage(i){
  const s=STAGES[i], info=STAGE_INFO[i];
  openModal(`<div class="modal-head"><div><h3>${esc(s[0])}</h3><p>${i<PROJECT.stage?'Done · '+s[2]:i===PROJECT.stage?'Current stage · '+PROJECT.daysLeft+' days left':'Not started'}</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="stage-art">${art(info?info.ill:(i<PROJECT.stage?'plan':'quote'),'meet')}</div>
    <p class="body-copy">${info?esc(info.need):i<PROJECT.stage?'This stage is complete and saved in the project history.':'This stage has not started. The studio will confirm the dates when the earlier stage closes.'}</p>
    <div class="acts"><button class="btn" data-act="close-modal">Done</button></div>`,'wide');
}
function openTeam(id){
  const t=TEAM[id]; if(!t) return;
  openModal(`<div class="modal-head"><div><h3>${esc(t.name)}</h3><p>${esc(t.role)} · HOMESIC</p></div><button class="close" data-act="close-modal">✕</button></div>
    <div class="row" style="gap:12px"><div class="av-md" style="width:52px;height:52px;background:#E7EAFE;color:#2E4BF2;font-size:16px">${t.name[0]}</div><div><b>${esc(t.name)}</b><div class="tmeta">${esc(t.role)}</div><div class="tmeta">${esc(t.phone)}</div></div></div>
    <p class="body-copy" style="margin-top:12px">${esc(t.bio)}</p>
    <div class="kv"><span class="k">Projects</span><span class="v">${t.projects.join(' · ')}</span></div>
    <p class="tmeta" style="margin-top:8px">${esc(t.quotes[0])}</p>
    <div class="acts"><button class="btn" data-act="call">Call</button><button class="btn primary" data-act="team-message" data-id="${id}">Message</button></div>`,'wide');
}
function qrSvg(text){
  const n=25,cell=5.4; let h=2166136261;
  for(const c of text){ h^=c.charCodeAt(0); h=Math.imul(h,16777619)>>>0; }
  const inFinder=(x,y)=>(x<8&&y<8)||(x>=n-8&&y<8)||(x<8&&y>=n-8);
  const finder=(ox,oy)=>`<rect x="${ox*cell}" y="${oy*cell}" width="${7*cell}" height="${7*cell}" fill="none" stroke="#15162B" stroke-width="${cell}"/><rect x="${(ox+2)*cell}" y="${(oy+2)*cell}" width="${3*cell}" height="${3*cell}" fill="#15162B"/>`;
  let cells='';
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    if(inFinder(x,y)) continue;
    h=(Math.imul(h,1103515245)+12345)>>>0;
    if((h>>>16)&1) cells+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}" fill="#15162B"/>`;
  }
  const s=n*cell;
  return `<svg viewBox="0 0 ${s} ${s}" width="150" height="150"><rect width="${s}" height="${s}" fill="#fff"/>${cells}${finder(0,0)}${finder(n-7,0)}${finder(0,n-7)}</svg>`;
}

/* ================= actions ================= */
function sendThread(){
  const inp=document.getElementById('msg-input'); const v=(inp?.value||'').trim(); if(!v) return;
  state.msgs.push({who:'You',t:v,me:true,at:'Now'}); render();
}
function openThread(t){ state.thread=t; render(); }

document.addEventListener('click', e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const act=el.dataset.act, id=el.dataset.id, v=el.dataset.v;
  if(act==='close-modal'){ closeModal(); return; }
  if(act==='route'){ e.preventDefault(); state.route=el.dataset.to; closeModal(); render(); return; }
  if(act==='terms'){
    e.preventDefault();
    openModal(`<div class="modal-head"><div><h3>Terms and Conditions</h3><p>Version 1 · 22 November 2026</p></div><button class="close" data-act="close-modal">✕</button></div><p class="body-copy">[Full terms text. Wording is not drafted yet. This is a placeholder for the prototype.]</p><div class="acts"><button class="btn primary" data-act="agree-terms">I agree</button></div>`,'wide'); return;
  }
  if(act==='agree-terms'){ state.terms=true; closeModal(); renderAuth(); toast('Terms accepted'); return; }
  if(act==='send-code'){
    const phone=(document.getElementById('auth-phone')?.value||'').replace(/\D/g,'');
    if(phone.length<10){ toast('Enter a 10-digit mobile number'); return; }
    if(phone!==CLIENT.phone){ toast('This number is not on your enquiry · call '+OFFICE.tel); return; }
    if(!document.getElementById('auth-terms')?.checked){ toast('Agree to the Terms first'); return; }
    state.phone=phone; state.signStep='otp'; renderAuth(); return;
  }
  if(act==='verify'){
    const code=document.getElementById('auth-otp')?.value||'';
    if(code.length<6){ toast('Enter all six digits'); return; }
    if(!state.email&&!state.emailAsked){ state.signStep='email'; renderAuth(); return; }
    finishAuth(); return;
  }
  if(act==='change-number'){ state.signStep='mobile'; renderAuth(); return; }
  if(act==='resend'){ toast('Demo code is 123456'); return; }
  if(act==='save-email'){
    const authEmail=document.getElementById('auth-email');
    if(authEmail){
      const em=authEmail.value||'';
      if(em&&em.indexOf('@')<1){ toast('Enter a valid email, or skip'); return; }
      state.email=em.trim(); state.emailAsked=true; finishAuth(); return;
    }
    const se=document.getElementById('set-email')?.value||'';
    if(se&&se.indexOf('@')<1){ toast('Enter a valid email'); return; }
    state.email=se.trim(); closeModal(); render(); toast(state.email?'Email saved':'Email removed'); return;
  }
  if(act==='skip-email'){ state.email=''; state.emailAsked=true; finishAuth(); return; }
  if(act==='logout'){ state.auth=false; state.signStep='mobile'; state.terms=false; state.termsAt=null; renderAuth(); toast('Logged out'); return; }
  if(act==='stage'){ openStage(Number(el.dataset.i)); return; }
  if(act==='render'){ const r=RENDERS.find(x=>x.id===id); if(r){ openModal(`<div class="modal-head"><div><h3>${esc(r.name)}</h3><p>Version ${r.v} · ${esc(r.date)} · approved</p></div><button class="close" data-act="close-modal">✕</button></div><div class="viewer-art">${visual(r.img,r.kind,r.name)}</div><p class="tmeta">Only approved versions appear. Older versions open from Designs.</p><div class="acts"><button class="btn" data-act="download">Download</button><button class="btn primary" data-act="close-modal">Done</button></div>`,'wide'); } return; }
  if(act==='version'){ state.designV=Number(v); render(); return; }
  if(act==='dcat'){ state.designCat=el.dataset.c; render(); return; }
  if(act==='file'){
    const f=FILES.find(x=>x.id===id); if(!f) return;
    if(f.cat==='Invoices'){ openDoc('invoice',f.v); } else if(f.cat==='Quotations'){ openDoc('quote',f.v); } else { toast('Downloads start from the installed app'); }
    return;
  }
  if(act==='doc'){ openDoc(el.dataset.kind,v); return; }
  if(act==='pay'){ openPay(); return; }
  if(act==='proof'){ closeModal(); openProof(); return; }
  if(act==='send-proof'){
    state.proofAmt=document.getElementById('proof-amt')?.value||state.proofAmt;
    if(!state.proofUrl){ toast('Add a screenshot first'); return; }
    state.proof='sent'; state.msgs.push({who:'You',t:'Payment screenshot sent for confirmation.',me:true,at:'Now'}); openProof(); toast('Sent to the MD'); return;
  }
  if(act==='sim-reject'){ state.proof='rejected'; state.proofReason='The amount does not match the payment request'; openProof(); return; }
  if(act==='sim-confirm'){
    const due=owedNow(); if(due){ due.status='paid'; RECEIPTS.unshift({no:'R-061',amt:amtOf(due),date:'Now',label:due.label,bal:remaining()}); }
    state.proof='confirmed'; state.proofUrl=''; toast('Payment confirmed · receipt added'); closeModal(); render(); return;
  }
  if(act==='download'){ toast('Downloads start from the installed app in the real build'); return; }
  if(act==='team'){ openTeam(id); return; }
  if(act==='team-message'){ closeModal(); state.route='messages'; state.thread='studio'; render(); toast('Studio thread opened'); return; }
  if(act==='call'){ toast('Calling '+OFFICE.tel+' · prototype'); return; }
  if(act==='call-office'){ toast('Call '+OFFICE.tel); return; }
  if(act==='change'){ openChange(); return; }
  if(act==='send-change'){
    state.change={date:humanDate(document.getElementById('ch-date')?.value),time:humanTime(document.getElementById('ch-time')?.value),conf:[['', 'You'],['','Arjun'],['','Imran']],final:false};
    closeModal(); render(); toast('Change requested · everyone tagged must confirm');
    setTimeout(()=>{ if(state.change){ state.change.conf[0][0]=true; render(); } },900);
    setTimeout(()=>{ if(state.change){ state.change.conf[1][0]=true; render(); } },1600);
    setTimeout(()=>{ if(state.change){ state.change.conf[2][0]=true; state.change.final=true; render(); } },2300);
    return;
  }
  if(act==='thread'){ openThread(el.dataset.t); return; }
  if(act==='join-group'){ state.joined=true; state.thread='group'; state.msgs.push({who:'Arjun',t:'Welcome to the Villa 4B group.',me:false,at:'Now'}); render(); toast('You joined the project group'); return; }
  if(act==='cat-filter'){ state.catFilter=el.dataset.k; render(); return; }
  if(act==='cat-search'){ state.catQ=document.getElementById('cat-search')?.value||''; render(); return; }
  if(act==='item'){ openItem(id); return; }
  if(act==='share-item'){ toast('Share link copied · prototype'); return; }
  if(act==='enquire'){ closeModal(); state.route='messages'; state.thread='studio'; state.msgs.push({who:'You',t:'I would like to ask about '+itemById(id).name+'.',me:true,at:'Now'}); render(); toast('Enquiry added to the studio thread'); return; }
  if(act==='email'){ openEmail(); return; }
  if(act==='copy'){ const t=el.dataset.t; if(navigator.clipboard) navigator.clipboard.writeText(t); toast('Copied'); return; }
  if(act==='signout-device'){ toast('Device signed out · prototype'); return; }
  if(act==='notifications'){ toast('No new notifications'); return; }
  if(act==='meeting-past'){ toast('Past meeting notes are in the project record'); return; }
  if(act==='terms-page'){ state.route='terms'; render(); return; }
});
document.addEventListener('input', e=>{
  if(e.target.id==='cat-search') state.catQ=e.target.value;
});
document.addEventListener('change', e=>{
  if(e.target.id==='proof-file'&&e.target.files&&e.target.files[0]){
    state.proofUrl=URL.createObjectURL(e.target.files[0]); state.proof='none'; openProof();
  }
});
document.addEventListener('submit', e=>{
  if(e.target.dataset.form==='msg'){ e.preventDefault(); sendThread(); }
});

/* ================= boot ================= */
(function boot(){
  const p=new URLSearchParams(location.search);
  if(p.get('selftest')){
    state.auth=true;
    render();
    const out=[]; const ck=(n,c)=>out.push([n,!!c]);
    ck('payment due is 1,40,000', inr(amtOf(owedNow()))==='₹1,40,000');
    ck('remaining is 1,60,000', inr(remaining())==='₹1,60,000');
    ck('four split steps', PAYS.length===4);
    ck('version 5 is current', roundFor(5).current===true);
    ck('v5 has 3 renders', RENDERS.filter(r=>r.v===5).length===3);
    ck('v4 is view-only', roundFor(4).current===false);
    ck('home shows the due date', homeView().includes('14 Dec'));
    ck('designs show version 5', designsView().includes('Version 5'));
    ck('payments show schedule', paymentsView().includes('10 / 50 / 35 / 5'));
    ck('meetings show Meet', meetingsView().includes('Google Meet'));
    ck('messages have a studio thread', messagesView().includes('Studio thread'));
    ck('catalogue has packages', catalogueView().includes('Modular kitchen'));
    ck('settings has warranty', settingsView().includes('Warranty'));
    ck('warranty starts at handover', warrantyView().includes('Starts at handover'));
    ck('quote document renders', (openDoc('quote',5), document.getElementById('modal').innerHTML.includes('Total quotation')));
    closeModal();
    const pass=out.filter(x=>x[1]).length;
    document.getElementById('view').innerHTML=`<div class="scroll"><div class="card"><div class="card-h"><h2>Client desktop self-test — ${pass}/${out.length}</h2><span class="chip ${pass===out.length?'ok':'now'}">${pass===out.length?'all good':'failures'}</span></div>${out.map(([n,c])=>`<div class="kv"><span class="k">${n}</span><span class="v" style="color:${c?'var(--mint-ink)':'var(--coral-ink)'}">${c?'pass':'fail'}</span></div>`).join('')}</div></div>`;
    return;
  }
  const demo=p.get('demo');
  if(demo==='signin'){ renderAuth(); return; }
  if(demo){
    state.auth=true;
    const routes=['home','project','designs','payments','meetings','messages','catalogue','settings','warranty','terms'];
    state.route=routes.includes(demo)?demo:'home';
    render();
    if(demo==='pay') setTimeout(openPay,150);
    if(demo==='proof') setTimeout(openProof,150);
    if(demo==='change') setTimeout(openChange,150);
    if(demo==='item') setTimeout(()=>openItem('kitchen'),150);
    if(demo==='doc') setTimeout(()=>openDoc('quote',5),150);
    return;
  }
  renderAuth();
})();
