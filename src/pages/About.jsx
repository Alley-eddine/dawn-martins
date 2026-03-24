import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useInitScripts from '../hooks/useInitScripts';
import { getAbout } from '../services/cms';
import './About.css';

function renderRichText(richText) {
  if (!richText?.root?.children) return null;
  return richText.root.children.map((node, i) => {
    if (node.type === 'paragraph') {
      const text = node.children?.map((c) => c.text || '').join('') || '';
      if (!text) return null;
      return <p key={i}>{text}</p>;
    }
    return null;
  });
}

const defaultBio = [
  'Bachelor Fashion Design student at Lisaa Mode Paris, Dawn Martins is a young fashion designer passionate about fashion and design. Her approach to creation is instinctive and deeply personal — each collection is born from an emotion, an urgency, a story that demands to be told through fabric.',
  'In her first year, she distinguished herself with an ambitious personal project: organizing her own fashion show with her collection "Meteore". This bold move established her as a designer unafraid to leap before looking.',
  'Her work explores contrasts, movement, and textures, creating sculptural and expressive pieces that blur the line between fashion and performance art.',
];

export default function About() {
  useInitScripts();
  const [data, setData] = useState(null);

  useEffect(() => {
    getAbout()
      .then(setData)
      .catch((err) => console.log('Error loading about:', err));
  }, []);

  const profileImg = data?.profileImage || '/images/reportage_meteore/HOME1.JPG';

  return (
    <div className="w-100">
      <main>
      <Helmet>
        <title>About - Dawn Martins</title>
        <meta name="description" content="Discover Dawn Martins, young Parisian fashion designer studying Bachelor Fashion Design at Lisaa Mode Paris." />
      </Helmet>

      <Header transparent={true} />

      {/* Hero */}
      <section className="about-hero wow animate__fadeIn">
        <div className="about-hero-image">
          <img src={profileImg} alt="Dawn Martins" />
        </div>
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="subtitle">{data?.subtitle || 'Fashion Designer'}</span>
          <h1>{data?.title || 'Dawn Martins'}</h1>
        </div>
      </section>

      {/* Bio */}
      <section className="about-bio wow animate__fadeIn">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="about-bio-text">
                {data?.bio ? renderRichText(data.bio) : (
                  defaultBio.map((text, i) => <p key={i}>{text}</p>)
                )}

                {data?.cv && (
                  <a href={data.cv} target="_blank" rel="noreferrer" className="about-cv-btn">
                    <i className="fa-solid fa-arrow-down"></i>
                    Download CV
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="about-timeline wow animate__fadeIn">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="about-timeline-title">Background</div>

              <div className="timeline-item wow animate__fadeInUp">
                <div className="timeline-year">2023 — Present</div>
                <div className="timeline-content">
                  <h4>Lisaa Mode Paris</h4>
                  <p>Bachelor Fashion Design</p>
                </div>
              </div>

              <div className="timeline-item wow animate__fadeInUp" data-wow-delay="0.1s">
                <div className="timeline-year">2024</div>
                <div className="timeline-content">
                  <h4>Meteore — First Fashion Show</h4>
                  <p>Self-produced debut collection and runway show</p>
                </div>
              </div>

              <div className="timeline-item wow animate__fadeInUp" data-wow-delay="0.2s">
                <div className="timeline-year">2025</div>
                <div className="timeline-content">
                  <h4>Hauts-de-Seine — Revele ton Talent</h4>
                  <p>Featured as a young emerging designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="about-contact wow animate__fadeIn">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="about-contact-title">Get in touch</div>

              <div className="contact-grid">
                <div className="contact-item wow animate__fadeInUp">
                  <i className="fa-regular fa-envelope"></i>
                  <span className="contact-item-label">Email</span>
                  <a href="mailto:contact@dawnmartins.com">contact@dawnmartins.com</a>
                </div>

                <div className="contact-item wow animate__fadeInUp" data-wow-delay="0.1s">
                  <i className="fa-brands fa-instagram"></i>
                  <span className="contact-item-label">Instagram</span>
                  <a href="https://instagram.com/dawnmartinsparis/" target="_blank" rel="noreferrer">
                    @dawnmartinsparis
                  </a>
                </div>

                <div className="contact-item wow animate__fadeInUp" data-wow-delay="0.2s">
                  <i className="fa-solid fa-location-dot"></i>
                  <span className="contact-item-label">Based in</span>
                  <span>Paris, France</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
