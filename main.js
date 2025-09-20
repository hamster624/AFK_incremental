value = new ExpantaNum(10);
rebirths = new ExpantaNum(0);
multi = new ExpantaNum(1.001);
base = new ExpantaNum(10);
pow = new ExpantaNum(1);
transcends = new ExpantaNum(0);
transcended = new ExpantaNum(0); 
prestige = new ExpantaNum(0);
prestiged = new ExpantaNum(0);
playtime = 0;
amountUpg1 = new ExpantaNum(0);
amountUpg2 = new ExpantaNum(0);
amountUpg3 = new ExpantaNum(0);
amountUpg4 = new ExpantaNum(0);
amountUpg5 = new ExpantaNum(0);
amountUpg6 = new ExpantaNum(0);
amountUpg7 = new ExpantaNum(0);
amountUpg8 = new ExpantaNum(0);
amountUpg9 = new ExpantaNum(0);
amountUpg10 = new ExpantaNum(0);
amountUpg11 = new ExpantaNum(0);
amountUpg12 = new ExpantaNum(0);
amountUpg1cap = new ExpantaNum(40000);
amountUpg2cap = new ExpantaNum(15000);
amountUpg3cap = new ExpantaNum(30000);
amountUpg4cap = new ExpantaNum(40000);
amountUpg5cap = new ExpantaNum(10);
amountUpg6cap = new ExpantaNum(5);
amountUpg7cap = new ExpantaNum(2);
amountUpg8cap = new ExpantaNum(1);
amountUpg9cap = new ExpantaNum(10);
amountUpg10cap = new ExpantaNum(10);
amountUpg11cap = new ExpantaNum(5);
amountUpg12cap = new ExpantaNum(5);
upg1Cost = new ExpantaNum(3);
upg2Cost = new ExpantaNum(10);
upg3Cost = new ExpantaNum(750);
upg4Cost = new ExpantaNum(1250);
upg5Cost = new ExpantaNum(5);
upg6Cost = new ExpantaNum(10);
upg7Cost = new ExpantaNum(20);
upg8Cost = new ExpantaNum(50);
upg9Cost = new ExpantaNum(60);
upg10Cost = new ExpantaNum(1);
upg11Cost = new ExpantaNum(1);
upg12Cost = new ExpantaNum(2);
let prevValue = value;
let prevReb = value.slog().log10().pow(ExpantaNum.pow(1000,amountUpg11));
// yikes those are a lot of variables
const dt = 0.02;
const rebirthThreshold = new ExpantaNum("(10^)^9 10");
const transcendThreshold = new ExpantaNum("10^^ee10000");
const prestigeThreshold = new ExpantaNum("10^^eee10");
function updateValue() {
  value = ExpantaNum.tetr(base, ExpantaNum.pow(ExpantaNum.mul(multi, ExpantaNum.slog(value)),pow));
}
// you are probably looking here because you want the larger levels of log, right?
// if you are going to steal this, then at least credit the creators github account: hamster624
// because i used all my brain power to make this work
// btw you need polarize for this to work which is in the file "format.js"
// also id recommend using arrows 1-10 because above that it might get a bit laggy
function ultralog(num, arrows) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    if (arrows <= 0) throw Error("Arrow count must be ≥ 1");
    if (arrows > 20) throw Error("Arrow count must be 20 or below due to preicison errors");
    if (arrows === 1) return ExpantaNum.log10(num);
    if (arrows === 2) return ExpantaNum.slog(num);
    const pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10" + "^".repeat(arrows-1) + "10")) {  // yes you can do arrow(10, arrows-1,10) but this is much much much faster
        return Math.log10(ultralog(num, arrows-1))+1;
    }
    if (ExpantaNum.lt(num, "10" + "^".repeat(arrows) + "10")) { // same here, you can do arrow(10,arrows,10) but this is much much much faster
        return Math.log10(pol.bottom) + pol.top;
    }
    if (arrows === pol.height) {
        return ExpantaNum.arrow(ExpantaNum.arrow(10, arrows, pol.bottom),arrows + 1,pol.top - 1); // sadly no optimization here so thats why there might be a lag spike, but only laggy when arrows is above ~10
    }
    if (pol.height > arrows) {
        return num;
    }
    throw Error("Arrow depth too large or unsupported");
}
function floor(x) {
  try {
    return ExpantaNum(Math.floor(x));
  } catch (e) {
    return ExpantaNum(x);
  }
}

