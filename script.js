// ================================
//  CONFIGURATION
// ================================
const CORRECT_PASSWORD = "2026engineer";


// ================================
//  GET ELEMENTS
// ================================
const passwordScreen = document.getElementById("password-screen");
const mainContent    = document.getElementById("main-content");
const passwordInput  = document.getElementById("password-input");
const unlockBtn      = document.getElementById("unlock-btn");
const errorMsg       = document.getElementById("error-msg");
const showHideBtn    = document.getElementById("show-hide-btn");
const eyeOpen        = document.getElementById("eye-open");
const eyeClosed      = document.getElementById("eye-closed");
const lilyFlower     = document.getElementById("lily-flower");
const lilyWrapper    = document.getElementById("lily-wrapper");
const lockContainer  = document.getElementById("lock-container");
const inputWrapper   = document.getElementById("input-wrapper");


// ================================
//  CREATE SPARKLE PARTICLES
// ================================
function createSparkles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.setProperty("--left", Math.random() * 100 + "%");
    sparkle.style.setProperty("--top", Math.random() * 100 + "%");
    sparkle.style.setProperty("--delay", Math.random() * 5 + "s");
    sparkle.style.setProperty("--dur", (Math.random() * 3 + 2) + "s");
    sparkle.style.width = (Math.random() * 4 + 2) + "px";
    sparkle.style.height = sparkle.style.width;
    container.appendChild(sparkle);
  }
}

createSparkles("sparkles", 40);
createSparkles("hero-sparkles", 30);


// ================================
//  SHOW / HIDE PASSWORD
// ================================
showHideBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClosed.classList.add("hidden");
  }
});


// ================================
//  CHECK PASSWORD
// ================================
function checkPassword() {
  const entered = passwordInput.value.trim();
  if (entered === "") return;
  if (entered === CORRECT_PASSWORD) {
    handleCorrectPassword();
  } else {
    handleWrongPassword();
  }
}


// ================================
//  CORRECT PASSWORD
// ================================
function handleCorrectPassword() {
  errorMsg.classList.remove("show");
  lilyFlower.classList.add("bloomed");
  createBloomParticles();

  unlockBtn.disabled = true;
  passwordInput.disabled = true;
  unlockBtn.style.pointerEvents = "none";

  setTimeout(() => {
    lockContainer.classList.add("card-fadeout");
  }, 1200);

  setTimeout(() => {
    passwordScreen.classList.add("screen-dissolve");
  }, 2000);

  setTimeout(() => {
    passwordScreen.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("content-entrance");

    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, 3000);
}


// ================================
//  BLOOM PARTICLES
// ================================
function createBloomParticles() {
  const rect = lilyWrapper.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#F9B4C7', '#FF9F68', '#F4C95D', '#e75480', '#fff', '#FFB6C1', '#DDA0DD'];

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    const size = Math.random() * 10 + 4;
    const isPetal = Math.random() > 0.5;

    particle.style.cssText = `
      position:fixed;width:${size}px;height:${isPetal ? size * 1.4 : size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${isPetal ? '50% 0 50% 0' : '50%'};
      left:${cx}px;top:${cy}px;pointer-events:none;z-index:1000;
    `;

    document.body.appendChild(particle);
    const angle = (Math.PI * 2 * i) / 25;
    const distance = Math.random() * 140 + 60;

    particle.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1200 + Math.random() * 600,
      easing: "cubic-bezier(.25,.46,.45,.94)",
      fill: "forwards"
    });

    setTimeout(() => particle.remove(), 2000);
  }
}


// ================================
//  WRONG PASSWORD
// ================================
function handleWrongPassword() {
  errorMsg.classList.add("show");
  inputWrapper.classList.add("shake");

  lilyFlower.style.transform = "rotate(-5deg)";
  setTimeout(() => { lilyFlower.style.transform = "rotate(5deg)"; }, 100);
  setTimeout(() => { lilyFlower.style.transform = "rotate(0deg)"; }, 200);
  setTimeout(() => { inputWrapper.classList.remove("shake"); }, 500);

  passwordInput.value = "";
  passwordInput.focus();
  setTimeout(() => { errorMsg.classList.remove("show"); }, 3000);
}


