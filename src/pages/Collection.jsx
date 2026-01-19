import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import useInitScripts from '../hooks/useInitScripts';

export default function Collection() {
  useInitScripts();
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content/collections.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.collections.find(c => c.id === slug);
        setCollection(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Erreur chargement collection:', err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="w-100 collection-page">
        <Header isCollectionPage={true} />
        <section className="wow animate__fadeIn" style={{ paddingTop: '100px', minHeight: '50vh' }}>
          <div className="container text-center">
            <p>Chargement...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="w-100 collection-page">
        <Header isCollectionPage={true} />
        <section className="wow animate__fadeIn" style={{ paddingTop: '100px' }}>
          <div className="container text-center">
            <h2>Collection non trouvee</h2>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-100 collection-page">
      <main>
      <Helmet>
        <title>{collection.title} - Dawn Martins</title>
        <meta name="description" content={collection.description} />
      </Helmet>

      <Header isCollectionPage={true} />

      {/* Hero section avec image et description */}
      <section className="wow animate__fadeIn" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Image */}
            <div className="col-lg-5 col-md-6 text-center md-margin-50px-bottom wow animate__fadeInLeft">
              <picture>
                <source srcSet={collection.heroImage?.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                <img
                  src={collection.heroImage || collection.image}
                  alt={collection.title}
                  className="w-100"
                  style={{ maxHeight: '600px', objectFit: 'cover' }}
                  width="600"
                  height="800"
                />
              </picture>
            </div>
            {/* Texte */}
            <div className="col-lg-6 offset-lg-1 col-md-6 wow animate__fadeInRight">
              <span className="text-extra-small alt-font letter-spacing-2 text-uppercase margin-15px-bottom d-inline-block text-medium-gray">
                {collection.subtitle}
              </span>
              <h2 className="alt-font text-extra-dark-gray font-weight-600 margin-25px-bottom">
                {collection.title}
              </h2>
              <p className="text-medium line-height-28 margin-30px-bottom text-medium-gray">
                {collection.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery photos={collection.photos} withLinks={false} />

      </main>
      <Footer />
    </div>
  );
}
