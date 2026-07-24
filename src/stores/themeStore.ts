import { atom } from "nanostores";

export type Theme = "dark" | "light";

const currentTheme = localStorage.getItem("theme");

export const theme = atom<Theme>(currentTheme == "light" ? "light" : "dark");
