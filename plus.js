// Claude Skill Hill — дополнения: опросник и план, тест уровня, свой проект и портфолио,
// практика в настоящем Claude, озвучка, игра «Поймай ошибку», страница подтверждения сертификата.
// Подключается после основного скрипта в index.html и запускает приложение (см. конец файла).

/* ---------- тексты ---------- */
T.ru.px={
 step:(i,n)=>`Шаг ${i} из ${n}`,back:"Назад",next:"Дальше",skip:"Пропустить",
 q:{goal:["Зачем вам Claude?","Курс отметит ступени, которые важнее всего для вашей цели."],
  field:["Чем вы занимаетесь?","Для некоторых профессий в курсе есть отдельная специализация."],
  lvl:["Какой у вас опыт с Claude?","Выберите сами или проверьте себя коротким тестом."],
  mins:["Сколько минут в день готовы уделять?","От этого зависит дата финиша."],
  proj:["Над чем вы хотите поработать?","Назовите свою настоящую задачу. Запросы в ступенях подстроятся под неё, а результаты соберутся в портфолио. Можно пропустить и добавить позже."],
  name:["Как вас зовут?","Имя появится на сертификате. Оно хранится только на этом устройстве."]},
 fields:[["mkt","Маркетинг и продажи","есть специализация"],["fin","Финансы и учёт","есть специализация"],["edu","Преподавание","есть специализация"],["other","Другое","общий путь"]],
 testOpt:["Проверить тестом","6 вопросов · 2 минуты"],
 projPh:"например: сайт для моей студии детейлинга",
 ideas:{work:["Отчёт для руководителя","Шаблоны ответов клиентам","Резюме и сопроводительное письмо"],biz:["Сайт для моего дела","Контент-план на месяц","Коммерческое предложение"],study:["Конспект курса и карточки","Реферат или доклад","План подготовки к экзамену"],life:["План путешествия","Семейный бюджет","Меню и список покупок на неделю"]},
 test:{h:"Тест уровня",of:(i,n)=>`Вопрос ${i} из ${n}`,
  qs:[["Какой запрос даст более точный ответ?",["«Напиши пост»","«Ты SMM-специалист кофейни. Напиши пост до 80 слов о тыквенном латте для студентов»","«Напиши самый лучший пост в мире»"],1],
   ["Claude привёл точную цифру и сослался на исследование. Что делать?",["Сразу использовать: он не ошибается","Попросить источник и проверить важное самому","Задать вопрос ещё раз и взять второй ответ"],1],
   ["Ответ получился не таким, как нужно. Какой шаг лучший?",["Открыть новый чат и отправить тот же запрос","Объяснить, что именно не так, и попросить переделать","Написать запрос заглавными буквами"],1],
   ["Что такое «Проекты» в Claude?",["Место для файлов и инструкций, общих для серии чатов на одну тему","Платные шаблоны сайтов","Список недавних поисковых запросов"],0],
   ["Вы хотите, чтобы Claude писал в вашем стиле. Что помогает больше всего?",["Попросить: «пиши красиво»","Дать 2–3 примера своих текстов","Попросить ответ подлиннее"],1],
   ["Что из этого не стоит целиком поручать ИИ?",["Черновик письма","Краткое содержание длинного документа","Итоговое решение, за которое отвечаете вы"],2]],
  res:["Вы в начале пути. Начнём с первой ступени.","База есть. Пойдём с начала, но быстро.","Уверенный уровень. Начнёте со второго раздела, первый останется открытым."],
  score:(k,n)=>`Верно: ${k} из ${n}`},
 plan:{h:"Ваш план готов",sub:"Он собран из ваших ответов. Без оплаты и регистрации.",now:"Сегодня",fin:"Финиш",
  rows:["Темп","Старт","Специализация","Ваш проект"],start:["С первой ступени","С первой ступени","Со второго раздела — «Материалы»"],noTrack:"общий путь",noProj:"добавите позже",
  note:"График показывает срок при вашем темпе. Результат зависит от практики.",
  get:"Что вы получите",free:"Курс бесплатный. Прогресс хранится только на вашем устройстве.",go:"Начать подъём",
  cards:n=>[[n,"ступеней","5 уровней и 3 специализации"],["✎","Свой проект","готовый результат к финишу"],["↗","Настоящий Claude","практика не в имитации"],["?!","Две игры","«Собери промпт» и «Поймай ошибку»"],["QR","Сертификат","со страницей подтверждения"],["♪","Озвучка","уроки можно слушать"]]},
 proj:{h:"Мой проект",none:"Выберите свою задачу — и курс будет вести вас к готовому результату.",add:"Добавить проект",edit:"Изменить",save:"Сохранить",
  works:(k,n)=>`Работ в портфолио: ${k} · этапов: ${n} из 5`,stages:["Идея","Материалы","Первая версия","Автоматизация","Готово"],
  line:p=>`Мой проект: «${p}». Отвечай применительно к нему.`,forProj:"Запрос под ваш проект",
  sheetH:"Ваш проект",sheetP:"Одна реальная задача, которую вы хотите сделать с помощью Claude за время курса."},
 claude:"Открыть в Claude ↗",listen:"▶ Слушать",stop:"■ Стоп",
 work:{h:"Ваш результат",p:"Вставьте сюда лучший ответ Claude или свой итог. Он попадёт в портфолио.",ph:"Вставьте результат…",save:"Сохранить в портфолио · +10 XP",saveAgain:"Обновить",saved:"Сохранено в портфолио",del:"Удалить"},
 folio:{h:"Портфолио",empty:"Здесь появятся результаты, которые вы сохраняете на вкладке «Практика» в ступенях.",dl:"Скачать портфолио",link:"Скопировать ссылку-подтверждение",linkOk:"Ссылка скопирована",
  note:"По ссылке и QR-коду на сертификате открывается страница с вашим именем, пройденными уровнями и списком работ."},
 spot:{tab:"Поймай ошибку",h:"Поймай ошибку",p:"В ответе спрятана одна ошибка. Найдите предложение с ней. Так тренируется принцип «Различение».",round:(i,n)=>`Раунд ${i} из ${n}`,asked:"Вопрос",answer:"Ответ (учебный пример с одной ошибкой)",
  right:"Верно! +20 XP",rightAgain:"Верно!",wrong:"Здесь всё в порядке. Ищите дальше.",why:"В чём ошибка",tip:"Как проверять",next:"Следующий раунд",done:n=>`Найдено ошибок: ${n}`},
 proof:{eb:"Подтверждение сертификата",h:n=>n||"Участник",sub:"Пройденные уровни курса Claude Skill Hill",lv:(q,t)=>`${t} ступеней · тесты с первой попытки: ${q}`,proj:"Проект",works:"Работы, сохранённые в портфолио",noLv:"Пройденных уровней пока нет.",
  note:"Страница собрана из данных на устройстве участника. Claude Skill Hill — независимый учебный курс, не официальная сертификация Anthropic.",go:"Открыть курс",bad:"Ссылка повреждена или неполная."},
 scan:"ПРОВЕРИТЬ"
};
T.en.px={
 step:(i,n)=>`Step ${i} of ${n}`,back:"Back",next:"Next",skip:"Skip",
 q:{goal:["Why do you need Claude?","The course will flag the steps that matter most for your goal."],
  field:["What do you do?","Some professions have their own track in the course."],
  lvl:["How experienced are you with Claude?","Choose yourself or check with a short test."],
  mins:["How many minutes a day can you give?","This sets your finish date."],
  proj:["What do you want to work on?","Name a real task of yours. Prompts in the steps will adapt to it and your results will build a portfolio. You can skip this and add it later."],
  name:["What’s your name?","It appears on your certificate. It is stored only on this device."]},
 fields:[["mkt","Marketing & sales","has a track"],["fin","Finance & accounting","has a track"],["edu","Teaching","has a track"],["other","Something else","general path"]],
 testOpt:["Check with a test","6 questions · 2 minutes"],
 projPh:"e.g. a website for my detailing studio",
 ideas:{work:["A report for my manager","Reply templates for clients","CV and cover letter"],biz:["A website for my business","A month of content","A sales proposal"],study:["Course notes and flashcards","An essay or report","An exam study plan"],life:["A trip plan","A family budget","A weekly menu and shopping list"]},
 test:{h:"Level test",of:(i,n)=>`Question ${i} of ${n}`,
  qs:[["Which prompt gets a more precise answer?",["“Write a post”","“You’re a café’s social media manager. Write a post under 80 words about pumpkin latte for students”","“Write the best post in the world”"],1],
   ["Claude gave an exact figure and cited a study. What do you do?",["Use it right away: it doesn’t make mistakes","Ask for the source and check what matters yourself","Ask again and take the second answer"],1],
   ["The answer isn’t what you needed. What’s the best move?",["Open a new chat and send the same prompt","Say exactly what’s wrong and ask for a redo","Write the prompt in capital letters"],1],
   ["What are “Projects” in Claude?",["A place for files and instructions shared by a series of chats on one topic","Paid website templates","A list of recent search queries"],0],
   ["You want Claude to write in your style. What helps most?",["Asking it to “write nicely”","Giving 2–3 samples of your own writing","Asking for a longer answer"],1],
   ["Which of these shouldn’t be handed over to AI entirely?",["A draft email","A summary of a long document","The final decision you’re responsible for"],2]],
  res:["You’re at the start. We’ll begin with step one.","You have the basics. We’ll start from the beginning, but quickly.","Confident level. You’ll start from section two; section one stays open."],
  score:(k,n)=>`Correct: ${k} of ${n}`},
 plan:{h:"Your plan is ready",sub:"Built from your answers. No payment, no sign-up.",now:"Today",fin:"Finish",
  rows:["Pace","Start","Track","Your project"],start:["From step one","From step one","From section two, “Materials”"],noTrack:"general path",noProj:"add it later",
  note:"The chart shows the timeline at your pace. Results depend on practice.",
  get:"What you get",free:"The course is free. Progress is stored only on your device.",go:"Start climbing",
  cards:n=>[[n,"steps","5 levels and 3 tracks"],["✎","Your own project","a finished result by the end"],["↗","The real Claude","practice, not a simulation"],["?!","Two games","“Build the prompt” and “Spot the error”"],["QR","Certificate","with a verification page"],["♪","Audio","listen to the lessons"]]},
 proj:{h:"My project",none:"Pick a task of your own and the course will lead you to a finished result.",add:"Add a project",edit:"Edit",save:"Save",
  works:(k,n)=>`Portfolio items: ${k} · stages: ${n} of 5`,stages:["Idea","Materials","First version","Automation","Done"],
  line:p=>`My project: “${p}”. Answer with it in mind.`,forProj:"Prompt for your project",
  sheetH:"Your project",sheetP:"One real task you want to get done with Claude during the course."},
 claude:"Open in Claude ↗",listen:"▶ Listen",stop:"■ Stop",
 work:{h:"Your result",p:"Paste Claude’s best answer or your own outcome. It goes into your portfolio.",ph:"Paste the result…",save:"Save to portfolio · +10 XP",saveAgain:"Update",saved:"Saved to portfolio",del:"Delete"},
 folio:{h:"Portfolio",empty:"Results you save on the “Practice” tab of each step will appear here.",dl:"Download portfolio",link:"Copy verification link",linkOk:"Link copied",
  note:"The link and the QR code on your certificate open a page with your name, completed levels and list of works."},
 spot:{tab:"Spot the error",h:"Spot the error",p:"One error is hidden in the answer. Find the sentence that contains it. This trains the “Discernment” principle.",round:(i,n)=>`Round ${i} of ${n}`,asked:"Question",answer:"Answer (a teaching example with one error)",
  right:"Correct! +20 XP",rightAgain:"Correct!",wrong:"This one is fine. Keep looking.",why:"What’s wrong",tip:"How to check",next:"Next round",done:n=>`Errors found: ${n}`},
 proof:{eb:"Certificate verification",h:n=>n||"Participant",sub:"Completed levels of Claude Skill Hill",lv:(q,t)=>`${t} steps · quizzes passed first try: ${q}`,proj:"Project",works:"Works saved to the portfolio",noLv:"No completed levels yet.",
  note:"This page is built from data on the participant’s device. Claude Skill Hill is an independent course, not an official Anthropic certification.",go:"Open the course",bad:"The link is damaged or incomplete."},
 scan:"VERIFY"
};
T.ru.pr=[...T.ru.pr,T.ru.px.spot.tab];T.en.pr=[...T.en.pr,T.en.px.spot.tab];
const px=()=>t().px;
const SITE=location.origin+location.pathname;

