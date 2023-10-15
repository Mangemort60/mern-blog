import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
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
      <Navbar fluid rounded className="">
        <Navbar.Brand href="https://youssra-therapie.fr/">
          <span className="self-center whitespace-nowrap text-4xl  sm:text-5xl font-dancing dark:text-white">
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
              <Link to={'/user-profile'}>
                <Dropdown.Item>Mon profil</Dropdown.Item>
              </Link>

              {cookies.userId && cookies.token && user.isAdmin && (
                <Link to={'/admin'}>
                  <Dropdown.Item>Admin</Dropdown.Item>
                </Link>
              )}

              <Dropdown.Divider />
              <Dropdown.Item onClick={() => HandleLogout()}>
                Se deconnecter
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link
              to={'/login'}
              className="mt-2 md:m-0 border-black border-2 px-2 py-1 ml-4"
            >
              Login
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to={'/'}>Accueil</Link>
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
            <Link
              to={'/calendly'}
              className="bg-[#afa4ce] text-white w-20 py-1 px-2 rounded-sm"
            >
              Prendre RDV
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <hr className="w-1/2 mx-auto mt-8" />
    </>
  );
};

export default NavbarMenu;
