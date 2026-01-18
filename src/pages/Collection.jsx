import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import useInitScripts from '../hooks/useInitScripts';

const collectionsData = {
  meteore: {
    title: 'Meteore',
    jsonPath: '/content/meteore.json',
  },
  reminescence: {
    title: 'Reminescence',
    jsonPath: '/content/reminescence.json',
  },
  placidite: {
    title: 'Placidite',
    jsonPath: '/content/placidite.json',
  },
  contraste: {
    title: 'Contraste & Mouvement',
    jsonPath: '/content/contraste.json',
  },
  collab: {
    title: 'Collaborations',
    jsonPath: '/content/collab.json',
  },
};

export default function Collection() {
  useInitScripts();
  const { slug } = useParams();
  const collection = collectionsData[slug];

  if (!collection) {
    return (
      <div className="w-100 collection-page">
        <Header isCollectionPage={true} />
        <section className="wow animate__fadeIn">
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
      <Header isCollectionPage={true} />

      {/* Title section */}
      <section className="wow animate__fadeIn gallery-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center margin-50px-bottom sm-margin-30px-bottom">
              <h4 className="alt-font text-extra-dark-gray font-weight-600">{collection.title}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery jsonPath={collection.jsonPath} withLinks={false} />

      <Footer />
    </div>
  );
}
