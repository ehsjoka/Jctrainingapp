const KEY="jc-training-data-test-v3";
const defaultExercises=[
{id:"bench-press",name:"Bänkpress",group:"Bröst"},
{id:"incline-db-press",name:"Lutande hantelpress",group:"Bröst"},
{id:"dumbbell-bench-press",name:"Hantelpress",group:"Bröst"},
{id:"incline-bench-press",name:"Lutande bänkpress",group:"Bröst"},
{id:"chest-press-machine",name:"Bröstpress i maskin",group:"Bröst"},
{id:"cable-fly",name:"Kabel-flyes",group:"Bröst"},
{id:"pec-deck",name:"Pec deck",group:"Bröst"},
{id:"push-up",name:"Armhävning",group:"Bröst"},
{id:"biceps-curl",name:"Bicepscurl",group:"Biceps"},
{id:"hammer-curl",name:"Hammercurl",group:"Biceps"},
{id:"incline-db-curl",name:"Lutande hantelcurl",group:"Biceps"},
{id:"preacher-curl",name:"Scottcurl",group:"Biceps"},
{id:"cable-curl",name:"Kabelcurl",group:"Biceps"},
{id:"overhead-press",name:"Axelpress",group:"Axlar"},
{id:"dumbbell-shoulder-press",name:"Hantelpress för axlar",group:"Axlar"},
{id:"machine-shoulder-press",name:"Axelpress i maskin",group:"Axlar"},
{id:"lateral-raise",name:"Sidolyft",group:"Axlar"},
{id:"cable-lateral-raise",name:"Sidolyft i kabel",group:"Axlar"},
{id:"reverse-fly",name:"Omvända flyes",group:"Axlar"},
{id:"face-pull",name:"Face pull",group:"Axlar"},
{id:"front-raise",name:"Frontlyft",group:"Axlar"},
{id:"ab-wheel",name:"Maghjul",group:"Mage/Core"},
{id:"cable-crunch",name:"Kabelcrunch",group:"Mage/Core"},
{id:"plank",name:"Plankan",group:"Mage/Core"},
{id:"hanging-leg-raise",name:"Hängande benlyft",group:"Mage/Core"},
{id:"leg-raise",name:"Benlyft",group:"Mage/Core"},
{id:"lat-pulldown",name:"Latsdrag",group:"Rygg"},
{id:"pull-up",name:"Pull-up",group:"Rygg"},
{id:"chin-up",name:"Chins",group:"Rygg"},
{id:"cable-row",name:"Sittande kabelrodd",group:"Rygg"},
{id:"chest-supported-row",name:"Bröststödd rodd",group:"Rygg"},
{id:"barbell-row",name:"Skivstångsrodd",group:"Rygg"},
{id:"one-arm-db-row",name:"Enarms hantelrodd",group:"Rygg"},
{id:"straight-arm-pulldown",name:"Raka armar latsdrag",group:"Rygg"},
{id:"back-extension",name:"Ryggresning",group:"Rygg"},
{id:"triceps-pushdown",name:"Triceps pushdown",group:"Triceps"},
{id:"rope-pushdown",name:"Triceps pushdown med rep",group:"Triceps"},
{id:"overhead-triceps-extension",name:"Tricepspress över huvudet",group:"Triceps"},
{id:"skull-crusher",name:"Liggande tricepsextension",group:"Triceps"},
{id:"dips",name:"Dips",group:"Triceps"},
{id:"close-grip-bench",name:"Smal bänkpress",group:"Triceps"},
{id:"squat",name:"Knäböj",group:"Ben"},
{id:"front-squat",name:"Frontböj",group:"Ben"},
{id:"goblet-squat",name:"Goblet squat",group:"Ben"},
{id:"leg-press",name:"Benpress",group:"Ben"},
{id:"leg-extension",name:"Benspark",group:"Ben"},
{id:"leg-curl",name:"Lårcurl",group:"Ben"},
{id:"rdl",name:"Rumänska marklyft",group:"Ben"},
{id:"deadlift",name:"Marklyft",group:"Ben"},
{id:"hip-thrust",name:"Hip thrust",group:"Ben"},
{id:"walking-lunge",name:"Gående utfall",group:"Ben"},
{id:"bulgarian-split-squat",name:"Bulgariska utfall",group:"Ben"},
{id:"calf-raise",name:"Vadpress",group:"Ben"}
];

