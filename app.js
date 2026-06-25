let reviewed = new Set();
let currentStudent = null;
let selected = new Set();
let soundOn = true;

function beep(type="ding"){
  if(!soundOn) return;
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    const tones = {
      ding:[880,0.08],
      file:[520,0.045],
      unlock:[660,0.06],
      complete:[784,0.09],
      error:[180,0.08]
    };
    const [freq,dur] = tones[type] || tones.ding;
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  }catch(e){}
}

function setStatus(text, tone=null){
  document.getElementById("status").textContent = text;
  if(tone) beep(tone);
}

function toggleSound(){
  soundOn = !soundOn;
  document.getElementById("soundButton").textContent = soundOn ? "Sound: On" : "Sound: Off";
  if(soundOn) beep("ding");
}

function updateBar(){
  const pct = (reviewed.size / students.length) * 100;
  document.getElementById("bar").style.width = pct + "%";
  document.getElementById("logCount").textContent = `${reviewed.size} of ${students.length} cases reviewed`;
}

function loadingThen(callback, msg="Loading assessment record..."){
  document.getElementById("screen").innerHTML = `<div class="loading">${msg}<br><br>████████░░<br><br>Accessing GIDA Labs evidence database...</div>`;
  beep("file");
  setTimeout(callback, 450);
}

function showIntro(){
  setStatus("Start screen loaded.", "ding");
  document.getElementById("screen").innerHTML = `
    <h2>Welcome, Researcher</h2>
    <div class="labbox">
      <strong>Your task:</strong> Review five case files and decide what the evidence can and cannot tell you.
    </div>
    <p>This prototype uses one simple content target: <strong>plants need water, sunlight, and air to grow.</strong></p>
    <p>The science content remains stable. The access conditions change.</p>
    <div class="evidence">
      <strong>Guiding Question:</strong><br>
      When a student answers incorrectly, what evidence do we need before making instructional or special education decisions?
    </div>
    <h3>Before You Begin</h3>
    <p>Make a hypothesis:</p>
    <div class="choice-big" onclick="hypothesis('same')">All students may know the science.</div>
    <div class="choice-big" onclick="hypothesis('different')">Some students may have content gaps.</div>
    <div class="choice-big" onclick="hypothesis('unknown')">One measure is insufficient.</div>
    <div id="hypothesisBox" class="feedback">No hypothesis selected yet.</div>
    <button class="primary" onclick="showFolders()">Open Case Files</button>
  `;
}

function hypothesis(type){
  const text = {
    same:"Hypothesis recorded: The students may have similar science understanding, but different access to the assessment.",
    different:"Hypothesis recorded: Some students may have content gaps, but more evidence is needed.",
    unknown:"Hypothesis recorded: One assessment condition is not enough evidence."
  };
  document.getElementById("hypothesisBox").textContent = text[type];
  setStatus("Hypothesis saved.", "file");
}

function showModules(){
  setStatus("Module directory loaded.", "file");
  document.getElementById("screen").innerHTML = `
    <h2>GIDA Labs Module Directory</h2>
    <p>This assignment includes a vertical slice of a larger professional development concept.</p>
    <div class="row">
      <div class="folder-card module-card" onclick="showFolders()"><strong>Module 001</strong><br><span class="badge">Available</span><p>Assessment Access</p></div>
      <div class="folder-card module-card locked"><strong>Module 002</strong><br><span class="badge">Locked</span><p>Language Samples</p></div>
      <div class="folder-card module-card locked"><strong>Module 003</strong><br><span class="badge">Locked</span><p>Student Portfolios</p></div>
      <div class="folder-card module-card locked"><strong>Module 004</strong><br><span class="badge">Locked</span><p>Peer Assessment</p></div>
      <div class="folder-card module-card locked"><strong>Module 005</strong><br><span class="badge">Locked</span><p>Self-Assessment Tools</p></div>
    </div>
    <div class="warning">Prototype note: Only Module 001 is active for this presentation.</div>
  `;
}

