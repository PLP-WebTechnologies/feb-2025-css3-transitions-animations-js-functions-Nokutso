const themeBtn = document.getElementById('themeBtn');
const saveNameBtn = document.getElementById('saveNameBtn');
const nameInput = document.getElementById('nameInput');
const welcomeText = document.getElementById('welcomeText');
const box = document.querySelector(".box");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const themes = ["light", "dark", "blue", "green", "purple"];
let currentThemeIndex = 0;

const boxColors = {
    light: "crimson",
    dark: "crimson",
    blue: "#007991 ",
    green: "#040303",
    purple: "#121212"
};

const boxColors1 = {
    light: "#FFE66D",
    dark: "#FFE66D",
    blue: "crimson",
    green: "#A3C3D9",
    purple: "darksalmon"
};

const boxColors2 = {
    light: "#4ECDC4",
    dark: "#4ECDC4",
    blue: "#8B9D83",
    green: "#BEB0A7",
    purple: "peachpuff"
};

//FUNCTION TO TRIGGER Animate.css ANIMATIONS
function animateText() {
    welcomeText.classList.remove('animate__animated', 'animate__rubberBand');
    void welcomeText.offsetWidth; // Reflow trick
    welcomeText.classList.add('animate__animated', 'animate__rubberBand');
  }

//TRIGGERING THE BOUNCE ANIMATION ON HOVER
welcomeText.addEventListener('mouseenter', () => {
    welcomeText.classList.remove('animate__animated', 'animate__rubberBand'); // Reset if needed
    void welcomeText.offsetWidth; // Force reflow to reset animation
    welcomeText.classList.add('animate__animated', 'animate__bounce');
  });
  // Reset the animation after it finishes so it can trigger again on hover
  welcomeText.addEventListener('animationend', () => {
    welcomeText.classList.remove('animate__animated', 'animate__bounce');
  });

// LOADING NAME & THEME FROM LOCAL STORAGE
window.onload = () => {
  const savedName = localStorage.getItem('userName');
  const savedTheme = localStorage.getItem('theme');

  if (savedName) {
    welcomeText.textContent = `Welcome back, ${savedName}!`;
    animateText();
  }
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
  }

};

//SAVING USER'S NAME AND SHOW GREETING
saveNameBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (name !== "") {
    localStorage.setItem('userName', name);
    welcomeText.textContent = `Welcome, ${name}!`;
    nameInput.value = "";
    animateText();
  }
});

//SETTING THE THEME ACCORDING TO PREFERRED THEME
themeBtn.addEventListener("click", () => {
  // Remove current theme
  document.body.classList.remove(themes[currentThemeIndex]);

  // Move to next theme in the list (looping)
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  // Apply the new theme
  const newTheme = themes[currentThemeIndex];
  document.body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);

  // Update the box color manually
  box.style.backgroundColor = boxColors[newTheme];
  box1.style.backgroundColor = boxColors1[newTheme];
  box2.style.backgroundColor = boxColors2[newTheme];
});

//THE GSAP ANIMATION: SCROLL TRIGGER TO MAKE THE BOX MOVE WHEN PAGE IS BEING SCROLLED
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", { 
    duration: 3, 
    rotation: 360,
    scale: 4,
    scrollTrigger: {
        trigger: ".box",
        scrub: true,
    },
  });

gsap.to(".box1", { 
    duration: 3, 
    rotation: 360,
    scale: 6,
    x: window.innerWidth / 2 - 100, // Move right
    y: -window.innerHeight / 2 + 100, //Move left
    scrollTrigger: {
      trigger: ".box1",
      start: "top center+=250",  // 👈 starts 200px *after* .box hits center
      end: "bottom top", 
      scrub: true,
    },
});

gsap.to(".box2", { 
    duration: 3, 
    rotation: -360,
    scale: 6,
    x: -(window.innerWidth / 2- 100), // Move right
    y: window.innerHeight / 2 - 100,
    scrollTrigger: {
        trigger: ".box2",
        start: "top center+=400", 
        end: "bottom top", 
        scrub: true,
    },
});

window.addEventListener('load', () => {
    let scrollDirection = 1;
    let isPaused = false;
  
    function autoScroll() {
      if (isPaused) return;
  
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
  
      window.scrollBy(0, scrollDirection);
  
      // Pause at bottom
      if (scrollTop + windowHeight >= scrollHeight - 2) {
        isPaused = true;
        scrollDirection = -1;
        setTimeout(() => {
          isPaused = false;
          autoScroll();
        }, 1500); // pause for 1.5s
        return;
      }
  
      // Pause at top
      if (scrollTop <= 2) {
        isPaused = true;
        scrollDirection = 1;
        setTimeout(() => {
          isPaused = false;
          autoScroll();
        }, 1500);
        return;
      }
  
      setTimeout(autoScroll, 10); // smooth interval
    }
  
    setTimeout(autoScroll, 500); // wait for DOM
  });