import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// imported font
import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
