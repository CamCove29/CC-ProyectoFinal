import React, { useState, useEffect } from "react";
import { getReport } from "../services/reportService";

const ViewReportPage = ({ reportId, tenantId }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(tenantId, reportId);
        setReport(response);
      } catch (err) {
        console.error(err);
        setError("Failed to load report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId, tenantId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Report Details</h1>
      <pre>{JSON.stringify(report, null, 2)}</pre>
    </div>
  );
};

export default ViewReportPage;
