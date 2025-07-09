const playerRows = document.getElementById("playerRows");
const checkinCount = document.getElementById("checkinCount");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const newName = document.getElementById("newName");
const newEmail = document.getElementById("newEmail");

let players = [];

const csvMembers = [
  ["AARON HUDSPETH", "aaronhudspeth211@gmail.com"],
  ["ABBI SWEET", "abbigaler@yahoo.com"],
  ["ALEXANDER LYMAN", "lyman_alex@yahoo.com"],
  ["ANDREW RICHARDSON", "andrrewr@yahoo.com"],
  ["ANDREW HALEY", "andrew13haley@gmail.com"],
  ["ANNIE RAEVOURI", "yanganni1963@hotmail.com"],
  ["ANZHELA DEPLOIS", "andeplois@me.com"],
  ["BARBARA COLE", "bcole101@gmail.com"],
  ["BERNARD KATES", "blkates@gmail.com"],
  ["BERTA ALLEN", "bertadogg@yahoo.com"],
  ["BRANDON UPCHURCH", "brandonup@gmail.com"],
  ["BRENT HOPKINS", "brent.hopkins@live.com"],
  ["BRIAN PENNEBAKER", "pennebd@gmail.com"],
  ["BRIAN SYFRETT", "briansyfrett@gmail.com"],
  ["CALVIN WEAVER", "chlw240@gmail.com"],
  ["CHRIS REYNOLDS", "savannahsdad2005@outlook.com"],
  ["CHRIS FARR", "farrout1214@gmail.com"],
  ["CHRIS ROBBINS", "ctrobbins70@gmail.com"],
  ["CHRISTOPHER CHESSER", "zippergod92@gmail.com"],
  ["CHRISTOPHER WOODY", "chriswoody1968@gmail.com"],
  ["CHRISTOPHER HIRSH", "christopher.hirsh@gmail.com"],
  ["CODY GLAESS", "codebeng@gmail.com"],
  ["DANIEL PIETILA", "dan_pietila@yahoo.com"],
  ["DANIEL VELASQUEZ MEJIA", "danielvelasquez8@gmail.com"],
  ["DAVID ROD", "drod24@gmail.com"],
  ["DEREK ALLEN", "Steerbully777@gmail.com"],
  ["DOUG BERG", "dmberg2@comcast.net"],
  ["ERIC HAZEN", "Ericmhazen@gmail.com"],
  ["GUY VIDER", "guy@guyvider.com"],
  ["JASON HOFBAUER", "zagsfan78@gmail.com"],
  ["JOSHUA JENKINS", "joshuajenkins687@yahoo.com"],
  ["JUANITO CUNANAN", "juanito.cunanan48@gmail.com"],
  ["KERRI LIND", "kerrilind70@gmail.com"],
  ["KEVIN MURPHY", "murphy.murfy@gmail.com"],
  ["KEVIN PETERS", "ickyras@hotmail.com"],
  ["LUKE HEWLETT", "ljhewlett@gmail.com"],
  ["LYNN VILLEMYER", "lvillemyer@gmail.com"],
  ["MARCUS RAND", "mdotrand@gmail.com"],
  ["MARY HANDY", "handymary@hotmail.com"],
  ["MATT COMMINS", "mattcommins@gmail.com"],
  ["MIKE KUTH", "mpkuth@yahoo.com"],
  ["MONTE FLAHERTY", "monte.flaherty@gmail.com"],
  ["NICHLAS PRIEST", "priest228@yahoo.com"],
  ["NICOLAUS CHESSER", "framerkid88@gmail.com"],
  ["PATRICK KELLY", "patrickosu@hotmail.com"],
  ["PAUL HOLLOMON", "phhollo@aol.com"],
  ["PETER HANSEN", "dirtypig179@gmail.com"],
  ["RACHELLE ALLEN", "raeallenbooks@gmail.com"],
  ["RON HAWKINS", "hawkster101@hotmail.com"],
  ["SCOTT LOCKARD", "scottlockard@yahoo.com"],
  ["TERRI ANGELL", "terter59@gmail.com"],
  ["THOMAS GENTRY", "thomasgentry1944@gmail.com"],
  ["TIFFANY FIELD", "fieldtjean@gmail.com"],
  ["TIM HUFLER", "thufler@gmail.com"],
  ["TINA THORP", "bigwhitetruckduh@gmail.com"],
  ["TOM SCHARF", "t.e.scharf@gmail.com"],
  ["TONY SLAVEN", "arslaven@gmail.com"],
  ["VINCE DOMENICO", "vince@domenicoenvironmental.com"],
  ["YOLANDA BERRY", "alaundale@yahoo.com"],
  ["ZAC HAWKINS", "zac_hawkins2000@yahoo.com"]
];

// Build player rows from CSV
csvMembers.forEach(([name, email]) => {
  createPlayerRow(name, email);
});

