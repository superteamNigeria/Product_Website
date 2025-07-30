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
  const hasXLink =
    input.includes("https://x.com/") || /^@?[\w\d_]+$/.test(input);

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
