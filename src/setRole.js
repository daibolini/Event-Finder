import React, { useState } from 'react';

function SetRole() {
  const [role, setRole] = useState('user');

  const handleSetRole = () => {
    localStorage.setItem('role', role);
    alert(`Role set to ${role}`);
  };

  return (
    <div>
      <h1>Set User Role</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSetRole}>Set Role</button>
    </div>
  );
}

export default SetRole;