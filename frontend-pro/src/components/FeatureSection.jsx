function FeatureSection(){
   const features = [
    {
        title: "Smart Exchange",
        desc: "Exchange and borrow books between owners and readers",
    },
    {
        title: "Real-Time Updates",
        desc: "Recieve instant request notifications using socket.Io",
    },
    {
        title: "Secure Authentication",
        desc: "Secure login using Email and Google Login",
    },
   ];
   return(
    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-24 bg-white">
        {features.map((feature,index)=>{
            <div key = {index} className="bg-white rounded-3xl p-10 shadow-xl border hover:-translate-y-2 transition">
                <h2 className="text-3xl font-bold text-blue-600 mb-5">
                   {feature.title}
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                   {feature.desc}
                </p>
            </div>
        })}
    </section>
   );
}
export default FeatureSection;