/* First Light · the mobile model and seed. The desktop build uses the same generator with an
   inline copy of the model; MOBILE_APP_GUIDE.md, section 12, records where the two can drift. */

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


/* ======================= v2 DATA: teams · meetings · whatsapp ======================= */

function meetCode(s){
  let h=2166136261;
  for(const c of s){ h^=c.charCodeAt(0); h=Math.imul(h,16777619)>>>0; }
  const al='abcdefghijkmnopqrstuvwxyz';
  let out='';
  for(let i=0;i<3;i++){ for(let j=0;j<4;j++){ h=(Math.imul(h,1103515245)+12345)>>>0; out+=al[(h>>>16)%al.length]; } if(i<2) out+='-'; }
  return out;
}

function buildMsgs(p,i){
  const dp=staff.find(s=>s.id===p.dp), rp=staff.find(s=>s.id===p.rep);
  const who={ client:p.client, dp:dp?dp.name:'Design partner', rep:rp?rp.name:'Sales rep' };
  const seeds=[
    ['client','Sharing the updated plan — please check the kitchen elevation.'],
    ['dp','Looks right. I have added the two extra drawers you asked for.'],
    ['client','Perfect. When can we start on site?'],
    ['rep','Site is free from Monday; I will confirm the crew today.'],
    ['client','@Arya Kumar can we hold the handover before the 12th?'],
    ['dp','Possible, if the laminate lands by Wednesday.'],
    ['client','Next stage payment is done — sending the screenshot.'],
    ['rep','Received. Forwarding to the MD for confirmation.'],
    ['dp','Sample boards attached for the wardrobe finish.'],
    ['client','Approved. Go ahead with this one.']
  ];
  return seeds.map(([r,t],k)=>({
    id:p.id+'-M'+k, role:r, name:who[r], text:t,
    at:new Date(TODAY.getTime()-(10-k)*3*3600000-(i%5)*3600000),
    tag:/@/.test(t)
  }));
}

projects.forEach((p,i)=>{
  p.team=[p.dp,p.pm,p.rep].filter(Boolean);
  const dis=designers[i%designers.length];
  if(dis && !p.team.includes(dis.id)) p.team.push(dis.id);
  if(i%4===0){ const extra=pms[(i+2)%pms.length]; if(extra && !p.team.includes(extra.id)) p.team.push(extra.id); }
  p.meetLink='https://meet.google.com/'+meetCode(p.id);
  p.msgs=buildMsgs(p,i);
  p.msgs.forEach(m=>{ m.projectId=p.id; });
});

/* design approvals are client-facing, so they belong with the client */
[0,1,2].forEach(k=>{
  const p=projects[k*7];
  approvals.push({ id:'APR-D'+k, type:'Design', title:'Render approval · '+p.name, sub:p.client+' · kitchen elevation',
    amount:0, ageH:6+k*9, projectId:p.id, person:p.dp, status:'pending' });
});

const meetings=[];
function mkMeeting(p,past,seed){
  const d=new Date(TODAY.getTime()+(past?-1:1)*(seed%9+1)*86400000);
  const parts=p.team.map((id,n)=>({ id, rsvp: past?'accepted':['accepted','accepted','pending','declined','pending'][n%5] }));
  return {
    id:'MTG-'+p.id+(past?'-P':'-U-'+seed),
    title:(past?'Site review · ':'Design walkthrough · ')+p.name,
    projectId:p.id, client:p.client, date:d,
    hour:9+((seed*5)%9), minute:[0,15,30,45][seed%4], duration:45,
    agenda:past?'Walk the site, confirm measurements, note snags.':'Review the latest renders with the client and agree the laminate.',
    link:p.meetLink, participants:parts, past, projectName:p.name,
    notes:past?'Client approved the kitchen layout. Wardrobe finish pending the sample.':'',
    transcript:past?'Ravi (client): the island feels tight. DP: we can pull it 150mm toward the window…':'',
    files:past?['Layout plan v3','Snag list.pdf']:[]
  };
}
projects.forEach((p,i)=>{
  if(i%2===0) meetings.push(mkMeeting(p,true,i+1));
  if(i%3===0) meetings.push(mkMeeting(p,false,i+2));
});

const salaries=staff.filter(s=>s.role!=='Managing Director').map((s,i)=>({
  id:'SAL-'+s.id, person:s.id,
  amount:[48000,62000,85000,110000,175000][i%5],
  due:new Date(2026,10,28),
  status:i%5===0?'paid':'due'
}));

function projSets(p,i){
  const mk=(v,age)=>({
    version:'v'+v, at:new Date(TODAY.getTime()-age*86400000),
    files:[
      {type:'render', short:'Kitchen render', version:'v'+v, size:4.2, hue:(i*47+v*31)%360},
      {type:'render', short:'Wardrobe render', version:'v'+v, size:3.6, hue:(i*47+v*31+47)%360},
      {type:'render', short:'Living render', version:'v'+v, size:3.1, hue:(i*47+v*31+94)%360},
      {type:'quote', short:'Quotation', version:'rev '+(v+1), size:0.4},
      {type:'invoice', short:'Invoice', version:'INV-2'+String(100+v), size:0.2}
    ].map((f,k)=>({...f, id:p.id+'-'+v+'-'+k, projectId:p.id,
      at:new Date(TODAY.getTime()-age*86400000)}))
  });
  return [mk(3,2), mk(2,12), mk(1,24)];
}
projects.forEach((p,i)=>{ p.fileSets=projSets(p,i); p.files=p.fileSets.flatMap(s=>s.files); });

const upMeetings=()=>meetings.filter(m=>!m.past).sort((a,b)=>a.date-b.date);
const pastMeetings=()=>meetings.filter(m=>m.past).sort((a,b)=>b.date-a.date);
const meetingsOf=p=>meetings.filter(m=>m.projectId===p.id);
const mentions=[]; projects.forEach(p=>p.msgs.filter(m=>m.tag).forEach(m=>mentions.push({...m, project:p.name})));
const convOf=p=>p.msgs;
const rsvpCount=m=>m.participants.reduce((a,x)=>{a[x.rsvp]=(a[x.rsvp]||0)+1;return a;},{});


