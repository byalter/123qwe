const getSignal = document.getElementById("get-signal"),
      stopSignalTimeBlock = document.getElementById("stop-signal-time-block"),
      printSignal = document.getElementById("print-signal"),
      stopProgress = document.getElementById("stop-progress"),
      errorNotification = document.getElementById("error-notification"),
      errorProgress = document.getElementById("error-progress"),
      textError = document.getElementById("text-error"),
      getSignalTwo = document.getElementById("get-signal-two"),
      errorExit = document.getElementById("error-exit");

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function goTimer(time) {
    const timer = setInterval(() => {
        if (time >= 1) {
            getSignalTwo.classList.remove("deactivate");
            getSignal.classList.add("deactivate");
            getSignalTwo.style["z-index"] = "5";
            stopProgress.style.animation = "animateProgress 30s linear infinite";
            stopSignalTimeBlock.classList.remove("deactivate");
            document.getElementById("stop-timer").innerHTML = time-- + "<span> segundos</span>";
            getSignal.disabled = true;
        } else {
            getSignalTwo.classList.add("deactivate");
            getSignal.classList.remove("deactivate");
            getSignalTwo.style["z-index"] = "-1";
            stopSignalTimeBlock.classList.add("deactivate");
            stopProgress.style.animation = "none";
            clearInterval(timer);
            getSignal.disabled = false;
        }
    }, 1000);
}

function goTimerError(time) {
    const timer = setInterval(() => {
        if (time >= 1) {
            time--;
            errorNotification.classList.remove("deactivate");
            textError.innerHTML = "Espera a que el tiempo expire";
            errorProgress.style.animation = "animateErrorProgress 5s linear infinite";
            errorNotification.style.transform = "translateY(0px)";
        } else {
            errorNotification.style.transform = "translateY(-99px)";
            errorProgress.style.animation = "none";
            clearInterval(timer);
            getSignalTwo.disabled = false;
            errorNotification.classList.add("deactivate");
        }

        errorExit.onclick = function () {
            errorNotification.classList.add("deactivate");
            errorNotification.style.transform = "translateY(-99px)";
            errorProgress.style.animation = "none";
            clearInterval(timer);
            getSignalTwo.disabled = false;
        };
    }, 1000);
}

getSignal.onclick = function () {
    let receivingSignal = getRandomFloat(1, 3.99, 2);
    
    if (receivingSignal.toString().length === 3) {
        receivingSignal += "0";
    }
    if (receivingSignal.toString().length === 1) {
        receivingSignal += ".00";
    }

    printSignal.innerHTML = `${receivingSignal}x`;
    printSignal.classList.remove("deactivate");
    goTimer(30);
    getSignal.disabled = true;
};

getSignalTwo.onclick = function () {
    getSignalTwo.disabled = true;
    goTimerError(5, "go");
};

// 🎇 Анимация частиц из games.html 🎇
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Отражение от краев
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 100; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener("resize", resizeCanvas);

    initParticles();
    animateParticles();
});