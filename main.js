let value = new ExpantaNum(10);
let rebirths = new ExpantaNum(0);
let amountUpg1 = new ExpantaNum(0);
let amountUpg2 = new ExpantaNum(0);
let multi = new ExpantaNum(1.001);
let upg1Cost = new ExpantaNum(3);
let upg2Cost = new ExpantaNum(10);

const rebirthThreshold = new ExpantaNum("(10^)^9 10");
function updateValue() {
  value = ExpantaNum.tetr(10, ExpantaNum.mul(ExpantaNum.slog(value), multi))
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
        multi: multi.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
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
            value = new ExpantaNum(gameData.value);
            rebirths = new ExpantaNum(gameData.rebirths);
            multi = new ExpantaNum(gameData.multi);
            upg1Cost = new ExpantaNum(gameData.upg1Cost);
            upg2Cost = new ExpantaNum(gameData.upg2Cost);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2);
            updateDisplay();
        }
    }
}

function rebirth() {
  if (value.gte(rebirthThreshold)) {
    const earnedRebirths = value.slog().log10();
    rebirths = rebirths.add(earnedRebirths);
    value = new ExpantaNum(10);
    updateDisplay();
  }
}

function buyUpgrade1() {
  if (rebirths.gte(upg1Cost)) {
    rebirths = rebirths.sub(upg1Cost);
    amountUpg1 = amountUpg1.add(1);
    upg1Cost = upg1Cost.add(2);
    updateDisplay();
  }
}


function buyUpgrade2() {
  if (rebirths.gte(upg2Cost)) {
    rebirths = rebirths.sub(upg2Cost);
    amountUpg2 = amountUpg2.add(1);
    upg2Cost   = upg2Cost.mul(1.5);
    updateDisplay();
  }
}

function resetGame() {
  value = new ExpantaNum(10);
  rebirths = new ExpantaNum(0);
  amountUpg1 = new ExpantaNum(0);
  amountUpg2 = new ExpantaNum(0);
  multi = new ExpantaNum(1.001);
  upg1Cost = new ExpantaNum(3);
  upg2Cost = new ExpantaNum(10);
  localStorage.removeItem("afk_save");
  saveGame();
  updateDisplay();
}
function evalMulti() {
  const base = new ExpantaNum(1.001);
  const upg1 = amountUpg1.mul(new ExpantaNum(0.001));
  const upg2 = amountUpg2.mul(new ExpantaNum(0.01));
  multi = ExpantaNum.mul(base.add(upg1).add(upg2),1000).ceil().div(1000); // Yeah there wasnt an easier way to round it i think idk
}

function updateDisplay() {
  evalMulti();
  document.getElementById("value").innerText    = format(value, 3);
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 3);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("Multi").innerText = `Multi: ${format(multi, 3)}`;
  document.getElementById("Formula").innerText = `10^^(slog(value)*${format(multi, 3)})`;
  document.getElementById("willgainreb").innerText = `Will gain rebirths: ${format(value.slog().log10(), 3)}`;
}


setInterval(() => {
  updateValue();
  updateDisplay();
}, 20);
setInterval(() => {
    saveGame();
  }, 500);
window.onload = loadGame;