const seed={
templates:[
{id:crypto.randomUUID(),name:"Bröst, biceps och ben",type:"strength",exercises:[
{exerciseId:"leg-press",sets:3,weight:0,reps:8,rest:60},{exerciseId:"bench-press",sets:3,weight:0,reps:8,rest:60},{exerciseId:"incline-db-press",sets:3,weight:0,reps:10,rest:60},{exerciseId:"biceps-curl",sets:3,weight:0,reps:10,rest:60},{exerciseId:"hammer-curl",sets:2,weight:0,reps:12,rest:60}]},
{id:crypto.randomUUID(),name:"Axlar, mage och ben",type:"strength",exercises:[
{exerciseId:"rdl",sets:3,weight:0,reps:8,rest:60},{exerciseId:"overhead-press",sets:3,weight:0,reps:8,rest:60},{exerciseId:"lateral-raise",sets:3,weight:0,reps:12,rest:60},{exerciseId:"reverse-fly",sets:3,weight:0,reps:12,rest:60},{exerciseId:"ab-wheel",sets:3,weight:0,reps:10,rest:60}]},
{id:crypto.randomUUID(),name:"Rygg, triceps och lätt ben",type:"strength",exercises:[
{exerciseId:"leg-curl",sets:3,weight:0,reps:12,rest:60},{exerciseId:"lat-pulldown",sets:3,weight:0,reps:8,rest:60},{exerciseId:"cable-row",sets:3,weight:0,reps:10,rest:60},{exerciseId:"triceps-pushdown",sets:3,weight:0,reps:10,rest:60}]},
{id:crypto.randomUUID(),name:"Spinning med hög cardio",type:"cardio",duration:45},
{id:crypto.randomUUID(),name:"Låg cardio",type:"cardio",duration:60},
{id:crypto.randomUUID(),name:"Padel",type:"padel",duration:90}
],
exercises:defaultExercises,
sessions:[]
};

let db=load();
let view="train";
let modal=null;
let activeWorkout=null;
let restEnds=0;
let timerHandle=null;

function load(){
 localStorage.removeItem("jc-training-data-v1");
 localStorage.removeItem("jc-training-data-test-v2");
 try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(seed)}
 catch{return structuredClone(seed)}
}
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function el(id){return document.getElementById(id)}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function exName(id){return db.exercises.find(x=>x.id===id)?.name||id}
function templateSets(x){
 if(Array.isArray(x.setValues)&&x.setValues.length)return x.setValues;
 return Array.from({length:Number(x.sets)||3},()=>({weight:Number(x.weight)||0,reps:Number(x.reps)||10}));
}
function fmtDate(v){return new Date(v).toLocaleDateString("sv-SE",{day:"numeric",month:"short"})}
function typeClass(t){return t==="padel"?"type-padel":t==="cardio"?"type-cardio":"type-strength"}

function app(){
 document.body.innerHTML='<div id="app"></div>';
 render();
 if("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js");
}
function render(){
 el("app").innerHTML=`
 <main class="shell">${viewContent()}</main>
 <nav class="nav"><div class="nav-inner">
 ${navBtn("train","🏋️","Träna")}${navBtn("history","◫","Historik")}${navBtn("exercises","☰","Övningar")}${navBtn("data","⚙️","Data")}
 </div></nav>${modal?modalContent():""}`;
 bind();
}
function navBtn(v,icon,label){return `<button data-view="${v}" class="${view===v?"active":""}"><span>${icon}</span>${label}</button>`}
function viewContent(){
 if(view==="history")return historyView();
 if(view==="exercises")return exerciseView();
 if(view==="data")return dataView();
 return trainView();
}
function header(title,sub=""){return `<div class="topbar"><div><div class="eyebrow">${esc(sub)}</div><h1>${esc(title)}</h1></div></div>`}

