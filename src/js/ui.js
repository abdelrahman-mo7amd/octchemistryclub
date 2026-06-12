const nav = document.getElementById('nav');
const scrollToTop = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 50);
    scrollToTop.toggle('show', window.scrollY > 400)
});

function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

document.querySelectorAll('a[href^="#"]').forEach(a=> {
    a.addEventListener('click', e=> {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior:'smooth' });
            const mob = document.getElementById('mobileMenu');
            if (mob.classList.contains('open')) {
                toggleMenu();
            }
        }
    });
})

const io = new IntersectionObserver(entries => {
    entries.forEach(e=> {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.paperBar').forEach(b => {
                setTimeout(() => b.style.width = b.dataset.w, 300);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.papers-card').forEach(el => barIO.observe(el));

function animCount(el, target, suffix, ms = 1600) {
    let v = 0;
    const step = target / (ms/16);
    const t = setInterval(() => {
        v += step;
        if (v >= target) {
            v = target;
            clearInterval(t);
        }
        el.textContent = Math.floor(v) + suffix;
    }, 16);
}

let counted = false;
const heroIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting && !counted) {
            counted = true;
            setTimeout(() => {
                animCount(document.getElementById('s-members'), 120, '+');
                animCount(document.getElementById('s-year'), 3, 'rd');
                animCount(document.getElementById('s-awards'), 28, '+');
            }, 600);
        }
    });
}, { threshold: 0.5 });

const heroEl = document.getElementById('hero');
if (heroEl) {
    heroIO.observe(heroEl);
}

function tick() {
    const target = new Date('2026-07-06T09:00:00').getTime();
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-d').textContent = pad(Math.floor(diff/86400000));
    document.getElementById('cd-h').textContent = pad(Math.floor((diff%86400000)/ 3600000));
    document.getElementById('cd-m').textContent = pad(Math.floor((diff%3600000) / 60000));
    document.getElementById('cd-s').textContent = pad(Math.floor((diff%60000)/ 1000));
}

tick();
setInterval(tick, 1000);

function switchTab(btn) {
    document.querySelectorAll('.form-tab').forEach(t=> t.classList.remove('active'));
    document.querySelectorAll('.formPanel').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    const target = btn.dataset.target;
    const panel = document.getElementById(target);
    if (panel) {
        panel.style.display = 'block';
    }
}

function openTrackModal(trackKey) {
    const overlay = document.getElementById('trackOverlay');
    const contents = document.querySelectorAll('.trackModalContent');

    contents.forEach(c => c.classList.remove('active'));
    const target = document.querySelector(`.trackModalContent[data-track="${trackKey}"]`)
    if (target) {
        target.classList.add('active');
    }

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeTrackModal(event) {
    const overlay = document.getElementById('trackOverlay');
    const modal = document.getElementById('trackModal');

    if (event.target.id === 'trackOverlay' || event.target.closest('.trackModalClose') || event.target.closest('.btn-primary')) {
        overlay.classList.remove('show');
        document.body.style.overflow='';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('trackOverlay').classList.remove('show');
        document.body.style.overflow ='';
    }
});