function showFolders(){
  setStatus("Case files available.", "file");
  document.getElementById("screen").innerHTML = `
    <h2>Case Files</h2>
    <p>Select a case file. Complete the assessment task, then decide what the evidence supports.</p>
    <div class="row">
      ${students.map(s => `
        <div class="folder-card" onclick="openStudent('${s.id}')">
          <strong>Case File ${s.caseNo}</strong><br>
          <span class="badge">${s.folder}</span>
          <p>${s.name}</p>
          <p class="smallnote">${s.access}</p>
          ${reviewed.has(s.id) ? '<span class="badge">Reviewed</span>' : ''}
        </div>`).join("")}
    </div>
    <div class="warning">
      Do not jump directly from “incorrect” to “does not understand.” Evaluate the quality of the evidence.
    </div>
    <button onclick="showExperts()">Professional Consultation</button>
  `;
}

function openStudent(id){
  loadingThen(()=>renderStudent(id), "Opening case file...");
}

function renderStudent(id){
  currentStudent = students.find(s=>s.id===id);
  selected = new Set();
  const s = currentStudent;
  const q = s.visual ? `<span class="visual-challenge" data-text="${s.question}">${s.question}</span>` : s.question;
  document.getElementById("screen").classList.toggle("flash-access", !!s.visual);
  document.getElementById("screen").innerHTML = `
    <h2>Case File ${s.caseNo}: ${s.name}</h2>
    <div class="badge">${s.access}</div>
    <div class="notebook">Case Profile: ${s.profile}</div>
    <div class="question">${q}</div>
    <div id="options">
      ${s.options.map(opt=>{
        let label = opt;
        if(s.visual) label = `<span class="moving visual-challenge" data-text="${opt}">${opt}</span>`;
        if(s.symbols) label = `<span class="symbol">${opt.split(" ")[0]}</span> ${opt.substring(2)}`;
        return `<label class="option"><input type="checkbox" value="${opt}" onchange="toggleOption(this)"> ${label}</label>`;
      }).join("")}
    </div>
    ${s.visual ? '<button onclick="triggerBlackout()">Trigger Visual Access Interruption</button>' : ''}
    <button class="primary" onclick="analyze()">Analyze Evidence</button>
    <button onclick="document.getElementById('screen').classList.remove('flash-access'); showFolders()">Back to Case Files</button>
    <div id="analysis" class="feedback">Awaiting response.</div>
  `;
  if(s.visual){
    setStatus("Visual access barrier active.", "error");
    setTimeout(triggerBlackout, 700);
  } else {
    setStatus(`Case File ${s.caseNo} opened.`, "file");
  }
}

function triggerBlackout(){
  const overlay = document.getElementById("blackout");
  overlay.style.display = "flex";
  beep("error");
  setTimeout(()=>{ overlay.style.display = "none"; }, 3000);
}

function toggleOption(box){
  if(box.checked) selected.add(box.value);
  else selected.delete(box.value);
}

function sameSet(a,b){ return a.length===b.length && a.every(x=>b.includes(x)); }

function analyze(){
  document.getElementById("screen").classList.remove("flash-access");
  const s = currentStudent;
  const ans = Array.from(selected);
  const correct = sameSet(ans, s.correct);
  reviewed.add(s.id);
  updateBar();
  setStatus(`Evidence logged for Case File ${s.caseNo}.`, correct ? "complete" : "error");

  const suggestedExpert = s.expertKeys.map(key => `<button onclick="openExpert('${key}')">Consult ${experts[key].name}</button>`).join("");

  document.getElementById("analysis").innerHTML = `
    <div class="${correct ? 'correct' : 'incorrect'}" style="padding:10px;border:1px solid #8a999f;">
      <strong>Assessment Result:</strong> ${correct ? "Correct content response." : "Incomplete or incorrect response."}
    </div>
    <div class="evidence"><strong>Interpretation:</strong> ${s.interpretation}</div>
    <h3>Based on today’s evidence, what is the most appropriate instructional conclusion?</h3>
    <div class="choice-big" onclick="decision('mastery')">The student clearly understands the science concept.</div>
    <div class="choice-big" onclick="decision('support')">The student needs another opportunity with different supports.</div>
    <div class="choice-big" onclick="decision('format')">Offer another response format.</div>
    <div class="choice-big" onclick="decision('evidence')">More evidence is needed before drawing conclusions.</div>
    <div id="decisionBox" class="feedback">Select a conclusion.</div>
    <div style="margin-top:10px;">${suggestedExpert}</div>
  `;
}

