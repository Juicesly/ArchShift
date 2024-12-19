let isFirstTime = localStorage.getItem('firstTime') !== 'false'; // Default to true if not set
let gameCompleted = false;  // Flag to track if the game has been completed

const instructionSounds = {
    W: new Audio('Audio/KeyClick.mp3'),
    A: new Audio('Audio/KeyClick.mp3'),
    S: new Audio('Audio/KeyClick.mp3'),
    D: new Audio('Audio/KeyClick.mp3'),
    Space: new Audio('Audio/KeyClick.mp3')
};
// Check if the instructions page is visible
function isOnInstructionsPage() {
    return document.querySelector('.instructions-container').style.display === 'flex'; // Adjust if necessary based on your layout
}
// Event listener for keydown events (to play sound during instructions phase)
document.addEventListener('keydown', function(event) {
    if (!isOnInstructionsPage()) return; // If not on instructions page, do nothing

    const key = event.key.toUpperCase(); // Convert the key to uppercase for consistency

    // Play the appropriate sound for each key if it exists in instructionSounds
    if (instructionSounds[key]) {
        instructionSounds[key].play();
    }

    // Handle the Spacebar (for transitioning to the game, if needed)
    if (event.key === ' ' && isOnInstructionsPage()) {
        // Start game when space is pressed on the instructions page
        startGame();
    }
});
// Event listener for "Start Game" button
document.getElementById('startButton').addEventListener('click', function() {
    document.querySelector('.start-screen').style.display = 'none'; 
    
// Hide start screen
    showInstructions(); // Start showing the instructions
});
function hideBackground() {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "black";
}

function showBackground() {
    document.body.style.backgroundImage = "url('Images/wp12341380.jpg')";
    document.body.style.backgroundColor = "";
}
// Function to handle showing sections with fade effects
function showSection(sectionId) {
    const startScreen = document.querySelector('.start-screen');
    startScreen.style.opacity = '0'; // Fade out start screen
    
    setTimeout(() => {
        startScreen.style.display = 'none'; // Hide start screen
        
        const section = document.getElementById(sectionId);
        section.style.display = 'block'; // Show the specified section
        setTimeout(() => {
            section.style.opacity = '1'; // Fade in the new section
        }, 10); // Small delay for the fade-in effect
    }, 600); // Matches the CSS transition time for fade
}

// Function to hide all sections and return to the start screen
function hideSections() {
    const sections = document.querySelectorAll('.info-section');

    sections.forEach(section => {
        section.style.opacity = '0';
    });

    setTimeout(() => {
        sections.forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
        const startScreen = document.querySelector('.start-screen');
        startScreen.style.display = 'flex'; // Return to the start screen
        showBackground();
        setTimeout(() => {
            startScreen.style.opacity = '1'; // Fade in start screen
        }, 10); // Small delay for CSS transition to work
    }, 600); // Matches the CSS transition time
}

// Event listeners for buttons like "Credits" and "About Me"
document.getElementById('creditsButton').addEventListener('click', function() {
    showSection('creditsSection');
    hideBackground();
});
document.getElementById('aboutMeButton').addEventListener('click', function() {
    showSection('aboutMeSection');
    hideBackground();
});

// Event listeners for closing sections
const closeButtons = document.querySelectorAll('.close-button');
closeButtons.forEach(button => {
    button.addEventListener('click', hideSections);
});

// Function to show instructions after the "Start Game" button is clicked
function showInstructions() {
    const instructionsContainer = document.getElementById('instructionsContainer');
    const pressText = document.getElementById('pressText'); // Get the "Press" text element
    instructionsContainer.style.display = 'flex'; // Show the instructions container
    instructionsContainer.style.opacity = '1'; // Ensure it fades in
    pressText.style.visibility = 'visible'; // Show the "Press" text when instructions are visible
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'black';

    setTimeout(() => {
        instructionsContainer.style.opacity = '1';
        document.body.style.cursor = 'none' // Fade in instructions
    }, 10);
}
function hideInstructions() {
    document.body.style.cursor = 'auto'; // Reset cursor style when leaving the instructions container
}
// Function to change the key's appearance when pressed
function changeKeyState(keyId) {
    document.getElementById(keyId).classList.add('active');
}

// Event listener for WASD key presses
function changeKeyState(keyId) {
    document.getElementById(keyId).classList.add('active');
}

