import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useInitScripts from '../hooks/useInitScripts';
import './Collections.css';

export default function Collections() {
  useInitScripts();
  const [filter, setFilter] = useState('all');
  const [collections, setCollections] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch('/content/collections.json')
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.collections || []);
        // Extraire les années uniques
        const uniqueYears = [...new Set(data.collections.map(c => c.year))].sort().reverse();
        setYears(uniqueYears);
      })
      .catch((err) => console.log('Erreur chargement collections:', err));
  }, []);

  const filteredCollections = filter === 'all'
    ? collections
    : collections.filter(c => c.year === filter);

  return (
    <div className="w-100">
      <main>
      <Helmet>
        <title>Projects - Dawn Martins</title>
        <meta name="description" content="Explore Dawn Martins' projects: Meteore, Reminescence, Placidite, Contrast & Movement and collaborations." />
      </Helmet>

      <Header />

      {/* Title section */}
      <section className="wow animate__fadeIn collections-page-title">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center margin-50px-bottom sm-margin-30px-bottom">
              <h4 className="alt-font text-extra-dark-gray font-weight-600">Projects</h4>
              <p className="text-medium-gray">Explore my different collections and collaborations</p>
            </div>
          </div>

          {/* Filter bar par année */}
          <div className="row justify-content-center margin-30px-bottom">
            <div className="col-auto">
              <div className="collections-filter">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    className={`filter-btn ${filter === year ? 'active' : ''}`}
                    onClick={() => setFilter(year)}
                  >
                    {year}
                  </button>
                ))}
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
                    <img src={collection.image} alt={`${collection.title} by Dawn Martins`} loading="lazy" width="600" height="800" />
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

      </main>
      <Footer />
    </div>
  );
}
