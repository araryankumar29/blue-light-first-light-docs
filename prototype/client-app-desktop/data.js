/* First Light · client desktop prototype data. The same model as the client mobile build. */

const CLIENT = {name:'Ms. Rao', phone:'9810095028', display:'9810095028', email:''};
const OFFICE = {tel:'+91 85270 25058', tel2:'+91 82104 54320', email:'care@homsic.com'};
const PROJECT = {name:'Villa 4B', city:'Gurugram', type:'Villa', stage:5, daysLeft:9, target:15};
const MEET_LINK = 'https://meet.google.com/vb4b-demo';
const TOTAL = 400000;

const STAGES = [
  ['Enquiry','done','2 Sep'],['Call','done','4 Sep'],['Site survey','done','12 Sep'],['Brief','done','20 Sep'],
  ['Concept','done','28 Sep'],['Design','now','16 Nov'],['Quotation','next',''],['Token','next',''],
  ['Design approval','next',''],['Production','next',''],['Deliveries','next',''],['Installation','next',''],
  ['Snags','next',''],['Handover','next','']
];

const STAGE_INFO = {
  5:{title:'Design',start:'16 Nov',end:'1 Dec',days:9,need:'Nothing from you right now. The studio is finishing the design, and we will send the final render and quotation for your approval.',ill:'draft'},
  4:{title:'Concept',start:'28 Sep',end:'10 Oct',days:0,need:'Completed. You approved the concept on 10 Oct.',ill:'plan'},
  6:{title:'Quotation',start:'Next',end:'',days:0,need:'Review quotation v5 and accept it once the design is approved.',ill:'quote'}
};

const PAYS = [
  {k:'token',label:'Token',pct:10,status:'paid',date:'3 Oct'},
  {k:'mid',label:'Before production',pct:50,status:'paid',date:'20 Oct'},
  {k:'inst',label:'Near completion',pct:35,status:'due',date:'14 Dec'},
  {k:'final',label:'At handover',pct:5,status:'later',date:'On handover'}
];

const RENDERS = [
  {id:'r1',v:5,name:'Kitchen and island',kind:'kitchen',img:'assets/renders/kitchen-02-walnut.jpg',date:'22 Nov',brief:'Warm walnut base, stone top and a clear island worktop. Proxy render.'},
  {id:'r2',v:5,name:'Kitchen wall',kind:'kitchen',img:'assets/renders/kitchen-03-sage.jpg',date:'22 Nov',brief:'Sage shutters, glass wall units and concealed lighting. Proxy render.'},
  {id:'r3',v:5,name:'Villa 4B facade',kind:'villa',img:'assets/renders/villa-03-tropical.jpg',date:'22 Nov',brief:'Timber screen and planted terraces at the entrance. Proxy render.'},
  {id:'r4',v:4,name:'Villa facade, earlier round',kind:'villa',img:'assets/renders/villa-05-di-an.jpg',date:'14 Oct',brief:'Earlier facade study before the screen was approved.'},
  {id:'r5',v:3,name:'Kitchen, round 3',kind:'kitchen',img:'assets/renders/kitchen-01-maroon.jpg',date:'2 Oct',brief:'First full kitchen set after measurement.'},
  {id:'r6',v:2,name:'Bedroom, round 2',kind:'bedroom',date:'18 Sep',brief:'Bedroom layout before the reading lights were added.'},
  {id:'r7',v:1,name:'First concept',kind:'living',date:'4 Sep',brief:'First concept board.'}
];