function createPlayerRow(name, email) {
  const safeId = name.toLowerCase().replace(/\s+/g, "-");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="playerName" id="${safeId}">${name}</td>
    <td><input type="checkbox" class="selectAll"></td>
    <td><input type="checkbox" class="buyin" data-amount="40"></td>
    <td><input type="checkbox" class="toc" data-amount="2"></td>
    <td><input type="checkbox" class="bounty" data-amount="5"></td>
    <td><input type="checkbox" class="highhand" data-amount="5"></td>
    <td class="rowTotal">$0</td>
    <td><input type="checkbox" class="paid"></td>
  `;

  playerRows.appendChild(row);
  players.push({ name, email });
  updateCheckinCount();
}
// Add new player manually
addPlayerBtn.addEventListener("click", () => {
  const name = newName.value.trim().toUpperCase();
  const email = newEmail.value.trim();
  if (!name) return;

  createPlayerRow(name, email);
  newName.value = "";
  newEmail.value = "";
});

// Update check-in count
function updateCheckinCount() {
  const total = players.length;
  const paid = document.querySelectorAll("input.paid:checked").length;
  checkinCount.textContent = `(${paid} of ${total})`;
}

// Update totals
function updateTotals() {
  const buyin = sumTotal("buyin");
  const toc = sumTotal("toc");
  const bounty = sumTotal("bounty");
  const highhand = sumTotal("highhand");

  document.getElementById("buyinTotal").textContent = `$${buyin}`;
  document.getElementById("tocTotal").textContent = `$${toc}`;
  document.getElementById("bountyTotal").textContent = `$${bounty}`;
  document.getElementById("highHandTotal").textContent = `$${highhand}`;
  document.getElementById("grandTotal").textContent = `$${buyin + toc + bounty + highhand}`;

  document.getElementById("miniBuyinTotal").textContent = `$${buyin}`;
  document.getElementById("miniTocTotal").textContent = `$${toc}`;
  document.getElementById("miniBountyTotal").textContent = `$${bounty}`;
  document.getElementById("miniBountyCount").textContent = document.querySelectorAll(".bounty:checked").length;
  document.getElementById("miniHH1Total").textContent = `$${Math.ceil(highhand / 2)}`;
  document.getElementById("miniHH2Total").textContent = `$${Math.floor(highhand / 2)}`;
}

function sumTotal(className) {
  return [...document.querySelectorAll(`.${className}:checked`)].reduce(
    (sum, el) => sum + Number(el.dataset.amount),
    0
  );
}

// Update totals on checkbox change
playerRows.addEventListener("change", () => {
  updateCheckinCount();
  updateTotals();
});

// Jump to letter on A–Z click
document.querySelectorAll(".jumpLetter").forEach(letter => {
  letter.addEventListener("click", () => {
    const target = letter.dataset.letter;
    const players = document.querySelectorAll("td.playerName");
    for (const p of players) {
      const firstChar = p.textContent.trim().charAt(0);
      if (firstChar === target) {
        p.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  });
});

// Highlight letter while scrolling
window.addEventListener("scroll", () => {
  const playerCells = document.querySelectorAll("td.playerName");
  const letters = document.querySelectorAll(".jumpLetter");
  let currentLetter = "";

  for (let i = 0; i < playerCells.length; i++) {
    const rect = playerCells[i].getBoundingClientRect();
    if (rect.top > 40 && rect.top < window.innerHeight - 100) {
      currentLetter = playerCells[i].textContent.trim().charAt(0);
      break;
    }
  }

  letters.forEach(letter => {
    letter.classList.toggle("active", letter.dataset.letter === currentLetter);
  });
});
// Add new player manually
addPlayerBtn.addEventListener("click", () => {
  const name = newName.value.trim().toUpperCase();
  const email = newEmail.value.trim();
  if (!name) return;

  createPlayerRow(name, email);
  newName.value = "";
  newEmail.value = "";
});

// Update check-in count
function updateCheckinCount() {
  const total = players.length;
  const paid = document.querySelectorAll("input.paid:checked").length;
  checkinCount.textContent = `(${paid} of ${total})`;
}

// Update totals
function updateTotals() {
  const buyin = sumTotal("buyin");
  const toc = sumTotal("toc");
  const bounty = sumTotal("bounty");
  const highhand = sumTotal("highhand");

  document.getElementById("buyinTotal").textContent = `$${buyin}`;
  document.getElementById("tocTotal").textContent = `$${toc}`;
  document.getElementById("bountyTotal").textContent = `$${bounty}`;
  document.getElementById("highHandTotal").textContent = `$${highhand}`;
  document.getElementById("grandTotal").textContent = `$${buyin + toc + bounty + highhand}`;

  document.getElementById("miniBuyinTotal").textContent = `$${buyin}`;
  document.getElementById("miniTocTotal").textContent = `$${toc}`;
  document.getElementById("miniBountyTotal").textContent = `$${bounty}`;
  document.getElementById("miniBountyCount").textContent = document.querySelectorAll(".bounty:checked").length;
  document.getElementById("miniHH1Total").textContent = `$${Math.ceil(highhand / 2)}`;
  document.getElementById("miniHH2Total").textContent = `$${Math.floor(highhand / 2)}`;
}

function sumTotal(className) {
  return [...document.querySelectorAll(`.${className}:checked`)].reduce(
    (sum, el) => sum + Number(el.dataset.amount),
    0
  );
}

// Update totals on checkbox change
playerRows.addEventListener("change", () => {
  updateCheckinCount();
  updateTotals();
});

// Jump to letter on A–Z click
document.querySelectorAll(".jumpLetter").forEach(letter => {
  letter.addEventListener("click", () => {
    const target = letter.dataset.letter;
    const players = document.querySelectorAll("td.playerName");
    for (const p of players) {
      const firstChar = p.textContent.trim().charAt(0);
      if (firstChar === target) {
        p.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  });
});

// Highlight letter while scrolling
window.addEventListener("scroll", () => {
  const playerCells = document.querySelectorAll("td.playerName");
  const letters = document.querySelectorAll(".jumpLetter");
  let currentLetter = "";

  for (let i = 0; i < playerCells.length; i++) {
    const rect = playerCells[i].getBoundingClientRect();
    if (rect.top > 40 && rect.top < window.innerHeight - 100) {
      currentLetter = playerCells[i].textContent.trim().charAt(0);
      break;
    }
  }

  letters.forEach(letter => {
    letter.classList.toggle("active", letter.dataset.letter === currentLetter);
  });
});