function trainView(){
 if(activeWorkout)return workoutView();
 return `${header("JC Training","Starta träning")}
 <button class="btn primary full" data-action="empty">＋ Starta tomt pass</button>
 <div class="section-title"><h2>Mina templates</h2><button class="btn ghost" data-action="new-template">＋ Ny</button></div>
 <div class="grid">${db.templates.map(t=>`
 <article class="card template">
   <div><span class="pill">${t.type==="strength"?(t.exercises?.length||0)+" övningar":(t.duration||0)+" min"}</span>
   <h3 style="margin-top:9px">${esc(t.name)}</h3></div>
   <div class="row between"><button class="btn ghost" data-start="${t.id}">Starta</button><button class="btn ghost" data-edit-template="${t.id}">•••</button></div>
 </article>`).join("")}</div>`;
}

function startTemplate(id){
 const t=db.templates.find(x=>x.id===id);
 if(!t)return;
 if(t.type!=="strength"){
   const duration=Number(prompt("Tid i minuter?",t.duration||45));
   if(!Number.isFinite(duration))return;
   db.sessions.push({id:crypto.randomUUID(),name:t.name,type:t.type,startedAt:new Date().toISOString(),completedAt:new Date().toISOString(),duration});
   save();render();return;
 }
 activeWorkout={id:crypto.randomUUID(),name:t.name,type:"strength",startedAt:new Date().toISOString(),exercises:(t.exercises||[]).map(te=>({
 exerciseId:te.exerciseId,rest:te.rest||60,sets:templateSets(te).map((sv,i)=>({n:i+1,weight:Number(sv.weight)||0,reps:Number(sv.reps)||0,done:false,previous:previousSet(te.exerciseId,i)}))
 }))};
 render();
}
function previousSet(exerciseId,index){
 const s=[...db.sessions].reverse().find(s=>s.type==="strength"&&s.exercises?.some(e=>e.exerciseId===exerciseId));
 const set=s?.exercises?.find(e=>e.exerciseId===exerciseId)?.sets?.[index];
 return set?`${num(set.weight)} × ${set.reps}`:"–";
}
function num(n){return Number(n)%1===0?String(Number(n)):Number(n).toFixed(1)}
function workoutView(){
 const elapsed=Math.floor((Date.now()-new Date(activeWorkout.startedAt))/1000);
 return `${header(activeWorkout.name,`Pågående · ${Math.floor(elapsed/60)} min`)}
 <div class="stack">${activeWorkout.exercises.map((e,ei)=>`
 <section class="workout-card"><h3>${esc(exName(e.exerciseId))}</h3>
 <div class="set-grid set-head"><span>SET</span><span>FÖRRA</span><span>KG</span><span>REPS</span><span>✓</span></div>
 ${e.sets.map((s,si)=>`<div class="set-grid set-row">
 <span>${s.n}</span><span class="muted">${s.previous}</span>
 <input class="field small" inputmode="decimal" data-weight="${ei}:${si}" value="${s.weight}">
 <input class="field small" inputmode="numeric" data-reps="${ei}:${si}" value="${s.reps}">
 <button class="check ${s.done?"done":""}" data-check="${ei}:${si}">${s.done?"✓":""}</button>
 </div>`).join("")}
 <button class="btn ghost" data-add-set="${ei}">＋ Lägg till set</button></section>`).join("")}</div>
 ${restEnds>Date.now()?restTimerHtml():""}
 <button class="btn full" data-action="add-workout-exercise">＋ Lägg till övning</button>\n <button class="btn primary full" data-action="finish">Avsluta pass</button>
 <button class="btn ghost full" data-action="cancel">Avbryt</button>`;
}
function restTimerHtml(){const sec=Math.max(0,Math.ceil((restEnds-Date.now())/1000));return `<div class="timer"><b>⏱ Vila</b><b id="rest-time">${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}</b><button class="btn ghost" data-action="skip-rest">Hoppa över</button></div>`}
function startRest(seconds){restEnds=Date.now()+seconds*1000;clearInterval(timerHandle);timerHandle=setInterval(()=>{if(restEnds<=Date.now()){clearInterval(timerHandle);restEnds=0;render()}else{const t=el("rest-time");if(t){const s=Math.ceil((restEnds-Date.now())/1000);t.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}}},1000);render()}
function finishWorkout(){activeWorkout.completedAt=new Date().toISOString();db.sessions.push(activeWorkout);save();activeWorkout=null;restEnds=0;render()}

