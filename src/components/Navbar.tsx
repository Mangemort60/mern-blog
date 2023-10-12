import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import defaultHeadshot from '../assets/defaultHeadshot.webp';

import { Navbar, Dropdown, Avatar } from 'flowbite-react';

const NavbarMenu = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_Cookies, _setCookies, RemoveCookies] = useCookies();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cookies] = useCookies(['userId', 'token']);

  const HandleLogout = () => {
    RemoveCookies('token');
    RemoveCookies('userId');
    navigate('/login');
  };

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-5xl font-dancing dark:text-white">
            Youssra Thérapie
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {cookies.token && cookies.userId ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={user.headshot || defaultHeadshot}
                  rounded
                  className="ml-2"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.pseudo}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to={'/user-profile'}>Mon profil</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                {cookies.userId && cookies.token && user.isAdmin && (
                  <Link to={'/admin'}>Admin</Link>
                )}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => HandleLogout()}>
                Se deconnecter
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to={'/login'}>Login</Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Accueil
          </Navbar.Link>
          <Navbar.Link>
            <Link to={'/articles'}>Articles</Link>
          </Navbar.Link>
          <Navbar.Link href="#">
            <Link to={''}>A propos</Link>
          </Navbar.Link>
          <Navbar.Link href="#">
            <Link to={'/offre'}>Offres</Link>
          </Navbar.Link>
          <Navbar.Link href="#">
            <Link to={'/calendly'} className="bg-[#afa4ce] text-white w-20">
              Prendre RDV
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