/* ---------- практика в настоящем Claude ---------- */
function claudeLink(text){const u="https://claude.ai/new?q="+encodeURIComponent(text);
 return u.length>7000?"":`<a class="copy" href="${u}" target="_blank" rel="noopener" style="text-decoration:none">${px().claude}</a>`}
function projPrompt(prompt){const p=S.profile&&S.profile.project;return p?prompt+"\n\n"+px().proj.line(p):prompt}

/* ---------- озвучка ---------- */
let ttsBtn=null;
function ttsStop(){try{speechSynthesis.cancel()}catch(e){}if(ttsBtn){ttsBtn.textContent=px().listen;ttsBtn=null}}
function ttsToggle(btn,text){if(ttsBtn){const same=ttsBtn===btn;ttsStop();if(same)return}
 try{const u=new SpeechSynthesisUtterance(text);u.lang=S.lang==="en"?"en-US":"ru-RU";u.rate=1;u.onend=u.onerror=()=>{if(ttsBtn===btn){btn.textContent=px().listen;ttsBtn=null}};
  speechSynthesis.speak(u);ttsBtn=btn;btn.textContent=px().stop}catch(e){}}
const ttsOk=()=>"speechSynthesis" in window&&"SpeechSynthesisUtterance" in window;
{const c0=close;close=function(){ttsStop();c0()}}

