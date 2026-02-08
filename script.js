// 🎵 MUSIC CONTROL
const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");
let started = false;

document.addEventListener("click", () => {
  if (!started) {
    music.muted = false;
    music.play();
    toggle.textContent = "🔊";
    started = true;
  }
}, { once: true });

toggle.onclick = e => {
  e.stopPropagation();
  music.muted = !music.muted;
  toggle.textContent = music.muted ? "🔇" : "🔊";
};

// ⏳ TIMER
const startDate = new Date(2024, 8, 18, 17, 45, 0);
const ids = ["years","months","days","hours","minutes","seconds"];

function updateTimer() {
  let diff = Math.floor((Date.now() - startDate) / 1000);

  const y = Math.floor(diff / 31536000); diff %= 31536000;
  const mo = Math.floor(diff / 2592000); diff %= 2592000;
  const d = Math.floor(diff / 86400); diff %= 86400;
  const h = Math.floor(diff / 3600); diff %= 3600;
  const m = Math.floor(diff / 60); diff %= 60;

  [y,mo,d,h,m,diff].forEach((v,i)=>{
    document.getElementById(ids[i]).textContent = v;
  });
}
setInterval(updateTimer,1000);
updateTimer();

// 📸 PHOTO INTERACTIONS
document.querySelectorAll(".photo").forEach(img => {
  img.onclick = () => {
    document.getElementById("zoomedPhoto").src = img.src;
    openModal("photoModal");
  };
});

window.addEventListener("scroll", () => {
  document.querySelectorAll(".photo").forEach((img,i)=>{
    img.style.transform =
      `translateY(${window.scrollY * 0.05 * (i+1)}px)`;
  });
});

// 💌 LETTER TYPEWRITER
const letterText =
`Hey baby, Happy Valentines Day! 
Im sorry for the way I've been, I promise Im trying my best. 
Thank you for always choosing me, caring for me, and loving me.
I am so lucky to have you and I'm so grateful for you. 
I love you so very much Keysha. Now until forever. `;

function openLetter() {
  openModal("letter");
  const el = document.getElementById("typedLetter");
  el.textContent = "";
  let i = 0;
  const typing = setInterval(()=>{
    el.textContent += letterText[i++];
    if (i >= letterText.length) clearInterval(typing);
  }, 40);
}

// 🪟 MODALS
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function checkAnswer() {
  const val = document.getElementById("answer").value.toLowerCase();
  const feedback = document.getElementById("feedback");

  if (val.includes("keysha")) {
    feedback.textContent = "Correct 💖";
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = "1.5rem";
      heart.style.animation = "floatUp 2s linear";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  } else {
    feedback.textContent = "Try again 😘";
  }
}

// ❤️ HEART ANIMATION
const style = document.createElement("style");
style.textContent = `
@keyframes floatUp {
  to { transform: translateY(-120vh); opacity: 0; }
}`;
document.head.appendChild(style);
