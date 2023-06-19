const CupcakeRainBtn = document.querySelector(".Cupcake-rain-btn");

function getRandomCupcakeImage() {
  const cupcakeImages = [
    "cupcake (1).png",
    "cupcake (2).png",
    "cupcake (3).png",
    "cupcake (5).png",
    "cupcake (6).png",
    "cupcake (7).png",
    "cupcake (9).png",
    "cupcake (10).png",
    "cupcake (11).png"
  ];
  const randomIndex = Math.floor(Math.random() * cupcakeImages.length);
  return `./assets/${cupcakeImages[randomIndex]}`;
}

function addCupcakes() {
  // Create a Cupcake image element
  const cupcakeImg = document.createElement("img");

  // Set the image source to a random Cupcake image
  cupcakeImg.src = getRandomCupcakeImage();
  
  // Set the background of the Cupcake image to transparent
  cupcakeImg.style.background = "transparent";

  // Set the size of the Cupcake image
  cupcakeImg.style.width = "85px";
  cupcakeImg.style.height = "85px";

  // Generate a random x-coordinate for the Cupcake to fall from
  const x = Math.random() * window.innerWidth;

  // Generate a random delay for the Cupcake to fall, up to 3 seconds
  const delay = Math.random() * 3000;

  // Generate a random spin direction for the Cupcake
  const spinDirection = Math.random() < 0.5 ? -1 : 1;

  // Set the starting position and rotation of the Cupcake
  cupcakeImg.style.position = "absolute";
  cupcakeImg.style.left = `${x}px`;
  cupcakeImg.style.top = "-200px"; // Updated starting position
  cupcakeImg.style.transform = `rotate(0deg)`;

  // Append the Cupcake image to the body
  document.body.appendChild(cupcakeImg);

  // Animate the Cupcake falling down the screen after a random delay, and spinning in a random direction
  setTimeout(() => {
    const animation = cupcakeImg.animate(
      [
        { transform: `translateY(-200px) rotate(0deg)` }, // Updated starting position
        { transform: `translateY(${window.innerHeight + 100}px) rotate(${spinDirection * 720}deg)` } // Updated ending position
      ],
      {
        duration: 3000,
        easing: "cubic-bezier(0.075, 0.82, 0.165, 1)",
        iterations: 1,
        fill: "forwards"
      }
    );

    // Add a bounce effect when the Cupcake hits the bottom of the screen
    animation.addEventListener("finish", () => {
      cupcakeImg.animate(
        [
          { transform: `translateY(${window.innerHeight}px)` }, // Updated starting position
          { transform: `translateY(${window.innerHeight - 25}px)` },
          { transform: `translateY(${window.innerHeight}px)` }
        ],
        {
          duration: 300,
          easing: "ease-in-out",
          iterations: 1,
          fill: "forwards"
        }
      );
    });

    // Remove the Cupcake image element from the DOM after the animation finishes
    animation.onfinish = () => cupcakeImg.remove();
  }, delay);
}

CupcakeRainBtn.addEventListener("click", () => {
  for (let i = 0; i < 150   ; i++) {
    addCupcakes();
  }
});