/* ---------- вкладка «Практика» в ступени: проект, Claude, результат ---------- */
function plusPractice(pane,x,k){const P=px(),has=S.profile&&S.profile.project,txt=projPrompt(x.prompt);S.works=S.works||{};const w=S.works[k];
 const box=document.createElement("div");box.style.cssText="display:flex;flex-direction:column;gap:10px;margin-top:6px";
 box.innerHTML=(has?`<div class="eyebrow" style="margin-top:10px">${P.proj.forProj}</div><div class="prompt" id="ppTxt"></div><div class="row2"><button class="copy" id="ppCopy" style="margin:0">${t().copy}</button>${claudeLink(txt)}</div>`
  :`<div class="row2">${claudeLink(x.prompt)}<button class="copy" id="ppAdd" style="margin:0">${P.proj.add}</button></div>`)+
  `<div class="workbox"><div class="eyebrow">${P.work.h}</div><p style="margin:0;font-size:14px;color:var(--muted)">${P.work.p}</p>
   <textarea id="ppWork" placeholder="${P.work.ph}" maxlength="4000"></textarea>
   <div class="row2"><button class="btn" id="ppSave">${w?P.work.saveAgain:P.work.save}</button>${w?`<button class="copy" id="ppDel" style="margin:0">${P.work.del}</button>`:""}<span id="ppMsg" style="font-weight:600;color:var(--good)"></span></div></div>`;
 pane.appendChild(box);
 if(has){box.querySelector("#ppTxt").textContent=txt;copyBtn(box.querySelector("#ppCopy"),txt,box.querySelector("#ppTxt"))}
 else box.querySelector("#ppAdd").onclick=()=>editProject(()=>{renderPath();const i=+k.split(":")[1];openStep(i,"practice")});
 const ta=box.querySelector("#ppWork");if(w)ta.value=w.t;
 box.querySelector("#ppSave").onclick=()=>{const v=ta.value.trim();if(!v)return;const first=!S.works[k];S.works[k]={t:v,d:today()};save();if(first)addXP(10);
  box.querySelector("#ppMsg").textContent=P.work.saved;box.querySelector("#ppSave").textContent=P.work.saveAgain;renderProj()};
 if(w)box.querySelector("#ppDel").onclick=()=>{delete S.works[k];save();renderProj();const i=+k.split(":")[1];openStep(i,"practice")}}

