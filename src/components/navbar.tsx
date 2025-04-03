import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/neiist_logo.png";
import UserDataContext, { UserDataContextType } from "../UserDataContext";
import { GoSignOut } from "react-icons/go";
import {
  summarizeName,
  statusToString,
  fenixPhoto,
  statusToColor,
} from "../hooks/dataTreatment";
import { isMobile } from "react-device-detect";

import style from "./css/NavBar.module.css";
import { fetchMemberStatus } from "../Api.service";

interface NavLinkProps {
  hide: string;
  as: React.ElementType;
  to: string;
  children: React.ReactNode;
}

interface LoginLogoutProps {
  userData: UserDataContextType | null;
  setUserData: React.Dispatch<React.SetStateAction<UserDataContextType | null>>;
}

const NavBar: React.FC = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [expanded, setExpanded] = useState<boolean | string>(false);

  return (
    <>
      <div className={style.navBarContainer}></div>
      <Navbar expand="md" expanded={expanded} className={style.navBar}>
        <Navbar.Brand>
          <Link href="/" passHref>
            <Image src={logo} alt="NEIIST LOGO" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse>
          <Nav style={{ marginLeft: "auto" }} onClick={() => setExpanded(false)}>
            <Nav.Link className={`${style.navLink} ${style.onWeb}`}>
              <Link href="/sobre_nos">Sobre nós</Link>
            </Nav.Link>
            <Nav.Link className={`${style.navLink} ${style.onWeb}`}>
              <Link href="/contactos">Contactos</Link>
            </Nav.Link>
            <Nav.Link className={`${style.navLinkDisable} ${style.onWeb}`}>
              Estudante
            </Nav.Link>

            <ActiveTecnicoStudentNavLink hide={style.onMobile} as={Link} to="/socio">
              Sócios
            </ActiveTecnicoStudentNavLink>

            <CollabNavLink hide={style.onMobile} as={Link} to="/collab">
              Colaborador(a)
            </CollabNavLink>

            <ActiveLMeicStudentNavLink hide={style.onMobile} as={Link} to="/thesismaster">
              Thesis Master
            </ActiveLMeicStudentNavLink>

            <AdminNavLink hide={style.onMobile} as={Link} to="/admin">
              Admin
            </AdminNavLink>

            <GacNavLink hide={style.onMobile} as={Link} to="/mag">
              MAG
            </GacNavLink>
            <LoginLogout userData={userData} setUserData={setUserData} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={style.navSpace} />
    </>
  );
};

const ActiveTecnicoStudentNavLink: React.FC<NavLinkProps> = ({ hide, as, to, children }) => {
  const { userData } = useContext(UserDataContext);

  if (userData && (userData.isAdmin || userData.isActiveTecnicoStudent)) {
    return (
      <Nav.Link className={`${style.navLink} ${hide}`}>
        <Link href={to}>{children}</Link>
      </Nav.Link>
    );
  }
  return null;
};

const ActiveLMeicStudentNavLink: React.FC<NavLinkProps> = ({ hide, as, to, children }) => {
  const { userData } = useContext(UserDataContext);

  if (userData && (userData.isAdmin || userData.isActiveLMeicStudent)) {
    return (
      <Nav.Link className={`${style.navLink} ${hide}`}>
        <Link href={to}>{children}</Link>
      </Nav.Link>
    );
  }
  return null;
};

const CollabNavLink: React.FC<NavLinkProps> = ({ hide, as, to, children }) => {
  const { userData } = useContext(UserDataContext);

  if (userData && (userData.isAdmin || userData.isCollab)) {
    return (
      <Nav.Link className={`${style.navLink} ${hide}`}>
        <Link href={to}>{children}</Link>
      </Nav.Link>
    );
  }
  return null;
};

const GacNavLink: React.FC<NavLinkProps> = ({ hide, as, to, children }) => {
  const { userData } = useContext(UserDataContext);

  if (userData && (userData.isAdmin || userData.isGacMember)) {
    return (
      <Nav.Link className={`${style.navLink} ${hide}`}>
        <Link href={to}>{children}</Link>
      </Nav.Link>
    );
  }
  return null;
};

