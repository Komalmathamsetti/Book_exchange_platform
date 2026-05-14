import DashboardLayout from "../layouts/DashboardLayout";
function OwnerDashboard(){
  return(
     <DashboardLayout role="OWNER">
      <h1 className="text-5xl font-extrabold text-blue-600">
        Owner DashBoard
      </h1>
      <p className="mt-5 text-xl text-gray-500">
        Manage your books and exchange requests.
      </p>
     </DashboardLayout>
  );
}
export default OwnerDashboard;