function historyView(){
 const sessions=[...db.sessions].reverse();
 const d=new Date(),y=d.getFullYear(),m=d.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0);
 let cells=Array(first.getDay()===0?6:first.getDay()-1).fill("");
 for(let day=1;day<=last.getDate();day++){
  const types=sessions.filter(s=>{const x=new Date(s.completedAt);return x.getFullYear()===y&&x.getMonth()===m&&x.getDate()===day}).map(s=>s.type);
  const type=types[0],cls=type?typeClass(type):"";
  cells.push(`<div class="day ${type?"mark ":""}${cls}">${day}</div>`);
 }
 return `${header("Historik",new Date().toLocaleDateString("sv-SE",{month:"long",year:"numeric"}))}
 <div class="card"><div class="calendar">${["M","T","O","T","F","L","S"].map(x=>`<div class="muted" style="text-align:center;font-size:11px">${x}</div>`).join("")}${cells.map(x=>x||'<div></div>').join("")}</div></div>
 <div class="section-title"><h2>Senaste pass</h2></div>
 <div class="card list">${sessions.length?sessions.slice(0,20).map(s=>`<div class="list-item row between"><div><b>${esc(s.name)}</b><div class="muted">${fmtDate(s.completedAt)}</div></div><span class="pill">${s.type}</span></div>`).join(""):'<span class="muted">Ingen historik ännu.</span>'}</div>
 <div class="section-title"><h2>Övningshistorik</h2></div>
 <div class="card"><select id="history-ex" class="field"><option value="">Välj övning</option>${db.exercises.map(e=>`<option value="${e.id}">${esc(e.name)}</option>`).join("")}</select><div id="exercise-history" class="list"></div></div>`;
}
function renderExerciseHistory(id){
 const out=el("exercise-history");if(!out)return;
 const rows=[];
 [...db.sessions].reverse().forEach(s=>{const e=s.exercises?.find(x=>x.exerciseId===id);if(e)rows.push({date:s.completedAt,sets:e.sets})});
 out.innerHTML=rows.slice(0,10).map(r=>`<div class="list-item"><b>${fmtDate(r.date)}</b><div class="muted">${r.sets.map(s=>`${num(s.weight)}×${s.reps}`).join(" · ")}</div></div>`).join("")||'<div class="list-item muted">Ingen historik.</div>';
}

function exerciseView(){
 return `${header("Övningar","Bibliotek")}
 <input id="exercise-search" class="field" placeholder="Sök övning">
 <div id="exercise-list" class="card list" style="margin-top:12px">${exerciseList("")}</div>
 <button class="btn full" style="margin-top:12px" data-action="new-exercise">＋ Egen övning</button>`;
}
function exerciseList(q){return db.exercises.filter(e=>(e.name+" "+e.group).toLowerCase().includes(q.toLowerCase())).map(e=>`<div class="list-item"><b>${esc(e.name)}</b><div class="muted">${esc(e.group)}</div></div>`).join("")}

function dataView(){
 return `${header("Data","Lokalt på denna enhet")}
 <div class="card stack"><button class="btn" data-action="export-csv">Exportera templates CSV</button><label class="btn" style="text-align:center">Importera templates CSV<input id="csv-file" type="file" accept=".csv,text/csv" hidden></label><button class="btn" data-action="backup">Exportera all data JSON</button><label class="btn" style="text-align:center">Återställ JSON<input id="json-file" type="file" accept=".json,application/json" hidden></label></div>
 <p class="hint">All träningsdata sparas lokalt i webbläsaren på din iPhone. Ingen server och inget konto används.</p>
 <div class="danger-zone"><button class="btn danger full" data-action="reset">Radera all lokal data</button></div>`;
}

