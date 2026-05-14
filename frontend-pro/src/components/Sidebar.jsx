import { Link } from "react-router-dom";
function Sidebar( { role }){
  return(
    <div className="w-72 min-h-screen bg-white border-r shadow-sm px-6 py-8">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-12">
            BookSwap
        </h1>
        <div className="flex flex-col gap-5 text-lg font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
               Home 
            </Link>
            { role === "OWNER" &&(
                <>
                <Link
                  to="/owner-dashboard"
                  className="hover:text-blue-600 transition"
                >
                Dashboard
                </Link>

                <Link
                  to="/add-book"
                  className="hover:text-blue-600 transition"
                >
                Add Book
                </Link>
                </>
            )}
            { role === "CONSUMER" &&(
                <>
                <Link 
                  to="/consumer-dashboard"
                  className="hover:text-blue-600 transition"
                >
                Dashboard
                </Link>
                <Link
                  to="/browse"
                  className="hover:text-blue-600 transition"
                >
                Browse Books
                </Link>
                </>
            )}
        </div>
    </div>
  );
}
export default Sidebar;