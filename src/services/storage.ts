const KEY = "hasard_app_participants";

export const StorageService = {
  save<T>(data: T[]): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Storage save error:", err);
    }
  },

  load<T>(): T[] {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch (err) {
      console.error("Storage load error:", err);
      return [];
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(KEY);
    } catch (err) {
      console.error("Storage clear error:", err);
    }
  },
};
