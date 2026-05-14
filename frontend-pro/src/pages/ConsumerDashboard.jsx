import DashboardLayout from "../layouts/DashboardLayout";
function ConsumerDashboard(){
  return(
  <DashboardLayout role="CONSUMER">
    <h1 className="text-5xl font-extrabold text-blue-600">
      Consumer Dashboard
    </h1>
    <p className=" mt-5 text-xl text-gray-500">
      Browse and borrow books.
    </p>
  </DashboardLayout>
  );
}
export default ConsumerDashboard;