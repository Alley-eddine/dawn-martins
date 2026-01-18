import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useInitScripts from '../hooks/useInitScripts';

export default function About() {
  useInitScripts();

  return (
    <div className="w-100">
      <Helmet>
        <title>A propos - Dawn Martins</title>
        <meta name="description" content="Decouvrez Dawn Martins, jeune styliste parisienne etudiante en Bachelor Fashion Design a Lisaa Mode Paris. Contact et parcours." />
      </Helmet>

      <Header />

      {/* About section */}
      <section className="wow animate__fadeIn">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6 text-center md-margin-50px-bottom wow animate__fadeInLeft">
              <picture>
                <source srcSet="/images/reportage_meteore/HOME1.webp" type="image/webp" />
                <img src="/images/reportage_meteore/HOME1.JPG" alt="Dawn Martins" className="w-100" loading="lazy" />
              </picture>
            </div>
            <div className="col-lg-6 offset-lg-1 col-md-6 wow animate__fadeInRight">
              <h5 className="alt-font text-extra-dark-gray font-weight-600 margin-20px-bottom">
                Dawn Martins
              </h5>
              <p className="text-medium line-height-28 margin-30px-bottom">
                Etudiante en Bachelor Fashion Design a Lisaa Mode Paris, Dawn Martins est une jeune styliste passionnee par la mode et le design.
              </p>
              <p className="text-medium line-height-28 margin-30px-bottom">
                Des sa premiere annee, elle s'est illustree avec un projet personnel ambitieux : l'organisation de son propre defile de mode avec sa collection "Meteore".
              </p>
              <p className="text-medium line-height-28 margin-30px-bottom">
                Son travail explore les contrastes, le mouvement et les textures, creant des pieces uniques qui racontent une histoire.
              </p>

              {/* Parcours */}
              <div className="margin-40px-top">
                <div className="row">
                  <div className="col-12 margin-20px-bottom">
                    <span className="alt-font text-medium-gray text-uppercase text-extra-small">
                      2023 - Aujourd'hui
                    </span>
                    <span className="alt-font text-extra-dark-gray font-weight-600 d-block">
                      Lisaa Mode Paris
                    </span>
                    <span className="text-medium">Bachelor Fashion Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="wow animate__fadeIn bg-light-gray" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 text-center margin-50px-bottom">
              <h4 className="alt-font text-extra-dark-gray font-weight-600">Contact</h4>
              <p className="text-medium">
                Vous avez un projet ou une question ? N'hesitez pas a me contacter.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* Email */}
            <div className="col-lg-4 col-md-6 text-center margin-30px-bottom">
              <div className="padding-30px-all bg-white box-shadow-light">
                <i className="fa-regular fa-envelope icon-medium text-deep-pink margin-20px-bottom d-block"></i>
                <span className="alt-font text-extra-dark-gray font-weight-600 d-block margin-10px-bottom">
                  Email
                </span>
                <a href="mailto:contact@dawnmartins.com" className="text-medium">
                  contact@dawnmartins.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="col-lg-4 col-md-6 text-center margin-30px-bottom">
              <div className="padding-30px-all bg-white box-shadow-light">
                <i className="fa-brands fa-instagram icon-medium text-deep-pink margin-20px-bottom d-block"></i>
                <span className="alt-font text-extra-dark-gray font-weight-600 d-block margin-10px-bottom">
                  Instagram
                </span>
                <a
                  href="https://instagram.com/dawnmartinsparis/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-medium"
                >
                  @dawnmartinsparis
                </a>
              </div>
            </div>

            {/* Localisation */}
            <div className="col-lg-4 col-md-6 text-center margin-30px-bottom">
              <div className="padding-30px-all bg-white box-shadow-light">
                <i className="fa-solid fa-location-dot icon-medium text-deep-pink margin-20px-bottom d-block"></i>
                <span className="alt-font text-extra-dark-gray font-weight-600 d-block margin-10px-bottom">
                  Localisation
                </span>
                <span className="text-medium">Paris, France</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