/* ---------- карточка проекта на «Пути» ---------- */
function workList(){S.works=S.works||{};const out=[];L().forEach(Lv=>Lv.steps.forEach((x,i)=>{const k=sid(Lv.id,i);if(S.works[k])out.push({k,Lv,x,i,w:S.works[k]})}));return out}
function stagesDone(){const base=L()[0],set=new Set();workList().forEach(o=>{if(o.Lv.id===base.id)set.add(o.x.s)});return set}
function renderProj(){const box=$("#proj");if(!box)return;const P=px().proj,p=S.profile&&S.profile.project,st=stagesDone();
 box.hidden=!S.profile;if(!S.profile)return;
 box.innerHTML=p?`<div class="row2" style="justify-content:space-between"><span class="eyebrow">${P.h}</span><button class="copy" id="pjEdit" style="margin:0">${P.edit}</button></div>
  <h3 style="margin:0;font:600 17px/1.3 var(--display)">${esc(p)}</h3>
  <div class="stages">${P.stages.map((s,i)=>`<span class="${st.has(i)?"on":""}">${s}</span>`).join("")}</div>
  <p style="margin:0;font-size:14px;color:var(--muted)">${P.works(workList().length,st.size)}</p>`
  :`<span class="eyebrow">${P.h}</span><p style="margin:0">${P.none}</p><div><button class="btn" id="pjEdit">${P.add}</button></div>`;
 $("#pjEdit").onclick=()=>editProject(renderPath)}
function editProject(after){const P=px(),goal=(S.profile&&S.profile.goal)||"work";
 const s=sheet(`<div class="hd"><span class="eyebrow">Claude Skill Hill</span><button class="x">×</button></div><h3>${P.proj.sheetH}</h3><p class="lead" style="margin:-4px 0 16px">${P.proj.sheetP}</p>
  <div class="form"><input type="text" id="pjIn" maxlength="80" placeholder="${P.projPh}" value="${esc((S.profile&&S.profile.project)||"")}">
  <div class="ideas">${P.ideas[goal].map(z=>`<button class="tab">${esc(z)}</button>`).join("")}</div></div>
  <div class="actions"><button class="btn" id="pjOk">${P.proj.save}</button></div>`);
 s.querySelectorAll(".ideas .tab").forEach(b=>b.onclick=()=>{$("#pjIn").value=b.textContent});
 s.querySelector(".x").onclick=close;
 $("#pjOk").onclick=()=>{S.profile=S.profile||{goal:"work",lvl:"new",mins:15,name:""};S.profile.project=$("#pjIn").value.trim();save();close();after&&after()}}

