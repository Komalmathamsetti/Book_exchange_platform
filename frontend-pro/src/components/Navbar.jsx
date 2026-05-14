import { Link } from "react-router-dom";
function Navbar(){
    return(
       <nav className="w-full bg-white border-b shadow-sm px-10 py-5 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold text-blue-600">
            BookSwap
        </h1>
        <div className="flex items-center gap-10 text-lg font-medium text-gray-700">

        <Link
          to="/"
          className="hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          to="/browse"
          className="hover:text-blue-600 transition"
        >
          Browse
        </Link>

        <Link
          to="/login"
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-xl transition duration-300 text-white px-6 py-3 rounded-2xl text-lg font-semibold flex items-center justify-center min-w-[120px]"
        >
          Login
        </Link>

      </div>
      </nav>
    );
}
export default Navbar;