function modalContent(){
 if(modal.type==="exercise-picker"){
  const groups=[...new Set(db.exercises.map(e=>e.group))];
  return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>Välj övning</h2><button class="btn ghost" data-close>Stäng</button></div>
  <input id="picker-search" class="field" placeholder="Sök övning eller muskelgrupp" autofocus>
  <div id="picker-list" class="picker-list">${pickerList("")}</div></div></div>`;
 }
 if(modal.type==="template"){
  const t=db.templates.find(x=>x.id===modal.id);
  if(!t)return"";
  return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>Ändra template</h2><button class="btn ghost" data-close>Stäng</button></div>
  <div class="stack"><input id="tpl-name" class="field" value="${esc(t.name)}">
  <select id="tpl-type" class="field"><option value="strength" ${t.type==="strength"?"selected":""}>Styrka</option><option value="cardio" ${t.type==="cardio"?"selected":""}>Cardio</option><option value="padel" ${t.type==="padel"?"selected":""}>Padel</option></select>
  <div id="tpl-exercises">${t.type==="strength"?templateExerciseRows(t):'<input id="tpl-duration" class="field" inputmode="numeric" value="'+(t.duration||60)+'" placeholder="Minuter">'}</div>
  ${t.type==="strength"?'<button class="btn" data-action="add-template-ex">＋ Lägg till övning</button>':""}
  <button class="btn primary" data-action="save-template">Spara</button><button class="btn danger" data-action="delete-template">Ta bort template</button></div></div></div>`;
 }
 return"";
}
function pickerList(q){
 const s=q.trim().toLowerCase();
 const list=db.exercises.filter(e=>(e.name+" "+e.group).toLowerCase().includes(s));
 return list.map(e=>`<button class="picker-item" data-pick-ex="${e.id}"><span><b>${esc(e.name)}</b><small>${esc(e.group)}</small></span><span>›</span></button>`).join("")||'<div class="card muted">Ingen övning hittades.</div>';
}
function templateExerciseRows(t){return (t.exercises||[]).map((x,i)=>{
 const sets=templateSets(x);
 return `<div class="card" style="margin-bottom:9px">
 <div class="row between"><b>${esc(exName(x.exerciseId))}</b><button class="btn ghost" data-remove-template-ex="${i}">Ta bort</button></div>
 <div class="set-grid set-head" style="grid-template-columns:38px 1fr 1fr 42px;margin-top:10px"><span>SET</span><span>KG</span><span>REPS</span><span></span></div>
 ${sets.map((sv,si)=>`<div class="set-grid set-row" style="grid-template-columns:38px 1fr 1fr 42px">
   <span>${si+1}</span>
   <input class="field small" inputmode="decimal" data-tpl-set-weight="${i}:${si}" value="${sv.weight}">
   <input class="field small" inputmode="numeric" data-tpl-set-reps="${i}:${si}" value="${sv.reps}">
   <button class="btn ghost" data-remove-tpl-set="${i}:${si}">×</button>
 </div>`).join("")}
 <div class="row between" style="margin-top:8px">
   <button class="btn ghost" data-add-tpl-set="${i}">＋ Set</button>
   <label class="hint">Vila <input class="field small" style="width:80px" data-tpl-rest="${i}" value="${x.rest||60}"></label>
 </div></div>`;
}).join("")}

