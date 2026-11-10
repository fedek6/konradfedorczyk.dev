import { copyToClipboard } from "./browser";

const LABEL = "Copy code to clipboard";
const COPIED_LABEL = "Copied!";

document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest<HTMLButtonElement>("[data-copy-button]");
  if (!button) return;

  const code = button.closest("[data-code-wrapper]")?.querySelector("pre code") as HTMLPreElement;
  const text = code?.innerText?.trimEnd();
  if (!text) return;

  await copyToClipboard(text);
  const label = button.querySelector("span");
  button.dataset.copied = "true";
  button.setAttribute("aria-label", COPIED_LABEL);
  button.setAttribute("title", COPIED_LABEL);
  if (label) label.textContent = COPIED_LABEL;

  setTimeout(() => {
    button.dataset.copied = "false";
    button.setAttribute("aria-label", LABEL);
    button.setAttribute("title", LABEL);
    if (label) label.textContent = "Copy code";
  }, 2000);
});
