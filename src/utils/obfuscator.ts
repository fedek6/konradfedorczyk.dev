const PRIMES = [3, 5, 11, 13, 23];

export function obfuscate(str: string) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const p = PRIMES[i % PRIMES.length];
    out += String.fromCharCode(str.charCodeAt(i) + p);
  }
  return out.split("").reverse().join("") + "|" + PRIMES.join(",");
}

export function deobfuscate(s: string) {
  const [rev, key] = s.split("|");
  const primes = key ? key.split(",").map(Number) : PRIMES;
  const str = rev.split("").reverse().join("");
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const p = primes[i % primes.length];
    out += String.fromCharCode(str.charCodeAt(i) - p);
  }
  return out;
}

export function deobfuscateEmailString(s: string) {
  const cleanEmail = s.replace(/^mailto:/, "");
  const [prefix, suffix] = cleanEmail.split("@");
  return `mailto:${deobfuscate(prefix)}@${deobfuscate(suffix)}`;
}
