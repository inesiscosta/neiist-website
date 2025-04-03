import React from 'react';
import style from './css/Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaLink, FaEnvelope, FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <SocialIcons />
    <Links />
  </footer>
);

const SocialIcons = () => {
  const socialLinks = [
    { href: "https://facebook.com/NEIIST", icon: <FaFacebook size={35} /> },
    { href: "https://instagram.com/NEIIST", icon: <FaInstagram size={35} /> },
    { href: "https://www.linkedin.com/company/neiist/", icon: <FaLinkedin size={35} /> },
    { href: "https://linktr.ee/NEIIST", icon: <FaLink size={35} /> },
    { href: "mailto:neiist@tecnico.ulisboa.pt", icon: <FaEnvelope size={35} /> },
    { href: "https://github.com/neiist-dev/neiist-website", icon: <FaGithub size={35} /> },
  ];

  return (
    <div className={style.links}>
      <div className={style.linkIconSpace}>
        {socialLinks.map((link, index) => (
          <div key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const FooterSection = ({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) => (
  <div className={style.footerChildSpace}>
    <h6>{title}</h6>
    <hr />
    {links.map((link, index) => (
      <div key={index}>
        <a href={link.href}  target={link.external ? "_blank" : "_self"} rel={link.external ? "noopener noreferrer" : undefined}>
          <p>{link.label}</p>
        </a>
      </div>
    ))}
  </div>
);

const PoweredBy = () => (
  <div className={style.footerChildSpaceImg}>
    <h6>Powered By</h6>
    <hr />
    <a href="https://dei.tecnico.ulisboa.pt/" target="_blank" rel="noopener noreferrer">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/DEI.png)` }} />
    </a>
  </div>
);


const Links = () => (
  <div className={style.footer}>
    <div className={style.footerSpace}>
      <FooterSection
        title="Sobre o Núcleo"
        links={[
          { href: "/sobre_nos", label: "Quem Somos?" },
          { href: "/contactos", label: "Contactos" },
          { href: "/estatutos", label: "Estatutos" },
        ]}
      />
      <FooterSection
        title="Cursos de EIC"
        links={[
          { href: "https://fenix.tecnico.ulisboa.pt/cursos/leic-a", label: "LEIC-A", external: true },
          { href: "https://fenix.tecnico.ulisboa.pt/cursos/leic-t", label: "LEIC-T", external: true },
          { href: "https://fenix.tecnico.ulisboa.pt/cursos/meic-a", label: "MEIC-A", external: true },
          { href: "https://fenix.tecnico.ulisboa.pt/cursos/meic-t", label: "MEIC-T", external: true },
          { href: "https://fenix.tecnico.ulisboa.pt/cursos/deic", label: "DEIC", external: true },
        ]}
      />
      <FooterSection
        title="Mais Informações"
        links={[
          { href: "/estudantes", label: "Estudantes" },
          { href: "https://sinfo.org", label: "SINFO 32", external: true },
        ]}
      />
      <PoweredBy />
    </div>
  </div>
);

export default Footer;