/* ---------- опросник ---------- */
function pickLang(then){const s=sheet(`<div class="hd"><span class="eyebrow">Claude Skill Hill</span></div><h3>Выберите язык<br><span style="color:var(--muted)">Choose your language</span></h3>
  <div class="choices" style="margin-top:6px"><button class="choice" data-l="ru"><b>Русский</b><span>курс на русском</span></button><button class="choice" data-l="en"><b>English</b><span>the course in English</span></button></div>`);
 s.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{S.lang=b.dataset.l;S.langPicked=true;save();applyLang();then()})}
function onboarding(){if(!S.profile&&!S.langPicked){pickLang(onboarding);return}
 const o=t().ob,P=px(),first=!S.profile;
 const st={goal:"work",field:"other",lvl:"new",mins:15,name:"",project:"",...(S.profile||{})};
 const order=["goal","field","lvl","mins","proj","name"];let i=0;
 const opts={goal:o.goals,field:P.fields,lvl:[...o.lvls,["test",...P.testOpt]],mins:o.minsL};
 const head=n=>`<div class="hd"><span class="eyebrow">${P.step(n,order.length)}</span>${first?"":`<button class="x">×</button>`}</div><div class="meter" style="margin:8px 0 18px"><i style="width:${n/order.length*100}%;background:var(--accent)"></i></div>`;
 const foot=(nextLbl,canSkip)=>`<div class="actions">${i>0?`<button class="btn ghost" id="obBack">${P.back}</button>`:""}<button class="btn" id="obNext">${nextLbl}</button>${canSkip?`<button class="btn ghost" id="obSkip">${P.skip}</button>`:""}</div>`;
 const wire=s=>{if(s.querySelector(".x"))s.querySelector(".x").onclick=close;if($("#obBack"))$("#obBack").onclick=()=>{i--;show()}};
 function show(){const key=order[i],[h,sub]=P.q[key];let body="";
  if(opts[key])body=`<div class="choices">${opts[key].map(([v,a,b])=>`<button class="choice" data-v="${v}" aria-pressed="${String(st[key])===String(v)}"><b>${a}</b><span>${b}</span></button>`).join("")}</div>`;
  if(key==="proj")body=`<div class="form"><input type="text" id="obProj" maxlength="80" placeholder="${P.projPh}" value="${esc(st.project||"")}"><div class="ideas">${P.ideas[st.goal].map(z=>`<button class="tab">${esc(z)}</button>`).join("")}</div></div>`;
  if(key==="name")body=`<input type="text" id="obName" maxlength="40" placeholder="${o.namePh}" value="${esc(st.name||"")}" autocomplete="name">`;
  const s=sheet(head(i+1)+`<h3>${h}</h3><p class="lead" style="margin:-4px 0 18px">${sub}</p>${body}`+foot(P.next,key==="proj"||key==="name"));wire(s);
  s.querySelectorAll(".choice").forEach(b=>b.onclick=()=>{const v=b.dataset.v;
   if(v==="test"){placement(k=>{st.lvl=k;st.tested=true;i++;show()},show);return}
   st[key]=key==="mins"?+v:v;if(key==="lvl")st.tested=false;s.querySelectorAll(".choice").forEach(z=>z.setAttribute("aria-pressed",z===b));setTimeout(()=>{i++;show()},160)});
  s.querySelectorAll(".ideas .tab").forEach(b=>b.onclick=()=>{$("#obProj").value=b.textContent});
  const grab=()=>{if(key==="proj")st.project=$("#obProj").value.trim();if(key==="name")st.name=$("#obName").value.trim()};
  $("#obNext").onclick=()=>{grab();if(i<order.length-1){i++;show()}else plan()};
  if($("#obSkip"))$("#obSkip").onclick=()=>{if(i<order.length-1){i++;show()}else plan()}}
 function plan(){const pl=P.plan,base=L()[0],left=base.steps.filter((_,k)=>!S.done.includes(sid(base.id,k))).length;
  const prev=S.profile;S.profile=st;const fin=finishDate(left);S.profile=prev;
  const trk=L().find(x=>x.id===st.field),total=L().reduce((a,x)=>a+x.steps.length,0),li={new:0,some:1,pro:2}[st.lvl]||0;
  const now=new Date().toLocaleDateString(S.lang==="en"?"en-GB":"ru-RU",{day:"numeric",month:"long"});
  const rows=[t().paceN[st.mins],pl.start[li],trk?trk.name:pl.noTrack,st.project||pl.noProj];
  const s=sheet(`<div class="hd"><span class="eyebrow">Claude Skill Hill</span></div><h3>${pl.h}${st.name?", "+esc(st.name.split(" ")[0]):""}</h3><p class="lead" style="margin:-4px 0 14px">${pl.sub}</p>
   <div class="card planchart"><svg viewBox="-16 -30 352 150" role="img" aria-label="${pl.now} ${now} → ${pl.fin} ${fin}">
    <path d="M0 88 C60 86 90 70 130 52 S220 12 320 6" fill="none" stroke="var(--done)" stroke-width="7" stroke-linecap="round"/>
    <line x1="0" y1="88" x2="0" y2="104" stroke="var(--accent)" stroke-dasharray="3 3"/><line x1="320" y1="6" x2="320" y2="104" stroke="var(--done)" stroke-dasharray="3 3"/>
    <circle cx="0" cy="88" r="8" fill="var(--accent)" stroke="var(--surface)" stroke-width="3"/><circle cx="320" cy="6" r="8" fill="var(--done)" stroke="var(--surface)" stroke-width="3"/>
    <text x="0" y="68" font-size="11" font-weight="600" fill="var(--accent)">${pl.now}</text><text x="0" y="118" font-size="11" fill="var(--muted)">${now}</text>
    <text x="320" y="-12" font-size="11" font-weight="600" fill="var(--ink)" text-anchor="end">${pl.fin}</text><text x="320" y="118" font-size="11" fill="var(--muted)" text-anchor="end">${fin}</text></svg>
    <dl class="prow">${pl.rows.map((r,k)=>`<dt>${r}</dt><dd>${esc(rows[k])}</dd>`).join("")}</dl>
    <p style="margin:0;font-size:12.5px;color:var(--muted)">${pl.note}</p></div>
   <div class="eyebrow" style="margin:18px 0 8px">${pl.get}</div>
   <div class="gets">${pl.cards(total).map(([a,b,c])=>`<div><i>${a}</i><b>${b}</b><span>${c}</span></div>`).join("")}</div>
   <p style="margin:14px 0 0;font-weight:600">${pl.free}</p>
   <div class="actions"><button class="btn ghost" id="obBack">${P.back}</button><button class="btn ok" id="obGo">${pl.go}</button></div>`);
  $("#obBack").onclick=()=>{i=order.length-1;show()};
  $("#obGo").onclick=()=>{S.profile=st;save();close();lv=0;go("path")}}
 show()}

