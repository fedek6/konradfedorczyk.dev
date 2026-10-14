/**
 * Copy text to the system clipboard.
 * @param text - the text to copy
 * @returns true on success, false on failure
 */
export async function copyToClipboard(text: string) {
  // 1) Preferred: async Clipboard API (requires secure context / user gesture)
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    /* fall through to legacy fallback */
  }

  // 2) Fallback: execCommand (deprecated, but works in non-secure contexts)
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
