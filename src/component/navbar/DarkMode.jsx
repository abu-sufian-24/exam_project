import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

function DarkMode() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  let element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="cursor-pointer">
      {theme === "light" ? (
        <LuMoon className="text-divineGreen text-xl md:text-2xl" />
      ) : (
        <LuSun className="text-divineGreen text-xl md:text-2xl" />
      )}
    </div>
  );
}

export default DarkMode;