/* ---------- тест уровня ---------- */
function placement(done,cancel){const P=px(),Q=P.test.qs;let i=0,score=0;
 function ask(){const [q,o,a]=Q[i];
  const s=sheet(`<div class="hd"><span class="eyebrow">${P.test.h} · ${P.test.of(i+1,Q.length)}</span><button class="x">×</button></div><div class="meter" style="margin:8px 0 18px"><i style="width:${i/Q.length*100}%;background:var(--accent)"></i></div>
   <p class="q" style="font-size:18px">${esc(q)}</p>${o.map((z,j)=>`<button class="opt" data-j="${j}">${esc(z)}</button>`).join("")}`);
  s.querySelector(".x").onclick=cancel;
  s.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(s.dataset.lock)return;s.dataset.lock="1";const j=+b.dataset.j;if(j===a)score++;
   b.classList.add(j===a?"right":"wrong");if(j!==a)s.querySelector(`.opt[data-j="${a}"]`).classList.add("right");
   setTimeout(()=>{delete s.dataset.lock;i++;i<Q.length?ask():result()},750)})}
 function result(){const k=score<=2?0:score<=4?1:2;
  sheet(`<div class="hd"><span class="eyebrow">${P.test.h}</span></div><div class="score" style="margin-top:8px">${score}<span style="font-size:20px;color:var(--muted)"> / ${Q.length}</span></div>
   <p style="font-weight:600;font-size:18px;margin:6px 0 0">${P.test.res[k]}</p><div class="actions"><button class="btn" id="plOk">${P.next}</button></div>`);
  $("#plOk").onclick=()=>done(["new","some","pro"][k])}
 ask()}

