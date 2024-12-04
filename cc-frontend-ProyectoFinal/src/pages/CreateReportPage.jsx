import React, { useState } from "react";
import { createReport } from "../services/reportService";

const CreateReportPage = () => {
  const [tenantId, setTenantId] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reportData = { tenant_id: tenantId, filters };
      const response = await createReport(reportData);
      console.log("Report created successfully:", response);
      alert("Report created successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to create report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Report</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Tenant ID:
          <input
            type="text"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            required
          />
        </label>
        <label>
          Filters (JSON):
          <textarea
            value={JSON.stringify(filters)}
            onChange={(e) => setFilters(JSON.parse(e.target.value))}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Report"}
        </button>
      </form>
    </div>
  );
};

export default CreateReportPage;
