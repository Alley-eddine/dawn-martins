import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useInitScripts from '../hooks/useInitScripts';
import './Collections.css';

const collectionsData = [
  {
    id: 'meteore',
    title: 'Meteore',
    subtitle: 'Collection 2024',
    image: '/images/reportage_meteore/HOME1.JPG',
    category: 'photo',
  },
  {
    id: 'reminescence',
    title: 'Reminescence',
    subtitle: 'Collection 2024',
    image: '/images/reminescence/_DSC6353.JPG',
    category: 'photo',
  },
  {
    id: 'placidite',
    title: 'Placidite',
    subtitle: 'Collection 2024',
    image: '/images/placidite/202505_dawn-11.JPG',
    category: 'photo',
  },
  {
    id: 'contraste',
    title: 'Contraste & Mouvement',
    subtitle: 'Collection 2024',
    image: '/images/contraste_mouvement/2401_dawn_drapé02014.jpg',
    category: 'photo',
  },
  {
    id: 'collab',
    title: 'Collaborations',
    subtitle: 'Projets collaboratifs',
    image: '/images/collab/homecollab1.JPG',
    category: 'photo',
  },
];

export default function Collections() {
  useInitScripts();
  const [filter, setFilter] = useState('all');

  const filteredCollections = filter === 'all'
    ? collectionsData
    : collectionsData.filter(c => c.category === filter);

  return (
    <div className="w-100">
      <Helmet>
        <title>Collections - Dawn Martins</title>
        <meta name="description" content="Explorez les collections de Dawn Martins: Meteore, Reminescence, Placidite, Contraste & Mouvement et collaborations." />
      </Helmet>

      <Header />

      {/* Title section */}
      <section className="wow animate__fadeIn collections-page-title">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center margin-50px-bottom sm-margin-30px-bottom">
              <h4 className="alt-font text-extra-dark-gray font-weight-600">Collections</h4>
              <p className="text-medium-gray">Explorez mes differentes collections et collaborations</p>
            </div>
          </div>

          {/* Filter bar */}
          <div className="row justify-content-center margin-30px-bottom">
            <div className="col-auto">
              <div className="collections-filter">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Tout
                </button>
                <button
                  className={`filter-btn ${filter === 'photo' ? 'active' : ''}`}
                  onClick={() => setFilter('photo')}
                >
                  Photo
                </button>
                <button
                  className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
                  onClick={() => setFilter('video')}
                >
                  Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="p-0 wow animate__fadeIn">
        <div className="container">
          <div className="collections-grid">
            {filteredCollections.map((collection, index) => (
              <Link
                to={`/collection/${collection.id}`}
                key={collection.id}
                className={`collection-card ${index % 3 === 0 ? 'tall' : ''}`}
              >
                <div className="collection-image">
                  <picture>
                    <source srcSet={collection.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                    <img src={collection.image} alt={collection.title} loading="lazy" />
                  </picture>
                </div>
                <div className="collection-overlay">
                  <div className="collection-info">
                    <h5 className="collection-title">{collection.title}</h5>
                    <span className="collection-subtitle">{collection.subtitle}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
