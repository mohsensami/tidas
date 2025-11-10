"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      className="focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={toggleTheme}
      aria-label="تغییر حالت تم"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ModeToggle;