// Event listener for WASD key presses
function startGame() {
    isInGame = true;
    if (gameStarted) return; // Prevent multiple starts
    gameStarted = true; // Set flag to true to indicate game has started

    const instructionsContainer = document.querySelector('.instructions-container');
    const levelContainer = document.querySelector('.level-container');
    

    // Fade out instructions
    instructionsContainer.style.opacity = '0';

    setTimeout(() => {
        instructionsContainer.style.display = 'none'; // Hide instructions completely

        // Set the background to black and remove the background image
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';

        levelContainer.style.display = 'block'; // Show game screen
        setTimeout(() => {
            levelContainer.style.opacity = '1'; // Fade in game screen
        }, 10); // Small delay to trigger opacity transition
    }, 500); // Matches CSS transition time for fade-out
}
const jumpSound = new Audio('Audio/GameJump.mp3');
const landAndSpaceSound = new Audio('Audio/Teleport2.mp3');
jumpSound.volume = .6;
// Update spacebar event handling in your `keydown` listener
document.addEventListener('keydown', function(event) {
    switch (event.key.toLowerCase()) {
        case 'w':
            changeKeyState('keyW');
            break;
        case 'a':
            changeKeyState('keyA');
            break;
        case 's':
            changeKeyState('keyS');
            break;
        case 'd':
            changeKeyState('keyD');
            break;
    }

    // Check if all WASD keys are pressed
    if (document.querySelectorAll('.wasd-key.active').length === 4) {
        document.getElementById('spacebarInstructions').classList.add('active');
    }

    // Handle spacebar press to start the game and cinematic
    if (event.code === 'Space' && document.getElementById('spacebarInstructions').classList.contains('active') && !cinematicStarted) {
        // Set flag to ensure the cinematic only starts once
        cinematicStarted = true;

        // Hide the instructions container and show the level container
        document.querySelector('.instructions-container').style.display = 'none';
        document.querySelector('.level-container').style.display = 'block';

        // Start the cinematic animation and game
        startCinematic();
        startGame();

        // Hide the cursor for gameplay
        document.body.style.cursor = 'none';
    }
});
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && document.getElementById('spacebarInstructions').classList.contains('active')) {
        // Hide instructions and start game
        document.querySelector('.instructions-container').style.display = 'none';
        document.querySelector('.level-container').style.display = 'block';
        startGame(); // Start game only after instructions
        document.body.style.cursor = 'none'; // Hide cursor for gameplay
    }
});
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Events = Matter.Events;

// Create an engine and world
const engine = Engine.create();
const world = engine.world;
world.gravity.y = 1; // Adjust gravity for a platformer feel

// Create a renderer
const render = Render.create({
    element: document.querySelector('.level-container'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'black',
        wireframes: false
    }
});

