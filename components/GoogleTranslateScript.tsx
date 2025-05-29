import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Add google translate script
    const addScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Define global callback
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    addScript();

    return () => {
      // Cleanup:
      // Remove the script element if exists
      const script = document.getElementById("google-translate-script");
      if (script) {
        script.remove();
      }

      // Reset the global callback safely
      try {
        (window as any).googleTranslateElementInit = undefined;
      } catch {
        // If this throws, just ignore
      }

      // Also optionally clear the google translate div content if needed
      const container = document.getElementById("google_translate_element");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
