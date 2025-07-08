let value = new ExpantaNum(10);
let rebirths = new ExpantaNum(0);
let amountUpg1 = new ExpantaNum(0);
let amountUpg2 = new ExpantaNum(0);
let amountUpg3 = new ExpantaNum(0);
let amountUpg4 = new ExpantaNum(0);
let multi = new ExpantaNum(1.001);
let base = new ExpantaNum(10);
let pow = new ExpantaNum(1);
let upg1Cost = new ExpantaNum(3);
let upg2Cost = new ExpantaNum(10);
let upg3Cost = new ExpantaNum(750);
let upg4Cost = new ExpantaNum(1250);
let playtime = new ExpantaNum(0);
const rebirthThreshold = new ExpantaNum("(10^)^9 10");

function updateValue() {
  value = ExpantaNum.tetr(base, ExpantaNum.pow(ExpantaNum.mul(ExpantaNum.slog(value), multi), pow));
}

function formatTime(seconds) {
  seconds = Math.floor(seconds);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

function updatePlaytime() {
  playtime = playtime.add(1);
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime.toNumber())}`;
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
    base: base.toString(),
    pow: pow.toString(),
    upg1Cost: upg1Cost.toString(),
    upg2Cost: upg2Cost.toString(),
    upg3Cost: upg3Cost.toString(),
    upg4Cost: upg4Cost.toString(),
    amountUpg1: amountUpg1.toString(),
    amountUpg2: amountUpg2.toString(),
    amountUpg3: amountUpg3.toString(),
    amountUpg4: amountUpg4.toString(),
    playtime: playtime.toString(),
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
      multi = new ExpantaNum(gameData.multi || 1.001);
      base = new ExpantaNum(gameData.base || 10);
      pow = new ExpantaNum(gameData.pow || 1);
      upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
      upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
      upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
      upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
      amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
      amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
      amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
      amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
      playtime = new ExpantaNum(gameData.playtime || 0);
      updateDisplay();
      updateDisplay2();
      document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime.toNumber())}`;
    }
  }
}

// All other functions (rebirth, upgrades, etc.) remain unchanged...

function updateDisplay() {
  document.getElementById("value").innerText = `Value: ${format(value, 3)}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  document.getElementById("willgainreb").innerText = `Will gain rebirths: ${format(value.slog().log10(), 3)}`;
}

function updateDisplay2() {
  evalMulti();
  evalBase();
  evalpow();
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 3);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("upg3Cost").innerText = format(upg3Cost, 3);
  document.getElementById("upg4Cost").innerText = format(upg4Cost, 3);
  document.getElementById("upg1amount").innerText = format(amountUpg1, 0);
  document.getElementById("upg2amount").innerText = format(amountUpg2, 0);
  document.getElementById("upg3amount").innerText = format(amountUpg3, 0);
  document.getElementById("upg4amount").innerText = format(amountUpg4, 0);
  document.getElementById("Multi").innerText = `Multi: ${format(multi, 3)}`;
  document.getElementById("Base").innerText = `Base: ${format(base, 1)}`;
  document.getElementById("pow").innerText = `Power: ${format(pow, 4)}`;
  document.getElementById("Formula").innerText = `Formula: Value = ${format(base, 1)}↑↑((slog(value)×${format(multi, 3)})↑${format(pow, 4)})`;
}

setInterval(() => {
  updateValue();
  updateDisplay();
}, 20);

setInterval(() => {
  saveGame();
}, 500);

setInterval(() => {
  updatePlaytime();
}, 1000);

window.onload = () => {
  loadGame();
  updateDisplay2();
};