function OoMs(start, end, time = 1) {
  start = new ExpantaNum(start);
  end = new ExpantaNum(end);
  time = new ExpantaNum(time);

  if (start.gt(end)) {
    
  }
  const slogStart = start.slog(10);
  const slogEnd = end.slog(10);
  const slgFlStart = floor(slogStart);
  const slgFlEnd = floor(slogEnd);
  const tetrEndExp = slogEnd.sub(slgFlEnd.sub(1));
  const tetrStartExp = slogStart.sub(slgFlStart.sub(1));
  const tetrEnd = ExpantaNum.tetr(10, tetrEndExp);
  const tetrStart = ExpantaNum.tetr(10, tetrStartExp);
  let x = tetrEnd.sub(tetrStart).div(time);

  let y;
  if (x.lt(1) && slgFlEnd.sub(2).lt(0)) {
    y = slgFlEnd.sub(2);
    x = ExpantaNum(10).pow(x);
  } else {
    y = slgFlEnd.sub(1);
  }
  if (y.eq(-1)) {
    x = new ExpantaNum(x);
    x = x.log10();
    y = y.add(1);
  }
  if (y.lte(0)) {
    a = end-start
    return ` (+${format(ExpantaNum.div(a,time),5)}/s)`;
  }
  if (y.gte(10) || y.lt(0) || x.lt(0) || y.isNaN()) {
    return " "
  }
  return ` (${format(x,8)} OoMs^${format(y,0)}/s)`;
}
function obfuscateData(str) {
    const shift = Math.floor(Math.random() * 256);
    let obfuscated = '';
    for (let i = 0; i < str.length; i++) {
        obfuscated += String.fromCharCode(str.charCodeAt(i) + shift);
    }
    return { obfuscatedData: obfuscated, shift: shift };
}

function deobfuscateData(obfuscatedData, shift) {
    let deobfuscated = '';
    for (let i = 0; i < obfuscatedData.length; i++) {
        deobfuscated += String.fromCharCode(obfuscatedData.charCodeAt(i) - shift);
    }
    return deobfuscated;
}

function toBase64(str) {
    try {
        const uint8Array = new TextEncoder().encode(str);
        let base64String = '';
        for (let i = 0; i < uint8Array.length; i++) {
            base64String += String.fromCharCode(uint8Array[i]);
        }
        return btoa(base64String);
    } catch (error) {
        console.error("Error during Base64 encoding:", error);
        return null;
    }
}

function fromBase64(base64) {
    try {
        const decodedData = atob(base64);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        return new TextDecoder().decode(uint8Array);
    } catch (error) {
        console.error("Error during Base64 decoding:", error);
        return null;
    }
}

