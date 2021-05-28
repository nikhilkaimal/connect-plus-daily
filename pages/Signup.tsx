export default function Signup() {
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="container">
          <div className="my-52 m-10 flex justify-center">
            <p className="text-3xl">
              Register now
              <br />
              to connect
              <br />
              with your loved ones
            </p>
          </div>
        </div>
        <div className="container">
          <div className="max-w-md my-20 mr-2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password2"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  type="password"
                />
              </div>
              <div>
                <button className="btn-simple" type="button">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          {/* <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p> */}
        </div>
      </div>
    </>
  );
}
