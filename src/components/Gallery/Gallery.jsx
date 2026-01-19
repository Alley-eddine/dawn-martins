import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Gallery({ jsonPath, photos, withLinks = false }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Si photos est fourni directement, l'utiliser
    if (photos && photos.length > 0) {
      setImages(photos.map(p => typeof p === 'string' ? { image: p } : p));
      return;
    }
    // Sinon charger depuis jsonPath
    if (jsonPath) {
      fetch(jsonPath)
        .then((res) => res.json())
        .then((data) => {
          setImages(data.images || []);
        })
        .catch((err) => console.log('Erreur chargement images:', err));
    }
  }, [jsonPath, photos]);

  useEffect(() => {
    if (images.length > 0 && typeof window.jQuery !== 'undefined') {
      const $ = window.jQuery;

      // Reinitialiser la galerie justified
      setTimeout(() => {
        if ($.fn.justifiedGallery) {
          $('#gallery-container').justifiedGallery({
            rowHeight: 400,
            maxRowHeight: false,
            captions: false,
            margins: 10,
            waitThumbnailsLoad: true,
          });
        }

        // Reinitialiser le lightbox pour navigation entre photos
        if ($.fn.magnificPopup && !withLinks) {
          $('.lightbox-portfolio').magnificPopup({
            delegate: 'a[data-group="lightbox-gallery"]',
            type: 'image',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1],
            },
            image: {
              cursor: 'mfp-zoom-out-cur',
            },
            mainClass: 'mfp-with-zoom',
          });
        }
      }, 100);
    }
  }, [images, withLinks]);

  return (
    <section className="wow animate__fadeIn p-0">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 lightbox-portfolio p-0">
            <div id="gallery-container" className="justified-gallery">
              {images.map((item, index) => {
                const imgSrc = item.image || item.photo || item;
                const link = item.link || '#';
                const delay = index % 3 === 1 ? '0.2s' : index % 3 === 2 ? '0.4s' : undefined;

                return (
                  <div
                    key={index}
                    className="wow animate__fadeInUp"
                    data-wow-delay={delay}
                  >
                    {withLinks && link !== '#' ? (
                      <Link to={link} aria-label={item.title || 'Voir la collection'}>
                        <picture>
                          <source srcSet={imgSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                          <img src={imgSrc} alt={item.title ? `${item.title} - Dawn Martins` : 'Creation Dawn Martins'} width="800" height="600" />
                        </picture>
                      </Link>
                    ) : (
                      <a href={imgSrc} data-group="lightbox-gallery" aria-label="Voir l'image en grand">
                        <picture>
                          <source srcSet={imgSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                          <img src={imgSrc} alt={item.title ? `${item.title} - Dawn Martins` : 'Creation Dawn Martins'} width="800" height="600" />
                        </picture>
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
