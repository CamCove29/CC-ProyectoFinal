import React, { useState, useEffect } from "react";
import { getReports } from "../services/reportService";

const ListReportsPage = ({ tenantId }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports(tenantId);
        setReports(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [tenantId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Reports List</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>{report.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListReportsPage;
