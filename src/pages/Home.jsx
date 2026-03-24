import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import useInitScripts from '../hooks/useInitScripts';
import { getHomepage } from '../services/cms';

export default function Home() {
  useInitScripts();
  const [data, setData] = useState(null);

  useEffect(() => {
    getHomepage()
      .then((json) => setData(json))
      .catch((err) => console.log('Error loading homepage:', err));
  }, []);

  if (!data) {
    return (
      <div className="w-100">
        <Header transparent={true} />
        <div style={{ minHeight: '100vh' }}></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-100">
      <main>
      <Helmet>
        <title>Dawn Martins - Fashion Designer</title>
        <meta name="description" content="Dawn Martins, young Parisian fashion designer. Discover my fashion collections: Meteore, Reminescence, Placidite and collaborations." />
      </Helmet>

      <Header transparent={true} />

      {/* Hero section */}
      <section
        className="wow animate__fadeIn p-0 position-relative parallax sm-background-image-center"
        data-parallax-background-ratio="0.5"
        style={{ backgroundImage: `url('${data.hero.backgroundImage}')` }}
      >
        <div className="container position-relative one-fourth-screen">
          <div className="row h-100 align-items-center">
            <div className="col-xl-7 col-lg-8 col-sm-10 mx-auto text-center">
              <span className="text-extra-small alt-font letter-spacing-2 text-uppercase margin-20px-bottom d-inline-block text-medium-gray">
                {data.hero.subtitle}
              </span>
              <h2 className="font-weight-600 alt-font margin-40px-bottom md-margin-20px-bottom text-white letter-spacing-minus-1">
                {data.hero.title}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="big-section wow animate__fadeIn bg-black" id="about">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-5 col-lg-8 col-sm-10 mx-auto text-center">
              <div className="alt-font margin-20px-bottom md-margin-20px-bottom text-uppercase text-extra-small letter-spacing-2">
                {data.about.subtitle}
              </div>
              <h4 className="alt-font font-weight-600 text-white-2 mb-0">
                {data.about.title}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery photos={data.gallery} withLinks={true} />

      {/* Blog section */}
      {data.articles && data.articles.length > 0 && (
        <section className="wow animate__fadeIn">
          <div className="container">
            <div className="row">
              {data.articles.map((article, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12 margin-30px-bottom wow animate__fadeInUp" data-wow-delay={index % 2 === 1 ? '0.2s' : undefined}>
                  <div className="blog-post blog-post-style2">
                    <div className="post-details">
                      <span className="text-extra-small text-medium-gray text-uppercase d-block margin-10px-bottom">
                        {article.date}
                      </span>
                      <span className="text-large alt-font margin-15px-bottom d-block">
                        {article.link ? (
                          <a href={article.link} className="text-extra-dark-gray" target="_blank" rel="noreferrer">
                            {article.title}
                          </a>
                        ) : (
                          <span className="text-extra-dark-gray">{article.title}</span>
                        )}
                      </span>
                      <p>{article.description}</p>
                      <div className="margin-20px-top border-top border-color-extra-light-gray padding-25px-top">
                        <span className="text-medium-gray text-uppercase text-extra-small">
                          by{' '}
                          {article.link ? (
                            <a href={article.link} className="text-medium-gray" target="_blank" rel="noreferrer">
                              {article.author}
                            </a>
                          ) : (
                            <span className="text-medium-gray">{article.author}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      </main>
      <Footer />
    </div>
  );
}
