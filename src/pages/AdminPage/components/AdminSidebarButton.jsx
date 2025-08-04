import React from "react";

export default function AdminSidebarButton({ onClick, active, label }) {
  const buttonClass = active
    ? "admin-sidebar-button active"
    : "admin-sidebar-button";
  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
}
