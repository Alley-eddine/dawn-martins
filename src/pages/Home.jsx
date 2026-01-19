import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import useInitScripts from '../hooks/useInitScripts';

export default function Home() {
  useInitScripts();

  return (
    <div className="w-100">
      <Helmet>
        <title>Dawn Martins - Styliste et Designer de Mode</title>
        <meta name="description" content="Dawn Martins, jeune styliste parisienne. Decouvrez mes collections de mode: Meteore, Reminescence, Placidite et collaborations." />
      </Helmet>

      <Header transparent={true} />

      {/* Hero section */}
      <section
        className="wow animate__fadeIn p-0 position-relative parallax sm-background-image-center"
        data-parallax-background-ratio="0.5"
        style={{ backgroundImage: "url('/images/reportage_meteore/homebanniere.webp'), url('/images/reportage_meteore/homebanniere.JPG')" }}
      >
        <div className="container position-relative one-fourth-screen">
          <div className="row h-100 align-items-center">
            <div className="col-xl-7 col-lg-8 col-sm-10 mx-auto text-center">
              <span className="text-extra-small alt-font letter-spacing-2 text-uppercase margin-20px-bottom d-inline-block text-medium-gray">
                Work hard, play hard
              </span>
              <h2 className="font-weight-600 alt-font margin-40px-bottom md-margin-20px-bottom text-white letter-spacing-minus-1">
                Des creations imaginees par DAWN.
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
                Voila qui je suis
              </div>
              <h4 className="alt-font font-weight-600 text-white-2 mb-0">
                Des creations qui ressemblent a votre personnalite.
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery jsonPath="/content/homepage.json" withLinks={true} />

      {/* Blog section */}
      <section className="wow animate__fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-12 blog-content">
              <ul className="blog-simple blog-wrapper grid grid-loading grid-4col xl-grid-4col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large">
                <li className="grid-sizer"></li>

                {/* Blog post 1 */}
                <li className="grid-item wow animate__fadeInUp" data-wow-delay="0.2s">
                  <div className="blog-post blog-post-style2 lg-margin-50px-bottom md-margin-30px-bottom xs-margin-15px-bottom">
                    <div className="post-details">
                      <span className="text-extra-small text-medium-gray text-uppercase d-block margin-10px-bottom md-margin-5px-bottom">
                        11 Octobre 2024
                      </span>
                      <span className="text-large alt-font w-85 lg-w-95 margin-15px-bottom d-block">
                        <a href="#" className="text-extra-dark-gray">
                          Etudiante en 1ere annee de Bachelor, Dawn organise son propre defile de mode
                        </a>
                      </span>
                      <p className="w-90 sm-margin-15px-bottom sm-w-100">
                        Entree a Lisaa Mode Paris en septembre 2023, filiere Fashion Design, Dawn Martins s'est illustree des sa premiere annee avec un projet personnel ambitieux...
                      </p>
                      <div className="margin-20px-top author border-top border-color-extra-light-gray padding-25px-top sm-padding-15px-top sm-no-margin-top">
                        <span className="text-medium-gray text-uppercase text-extra-small padding-15px-left">
                          by <a href="#" className="text-medium-gray">Lisaa Mode Paris</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Blog post 2 */}
                <li className="grid-item wow animate__fadeInUp">
                  <div className="blog-post blog-post-style2 lg-margin-50px-bottom md-margin-30px-bottom xs-margin-15px-bottom">
                    <div className="post-details">
                      <span className="text-extra-small text-medium-gray text-uppercase d-block margin-10px-bottom md-margin-5px-bottom">
                        21 Juillet 2025
                      </span>
                      <span className="text-large alt-font w-85 lg-w-95 sm-w-100 margin-15px-bottom d-block">
                        <a
                          href="https://www.hauts-de-seine.fr/toutes-les-actualites/detail/revele-ton-talent-dawn-martins-au-domaine-de-sceaux"
                          className="text-extra-dark-gray"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Dawn Martins, jeune styliste audacieuse, revele son talent.
                        </a>
                      </span>
                      <p className="w-90 sm-margin-15px-bottom sm-w-100">
                        Decouvrez l'article redige par le departement des Hauts-de-Seine.
                      </p>
                      <div className="margin-25px-top author border-top border-color-extra-light-gray padding-25px-top sm-padding-15px-top sm-no-margin-top">
                        <span className="text-medium-gray text-uppercase text-extra-small padding-15px-left">
                          by{' '}
                          <a
                            href="https://www.hauts-de-seine.fr/toutes-les-actualites/detail/revele-ton-talent-dawn-martins-au-domaine-de-sceaux"
                            className="text-medium-gray"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Hauts-de-Seine
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
