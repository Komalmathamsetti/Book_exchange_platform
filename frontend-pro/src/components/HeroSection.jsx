function HeroSection(){
   return(
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 bg-linear-to-br from-blue-50 via-white to-indigo-100">
        <h1 className="text-7xl font-extrabold text-gray-900 leading-tight max-w-5xl">
            Exchange Books <br/>
            Smarter and Faster 
        </h1>
        <p className="mt-8 text-xl text-gray-500 max-w-3xl leading-relaxed">
            A Modern way for the students and readers to exchange,
            borrow and manage books seamlessly with real-time updates.
        </p>
        <div className="flex gap-6 mt-12">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg transition duration-300 flex items-center justify-center min-w-[220px]">
           Get Started
        </button>

        <button className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 bg-white px-10 py-4 rounded-2xl text-xl font-semibold transition duration-300 flex items-center justify-center min-w-[220px]">
           Explore Books
        </button>

        </div>
      </section>
   );
}
export default HeroSection;