/* ---------- игра «Поймай ошибку» ---------- */
let sIdx=null;
function renderSpot(){const P=px().spot,R=S.lang==="en"?window.SPOT_EN:window.SPOT_RU,box=$("#pr-spot");S.spot=S.spot||[];
 if(sIdx===null){const k=R.findIndex(r=>!S.spot.includes(r.id));sIdx=k<0?0:k}
 const r=R[sIdx];let tried=false;
 box.innerHTML=`<div><h2 class="v">${P.h}</h2><p class="lead">${P.p}</p></div>
 <div class="card" style="display:flex;flex-direction:column;gap:12px"><div class="row2" style="justify-content:space-between"><span class="eyebrow">${P.round(sIdx+1,R.length)} · ${esc(r.kind)}</span><span class="time">${P.done(S.spot.length)}</span></div>
 <div><div class="slot"><span class="lab">${P.asked}</span></div><p style="margin:2px 0 0;font-weight:600">${esc(r.q)}</p></div>
 <div class="slot"><span class="lab">${P.answer}</span>${r.s.map((z,j)=>`<button class="opt" data-j="${j}">${esc(z)}</button>`).join("")}</div>
 <div id="spRes"></div></div>`;
 box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(box.dataset.locked)return;const j=+b.dataset.j;
  if(j!==r.bad){tried=true;b.classList.add("right");b.disabled=true;$("#spRes").innerHTML=`<p style="margin:0;font-weight:600">${P.wrong}</p>`;return}
  box.dataset.locked="1";b.classList.add("wrong");const firstTime=!tried&&!S.spot.includes(r.id);if(!S.spot.includes(r.id)){S.spot.push(r.id);save()}if(firstTime)addXP(20);
  $("#spRes").innerHTML=`<p style="margin:0 0 10px;font-weight:700">${firstTime?P.right:P.rightAgain}</p><div class="cmp"><div class="b"><span>${P.why}</span><p style="margin:0">${esc(r.why)}</p></div><div class="g"><span>${P.tip}</span><p style="margin:0">${esc(r.tip)}</p></div></div>
   <div class="row2" style="margin-top:12px"><button class="btn" id="spNext">${P.next}</button></div>`;
  $("#spNext").onclick=()=>{sIdx=(sIdx+1)%R.length;delete box.dataset.locked;renderSpot();scrollTo(0,0)}});
 delete box.dataset.locked}

/* ---------- портфолио и подтверждение ---------- */
const b64e=s=>btoa(String.fromCharCode(...new TextEncoder().encode(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const b64d=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g,"+").replace(/_/g,"/")),c=>c.charCodeAt(0)));
// Компактный формат данных в ссылке: имя ␟ уровни (id:ГГММДД:тесты,…) ␟ проект ␟ работы (id:1.4.9;id2:2) ␟ всего работ
const SEP="\x1f";
function proofData(mode){const Ls=L(),c=[];S.certDates=S.certDates||{};
 Ls.forEach(Lv=>{const n=Lv.steps.length;if(n&&Lv.steps.every((_,i)=>S.done.includes(sid(Lv.id,i))))
  c.push(Lv.id+":"+(S.certDates[Lv.id]||new Date().toISOString()).slice(2,10).replace(/-/g,"")+":"+Math.min(n,S.quiz.filter(k=>k.startsWith(Lv.id+":")).length))});
 const all=workList(),p=S.profile||{},lim=mode===0?all.length:mode===1?6:0,g={};
 all.slice(0,lim).forEach(o=>(g[o.Lv.id]=g[o.Lv.id]||[]).push(o.i));
 return [(p.name||"").slice(0,40),c.join(","),mode<3?(p.project||"").slice(0,mode===0?80:40):"",Object.keys(g).map(id=>id+":"+g[id].join(".")).join(";"),all.length].join(SEP)}
function proofLink(mode){return SITE+"#c="+b64e(proofData(mode||0))}
function proofParse(h){const f=b64d(h).split(SEP);if(f.length<5)return null;
 return {n:f[0],c:f[1]?f[1].split(",").map(z=>{const [id,d,q]=z.split(":");return [id,"20"+d.slice(0,2)+"-"+d.slice(2,4)+"-"+d.slice(4,6),+q]}):[],p:f[2],
  w:f[3]?f[3].split(";").flatMap(z=>{const [id,l]=z.split(":");return l.split(".").map(i=>id+":"+i)}):[],x:+f[4]||0}}
