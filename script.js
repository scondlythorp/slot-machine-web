/* ========== GAME STATE ========== */
let players = {};
let currentPlayer = null;
let muted = false;
let jackpot = 5000;
let symbols = ["💎","🔔","🍒","🍋","⭐"];
let symbolValue = { "💎":50, "🔔":30, "🍒":20, "🍋":10, "⭐":5 };
let reels = ["reel1","reel2","reel3"];
let reelSymbols = [];
for(let i=0;i<3;i++){reelSymbols.push([...symbols,...symbols]);}

/* ========== SOUND EFFECTS ========== */
let spinSounds = ["sounds/spin1.mp3","sounds/spin2.mp3"];
let winSounds = ["sounds/win1.mp3","sounds/win2.mp3"];
let jackpotSounds = ["sounds/jackpot.mp3"];
let payoutSound = new Audio("sounds/payout.mp3");
let bonusSound = new Audio("sounds/bonus.mp3");
let coinSound = new Audio("sounds/coin.mp3");
let nearMissSound = new Audio("sounds/nearmiss.mp3");
let buttonSound = new Audio("sounds/button.mp3");

function playRandomSound(arr){
    if(muted) return;
    let s = new Audio(arr[Math.floor(Math.random()*arr.length)]);
    s.volume = document.querySelector('input[type="range"]').value || 1;
    s.play();
}

