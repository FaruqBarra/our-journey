document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. RELATIONSHIP COUNTER (Mulai 19 Feb 2025)
    // ==========================================
    const startDate = new Date("2025-02-19T00:00:00").getTime();

    function updateCounter() {
        const now = new Date().getTime();
        const difference = now - startDate;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");

            if (daysEl) daysEl.innerText = days;
            if (hoursEl) hoursEl.innerText = hours;
            if (minutesEl) minutesEl.innerText = minutes;
            if (secondsEl) secondsEl.innerText = seconds;
        }
    }

    setInterval(updateCounter, 1000);
    updateCounter();


    // ==========================================
    // 2. UNLOCK CONTENT & AUTO-PLAY MUSIC
    // ==========================================
    const bgMusic = document.getElementById("bgMusic");
    const musicToggleBtn = document.getElementById("musicToggleBtn");
    const musicIcon = document.getElementById("musicIcon");
    const unlockBtn = document.getElementById("unlockBtn");
    const lockedContent = document.getElementById("lockedContent");
    const mainNav = document.getElementById("mainNav");

    let isPlaying = false;

    function playAudio() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            isPlaying = true;
            if (musicToggleBtn) musicToggleBtn.classList.add("playing");
            if (musicIcon) {
                musicIcon.classList.remove("fa-music");
                musicIcon.classList.add("fa-pause");
            }
        }).catch(err => {
            console.log("Audio play error:", err);
        });
    }

    // Ketika Tombol 'Lihat Perjalanan ↓' Diklik
    if (unlockBtn) {
        unlockBtn.addEventListener("click", () => {
            playAudio();

            // Buka kunci scroll & tampilkan konten lain
            document.body.classList.remove("is-locked");
            if (lockedContent) lockedContent.classList.add("is-unlocked");
            if (mainNav) mainNav.classList.add("is-unlocked");

            // Scroll halus ke Timeline
            const timelineSection = document.getElementById("timeline");
            if (timelineSection) {
                setTimeout(() => {
                    timelineSection.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        });
    }

    // Tombol Manual Play / Pause di Pojok Kanan Bawah
    if (musicToggleBtn) {
        musicToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isPlaying) {
                bgMusic.pause();
                musicToggleBtn.classList.remove("playing");
                if (musicIcon) {
                    musicIcon.classList.remove("fa-pause");
                    musicIcon.classList.add("fa-music");
                }
                isPlaying = false;
            } else {
                playAudio();
            }
        });
    }


    // ==========================================
    // 3. SURPRISE MEMORY GENERATOR
    // ==========================================
    const memories = [
        "\"Setiap detik bersamamu adalah cerita terbaik yang pernah ada.\"",
        "\"Terima kasih sudah selalu ada dan tumbuh bersama sejauh ini.\"",
        "\"Bukan tentang ke mana kita pergi, tapi dengan siapa kita melewatinya.\"",
        "\"Momen sederhana jadi luar biasa kalau diresapi berdua.\"",
        "\"Hari demi hari berlalu, tapi rasa ini tetap sama hangatnya.\"",
        "\"Semoga setiap tawa dan cerita hari ini selalu kita ingat di masa depan.\""
    ];

    const randomMemBtn = document.getElementById("randomMemBtn");
    const memoryDisplay = document.getElementById("memoryDisplay");
    const memoryText = document.getElementById("memoryText");

    if (randomMemBtn && memoryDisplay && memoryText) {
        randomMemBtn.addEventListener("click", () => {
            const randomIndex = Math.floor(Math.random() * memories.length);
            memoryText.style.opacity = "0";

            setTimeout(() => {
                memoryText.innerText = memories[randomIndex];
                memoryDisplay.classList.remove("hidden");
                memoryText.style.opacity = "1";
            }, 200);
        });
    }


    // ==========================================
    // 4. LIGHTBOX MODAL (Zoom Foto)
    // ==========================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");
    const triggers = document.querySelectorAll(".lightbox-trigger");

    triggers.forEach(img => {
        img.addEventListener("click", () => {
            if (lightbox && lightboxImg && lightboxCaption) {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                lightboxCaption.innerText = img.alt || "Captured Moment";
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }


    // ==========================================
    // 5. INTERACTIVE SPARK / GOOD VIBES BUTTON
    // ==========================================
    const sparkBtn = document.getElementById("sparkBtn");
    const sparkCount = document.getElementById("sparkCount");
    let count = 0;

    if (sparkBtn && sparkCount) {
        sparkBtn.addEventListener("click", () => {
            count++;
            sparkCount.innerText = count;

            sparkBtn.style.transform = "scale(0.95)";
            setTimeout(() => {
                sparkBtn.style.transform = "scale(1)";
            }, 100);
        });
    }


    // ==========================================
    // 6. SCROLL REVEAL ANIMATION HALUS
    // ==========================================
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".gallery-item, .video-item, .timeline-item");
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(25px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(el);
    });

});