const Footer = () => {
  return (
    <footer className="font-nunito bg-opacity-5 dark:bg-gray-900 my-4 mt-[100px]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-3xl font-medium letter dark:text-white font-dancing">
            Youssra thérapie
          </h1>

          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="https://github.com/Mangemort60" className="hover:underline">
            Made by Otacon
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
