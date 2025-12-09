// js/script.js

// 1) calculateMileage uses the value of a text input to suggest a plan
function calculateMileage() {
  const milesStr = document.getElementById('milesInput')?.value;
  const output = document.getElementById('planOutput');
  if (!milesStr || isNaN(Number(milesStr))) {
    output.innerHTML = '<strong>Please enter a numeric weekly mileage (e.g., 20).</strong>';
    return;
  }
  const miles = Number(milesStr);

  // if-then-else to branch advice
  let advice = '';
  if (miles < 15) {
    advice = `Base building: Keep most runs easy. Add 1 tempo run and a long run of ${Math.max(6, Math.round(miles * 0.4))} miles.`;
  } else if (miles < 40) {
    advice = `Development: Include 1 interval session, 1 tempo, and a long run of ${Math.round(miles * 0.5)} miles.`;
  } else {
    advice = `High volume: Prioritize recovery, alternate hard/easy weeks, long run around ${Math.round(miles * 0.55)} miles.`;
  }
  output.innerHTML = `<p>Based on <strong>${miles}</strong> miles/week: ${advice}</p>`;
}

// 2) Suggest gear based on checkbox selections (demonstrates boolean logic)
function suggestGear() {
  const cush = document.getElementById('cushionCheckbox')?.checked;
  const light = document.getElementById('lightCheckbox')?.checked;
  const stable = document.getElementById('stableCheckbox')?.checked;
  const out = document.getElementById('gearOutput');

  // Compose suggestions
  if (!out) return;
  let suggestion = 'Try a neutral trainer with versatile cushioning.';
  if (cush && !light && !stable) suggestion = 'Cushioned trainer (max-cushion).';
  if (light && !cush) suggestion = 'Lightweight racer or tempo shoe.';
  if (stable && !cush) suggestion = 'Stability trainer for overpronation.';
  if (cush && light) suggestion = 'Look for responsive cushioning — a daily trainer with light stack.';
  if (cush && stable) suggestion = 'Stability trainer with added cushioning.';
  out.innerHTML = `<p><strong>Suggestion:</strong> ${suggestion}</p>`;
}

// 3) Show type description (radio input usage)
function showTypeDescription() {
  const radios = document.getElementsByName('runType');
  const out = document.getElementById('typeOutput');
  let chosen = null;
  for (let r of radios) {
    if (r.checked) chosen = r.value;
  }
  if (!chosen) {
    out.innerHTML = '<em>Please choose a run type.</em>';
    return;
  }
  let desc = '';
  if (chosen === 'intervals') desc = 'Intervals: Short repeats at faster pace with recovery to build speed.';
  else if (chosen === 'tempo') desc = 'Tempo: Sustained effort near lactate threshold to improve endurance.';
  else desc = 'Long Run: Slow, steady pace to increase aerobic capacity and endurance.';
  out.innerHTML = `<p>${desc}</p>`;
}

// 4) Form validation for join form (demonstrates form submit event)
function validateJoinForm(event) {
  // Prevent actual submission (since there is no backend)
  event.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const msg = document.getElementById('formMsg');
  if (!name) {
    msg.innerHTML = '<strong>Please enter your name before submitting.</strong>';
    return;
  }
  // Check that at least one experience radio is chosen
  const levels = document.getElementsByName('level');
  let levelChosen = false;
  for (let l of levels) if (l.checked) levelChosen = true;
  if (!levelChosen) {
    msg.innerHTML = '<strong>Please choose your experience level.</strong>';
    return;
  }
  // Success message
  msg.innerHTML = `<strong>Thanks, ${name}! We'll contact you with more info soon.</strong>`;
  // Optionally reset form after short delay
  setTimeout(() => document.getElementById('joinForm').reset(), 500);
}

// 5) Tip hover helper (mouseover / mouseout)
function showTip(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = 'Fuel with carbs 2–3 hours before long runs; include a small protein snack afterwards.';
}
function clearTip() {
  const el = document.getElementById('tip1');
  if (!el) return;
  el.innerHTML = 'Hover to get a tip from our nutrition coach.';
}

/* --- Event listeners (two different events at minimum) --- */
document.addEventListener('DOMContentLoaded', function () {
  // Click event: calculate mileage
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) calcBtn.addEventListener('click', calculateMileage);

  // Click event: gear suggestion
  const gearBtn = document.getElementById('gearBtn');
  if (gearBtn) gearBtn.addEventListener('click', suggestGear);

  // Click event: type description
  const typeBtn = document.getElementById('typeBtn');
  if (typeBtn) typeBtn.addEventListener('click', showTypeDescription);

  // Submit event: form
  const joinForm = document.getElementById('joinForm');
  if (joinForm) joinForm.addEventListener('submit', validateJoinForm);
});
