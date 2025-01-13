// NavbarAdmin.jsx
import React from "react";
import NavbarBase from "./NavbarBase";
import LoginStore from "../../api/LoginStore";

const NavbarAdmin = () => {
  const adminLinks = [
    { label: "Platform Health", href: "/admin/platform-health" },
    { label: "Admin Analytics", href: "/admin/stats" },
    { label: "Policy Enforcement", href: "/admin/policy-enforcement" },
    { label: "Review Spaces", href: "/admin/review-spaces" },
  ];

  const handleLogout = async () => {
    await LoginStore.getState().logout();
  };

  return (
    <NavbarBase
      title="Find your space Admin"
      links={adminLinks}
      onLogout={handleLogout}
    />
  );
};

export default NavbarAdmin;
