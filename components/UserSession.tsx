"use client";

import { useEffect, useState } from "react";
import { systemUsers } from "@/lib/seed";
import { getActiveUser, setActiveUser } from "@/lib/session";
import type { UserItem } from "@/lib/types";

export default function UserSession() {
  const [active, setActive] = useState<UserItem>(systemUsers[0]);

  useEffect(() => {
    setActive(getActiveUser());
  }, []);

  function changeUser(id: string) {
    const selected = systemUsers.find((user) => user.id === id) ?? systemUsers[0];
    setActive(selected);
    setActiveUser(selected);
  }

  return (
    <div className="user-session">
      <span className="user-session-label">Aktif kullanıcı</span>
      <select value={active.id} onChange={(event) => changeUser(event.target.value)}>
        {systemUsers.map((user) => (
          <option key={user.id} value={user.id}>{user.name} · {user.role}</option>
        ))}
      </select>
    </div>
  );
}
