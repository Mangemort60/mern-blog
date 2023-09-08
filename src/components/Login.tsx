const Login = () => {
  return (
    <div className="w-full max-w-xs m-auto mt-16 ">
      <form className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-none border-0 border-b-[1px] w-full py-2 px-3 text-gray-600 mb-3 leading-tigh"
            id="emai"
            type="text"
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-none border-0 border-b-[1px] w-full py-2 px-3 text-gray-600 mb-3 leading-tigh"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
