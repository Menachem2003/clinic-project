import React, { useEffect, useState } from "react";
import { api } from "../../../utils/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/users");
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div className="admin-users-loading">Loading users...</div>;
  if (error)
    return <div className="admin-users-error">{error}</div>;

  return (
    <section className="admin-users-section">
      <h2 className="admin-users-title">
        <i className="fa-solid fa-users"></i> Users
      </h2>
      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead className="admin-users-table-header">
            <tr>
              <th className="admin-users-table-th">Name</th>
              <th className="admin-users-table-th">Email</th>
              <th className="admin-users-table-th">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="admin-users-table-row">
                <td className="admin-users-table-cell">{u.name}</td>
                <td className="admin-users-table-cell">{u.email}</td>
                <td className="admin-users-table-cell">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}