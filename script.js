document.addEventListener('DOMContentLoaded', () => {

    // Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20));

    // Mobile menu
    const toggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('navLinks');
    if (toggle) {
        toggle.addEventListener('click', () => nav.classList.toggle('active'));
        nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => nav.classList.remove('active')));
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 78, behavior: 'smooth' });
        });
    });

    // Scroll reveal
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0 });

    ['.hero-content','.hero-visual','.section-intro','.map-layout','.coverage-bar',
     '.service-card','.step','.review','.cta-inner','.contact-info','.contact-form','.footer-brand'
    ].forEach(sel => {
        const groups = {};
        document.querySelectorAll(sel).forEach(el => {
            const s = el.closest('section') || el.parentElement;
            const k = s ? (s.id || s.className.slice(0, 15)) : 'x';
            if (!groups[k]) groups[k] = [];
            groups[k].push(el);
        });
        Object.values(groups).forEach(g => g.forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${(i % 4) * .08}s`;
            obs.observe(el);
        }));
    });

    // ========= INTERACTIVE MAP =========
    const data = {
        VIC: { name:'Victoria', props:[
            {loc:'Clyde North',price:'$485,000',b:3,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80'},
            {loc:'Truganina',price:'$439,600',b:3,ba:2,c:1,type:'First Home',img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80'},
            {loc:'Tarneit',price:'$520,000',b:4,ba:2,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'}
        ]},
        NSW: { name:'New South Wales', props:[
            {loc:'Oran Park',price:'$650,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'},
            {loc:'Box Hill',price:'$580,000',b:3,ba:2,c:1,type:'First Home',img:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=80'},
            {loc:'Marsden Park',price:'$720,000',b:4,ba:2,c:2,type:'NDIS',img:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80'}
        ]},
        QLD: { name:'Queensland', props:[
            {loc:'Springfield',price:'$510,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=400&q=80'},
            {loc:'Ripley',price:'$445,000',b:3,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&q=80'},
            {loc:'Coomera',price:'$620,000',b:4,ba:3,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80'}
        ]},
        SA: { name:'South Australia', props:[
            {loc:'Mount Barker',price:'$420,000',b:3,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=400&q=80'},
            {loc:'Seaford Heights',price:'$465,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80'},
            {loc:'Munno Para',price:'$550,000',b:4,ba:2,c:2,type:'NDIS',img:'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80'}
        ]},
        WA: { name:'Western Australia', props:[
            {loc:'Baldivis',price:'$380,000',b:3,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80'},
            {loc:'Wellard',price:'$420,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80'},
            {loc:'Piara Waters',price:'$540,000',b:4,ba:2,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80'}
        ]},
        TAS: { name:'Tasmania', props:[
            {loc:'Kingston',price:'$395,000',b:3,ba:1,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&q=80'},
            {loc:'Brighton',price:'$360,000',b:3,ba:2,c:1,type:'First Home',img:'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=400&q=80'},
            {loc:'Sorell',price:'$480,000',b:4,ba:2,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=80'}
        ]},
        NT: { name:'Northern Territory', props:[
            {loc:'Palmerston',price:'$420,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=400&q=80'},
            {loc:'Zuccoli',price:'$480,000',b:4,ba:2,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80'},
            {loc:'Muirhead',price:'$550,000',b:4,ba:2,c:2,type:'NDIS',img:'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80'}
        ]},
        ACT: { name:'ACT', props:[
            {loc:'Whitlam',price:'$580,000',b:3,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80'},
            {loc:'Taylor',price:'$620,000',b:4,ba:2,c:2,type:'First Home',img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'},
            {loc:'Denman Prospect',price:'$750,000',b:4,ba:3,c:2,type:'Investment',img:'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80'}
        ]}
    };

    const icons = {
        bed:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 7v10M3 11h18M21 7v10M7 11V7h10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        bath:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
        car:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 17h14M5 17a2 2 0 01-2-2v-3l2-5h14l2 5v3a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    const badges = {'First Home':'badge-first-home','Investment':'badge-investment','NDIS':'badge-ndis'};

    function render(code) {
        const d = data[code]; if (!d) return;
        const cards = document.getElementById('propertyCards');
        const title = document.getElementById('stateTitle');
        const count = document.getElementById('stateCount');
        const cta = document.getElementById('stateCtaBtn');

        cards.classList.add('fade-out');
        cards.classList.remove('fade-in-cards');
        setTimeout(() => {
            title.textContent = d.name;
            count.textContent = d.props.length + ' properties';
            cta.textContent = 'Enquire about ' + d.name;
            cards.innerHTML = d.props.map(p => `
                <div class="property-card">
                    <img class="property-card-img" src="${p.img}" alt="${p.loc}" loading="lazy">
                    <div class="property-card-info">
                        <span class="property-card-badge ${badges[p.type]||''}">${p.type}</span>
                        <div class="property-card-location">${p.loc}</div>
                        <div class="property-card-price">${p.price}</div>
                        <div class="property-card-specs">
                            <span>${icons.bed} ${p.b}</span>
                            <span>${icons.bath} ${p.ba}</span>
                            <span>${icons.car} ${p.c}</span>
                        </div>
                    </div>
                </div>`).join('');
            cards.classList.remove('fade-out');
            cards.classList.add('fade-in-cards');
        }, 180);
    }

    function activate(code) {
        document.querySelectorAll('.map-state').forEach(e => e.classList.remove('active'));
        document.querySelectorAll('.map-label').forEach(e => e.classList.remove('label-active'));
        const el = document.getElementById('state-' + code);
        if (el) el.classList.add('active');
        document.querySelectorAll(`.map-label[data-state="${code}"]`).forEach(e => e.classList.add('label-active'));
        render(code);
    }

    document.querySelectorAll('.map-state,.map-label').forEach(el => {
        el.style.cursor = 'pointer';
        el.style.pointerEvents = 'auto';
        el.addEventListener('click', e => {
            const s = e.target.dataset.state || e.target.getAttribute('data-state');
            if (s) activate(s);
        });
    });

    activate('VIC');

    // Form
    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.textContent = 'Sending...'; btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Sent!'; btn.style.background = '#2D5E4A'; btn.style.borderColor = '#2D5E4A';
            setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; btn.style.borderColor = ''; form.reset(); }, 2500);
        }, 1200);
    });
});