function saveGame() {
    const saveData = JSON.stringify({
        value: value.toString(),
        rebirths: rebirths.toString(),
        transcends: transcends.toString(),
        transcended: transcended.toString(),
        prestige: prestige.toString(),
        prestiged: prestiged.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        upg6Cost: upg6Cost.toString(),
        upg7Cost: upg7Cost.toString(),
        upg8Cost: upg8Cost.toString(),
        upg9Cost: upg9Cost.toString(),
        upg10Cost: upg10Cost.toString(),
        upg11Cost: upg11Cost.toString(),
        upg12Cost: upg12Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg6: amountUpg6.toString(),
        amountUpg7: amountUpg7.toString(),
        amountUpg8: amountUpg8.toString(),
        amountUpg9: amountUpg9.toString(),
        amountUpg10: amountUpg10.toString(),
        amountUpg11: amountUpg11.toString(),
        amountUpg12: amountUpg12.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
        amountUpg6cap: amountUpg6cap.toString(),
        amountUpg7cap: amountUpg7cap.toString(),
        amountUpg8cap: amountUpg8cap.toString(),
        amountUpg9cap: amountUpg9cap.toString(),
        amountUpg10cap: amountUpg10cap.toString(),
        amountUpg11cap: amountUpg11cap.toString(),
        amountUpg12cap: amountUpg12cap.toString(),
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encodedData = toBase64(obfuscatedData);
    localStorage.setItem("afk_save", JSON.stringify({ data: encodedData, shift: shift }));
}

function loadGame() {
    const savedData = localStorage.getItem("afk_save");
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const decodedData = fromBase64(parsed.data);

        if (decodedData) {
            const deobfuscatedData = deobfuscateData(decodedData, parsed.shift);
            const gameData = JSON.parse(deobfuscatedData);
            value = new ExpantaNum(gameData.value || 10);
            rebirths = new ExpantaNum(gameData.rebirths || 0);
            transcends = new ExpantaNum(gameData.transcends || 0);
            transcended = new ExpantaNum(gameData.transcended || 0);
            prestige = new ExpantaNum(gameData.prestige || 0);
            prestiged = new ExpantaNum(gameData.prestiged || 0);
            playtime = gameData.playtime || 0;
            upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
            upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
            upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
            upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
            upg5Cost = new ExpantaNum(gameData.upg5Cost || 5);
            upg6Cost = new ExpantaNum(gameData.upg6Cost || 10);
            upg7Cost = new ExpantaNum(gameData.upg7Cost || 20);
            upg8Cost = new ExpantaNum(gameData.upg8Cost || 50);
            upg9Cost = new ExpantaNum(gameData.upg9Cost || 60);
            upg10Cost = new ExpantaNum(gameData.upg10Cost || 1);
            upg11Cost = new ExpantaNum(gameData.upg11Cost || 1);
            upg12Cost = new ExpantaNum(gameData.upg12Cost || 2);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
            amountUpg5 = new ExpantaNum(gameData.amountUpg5 || 0);
            amountUpg6 = new ExpantaNum(gameData.amountUpg6 || 0);
            amountUpg7 = new ExpantaNum(gameData.amountUpg7 || 0);
            amountUpg8 = new ExpantaNum(gameData.amountUpg8 || 0);
            amountUpg9 = new ExpantaNum(gameData.amountUpg9 || 0);
            amountUpg10 = new ExpantaNum(gameData.amountUpg10 || 0);
            amountUpg11 = new ExpantaNum(gameData.amountUpg11 || 0);
            amountUpg12 = new ExpantaNum(gameData.amountUpg12 || 0);
            amountUpg1cap = new ExpantaNum(gameData.amountUpg1cap || 40000);
            amountUpg2cap = new ExpantaNum(gameData.amountUpg2cap || 15000);
            amountUpg3cap = new ExpantaNum(gameData.amountUpg3cap || 30000);
            amountUpg4cap = new ExpantaNum(gameData.amountUpg4cap || 40000);
            amountUpg5cap = new ExpantaNum(gameData.amountUpg5cap || 10);
            amountUpg6cap = new ExpantaNum(gameData.amountUpg6cap || 5);
            amountUpg7cap = new ExpantaNum(gameData.amountUpg7cap || 2);
            amountUpg8cap = new ExpantaNum(gameData.amountUpg8cap || 1);
            amountUpg9cap = new ExpantaNum(gameData.amountUpg9cap || 10);
            amountUpg10cap = new ExpantaNum(gameData.amountUpg10cap || 10);
            amountUpg11cap = new ExpantaNum(gameData.amountUpg11cap || 5);
            amountUpg12cap = new ExpantaNum(gameData.amountUpg12cap || 5);
            updateDisplay();
            updateDisplay2();
        }
    }
}

function rebirth() {
  if (value.gte(rebirthThreshold)) {
    if (amountUpg8 <= 1){
      return 
    }
    const earnedRebirths = value.slog().log10().pow(ExpantaNum.pow(1000,amountUpg11));
    rebirths = rebirths.add(earnedRebirths);
    value = new ExpantaNum(10);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function transcend() {
  if (value.gte(transcendThreshold)) {
    const earnedtranscend = value.slog().log10().log10().log10().add(1);
    transcends = transcends.add(earnedtranscend);
    value = new ExpantaNum(10);
    rebirths = new ExpantaNum(0);
    transcended = new ExpantaNum(1);
    amountUpg1 = new ExpantaNum(0);
    amountUpg2 = new ExpantaNum(0);
    amountUpg3 = new ExpantaNum(0);
    amountUpg4 = new ExpantaNum(0);
    amountUpg1cap = new ExpantaNum(40000);
    amountUpg2cap = new ExpantaNum(15000);
    amountUpg3cap = new ExpantaNum(30000);
    amountUpg4cap = new ExpantaNum(40000);
    multi = new ExpantaNum(1.001);
    base = new ExpantaNum(10);
    pow = new ExpantaNum(1);
    upg1Cost = new ExpantaNum(3);
    upg2Cost = new ExpantaNum(10);
    upg3Cost = new ExpantaNum(750);
    upg4Cost = new ExpantaNum(1250);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function prestiges() {
  if (value.gte(prestigeThreshold)) {
    const earnedprestige = value.slog().slog().add(1).div(5);
    prestige = prestige.add(earnedprestige);
    prestiged = new ExpantaNum(1)
    value = new ExpantaNum(10);
    rebirths = new ExpantaNum(0);
    transcends = new ExpantaNum(0);
    multi = new ExpantaNum(1.001);
    base = new ExpantaNum(10);
    pow = new ExpantaNum(1);
    amountUpg1 = new ExpantaNum(0);
    amountUpg2 = new ExpantaNum(0);
    amountUpg3 = new ExpantaNum(0);
    amountUpg4 = new ExpantaNum(0);
    amountUpg5 = new ExpantaNum(0);
    amountUpg6 = new ExpantaNum(0);
    amountUpg7 = new ExpantaNum(0);
    amountUpg9 = new ExpantaNum(0);
    amountUpg1cap = new ExpantaNum(40000);
    amountUpg2cap = new ExpantaNum(15000);
    amountUpg3cap = new ExpantaNum(30000);
    amountUpg4cap = new ExpantaNum(40000);
    amountUpg5cap = new ExpantaNum(10);
    amountUpg6cap = new ExpantaNum(5);
    amountUpg7cap = new ExpantaNum(2);
    amountUpg9cap = new ExpantaNum(10);
    upg1Cost = new ExpantaNum(3);
    upg2Cost = new ExpantaNum(10);
    upg3Cost = new ExpantaNum(750);
    upg4Cost = new ExpantaNum(1250);
    upg5Cost = new ExpantaNum(5);
    upg6Cost = new ExpantaNum(10);
    upg7Cost = new ExpantaNum(20);
    upg9Cost = new ExpantaNum(60);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade1() {
  if (rebirths.gte(upg1Cost) && amountUpg1.lt(amountUpg1cap)) {
    rebirths = rebirths.sub(upg1Cost);
    amountUpg1 = amountUpg1.add(1);
    upg1Cost = upg1Cost.add(2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}

function buyUpgrade2() {
  if (rebirths.gte(upg2Cost) && amountUpg2.lt(amountUpg2cap)) {
    rebirths = rebirths.sub(upg2Cost);
    amountUpg2 = amountUpg2.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade3() {
  if (rebirths.gte(upg3Cost) && amountUpg3.lt(amountUpg3cap)) {
    rebirths = rebirths.sub(upg3Cost);
    amountUpg3 = amountUpg3.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade4() {
  if (rebirths.gte(upg4Cost) && amountUpg4.lt(amountUpg4cap)) {
    rebirths = rebirths.sub(upg4Cost);
    amountUpg4 = amountUpg4.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade5() {
  if (transcends.gte(upg5Cost) && amountUpg5.lt(amountUpg5cap)) {
    transcends = transcends.sub(upg5Cost);
    amountUpg5 = amountUpg5.add(1);
    upg5Cost = upg5Cost.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade6() {
  if (transcends.gte(upg6Cost) && amountUpg6.lt(amountUpg6cap)) {
    transcends = transcends.sub(upg6Cost);
    amountUpg6 = amountUpg6.add(1);
    upg6Cost = upg6Cost.mul(1.25);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade7() {
  if (transcends.gte(upg7Cost) && amountUpg7.lt(amountUpg7cap)) {
    transcends = transcends.sub(upg7Cost);
    amountUpg7 = amountUpg7.add(1);
    upg7Cost = upg7Cost.mul(2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade8() {
  if (transcends.gte(upg8Cost) && amountUpg8.lt(amountUpg8cap)) {
    transcends = transcends.sub(upg8Cost);
    amountUpg8 = amountUpg8.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade9() {
  if (transcends.gte(upg9Cost) && amountUpg9.lt(amountUpg9cap)) {
    transcends = transcends.sub(upg9Cost);
    amountUpg9 = amountUpg9.add(1);
    upg9Cost = upg9Cost.add(2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade10() {
  if (prestige.gte(upg10Cost) && amountUpg10.lt(amountUpg10cap)) {
    prestige = prestige.sub(upg10Cost);
    amountUpg10 = amountUpg10.add(1);
    upg10Cost = upg10Cost.mul(1.1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade11() {
  if (prestige.gte(upg11Cost) && amountUpg11.lt(amountUpg11cap)) {
    prestige = prestige.sub(upg11Cost);
    amountUpg11 = amountUpg11.add(1);
    upg11Cost = upg11Cost.mul(1.2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade12() {
  if (prestige.gte(upg12Cost) && amountUpg12.lt(amountUpg12cap)) {
    prestige = prestige.sub(upg12Cost);
    amountUpg12 = amountUpg12.add(1);
    upg12Cost = upg12Cost.mul(1.2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
// no buymaxupg5+ because the caps are too small for them
function buyMaxUpgrade1() {
  for (let i = 1; i < 5; i++) {
    const C = upg1Cost;
    const R = rebirths;
    const step = new ExpantaNum(2);
    const halfStep = step.div(2);
    const b = C.sub(halfStep);
    const disc = b.pow(2).add(R.mul(step).mul(2)).sqrt();
    const Δ = disc.sub(b).div(step).floor();
    const maxBuy = ExpantaNum.min(Δ, amountUpg1cap.sub(amountUpg1));
    if (maxBuy.lte(0)) return;
    const totalCost = maxBuy.mul(
      C.mul(2).add(step.mul(maxBuy.sub(1)))
    ).div(2);
    rebirths = rebirths.sub(totalCost);
    amountUpg1 = amountUpg1.add(maxBuy);
    upg1Cost = upg1Cost.add(step.mul(maxBuy));
    updateDisplay();
    updateDisplay2();
  }
}

function buyMaxUpgrade2() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(10);
  const m = new ExpantaNum(1.5);
  const r = amountUpg7.add(1);
  const k = amountUpg2;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg2cap.sub(amountUpg2));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg2 = amountUpg2.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}

function buyMaxUpgrade3() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(750);
  const m = new ExpantaNum(1.25);
  const r = amountUpg7.add(1);
  const k = amountUpg3;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg3cap.sub(amountUpg3));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg3 = amountUpg3.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}

function buyMaxUpgrade4() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(1250);
  const m = new ExpantaNum(1.4);
  const r = amountUpg7.add(1);
  const k = amountUpg4;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg4cap.sub(amountUpg4));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg4 = amountUpg4.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}

function rebautobuy() {
  if (amountUpg8.gt(new ExpantaNum(0))) {
    buyMaxUpgrade1();
    buyMaxUpgrade2();
    buyMaxUpgrade3();
    buyMaxUpgrade4();
  }
}

function clampUpgradesToCaps() {
  if (amountUpg1.gt(amountUpg1cap)) amountUpg1 = amountUpg1cap;
  if (amountUpg2.gt(amountUpg2cap)) amountUpg2 = amountUpg2cap;
  if (amountUpg3.gt(amountUpg3cap)) amountUpg3 = amountUpg3cap;
  if (amountUpg4.gt(amountUpg4cap)) amountUpg4 = amountUpg4cap;
}

function evalMulti() {
  const original = new ExpantaNum(1.001);
  const upg1 = amountUpg1.mul(new ExpantaNum(0.001));
  const upg2 = amountUpg2.mul(new ExpantaNum(0.004));
  multi = ExpantaNum.mul(
    original.add(upg1).add(upg2)
    ,1000).ceil().div(1000); // Yeah there wasnt an easier way to round it i think idk
}
function evalBase() {
  const original = new ExpantaNum(10);
  const upg1 = amountUpg3.mul(new ExpantaNum(10));
  base = ExpantaNum.mul(original.add(upg1),10).ceil().div(10);
}

function evalpow() {
  const original = new ExpantaNum(1);
  const upg1 = amountUpg4.mul(new ExpantaNum(0.0001));
  let base = ExpantaNum.mul(ExpantaNum.pow(10, amountUpg10),
    original.add(upg1).add(amountUpg5).pow(ExpantaNum.pow(4, amountUpg9))
  );
  exponent = ExpantaNum(ultralog(value, 3)).pow(amountUpg10);
  exponent2 = ExpantaNum.pow(10, amountUpg12);
  pow = base.pow(exponent).pow(exponent2).mul(10000).ceil().div(10000);

}

function evalcap() {
  const original = new ExpantaNum(40000);
  const multiplier = ExpantaNum.pow(1.5, amountUpg6);
  const exponent = ExpantaNum.pow(3, amountUpg11);
  amountUpg4cap = original.mul(multiplier).pow(exponent);
}
function evalcosts() {
  const upg2 = new ExpantaNum(10);
  const upg3 = new ExpantaNum(750);
  const upg4 = new ExpantaNum(1250);
  upg2Cost = ExpantaNum.root(upg2.mul(ExpantaNum.pow(1.5, amountUpg2)), amountUpg7.add(1));
  upg3Cost = ExpantaNum.root(upg3.mul(ExpantaNum.pow(1.25, amountUpg3)), amountUpg7.add(1));
  upg4Cost = ExpantaNum.root(upg4.mul(ExpantaNum.pow(1.4, amountUpg4)), amountUpg7.add(1));
}
function autoreb() {
  if (amountUpg8.gt(new ExpantaNum(0))) {
    const earnedRebirths = value.slog().log10().add(amountUpg11).pow(ExpantaNum.pow(1000,amountUpg11));
    rebirths = rebirths.add(earnedRebirths);
  }
}
function updateDisplay() {
  clampUpgradesToCaps();
  autoreb();
  const currentValue = value;
  const currentRebGain = value.slog().log10().pow(ExpantaNum.pow(1000,amountUpg11));
  valueOoms = OoMs(prevValue, currentValue,0.02);
  RebOoMs = OoMs(prevReb, currentRebGain,0.02);
  document.getElementById("value").innerText    = `Value: ${format(value, 3)} ${valueOoms}`;
  document.getElementById("willgainreb").innerText = 
    `Will gain rebirths: ${format(currentRebGain, 3)} ${RebOoMs}`;

  document.getElementById("willgaintran").innerText = 
    `Will gain transcend: ${format(isNaN(value.slog().log10().log10().log10().add(1)) ? 0 : value.slog().log10().log10().log10().add(1),3)}`;

  document.getElementById("willgainpres").innerText = 
    `Will gain transcend: ${format(isNaN(value.slog().slog().add(1).div(5)) ? 0 : value.slog().slog().add(1).div(5),5)}`;
  document.getElementById("upg10boost").innerText = 
    `Boost: ${format(ExpantaNum(ultralog(value, 3)).mul(amountUpg10),4)}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  prevValue = currentValue;
  prevReb = currentRebGain;
}

function updateDisplay2() { // this is for more speed incase your device is poor because we dont need to update these ones if they aren't changing
  evalMulti();
  evalBase();
  evalpow();  
  evalcap();
  evalcosts();
  document.getElementById("transcend").innerText = `Transcend Points: ${format(transcends, 3)}`;
  document.getElementById("prestige").innerText = `Prestige Points: ${format(prestige, 5)}`;
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 0);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("upg3Cost").innerText = format(upg3Cost, 3);
  document.getElementById("upg4Cost").innerText = format(upg4Cost, 3);
  document.getElementById("upg5Cost").innerText = format(upg5Cost, 3);
  document.getElementById("upg6Cost").innerText = format(upg6Cost, 3);
  document.getElementById("upg7Cost").innerText = format(upg7Cost, 3);
  document.getElementById("upg8Cost").innerText = format(upg8Cost, 0);
  document.getElementById("upg9Cost").innerText = format(upg9Cost, 0);
  document.getElementById("upg10Cost").innerText = format(upg10Cost, 3);
  document.getElementById("upg11Cost").innerText = format(upg11Cost, 3);
  document.getElementById("upg12Cost").innerText = format(upg12Cost, 3);

  document.getElementById("upg1amount").innerText = format(amountUpg1, 0);
  document.getElementById("upg2amount").innerText = format(amountUpg2, 0);
  document.getElementById("upg3amount").innerText = format(amountUpg3, 0);
  document.getElementById("upg4amount").innerText = format(amountUpg4, 0);
  document.getElementById("upg5amount").innerText = format(amountUpg5, 0);
  document.getElementById("upg6amount").innerText = format(amountUpg6, 0);
  document.getElementById("upg7amount").innerText = format(amountUpg7, 0);
  document.getElementById("upg8amount").innerText = format(amountUpg8, 0);
  document.getElementById("upg9amount").innerText = format(amountUpg9, 0);
  document.getElementById("upg10amount").innerText = format(amountUpg10, 0);
  document.getElementById("upg11amount").innerText = format(amountUpg11, 0);
  document.getElementById("upg12amount").innerText = format(amountUpg12, 0);

  document.getElementById("upg1cap").innerText = `${format(amountUpg1cap, 0)}`;
  document.getElementById("upg2cap").innerText = `${format(amountUpg2cap, 0)}`;
  document.getElementById("upg3cap").innerText = `${format(amountUpg3cap, 0)}`;
  document.getElementById("upg4cap").innerText = `${format(amountUpg4cap, 0)}`;
  document.getElementById("upg5cap").innerText = `${format(amountUpg5cap, 0)}`;
  document.getElementById("upg6cap").innerText = `${format(amountUpg6cap, 0)}`;
  document.getElementById("upg7cap").innerText = `${format(amountUpg7cap, 0)}`;
  document.getElementById("upg8cap").innerText = `${format(amountUpg8cap, 0)}`;
  document.getElementById("upg9cap").innerText = `${format(amountUpg9cap, 0)}`;
  document.getElementById("upg10cap").innerText = `${format(amountUpg10cap, 0)}`;
  document.getElementById("upg11cap").innerText = `${format(amountUpg11cap, 0)}`;
  document.getElementById("upg12cap").innerText = `${format(amountUpg12cap, 0)}`;

  document.getElementById("Multi").innerText = `Multi: ${format(multi, 3)}`;
  document.getElementById("Base").innerText = `Base: ${format(base, 1)}`;
  document.getElementById("pow").innerText = ExpantaNum.eq(pow,1) ? "" : `Power: ${format(pow,4)}`;
  document.getElementById("Formula").innerText =
  `Value = ${format(base,1)}↑↑(${
    ExpantaNum.eq(pow,1)
      ? `slog(value)×${format(multi,3)}`
      : `(slog(value)×${format(multi,3)})↑${format(pow,4)}`
  })`;
}
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
setInterval(() => {
  if (ExpantaNum.eq(amountUpg10,1)){
    evalpow()
    document.getElementById("pow").innerText = ExpantaNum.eq(pow,1) ? "" : `Power: ${format(pow,4,)}`;
    document.getElementById("Formula").innerText =
    `Value = ${format(base,1)}↑↑(${
      ExpantaNum.eq(pow,1)
        ? `slog(value)×${format(multi,3)}`
        : `(slog(value)×${format(multi,3)})↑${format(pow,4)}`
    })`;
  }
}, 20);
setInterval(() => {
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
}, 1000);
setInterval(() => {
  rebautobuy();
}, 100);
setInterval(() => {
  updateValue();
  updateDisplay();
}, 20);
setInterval(() => {
    saveGame();
  }, 500);
setInterval(() => {
  playtime++;
}, 1000);
window.onload = () => {
  updateDisplay();
  updateDisplay2();
  loadGame();
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
};