// ================================
//  PASSWORD EVENT LISTENERS
// ================================
unlockBtn.addEventListener("click", checkPassword);

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

passwordInput.addEventListener("input", () => {
  const scale = 1 + (passwordInput.value.length * 0.008);
  lilyFlower.style.transform = `scale(${Math.min(scale, 1.15)})`;
});


// ================================
//  PARALLAX ON SCROLL
// ================================
window.addEventListener("scroll", () => {
  const frames = document.querySelectorAll(".memory-photo-frame, .event-photo-frame, .showcase-main-frame");
  frames.forEach(frame => {
    const rect = frame.getBoundingClientRect();
    const wh = window.innerHeight;
    if (rect.top < wh && rect.bottom > 0) {
      const progress = (wh - rect.top) / (wh + rect.height);
      const offset = (progress - 0.5) * 15;
      const img = frame.querySelector(".memory-photo, .event-photo");
      if (img) img.style.transform = `translateY(${offset}px) scale(1.05)`;
    }
  });
});


// ================================
//  3D TILT ON POPUP CARDS
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const popupCards = document.querySelectorAll(".popup-photo-card");

  popupCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 15;
      const rotateY = (rect.width / 2 - x) / 15;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      const index = Array.from(popupCards).indexOf(card);
      if (index % 3 === 0) card.style.transform = "rotate(-3deg)";
      else if (index % 3 === 1) card.style.transform = "rotate(2deg) translateY(-15px)";
      else card.style.transform = "rotate(-2deg)";
    });
  });
});


// ================================
//  FLOWER HOVER PARTICLES
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const flowerPhotos = document.querySelectorAll(".flower-photo");

  flowerPhotos.forEach(photo => {
    photo.addEventListener("mouseenter", () => {
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      for (let i = 0; i < 5; i++) {
        const heart = document.createElement("div");
        heart.textContent = ["💕", "🌸", "💖", "🌺", "✨"][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
          position:fixed;left:${cx}px;top:${cy}px;
          font-size:${Math.random() * 12 + 10}px;
          pointer-events:none;z-index:1000;
        `;
        document.body.appendChild(heart);

        const angle = (Math.PI * 2 * i) / 5;
        const dist = Math.random() * 60 + 30;

        heart.animate([
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist - 30}px) scale(.5)`, opacity: 0 }
        ], {
          duration: 800 + Math.random() * 400,
          easing: "ease-out",
          fill: "forwards"
        });

        setTimeout(() => heart.remove(), 1300);
      }
    });
  });
});


// ================================
//  EVENT PHOTOS HOVER GLOW
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const eventFrames = document.querySelectorAll(".event-photo-frame");

  eventFrames.forEach(frame => {
    frame.addEventListener("mouseenter", () => {
      frame.style.boxShadow = "0 20px 50px rgba(231,84,128,0.25), 0 0 30px rgba(249,180,199,0.2)";
    });
    frame.addEventListener("mouseleave", () => {
      frame.style.boxShadow = "";
    });
  });
});


// ================================
//  MINI GAME
// ================================
const GAME_CONFIG = {
  targetScore: 10,
  gameTime: 30,
  spawnInterval: 800,
  fallSpeed: 2.5,
  catcherWidth: 60,
  components: ['⚙️', '🔋', '🔧', '📟', '💡', '🔩', '🤖'],
  badItems: ['❌', '💣'],
};

let gameState = {
  score: 0,
  timeLeft: GAME_CONFIG.gameTime,
  isPlaying: false,
  catcherPos: 50,
  animationId: null,
  spawnTimerId: null,
  timerInterval: null,
  fallingItems: [],
  touchStartX: 0,
};


// Game initialization
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("game-start-btn");
  const retryBtn = document.getElementById("game-retry-btn");
  const continueBtn = document.getElementById("game-continue-btn");

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (retryBtn) retryBtn.addEventListener("click", startGame);
  if (continueBtn) continueBtn.addEventListener("click", () => {
    document.getElementById("graduation-section").scrollIntoView({ behavior: "smooth" });
  });
});


