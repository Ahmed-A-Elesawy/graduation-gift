// ================================
//  CREATE BACKGROUND SPARKLES
// ================================
function createSparkles() {
  const container = document.getElementById("bg-sparkles");
  if (!container) return;

  const count = 50;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.setProperty("--left", Math.random() * 100 + "%");
    sparkle.style.setProperty("--top", Math.random() * 100 + "%");
    sparkle.style.setProperty("--delay", Math.random() * 5 + "s");
    sparkle.style.setProperty("--dur", (Math.random() * 4 + 3) + "s");
    container.appendChild(sparkle);
  }
}

// ================================
//  INITIALIZE
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // Create sparkles
  createSparkles();

  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 30,
  });
});