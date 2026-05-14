import Sidebar from "../components/Sidebar";
function DashboardLayout({ role, children }){
   return(
     <div className="flex bg-gray-100 min-h-screen">
        <Sidebar role={role}/>
        <div className="flex-1 p-10">
            {children}
        </div>

     </div>
   );
}
export default DashboardLayout;