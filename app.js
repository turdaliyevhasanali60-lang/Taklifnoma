/**
 * Interactivity, Logic & Translations for Premium Wedding Invitation Site
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. CONTENT DICTIONARY (UZBEK ONLY)
  // ==========================================================================
  const content = {
    title: "Hurmat bilan Sardorbek Ganibekov — Taklifnoma",
    hero_subtitle: "Nikoh To'yi",
    hero_quote: "«Sevgi — bu bir-biriga qarash emas, balki bir yo‘nalishda birga qarashdir.»",
    hero_author: "— Jaloliddin Rumiy",
    invite_body: "Aziz va qadrli insonlar, Biz hayotimizning yangi bosqichiga qadam qo‘ymoqdamiz. Bu kun — faqat marosim emas, bu — ikki qalbning bir yo‘lga aylanishi. Sizning ishtirokingiz biz uchun qadrlidir.",
    details_body: "Sizni 2026-yil 24&ndash;25-iyul kunlari bo‘lib o‘tadigan to‘y marosimlarimizga taklif etamiz.",
    closing_quote: "«Ba’zi lahzalar so‘zga sig‘maydi. Ular faqat his qilinadi. Sizni yonimizda ko‘rishdan mamnun bo‘lamiz.»",
    scroll_open: "Ochish uchun bosing",
    events_subtitle: "Marosim Tafsilotlari",
    events_title: "Sizni Kutamiz",
    event1_title: "Kuyov-Navkar",
    event2_time: "Nonushta",
    event2_title: "Nahor Oshi",
    map_link: "Xaritada ko‘rish",
    gift_subtitle: "To‘yona",
    gift_title: "To‘yona Berish Uchun",
    gift_text: "Marosimimizga tashrif buyurishingiz o‘zi biz uchun eng katta sovg‘a. Agar to‘yona berishni istasangiz, quyidagi kartadan foydalanishingiz mumkin.",
    copy_btn: "Nusxalash",
    copied_btn: "Nusxalandi!",
    countdown_subtitle: "Tantanaga qolgan vaqt",
    countdown_days: "Kun",
    countdown_hours: "Soat",
    countdown_minutes: "Daqiqa",
    countdown_seconds: "Soniya",
    music_label: "Fon musiqasi",
    footer_closing: "Hurmat bilan, G‘anibekovlar Oilasi"
  };

  // ==========================================================================
  // 2. APPLY CONTENT TO PAGE
  // ==========================================================================
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (content[key]) {
      el.innerHTML = content[key];
    }
  });
  document.title = content.title;

  // ==========================================================================
  // 3. BACKGROUND MUSIC CONTROLLER & AUTOPLAY LOGIC
  // ==========================================================================
  const audio = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  const iconMuted = document.getElementById('music-icon-muted');
  const iconPlaying = document.getElementById('music-icon-playing');
  const soundWave = document.getElementById('music-wave');
  const scrollBtn = document.getElementById('scroll-btn');
  
  let isPlaying = false;

  function playAudio() {
    if (!audio) return Promise.reject('No audio element');
    return audio.play().then(() => {
      if (iconMuted) iconMuted.style.display = 'none';
      if (iconPlaying) iconPlaying.style.display = 'block';
      if (soundWave) soundWave.classList.add('playing');
      if (musicToggle) musicToggle.classList.add('playing');
      isPlaying = true;
    }).catch(error => {
      console.log('Playback blocked. Awaiting interaction:', error);
      throw error;
    });
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    if (iconPlaying) iconPlaying.style.display = 'none';
    if (iconMuted) iconMuted.style.display = 'block';
    if (soundWave) soundWave.classList.remove('playing');
    if (musicToggle) musicToggle.classList.remove('playing');
    isPlaying = false;
  }
  
  function toggleMusic() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }
  
  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Avoid triggering document click
      toggleMusic();
    });
  }
  
  // Interactive handler to bypass browser audio policies
  const startAudioOnInteraction = () => {
    if (!isPlaying) {
      playAudio().then(() => {
        // Success! Remove all interactive triggers
        document.removeEventListener('click', startAudioOnInteraction);
        document.removeEventListener('touchstart', startAudioOnInteraction);
        document.removeEventListener('touchend', startAudioOnInteraction);
        document.removeEventListener('mousedown', startAudioOnInteraction);
        document.removeEventListener('keydown', startAudioOnInteraction);
        document.removeEventListener('wheel', startAudioOnInteraction);
      }).catch(err => {
        // Failed, keep listeners active so next gesture tries again!
        console.log('Interaction trigger failed, keeping listeners active:', err);
      });
    }
  };
  
  document.addEventListener('click', startAudioOnInteraction);
  document.addEventListener('touchstart', startAudioOnInteraction);
  document.addEventListener('touchend', startAudioOnInteraction);
  document.addEventListener('mousedown', startAudioOnInteraction);
  document.addEventListener('keydown', startAudioOnInteraction);
  document.addEventListener('wheel', startAudioOnInteraction);

  // Try to play immediately on load (might be blocked, which is handled above)
  playAudio();

  // Scroll to Open button handler
  if (scrollBtn) {
    scrollBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop propagation to avoid double interaction triggering issues
      
      // Force play audio immediately
      playAudio();
      
      // Smooth scroll to invitation
      const invitationSec = document.getElementById('invitation');
      if (invitationSec) {
        invitationSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // 4. COUNTDOWN TIMER
  // ==========================================================================
  // Target date: July 24, 2026 at 20:00 (Kuyov-Navkar), Tashkent Time (UTC+5)
  const targetDate = new Date('2026-07-24T20:00:00+05:00').getTime();
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    
    if (difference <= 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 5. SCROLL REVEAL (NATIVE INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  // ==========================================================================
  // 6. GIFT CARD NUMBER — COPY TO CLIPBOARD
  // ==========================================================================
  const giftCopyBtn = document.getElementById('gift-copy-btn');
  const giftCardNumber = document.getElementById('gift-card-number');

  if (giftCopyBtn && giftCardNumber) {
    giftCopyBtn.addEventListener('click', () => {
      const cardNumber = giftCardNumber.innerText.replace(/\s/g, '');

      const showCopied = () => {
        const original = content.copy_btn;
        giftCopyBtn.innerText = content.copied_btn;
        giftCopyBtn.classList.add('copied');
        setTimeout(() => {
          giftCopyBtn.innerText = original;
          giftCopyBtn.classList.remove('copied');
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cardNumber).then(showCopied).catch(showCopied);
      } else {
        showCopied();
      }
    });
  }

  // ==========================================================================
  // 7. AUTO-START MUSIC ON SCROLL
  // ==========================================================================
  let hasScrolledStart = false;
  const startAudioOnScroll = () => {
    if (hasScrolledStart) return;
    if (window.scrollY > 50) {
      hasScrolledStart = true;
      playAudio();
      window.removeEventListener('scroll', startAudioOnScroll);
    }
  };
  window.addEventListener('scroll', startAudioOnScroll);

});