const PROXY_DOCS = [
  {id:'q55',name:'Quotation HS-MVQU55NO',kind:'Quote',amount:372099,date:'27 Oct 2026',spec:'L-shape 8 × 6 × 10 ft · HDHMR + PU',pages:1,file:'assets/docs/Homesic-Quote-HS-MVQU55NO.pdf'},
  {id:'q7w',name:'Quotation HS-MVML7W13',kind:'Quote',amount:260946,date:'24 Oct 2026',spec:'Straight · BWP ply + Acrylic',pages:1,file:'assets/docs/Homesic-Quote-HS-MVML7W13.pdf'},
  {id:'prop',name:'Proposal HS-MVML7W13',kind:'Proposal',amount:260946,date:'24 Oct 2026',spec:'13-page kitchen proposal · straight',pages:13,file:'assets/docs/Homesic-Proposal-HS-MVML7W13.pdf'},
  {id:'q4x',name:'Quotation HS-MVQVPO4X',kind:'Quote',amount:262773,date:'27 Oct 2026',spec:'L-shape 9 × 6 × 10 ft · HDHMR + laminate',pages:1,file:'assets/docs/Homesic-Quote-HS-MVQVPO4X.pdf'},
  {id:'pitch',name:'Kitchen pitch · Ashish Raj',kind:'Proposal',amount:null,date:'Oct 2026',spec:'U-shape 9 × 9 ft · sage and oak',pages:13,file:'assets/docs/Kitchen_Pitch_Ashish_Raj.pdf'},
  {id:'brief',name:'Modular kitchen estimator brief',kind:'Reference',amount:null,date:'v6',spec:'Internal UI brief · 18 pages',pages:18,file:'assets/docs/modular-kitchen-estimator-ui-brief-v6.pdf'}
];

const ROUNDS = [
  {v:5,date:'2 Nov',current:true,brief:'Island moved 150 mm; wardrobe finish approved; quotation and drawings reissued together.'},
  {v:4,date:'14 Oct',current:false,brief:'Kitchen tall units moved to the window wall; quotation reissued.'},
  {v:3,date:'2 Oct',current:false,brief:'First full set after measurement.'},
  {v:2,date:'18 Sep',current:false,brief:'Concept revisions after the second call.'},
  {v:1,date:'4 Sep',current:false,brief:'First concept board.'}
];

const FILES = [
  {id:'q5',v:5,cat:'Quotations',name:'Quotation · version 5',meta:'Current · 2 Nov',open:'quote',brief:'Island moved 150 mm; wardrobe finish approved.'},
  {id:'q4',v:4,cat:'Quotations',name:'Quotation · version 4',meta:'Earlier · view only · 14 Oct',open:'quote',brief:'Kitchen tall units moved to the window wall.'},
  {id:'d1',v:5,cat:'Drawings',name:'Kitchen elevation · v5',meta:'Approved · 22 Nov',brief:'Tall units set back to clear the window.'},
  {id:'d2',v:5,cat:'Drawings',name:'Wardrobe section · v5',meta:'Approved · 22 Nov',brief:'Fluted finish and internal lighting agreed.'},
  {id:'d3',v:4,cat:'Drawings',name:'Wardrobe section · v4',meta:'Earlier · view only · 14 Oct',brief:'Before the fluted finish was approved.'},
  {id:'i1',v:5,cat:'Invoices',name:'Invoice · near completion · v5',meta:'14 Dec · GST',brief:'Near completion, 35% of quotation v5.'},
  {id:'i2',v:4,cat:'Invoices',name:'Invoice · before production · v4',meta:'20 Oct · GST',brief:'Before production, 50% of quotation v4.'}
];

const TEAM = {
  arjun:{name:'Arjun',role:'Design partner',phone:OFFICE.tel,bio:'The design partner for Villa 4B. Arjun runs the concept, the renders and the quotation, and is your main contact through the design phase.',projects:['Villa 4B · this project','Flat 7 · 2024'],quotes:['"Clear answers every week, and the samples arrived on time."']},
  imran:{name:'Imran',role:'Production manager',phone:OFFICE.tel,bio:'Imran takes over once production starts: site dates, deliveries, installation and snag closure.',projects:['Villa 4B · production','Office, Sector 44 · 2024'],quotes:['"Every delivery was on the schedule we agreed."']}
};

const NEXT_MEET = {date:'Tue 24 Nov', time:'11:00', who:'Arjun, Imran and you', people:3, link:MEET_LINK};

const RECEIPTS = [
  {no:'R-031',amt:40000,date:'3 Oct',label:'Token',bal:360000},
  {no:'R-047',amt:200000,date:'20 Oct',label:'Before production',bal:160000}
];

