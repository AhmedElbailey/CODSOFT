///////////////////////////////////////////////////////////
// Make Mobile Navigation Work
const headerEl = document.querySelector('.header');
const btnMobileNav = document.querySelector('.mobile-nav-btn');
const htmlEl = document.querySelector('html');

btnMobileNav.addEventListener('click', e => {
  headerEl.classList.toggle('open-nav');
  htmlEl.classList.toggle('stop-scroll');
});

////////////////////////////////////////
// Smooth scrolling Animation

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to Top
    if (href === '#') {
      console.log(link);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    // Scroll up and down
    if (href != '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    //Make mob. nav. disappear after selecting
    if (link.classList.contains('nav-link')) {
      headerEl.classList.remove('open-nav');
      htmlEl.classList.remove('stop-scroll');
    }
  });
});

///////////////////////////////////////////////////////////
// Applying Sticky Navigation
const sectionHeroEl = document.querySelector('.hero-section');
const btnUp = document.querySelector('.up-btn');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
      btnUp.classList.add('show');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
      btnUp.classList.remove('show');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();