// Define platforms but don't add to the world yet
const platforms = [
    
  Bodies.rectangle(window.innerWidth * 0.1, 700, 250, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.8, 650, 220, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.2, 550, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.5, 500, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.7, 450, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.3, 350, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.6, 300, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.4, 250, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.2, 150, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.7, 100, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.5, 50, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Goal platform
    Bodies.rectangle(window.innerWidth * 0.4, -50, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.6, -100, 140, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.3, -150, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.7, -200, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.5, -250, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.4, -250, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.6, -300, 140, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.5, -350, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.3, -400, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.7, -450, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.4, -500, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.5, -550, 140, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
    Bodies.rectangle(window.innerWidth * 0.35, -600, 150, 20, { isStatic: true, render: { fillStyle: 'gold' } })

];
    



let gameStarted = false; // Flag to check if the game has started
let player; // Declare player globally
let cameraOffsetY = 0; 

function startGame() {
    if (gameStarted) return; // Prevent multiple starts
    gameStarted = true; // Set flag to true to indicate game has started

    const yOffset = 200; // Adjust this value to shift everything lower

    // Shift all platforms downward by yOffset
    platforms.forEach(platform => {
        Body.setPosition(platform, {
            x: platform.position.x,
            y: platform.position.y + yOffset
        });
    });

    // Calculate the initial position of the player
    const firstPlatform = platforms[0];
    const centerX = (firstPlatform.bounds.min.x + firstPlatform.bounds.max.x) / 2;
    const startY = firstPlatform.position.y - 20; 

    // Initialize player at the adjusted position
    player = Bodies.circle(centerX, startY, 20, { 
        restitution: 0, // No bounciness
        render: { 
            fillStyle: 'white', // Base color
            visible: false // Hide the default rendering
        }
    });

    World.add(world, player);
    World.add(world, platforms);
    
    let currentLevel = 1; // Initialize the current level

    function isOnPlatform(player, platforms) {
        let onPlatform = false;
    
        platforms.forEach(platform => {
            const distanceY = Math.abs(player.position.y - platform.position.y);
            const distanceX = Math.abs(player.position.x - platform.position.x);
            const platformWidth = platform.bounds.max.x - platform.bounds.min.x;
    
            if (distanceY <= 30 && distanceX <= platformWidth / 2) {
                platform.isPlayerOn = true; // Player is on this platform
                onPlatform = true;
    
                // If the platform should fall, make it dynamic and ensure it does not collide with other platforms
                if (platform.shouldFall) {
                    Body.setStatic(platform, false); // Make the platform dynamic so it falls
                    platform.collisionFilter = { group: -1 }; // Prevent collision with other platforms
                }
            } else {
                platform.isPlayerOn = false; // Player is not on this platform
            }
        });
    
        return onPlatform;
    }
function drawPixelatedPlatform(context, x, y, width, height, isTopPlatform, isPlayerOn) {
    const blockSize = 20; // Size of each "block" in the platform
    let baseColor, highlightColor, shadowColor;

    if (isTopPlatform) {
        // Color scheme for the top platform
        baseColor = '#ffffff'; // White base
        highlightColor = '#b0b0b0'; // Darker highlight
        shadowColor = '#4a4a4a'; // Dark shadow
    } else {
        // Use different colors based on whether the player is on the platform and the current level
        if (currentLevel === 2) {
            // Level 2 colors
            baseColor = isPlayerOn ? '#000000' : '#4a4a4a'; // Black when player is on
            highlightColor = isPlayerOn ? '#2a2a2a' : '#ffffff'; // Adjusted highlight
            shadowColor = isPlayerOn ? '#4a4a4a' : '#2a2a2a'; // Adjusted shadow
        } else {
            // Level 1 colors
            baseColor = isPlayerOn ? '#ffffff' : '#4a4a4a'; // White when player is on
            highlightColor = isPlayerOn ? '#b0b0b0' : '#ffffff'; // Brighter highlight
            shadowColor = isPlayerOn ? '#4a4a4a' : '#2a2a2a'; // Darker shadow
        }
    }

    // Draw the platform using the determined colors
    for (let row = 0; row < height; row += blockSize) {
        for (let col = 0; col < width; col += blockSize) {
            // Draw the main block
            context.fillStyle = baseColor;
            context.fillRect(x + col, y + row, blockSize, blockSize);

            // Draw the highlight on the top-left corner
            context.fillStyle = highlightColor;
            context.fillRect(x + col, y + row, blockSize / 4, blockSize / 4);

            // Draw the shadow on the bottom-right corner
            context.fillStyle = shadowColor;
            context.fillRect(
                x + col + (blockSize * 3) / 4,
                y + row + (blockSize * 3) / 4,
                blockSize / 4,
                blockSize / 4
            );
        }
    }
}
Events.on(render, 'afterRender', function() {
    const context = render.context;
    context.clearRect(0, 0, render.canvas.width, render.canvas.height);

    // Draw each platform with the pixelated effect
    platforms.forEach((platform, index) => {
        const width = platform.bounds.max.x - platform.bounds.min.x;
        const height = platform.bounds.max.y - platform.bounds.min.y;
        const x = platform.position.x - width / 2;
        const y = platform.position.y - height / 2;
        const isTopPlatform = index === platforms.length - 1;
        drawPixelatedPlatform(context, x, y, width, height, isTopPlatform, platform.isPlayerOn);
    });
});
    // Custom function to draw a pixelated ball
    function drawPixelatedBall(context, x, y, radius) {
        const pixelSize = 4; // Adjust this for the size of the pixels
        const baseColor = 'rgb(200, 200, 200)'; // Base color for the ball
        const highlightColor = 'rgb(240, 240, 240)'; // Highlight color
        const shadowColor = 'rgb(100, 100, 100)'; // Shadow color
        

        // Draw a simple pixelated circle
        for (let row = -radius; row < radius; row += pixelSize) {
            for (let col = -radius; col < radius; col += pixelSize) {
                const distance = Math.sqrt(row * row + col * col);
    
                // Only draw pixels within the circle's radius
                if (distance < radius) {
                    let color;
    
                    // Determine color based on distance for shading effect
                    if (distance < radius * 0.4) {
                        color = highlightColor; // Inner highlight
                    } else if (distance < radius * 0.7) {
                        color = baseColor; // Base color
                    } else {
                        color = shadowColor; // Outer shadow
                    }
    
                    context.fillStyle = color;
                    context.fillRect(x + col, y + row, pixelSize, pixelSize);
                }
            }
        }
    }
    let particles = [];

// Smoke particle class
class SmokeParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 5 + 10); // Random size between 10 and 15 for a more prominent look
        this.opacity = 1; // Full opacity
        this.velocityX = (Math.random() - 0.5) * 1.5; // Reduced random horizontal velocity
        this.velocityY = Math.random() * -1.5; // Reduced upward velocity
        this.gravity = 0.05; // Reduced gravity for smooth drifting
        this.followingTime = 10; // Time before the particle starts drifting away
    }

    update(playerX, playerY) {
        if (this.followingTime > 0) {
            this.x = playerX + (Math.random() - 0.5) * 10;
            this.y = playerY + (Math.random() - 0.5) * 5;
            this.followingTime--;
        } else {
            this.velocityY += this.gravity;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }

        this.opacity -= 0.020; // Slow fading for a more persistent look
    }

    isVisible() {
        return this.opacity > 0;
    }

    draw(context) {
        // Define colors for the multi-shaded effect
        const baseColor = 'rgba(200, 200, 200,';
        const shadowColor = 'rgba(150, 150, 150,';
        const highlightColor = 'rgba(255, 255, 255,';

        // Draw the base pixel
        context.fillStyle = `${baseColor} ${this.opacity})`;
        context.fillRect(this.x, this.y, this.size, this.size);

        // Draw the shadow pixel, offset to the bottom right
        context.fillStyle = `${shadowColor} ${this.opacity * 0.8})`; // Slightly darker and more transparent
        context.fillRect(this.x + this.size * 0.2, this.y + this.size * 0.2, this.size * 0.8, this.size * 0.8);

        // Draw the highlight pixel, offset to the top left
        context.fillStyle = `${highlightColor} ${this.opacity * 0.5})`; // Lighter and more transparent
        context.fillRect(this.x - this.size * 0.1, this.y - this.size * 0.1, this.size * 0.6, this.size * 0.6);
    }
}
function createSmokeEffect(x, y) {
    for (let i = 0; i < 1; i++) {
        particles.push(new SmokeParticle(x, y));
    }
}

