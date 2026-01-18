import { useEffect } from 'react';

export default function useInitScripts() {
  useEffect(() => {
    // Reinitialiser hamburger menu
    const initHamburgerMenu = () => {
      const bodyEl = document.body;
      const openbtn = document.getElementById('open-button');
      const closebtn = document.getElementById('close-button');
      let isOpen = false;

      const toggleMenu = () => {
        if (isOpen) {
          bodyEl.classList.remove('show-menu', 'overflow-hidden', 'position-fixed');
        } else {
          bodyEl.classList.add('show-menu', 'overflow-hidden', 'position-fixed');
        }
        isOpen = !isOpen;
      };

      if (openbtn) {
        // Enlever les anciens listeners
        const newOpenbtn = openbtn.cloneNode(true);
        openbtn.parentNode.replaceChild(newOpenbtn, openbtn);
        newOpenbtn.addEventListener('click', toggleMenu);
      }

      if (closebtn) {
        const newClosebtn = closebtn.cloneNode(true);
        closebtn.parentNode.replaceChild(newClosebtn, closebtn);
        newClosebtn.addEventListener('click', toggleMenu);
      }
    };

    // Reinitialiser WOW animations
    const initWow = () => {
      if (typeof window.WOW !== 'undefined') {
        new window.WOW().init();
      }
    };

    // Reinitialiser justified gallery
    const initGallery = () => {
      if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.justifiedGallery) {
        const $ = window.jQuery;
        setTimeout(() => {
          $('#gallery-container').justifiedGallery({
            rowHeight: 400,
            maxRowHeight: false,
            captions: false,
            margins: 10,
            waitThumbnailsLoad: true,
          });
        }, 100);
      }
    };

    // Reinitialiser lightbox
    const initLightbox = () => {
      if (typeof window.jQuery !== 'undefined' && window.jQuery.fn.magnificPopup) {
        const $ = window.jQuery;
        setTimeout(() => {
          $('.lightbox-portfolio').magnificPopup({
            delegate: 'a[data-group="lightbox-gallery"]',
            type: 'image',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1],
            },
          });
        }, 200);
      }
    };

    // Fermer le menu si ouvert lors du changement de page
    document.body.classList.remove('show-menu', 'overflow-hidden', 'position-fixed');

    initHamburgerMenu();
    initWow();
    initGallery();
    initLightbox();

  }, []);
}
