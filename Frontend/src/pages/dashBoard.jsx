import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/dashboard/book-requests/1");
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
  try {
    await API.put(`/exchange/accept/${id}`);
    alert("Accepted");

    // 🔥 refresh UI
    const res = await API.get("/dashboard/book-requests/1");
    setRequests(res.data);

  } catch (error) {
    console.error(error);
  }
};
  const handleReject = async (id) => {
  try {
    await API.put(`/exchange/reject/${id}`);
    alert("Rejected");

    const res = await API.get("/dashboard/book-requests/1");
    setRequests(res.data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h2>Requests for My Books</h2>

      {requests.length === 0 ? (
        <p>No requests</p>
      ) : (
        requests.map((req) => (
          <div key={req.id}>
            <h3>{req.title}</h3>
            <p>Requester ID: {req.requester_id}</p>
            <p>Status: {req.status}</p>

            {req.status === "REQUESTED" && (
              <>
                <button onClick={() => handleAccept(req.id)}>Accept</button>
                <button onClick={() => handleReject(req.id)}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;