// Update and draw all particles
function updateAndDrawParticles(context, playerX, playerY) {
    particles.forEach((particle, index) => {
        particle.update(playerX, playerY);
        if (!particle.isVisible()) {
            particles.splice(index, 1); // Remove particle if it's no longer visible
        } else {
            particle.draw(context);
        }
    });
}
    // Override Matter.js rendering to draw the custom pixelated ball
    Events.on(render, 'afterRender', function() {
        const context = render.context;
        const playerPosition = player.position;
         // Draw the smoke particles first, so they appear behind the ball
        updateAndDrawParticles(context, playerPosition.x, playerPosition.y);
         // Draw the ball on top of the smoke particles
        drawPixelatedBall(context, playerPosition.x, playerPosition.y, 20);
    });

    // Movement Logic
    const groundSpeed = 1;
    const airSpeed = 5;
    const jumpStrength = -12;
    let isMovingLeft = false;
    let isMovingRight = false;
    const groundedFriction = 25;
    const airFriction = 0;
    
    
    let levelChanged = false;

// Event listener for keydown events
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === ' ') { // Only check for space key
        // Check if the player is on the top platform and the transition hasn't happened yet
        if (isOnPlatform(player, [topPlatform]) && !levelChanged) {
            landAndSpaceSound.play();
            levelChanged = true; // Prevent further transitions
            transitionToLevel2(); // Call the transition function
        }
    }
    // Handle other keys
    switch (event.key.toLowerCase()) {
        case 'w':
            if (!cinematicActive && isOnPlatform(player, platforms)) {
                jumpSound.play();
                Body.setVelocity(player, { x: player.velocity.x, y: jumpStrength });

            }
            break;
        case 'a':
            if (!cinematicActive) isMovingLeft = true;
            break;
        case 's':
            if (!cinematicActive) Body.setVelocity(player, { x: player.velocity.x, y: 5 });
            break;
        case 'd':
            if (!cinematicActive) isMovingRight = true;
            break;
    }
});
    
    document.addEventListener('keyup', function(event) {
        switch (event.key.toLowerCase()) {
            case 'a':
                if (!cinematicActive) isMovingLeft = false;
                break;
            case 'd':
                if (!cinematicActive) isMovingRight = false;
                break;
        }
    });

function gameLoop() {
    const isGrounded = isOnPlatform(player, platforms);
    if (!isGrounded) {
        createSmokeEffect(player.position.x, player.position.y);
    }
    requestAnimationFrame(gameLoop);
}
gameLoop();
    document.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {
            case 'a':
                isMovingLeft = false;
                break;
            case 'd':
                isMovingRight = false;
                break;
        }
    });

    function applyMovement() {
        const isGrounded = isOnPlatform(player, platforms);
        player.friction = isGrounded ? groundedFriction : airFriction;
        const horizontalSpeed = isGrounded ? groundSpeed : airSpeed;

        if (isMovingLeft) {
            Body.setVelocity(player, { x: -horizontalSpeed, y: player.velocity.y });
        } else if (isMovingRight) {
            Body.setVelocity(player, { x: horizontalSpeed, y: player.velocity.y });
        }

        requestAnimationFrame(applyMovement);
    }
    applyMovement();
}

// Helper function to check if player is on a platform
function isOnPlatform(player, platforms) {
    return platforms.some(platform => {
        const distanceY = Math.abs(player.position.y - platform.position.y);
        const distanceX = Math.abs(player.position.x - platform.position.x);
        const platformWidth = platform.bounds.max.x - platform.bounds.min.x;
        return distanceY <= 30 && distanceX <= platformWidth / 2;
    });
}
const topPlatform = platforms[platforms.length - 1];
const spaceText = document.getElementById('spaceText');
function checkPlayerPosition() {
    const fallThreshold = window.innerHeight;
    const firstPlatform = platforms[0];
    const centerX = (firstPlatform.bounds.min.x + firstPlatform.bounds.max.x) / 2;
    const startY = firstPlatform.position.y - 20;

    if (player.position.y > fallThreshold) {
        Body.setPosition(player, { x: centerX, y: startY });
        Body.setVelocity(player, { x: 0, y: 0 });
        cameraOffsetY = 0;
    }

     // Check if the player has landed on the top platform
     const distanceY = Math.abs(player.position.y - topPlatform.position.y);
     const distanceX = Math.abs(player.position.x - topPlatform.position.x);
     const platformWidth = topPlatform.bounds.max.x - topPlatform.bounds.min.x;
 
     // If the player is on the top platform, show the "Press SPACE" instruction
    if (distanceY <= 30 && distanceX <= platformWidth / 2) {
        spaceText.style.display = 'block'; // Show space text when on the platform
        spaceText.style.animation = 'fadeIn 1s forwards'; // Trigger the fade-in animation
    } else {
        spaceText.style.display = 'none'; // Hide space text when the player is off the platform
    }
}


let cinematicActive = true; // Flag to control player movement during cinematic
let cinematicStarted = false; // Flag to ensure the cinematic only runs once
let cameraYOffset = -window.innerHeight; // Start from the top of the level

