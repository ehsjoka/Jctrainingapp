const KEY="jc-training-data";
const SCHEMA_VERSION=1;
const exerciseHelpAliases={
"bench-press":"Barbell Bench Press","incline-db-press":"Incline Dumbbell Press","dumbbell-bench-press":"Dumbbell Bench Press","incline-bench-press":"Incline Bench Press","chest-press-machine":"Machine Bench Press","cable-fly":"Cable Crossover","pec-deck":"Butterfly","push-up":"Pushups",
"biceps-curl":"Barbell Curl","hammer-curl":"Hammer Curls","incline-db-curl":"Incline Dumbbell Curl","preacher-curl":"Preacher Curl","cable-curl":"Cable Hammer Curls - Rope Attachment",
"overhead-press":"Military Press","dumbbell-shoulder-press":"Dumbbell Shoulder Press","machine-shoulder-press":"Machine Shoulder Press","lateral-raise":"Side Lateral Raise","cable-lateral-raise":"Cable Seated Lateral Raise","reverse-fly":"Reverse Flyes","face-pull":"Face Pull","front-raise":"Front Dumbbell Raise",
"ab-wheel":"Ab Roller","cable-crunch":"Cable Crunch","plank":"Plank","hanging-leg-raise":"Hanging Leg Raise","leg-raise":"Flat Bench Lying Leg Raise",
"lat-pulldown":"Wide-Grip Lat Pulldown","pull-up":"Pullups","chin-up":"Chin-Up","cable-row":"Seated Cable Rows","chest-supported-row":"Chest-Supported Dumbbell Row","barbell-row":"Bent Over Barbell Row","one-arm-db-row":"One-Arm Dumbbell Row","straight-arm-pulldown":"Straight-Arm Pulldown","back-extension":"Hyperextensions (Back Extensions)",
"triceps-pushdown":"Triceps Pushdown","rope-pushdown":"Triceps Pushdown - Rope Attachment","overhead-triceps-extension":"Standing Dumbbell Triceps Extension","skull-crusher":"Lying Triceps Press","dips":"Dips - Triceps Version","close-grip-bench":"Close-Grip Barbell Bench Press",
"squat":"Barbell Squat","front-squat":"Front Barbell Squat","goblet-squat":"Goblet Squat","leg-press":"Leg Press","leg-extension":"Leg Extensions","leg-curl":"Lying Leg Curls","rdl":"Romanian Deadlift","deadlift":"Barbell Deadlift","hip-thrust":"Barbell Hip Thrust","walking-lunge":"Walking Lunge","bulgarian-split-squat":"Single Leg Barbell Squat","calf-raise":"Standing Calf Raises","dumbbell-biceps-curl":"Dumbbell Bicep Curl","calf-press-leg-press":"Calf Press On The Leg Press Machine","dumbbell-side-bend":"Dumbbell Side Bend"
};
let exerciseHelpCatalog=null;
let exerciseHelpLoading=false;
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
{id:"calf-raise",name:"Vadpress",group:"Ben"},
{id:"dumbbell-shrug",name:"Hantelshrugs",group:"Rygg"},
{id:"cable-triceps-extension",name:"Tricepsextension i kabel",group:"Triceps"},
{id:"dumbbell-biceps-curl",name:"Hantelcurl",group:"Biceps"},
{id:"calf-press-leg-press",name:"Vadpress i benpress",group:"Ben"},
{id:"dumbbell-side-bend",name:"Sidoböj med hantel",group:"Mage"}
];

