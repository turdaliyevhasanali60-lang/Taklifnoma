/**
 * Interactivity, Logic & Translations for Premium Wedding Invitation Site
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. TRANSLATION DICTIONARY DATA (ONLY STRICTLY REQUESTED CONTENT)
  // ==========================================================================
  const translations = {
    uz: {
      title: "G'anibekovlar Oilasi — Taklifnoma",
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
    },
    ru: {
      title: "Свадебное Приглашение — Семья Ганибековых",
      hero_subtitle: "Свадебное Торжество",
      hero_quote: "«Любовь — это не смотреть друг на друга, а смотреть в одном направлении.»",
      hero_author: "— Джалаладдин Руми",
      invite_body: "Дорогие и близкие нам люди, мы делаем шаг в новый этап нашей жизни. Этот день — не просто церемония, а слияние двух сердец в единый путь. Ваше присутствие очень дорого для нас.",
      details_body: "Приглашаем вас на наши свадебные торжества, которые состоятся 24&ndash;25 июля 2026 года.",
      closing_quote: "«Есть моменты, которые не выразить словами. Их можно только почувствовать. Будем рады видеть вас рядом с нами.»",
      scroll_open: "Открыть приглашение",
      events_subtitle: "Детали Торжества",
      events_title: "Ждём Вас",
      event1_title: "Kuyov-Navkar (Проводы жениха)",
      event2_time: "Завтрак",
      event2_title: "Nahor Oshi (Утренний плов)",
      map_link: "Смотреть на карте",
      gift_subtitle: "Той-хона",
      gift_title: "Для Свадебного Подарка",
      gift_text: "Ваше присутствие на нашем торжестве — самый ценный подарок для нас. Если вы хотите сделать денежный подарок, вы можете воспользоваться картой ниже.",
      copy_btn: "Скопировать",
      copied_btn: "Скопировано!",
      countdown_subtitle: "До свадьбы осталось",
      countdown_days: "Дней",
      countdown_hours: "Часов",
      countdown_minutes: "Минут",
      countdown_seconds: "Секунд",
      music_label: "Фоновая музыка",
      footer_closing: "С уважением, семья Ганибековых"
    },
    en: {
      title: "G'anibekov Family — Wedding Invitation",
      hero_subtitle: "Wedding Celebration",
      hero_quote: "\"Love does not consist in gazing at each other, but in looking together in the same direction.\"",
      hero_author: "— Jalaluddin Rumi",
      invite_body: "Dear family and friends, we are taking a step into a new chapter of our lives. This day is not just a ceremony, but the union of two hearts into one path. Your presence is very precious to us.",
      details_body: "We invite you to our wedding celebrations taking place on July 24&ndash;25, 2026.",
      closing_quote: "\"Some moments are beyond words. They can only be felt. We look forward to seeing you by our side.\"",
      scroll_open: "Scroll to Open",
      events_subtitle: "Celebration Details",
      events_title: "We Await You",
      event1_title: "Kuyov-Navkar (Groom's Farewell)",
      event2_time: "Breakfast",
      event2_title: "Nahor Oshi (Morning Plov)",
      map_link: "View on Map",
      gift_subtitle: "Wedding Gift",
      gift_title: "For a Wedding Gift",
      gift_text: "Your presence at our celebration is the greatest gift of all. If you'd like to send a monetary gift, you may use the card below.",
      copy_btn: "Copy",
      copied_btn: "Copied!",
      countdown_subtitle: "The Celebration Begins In",
      countdown_days: "Days",
      countdown_hours: "Hours",
      countdown_minutes: "Minutes",
      countdown_seconds: "Seconds",
      music_label: "Background Music",
      footer_closing: "With respect, The G'anibekov Family"
    }
  };

  let currentLang = 'uz';

  // ==========================================================================
  // 2. TRANSLATION CHANGER FUNCTION (setLanguage)
  // ==========================================================================
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('wedding_lang', lang);

    // Update active button state styling
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all standard text nodes with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Translate page Title
    document.title = translations[lang]['title'] || "Wedding Invitation";
  }

  // Bind Switcher Click Events
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      setLanguage(targetLang);
    });
  });

  // Load language preference from LocalStorage (fallback: uz)
  const savedLang = localStorage.getItem('wedding_lang') || 'uz';
  setLanguage(savedLang);

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
        const original = translations[currentLang]['copy_btn'];
        giftCopyBtn.innerText = translations[currentLang]['copied_btn'] || 'Copied!';
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