function startCinematic() {
    // Disable player movement
    cinematicActive = true;
    cinematicStarted = true;

    const levelTopY = -600; // Adjust this to represent the top of your level
    const startingPlatform = platforms[0]; // Get the first platform
    const targetY = startingPlatform.position.y - window.innerHeight / 2; // Calculate the target Y position based on the starting platform
    const cinematicDuration = 5000; // Duration of the cinematic in milliseconds
    const startTime = Date.now();

    // Easing function (easeInOutQuad)
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    // Animate the camera from the top of the level to the position of the starting platform
    function animateCamera() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / cinematicDuration, 1); // Normalize progress (0 to 1)
        const easedProgress = easeInOutQuad(progress); // Apply easing

        // Calculate the current camera position with easing
        cameraYOffset = levelTopY + (targetY - levelTopY) * easedProgress;

        if (progress < 1) {
            requestAnimationFrame(animateCamera);
        } else {
            // Cinematic is over, enable player movement and fix the camera on the player
            cinematicActive = false;
        }
    }

    // Start the camera animation
    animateCamera();
}
function updateCamera() {
    
    const playerY = player.position.y;
    // If the cinematic is active, use the cinematic camera position
    if (cinematicActive) {
        render.context.setTransform(1, 0, 0, 1, 0, -cameraYOffset);
    } else {
        // Smoothly transition the camera to follow the player after the cinematic
        const targetCameraY = playerY - window.innerHeight / 2;
        
        // Use linear interpolation (lerp) to smooth the transition
        cameraYOffset += (targetCameraY - cameraYOffset) * 0.1; // Adjust 0.1 for smoother or quicker transitions

        render.context.setTransform(1, 0, 0, 1, 0, -cameraYOffset);
    }
}
function applyMovement() {
    if (!cinematicActive) { // Only allow movement if the cinematic is not active
        const isGrounded = isOnPlatform(player, platforms);
        player.friction = isGrounded ? groundedFriction : airFriction;
        const horizontalSpeed = isGrounded ? groundSpeed : airSpeed;

        if (isMovingLeft) {
            Body.setVelocity(player, { x: -horizontalSpeed, y: player.velocity.y });
        } else if (isMovingRight) {
            Body.setVelocity(player, { x: horizontalSpeed, y: player.velocity.y });
        }
    }

    requestAnimationFrame(applyMovement);
}
applyMovement();
// Level
// Run the engine and renderer
Engine.run(engine);
Render.run(render);