const MSGS = [
  {who:'Arjun',t:'Villa 4B: the cabinet samples are with you. Tell us which finish you prefer.',me:false,at:'Yesterday'},
  {who:'You',t:'Thank you. We will look at them this weekend.',me:true,at:'Yesterday'},
  {who:'Imran',t:'Production is pencilled for the first week of January. I will confirm the crew once the quotation is accepted.',me:false,at:'Yesterday'},
  {who:'Arjun',t:'The island move is in version 5. The wardrobe finish is the fluted oak we spoke about.',me:false,at:'09:12'},
  {who:'You',t:'That works. Please send the final quotation with it.',me:true,at:'09:20'}
];

const REFERENCES = [
  {id:'kitchen',label:'Warm oak kitchen',note:'Kitchen · this project'},
  {id:'wardrobe',label:'Fluted wardrobe',note:'Bedroom · this project'},
  {id:'island',label:'Stone island',note:'Kitchen · this project'}
];

const ITEMS = [
  {id:'kitchen',cat:['kitchen','home'],name:'Modular kitchen',room:'Kitchen',img:'assets/renders/kitchen-06-oak.jpg',desc:'Carcass, shutters, worktop and backsplash, with appliance cut-outs planned from the quotation.',days:65,price:200000,hue:'warm'},
  {id:'wardrobe',cat:['bedroom','home'],name:'Walk-in wardrobe',room:'Bedroom',desc:'Floor-to-ceiling storage with lighting channels and a dressing alcove where the room allows.',days:50,price:135000,hue:'slate'},
  {id:'lshape',cat:['kitchen'],name:'L-shape kitchen',room:'Kitchen',img:'assets/renders/kitchen-03-sage.jpg',desc:'Two runs of base units with a corner carousel and a clear working triangle.',days:60,price:185000,hue:'peach'},
  {id:'island',cat:['kitchen','home'],name:'Island kitchen',room:'Kitchen',img:'assets/renders/kitchen-02-walnut.jpg',desc:'A central island with seating on one side, with the sink and hob planned into the island.',days:70,price:260000,hue:'blush'},
  {id:'refresh',cat:['home'],name:'Two-bedroom refresh',room:'Whole home',img:'assets/renders/villa-05-di-an.jpg',desc:'Living, dining and bedrooms designed together, with one set of finishes and one handover.',days:65,price:680000,hue:'slate'},
  {id:'villa',cat:['home'],name:'Villa, turnkey',room:'Whole home',img:'assets/renders/villa-03-tropical.jpg',desc:'Full interiors from first brief to installation, with the firm managing every visit and delivery.',days:90,price:2400000,hue:'warm'},
  {id:'clinic',cat:['commercial'],name:'Studio or clinic fit-out',room:'Commercial',img:'assets/renders/villa-06-luklak.jpg',desc:'Reception, consultation rooms and storage, planned around working hours and phased by room.',days:75,price:950000,hue:'blush'},
  {id:'refit',cat:['kitchen'],name:'Kitchen refit',room:'Kitchen',img:'assets/renders/kitchen-01-maroon.jpg',desc:'Replace the shutters and worktop on an existing carcass, with the plumbing and electrics kept.',days:40,price:85000,hue:'peach'}
];

const GALLERY = ['kitchen','wardrobe','island','villa'];

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function inr(n){ const s=String(Math.round(n)); const last=s.slice(-3); const rest=s.slice(0,-3);
  return '₹' + (rest?rest.replace(/\B(?=(\d{2})+(?!\d))/g,',')+','+last:last); }
const R = inr;
function amtOf(p){ return Math.round(TOTAL*p.pct/100); }
function paidTotal(){ return PAYS.filter(p=>p.status==='paid').reduce((n,p)=>n+amtOf(p),0); }
function remaining(){ return TOTAL-paidTotal(); }
function owedNow(){ return PAYS.find(p=>p.status==='due')||PAYS.find(p=>p.status==='later')||null; }
function roundFor(v){ return ROUNDS.find(r=>r.v===v)||ROUNDS[0]; }
function itemById(id){ return ITEMS.find(i=>i.id===id)||null; }
function stageHealth(){ return {label:'On track', tone:'ok'}; }
