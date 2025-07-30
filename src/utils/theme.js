export function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

export function initTheme() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    return "dark";
  } else {
    document.documentElement.classList.remove("dark");
    return "light";
  }
}

export function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength - 3) + "...";
  }
}

export function formatXLink(input) {
  const base = "https://x.com/";
  if (input.startsWith("https://x.com/")) return input;

  if (input.startsWith("@")) {
    return base + input.slice(1);
  }
  if (!input.includes("x.com")) {
    return base + input;
  }
  console.log(input);
  return input;
}
export function formatWebsiteLink(input) {
  if (!input) return "";

  let trimmed = input.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }

  return trimmed;
}
