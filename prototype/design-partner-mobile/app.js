(function(){
"use strict";

var ME = {name:'Arjun', email:'arjun@homsic.com', role:'Design partner', phone:'+91 85270 25058'};
var OFFICE = {tel:'+91 85270 25058', email:'care@homsic.com'};
var MEET = 'https://meet.google.com/vb4b-demo';

var PROJECTS = [
  {id:'villa', client:'Ms. Rao', name:'Villa 4B', city:'Gurugram', type:'Villa', status:'live',
   stage:'Design', stageIdx:5, days:9, estimate:400000, paid:240000, due:140000, dueDate:'14 Dec',
   next:'Tue 24 Nov · 11:00', img:'assets/renders/kitchen-02-walnut.jpg', temp:false},
  {id:'flat', client:'Mr. Shah', name:'Flat 7', city:'Gurugram', type:'Apartment', status:'temp',
   stage:'Token', stageIdx:6, days:3, estimate:260946, paid:0, due:26095, dueDate:'28 Nov',
   next:'Wed 25 Nov · 16:00', img:'assets/renders/kitchen-03-sage.jpg', temp:true},
  {id:'office', client:'Ms. Iyer', name:'Office, Sector 44', city:'Gurugram', type:'Commercial', status:'live',
   stage:'Production', stageIdx:9, days:20, estimate:372099, paid:37210, due:0, dueDate:'',
   next:'Thu 26 Nov · 10:00', img:'assets/renders/villa-06-luklak.jpg', temp:false}
];

var STAGES = ['Enquiry','Survey','Brief','Concept','Design','Quotation','Token','Approval','Production','Deliveries','Install','Snags','Handover','Aftercare'];

var APPROVALS = [
  {id:'render5', project:'villa', kind:'Render', title:'Version 5 renders', meta:'3 images · 22 Nov', status:'With Design Head', tone:'wait', img:'assets/renders/kitchen-02-walnut.jpg', brief:'Island moved 150 mm; walnut base and stone top.'},
  {id:'quote5', project:'villa', kind:'Quotation', title:'Quotation v5', meta:'₹4,00,000 · 2 Nov', status:'Draft', tone:'draft', brief:'Kitchen, wardrobe and island; 10 / 50 / 35 / 5.'},
  {id:'quoteflat', project:'flat', kind:'Quotation', title:'Quotation HS-MVML7W13', meta:'₹2,60,946 · 24 Oct', status:'With Design Head', tone:'wait', brief:'Straight kitchen; BWP ply + acrylic.'},
  {id:'client', project:'villa', kind:'Client approval', title:'Approve in Ms. Rao’s name', meta:'Client said “go ahead” on WhatsApp · 24 Nov', status:'Needs you', tone:'you', brief:'Record her words and approve v5 on her behalf.'},
  {id:'change', project:'villa', kind:'Client change', title:'Add a tall unit', meta:'Raised 23 Nov · no price yet', status:'Needs you', tone:'you', brief:'Turn the request into a priced add-on and send for approval.'},
  {id:'reject', project:'villa', kind:'Rejected', title:'Kitchen v4 rejected', meta:'Tall units clash with the window', status:'Restore', tone:'bad', brief:'Restore the rejected version as a new version after the fix.'}
];

var MEETINGS = [
  {id:'m1', day:'Today', date:'Tue 24 Nov', time:'11:00', title:'Villa 4B design walkthrough', who:'Ms. Rao, Arjun, Imran', status:'accepted', link:MEET},
  {id:'m2', day:'Tomorrow', date:'Wed 25 Nov', time:'16:00', title:'Flat 7 quotation review', who:'Mr. Shah, Neha, Arjun', status:'pending', link:MEET},
  {id:'m3', day:'Thu 26 Nov', date:'Thu 26 Nov', time:'10:00', title:'Office site visit', who:'Ms. Iyer, Imran', status:'accepted', link:MEET}
];

var THREADS = [
  {id:'villa', name:'Ms. Rao · Villa 4B', meta:'Client · private', av:'M', msgs:[
    {who:'Ms. Rao', me:false, t:'The cabinet samples are with us. We like the walnut.', at:'Yesterday'},
    {who:'You', me:true, t:'The island shift is in v5. I will send the final render and quotation today.', at:'09:20'}
  ]},
  {id:'group', name:'Villa 4B project group', meta:'Ms. Rao, Imran and you · joined', av:'G', msgs:[
    {who:'Imran', me:false, t:'Production is pencilled for the first week of January.', at:'Yesterday'},
    {who:'You', me:true, t:'I will confirm the quotation with the Design Head first.', at:'09:22'}
  ]},
  {id:'head', name:'Design Head · Meera', meta:'Internal · approvals', av:'D', msgs:[
    {who:'Meera', me:false, t:'Send me the v5 render and the revised quotation together.', at:'Mon'},
    {who:'You', me:true, t:'Both are ready. Sending today.', at:'Mon'}
  ]}
];

var DOCS = [
  {name:'Quotation HS-MVQU55NO', kind:'Quote', amount:372099, date:'27 Oct 2026', spec:'L-shape 8 × 6 × 10 ft · HDHMR + PU', pages:1, file:'assets/docs/Homesic-Quote-HS-MVQU55NO.pdf'},
  {name:'Quotation HS-MVML7W13', kind:'Quote', amount:260946, date:'24 Oct 2026', spec:'Straight · BWP ply + Acrylic', pages:1, file:'assets/docs/Homesic-Quote-HS-MVML7W13.pdf'},
  {name:'Proposal HS-MVML7W13', kind:'Proposal', amount:260946, date:'24 Oct 2026', spec:'13-page straight kitchen proposal', pages:13, file:'assets/docs/Homesic-Proposal-HS-MVML7W13.pdf'},
  {name:'Quotation HS-MVQVPO4X', kind:'Quote', amount:262773, date:'27 Oct 2026', spec:'L-shape 9 × 6 × 10 ft · HDHMR + laminate', pages:1, file:'assets/docs/Homesic-Quote-HS-MVQVPO4X.pdf'},
  {name:'Kitchen pitch · Ashish Raj', kind:'Proposal', amount:null, date:'Oct 2026', spec:'U-shape 9 × 9 ft · sage and oak', pages:13, file:'assets/docs/Kitchen_Pitch_Ashish_Raj.pdf'},
  {name:'Estimator UI brief', kind:'Reference', amount:null, date:'v6', spec:'Internal UI brief · 18 pages', pages:18, file:'assets/docs/modular-kitchen-estimator-ui-brief-v6.pdf'}
];

var S = {
  auth:false, tab:'home', page:'', data:null, sheet:'', filter:'all', appr:'head',
  email:'arjun@homsic.com', password:'demo1234', keep:true,
  project:'villa', viewer:null, thread:'villa', messages:{}, proof:null, proofStatus:'',
  tokenStatus:{}, estimate:null, leaveFrom:'2026-12-01', leaveTo:'2026-12-02'
};
THREADS.forEach(function(t){ S.messages[t.id]=t.msgs.slice(); });

function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function inr(n){ var s=String(Math.round(n)); var last=s.slice(-3), rest=s.slice(0,-3); return '₹'+(rest?rest.replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+last:last); }
function pById(id){ return PROJECTS.filter(function(p){return p.id===id;})[0]; }
function aById(id){ return APPROVALS.filter(function(a){return a.id===id;})[0]; }
function sharePaid(p){ return Math.round(p.paid*0.05); }
function shareAll(p){ return Math.round(p.estimate*0.05); }
function toast(msg){
  var t=document.createElement('div'); t.className='toast'; t.innerHTML='<span class="tick">✓</span>'+esc(msg);
  document.body.appendChild(t); setTimeout(function(){t.classList.add('out');},2200); setTimeout(function(){t.remove();},2600);
}
function go(page,data){ S.page=page; S.data=data||null; S.sheet=''; window.scrollTo(0,0); draw(); }
function tab(t){ S.tab=t; S.page=''; S.sheet=''; draw(); }
function draw(){
  var top=document.getElementById('topbar'), screen=document.getElementById('screen'), tabs=document.getElementById('tabs');
  if(!S.auth){
    top.className='topbar'; top.innerHTML=''; tabs.style.display='none'; tabs.innerHTML=''; screen.innerHTML=authHtml(); return;
  }
  top.className='topbar on'; top.innerHTML=topHtml();
  tabs.style.display='';
  tabs.innerHTML=tabsHtml();
  screen.innerHTML=pageHtml();
  if(S.sheet) screen.insertAdjacentHTML('beforeend',sheetHtml());
}
function topHtml(){
  if(S.page){
    return '<button class="ibtn" data-a="back" aria-label="Back">'+icon('back')+'</button>'+
      '<div class="logo" style="font-size:13px"><span class="mk">H</span>Design partner</div>'+
      '<button class="avatar" data-a="settings" aria-label="Settings">A</button>';
  }
  return '<div class="logo"><span class="mk">H</span><span>HOMESIC</span></div>'+
    '<div style="display:flex;align-items:center;gap:7px"><button class="ibtn" data-a="notifications" aria-label="Notifications">'+icon('bell')+'</button><button class="avatar" data-a="settings" aria-label="Profile">A</button></div>';
}
function pageTitle(){
  var m={project:'Project',token:'Token',upload:'Upload',approval:'Approval',estimate:'Estimate',versions:'Versions',meeting:'Meeting',messages:'Messages',docs:'Documents',payments:'Payments',ledger:'My 5%',leave:'Leave',performance:'Performance',settings:'Settings',viewer:'Render'};
  return m[S.page]||'Design partner';
}
function tabsHtml(){
  var T=[['home','Home',icon('home')],['projects','Projects',icon('folder')],['approvals','Approvals',icon('check')],['meetings','Meetings',icon('cal')],['more','More',icon('more')]];
  return T.map(function(x){return '<button data-a="tab" data-t="'+x[0]+'" '+(S.tab===x[0]&&!S.page?'aria-current="page"':'')+'>'+x[2]+'<span>'+x[1]+'</span></button>';}).join('');
}
function icon(k){
  var p={
    home:'<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/>',
    folder:'<path d="M3.5 6h6l2 2h9v11h-17z"/>',
    check:'<path d="M4 12l5 5L20 6"/>',
    cal:'<rect x="4" y="5.5" width="16" height="14" rx="1.5"/><path d="M8 3v5M16 3v5M4 10h16"/>',
    more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    bell:'<path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7M10.3 19a2 2 0 0 0 3.4 0"/>',
    upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
    doc:'<path d="M7 3h7l4 4v14H7zM10 12h6M10 16h6"/>',
    money:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
    chat:'<path d="M4 5h16v11H9l-5 4z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.3 1a7 7 0 0 0-1.7-1L14.5 3h-4l-.5 3a7 7 0 0 0-1.7 1L6 6.1 4 9.5 6.1 11a7 7 0 0 0 0 2L4 14.5l2 3.4 2.3-1a7 7 0 0 0 1.7 1l.5 3h4l.5-3a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.5c.1-.3.1-.7.1-1z"/>',
    download:'<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>'
  }[k]||'';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
}

/* ---------- auth ---------- */
function authHtml(){
  return '<div class="enter auth">'+
    '<div class="brandmark"><i>H</i>HOMESIC</div>'+
    '<h1>Design partner sign in.</h1>'+
    '<p>Use your business email. The domain is locked to <span class="domain">@homsic.com</span>.</p>'+
    '<div class="card">'+
      '<label class="fl">Business email<input class="field" id="login-email" type="email" value="'+esc(S.email)+'" autocomplete="username"></label>'+
      '<label class="fl" style="margin-top:10px">Password<input class="field" id="login-password" type="password" value="'+esc(S.password)+'" autocomplete="current-password"></label>'+
      '<label class="check" style="display:flex;align-items:flex-start;gap:8px;margin-top:12px"><input type="checkbox" id="login-keep" '+(S.keep?'checked':'')+'><span>Keep me signed in for 15 days on this device.</span></label>'+
      '<button class="btn btn-pri" style="margin-top:14px" data-a="sign-in">Sign in</button>'+
      '<p class="hint" style="margin-top:10px">No create-account link. Ask the MD if you need an account.</p>'+
    '</div>'+
    '<p class="hint" style="text-align:center;margin-top:12px">Demo: arjun@homsic.com · demo1234</p>'+
  '</div>';
}

/* ---------- home ---------- */
function home(){
  var live=PROJECTS.filter(function(p){return p.status==='live';});
  var need=[
    {ico:'q', cls:'cobalt', title:'Send quotation v5 to the Design Head', meta:'Villa 4B · ₹4,00,000 · ready', to:'approval', id:'quote5'},
    {ico:'A', cls:'coral', title:'Approve version 5 in Ms. Rao’s name', meta:'She said “go ahead” on WhatsApp · 24 Nov', to:'approval', id:'client'},
    {ico:'T', cls:'amber', title:'Flat 7 token is due', meta:'₹26,095 · 10% of the accepted estimate', to:'project', id:'flat'}
  ];
  return '<div class="enter">'+
    '<div class="dp-head"><span class="dp-date">Wednesday 25 November 2026</span><h1>Good morning, Arjun.</h1><p>'+live.length+' live projects · 2 approvals need you · 1 token to collect</p></div>'+
    '<div class="need-grid">'+need.map(function(n){return '<div class="need"><span class="ico '+n.cls+'">'+n.ico+'</span><div style="min-width:0"><b>'+esc(n.title)+'</b><span>'+esc(n.meta)+'</span></div><button class="go" data-a="open" data-to="'+n.to+'" data-id="'+n.id+'">Open</button></div>';}).join('')+'</div>'+
    '<div class="sec"><span class="lbl">Live projects</span><button class="textlink" data-a="tab" data-t="projects" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">All</button></div>'+
    '<div class="proj-scroll">'+live.map(projCard).join('')+'</div>'+
    '<div class="sec"><span class="lbl">This week</span><button class="textlink" data-a="tab" data-t="meetings" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">Calendar</button></div>'+
    MEETINGS.slice(0,2).map(meetingRow).join('')+
    '<div class="sec"><span class="lbl">My 5% this month</span><button class="textlink" data-a="open" data-to="ledger" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">Ledger</button></div>'+
    '<div class="card"><div class="row" style="justify-content:space-between"><div><span class="lbl">Earned</span><div class="money">'+inr(PROJECTS.reduce(function(n,p){return n+sharePaid(p);},0))+'</div></div><div style="text-align:right"><span class="lbl">Pending</span><div class="money" style="color:var(--amber-ink)">'+inr(PROJECTS.reduce(function(n,p){return n+shareAll(p);},0)-PROJECTS.reduce(function(n,p){return n+sharePaid(p);},0))+'</div></div></div><p class="hint" style="margin-top:8px">5% of what the client has actually paid. Next pay window: 20th.</p><button class="btn btn-line btn-sm" style="margin-top:10px;width:auto" data-a="open" data-to="ledger">Open my ledger</button></div>'+
  '</div>';
}
function projCard(p){
  return '<button class="proj" data-a="project" data-id="'+p.id+'"><div class="thumb"><img src="'+p.img+'" alt=""></div><div class="pbody"><b>'+esc(p.name)+'</b><span>'+esc(p.client)+' · '+esc(p.stage)+'</span><span class="pill">'+(p.temp?'Token due':'Live')+' · '+p.days+' days left</span></div></button>';
}
function meetingRow(m){
  var st=m.status==='pending'?'<span class="status you">Needs reply</span>':m.status==='rejected'?'<span class="status bad">Rejected</span>':'<span class="status ok">Accepted</span>';
  return '<button class="meeting-row" data-a="meeting" data-id="'+m.id+'"><span class="time">'+esc(m.time)+'</span><div style="min-width:0"><b>'+esc(m.title)+'</b><span>'+esc(m.date)+' · '+esc(m.who)+'</span></div>'+st+'</button>';
}

/* ---------- projects ---------- */
function projects(){
  var list=PROJECTS.filter(function(p){return S.filter==='all'||p.status===S.filter;});
  return '<div class="enter">'+
    '<div class="dp-head"><span class="dp-date">Portfolio</span><h1>Projects</h1><p>'+PROJECTS.length+' projects · '+PROJECTS.filter(function(p){return p.temp;}).length+' waiting for a token</p></div>'+
    '<div class="chips" style="margin:10px 0">'+[['all','All'],['live','Live'],['temp','Temporary']].map(function(f){return '<button class="chip '+(S.filter===f[0]?'on':'')+'" data-a="filter" data-f="'+f[0]+'" aria-pressed="'+(S.filter===f[0])+'">'+f[1]+'</button>';}).join('')+'</div>'+
    list.map(function(p){return '<button class="proj-row" data-a="project" data-id="'+p.id+'"><div class="thumb"><img src="'+p.img+'" alt=""></div><div style="min-width:0"><b>'+esc(p.name)+'</b><span>'+esc(p.client)+' · '+esc(p.stage)+' · '+p.days+' days left</span></div><span class="pill">'+(p.temp?'Token':'Live')+'</span></button>';}).join('')+
    '<div class="sec"><span class="lbl">Temporary projects</span></div>'+
    '<p class="hint">Temporary projects sit before the token. The stage timer starts only after the token is paid.</p>'+
  '</div>';
}

function projectPage(){
  var p=pById(S.project); if(!p) return '';
  var versions=APPROVALS.filter(function(a){return a.project===p.id;});
  return '<div class="enter">'+
    '<div class="card" style="padding:0;overflow:hidden"><div class="thumb" style="height:180px;border-radius:0"><img src="'+p.img+'" alt=""></div><div style="padding:14px">'+
      '<div class="row" style="justify-content:space-between"><div><span class="lbl">'+esc(p.client)+'</span><h2 style="font-size:21px;margin-top:3px">'+esc(p.name)+'</h2><p class="muted" style="font-size:11px;margin-top:2px">'+esc(p.city)+' · '+esc(p.type)+' · '+p.days+' days left</p></div><span class="pill">'+(p.temp?'Token due':'Live')+'</span></div>'+
      '<div class="row" style="margin-top:10px;gap:6px;flex-wrap:wrap"><button class="btn btn-dark btn-sm" style="width:auto" data-a="open" data-to="upload" data-id="'+p.id+'">Upload</button><button class="btn btn-line btn-sm" style="width:auto" data-a="open" data-to="estimate" data-id="'+p.id+'">Estimate</button><button class="btn btn-line btn-sm" style="width:auto" data-a="open" data-to="payments" data-id="'+p.id+'">Payments</button></div>'+
    '</div></div>'+
    '<div class="grid2" style="margin-top:10px"><div class="card"><span class="lbl">Stage</span><div class="money" style="font-size:18px">'+esc(p.stage)+'</div><p class="hint">'+p.stageIdx+' of 14 · '+p.days+' days left</p></div><div class="card"><span class="lbl">Next date</span><div style="font-size:14px;font-weight:800;margin-top:4px">'+esc(p.next)+'</div><p class="hint">Design walkthrough</p></div></div>'+
    (p.temp?tokenCard(p):paymentCard(p))+
    '<div class="sec"><span class="lbl">Approvals on this project</span><button class="textlink" data-a="tab" data-t="approvals" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">All</button></div>'+
    versions.map(function(a){return approvalCard(a);}).join('')+
    '<div class="sec"><span class="lbl">Pinned renders</span><button class="textlink" data-a="open" data-to="versions" data-id="'+p.id+'" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">History</button></div>'+
    '<div class="rgrid"><button data-a="viewer" data-id="kitchen-02-walnut.jpg"><div class="thumb"><img src="assets/renders/kitchen-02-walnut.jpg" alt=""></div></button><button data-a="viewer" data-id="kitchen-03-sage.jpg"><div class="thumb"><img src="assets/renders/kitchen-03-sage.jpg" alt=""></div></button></div>'+
    '<div class="sec"><span class="lbl">Team</span></div><div class="card"><div class="row" style="justify-content:space-between"><div class="row"><div class="avatar">A</div><div><b style="display:block;font-size:12px">Arjun</b><span class="muted" style="font-size:10px">Design partner</span></div></div><span class="status ok">You</span></div><div class="row" style="justify-content:space-between;margin-top:10px"><div class="row"><div class="avatar" style="background:var(--mint-soft);color:var(--mint-ink)">I</div><div><b style="display:block;font-size:12px">Imran</b><span class="muted" style="font-size:10px">Production manager</span></div></div><button class="btn btn-line btn-sm" data-a="call">Call</button></div></div>'+
    '<div class="sec"><span class="lbl">Stage timeline</span><button class="textlink" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)" data-a="timeline">All</button></div>'+
    '<div class="card"><div class="timeline"><div><b>Design · now</b><span>16 Nov → 1 Dec · version 5 with the Design Head</span></div><div><b>Concept · done</b><span>28 Sep → 10 Oct</span></div><div><b>Brief · done</b><span>20 Sep</span></div></div></div>'+
  '</div>';
}
function tokenCard(p){
  var st=S.tokenStatus[p.id]||'due';
  return '<div class="card" style="margin-top:10px"><div class="row" style="justify-content:space-between"><span class="lbl">Token &amp; handover</span><span class="pill">'+(st==='sent'?'Awaiting MD':'Due')+'</span></div>'+
    '<div class="money">'+inr(p.estimate*0.1)+'</div><p class="hint">10% of the accepted estimate · '+esc(p.dueDate)+'</p>'+
    '<div class="btn-row" style="margin-top:10px"><button class="btn btn-pri" data-a="token-request" data-id="'+p.id+'">Send payment request</button><button class="btn btn-line" data-a="proof" data-id="'+p.id+'">Upload proof</button></div>'+
    '<p class="hint" style="margin-top:8px">The client pays on WhatsApp. Upload the proof; the MD confirms before the stage moves.</p></div>';
}
function paymentCard(p){
  return '<div class="card" style="margin-top:10px"><div class="row" style="justify-content:space-between"><span class="lbl">Client payment</span><span class="pill">'+(p.due?'Due '+esc(p.dueDate):'Paid')+'</span></div>'+
    '<div class="money">'+(p.due?inr(p.due):'Paid')+'</div><p class="hint">'+(p.due?'35% near completion · client has paid '+inr(p.paid):'No payment due today')+'</p>'+
    '<div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="open" data-to="payments" data-id="'+p.id+'">Schedule</button><button class="btn btn-pri" data-a="proof" data-id="'+p.id+'">Upload proof</button></div></div>';
}

/* ---------- approvals ---------- */
function approvals(){
  var map={head:['With Design Head','Draft'],client:['Needs you'],rejected:['Restore']};
  var allowed=map[S.appr]||map.head;
  var list=APPROVALS.filter(function(a){return allowed.indexOf(a.status)>=0;});
  return '<div class="enter">'+
    '<div class="dp-head"><span class="dp-date">Design &amp; approvals</span><h1>Approvals</h1><p>Only approved versions reach the client. Older versions stay view-only.</p></div>'+
    '<div class="chips" style="margin:10px 0">'+[['head','To Design Head'],['client','Client'],['rejected','Rejected']].map(function(f){return '<button class="chip '+(S.appr===f[0]?'on':'')+'" data-a="appr-filter" data-f="'+f[0]+'" aria-pressed="'+(S.appr===f[0])+'">'+f[1]+'</button>';}).join('')+'<button class="chip" data-a="open" data-to="upload">+ Upload</button></div>'+
    list.map(approvalCard).join('')+
    '<div class="sec"><span class="lbl">Proxy HOMESIC documents</span><button class="textlink" data-a="open" data-to="docs" style="background:none;border:0;color:var(--cobalt);font:800 11px var(--sans)">All</button></div>'+
    '<p class="hint">Real quotations and proposals used as proxy data. Open them from Documents.</p>'+
  '</div>';
}
function approvalCard(a){
  var p=pById(a.project);
  var st=a.status==='Needs you'?'you':a.status==='With Design Head'?'wait':a.status==='Draft'?'draft':a.status==='Restore'?'bad':'ok';
  return '<button class="approval" data-a="approval" data-id="'+a.id+'"><div class="top"><div style="flex:1"><span class="lbl">'+esc(a.kind)+' · '+esc(p.name)+'</span><b style="display:block;margin-top:3px">'+esc(a.title)+'</b><p>'+esc(a.meta)+'</p></div><span class="status '+st+'">'+esc(a.status)+'</span></div></button>';
}
function approvalPage(){
  var a=aById(S.data); if(!a) return '';
  var p=pById(a.project);
  var body='';
  if(a.kind==='Render'){
    body='<div class="card" style="padding:0;overflow:hidden"><div class="thumb" style="height:200px;border-radius:0"><img src="'+a.img+'" alt=""></div></div><div class="card" style="margin-top:10px"><span class="lbl">Brief of change</span><p style="font-size:12px;margin-top:6px">'+esc(a.brief)+'</p><div class="row" style="margin-top:10px"><button class="btn btn-line btn-sm" data-a="open" data-to="versions" data-id="'+p.id+'">Version history</button><button class="btn btn-pri btn-sm" data-a="send-head" data-id="'+a.id+'">'+(a.status==='With Design Head'?'Resend to Design Head':'Send to Design Head')+'</button></div></div>';
  } else if(a.kind==='Quotation'){
    var q=a.id==='quoteflat'?DOCS[1]:DOCS[0];
    body='<div class="card"><span class="lbl">Estimate · '+esc(p.name)+'</span><div class="money">'+inr(p.estimate)+'</div><p class="hint">Line items, quantities and rates are in the estimate screen.</p><div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="open" data-to="estimate" data-id="'+p.id+'">Open estimate</button><a class="btn btn-line" href="'+q.file+'" target="_blank" rel="noopener" style="text-decoration:none">Proxy PDF</a></div></div><div class="card" style="margin-top:10px"><span class="lbl">Status</span><p style="font-size:12px;margin-top:6px">'+(a.status==='Draft'?'Draft. Send it to the Design Head for approval before the client sees it.':'With the Design Head since 22 Nov. The client sees nothing yet.')+'</p><button class="btn btn-pri" style="margin-top:10px" data-a="send-head" data-id="'+a.id+'">Send for approval</button></div>';
  } else if(a.kind==='Client approval'){
    body='<div class="card"><span class="lbl">Client’s words</span><textarea class="field" id="client-words" style="height:90px;margin-top:8px;padding:10px">She said: “Go ahead with version 5.”</textarea><p class="hint">Timestamp added automatically: 25 Nov 2026 · 08:11</p><button class="btn btn-pri" style="margin-top:10px" data-a="approve-client" data-id="'+a.id+'">Approve v5 in Ms. Rao’s name</button></div>';
  } else if(a.kind==='Client change'){
    body='<div class="card"><span class="lbl">Request</span><p style="font-size:12px;margin-top:6px">'+esc(a.brief)+'</p><label class="fl" style="margin-top:10px">Add-on price<input class="field" id="addon-price" type="number" placeholder="25000"></label><div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="send-change">Send for approval</button><button class="btn btn-pri" data-a="add-addon">Add to quote</button></div></div>';
  } else {
    body='<div class="card"><span class="lbl">Rejected because</span><p style="font-size:12px;margin-top:6px">'+esc(a.brief)+'</p><button class="btn btn-pri" style="margin-top:10px" data-a="restore" data-id="'+a.id+'">Restore as v6</button></div>';
  }
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>'+esc(a.kind)+'</h2><span class="spacer"></span></div>'+
    '<div class="card"><div class="row" style="justify-content:space-between"><div><span class="lbl">'+esc(p.name)+'</span><b style="display:block;font-size:15px;margin-top:3px">'+esc(a.title)+'</b></div><span class="status '+(a.status==='Needs you'?'you':'wait')+'">'+esc(a.status)+'</span></div></div>'+body+'</div>';
}

/* ---------- versions / estimate ---------- */
var VERSIONS=[
  {v:5,date:'22 Nov',img:'assets/renders/kitchen-02-walnut.jpg',brief:'Island moved 150 mm; walnut base.',current:true},
  {v:4,date:'14 Oct',img:'assets/renders/kitchen-01-maroon.jpg',brief:'Kitchen tall units moved.',current:false},
  {v:3,date:'2 Oct',img:'assets/renders/kitchen-03-sage.jpg',brief:'First full set after measurement.',current:false}
];
function versionsPage(){
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Version history</h2><span class="spacer"></span></div>'+
    '<p class="hint">Latest first. Old versions open view-only.</p>'+
    VERSIONS.map(function(v){return '<div class="card" style="margin-top:10px"><div class="row" style="justify-content:space-between"><b>Version '+v.v+'</b><span class="pill">'+(v.current?'Current':'View only')+'</span></div><div class="thumb" style="height:120px;margin-top:8px"><img src="'+v.img+'" alt=""></div><p class="hint">'+esc(v.date)+' · '+esc(v.brief)+'</p><button class="btn btn-line btn-sm" style="margin-top:8px;width:auto" data-a="viewer" data-id="'+v.img.split('/').pop()+'">Open</button></div>';}).join('')+
  '</div>';
}
function estimatePage(){
  var p=pById(S.data||S.project);
  if(!S.estimate) S.estimate=[{d:'Kitchen carcass and shutters',q:1,r:210000},{d:'Walk-in wardrobe',q:1,r:125000},{d:'Island, worktop and fittings',q:1,r:65000}];
  var total=S.estimate.reduce(function(n,l){return n+l.q*l.r;},0);
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Estimate</h2><span class="spacer"></span></div>'+
    '<div class="card"><span class="lbl">'+esc(p.name)+' · '+esc(p.client)+'</span><div class="money">'+inr(total)+'</div><p class="hint">Latest version · draft for the Design Head</p></div>'+
    '<div class="card" style="margin-top:10px">'+S.estimate.map(function(l,i){return '<div class="estimate-line"><div><b>'+esc(l.d)+'</b><span>Qty '+l.q+' · '+inr(l.r)+' each</span></div><span class="amt">'+inr(l.q*l.r)+'</span></div>';}).join('')+
      '<button class="btn btn-line btn-sm" style="margin-top:10px;width:auto" data-a="add-line">Add a line</button></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Documents</span><a href="'+DOCS[0].file+'" target="_blank" rel="noopener" class="doc-row" style="margin-top:8px"><span class="fico" style="background:#2E4BF2">'+icon('doc')+'</span><span style="min-width:0"><b>Quotation HS-MVQU55NO</b><span class="muted">Proxy PDF · '+inr(372099)+'</span></span><span class="btn btn-line btn-sm">Open</span></a><button class="btn btn-pri" style="margin-top:10px" data-a="send-estimate" data-id="'+p.id+'">Send to Design Head</button></div>'+
  '</div>';
}

/* ---------- meetings ---------- */
function meetings(){
  var pending=MEETINGS.filter(function(m){return m.status==='pending';});
  return '<div class="enter">'+
    '<div class="dp-head"><span class="dp-date">This week</span><h1>Meetings</h1><p>Accept or reject every meeting you are tagged in. A rejection needs a written reason.</p></div>'+
    (pending.length?'<div class="sec"><span class="lbl">Needs your reply</span></div>'+pending.map(meetingRow).join(''):'')+
    '<div class="day-lbl">Today · Tue 24 Nov</div>'+MEETINGS.filter(function(m){return m.day==='Today'&&m.status!=='pending';}).map(meetingRow).join('')+
    '<div class="day-lbl">Tomorrow · Wed 25 Nov</div>'+MEETINGS.filter(function(m){return m.day==='Tomorrow'&&m.status!=='pending';}).map(meetingRow).join('')+
    '<div class="day-lbl">Thu 26 Nov</div>'+MEETINGS.filter(function(m){return m.day==='Thu 26 Nov'&&m.status!=='pending';}).map(meetingRow).join('')+
  '</div>';
}
function meetingPage(){
  var m=MEETINGS.filter(function(x){return x.id===S.data;})[0]; if(!m) return '';
  return '<div class="enter"><div class="card"><span class="lbl">'+esc(m.date)+' · '+esc(m.time)+'</span><h2 style="font-size:20px;margin-top:4px">'+esc(m.title)+'</h2><p class="hint" style="margin-top:4px">'+esc(m.who)+'</p><div class="row" style="margin-top:12px;gap:8px"><a class="btn btn-pri" href="'+m.link+'" target="_blank" rel="noopener" style="text-decoration:none">Join Google Meet</a><button class="btn btn-line" data-a="copy" data-t="'+m.link+'">Copy link</button></div></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Your reply</span><div class="row" style="margin-top:6px"><span class="status '+(m.status==='accepted'?'ok':'you')+'">'+(m.status==='accepted'?'Accepted':'Needs reply')+'</span></div><div class="btn-row" style="margin-top:10px"><button class="btn btn-pri" data-a="accept-meet" data-id="'+m.id+'">Accept</button><button class="btn btn-line" data-a="reject-meet" data-id="'+m.id+'">Reject with reason</button></div></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Transcript &amp; notes</span><p class="hint">A transcript is attached after the meeting. Only the people tagged can open it.</p><button class="btn btn-line btn-sm" style="margin-top:8px;width:auto" data-a="toast" data-m="Transcript is attached after the meeting">Open transcript</button></div>'+
  '</div>';
}

/* ---------- messages / docs / ledger / payments ---------- */
function messagesPage(){
  var th=S.thread, msgs=S.messages[th]||[];
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Messages</h2><span class="spacer"></span></div>'+
    '<div class="thread-list">'+THREADS.map(function(t){return '<button class="thread-btn '+(th===t.id?'on':'')+'" data-a="thread" data-id="'+t.id+'"><span class="av">'+t.av+'</span><div style="min-width:0"><b>'+esc(t.name)+'</b><span>'+esc(t.meta)+'</span></div></button>';}).join('')+'</div>'+
    '<div class="sec"><span class="lbl">'+esc(THREADS.filter(function(t){return t.id===th;})[0].name)+'</span></div>'+
    '<div class="card" style="display:flex;flex-direction:column;gap:8px;background:#F9FAFE">'+msgs.map(function(m){return '<div class="bubble '+(m.me?'me':'')+'" style="'+(m.me?'align-self:flex-end':'')+'"><span>'+esc(m.who)+' · '+esc(m.at)+'</span>'+esc(m.t)+'</div>';}).join('')+
      '<div class="composer"><input id="msg-text" placeholder="Write a message"><button class="btn btn-pri" data-a="send-msg">Send</button></div></div>'+
    '<p class="hint">Outside 24 hours, a template is required. Inside the window, a free-text message is allowed.</p>'+
  '</div>';
}
function docsPage(){
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Documents</h2><span class="spacer"></span></div>'+
    '<p class="hint">Proxy HOMESIC quotations and proposals for layout testing. They are not Ms. Rao’s contract.</p>'+
    DOCS.map(function(d){return '<a class="doc-row" href="'+d.file+'" target="_blank" rel="noopener"><span class="fico" style="background:#2E4BF2">'+icon('doc')+'</span><span style="min-width:0"><b>'+esc(d.name)+'</b><span class="muted">'+esc(d.kind)+' · '+esc(d.date)+'<br>'+esc(d.spec)+'</span><span class="tagcat" style="background:#E7EAFE;color:#2E4BF2">PDF · '+d.pages+' page'+(d.pages>1?'s':'')+'</span></span><span class="btn btn-line btn-sm">Open</span></a>';}).join('')+
  '</div>';
}
function ledgerPage(){
  var paid=PROJECTS.reduce(function(n,p){return n+sharePaid(p);},0);
  var all=PROJECTS.reduce(function(n,p){return n+shareAll(p);},0);
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>My 5%</h2><span class="spacer"></span></div>'+
    '<div class="card"><span class="lbl">Earned from paid stages</span><div class="money">'+inr(paid)+'</div><p class="hint">5% of what clients have actually paid. Pending on the rest: '+inr(all-paid)+'.</p></div>'+
    '<div class="card" style="margin-top:10px"><div class="row" style="justify-content:space-between"><span class="lbl">Villa 4B</span><span class="pill">5%</span></div>'+
      '<div class="ledger-row"><span class="k">Token · ₹40,000 paid</span><span class="v">₹2,000</span></div><div class="ledger-row"><span class="k">Before production · ₹2,00,000 paid</span><span class="v">₹10,000</span></div><div class="ledger-row"><span class="k">Near completion · ₹1,40,000 due</span><span class="v" style="color:var(--amber-ink)">₹7,000</span></div><div class="ledger-row"><span class="k">At handover · ₹20,000</span><span class="v">₹1,000</span></div></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Pay windows</span><div class="ledger-row"><span class="k">10th</span><span class="v">₹4,000</span></div><div class="ledger-row"><span class="k">20th</span><span class="v">₹8,000</span></div><div class="ledger-row"><span class="k">30th</span><span class="v">₹8,000</span></div><p class="hint" style="margin-top:8px">The share is tied to client payments. It is not a salary.</p></div>'+
  '</div>';
}
function paymentsPage(){
  var p=pById(S.data||'villa');
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Payments</h2><span class="spacer"></span></div>'+
    '<div class="card"><span class="lbl">'+esc(p.name)+'</span><div class="money">'+(p.due?inr(p.due):'No due')+'</div><p class="hint">'+esc(p.client)+' · '+(p.due?'due '+esc(p.dueDate):'paid so far '+inr(p.paid))+'</p></div>'+
    '<div class="card" style="margin-top:10px"><div class="row" style="justify-content:space-between"><span class="lbl">Schedule</span><span class="pill">10 / 50 / 35 / 5</span></div>'+
      '<div class="ledger-row"><span class="k">Token 10%</span><span class="v">'+inr(p.estimate*0.1)+'</span></div><div class="ledger-row"><span class="k">Before production 50%</span><span class="v">'+inr(p.estimate*0.5)+'</span></div><div class="ledger-row"><span class="k">Near completion 35%</span><span class="v">'+inr(p.estimate*0.35)+'</span></div><div class="ledger-row"><span class="k">At handover 5%</span><span class="v">'+inr(p.estimate*0.05)+'</span></div></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Payment request</span><p class="hint" style="margin-top:6px">Send the amount and due date on WhatsApp, then upload the proof the client sends.</p><div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="toast" data-m="Payment request sent on WhatsApp">Send request</button><button class="btn btn-pri" data-a="proof" data-id="'+p.id+'">Upload proof</button></div></div>'+
    '<button class="btn btn-line" style="margin-top:10px" data-a="ledger">Open my 5% ledger</button>'+
  '</div>';
}
function leavePage(){
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Leave</h2><span class="spacer"></span></div>'+
    '<div class="card"><label class="fl">From<input class="field" id="leave-from" type="date" value="'+S.leaveFrom+'"></label><label class="fl" style="margin-top:10px">To<input class="field" id="leave-to" type="date" value="'+S.leaveTo+'"></label><label class="fl" style="margin-top:10px">Reason (optional)<textarea class="field" id="leave-reason" style="height:70px;padding:10px"></textarea></label><p class="hint">Approver: Meera, Design Head.</p><button class="btn btn-pri" style="margin-top:10px" data-a="apply-leave">Apply for leave</button></div>'+
  '</div>';
}
function performancePage(){
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>My performance</h2><span class="spacer"></span></div>'+
    '<div class="card"><span class="lbl">Rating</span><div class="money">4.8 / 5</div><p class="hint">11 client ratings · 12 stages completed this week.</p></div>'+
    '<div class="card" style="margin-top:10px"><span class="lbl">Stage history</span><div class="timeline" style="margin-top:10px"><div><b>Design approved</b><span>Villa 4B · 22 Nov</span></div><div><b>Quotation v5 sent</b><span>Villa 4B · 2 Nov</span></div><div><b>Token collected</b><span>Flat 7 · 28 Oct</span></div></div></div>'+
  '</div>';
}
function settingsPage(){
  return '<div class="enter"><div class="bar"><span class="spacer"></span><h2>Settings</h2><span class="spacer"></span></div>'+
    '<div class="card"><div class="row"><div class="avatar" style="width:46px;height:46px;font-size:15px">A</div><div><b style="font-size:14px">Arjun</b><div class="muted" style="font-size:11px">'+esc(ME.email)+'</div><div class="muted" style="font-size:10px">Design partner</div></div></div></div>'+
    '<div class="card" style="margin-top:10px"><div class="ledger-row"><span class="k">Company WhatsApp</span><span class="v">'+OFFICE.tel+'</span></div><div class="ledger-row"><span class="k">Kept signed in</span><span class="v">15 days</span></div><div class="ledger-row"><span class="k">Sessions</span><span class="v">Chrome · Mumbai</span></div></div>'+
    '<button class="more-row" data-a="open" data-to="performance" style="margin-top:10px"><span class="ico">'+icon('user')+'</span><div><b>My performance</b><span>Rating and stage history</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="docs"><span class="ico">'+icon('doc')+'</span><div><b>Documents</b><span>Proxy HOMESIC PDFs</span></div><span class="chev">›</span></button>'+
    '<a class="more-row" href="../client-app-mobile/index.html" style="text-decoration:none"><span class="ico">'+icon('arrow')+'</span><div><b>Open the client app</b><span>See the client-facing view</span></div><span class="chev">›</span></a>'+
    '<button class="btn btn-line" style="margin-top:10px" data-a="sign-out">Sign out</button>'+
  '</div>';
}

/* ---------- more ---------- */
function more(){
  return '<div class="enter"><div class="dp-head"><span class="dp-date">Account</span><h1>More</h1><p>Money, messages, documents and the things that are not project work.</p></div>'+
    '<button class="more-row" data-a="open" data-to="payments"><span class="ico">'+icon('money')+'</span><div><b>Client payments</b><span>Schedule, request and proof</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="ledger"><span class="ico">'+icon('money')+'</span><div><b>My 5% share</b><span>'+inr(PROJECTS.reduce(function(n,p){return n+sharePaid(p);},0))+' earned · '+inr(PROJECTS.reduce(function(n,p){return n+shareAll(p);},0)-PROJECTS.reduce(function(n,p){return n+sharePaid(p);},0))+' pending</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="messages"><span class="ico">'+icon('chat')+'</span><div><b>Messages</b><span>Client, group and Design Head</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="docs"><span class="ico">'+icon('doc')+'</span><div><b>Documents</b><span>6 proxy HOMESIC PDFs</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="leave"><span class="ico">'+icon('cal')+'</span><div><b>Leave</b><span>Apply and see your approver</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="performance"><span class="ico">'+icon('user')+'</span><div><b>Performance</b><span>Rating 4.8 · 12 stages this week</span></div><span class="chev">›</span></button>'+
    '<button class="more-row" data-a="open" data-to="settings"><span class="ico">'+icon('gear')+'</span><div><b>Settings</b><span>Email, sessions and sign out</span></div><span class="chev">›</span></button>'+
    '<a class="more-row" href="../client-app-mobile/index.html" style="text-decoration:none"><span class="ico">'+icon('arrow')+'</span><div><b>Open the client app</b><span>Switch to Ms. Rao’s view</span></div><span class="chev">›</span></a>'+
    '<p class="hint">Design partner · 5% of client payments, not a salary. Pay windows 10th, 20th and 30th.</p>'+
  '</div>';
}

/* ---------- sheet ---------- */
function sheetHtml(){
  var body='';
  if(S.sheet==='proof'){
    body='<h2 style="font-size:19px">Payment proof</h2><p class="hint">Upload the screenshot the client sent on WhatsApp. The MD confirms it.</p>'+
      '<label class="fl" style="margin-top:12px">Proof image<input class="field" id="proof-file" type="file" accept="image/*"></label>'+
      '<label class="fl" style="margin-top:10px">Amount the client says they paid<input class="field" id="proof-amt" type="number" value="'+(S.data?pById(S.data).due||pById(S.data).estimate*0.1:140000)+'"></label>'+
      '<button class="btn btn-pri" style="margin-top:12px" data-a="send-proof">Send to the MD</button>';
  } else if(S.sheet==='reject'){
    body='<h2 style="font-size:19px">Reject the meeting</h2><p class="hint">A written reason is required.</p><textarea class="field" id="reject-reason" style="height:90px;padding:10px;margin-top:10px"></textarea><div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="close-sheet">Cancel</button><button class="btn btn-pri" data-a="confirm-reject">Reject</button></div>';
  } else if(S.sheet==='addon'){
    body='<h2 style="font-size:19px">Turn into an add-on</h2><p class="hint">Add a price and send it for approval.</p><input class="field" id="addon-price" type="number" placeholder="25000" style="margin-top:10px"><div class="btn-row" style="margin-top:10px"><button class="btn btn-line" data-a="close-sheet">Cancel</button><button class="btn btn-pri" data-a="add-addon">Add to quote</button></div>';
  }
  return '<div class="sheet-inline"><div class="shade" data-a="close-sheet"></div><div class="panel">'+body+'</div></div>';
}

/* ---------- router ---------- */
function pageHtml(){
  if(S.page==='viewer'){
    return '<div class="viewer"><div class="vbar"><button class="ibtn" data-a="back" style="background:#17162A;border-color:#17162A">'+icon('close')+'</button><span style="font:500 14px var(--sans)">Render</span><span class="spacer"></span></div><div class="stageimg"><img src="assets/renders/'+esc(S.data)+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div><div class="vfoot"><button class="btn btn-line btn-sm" data-a="download">Download</button><button class="btn btn-line btn-sm" data-a="back">Close</button></div></div>';
  }
  switch(S.page){
    case 'project': return projectPage();
    case 'approval': return approvalPage();
    case 'versions': return versionsPage();
    case 'estimate': return estimatePage();
    case 'meeting': return meetingPage();
    case 'messages': return messagesPage();
    case 'docs': return docsPage();
    case 'ledger': return ledgerPage();
    case 'payments': return paymentsPage();
    case 'leave': return leavePage();
    case 'performance': return performancePage();
    case 'settings': return settingsPage();
    case 'upload': return uploadPage();
    case 'token': return tokenPage();
    default: break;
  }
  switch(S.tab){
    case 'projects': return projects();
    case 'approvals': return approvals();
    case 'meetings': return meetings();
    case 'more': return more();
    default: return home();
  }
}
function uploadPage(){
  var p=pById(S.data||S.project);
  return '<div class="enter"><div class="card"><span class="lbl">'+esc(p.name)+'</span><h2 style="font-size:20px;margin-top:4px">Upload a version</h2><p class="hint">A render or a quotation. The Design Head approves before the client sees it.</p>'+
    '<div class="chips" style="margin-top:10px"><button class="chip on">Render</button><button class="chip">Quotation</button></div>'+
    '<label class="fl" style="margin-top:10px">File<input class="field" id="upload-file" type="file" accept="image/*,.pdf"></label>'+
    '<label class="fl" style="margin-top:10px">Brief of what changed<textarea class="field" style="height:70px;padding:10px" placeholder="Island moved 150 mm"></textarea></label>'+
    '<div class="btn-row" style="margin-top:12px"><button class="btn btn-line" data-a="toast" data-m="Saved as draft">Save draft</button><button class="btn btn-pri" data-a="send-upload">Send to Design Head</button></div></div></div>';
}
function tokenPage(){
  var p=pById(S.data||'flat');
  return '<div class="enter">'+tokenCard(p)+'<div class="card" style="margin-top:10px"><span class="lbl">Status</span><p class="hint" style="margin-top:6px">The project stays temporary until the token is paid. The MD confirms the proof.</p></div></div>';
}

/* ---------- actions ---------- */
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-a]'); if(!el) return;
  var a=el.getAttribute('data-a'), id=el.getAttribute('data-id');
  if(a==='tab'){ tab(el.getAttribute('data-t')); return; }
  if(a==='back'){ S.page=''; S.sheet=''; draw(); return; }
  if(a==='open'){ if(el.getAttribute('data-to')==='project') S.project=id; go(el.getAttribute('data-to'),id); return; }
  if(a==='project'){ S.project=id; go('project',id); return; }
  if(a==='approval'){ go('approval',id); return; }
  if(a==='meeting'){ go('meeting',id); return; }
  if(a==='thread'){ S.thread=id; draw(); return; }
  if(a==='viewer'){ go('viewer',id); return; }
  if(a==='filter'){ S.filter=el.getAttribute('data-f'); draw(); return; }
  if(a==='appr-filter'){ S.appr=el.getAttribute('data-f'); draw(); return; }
  if(a==='close-sheet'){ S.sheet=''; draw(); return; }
  if(a==='sign-in'){
    var em=(document.getElementById('login-email')||{}).value||'', pw=(document.getElementById('login-password')||{}).value||'';
    if(em.indexOf('@homsic.com')<0){ toast('Use your @homsic.com email'); return; }
    if(pw.length<4){ toast('Enter your password'); return; }
    S.email=em; S.password=pw; S.keep=!!(document.getElementById('login-keep')||{}).checked; S.auth=true; S.tab='home'; draw(); return;
  }
  if(a==='sign-out'){ S.auth=false; S.page=''; draw(); return; }
  if(a==='toast'){ toast(el.getAttribute('data-m')||'Done'); return; }
  if(a==='call'){ toast('Calling '+OFFICE.tel+' · prototype'); return; }
  if(a==='notifications'){ toast('No new notifications'); return; }
  if(a==='send-head'){ var ap=aById(id); if(ap){ ap.status='With Design Head'; toast('Sent to the Design Head'); draw(); } return; }
  if(a==='approve-client'){ var ac=aById(id); if(ac){ ac.status='Approved'; toast('Approved in Ms. Rao’s name'); draw(); } return; }
  if(a==='restore'){ var ar=aById(id); if(ar){ ar.status='Restored as v6'; toast('Restored as v6'); draw(); } return; }
  if(a==='add-addon'){ var val=(document.getElementById('addon-price')||{}).value; if(!val){ toast('Add a price'); return; } toast('Add-on '+inr(Number(val))+' added to the quote'); S.sheet=''; draw(); return; }
  if(a==='send-change'){ toast('Change sent for approval'); return; }
  if(a==='token-request'){ S.tokenStatus[id]='sent'; toast('Token request sent on WhatsApp'); draw(); return; }
  if(a==='proof'){ S.data=id; S.sheet='proof'; draw(); return; }
  if(a==='send-proof'){ S.sheet=''; S.proofStatus='with-md'; toast('Proof sent to the MD'); draw(); return; }
  if(a==='send-msg'){
    var input=document.getElementById('msg-text'), text=(input&&input.value||'').trim(); if(!text) return;
    S.messages[S.thread].push({who:'You',me:true,t:text,at:'Now'}); draw(); return;
  }
  if(a==='accept-meet'){ var m=MEETINGS.filter(function(x){return x.id===id;})[0]; if(m){m.status='accepted'; toast('Meeting accepted'); draw();} return; }
  if(a==='reject-meet'){ S.sheet='reject'; S.data=id; draw(); return; }
  if(a==='confirm-reject'){ var reason=(document.getElementById('reject-reason')||{}).value||''; if(!reason.trim()){ toast('Write a reason'); return; } var mm=MEETINGS.filter(function(x){return x.id===S.data;})[0]; if(mm) mm.status='rejected'; S.sheet=''; toast('Meeting rejected'); draw(); return; }
  if(a==='send-estimate'){ toast('Estimate sent to the Design Head'); return; }
  if(a==='add-line'){ S.estimate.push({d:'New line',q:1,r:0}); draw(); return; }
  if(a==='send-upload'){ toast('Version sent to the Design Head'); S.page=''; draw(); return; }
  if(a==='apply-leave'){ toast('Leave request sent to Meera'); return; }
  if(a==='download'){ toast('Downloads start from the installed app'); return; }
  if(a==='copy'){ if(navigator.clipboard) navigator.clipboard.writeText(el.getAttribute('data-t')); toast('Copied'); return; }
  if(a==='timeline'){ toast('Full stage history is in the project log'); return; }
  if(a==='ledger'){ go('ledger'); return; }
});
document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&S.sheet){S.sheet='';draw();} });
document.addEventListener('change',function(e){
  if(e.target.id==='proof-file'&&e.target.files&&e.target.files[0]){ S.proof=e.target.files[0].name; }
});

var q=new URLSearchParams(location.search);
if(q.get('demo')){
  S.auth=true;
  var d=q.get('demo');
  if(d==='home'){S.tab='home';}
  else if(d==='projects'){S.tab='projects';}
  else if(d==='approvals'){S.tab='approvals';}
  else if(d==='meetings'){S.tab='meetings';}
  else if(d==='more'){S.tab='more';}
  else if(d==='project'){S.tab='projects';S.page='project';S.project='villa';S.data='villa';}
  else if(d==='approval'){S.tab='approvals';S.page='approval';S.data='quote5';}
  else if(d==='estimate'){S.tab='projects';S.page='estimate';S.data='villa';}
  else if(d==='docs'){S.page='docs';}
  else if(d==='ledger'){S.page='ledger';}
  else if(d==='messages'){S.page='messages';}
  else if(d==='settings'){S.page='settings';}
  else if(d==='meeting'){S.tab='meetings';S.page='meeting';S.data='m2';}
  else if(d==='auth'){S.auth=false;}
}
draw();
window.dpApp={get state(){return S;},draw:draw};
})();
