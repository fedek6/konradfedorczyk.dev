import { atom } from "nanostores";

export type Theme = "dark" | "light";

const preferredTheme = localStorage.getItem("theme");
let dynamicTheme: Theme = "light";

if (preferredTheme === null) {
  dynamicTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
} else {
  dynamicTheme = preferredTheme == "light" ? "light" : "dark";
}

export const theme = atom<Theme>(dynamicTheme);