function startGame() {
  // Reset state
  gameState.score = 0;
  gameState.timeLeft = GAME_CONFIG.gameTime;
  gameState.isPlaying = true;
  gameState.catcherPos = 50;
  gameState.fallingItems = [];

  // Show play screen
  document.getElementById("game-start-screen").classList.add("hidden");
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("game-win-screen").classList.add("hidden");
  document.getElementById("game-play-screen").classList.remove("hidden");

  updateHUD();

  const arena = document.getElementById("game-arena");
  const catcher = document.getElementById("game-catcher");

  // Clear old items
  arena.querySelectorAll(".game-falling-item, .game-catch-effect").forEach(el => el.remove());
  catcher.style.left = gameState.catcherPos + "%";

  // Keyboard controls
  document.addEventListener("keydown", handleGameKeys);

  // Touch controls
  arena.addEventListener("touchstart", handleTouchStart, { passive: true });
  arena.addEventListener("touchmove", handleTouchMove, { passive: true });

  // Mouse controls
  arena.addEventListener("mousemove", handleMouseMove);

  // Start spawning items
  gameState.spawnTimerId = setInterval(spawnItem, GAME_CONFIG.spawnInterval);

  // Start countdown timer
  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--;
    updateHUD();
    if (gameState.timeLeft <= 0) endGame(false);
  }, 1000);

  // Start game loop
  gameLoop();
}


function handleGameKeys(e) {
  if (!gameState.isPlaying) return;
  if (e.key === "ArrowLeft") {
    gameState.catcherPos = Math.max(5, gameState.catcherPos - 5);
  }
  if (e.key === "ArrowRight") {
    gameState.catcherPos = Math.min(95, gameState.catcherPos + 5);
  }
  document.getElementById("game-catcher").style.left = gameState.catcherPos + "%";
}


function handleTouchStart(e) {
  gameState.touchStartX = e.touches[0].clientX;
}


function handleTouchMove(e) {
  if (!gameState.isPlaying) return;
  const arena = document.getElementById("game-arena");
  const rect = arena.getBoundingClientRect();
  const touchX = e.touches[0].clientX - rect.left;
  gameState.catcherPos = Math.max(5, Math.min(95, (touchX / rect.width) * 100));
  document.getElementById("game-catcher").style.left = gameState.catcherPos + "%";
}


function handleMouseMove(e) {
  if (!gameState.isPlaying) return;
  const arena = document.getElementById("game-arena");
  const rect = arena.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  gameState.catcherPos = Math.max(5, Math.min(95, (mouseX / rect.width) * 100));
  document.getElementById("game-catcher").style.left = gameState.catcherPos + "%";
}


function spawnItem() {
  if (!gameState.isPlaying) return;

  const arena = document.getElementById("game-arena");
  const item = document.createElement("div");
  item.classList.add("game-falling-item");

  // 80% chance of good item, 20% bad
  const isGood = Math.random() > 0.2;
  const pool = isGood ? GAME_CONFIG.components : GAME_CONFIG.badItems;
  item.textContent = pool[Math.floor(Math.random() * pool.length)];
  item.dataset.good = isGood;

  const leftPos = Math.random() * 85 + 5;
  item.style.left = leftPos + "%";
  item.style.top = "-40px";

  arena.appendChild(item);

  gameState.fallingItems.push({
    element: item,
    x: leftPos,
    y: -40,
    speed: GAME_CONFIG.fallSpeed + Math.random() * 1.5,
    isGood: isGood,
  });
}


