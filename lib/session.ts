"use client";

import type { UserItem, UserRole } from "./types";
import { systemUsers } from "./seed";
import { readStorage, writeStorage } from "./storage";

const SESSION_KEY = "ytso-btys-active-user";

export function getActiveUser(): UserItem {
  return readStorage<UserItem>(SESSION_KEY, systemUsers[0]);
}

export function setActiveUser(user: UserItem): void {
  writeStorage(SESSION_KEY, user);
  window.dispatchEvent(new Event("ytso-user-changed"));
}

export function canEdit(role: UserRole): boolean {
  return role === "Sistem Sorumlusu" || role === "Yönetici";
}
