import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer-strip border-color-extra-light-gray border-top padding-50px-tb sm-padding-30px-tb">
        <div className="container">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-md-3 text-center text-lg-start sm-margin-20px-bottom">
              <Link to="/">
                <img
                  src="/images/logo.svg"
                  alt="Dawn Martins"
                  style={{ width: '180px', maxWidth: '100%', height: 'auto' }}
                />
              </Link>
            </div>

            {/* Copyright */}
            <div className="col-md-6 text-center text-small alt-font sm-margin-10px-bottom">
              &copy; 2026 Dawn Martins. Website by{' '}
              <a href="https://alleycom.fr" target="_blank" rel="noreferrer" title="Alleycom">
                Alleycom
              </a>
              .
            </div>

            {/* Social media */}
            <div className="col-md-3 text-center text-lg-end">
              <div className="social-icon-style-8 d-inline-block align-middle">
                <ul className="small-icon mb-0">
                  <li>
                    <a
                      className="instagram"
                      href="https://instagram.com/dawnmartinsparis/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="tiktok"
                      href="https://www.tiktok.com/@dawnmartinsparis"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <a className="scroll-top-arrow" href="javascript:void(0);">
        <i className="ti-arrow-up"></i>
      </a>
    </>
  );
}
