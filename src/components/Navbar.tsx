import { Collapse } from 'flowbite';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import defaultHeadshot from '../assets/defaultHeadshot.webp';

const Navbar = () => {
  // script pour la fonction collapse de la navbar FlowBite
  const targetEl = document.getElementById('navbar-hamburger');
  const triggerEl = document.getElementById('triggerEl');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_Cookies, _setCookies, RemoveCookies] = useCookies();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cookies] = useCookies(['userId', 'token']);
  const [isOpen, setIsOpen] = useState(false);

  const HandleLogout = () => {
    RemoveCookies('token');
    RemoveCookies('userId');
    navigate('/login');
  };

  new Collapse(targetEl, triggerEl);

  return (
    <>
      <nav className="border-gray-200 font-nunito">
        <div className="flex justify-between mt-8">
          <div></div>
          <Link to="/" className="flex items-center">
            {/* <img
              src="../../public/sunicon-1.webp"
              className="h-12 mr-3"
              alt="Sun"
            /> */}
            <h1 className="text-5xl font-medium letter dark:text-white font-dancing">
              Youssra thérapie
            </h1>
          </Link>
          {cookies.userId && cookies.token && user.isAdmin ? (
            <Link to="/admin" className="mr-4 flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        <div className="font-thin font-nunito max-w-screen-xl flex flex-wrap items-center justify-end mx-auto mt-8 p-4">
          {/* element user */}
          <div
            className={`${
              cookies.token && cookies.userId ? 'flex ' : 'invisible'
            } items-center lg:order-2 mr-2`}
          >
            <p className="font-nunito font-normal">Salut {user.pseudo} !</p>
          </div>
          <div className="flex items-center lg:order-2">
            <Link
              to={'/login'}
              className={`lg:order-2 ${
                !cookies.token && !cookies.userId ? 'flex ' : 'invisible '
              }  gap-2`}
            >
              <button className="border-2 rounded-sm border-black px-4 py-1 hover:bg-slate-50 font-normal">
                Login
              </button>
            </Link>

            <button
              type="button"
              className={`${
                cookies.token && cookies.userId ? 'flex ' : 'invisible '
              } mr-3 text-sm bg-gray-800 rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={user.headshot ?? defaultHeadshot}
                alt="user photo"
              />
            </button>
            <div
              className={`z-50 ${isOpen ? 'block' : 'hidden'}
              my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {cookies.token && cookies.userId ? user.email : 'anonyme'}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={`/user-profile`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Mon Profil
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => {
                      setIsOpen(false);
                      HandleLogout();
                    }}
                  >
                    Se déconnecter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              onClick={() => setIsOpen(false)}
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {/* navbar menu */}
          <div
            className="items-center sm:relative left-[106px] justify-between hidden w-full lg:flex lg:w-auto lg:order-1 sm:m-auto font-nunito font-medium text-1xl"
            id="navbar-user"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-white lg:bg-opacity-5 lg:flex-row lg:items-center lg:space-x-8 lg:mt-0 lg:border-0 dark:border-gray-700 ">
              <li>
                <Link
                  to={'/articles'}
                  className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  ARTICLES
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  A PROPOS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  OFFRE
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-black lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  CONTACT
                </a>
              </li>
              <li className="mt-2 lg:m-0">
                <Link
                  to={'/calendly'}
                  type="button"
                  className="shadow-sm p-2 m-2 bg-[#AFA4CE] rounded-sm hover:bg-[#9383be]  text-white"
                >
                  Prendre RDV
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="hidden mt-2  lg:flex lg:w-1/3 m-auto" />
    </>
  );
};

export default Navbar;