function gameLoop() {
  if (!gameState.isPlaying) return;

  const arena = document.getElementById("game-arena");
  const arenaHeight = arena.offsetHeight;
  const catcherY = arenaHeight - 60;

  gameState.fallingItems = gameState.fallingItems.filter(item => {
    // Move item down
    item.y += item.speed;
    item.element.style.top = item.y + "px";

    // Check if caught
    const itemX = item.x;
    const catcherX = gameState.catcherPos;

    if (item.y >= catcherY - 20 && item.y <= catcherY + 20) {
      if (Math.abs(itemX - catcherX) < 12) {
        // Caught!
        if (item.isGood) {
          gameState.score++;
          showCatchEffect(arena, item.x, catcherY, "+1 ⚙️", "#4CAF50");
          updateHUD();

          if (gameState.score >= GAME_CONFIG.targetScore) {
            endGame(true);
          }
        } else {
          // Bad item: lose 3 seconds
          gameState.timeLeft = Math.max(0, gameState.timeLeft - 3);
          showCatchEffect(arena, item.x, catcherY, "-3s ❌", "#e74c3c");
          updateHUD();
        }

        item.element.remove();
        return false;
      }
    }

    // Remove if fallen past arena
    if (item.y > arenaHeight + 50) {
      item.element.remove();
      return false;
    }

    return true;
  });

  gameState.animationId = requestAnimationFrame(gameLoop);
}


function showCatchEffect(arena, x, y, text, color) {
  const effect = document.createElement("div");
  effect.classList.add("game-catch-effect");
  effect.textContent = text;
  effect.style.left = x + "%";
  effect.style.top = y + "px";
  effect.style.color = color;
  effect.style.fontWeight = "700";
  arena.appendChild(effect);
  setTimeout(() => effect.remove(), 600);
}


function updateHUD() {
  const scoreEl = document.getElementById("game-score");
  const timerEl = document.getElementById("game-timer");
  const progressBar = document.getElementById("game-progress-bar");

  if (scoreEl) scoreEl.textContent = gameState.score;
  if (timerEl) timerEl.textContent = gameState.timeLeft;
  if (progressBar) {
    progressBar.style.width = (gameState.score / GAME_CONFIG.targetScore * 100) + "%";
  }
}


function endGame(won) {
  gameState.isPlaying = false;

  // Clear timers
  clearInterval(gameState.spawnTimerId);
  clearInterval(gameState.timerInterval);
  cancelAnimationFrame(gameState.animationId);

  // Remove keyboard listener
  document.removeEventListener("keydown", handleGameKeys);

  // Clear remaining items
  const arena = document.getElementById("game-arena");
  arena.querySelectorAll(".game-falling-item").forEach(el => el.remove());
  gameState.fallingItems = [];

  // Hide play screen
  document.getElementById("game-play-screen").classList.add("hidden");

  if (won) {
    // Show win screen
    document.getElementById("game-win-screen").classList.remove("hidden");
    createGameConfetti();
  } else {
    // Show game over screen
    document.getElementById("game-final-score").textContent = gameState.score;
    document.getElementById("game-over-screen").classList.remove("hidden");
  }
}


function createGameConfetti() {
  const container = document.getElementById("game-win-screen");
  const colors = ['#F9B4C7', '#FF9F68', '#F4C95D', '#e75480', '#a8e6cf', '#DDA0DD'];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
      position:absolute;
      width:${Math.random() * 8 + 4}px;
      height:${Math.random() * 8 + 4}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      left:${Math.random() * 100}%;
      top:-10px;
      pointer-events:none;
      z-index:100;
    `;
    container.appendChild(confetti);

    confetti.animate([
      { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${300 + Math.random() * 200}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: 1500 + Math.random() * 1000,
      easing: "cubic-bezier(.25,.46,.45,.94)",
      fill: "forwards"
    });

    setTimeout(() => confetti.remove(), 2500);
  }
}


// ================================
//  GRADUATION CONFETTI
// ================================
function createGradConfetti() {
  const container = document.getElementById("grad-confetti");
  if (!container) return;

  const colors = ['#F9B4C7', '#FF9F68', '#F4C95D', '#e75480', '#DDA0DD', '#a8e6cf'];

  for (let i = 0; i < 50; i++) {
    const conf = document.createElement("div");
    const size = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 4;

    conf.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      left:${Math.random() * 100}%;
      top:-20px;
      opacity:0;
      animation:confettiFall ${duration}s linear ${delay}s infinite;
    `;
    container.appendChild(conf);
  }
}


