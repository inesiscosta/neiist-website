"use client"

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserDataContext from "../context/UserDataContext";
import { GoSignOut } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import style from "./css/NavBar.module.css";
import { summarizeName, fenixPhoto, statusToString, statusToColor } from "../utils/dataTreatment";

interface UserData {
  username: string;
  displayName: string;
  status?: string;
  isAdmin?: boolean;
  isActiveTecnicoStudent?: boolean;
  isActiveLMeicStudent?: boolean;
  isCollab?: boolean;
  isGacMember?: boolean;
}

const NavBar: React.FC = () => {
  const { userData, login, logout } = useContext(UserDataContext) || {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Sub-components for conditional rendering
  const ActiveTecnicoStudentNavLink: React.FC<{ hide: boolean; href: string; children: React.ReactNode }> = ({ hide, href, children }) => {
    const { userData } = useContext(UserDataContext) || {};

    if (userData && (userData.isAdmin || userData.isActiveTecnicoStudent) && !hide) {
      return (
        <div className={style.navItem}>
          <Link href={href} className={style.navLink}>
            {children}
          </Link>
        </div>
      );
    }
    return null;
  };

  const ActiveLMeicStudentNavLink: React.FC<{ hide: boolean; href: string; children: React.ReactNode }> = ({ hide, href, children }) => {
    const { userData } = useContext(UserDataContext) || {};

    if (userData && (userData.isAdmin || userData.isActiveLMeicStudent) && !hide) {
      return (
        <div className={style.navItem}>
          <Link href={href} className={style.navLink}>
            {children}
          </Link>
        </div>
      );
    }
    return null;
  };

  const CollabNavLink: React.FC<{ hide: boolean; href: string; children: React.ReactNode }> = ({ hide, href, children }) => {
    const { userData } = useContext(UserDataContext) || {};

    if (userData && (userData.isAdmin || userData.isCollab) && !hide) {
      return (
        <div className={style.navItem}>
          <Link href={href} className={style.navLink}>
            {children}
          </Link>
        </div>
      );
    }
    return null;
  };

  const GacNavLink: React.FC<{ hide: boolean; href: string; children: React.ReactNode }> = ({ hide, href, children }) => {
    const { userData } = useContext(UserDataContext) || {};

    if (userData && (userData.isAdmin || userData.isGacMember) && !hide) {
      return (
        <div className={style.navItem}>
          <Link href={href} className={style.navLink}>
            {children}
          </Link>
        </div>
      );
    }
    return null;
  };

  const AdminNavLink: React.FC<{ hide: boolean; href: string; children: React.ReactNode }> = ({ hide, href, children }) => {
    const { userData } = useContext(UserDataContext) || {};

    if (userData && userData.isAdmin && !hide) {
      return (
        <div className={style.navItem}>
          <Link href={href} className={style.navLink}>
            {children}
          </Link>
        </div>
      );
    }
    return null;
  };

  // Logged-in user component
  const LoggedIn: React.FC<{ userData: UserData; logout: () => void }> = ({ userData, logout }) => {
    return (
      <div className={style.loggedInContainer}>
        <div className={style.loggedInInfo}>
          <Image
            src={fenixPhoto(userData.username)}
            alt="User Photo"
            width={40}
            height={40}
            className={style.userPhoto}
          />
          <span>{summarizeName(userData.displayName)}</span>
        </div>
        <button onClick={logout} className={style.logoutButton}>
          <GoSignOut />
        </button>
      </div>
    );
  };

  return (
    <div className={style.navBarContainer}>
      <div className={style.navBar}>
        <div className={style.navBrand}>
          <Link href="/">
            <Image src="/neiist_logo.png" alt="NEIIST Logo" width={120} height={40} />
          </Link>
        </div>

        <button 
          className={style.menuToggle} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>

        <div className={`${style.navMenu} ${isMenuOpen ? style.active : ''}`}>
          <div className={style.navItems}>
            <div className={style.navItem}>
              <Link href="/sobre_nos" className={style.navLink}>
                Sobre nós
              </Link>
            </div>
            <div className={style.navItem}>
              <Link href="/contactos" className={style.navLink}>
                Contactos
              </Link>
            </div>
            <div className={style.navItem}>
              <Link href="/estudantes" className={style.navLink}>
                Estudante
              </Link>
            </div>

            {/* Conditional links */}
            <ActiveTecnicoStudentNavLink hide={false} href="/socio">
              Sócios
            </ActiveTecnicoStudentNavLink>

            <CollabNavLink hide={false} href="/collab">
              Colaborador(a)
            </CollabNavLink>

            <ActiveLMeicStudentNavLink hide={false} href="/thesismaster">
              Thesis Master
            </ActiveLMeicStudentNavLink>

            <AdminNavLink hide={false} href="/admin">
              Admin
            </AdminNavLink>

            <GacNavLink hide={false} href="/mag">
              MAG
            </GacNavLink>
          </div>

          <div className={style.navAuth}>
            {userData ? (
              <LoggedIn userData={userData} logout={logout} />
            ) : (
              <div className={style.navItem}>
                <button onClick={login} className={style.loginButton}>
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Space for fixed navbar */}
      <div className={style.navSpace}></div>
    </div>
  );
};

export default NavBar;