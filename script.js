// --- LOADING SCREEN ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hide');
    }, 1000);
});

// --- PARTICLE BACKGROUND ---
const particlesCanvas = document.getElementById('particles-canvas');
const ctx = particlesCanvas.getContext('2d');
particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > particlesCanvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > particlesCanvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = document.body.classList.contains('light-mode') ? 'rgba(139, 92, 246, 0.3)' : 'rgba(167, 139, 250, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = document.body.classList.contains('light-mode') ? `rgba(139, 92, 246, ${0.2 - distance / 500})` : `rgba(167, 139, 250, ${0.2 - distance / 500})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});

// --- TYPING ANIMATION ---
const typingText = document.getElementById('typing-text');
const phrases = [
    'Creative Developer & Designer',
    'Full Stack Engineer',
    'Problem Solver',
    'Tech Enthusiast'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

typeText();

// --- HAMBURGER MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// --- CUSTOM CURSOR ---
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', `top: ${e.clientY}px; left: ${e.clientX}px;`);
});
document.addEventListener('mousedown', () => cursor.classList.add('grow'));
document.addEventListener('mouseup', () => cursor.classList.remove('grow'));

// Cursor grow on hover
const interactiveElements = document.querySelectorAll('a, button, .glass-effect');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// --- THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// --- SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- SCROLL TO TOP BUTTON ---
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- THREE.JS SCENE ---
const sceneContainer = document.getElementById('scene-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
sceneContainer.appendChild(renderer.domElement);

const systemGroup = new THREE.Group();
scene.add(systemGroup);

// --- SYSTEM ARCHITECTURE VISUALIZATION ---

// Helper to create text labels
function createLabel(text, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 48;
    context.font = `Bold ${fontSize}px Inter`;
    context.fillStyle = 'rgba(255, 255, 255, 0.75)';
    context.fillText(text, 0, fontSize);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(5, 2.5, 1);
    sprite.position.copy(position);
    
    return sprite;
}

// Create Service Blocks
const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.4, metalness: 0.6 });

// API Gateway
const apiGeo = new THREE.BoxGeometry(2, 4, 2);
const apiBlock = new THREE.Mesh(apiGeo, blockMaterial);
apiBlock.position.set(-6, 0, 0);
systemGroup.add(apiBlock);
systemGroup.add(createLabel('API', apiBlock.position.clone().setY(3)));

// Auth Service
const authGeo = new THREE.BoxGeometry(2, 2, 2);
const authBlock = new THREE.Mesh(authGeo, blockMaterial);
authBlock.position.set(0, 3, 0);
systemGroup.add(authBlock);
systemGroup.add(createLabel('Auth', authBlock.position.clone().setY(2)));

// Database
const dbGeo = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
const dbBlock = new THREE.Mesh(dbGeo, blockMaterial);
dbBlock.position.set(6, -2, 0);
systemGroup.add(dbBlock);
systemGroup.add(createLabel('DB', dbBlock.position.clone().setY(2.5)));

// Message Queue
const queueGroup = new THREE.Group();
const queueGeo = new THREE.BoxGeometry(1, 1, 1);
for(let i=0; i < 4; i++) {
    const queueBlock = new THREE.Mesh(queueGeo, blockMaterial);
    queueBlock.position.set(i * 1.5, 0, 0);
    queueGroup.add(queueBlock);
}
queueGroup.position.set(3, 4, 0);
systemGroup.add(queueGroup);
systemGroup.add(createLabel('Queue', queueGroup.position.clone().setY(1.5)));

const servicePoints = [apiBlock.position, authBlock.position, dbBlock.position, queueGroup.position];

// Create Animated Particles
const particleCount = 100;
const particles = [];
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

for (let i = 0; i < particleCount; i++) {
    const particle = {
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01,
        startPoint: servicePoints[Math.floor(Math.random() * servicePoints.length)],
        endPoint: servicePoints[Math.floor(Math.random() * servicePoints.length)],
        vector: new THREE.Vector3()
    };
    if (particle.startPoint === particle.endPoint) {
         particle.endPoint = servicePoints[(servicePoints.indexOf(particle.startPoint) + 1) % servicePoints.length];
    }
    particles.push(particle);
}
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
particles.forEach((p, i) => p.vector.toArray(particlePositions, i * 3));
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
systemGroup.add(particleSystem);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 0, 25);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

camera.position.z = 20;

// --- MOUSE INTERACTION & ANIMATION STATE ---
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
const mousePosition = { x: 0, y: 0 };

document.addEventListener('mousemove', (event) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

sceneContainer.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});
sceneContainer.addEventListener('mouseup', () => { isMouseDown = false; });
sceneContainer.addEventListener('mouseleave', () => { isMouseDown = false; });
sceneContainer.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    systemGroup.rotation.y += deltaX * 0.005;
    systemGroup.rotation.x += deltaY * 0.005;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Animate Particles
    particles.forEach((p, i) => {
        p.progress += p.speed;
        if (p.progress >= 1.0) {
            p.progress = 0;
            p.startPoint = servicePoints[Math.floor(Math.random() * servicePoints.length)];
            p.endPoint = servicePoints[Math.floor(Math.random() * servicePoints.length)];
            if (p.startPoint === p.endPoint) {
                p.endPoint = servicePoints[(servicePoints.indexOf(p.startPoint) + 1) % servicePoints.length];
            }
        }
        p.vector.lerpVectors(p.startPoint, p.endPoint, p.progress);
        p.vector.toArray(particlePositions, i * 3);
    });
    particleSystem.geometry.attributes.position.needsUpdate = true;

    if (!isMouseDown) {
        const scrollPercent = (document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        const targetScrollX = isNaN(scrollPercent) ? 0 : scrollPercent * 0.5;
        const targetScrollY = isNaN(scrollPercent) ? 0 : scrollPercent * 0.5;
        const targetMouseX = mousePosition.y * 0.2;
        const targetMouseY = mousePosition.x * 0.2;
        systemGroup.rotation.x += (targetScrollX + targetMouseX - systemGroup.rotation.x) * 0.05;
        systemGroup.rotation.y += (targetScrollY + targetMouseY - systemGroup.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}

animate();

// Responsive canvas
window.addEventListener('resize', () => {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
});

// --- CONTACT FORM SUBMISSION ---
const contactForm = document.querySelector('#contact form');
const successModal = document.getElementById('success-modal');
const closeModalButton = document.getElementById('close-modal');
const successMessage = document.getElementById('success-message');
const nameInput = document.getElementById('name');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = nameInput.value.trim();
    if (userName) {
        successMessage.textContent = `Your response has been submitted, ${userName}. We'll be in touch soon!`;
    } else {
        successMessage.textContent = `Your response has been submitted. We'll be in touch soon!`;
    }
    successModal.classList.remove('hidden');
    contactForm.reset();
});

function closeModal() {
    successModal.classList.add('hidden');
}
closeModalButton.addEventListener('click', closeModal);
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) closeModal();
});

// --- SCROLL ANIMATIONS ---
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};
const displayScrollElement = (element) => {
    element.classList.add('visible');
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) displayScrollElement(el);
    });
};
window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

// --- ANIMATE SKILL BARS ---
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        if (elementInView(bar.parentElement.parentElement, 1.25)) {
            bar.classList.add('animate');
        }
    });
};
window.addEventListener('scroll', animateSkillBars);
animateSkillBars();
