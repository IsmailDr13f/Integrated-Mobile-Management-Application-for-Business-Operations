import create from "zustand";
import { persist } from "zustand/middleware";
let appstore = (set) =>({
dopen: true,
rows: [],
setRows: (rows) => set ((state) => ({ rows: rows })),
updateDopen: (dopen) => set((state) =>({ dopen: dopen })),
});
appstore = persist(appstore, { name: "cdot _store _api" });
export const useAppStore = create(appstore);