/* ========== PASSWORD HASHING ========== */
async function hashPassword(p){
    const msg = new TextEncoder().encode(p);
    const hashBuffer = await crypto.subtle.digest('SHA-256',msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');
}

/* ========== LOGIN ========== */
window.onload = ()=>{ 
    players = JSON.parse(localStorage.getItem("players"))||{};
    let user = localStorage.getItem("currentPlayer");
    if(user){currentPlayer=user; showGame(currentPlayer);}
    loadLeaderboard();
};

async function login(){
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let avatar = document.getElementById("avatar-select").value;
    if(!username||!password){document.getElementById("login-msg").innerText="⚠️ Enter all fields";return;}
    let users = JSON.parse(localStorage.getItem("users"))||{};
    let hash = await hashPassword(password);
    if(!users[username]){users[username]=hash; players[username]={balance:500,avatar:avatar};}
    if(users[username]!==hash){document.getElementById("login-msg").innerText="❌ Wrong password";return;}
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("players",JSON.stringify(players));
    localStorage.setItem("currentPlayer",username);
    currentPlayer=username;
    showGame(username);
}

function logout(){localStorage.removeItem("currentPlayer");location.reload();}

function showGame(name){
    document.getElementById("login-screen").style.display="none";
    document.getElementById("game-screen").style.display="block";
    document.getElementById("welcome").innerText=`Welcome ${players[name].avatar} ${name}!`;
    updateUI();
}

/* ========== SOUND CONTROLS ========== */
function setVolume(v){ [payoutSound,bonusSound,coinSound,nearMissSound,buttonSound].forEach(s=>s.volume=v);}
function toggleMute(){muted=!muted;}

/* ========== SPIN LOGIC ========== */
function spin(){
    playRandomSound([buttonSound]);
    let bet=parseInt(document.getElementById("bet-amount").value);
    if(isNaN(bet)||bet<=0){setResult("⚠️ Enter valid bet");return;}
    if(bet>players[currentPlayer].balance){setResult("❌ Insufficient balance"); return;}
    players[currentPlayer].balance-=bet; jackpot+=Math.floor(bet*0.05); localStorage.setItem("players",JSON.stringify(players));
    updateUI();
    playRandomSound(spinSounds);

    let stops=[0,0,0];
    reels.forEach((r,i)=>{ stops[i]=Math.floor(Math.random()*symbols.length); });

    // Reel animation
    reels.forEach((r,i)=>{
        let reel=document.getElementById(r);
        let s=[];
        for(let j=0;j<20;j++){ s.push(symbols[Math.floor(Math.random()*symbols.length)]); }
        s.push(symbols[stops[i]]);
        reel.innerHTML="";
        s.forEach(sym=>{let div=document.createElement("div"); div.innerText=sym; reel.appendChild(div);});
        reel.scrollTop=0;
        let pos=0;
        let interval = setInterval(()=>{
            reel.scrollTop += 36; pos++;
            if(pos>=s.length*36){ clearInterval(interval); }
        },50+Math.random()*50);
    });

    setTimeout(()=>{checkResult(stops,bet)},1500);
}

/* ========== CHECK WIN ========== */
function checkResult(stops,bet){
    let win=0;
    let winningSymbols = [];
    let finalSymbols = stops.map(i=>symbols[i]);

    // Horizontal win only for simplicity
    if(finalSymbols[0]===finalSymbols[1] && finalSymbols[1]===finalSymbols[2]){
        win+=symbolValue[finalSymbols[0]]*bet/10;
        winningSymbols=[0,1,2];
        flashReels(winningSymbols);
    }

    // Jackpot: all same
    if(new Set(finalSymbols).size===1){ win+=1000; playRandomSound(jackpotSounds); confettiBurst(); }

    if(win>0){
        playRandomSound(winSounds);
        animateMoney(players[currentPlayer].balance, players[currentPlayer].balance+win);
        players[currentPlayer].balance += win;
        saveScore(currentPlayer,win);
        setResult(`🎉 You won GMD ${win}`);
    } else {
        playRandomSound([nearMissSound]);
        setResult("😢 No win");
    }
    localStorage.setItem("players",JSON.stringify(players));
    updateUI();
}

function flashReels(indices){ indices.forEach(i=>document.getElementById(reels[i]).classList.add("flash")); setTimeout(()=>{indices.forEach(i=>document.getElementById(reels[i]).classList.remove("flash"));},2000); }

function animateMoney(start,end){
    let current=start; let step=(end-start)/20;
    let interval=setInterval(()=>{
        current+=step;
        document.getElementById("balance").innerText=`Balance: GMD ${Math.floor(current)}`;
        if(current>=end) clearInterval(interval);
    },50);
}

/* ========== CASH OUT ========== */
function cashOut(){ alert(`💵 You cashed out GMD ${players[currentPlayer].balance}`); players[currentPlayer].balance=500; localStorage.setItem("players",JSON.stringify(players)); updateUI(); }

/* ========== UI UPDATE ========== */
function updateUI(){ document.getElementById("balance").innerText=`Balance: GMD ${players[currentPlayer].balance}`; document.getElementById("jackpot").innerText=`💰 Jackpot: GMD ${jackpot}`; }
function setResult(msg){ document.getElementById("result").innerText=msg; }

/* ========== LEADERBOARD ================== */
function saveScore(name,score){
    let board = JSON.parse(localStorage.getItem("leaderboard"))||[];
    board.push({name:name,score:score,avatar:players[name].avatar});
    board.sort((a,b)=>b.score-b.score);
    localStorage.setItem("leaderboard",JSON.stringify(board.slice(0,5)));
    loadLeaderboard();
}

function loadLeaderboard(){
    const board=JSON.parse(localStorage.getItem("leaderboard"))||[];
    const list=document.getElementById("leaderboard-list");
    list.innerHTML="";
    board.forEach(b=>{
        let li=document.createElement("li");
        li.innerText=`${b.avatar} ${b.name} — GMD ${b.score}`;
        list.appendChild(li);
    });
}

/* ========== CONFETTI ANIMATION ========== */
function confettiBurst(){
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles=[];
    for(let i=0;i<100;i++){
        particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*4+1,d:Math.random()*10});
    }
    let angle=0;
    let interval=setInterval(()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        angle+=0.01;
        particles.forEach(p=>{
            p.y += Math.cos(angle+p.d)+1+p.r/2;
            p.x += Math.sin(angle)*2;
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle="gold"; ctx.fill(); ctx.closePath();
            if(p.y>canvas.height) p.y=0;
        });
    },30);
    setTimeout(()=>{clearInterval(interval); ctx.clearRect(0,0,canvas.width,canvas.height);},2000);
}