// ================================
//  FINALE EFFECTS
// ================================
function createFinaleEffects() {
  // Create sparkles for graduation and finale sections
  createSparkles("finale-sparkles", 40);
  createSparkles("grad-sparkles", 25);

  // Start graduation confetti
  createGradConfetti();

  // Finale confetti
  const finaleContainer = document.getElementById("finale-confetti");
  if (!finaleContainer) return;

  const colors = ['#F9B4C7', '#FF9F68', '#F4C95D', '#e75480', '#DDA0DD', '#a8e6cf', '#FFB6C1'];

  for (let i = 0; i < 60; i++) {
    const conf = document.createElement("div");
    const size = Math.random() * 10 + 4;
    const delay = Math.random() * 8;
    const duration = 4 + Math.random() * 5;

    conf.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      left:${Math.random() * 100}%;
      top:-20px;
      opacity:0;
      animation:confettiFall ${duration}s linear ${delay}s infinite;
    `;
    finaleContainer.appendChild(conf);
  }
}


// Add confetti animation keyframes
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confettiFall {
    0% {
      transform: translateY(-20px) rotate(0deg) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(100vh) rotate(720deg) translateX(${Math.random() * 100 - 50}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(confettiStyle);


// Initialize finale effects when graduation section becomes visible
const finaleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      createFinaleEffects();
      finaleObserver.disconnect();
    }
  });
}, { threshold: 0.1 });


document.addEventListener("DOMContentLoaded", () => {
  const gradSection = document.getElementById("graduation-section");
  if (gradSection) {
    finaleObserver.observe(gradSection);
  }
});


// ================================
//  GRADUATION PHOTOS HOVER
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const gradPhotos = document.querySelectorAll(".grad-big-photo");

  gradPhotos.forEach(photo => {
    photo.addEventListener("mouseenter", () => {
      const rect = photo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Create celebration particles
      const emojis = ['🎓', '⭐', '🌸', '🎉', '✨', '💖'];

      for (let i = 0; i < 6; i++) {
        const particle = document.createElement("div");
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `
          position:fixed;left:${cx}px;top:${cy}px;
          font-size:${Math.random() * 14 + 10}px;
          pointer-events:none;z-index:1000;
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 6;
        const dist = Math.random() * 70 + 40;

        particle.animate([
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist - 40}px) scale(.4)`, opacity: 0 }
        ], {
          duration: 900 + Math.random() * 400,
          easing: "ease-out",
          fill: "forwards"
        });

        setTimeout(() => particle.remove(), 1400);
      }
    });
  });
});


// ================================
//  FINALE CARD ENTRANCE EFFECT
// ================================
const finaleCardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Create a burst of confetti when finale card appears
      setTimeout(() => {
        const card = entry.target;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const colors = ['#F9B4C7', '#FF9F68', '#F4C95D', '#e75480', '#DDA0DD', '#FFB6C1'];
        const emojis = ['🌸', '💖', '⭐', '🎓', '✨', '⚙️'];

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          const useEmoji = Math.random() > 0.5;

          if (useEmoji) {
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.cssText = `
              position:fixed;left:${cx}px;top:${cy}px;
              font-size:${Math.random() * 16 + 10}px;
              pointer-events:none;z-index:1000;
            `;
          } else {
            const size = Math.random() * 10 + 4;
            particle.style.cssText = `
              position:fixed;left:${cx}px;top:${cy}px;
              width:${size}px;height:${size}px;
              background:${colors[Math.floor(Math.random() * colors.length)]};
              border-radius:${Math.random() > .5 ? '50%' : '2px'};
              pointer-events:none;z-index:1000;
            `;
          }

          document.body.appendChild(particle);

          const angle = (Math.PI * 2 * i) / 20;
          const dist = Math.random() * 180 + 80;

          particle.animate([
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 }
          ], {
            duration: 1500 + Math.random() * 800,
            easing: "cubic-bezier(.25,.46,.45,.94)",
            fill: "forwards"
          });

          setTimeout(() => particle.remove(), 2500);
        }
      }, 500);

      finaleCardObserver.disconnect();
    }
  });
}, { threshold: 0.3 });


document.addEventListener("DOMContentLoaded", () => {
  const finaleCard = document.querySelector(".finale-card");
  if (finaleCard) {
    finaleCardObserver.observe(finaleCard);
  }
});