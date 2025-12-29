    // Simple navigation and animations
    const links = document.querySelectorAll('[data-link]');
    links.forEach(a=>a.addEventListener('click', e=>{
      e.preventDefault();
      const href = a.getAttribute('href') || a.dataset.href;
      if(href && href.startsWith('#')){
        document.querySelectorAll('nav a').forEach(x=>x.classList.remove('active'));
        document.querySelector('[href="'+href+'"]').classList.add('active');
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',href);
      } else if(href){ window.open(href,'_blank') }
    }))

    function scrollToSection(id){ document.getElementById(id).scrollIntoView({behavior:'smooth'}); }

    // Order button: open Instagram DMs prefilled with product name (user completes message)
    function orderNow(productName){
      const insta = 'https://www.instagram.com/luv20_xoxo';
      // Try to open direct message via instagram.com (mobile will open app)
      // We pre-fill a message for convenience using web intent on wa.me is not available for IG,
      // so open profile where user can DM.
      const txt = encodeURIComponent(`Hi LUV,20! I'm interested in the ${productName}. Could you please share price & availability? 🎀`);
      // Instagram does not support prefilled DM via web reliably — open profile and show an alert with message text to copy.
      const openProfile = confirm('You will be taken to our Instagram profile to DM us. Press OK to continue.');
      if(openProfile){
        window.open(insta,'_blank');
        // Show fallback: copy message to clipboard
        try{
          navigator.clipboard.writeText(txt).then(()=>{
            alert('A message template has been copied to your clipboard. Paste it in our Instagram DM to order.');
          });
        }catch(e){
          alert('Open our Instagram and send this message: "'+decodeURIComponent(txt)+'"');
        }
      }
    }

    // Reveal animations on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {threshold:0.15, rootMargin:'0px 0px -30px 0px'};
    const appearOnScroll = new IntersectionObserver(function(entries, observer){
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.style.animationDelay = (Math.random()*300)+'ms';
        entry.target.classList.add('visible');
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader=>{ appearOnScroll.observe(fader); });