function showProof(){const P=px().proof;let d=null;try{d=proofParse(location.hash.slice(3))}catch(e){}
 const Ls=L(),fmt=x=>new Date(x).toLocaleDateString(S.lang==="en"?"en-GB":"ru-RU",{day:"numeric",month:"long",year:"numeric"});
 const done=()=>{history.replaceState(null,"",location.pathname);close();if(!S.profile)onboarding()};
 if(!d||typeof d!=="object"){const s=sheet(`<div class="hd"><span class="eyebrow">${P.eb}</span><button class="x">×</button></div><p>${P.bad}</p><div class="actions"><button class="btn" id="prGo">${P.go}</button></div>`);s.querySelector(".x").onclick=done;$("#prGo").onclick=done;return}
 const lvls=(Array.isArray(d.c)?d.c:[]).map(([id,dt,q])=>{const Lv=Ls.find(x=>x.id===id);return Lv?`<div class="card" style="padding:12px 14px"><b>${Lv.kind==="track"?"★":Lv.n+"."} ${esc(Lv.name)}</b><div style="font-size:14px;color:var(--muted)">${esc(fmt(dt))} · ${P.lv(+q||0,Lv.steps.length)}</div><div style="font-size:14px;margin-top:4px">${(Lv.skills||[]).map(esc).join(" · ")}</div></div>`:""}).join("");
 const works=(Array.isArray(d.w)?d.w:[]).map(k=>{const [id,i]=String(k).split(":"),Lv=Ls.find(x=>x.id===id),x=Lv&&Lv.steps[+i];return x?`<li>${esc(x.t)} <span style="color:var(--muted)">· ${esc(Lv.name)}</span></li>`:""}).join("");
 const more=(+d.x||0)-(Array.isArray(d.w)?d.w.length:0);
 const s=sheet(`<div class="hd"><span class="eyebrow">${P.eb}</span><button class="x">×</button></div><h3>${esc(P.h(d.n))}</h3><p class="lead" style="margin:-4px 0 14px">${P.sub}</p>
  <div style="display:flex;flex-direction:column;gap:8px">${lvls||`<p style="margin:0">${P.noLv}</p>`}</div>
  ${d.p?`<div class="eyebrow" style="margin:18px 0 6px">${P.proj}</div><p style="margin:0;font-weight:600">${esc(d.p)}</p>`:""}
  ${works?`<div class="eyebrow" style="margin:18px 0 6px">${P.works}</div><ul style="margin:0;padding-left:20px">${works}${more>0?`<li>+${more}</li>`:""}</ul>`:""}
  <p style="margin:18px 0 0;font-size:13px;color:var(--muted)">${P.note}</p><div class="actions"><button class="btn" id="prGo">${P.go}</button></div>`);
 s.querySelector(".x").onclick=done;$("#prGo").onclick=done}
function renderFolio(){const box=$("#folio");if(!box)return;const F=px().folio,W=workList(),p=S.profile&&S.profile.project;
 box.innerHTML=`<div class="eyebrow">${F.h}${p?" · "+esc(p):""}</div>
  ${W.length?`<div style="display:flex;flex-direction:column;gap:10px">${W.map(o=>`<div><b>${esc(o.x.t)}</b> <span style="color:var(--muted);font-size:13px">· ${esc(o.Lv.name)} · ${esc(o.w.d)}</span><div class="excerpt">${esc(o.w.t.slice(0,220))}${o.w.t.length>220?"…":""}</div></div>`).join("")}</div>`:`<p style="margin:0;color:var(--muted)">${F.empty}</p>`}
  <div class="row2">${W.length?`<button class="btn ghost" id="foDl">${F.dl}</button>`:""}<button class="btn ghost" id="foLink">${F.link}</button></div>
  <p style="margin:0;color:var(--muted);font-size:13px">${F.note}</p>`;
 if(W.length)$("#foDl").onclick=()=>{const txt=["Claude Skill Hill — "+F.h,(S.profile&&S.profile.name)||"",p||"",""].concat(W.map(o=>`## ${o.x.t} (${o.Lv.name}, ${o.w.d})\n${o.w.t}\n`)).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain;charset=utf-8"}));a.download="skill-hill-portfolio.txt";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
 $("#foLink").onclick=()=>{const u=proofLink(0);(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast(F.linkOk),()=>{const i=document.createElement("input");i.type="text";i.readOnly=true;i.value=u;box.appendChild(i);i.select()})}}
/* QR на сертификате */
function drawQR(x,ok){if(!ok||!window.qrMatrix)return;let m=null;
 for(const mode of [1,2,3]){const k=qrMatrix(proofLink(mode));if(k&&(!m||k.length<m.length))m=k;if(m&&m.length<=57)break}
 m=m||qrMatrix(SITE);if(!m)return;
 const size=150,x0=64,y0=64,q=3,cell=size/(m.length+2*q);x.save();x.fillStyle="#FFFFFF";x.beginPath();x.roundRect(x0,y0,size,size,8);x.fill();x.fillStyle="#080B24";
 for(let r=0;r<m.length;r++)for(let c=0;c<m.length;c++)if(m[r][c])x.fillRect(x0+(c+q)*cell,y0+(r+q)*cell,cell+.3,cell+.3);
 x.fillStyle="rgba(242,184,61,.9)";x.font="500 10px Unbounded, sans-serif";x.textAlign="center";x.letterSpacing="2px";x.fillText(px().scan,x0+size/2,y0+size+18);x.letterSpacing="0px";x.restore()}

/* ---------- запуск ---------- */
applyLang();chips();go("path");
if(location.hash.startsWith("#c="))showProof();else if(!S.profile)onboarding();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