const seed={
schemaVersion:SCHEMA_VERSION,
templates:[
{id:crypto.randomUUID(),name:"Bröst, biceps och ben",type:"strength",exercises:[
{exerciseId:"bench-press",setValues:[{weight:40,reps:10},{weight:65,reps:10},{weight:70,reps:6},{weight:75,reps:4},{weight:60,reps:5}],rest:60},
{exerciseId:"dumbbell-side-bend",setValues:[{weight:37,reps:12},{weight:37,reps:12},{weight:37,reps:12}],rest:60},
{exerciseId:"biceps-curl",setValues:[{weight:42,reps:10},{weight:42,reps:8},{weight:42,reps:8}],rest:60},
{exerciseId:"leg-press",setValues:[{weight:100,reps:12},{weight:130,reps:12},{weight:130,reps:12}],rest:60},
{exerciseId:"calf-press-leg-press",setValues:[{weight:100,reps:10},{weight:130,reps:10},{weight:130,reps:10}],rest:60},
{exerciseId:"preacher-curl",setValues:[{weight:24.5,reps:14},{weight:27,reps:12},{weight:30,reps:10}],rest:60},
{exerciseId:"incline-db-press",setValues:[{weight:27.5,reps:8},{weight:27.5,reps:8},{weight:27.5,reps:6}],rest:60},
{exerciseId:"leg-curl",setValues:[{weight:23,reps:10},{weight:23,reps:10},{weight:23,reps:8}],rest:60},
{exerciseId:"dumbbell-biceps-curl",setValues:[{weight:15,reps:10},{weight:15,reps:10},{weight:15,reps:8},{weight:12.5,reps:5}],rest:60}]},
{id:crypto.randomUUID(),name:"Axlar, mage och ben",type:"strength",exercises:[
{exerciseId:"overhead-press",setValues:[{weight:40,reps:8},{weight:42.5,reps:6},{weight:45,reps:4},{weight:40,reps:3}],rest:60},
{exerciseId:"hanging-leg-raise",setValues:[{weight:0,reps:11},{weight:0,reps:12},{weight:0,reps:11}],rest:60},
{exerciseId:"reverse-fly",setValues:[{weight:10,reps:12},{weight:10,reps:12},{weight:10,reps:12}],rest:60},
{exerciseId:"ab-wheel",setValues:[{weight:0,reps:15},{weight:0,reps:15},{weight:0,reps:14}],rest:60},
{exerciseId:"dumbbell-side-bend",setValues:[{weight:37.5,reps:12},{weight:37.5,reps:12},{weight:37.5,reps:12}],rest:60},
{exerciseId:"lateral-raise",setValues:[{weight:10,reps:12},{weight:10,reps:13},{weight:10,reps:12}],rest:60},
{exerciseId:"face-pull",setValues:[{weight:28,reps:12},{weight:28,reps:12},{weight:28,reps:12}],rest:60},
{exerciseId:"cable-crunch",setValues:[{weight:60,reps:11},{weight:68,reps:10},{weight:68,reps:10}],rest:60},
{exerciseId:"leg-extension",setValues:[{weight:45,reps:8},{weight:45,reps:9},{weight:45,reps:9}],rest:60}]},
{id:crypto.randomUUID(),name:"Rygg, triceps och lätt ben",type:"strength",exercises:[
{exerciseId:"rdl",setValues:[{weight:50,reps:12},{weight:60,reps:10},{weight:60,reps:10}],rest:60},
{exerciseId:"barbell-row",setValues:[{weight:50,reps:12},{weight:60,reps:8},{weight:60,reps:8}],rest:60},
{exerciseId:"leg-curl",setValues:[{weight:15,reps:8}],rest:60},
{exerciseId:"one-arm-db-row",setValues:[{weight:32.5,reps:12},{weight:32.5,reps:12},{weight:35,reps:10}],rest:60},
{exerciseId:"skull-crusher",setValues:[{weight:42,reps:9},{weight:42,reps:9},{weight:42,reps:8}],rest:60},
{exerciseId:"triceps-pushdown",setValues:[{weight:36,reps:9},{weight:36,reps:10},{weight:36,reps:10},{weight:15,reps:5}],rest:60},
{exerciseId:"dumbbell-shrug",setValues:[{weight:40,reps:12},{weight:40,reps:12},{weight:40,reps:12}],rest:60},
{exerciseId:"lat-pulldown",setValues:[{weight:80,reps:8},{weight:80,reps:8},{weight:90,reps:3},{weight:70,reps:5}],rest:60},
{exerciseId:"cable-triceps-extension",setValues:[{weight:28,reps:9},{weight:28,reps:9},{weight:28,reps:8},{weight:17,reps:8}],rest:60}]},
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
let workoutTimerHandle=null;
let pendingTemplateUpdate=null;

function migrateData(data){
 if(!data||typeof data!=="object")return structuredClone(seed);
 data.schemaVersion=SCHEMA_VERSION;
 return data;
}
function load(){
 try{
  const stored=JSON.parse(localStorage.getItem(KEY));
  return stored?migrateData(stored):structuredClone(seed);
 }catch{return structuredClone(seed)}
}
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function el(id){return document.getElementById(id)}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function exName(id){return db.exercises.find(x=>x.id===id)?.name||id}
function templateSets(x){
 if(Array.isArray(x.setValues)&&x.setValues.length)return x.setValues;
 return Array.from({length:Number(x.sets)||3},()=>({weight:Number(x.weight)||0,reps:Number(x.reps)||10}));
}
function normalizeExerciseName(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim()}
function helpMatchFor(id){
 if(!exerciseHelpCatalog)return null;
 const alias=exerciseHelpAliases[id]||exName(id);
 const n=normalizeExerciseName(alias);
 return exerciseHelpCatalog.find(x=>normalizeExerciseName(x.name)===n)
   || exerciseHelpCatalog.find(x=>normalizeExerciseName(x.name).includes(n)||n.includes(normalizeExerciseName(x.name)));
}
async function loadExerciseHelpCatalog(){
 if(exerciseHelpCatalog||exerciseHelpLoading)return;
 exerciseHelpLoading=true;
 try{
  const res=await fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json");
  if(!res.ok)throw new Error("HTTP "+res.status);
  exerciseHelpCatalog=await res.json();
 }catch(e){
  exerciseHelpCatalog=[];
 }finally{
  exerciseHelpLoading=false;
 }
}
async function openExerciseHelp(id){
 modal={type:"exercise-help",exerciseId:id};render();
 await loadExerciseHelpCatalog();
 if(modal&&modal.type==="exercise-help"&&modal.exerciseId===id)render();
}
function helpImageUrl(path){return "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"+path}
function fmtDate(v){return new Date(v).toLocaleDateString("sv-SE",{day:"numeric",month:"short"})}
function typeClass(t){return t==="padel"?"type-padel":t==="cardio"?"type-cardio":"type-strength"}
function lastRunText(name){
 const s=[...db.sessions].reverse().find(x=>x.name===name&&x.completedAt);
 if(!s)return "Aldrig";
 const today=new Date();today.setHours(0,0,0,0);
 const d=new Date(s.completedAt);d.setHours(0,0,0,0);
 const days=Math.round((today-d)/86400000);
 const when=days<=0?"Idag":days===1?"Igår":days+" dagar sedan";
 let minutes=Number(s.duration)||0;
 if(!minutes&&s.startedAt&&s.completedAt)minutes=Math.max(1,Math.round((new Date(s.completedAt)-new Date(s.startedAt))/60000));
 return minutes?when+" ("+minutes+" min)":when;
}

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
 if(activeWorkout)startWorkoutElapsedTimer();else clearInterval(workoutTimerHandle);
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
   <h3 style="margin-top:9px">${esc(t.name)}</h3><div class="muted" style="font-size:13px;margin-top:4px">Senast: ${lastRunText(t.name)}</div></div>
   <div class="row between"><button class="btn primary template-start-btn" data-start="${t.id}">Starta</button><button class="btn ghost" data-edit-template="${t.id}">•••</button></div>
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
 activeWorkout={id:crypto.randomUUID(),templateId:t.id,name:t.name,type:"strength",startedAt:new Date().toISOString(),exercises:(t.exercises||[]).map(te=>({
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
function exerciseIcon(id){
 const type={
  "bench-press":"bench","incline-db-press":"incline","dumbbell-bench-press":"bench","incline-bench-press":"incline","chest-press-machine":"bench",
  "biceps-curl":"curl","hammer-curl":"curl","incline-db-curl":"curl","preacher-curl":"curl","cable-curl":"curl",
  "overhead-press":"shoulder","dumbbell-shoulder-press":"shoulder","machine-shoulder-press":"shoulder",
  "lateral-raise":"lateral","cable-lateral-raise":"lateral","reverse-fly":"reverse","face-pull":"facepull","front-raise":"front",
  "ab-wheel":"abwheel","cable-crunch":"crunch","plank":"plank","hanging-leg-raise":"legraise","leg-raise":"legraise",
  "lat-pulldown":"pulldown","pull-up":"pullup","chin-up":"pullup","cable-row":"row","chest-supported-row":"row","barbell-row":"row","one-arm-db-row":"row","straight-arm-pulldown":"pulldown","back-extension":"hinge",
  "triceps-pushdown":"pushdown","rope-pushdown":"pushdown","overhead-triceps-extension":"triceps","skull-crusher":"triceps","dips":"dip","close-grip-bench":"bench",
  "squat":"squat","front-squat":"squat","goblet-squat":"squat","leg-press":"legpress","leg-extension":"legextension","leg-curl":"legcurl",
  "rdl":"hinge","deadlift":"deadlift","hip-thrust":"hipthrust","walking-lunge":"lunge","bulgarian-split-squat":"split","calf-raise":"calf",
  "push-up":"pushup","dumbbell-shrug":"shrug","cable-triceps-extension":"triceps","dumbbell-biceps-curl":"curl","calf-press-leg-press":"calf","dumbbell-side-bend":"sidebend"
 }[id]||"generic";
 const paths={
  bench:'<path d="M3 17h18M5 14h14M7 14l2-5m8 5-2-5M4 8h16M6 6v4m12-4v4"/>',
  incline:'<path d="M4 17h16M7 15l7-6m0 0 3 3M5 7h4m6 0h4M7 5v4m10-4v4"/>',
  curl:'<circle cx="12" cy="5" r="2"/><path d="M12 7v6m0 0-4 6m4-6 4 6M8 10l-2 3m10-3 2 3M5 13h3m8 0h3"/>',
  shoulder:'<circle cx="12" cy="6" r="2"/><path d="M12 8v7m0 0-4 5m4-5 4 5M7 10l-2-4m12 4 2-4M3 5h4m10 0h4"/>',
  lateral:'<circle cx="12" cy="6" r="2"/><path d="M12 8v7m0 0-3 5m3-5 3 5M12 10H5m7 0h7M3 10h2m14 0h2"/>',
  reverse:'<circle cx="12" cy="6" r="2"/><path d="M12 8l-2 6m2-4 6 3m-8 1-5 3m5-3 1 6m-1-6 5 4"/>',
  front:'<circle cx="12" cy="6" r="2"/><path d="M12 8v7m0 0-3 5m3-5 3 5M11 10l-5 3m7-3 5 3"/>',
  abwheel:'<circle cx="16" cy="17" r="3"/><circle cx="8" cy="8" r="2"/><path d="M9 10l4 4 3 3m-7-7-3 5m3-5 5 1"/>',
  crunch:'<circle cx="9" cy="8" r="2"/><path d="M9 10l3 4 5 2M12 14l-5 3M18 4v7m0 0-3 2"/>',
  plank:'<circle cx="6" cy="11" r="2"/><path d="M8 12l8 2m0 0 4 3M10 13l-3 4M3 18h18"/>',
  legraise:'<circle cx="7" cy="7" r="2"/><path d="M7 9v5m0 0 5 4m-5-4-3 5m8-1 6-5"/>',
  pulldown:'<path d="M4 4h16M6 4l3 3m9-3-3 3"/><circle cx="12" cy="9" r="2"/><path d="M12 11v6m0-5-4-3m4 3 4-3m-4 8-3 3m3-3 3 3"/>',
  pullup:'<path d="M4 4h16"/><circle cx="12" cy="9" r="2"/><path d="M12 11v6m-4-8L6 4m10 5 2-5m-6 13-3 3m3-3 3 3"/>',
  row:'<circle cx="8" cy="7" r="2"/><path d="M9 9l4 4m0 0 5-1M9 9l-3 6m7-2-2 6m2-6 4 5M18 12h3"/>',
  facepull:'<circle cx="9" cy="8" r="2"/><path d="M9 10v7m0-5 5-2m0 0 4-1M14 10l3 3M9 17l-3 3m3-3 3 3"/>',
  pushdown:'<circle cx="10" cy="6" r="2"/><path d="M10 8v7m0-4 5 2m0-8v8m-5 2-3 5m3-5 3 5M15 5h3"/>',
  triceps:'<circle cx="12" cy="6" r="2"/><path d="M12 8v7m0-5 3-4m0 0 2 4m-5 5-3 5m3-5 3 5"/>',
  dip:'<circle cx="12" cy="6" r="2"/><path d="M12 8v7m0-4-4 3m4-3 4 3M8 14H5m11 0h3m-7 1-3 5m3-5 3 5"/>',
  hinge:'<circle cx="9" cy="6" r="2"/><path d="M9 8l4 5m0 0 5 2m-5-2-2 7M9 11l-4 4M5 15h14"/>',
  deadlift:'<circle cx="12" cy="6" r="2"/><path d="M12 8l-2 6m2-6 2 6m-4 0h8m-8 0-3 5m7-5 3 5M5 14h14"/>',
  squat:'<circle cx="12" cy="5" r="2"/><path d="M12 7v6m0 0-5 3m5-3 5 3M7 16l2 4m8-4-2 4M5 9h14"/>',
  legpress:'<path d="M5 18h7l5-5m-9 0 4 3m0 0 4-6m-8 3-2-4m10 1 3 2M18 6l3 3"/>',
  legextension:'<circle cx="8" cy="7" r="2"/><path d="M8 9v6m0 0h6m0 0 5-2M5 17h7"/>',
  legcurl:'<circle cx="7" cy="10" r="2"/><path d="M9 11l6 3m0 0 4-4M4 15h9"/>',
  hipthrust:'<circle cx="7" cy="11" r="2"/><path d="M9 12l5-2m0 0 5 4M9 12l-3 5m8-7 2 7M4 17h16"/>',
  lunge:'<circle cx="12" cy="5" r="2"/><path d="M12 7v7m0 0-6 4m6-4 6 4M8 18h-4m12 0h4"/>',
  split:'<circle cx="11" cy="5" r="2"/><path d="M11 7v7m0 0-5 5m5-5 5 3m0 0 3-5M16 17h5M4 20h5"/>',
  calf:'<circle cx="12" cy="5" r="2"/><path d="M12 7v8m0 0-3 5m3-5 3 5M7 20h10M18 17v3"/>',
  pushup:'<circle cx="6" cy="11" r="2"/><path d="M8 12l8 2m0 0 4 3M10 13l-2 5m7-4 2 5M3 19h18"/>',
  shrug:'<circle cx="12" cy="5" r="2"/><path d="M12 7v8m0-5-4 3m4-3 4 3M8 13H5m11 0h3M12 15l-3 5m3-5 3 5"/>',
  sidebend:'<circle cx="12" cy="5" r="2"/><path d="M12 7v7m0-5-3 4m3-4 4 3M9 13l-2 6m5-5 3 5M5 12h3"/>',
  generic:'<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>'
 };
 return `<svg class="exercise-icon" viewBox="0 0 24 24" preserveAspectRatio="none" aria-hidden="true" style="width:26px;height:16px"><g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[type]}</g></svg>`;
}
function workoutView(){
 const elapsed=Math.floor((Date.now()-new Date(activeWorkout.startedAt))/1000);
 return `${header(activeWorkout.name,`Pågående`)}
 <div class="workout-elapsed"><span>⏱ Pass</span><b id="workout-elapsed">${Math.floor(elapsed/60)}:${String(elapsed%60).padStart(2,"0")}</b></div>
 <div class="stack">${activeWorkout.exercises.map((e,ei)=>`
 <section class="workout-card"><div class="row between"><div class="workout-ex-title"><h3>${esc(exName(e.exerciseId))}</h3>${exerciseIcon(e.exerciseId)}</div><button class="btn ghost" data-help-ex="${e.exerciseId}">ⓘ Hjälp</button></div>
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
function startWorkoutElapsedTimer(){
 clearInterval(workoutTimerHandle);
 if(!activeWorkout)return;
 const update=()=>{
  const out=el("workout-elapsed");if(!out||!activeWorkout)return;
  const s=Math.max(0,Math.floor((Date.now()-new Date(activeWorkout.startedAt))/1000));
  out.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
 };
 update();
 workoutTimerHandle=setInterval(update,1000);
}
function restTimerHtml(){const sec=Math.max(0,Math.ceil((restEnds-Date.now())/1000));return `<div class="timer"><b>⏱ Vila</b><b id="rest-time">${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}</b><button class="btn ghost" data-action="skip-rest">Hoppa över</button></div>`}
function startRest(seconds){restEnds=Date.now()+seconds*1000;clearInterval(timerHandle);timerHandle=setInterval(()=>{if(restEnds<=Date.now()){clearInterval(timerHandle);restEnds=0;render()}else{const t=el("rest-time");if(t){const s=Math.ceil((restEnds-Date.now())/1000);t.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`}}},1000);render()}
function workoutDiffersFromTemplate(workout){
 const t=db.templates.find(x=>x.id===workout.templateId);
 if(!t||t.type!=="strength")return false;
 if((t.exercises||[]).length!==workout.exercises.length)return true;
 for(let i=0;i<workout.exercises.length;i++){
  const we=workout.exercises[i],te=t.exercises[i];
  if(!te||te.exerciseId!==we.exerciseId)return true;
  const ts=templateSets(te);
  if(ts.length!==we.sets.length)return true;
  for(let j=0;j<we.sets.length;j++){
   if(Number(ts[j].weight)!==Number(we.sets[j].weight)||Number(ts[j].reps)!==Number(we.sets[j].reps))return true;
  }
 }
 return false;
}
function applyWorkoutToTemplate(workout){
 const t=db.templates.find(x=>x.id===workout.templateId);
 if(!t)return;
 t.exercises=workout.exercises.map(e=>({
  exerciseId:e.exerciseId,
  rest:e.rest||60,
  setValues:e.sets.map(s=>({weight:Number(s.weight)||0,reps:Number(s.reps)||0}))
 }));
}
function finishWorkout(){
 activeWorkout.completedAt=new Date().toISOString();
 const finished=activeWorkout;
 db.sessions.push(finished);
 save();
 activeWorkout=null;
 restEnds=0;
 pendingTemplateUpdate=finished;
 if(!finished.templateId){
  modal={type:"template-save"};
 }else if(workoutDiffersFromTemplate(finished)){
  modal={type:"template-update"};
 }else{
  pendingTemplateUpdate=null;
 }
 render();
}

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
function exerciseList(q){return db.exercises.filter(e=>(e.name+" "+e.group).toLowerCase().includes(q.toLowerCase())).map(e=>`<div class="list-item row between"><div><b>${esc(e.name)}</b><div class="muted">${esc(e.group)}</div></div><button class="btn ghost" data-help-ex="${e.id}">ⓘ</button></div>`).join("")}

function dataView(){
 return `${header("Data","Lokalt på denna enhet")}
 <div class="card stack"><button class="btn" data-action="export-csv">Exportera templates CSV</button><label class="btn" style="text-align:center">Importera templates CSV<input id="csv-file" type="file" accept=".csv,text/csv" hidden></label><button class="btn" data-action="backup">Exportera all data JSON</button><label class="btn" style="text-align:center">Återställ JSON<input id="json-file" type="file" accept=".json,application/json" hidden></label></div>
 <p class="hint">All träningsdata sparas lokalt i webbläsaren på din iPhone. Ingen server och inget konto används.</p>
 <div class="danger-zone"><button class="btn danger full" data-action="reset">Radera all lokal data</button></div>`;
}

function modalContent(){
 if(modal.type==="exercise-help"){
  const id=modal.exerciseId, item=helpMatchFor(id);
  if(exerciseHelpLoading)return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>${esc(exName(id))}</h2><button class="btn ghost" data-close>Stäng</button></div><div class="card"><p>Hämtar övningshjälp…</p></div></div></div>`;
  if(!item)return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>${esc(exName(id))}</h2><button class="btn ghost" data-close>Stäng</button></div><div class="card"><p>Ingen bild/instruktion hittades för just denna övning ännu.</p></div></div></div>`;
  return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>${esc(exName(id))}</h2><button class="btn ghost" data-close>Stäng</button></div>
   <div class="card stack">
    ${(item.images||[]).slice(0,2).map(p=>`<img class="exercise-help-img" src="${helpImageUrl(p)}" alt="${esc(item.name)}">`).join("")}
    <div><b>Målmuskel:</b> ${esc((item.primaryMuscles||[]).join(", ")||"–")}</div>
    <div><b>Sekundära muskler:</b> ${esc((item.secondaryMuscles||[]).join(", ")||"–")}</div>
    <div><b>Utrustning:</b> ${esc(item.equipment||"–")}</div>
    <div><b>Instruktion:</b><ol class="help-steps">${(item.instructions||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
    <div class="hint">Bilder och instruktioner: free-exercise-db (public domain).</div>
   </div></div></div>`;
 }
 if(modal.type==="template-save"){
  return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>Spara som template?</h2></div>
  <div class="card stack">
   <p style="margin:0">Du skapade ett nytt pass. Vill du spara det som en template?</p>
   <input id="new-template-name" class="field" value="${esc(pendingTemplateUpdate?.name==="Nytt pass"?"":pendingTemplateUpdate?.name||"")}" placeholder="Namn på template">
   <button class="btn primary full" data-action="save-new-template">Spara som template</button>
   <button class="btn full" data-action="discard-new-template">Klar – spara inte</button>
  </div></div></div>`;
 }
 if(modal.type==="template-update"){
  return `<div class="modal"><div class="modal-inner"><div class="modal-head"><h2>Uppdatera template?</h2></div>
  <div class="card stack">
   <p style="margin:0">Passet skiljer sig från templaten. Vill du spara ändringarna till <b>${esc(pendingTemplateUpdate?.name||"templaten")}</b>?</p>
   <p class="hint" style="margin:0">Det kan vara ny övning, ändrat antal set eller ändrad vikt/reps.</p>
   <button class="btn primary full" data-action="keep-template">Klar – behåll template</button>
   <button class="btn full" data-action="update-template">Uppdatera template</button>
  </div></div></div>`;
 }
 if(modal.type==="exercise-picker"){
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
 document.querySelectorAll("[data-help-ex]").forEach(b=>b.onclick=()=>openExerciseHelp(b.dataset.helpEx));
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
 if(a==="keep-template"){pendingTemplateUpdate=null;modal=null;render()}
 if(a==="update-template"){if(pendingTemplateUpdate){applyWorkoutToTemplate(pendingTemplateUpdate);save()}pendingTemplateUpdate=null;modal=null;render()}
 if(a==="discard-new-template"){pendingTemplateUpdate=null;modal=null;render()}
 if(a==="save-new-template"){
  if(pendingTemplateUpdate){
   const name=(el("new-template-name")?.value||"").trim()||"Nytt pass";
   const t={id:crypto.randomUUID(),name,type:"strength",exercises:pendingTemplateUpdate.exercises.map(e=>({
    exerciseId:e.exerciseId,rest:e.rest||60,setValues:e.sets.map(s=>({weight:Number(s.weight)||0,reps:Number(s.reps)||0}))
   }))};
   db.templates.push(t);save();
  }
  pendingTemplateUpdate=null;modal=null;render();
 }
 if(a==="cancel"){if(confirm("Avbryt passet?")){activeWorkout=null;restEnds=0;render()}}
 if(a==="skip-rest"){restEnds=0;render()}
 if(a==="empty"){activeWorkout={id:crypto.randomUUID(),templateId:null,name:"Nytt pass",type:"strength",startedAt:new Date().toISOString(),exercises:[]};render()}
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
function csvEsc(v,delimiter=";"){v=String(v??"");const re=delimiter===";"?/[;"\n]/:/[,"\n]/;return re.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function exportCSV(){
 const delimiter=";";
 const rows=[["template","type","exercise","set_number","weight","reps","rest_seconds","duration_minutes"]];
 db.templates.forEach(t=>{
  if(t.type==="strength"){
   (t.exercises||[]).forEach(x=>{
    templateSets(x).forEach((sv,si)=>rows.push([t.name,t.type,exName(x.exerciseId),si+1,sv.weight,sv.reps,x.rest||60,""]));
   });
  }else rows.push([t.name,t.type,"","","","","",t.duration||""]);
 });
 const csv="\uFEFF"+rows.map(r=>r.map(v=>csvEsc(v,delimiter)).join(delimiter)).join("\r\n");
 download("jc-training-templates.csv",csv,"text/csv;charset=utf-8");
}
function importCSV(file){
 if(!file)return;
 const r=new FileReader();
 r.onload=()=>{
  const text=String(r.result||"").replace(/^\uFEFF/,"");
  const lines=text.split(/\r?\n/).filter(Boolean);
  if(lines.length<2)return;
  const header=lines[0];
  const delimiter=header.includes(";")?";":",";
  const templates=new Map();
  lines.slice(1).forEach(line=>{
   const [name,type,exercise,setNumber,weight,reps,rest,duration]=parseCSVLine(line,delimiter);
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
 r.readAsText(file,"utf-8");
}
function parseCSVLine(s,delimiter=","){let a=[],v="",q=false;for(let i=0;i<s.length;i++){const ch=s[i];if(ch==='"'&&s[i+1]==='"'&&q){v+='"';i++}else if(ch==='"')q=!q;else if(ch===delimiter&&!q){a.push(v);v=""}else v+=ch}a.push(v);return a}
function importJSON(file){if(!file)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.templates||!x.sessions)throw 0;db=x;save();render()}catch{alert("Ogiltig backupfil")}};r.readAsText(file)}
function download(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}

app();