function decision(d){
  const response = {
    mastery:"Possible, but be careful: mastery should be supported by accessible evidence aligned to the content target.",
    support:"Strong next step. Changing supports may clarify whether the issue is content knowledge or access.",
    format:"Strong next step. Response format should match the learning target, not create unnecessary barriers.",
    evidence:"Best professional conclusion. A single assessment condition should not carry the full weight of instructional or referral decisions."
  };
  document.getElementById("decisionBox").textContent = response[d];
  setStatus("Instructional conclusion recorded.", "file");
}

function showReveal(){
  document.getElementById("screen").classList.remove("flash-access");
  setStatus("Evidence summary generated.", "complete");
  document.getElementById("screen").innerHTML = `
    <h2>Evidence Summary</h2>
    <div class="evidence"><strong>Finding 1:</strong> The science content did not change. Only the access conditions changed.</div>
    <div class="evidence"><strong>Finding 2:</strong> English-only assessment can measure language proficiency more than content mastery.</div>
    <div class="evidence"><strong>Finding 3:</strong> Multilingual learners may be under-identified or misidentified for special education when teams do not separate language development, content knowledge, and possible disability-related needs.</div>
    <div class="evidence"><strong>Finding 4:</strong> Translanguaging, visuals, oral explanation, drawing, symbols, and AAC can all provide valid evidence when aligned to the learning target.</div>
    <div class="notebook">
      Final Reveal:<br><br>
      Every student in this investigation understood that plants need water, sunlight, and air.<br><br>
      The variable was never the science.<br>
      The variable was the assessment.
    </div>
    <button onclick="showExperts()">Professional Consultation</button>
  `;
}

function showExperts(){
  document.getElementById("screen").classList.remove("flash-access");
  setStatus("Professional consultation archive opened.", "unlock");
  document.getElementById("screen").innerHTML = `
    <h2>Professional Consultation</h2>
    <p>Open a panel to connect the investigation to scholarship and classroom application. External links open in a new tab.</p>
    <div class="archive-grid">
      ${Object.entries(experts).map(([key,e])=>`
        <div class="archive-card">
          <h3>${e.name}</h3>
          <span class="badge">${e.type}</span>
          <p><strong>Focus:</strong> ${e.focus}</p>
          <p class="smallnote">${e.bestAfter}</p>
          <button class="primary" onclick="openExpert('${key}')">Consult</button>
        </div>
      `).join("")}
    </div>
  `;
}

function openExpert(key){
  const e = experts[key];
  setStatus(`Consultation connected: ${e.name}.`, "unlock");
  const linkHtml = e.links.map(([label,url]) => `<a class="linkbutton primary" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(" ");
  document.getElementById("screen").innerHTML = `
    <div class="expert-head">
      <div class="avatar">${e.initials}</div>
      <div>
        <h2 style="margin-bottom:4px;">${e.name}</h2>
        <span class="badge">${e.type}</span>
        <div><strong>Research Focus:</strong> ${e.focus}</div>
        <div class="smallnote">${e.bestAfter}</div>
      </div>
    </div>
    <div class="clipbox">
      <h3>${e.clipTitle}</h3>
      ${e.blurb.map(line => `<div class="clipline">${line}</div>`).join("")}
    </div>
    <div class="labbox"><strong>Classroom Application:</strong><br>${e.application}</div>
    <div class="notebook">Discussion Prompt: How does this expert help us interpret student evidence more carefully?</div>
    <div class="warning">External resources are optional. They open in a new tab.</div>
    <div>${linkHtml}</div>
    <button onclick="showExperts()">Back to Professional Consultation</button>
    <button onclick="showFolders()">Back to Case Files</button>
    <button onclick="showReveal()">Back to Evidence Summary</button>
  `;
  updateBar();
}

function showAbout(){
  setStatus("GIDA Labs version information loaded.", "ding");
  document.getElementById("screen").innerHTML = `
    <h2>GIDA Labs</h2>
    <div class="notebook">
      Version 1.0<br>
      Assessment Investigation 001<br><br>
      Designed by Paris Gideon Daniel<br>
      EDU-3381: Diverse Learners in the Mainstream Classroom<br><br>
      Purpose: Demonstrate how assessment access can shape conclusions about multilingual learners' content knowledge.
    </div>
    <button onclick="showIntro()">Return to Start</button>
  `;
}

function resetLab(){
  reviewed = new Set();
  currentStudent = null;
  selected = new Set();
  updateBar();
  document.getElementById("screen").classList.remove("flash-access");
  setStatus("Evidence log reset.", "ding");
  showIntro();
}

showIntro();
updateBar();
