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
  <div style={{ padding: "20px" }}>
    <h2>📥 Requests for My Books</h2>

    {requests.length === 0 ? (
      <p>No requests</p>
    ) : (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {requests.map((req) => (
          <div key={req.id} style={{
            backgroundColor: "#1e293b",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <h3>{req.title}</h3>
            <p>Status: {req.status}</p>

            {req.status === "REQUESTED" && (
              <>
                <button
                  onClick={() => handleAccept(req.id)}
                  style={{ backgroundColor: "green", color: "white", marginRight: "10px" }}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(req.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Dashboard;