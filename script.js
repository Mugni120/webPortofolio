// Toggle Navbar on Menu Icon Click
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Change icon to 'x' when menu is open
    menuIcon.classList.toggle('fa-bars'); // Change back to bars when closed
    navbar.classList.toggle('active');
};

// Close Navbar when a link is clicked (for mobile view)
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        if (window.innerWidth <= 995) { // Only close on mobile
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
            navbar.classList.remove('active');
        }
    };
});

// Highlight Active Nav Link on Scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    // Active link based on scroll position
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Sticky Header
    let header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 13, 13, 0.98)';
        header.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(13, 13, 13, 0.95)';
        header.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.2)';
    }
};

// Text Typing Animation (using Typed.js)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    const typed = new Typed('.text-animation', {
        strings: ["Web Developer", "UI/UX Designer", "Data Analyst", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        smartBackspace: true
    });

    // Modal functionality for services
    const serviceButtons = document.querySelectorAll('.btn-service');
    const serviceModal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Data for service modals
    // CATATAN: ini satu-satunya salinan yang hidup. Salinan kedua di blok
    // DOMContentLoaded paling bawah sudah dihapus.
    const serviceData = {
        'web-development': {
            title: 'Full-Stack Developer',
            content: `
                <p>
                    Banyak proyek gagal bukan karena salah satu technology, tapi karena
                    <strong>frontend dan backend dikerjakan oleh pihak berbeda</strong> dan
                    handoff-nya bermasalah. Saya menangani keduanya, jadi tidak ada bagian
                    yang saling menunggu.
                </p>
                <ul>
                    <li><strong>Aplikasi web sesuai alur kerja Anda:</strong> dibangun dari nol mengikuti proses bisnis Anda, bukan template yang dipaksa berubah-ubah.</li>
                    <li><strong>Dashboard &amp; sistem internal:</strong> admin, inventaris, absensi, hingga laporan penjualan yang saling terhubung dalam satu basis data.</li>
                    <li><strong>Integrasi API:</strong> pembayaran, ongkos kirim, dan layanan pihak ketiga yang disambung rapi ke sistem Anda.</li>
                    <li><strong>Keamanan &amp; performa:</strong> validasi input di server, proteksi formulir, dan optimasi query agar tetap cepat saat data bertambah.</li>
                    <li><strong>Fondasi yang bisa dikembangkan:</strong> struktur kode rapi dan terdokumentasi, jadi menambah fitur berikutnya tidak perlu bongkar-pasang.</li>
                </ul>
                <p class="modal-note">
                    <strong>Untuk Anda:</strong> saya mulai dari memahami masalah Anda, bukan dari langsung menulis kode. Konsultasi awal gratis.
                </p>
                <p><strong>Teknologi:</strong> HTML5, CSS3, JavaScript, Node.js, Express.js, PHP, Laravel, MySQL, PostgreSQL</p>
                <p class="modal-cta"><a href="#contact">Diskusikan kebutuhan Anda &rarr;</a></p>
            `
        },
        'ui-ux': {
            title: 'Desain UI/UX',
            content: `
                <p>
                    Desain yang cantik belum tentu membuat produknya mudah dipakai. Yang membuat orang bertahan adalah
                    <strong>alur yang tidak terasa membosankan</strong> dan layar yang menyembunyikan
                    kompleksitas, bukan menampilkannya.
                </p>
                <ul>
                    <li><strong>Riset &amp; Competitive Audit:</strong> memahami siapa pengguna Anda dan mencari celah yang belum dipakai kompetitor.</li>
                    <li><strong>Wireframe &amp; Prototipe interaktif:</strong> Anda bisa mencoba alurnya sebelum satu baris kode ditulis.</li>
                    <li><strong>Design System:</strong> komponen, warna, dan tipografi yang konsisten agar tampilan tidak terlihat tambal sulam.</li>
                    <li><strong>Usability Testing:</strong> menguji dengan pengguna sungguhan dan memperbaiki titik yang jadi alasan mereka keluar.</li>
                    <li><strong>Desain yang siap langsung dikerjakan tim developer:</strong> file rapi dan terstruktur, mudah diserahkan ke tim Coding tanpa penerjemahan ulang.</li>
                </ul>
                <p class="modal-note">
                    <strong>Untuk Anda:</strong> fokus pertama saya adalah menemukan alasan pengunjung Anda berhenti. Panjang halaman dan warna teks bukan tebakan.
                </p>
                <p><strong>Tools:</strong> Figma, Adobe XD, Canva</p>
                <p class="modal-cta"><a href="#contact">Mulai dari kebutuhan Anda &rarr;</a></p>
            `
        },
        'data-analyst': {
            title: 'Data Analyst',
            content: `
                <p>
                    Kebanyakan laporan dari data berakhir sebagai file yang tidak pernah dibuka
                    lagi. Tugas saya adalah mengubahnya menjadi <strong>opsi yang punya angka</strong>,
                    bukan sekadar grafik yang menarik tapi tidak bisa ditindaklanjuti.
                </p>
                <ul>
                    <li><strong>Data Cleaning &amp; Preparation:</strong> merapikan data mentah yang berantakan, duplikat, dan tidak lengkap sebelum dianalisis.</li>
                    <li><strong>Analisis Exploratory:</strong> menemukan pola, tren, dan anomali yang selama ini terlewat di angka-angka besar.</li>
                    <li><strong>Dashboard visual:</strong> ringkasan yang bisa dibaca atasan dalam satu layar, bukan tabel panjang.</li>
                    <li><strong>Analisis statistik:</strong> menguji hipotesis dengan dasar yang benar, sehingga kesimpulan tidak sekadar tebakan.</li>
                    <li><strong>Rekomendasi yang bisa dijalankan:</strong> setiap temuan disertai saran tindakan dan perkiraan dampaknya.</li>
                </ul>
                <p class="modal-note">
                    <strong>Untuk Anda:</strong> saya selalu mulai dari pertanyaan bisnis Anda, bukan dari tools. Data yang tidak dipakai untuk mengambil keputusan tidak perlu dianalisis.
                </p>
                <p><strong>Teknologi &amp; Tools:</strong> SQL, Python, Excel/Google Sheets, SPSS</p>
                <p class="modal-cta"><a href="#contact">Konsultasi kebutuhan data &rarr;</a></p>
            `
        }
    };

    // Open modal when service button is clicked
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const service = button.getAttribute('data-service');
            
            if (serviceData[service]) {
                modalTitle.textContent = serviceData[service].title;
                modalBody.innerHTML = serviceData[service].content;
                serviceModal.style.display = 'flex';
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeServiceModal() {
        serviceModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeServiceModal);

    // CTA di dalam modal (class .modal-cta) di-inject lewat innerHTML, jadi
    // TIDAK ikut tertangkap handler smooth-scroll yang di-bind saat DOMContentLoaded.
    // Event delegation: tutup modal dulu, baru menggulir ke tujuan.
    serviceModal.addEventListener('click', (e) => {
        const cta = e.target.closest('a[href^="#"]');
        if (!cta) return;

        const target = document.querySelector(cta.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        closeServiceModal();
        // Tunggu modal selesai menutup agar posisi scroll dihitung setelah layout final
        setTimeout(() => {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }, 220);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.style.display === 'flex') {
            closeServiceModal();
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('contact-submit');
        const statusBox = document.getElementById('form-status');
        const accessKeyField = document.getElementById('access_key');
        const originalBtnLabel = submitBtn ? submitBtn.value : '';

        const setStatus = (type, text) => {
            if (!statusBox) return;
            statusBox.className = 'form-status' + (type ? ' ' + type : '');
            statusBox.textContent = text;
        };

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Honeypot terisi berarti bot, bukan manusia. Diamkan tanpa kirim.
            const honeypot = document.getElementById('botcheck');
            if (honeypot && honeypot.value) return;

            // Access key belum diganti dengan UUID asli dari web3forms.com
            if (accessKeyField && accessKeyField.value.startsWith('00000000')) {
                setStatus('error', 'Form belum dikonfigurasi. Ganti access_key di index.html dengan UUID dari web3forms.com.');
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                setStatus('error', 'Mohon lengkapi semua field yang wajib diisi.');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                setStatus('error', 'Mohon masukkan alamat email yang valid!');
                return;
            }

            // Kunci tombol agar tidak terkirim dua kali
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.value = 'Mengirim...';
            }
            setStatus('', 'Mengirim pesan Anda, mohon tunggu sebentar...');

            try {
                const payload = Object.fromEntries(new FormData(contactForm).entries());
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                // Web3Forms membungkus pesan di dalam result.body.message
                const apiMessage = (result && result.body && result.body.message) || '';

                if (result.success) {
                    setStatus('success', 'Pesan Anda telah berhasil dikirim! Saya akan menghubungi Anda segera.');
                    contactForm.reset();
                } else {
                    setStatus('error', 'Gagal mengirim: ' + (apiMessage || 'terjadi kesalahan, coba lagi.'));
                }
            } catch (err) {
                // fetch gagal (CORS / offline / Cloudflare challenge).
                // Fallback ke submit native: browser melakukan navigasi sungguhan,
                // jadi form tetap terkirim walau AJAX ditolak.
                console.warn('AJAX submit gagal, jatuh ke submit native:', err);
                setStatus('', 'Mengirim pesan Anda, mohon tunggu sebentar...');
                contactForm.submit();
                return;
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.value = originalBtnLabel;
                }
            }
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const elementsToAnimate = document.querySelectorAll(
        '.service-box, .skill-category, .education-item, .experience-item, .info-item, .testimonial-card, .blog-card'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.footer-iconTop a');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add animation classes for CSS animations
    const animatedElements = document.querySelectorAll(
        '.home-content, .home-img, .about-content, .service-box, .skill-category'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// Initialize animations on window load
window.addEventListener('load', () => {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');

    // Hide preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close navbar on desktop if it's open
    if (window.innerWidth > 995 && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }
});

// Optional: Add CSS for animation classes
// This could also be added to your CSS file
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loaded .home-content,
    .loaded .home-img {
        animation-play-state: running;
    }
`;
document.head.appendChild(style);

// CV Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode yang sudah ada sebelumnya) ...
    
    // CV Modal Functionality
    const downloadCVBtn = document.querySelector('.download-cv');
    const cvModal = document.getElementById('cv-modal');
    const closeCvModal = document.querySelector('.close-cv-modal');
    const closeCvBtn = document.querySelector('.close-cv-btn');
    const downloadCvBtn = document.querySelector('.download-cv-btn');
    
    // Open CV Modal when download button is clicked
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show CV modal
            cvModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animate skill bars
            setTimeout(() => {
                document.querySelectorAll('.skill-bar').forEach(bar => {
                    const target = bar.style.width;
                    if (!target) return;
                    bar.style.width = '0';
                    // Paksa reflow agar transisi_width dijalankan ulang dari 0
                    void bar.offsetWidth;
                    bar.style.width = target;
                });
            }, 300);
        });
    }
    
    // Close CV Modal functions
    function closeCVModal() {
        cvModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeCvModal) {
        closeCvModal.addEventListener('click', closeCVModal);
    }
    
    if (closeCvBtn) {
        closeCvBtn.addEventListener('click', closeCVModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            closeCVModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.style.display === 'flex') {
            closeCVModal();
        }
    });
    
    // Download CV directly (alternative)
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            // Don't prevent default - let the download happen
            // Close modal after download starts
            setTimeout(() => {
                closeCVModal();
            }, 1000);
        });
    }
    
});
// ================================================================
// Blog Carousel
// ================================================================
(function () {
    'use strict';

    const track = document.querySelector('.blog-track');
    const prevBtn = document.querySelector('.blog-carousel-prev');
    const nextBtn = document.querySelector('.blog-carousel-next');
    const dotsContainer = document.querySelector('.blog-carousel-dots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.blog-card');
    let currentIndex = 0;

    function getVisibleCount() {
        const width = window.innerWidth;
        if (width <= 600) return 1;
        if (width <= 991) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    function updateCarousel() {
        const maxIndex = getMaxIndex();
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const card = cards[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.blog-carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const maxIndex = getMaxIndex();
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = 'blog-carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ke artikel ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }

    prevBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop ke artikel terakhir
        }
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop ke artikel pertama
        }
        updateCarousel();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const maxIndex = getMaxIndex();
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe kiri → next (loop)
                currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
            } else {
                // Swipe kanan → prev (loop)
                currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
            }
            updateCarousel();
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        createDots();
        updateCarousel();
    });

    createDots();
    updateCarousel();
})();

// ================================================================
// Advanced Enhancements (scroll progress + mouse spotlight)
// Sengaja ditulis sebagai IIFE terpisah: tidak menambah listener
// DOMContentLoaded ke-3 dan tidak menyentuh blok serviceData.
// ================================================================
(function () {
    'use strict';

    // --- Scroll Progress Bar ---
    const progressBar = document.querySelector('.scroll-progress');

    if (progressBar) {
        const updateProgress = () => {
            const doc = document.documentElement;
            const scrollTop = window.scrollY || doc.scrollTop;
            const scrollable = doc.scrollHeight - window.innerHeight;
            const percent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
            progressBar.style.width = Math.min(100, Math.max(0, percent)) + '%';
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        updateProgress();
    }

    // --- Spotlight yang mengikuti mouse pada kartu ---
    // Hanya mengubah custom property --mx/--my, bukan transform,
    // supaya tidak bentrok dengan animasi .animate dari IntersectionObserver.
    const spotlightCards = document.querySelectorAll(
        '.service-box, .experience-item, .education-item, .skill-category, .info-item'
    );

    spotlightCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
            card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
        });
    });
})();