const AdminNavLink: React.FC<NavLinkProps> = ({ hide, as, to, children }) => {
  const { userData } = useContext(UserDataContext);

  if (userData && userData.isAdmin) {
    return (
      <Nav.Link className={`${style.navLink} ${hide}`}>
        <Link href={to}>{children}</Link>
      </Nav.Link>
    );
  }
  return null;
};

const LoginLogout: React.FC<LoginLogoutProps> = ({ userData, setUserData }) => {
  const [data, setData] = useState<UserDataContextType | null>(null);

  useEffect(() => {
    if (userData) {
      fetchMemberStatus(userData.username).then((userStatus) => {
        let newData = { ...userData, status: userStatus || "NaoSocio" };
        setData(newData);
      });
    }
  }, [userData]);

  if (data) return <LoggedIn userData={data} setUserData={setUserData} />;
  return <Login />;
};

const Login: React.FC = () => (
  <Nav.Link
    href={
      "https://fenix.tecnico.ulisboa.pt/oauth/userdialog" +
      `?client_id=${process.env.NEXT_PUBLIC_FENIX_CLIENT_ID}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_FENIX_REDIRECT_URI}`
    }
  >
    <div
      style={{
        width: "80px",
        height: "30px",
        justifyContent: "center",
        background: "#D9D9D9",
        borderRadius: "10px",
        fontFamily: "Secular One",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "30px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        color: "#000000",
      }}
    >
      Login
    </div>
  </Nav.Link>
);

const Logout: React.FC<{ setUserData: React.Dispatch<React.SetStateAction<UserDataContextType | null>> }> = ({ setUserData }) => (
  <Nav.Link
    className={style.navLinkLogout}
    onClick={() => {
      window.sessionStorage.removeItem("accessToken");
      setUserData(null);
      window.location.replace("/").reload();
    }}
  >
    <GoSignOut style={{ width: "25px", alignItems: "center", color: "black" }} />
  </Nav.Link>
);

const DefaultLink: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  isMobile ? <>{children}</> : <Link href="/socio">{children}</Link>;

const LoggedIn: React.FC<LoginLogoutProps> = ({ userData, setUserData }) => {
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);

  const onMouseEnterFunction = () => setShow(true);
  const onMouseLeaveFunction = () => setShow(click);
  const onClickFunction = () => {
    if (isMobile) setClick(!click);
    setShow(!click);
  };

  return (
    <>
      <div className={`${style.loggedSpace} ${style.onlyWeb}`}>
        <DefaultLink>
          <div
            className={style.loggedImage}
            onClick={onClickFunction}
            onMouseEnter={onMouseEnterFunction}
            onMouseLeave={onMouseLeaveFunction}
            style={userData ? { backgroundImage: `url(${fenixPhoto(userData.username)})` } : undefined}
          />
        </DefaultLink>

        <div
          className={style.loggedInfo}
          onClick={onClickFunction}
          onMouseEnter={onMouseEnterFunction}
          onMouseLeave={onMouseLeaveFunction}
        >
          <DefaultLink>
            <div className={style.loggedName}>{summarizeName(userData.displayName)}</div>
          </DefaultLink>

          <div className={style.logoutButton_MemberState}>
            <Logout setUserData={setUserData} />
            <DefaultLink>
              <div className={style.memberStatus} style={{ background: statusToColor(userData.status) }}>
                <div>{statusToString(userData.status)}</div>
              </div>
            </DefaultLink>
          </div>
        </div>
      </div>
      <div
        className={style.moreInfo}
        onMouseEnter={onMouseEnterFunction}
        onMouseLeave={onMouseLeaveFunction}
        style={show ? { display: "flex" } : { display: "none" }}
      >
        <ActiveTecnicoStudentNavLink hide={style.onWeb} as={Link} to="/socio">
          Sócio
        </ActiveTecnicoStudentNavLink>

        <CollabNavLink hide={style.onWeb} as={Link} to="/collab">
          Colaborador(a)
        </CollabNavLink>

        <ActiveLMeicStudentNavLink hide={style.onWeb} as={Link} to="/thesismaster">
          Thesis Master
        </ActiveLMeicStudentNavLink>

        <AdminNavLink hide={style.onWeb} as={Link} to="/admin">
          Admin
        </AdminNavLink>

        <GacNavLink hide={style.onWeb} as={Link} to="/mag">
          MAG
        </GacNavLink>
      </div>
    </>
  );
};

export default NavBar;
