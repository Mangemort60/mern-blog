import { Collapse } from 'flowbite';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import defaultHeadshot from '../assets/defaultHeadshot.webp';
import { set } from 'react-hook-form';

const Navbar = () => {
  // script pour la fonction collapse de la navbar FlowBite
  const targetEl = document.getElementById('navbar-hamburger');
  const triggerEl = document.getElementById('triggerEl');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [_Cookies, _setCookies, RemoveCookies] = useCookies();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cookies] = useCookies(['userId', 'token']);
  const [isOpen, setIsOpen] = useState(false);

  console.log(user.pseudo);

  const HandleLogout = () => {
    RemoveCookies('token');
    RemoveCookies('userId');
    navigate('/login');
  };

  // useEffect(() => {
  //   console.log('user a jour');
  // }, [user]);

  new Collapse(targetEl, triggerEl);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex justify-center ">
          <Link to="/" className="flex items-center">
            <img
              src="../../public/sunicon-1.webp"
              className="h-12 mr-3"
              alt="Sun"
            />
            <h1 className="font-josefin Slab text-4xl whitespace-nowrap dark:text-white">
              Blog
            </h1>
          </Link>
        </div>
        <div className="font-thin max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4">
          {/* element user */}

          <div
            className={`${
              cookies.token && cookies.userId ? 'flex ' : 'invisible'
            } items-center md:order-2 mr-2`}
          >
            <p>Salut {user.pseudo} !</p>
          </div>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className={`${
                cookies.token && cookies.userId ? 'flex ' : 'invisible '
              } mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={
                  cookies.token && cookies.userId
                    ? user.headshot
                    : defaultHeadshot
                }
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
                    to={'/user-profile'}
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
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 sm:m-auto"
            id="navbar-user"
          >
            <ul className="sm:relative left-16 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  A propos
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
