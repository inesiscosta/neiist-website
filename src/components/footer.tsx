import { FaFacebookF, FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import styles from "./css/Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* About NEIIST */}
          <div className={styles.section}>
            <h6>NEIIST</h6>
            <p>
              Use rows and columns to organize your footer content. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          {/* Site Pages */}
            <div className={styles.section}>
            <h6>Sobre o Núcleo</h6>
            <ul>
              <li><a href="/equipa">Equipa</a></li>
              <li><a href="/estudante">Estudante</a></li>
              <li><a href="/estatutos.pdf" target="_blank" rel="noopener noreferrer">Estatutos</a></li>
            </ul>
            </div>

          {/* Useful Links */}
          <div className={styles.section}>
            <h6>Useful Links</h6>
            <ul>
              <li>
                <a href="https://fenix.tecnico.ulisboa.pt/cursos/leic-a" target="_blank" rel="noopener noreferrer">
                  LEIC-A
                </a> / 
                <a href="https://fenix.tecnico.ulisboa.pt/cursos/leic-t" target="_blank" rel="noopener noreferrer">
                  LEIC-T
                </a>
              </li>
              <li>
                <a href="https://fenix.tecnico.ulisboa.pt/cursos/meic-a" target="_blank" rel="noopener noreferrer">
                  MEIC-A
                </a> / 
                <a href="https://fenix.tecnico.ulisboa.pt/cursos/meic-t" target="_blank" rel="noopener noreferrer">
                  MEIC-T
                </a>
              </li>
              <li>
                <a href="https://fenix.tecnico.ulisboa.pt/cursos/deic" target="_blank" rel="noopener noreferrer">
                  DEIC
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.section}>
            <h6>Contact</h6>
            <p>📍 New York, NY 10012, US</p>
            <p>📧 neiist@tecnico.ulisboa.pt</p>
            <p>📞 +01 234 567 88</p>
          </div>

          {/* Powered By */}
          <div className={styles.section}>
            <h6>Powered by:</h6>
            <a href="https://dei.tecnico.ulisboa.pt" target="_blank" rel="noopener noreferrer" style={{ paddingLeft: "10px" }}>
              <Image src="/dei.svg" alt="DEI Logo" className={styles.deiLogo} width={200} height={100} />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>© 2025 NEIIST. All rights reserved.</p>
          {/* Social Icons */}
          <div className={styles.socialIcons}>
            <a href="https://facebook.com/NEIIST" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/NEIIST" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/neiist/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://linktr.ee/NEIIST" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
              <SiLinktree />
            </a>
            <a href="mailto:neiist@tecnico.ulisboa.pt" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://github.com/neiist-dev/neiist-website" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