function bind(){
 document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{if(activeWorkout&&!confirm("Lämna pågående pass?"))return;activeWorkout=null;view=b.dataset.view;render()});
 document.querySelectorAll("[data-start]").forEach(b=>b.onclick=()=>startTemplate(b.dataset.start));
 document.querySelectorAll("[data-edit-template]").forEach(b=>b.onclick=()=>{modal={type:"template",id:b.dataset.editTemplate};render()});
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>{modal=null;render()});
 document.querySelectorAll("[data-check]").forEach(b=>b.onclick=()=>{const[ei,si]=b.dataset.check.split(":").map(Number);const s=activeWorkout.exercises[ei].sets[si];s.done=!s.done;if(s.done)startRest(activeWorkout.exercises[ei].rest);else render()});
 document.querySelectorAll("[data-add-set]").forEach(b=>b.onclick=()=>{const e=activeWorkout.exercises[+b.dataset.addSet],last=e.sets.at(-1);e.sets.push({n:e.sets.length+1,weight:last?.weight||0,reps:last?.reps||0,done:false,previous:"–"});render()});
 document.querySelectorAll("[data-weight]").forEach(i=>i.onchange=()=>{const[a,b]=i.dataset.weight.split(":").map(Number);activeWorkout.exercises[a].sets[b].weight=Number(i.value)||0});
 document.querySelectorAll("[data-reps]").forEach(i=>i.onchange=()=>{const[a,b]=i.dataset.reps.split(":").map(Number);activeWorkout.exercises[a].sets[b].reps=Number(i.value)||0});
 const hs=el("history-ex");if(hs)hs.onchange=()=>renderExerciseHistory(hs.value);
 const es=el("exercise-search");if(es)es.oninput=()=>el("exercise-list").innerHTML=exerciseList(es.value);
 const ps=el("picker-search");if(ps)ps.oninput=()=>{el("picker-list").innerHTML=pickerList(ps.value);bindPickerButtons()};
 bindPickerButtons();
 const cf=el("csv-file");if(cf)cf.onchange=e=>importCSV(e.target.files[0]);
 const jf=el("json-file");if(jf)jf.onchange=e=>importJSON(e.target.files[0]);
 const tt=el("tpl-type");if(tt)tt.onchange=()=>{const t=db.templates.find(x=>x.id===modal.id);t.type=tt.value;if(t.type==="strength"&&!t.exercises)t.exercises=[];render()};
 document.querySelectorAll("[data-remove-template-ex]").forEach(b=>b.onclick=()=>{const t=db.templates.find(x=>x.id===modal.id);t.exercises.splice(+b.dataset.removeTemplateEx,1);render()});
 document.querySelectorAll("[data-tpl-set-weight]").forEach(inp=>inp.onchange=()=>{const[ei,si]=inp.dataset.tplSetWeight.split(":").map(Number);const x=db.templates.find(t=>t.id===modal.id).exercises[ei];x.setValues=templateSets(x);x.setValues[si].weight=Number(inp.value)||0});
 document.querySelectorAll("[data-tpl-set-reps]").forEach(inp=>inp.onchange=()=>{const[ei,si]=inp.dataset.tplSetReps.split(":").map(Number);const x=db.templates.find(t=>t.id===modal.id).exercises[ei];x.setValues=templateSets(x);x.setValues[si].reps=Number(inp.value)||0});
 document.querySelectorAll("[data-add-tpl-set]").forEach(b=>b.onclick=()=>{const x=db.templates.find(t=>t.id===modal.id).exercises[+b.dataset.addTplSet];x.setValues=templateSets(x);const last=x.setValues.at(-1)||{weight:0,reps:10};x.setValues.push({...last});render()});
 document.querySelectorAll("[data-remove-tpl-set]").forEach(b=>b.onclick=()=>{const[ei,si]=b.dataset.removeTplSet.split(":").map(Number);const x=db.templates.find(t=>t.id===modal.id).exercises[ei];x.setValues=templateSets(x);if(x.setValues.length>1)x.setValues.splice(si,1);render()});
 document.querySelectorAll("[data-tpl-rest]").forEach(i=>i.onchange=()=>db.templates.find(x=>x.id===modal.id).exercises[+i.dataset.tplRest].rest=Number(i.value)||60);
 document.querySelectorAll("[data-action]").forEach(b=>b.onclick=action);
}
function bindPickerButtons(){
 document.querySelectorAll("[data-pick-ex]").forEach(b=>b.onclick=()=>{
  const ex=db.exercises.find(x=>x.id===b.dataset.pickEx);if(!ex)return;
  if(modal.target==="workout"){
   activeWorkout.exercises.push({exerciseId:ex.id,rest:60,sets:[{n:1,weight:0,reps:10,done:false,previous:previousSet(ex.id,0)},{n:2,weight:0,reps:10,done:false,previous:previousSet(ex.id,1)},{n:3,weight:0,reps:10,done:false,previous:previousSet(ex.id,2)}]});
  }else if(modal.target==="template"){
   const t=db.templates.find(x=>x.id===modal.templateId);
   if(t)t.exercises.push({exerciseId:ex.id,setValues:[{weight:0,reps:10},{weight:0,reps:10},{weight:0,reps:10}],rest:60});
  }
  modal=null;render();
 });
}
function action(e){
 const a=e.currentTarget.dataset.action;
 if(a==="finish")finishWorkout();
 if(a==="cancel"){if(confirm("Avbryt passet?")){activeWorkout=null;restEnds=0;render()}}
 if(a==="skip-rest"){restEnds=0;render()}
 if(a==="empty"){const id=crypto.randomUUID();db.templates.push({id,name:"Tomt pass",type:"strength",exercises:[]});startTemplate(id);db.templates=db.templates.filter(x=>x.id!==id)}
 if(a==="new-template"){const id=crypto.randomUUID();db.templates.push({id,name:"Ny template",type:"strength",exercises:[]});save();modal={type:"template",id};render()}
 if(a==="new-exercise"){const name=prompt("Namn på övning");if(!name)return;const group=prompt("Muskelgrupp","Övrigt")||"Övrigt";db.exercises.push({id:"custom-"+Date.now(),name,group});save();render()}
 if(a==="add-workout-exercise"){modal={type:"exercise-picker",target:"workout"};render()}
 if(a==="add-template-ex"){modal={type:"exercise-picker",target:"template",templateId:modal.id};render()}
 if(a==="save-template"){const t=db.templates.find(x=>x.id===modal.id);t.name=el("tpl-name").value.trim()||"Template";t.type=el("tpl-type").value;if(t.type!=="strength")t.duration=Number(el("tpl-duration")?.value)||60;save();modal=null;render()}
 if(a==="delete-template"){if(confirm("Ta bort templaten?")){db.templates=db.templates.filter(x=>x.id!==modal.id);save();modal=null;render()}}
 if(a==="export-csv")exportCSV();
 if(a==="backup")download("jc-training-backup.json",JSON.stringify(db,null,2),"application/json");
 if(a==="reset"&&confirm("Radera all lokal träningsdata?")){db=structuredClone(seed);save();render()}
}
function csvEsc(v){v=String(v??"");return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function exportCSV(){
 const rows=[["template","type","exercise","set_number","weight","reps","rest_seconds","duration_minutes"]];
 db.templates.forEach(t=>{
  if(t.type==="strength"){
   (t.exercises||[]).forEach(x=>{
    templateSets(x).forEach((sv,si)=>rows.push([t.name,t.type,exName(x.exerciseId),si+1,sv.weight,sv.reps,x.rest||60,""]));
   });
  }else rows.push([t.name,t.type,"","","","","",t.duration||""]);
 });
 download("jc-training-templates.csv",rows.map(r=>r.map(csvEsc).join(",")).join("\n"),"text/csv");
}
function importCSV(file){
 if(!file)return;
 const r=new FileReader();
 r.onload=()=>{
  const lines=r.result.split(/\r?\n/).filter(Boolean);
  if(lines.length<2)return;
  const templates=new Map();
  lines.slice(1).forEach(line=>{
   const [name,type,exercise,setNumber,weight,reps,rest,duration]=parseCSVLine(line);
   if(!name)return;
   if(!templates.has(name))templates.set(name,{id:crypto.randomUUID(),name,type:type||"strength",exercises:[],duration:Number(duration)||0});
   const t=templates.get(name);
   if(t.type!=="strength"||!exercise)return;
   let ex=db.exercises.find(x=>x.name.toLowerCase()===exercise.toLowerCase());
   if(!ex){ex={id:"import-"+Date.now()+"-"+Math.random(),name:exercise,group:"Import"};db.exercises.push(ex)}
   let te=t.exercises.find(x=>x.exerciseId===ex.id);
   if(!te){te={exerciseId:ex.id,setValues:[],rest:Number(rest)||60};t.exercises.push(te)}
   const idx=Math.max(0,(Number(setNumber)||1)-1);
   te.setValues[idx]={weight:Number(weight)||0,reps:Number(reps)||0};
  });
  templates.forEach(t=>(t.exercises||[]).forEach(x=>{x.setValues=(x.setValues||[]).filter(Boolean)}));
  db.templates.push(...templates.values());
  save();render();
 };
 r.readAsText(file);
}
function parseCSVLine(s){let a=[],v="",q=false;for(let i=0;i<s.length;i++){const ch=s[i];if(ch==='"'&&s[i+1]==='"'&&q){v+='"';i++}else if(ch==='"')q=!q;else if(ch===","&&!q){a.push(v);v=""}else v+=ch}a.push(v);return a}
function importJSON(file){if(!file)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.templates||!x.sessions)throw 0;db=x;save();render()}catch{alert("Ogiltig backupfil")}};r.readAsText(file)}
function download(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}

app();