Events.on(engine, 'afterUpdate', () => {
    updateCamera();
    checkPlayerPosition();
});
//level 2 stuff
function setLevelBackground(color) {
    const canvas = document.querySelector('.level-container canvas');
    if (canvas) {
        canvas.style.transition = 'background-color 1s ease'; // Smooth transition for background color
        canvas.style.backgroundColor = color;
    }
}
let currentLevel = 2;
const platformsLevel2 = [
       // Starting platforms - easier jumps
     // Starting platforms - easier jumps to get started
     Bodies.rectangle(window.innerWidth * 0.1, 700, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.4, 650, 110, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
     Bodies.rectangle(window.innerWidth * 0.7, 600, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
 
     // Lower level platforms - mix of easy and moderate jumps
     Bodies.rectangle(window.innerWidth * 0.2, 550, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, 500, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.8, 450, 90, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 60, speed: 2.5, direction: 1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.3, 400, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.6, 350, 100, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 70, speed: 3, direction: -1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.2, 300, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.2, 300, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
 
     // Middle section - more platforms to add length and some challenging jumps
     Bodies.rectangle(window.innerWidth * 0.4, 250, 90, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 60, speed: 2.8, direction: -1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.7, 200, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, 150, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.8, 100, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.3, 50, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.6, 0, 110, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 50, speed: 2, direction: 1, density: .005, restitution: 0, frictionAir: 0, inertia: Infinity}),
     Bodies.rectangle(window.innerWidth * 0.2, -50, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, -100, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.7, -150, 80, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
     Bodies.rectangle(window.innerWidth * 0.3, -200, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.6, -250, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
 
     // Extended section - more platforms for a longer climb
     Bodies.rectangle(window.innerWidth * 0.4, -300, 100, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 50, speed: 2, direction: 1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.2, -50, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, -350, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.2, -400, 90, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
     Bodies.rectangle(window.innerWidth * 0.8, -450, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.6, -500, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.6, -500, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.3, -550, 110, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
     Bodies.rectangle(window.innerWidth * 0.7, -600, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, -650, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.8, -700, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.4, -750, 110, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.2, -800, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
 
     // Higher platforms - final stretch before the goal
     Bodies.rectangle(window.innerWidth * 0.6, -850, 90, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 100, speed: 2, direction: -1, density: 0.005, inertia: Infinity }),
     Bodies.rectangle(window.innerWidth * 0.3, -900, 110, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
     Bodies.rectangle(window.innerWidth * 0.7, -950, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.5, -1000, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.4, -1050, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
     Bodies.rectangle(window.innerWidth * 0.8, -1100, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
 
     // Goal platform
     Bodies.rectangle(window.innerWidth * 0.5, -1150, 150, 20, { isStatic: true, render: { fillStyle: 'gold' } }) // Goal platform
 ];
    // Animation loop to move platforms side to side
    // Animation loop to move platforms side to side
Events.on(engine, 'beforeUpdate', function() {
    const time = Date.now() / 1000; // Use time in seconds for smooth movement

    platformsLevel2.forEach(platform => {
        if (platform.shouldMove) {
            // Calculate the initial X position
            const initialX = platform.initialX || (platform.initialX = platform.position.x);

            // Calculate the offset for the side-to-side movement
            const offset = platform.amplitude * Math.sin(platform.speed * time * platform.direction);

            // Set the X position for side-to-side movement
            const newX = initialX + offset;

            // Keep the platform from falling by locking its Y position
            const fixedY = platform.initialY || (platform.initialY = platform.position.y);

            // Move the platform
            Body.setPosition(platform, { x: newX, y: fixedY });

            // Ensure no velocity or force accumulates due to gravity
            Body.setVelocity(platform, { x: 0, y: 0 });
        }
    });
});
function transitionToLevel2() {
    const levelContainer = document.querySelector('.level-container');

    // Start the fade-out effect
    levelContainer.style.transition = 'opacity 1s ease'; // Smooth fade-out
    levelContainer.style.opacity = '0';

    setTimeout(() => {
        // Remove all platforms from the first level
        platforms.forEach(platform => {
            World.remove(world, platform);
        });

        // Add the platforms for level 2
        platformsLevel2.forEach(platform => {
            World.add(world, platform);
        });

        // Clear the platforms array and add the level 2 platforms
        platforms.length = 0;
        platforms.push(...platformsLevel2);

        // Reset the player position to the starting platform of level 2
        const startX = (platformsLevel2[0].bounds.min.x + platformsLevel2[0].bounds.max.x) / 2;
        const startY = platformsLevel2[0].position.y - 20;
        Body.setPosition(player, { x: startX, y: startY });
        Body.setVelocity(player, { x: 0, y: 0 });

        // Change the background color for Level 2
        setLevelBackground('black');
        currentLevel = 2;
        // Start the fade-in effect after the platforms are updated
        levelContainer.style.opacity = '1'; // Smooth fade-in
    }, 1000); // Delay matches the fade-out duration (1s)
}
// Function to randomly decide if a platform should fall (20% chance)

const platformsLevel3 = [
    // Starting platforms - get player familiar with the level
    Bodies.rectangle(window.innerWidth * 0.2, 700, 150, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Larger platform
Bodies.rectangle(window.innerWidth * 0.5, 650, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Larger platform
Bodies.rectangle(window.innerWidth * 0.7, 600, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Larger platform

// Lower level platforms
Bodies.rectangle(window.innerWidth * 0.3, 550, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.6, 500, 120, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.2, -800, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.8, 450, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.2, 400, 100, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.5, 350, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Larger platform
Bodies.rectangle(window.innerWidth * 0.7, 300, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, 250, 80, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
Bodies.rectangle(window.innerWidth * 0.2, 200, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.6, 150, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Larger platform
Bodies.rectangle(window.innerWidth * 0.8, 100, 120, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.3, 50, 180, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.5, 0, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),

// Additions to extend the level higher
Bodies.rectangle(window.innerWidth * 0.7, -50, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -100, 80, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.2, -150, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.6, -200, 130, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.3, -250, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.8, -300, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.5, -350, 130, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -400, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -450, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.2, -500, 140, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.6, -550, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.3, -600, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.8, -650, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
Bodies.rectangle(window.innerWidth * 0.5, -700, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -750, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),

// Keep adding explicitly for 100 platforms
Bodies.rectangle(window.innerWidth * 0.3, -800, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -850, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
Bodies.rectangle(window.innerWidth * 0.6, -900, 110, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.2, -950, 130, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -1000, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.5, -1050, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.4, -1100, 100, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.6, -1150, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.3, -1200, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.8, -1250, 120, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
    Bodies.rectangle(window.innerWidth * 0.5, -1300, 90, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Larger platform

    Bodies.rectangle(window.innerWidth * 0.4, -1350, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -1400, 90, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.2, -1450, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Made this platform wider
Bodies.rectangle(window.innerWidth * 0.6, -1500, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.5, -1550, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform

Bodies.rectangle(window.innerWidth * 0.3, -1600, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Made this platform wider
Bodies.rectangle(window.innerWidth * 0.8, -1650, 90, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -1700, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.6, -1750, 110, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -1800, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),

Bodies.rectangle(window.innerWidth * 0.5, -1850, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.2, -1900, 80, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.8, -1950, 100, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -2000, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.6, -2050, 110, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform

Bodies.rectangle(window.innerWidth * 0.3, -2100, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Made this platform wider
Bodies.rectangle(window.innerWidth * 0.7, -2150, 60, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.2, -2200, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.5, -2250, 120, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.8, -2300, 70, 20, { isStatic: true, render: { fillStyle: 'gray' } }),

Bodies.rectangle(window.innerWidth * 0.4, -2350, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.6, -2400, 80, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.3, -2450, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.7, -2500, 120, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.2, -2550, 80, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Made this platform wider

Bodies.rectangle(window.innerWidth * 0.5, -2600, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.8, -2650, 80, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
Bodies.rectangle(window.innerWidth * 0.4, -2700, 60, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.6, -2750, 100, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.3, -2800, 120, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform

Bodies.rectangle(window.innerWidth * 0.7, -2850, 80, 20, { isStatic: true, render: { fillStyle: 'gray' }, shouldFall: true, group: 'falling' }),
Bodies.rectangle(window.innerWidth * 0.5, -2900, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),
Bodies.rectangle(window.innerWidth * 0.2, -2950, 80, 20, { isStatic: false, render: { fillStyle: 'gray' }, shouldMove: true, amplitude: 90, speed: 1.5, direction: 1, density: 0.005, inertia: Infinity }),
Bodies.rectangle(window.innerWidth * 0.8, -3000, 100, 20, { isStatic: true, render: { fillStyle: 'gray' } }), // Wider platform
Bodies.rectangle(window.innerWidth * 0.4, -3050, 90, 20, { isStatic: true, render: { fillStyle: 'gray' } }),

// Final platform leading to the goal
Bodies.rectangle(window.innerWidth * 0.5, -3100, 150, 20, { isStatic: true, render: { fillStyle: 'gold' } }) // Goal platform
];
// This event is triggered before each update
Events.on(engine, 'beforeUpdate', function() {
    const time = Date.now() / 1000; // Use time in seconds for smooth movement

    platformsLevel3.forEach(platform => {
        if (platform.shouldMove) {
            // Calculate the initial X position if not already stored
            const initialX = platform.initialX || (platform.initialX = platform.position.x);

            // Calculate the offset for the side-to-side movement using sine wave
            const offset = platform.amplitude * Math.sin(platform.speed * time * platform.direction);

            // Calculate the new X position by adding the offset to the initial X position
            const newX = initialX + offset;

            // Lock the Y position to keep the platform from falling (use initial Y if not set)
            const fixedY = platform.initialY || (platform.initialY = platform.position.y);

            // Move the platform to the new position
            Body.setPosition(platform, { x: newX, y: fixedY });

            // Ensure no velocity or force accumulates due to gravity
            Body.setVelocity(platform, { x: 0, y: 0 });
        }
    });
});
// Update the falling behavior when the player lands on a platform
Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;

    // Check for collision with falling platforms
    pairs.forEach(pair => {
        const platform = pair.bodyA === player ? pair.bodyB : pair.bodyA;

        // Check if the platform is falling, and if so, prevent it from stopping
        if (platform.falling) {
            // Ensure the platform stays dynamic and doesn't interact with static platforms
            Matter.Body.setStatic(platform, false);
            platform.collisionFilter.group = 1; // Make sure it no longer interacts with static platforms
        }
    });
});

// Transition to the third level
function transitionToLevel3() {
    const levelContainer = document.querySelector('.level-container');

    // Start the fade-out effect
    levelContainer.style.transition = 'opacity 1s ease';
    levelContainer.style.opacity = '0';

    setTimeout(() => {
        // Remove all platforms from the second level
        platformsLevel2.forEach(platform => {
            World.remove(world, platform);
        });

        // Add the platforms for the third level
        platformsLevel3.forEach(platform => {
            World.add(world, platform);
        });

        // Update the platforms array to the third level
        platforms.length = 0;
        platforms.push(...platformsLevel3);

        // Reset the player position to the starting platform of the third level
        const startX = (platformsLevel3[0].bounds.min.x + platformsLevel3[0].bounds.max.x) / 2;
        const startY = platformsLevel3[0].position.y - 20;
        Body.setPosition(player, { x: startX, y: startY });
        Body.setVelocity(player, { x: 0, y: 0 });

        // Update the background color for the third level
        setLevelBackground('black');
        currentLevel = 3;

        // Start the fade-in effect after updating platforms
        levelContainer.style.opacity = '1';
    }, 1000); // Delay matches the fade-out duration
}

// Add a keydown event listener for transitioning to Level 3
document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        // Check if the player is on the top platform of Level 2
        if (currentLevel === 2) {
            const topPlatform = platformsLevel2[platformsLevel2.length - 1];
            const distanceY = Math.abs(player.position.y - topPlatform.position.y);
            const distanceX = Math.abs(player.position.x - topPlatform.position.x);
            const platformWidth = topPlatform.bounds.max.x - topPlatform.bounds.min.x;

            if (distanceY <= 30 && distanceX <= platformWidth / 2) {
                landAndSpaceSound.play();
                // Transition to Level 3
                transitionToLevel3();
            }
        }
    }
});
// This will be triggered when the player reaches the top of level 3
let isAtTopOfLevel3 = false;

// Function to check if the player has reached the top platform of level 3
// Function to check if the player has reached the top platform of level 3
function checkPlayerAtTop() {
    if (currentLevel !== 3) return; // Ensure that this check only runs for Level 3

    const topPlatform = platformsLevel3[platformsLevel3.length - 1]; // The top platform
    const playerY = player.position.y; // Player's Y position
    const playerX = player.position.x; // Player's X position

    const distanceY = Math.abs(playerY - topPlatform.position.y); // Vertical distance
    const distanceX = Math.abs(playerX - topPlatform.position.x); // Horizontal distance
    const platformWidth = topPlatform.bounds.max.x - topPlatform.bounds.min.x; // Platform width

    // If the player has landed on the top platform (both X and Y distance checks)
    if (distanceY <= 30 && distanceX <= platformWidth / 2) {
        showGameOverScreen(); // Trigger game over screen immediately
        removeLevel3Platforms(); // Optionally remove level 3 platforms if necessary
    }
}
// Call the checkPlayerAtTop function on every game update (before each frame)
Events.on(engine, 'beforeUpdate', function() {
    checkPlayerAtTop(); // Continuously check the player's position, but only for Level 3
});
// Function to remove all platforms in level 3
function removeLevel3Platforms() {
    platformsLevel3.forEach(platform => {
        World.remove(world, platform); // Remove each platform from the world
    });
    platformsLevel3.length = 0; // Clear the platforms array for level 3
}

// Function to show the game over screen and hide level 3
// Function to show the game over screen and hide level 3
function showGameOverScreen() {
    const gameOverScreen = document.getElementById('gameOverScreen');

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    // Remove any transition on the Game Over screen
    gameOverScreen.style.transition = 'none'; // Disable transition temporarily
// Hide start button after completing the game
    const startButton = document.getElementById('startButton');
    startButton.style.display = 'none'; 
    // Show the Game Over screen and set opacity to 1 immediately
    gameOverScreen.style.display = 'block';
    gameOverScreen.style.opacity = '1';
    document.body.style.cursor = "url('Images/icons8-cursor-32.png') 16 16, auto";
    // Show the Go Back button functionality
    const goBackButton = document.getElementById('goBackButton');
    goBackButton.addEventListener('click', function() {
        // Hide the Game Over screen
        gameOverScreen.style.display = 'none';
        
        const startScreen = document.querySelector('.start-screen');
        startScreen.style.display = 'block'; // Show the start screen
        resetGame();  // Call resetGame function to reset everything (if necessary)
    });
}

// You may need a function to reset the game
// Reset the game to bring back the start screen and initial level
function resetGame() {
    // Hide level 3 and the game over screen
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';

    const levelContainer = document.querySelector('.level-container');
    levelContainer.style.display = 'none'; // Hide the level

    // Show the start screen again
    const startScreen = document.querySelector('.start-screen');
    startScreen.style.display = 'flex'; // Show the start screen

    // Reset the game world (clear platforms, player state, etc.)
    resetWorld();

    // Reset other game states like player position, score, etc.
    resetPlayer();

    // Set current level back to 1
    currentLevel = 1;
}

function resetWorld() {
    // Clear all platforms and other game objects
    platforms.forEach(platform => {
        World.remove(world, platform);
    });
    platforms.length = 0; // Clear platform array

    // If you have other game objects or bodies to reset, do so here
}

function resetPlayer() {
    // Reset player position to the start position (you can adjust this as needed)
    const startX = window.innerWidth / 2; // Example position
    const startY = 100; // Example position (adjust accordingly)
    Body.setPosition(player, { x: startX, y: startY });
    Body.setVelocity(player, { x: 0, y: 0 });
}


// AUDIO STUFF
// Create audio elements for each button hover sound effect
const startButtonSound = new Audio('Audio/Hover2.mp3');
const creditsButtonSound = new Audio('Audio/Hover2.mp3');
const aboutMeButtonSound = new Audio('Audio/Hover2.mp3');
const closeButtonHoverSound = new Audio('Audio/Hover2.mp3');

// Click sounds
const startButtonClickSound = new Audio('Audio/Click1.mp3');
const creditsButtonClickSound = new Audio('Audio/Click1.mp3');
const aboutMeButtonClickSound = new Audio('Audio/Click1.mp3');
const closeButtonClickSound = new Audio('Audio/Click1.mp3');


// Play sound effect when hovering over the "Start Game" button
document.getElementById('startButton').addEventListener('mouseover', function() {
    startButtonSound.play();
});

// Play sound effect when hovering over the "Credits" button
document.getElementById('creditsButton').addEventListener('mouseover', function() {
    creditsButtonSound.play();
});

// Play sound effect when hovering over the "About Me" button
document.getElementById('aboutMeButton').addEventListener('mouseover', function() {
    aboutMeButtonSound.play();
});



// Add click effect listeners
document.getElementById('startButton').addEventListener('click', function() {
    startButtonClickSound.play();
});
document.getElementById('creditsButton').addEventListener('click', function() {
    creditsButtonClickSound.play();
});
document.getElementById('aboutMeButton').addEventListener('click', function() {
    aboutMeButtonClickSound.play();
});


// Apply hover effect for both close buttons
const closeButton = document.querySelectorAll('.close-button');

closeButtons.forEach(button => {
    button.addEventListener('mouseover', function() {
        closeButtonHoverSound.play();
    });

    button.addEventListener('click', function() {
        closeButtonClickSound.play();
    });
});

// Define sound for the hover and click effects for the links
const linkHoverSound = new Audio('Audio/Hover2.mp3');
const linkClickSound = new Audio('Audio/Click1.mp3');

// Select all anchor tags inside the about-links div
const aboutLinks = document.querySelectorAll('.about-links a');

// Add hover and click event listeners for each link
aboutLinks.forEach(link => {
    // Hover effect: Play sound when hovering over a link
    link.addEventListener('mouseover', function() {
        linkHoverSound.play();
    });

    // Click effect: Play sound when a link is clicked
    link.addEventListener('click', function() {
        linkClickSound.play();
    });
});


const backgroundMusic = new Audio('Audio/BackgroundMusic.mp3');
backgroundMusic.loop = true; // Set the music to loop
backgroundMusic.volume = 0.6;
// Event listener to play music when the page is loaded
// Step 2: Add event listener for the "Start Game" button
document.getElementById('startButton').addEventListener('click', function() {
    // Play the background music when the game starts
    backgroundMusic.play();
});