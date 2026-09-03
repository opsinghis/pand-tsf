import { createRoot } from "react-dom/client";
// CSS imported centrally so cascade order is explicit and the tsx-based SSR
// smoke can import App. Order: tokens -> base -> shared component css -> the
// alternative narrative css -> responsive last.
import "./styles/tokens.css";
import "./styles/base.css";
import "./components/TopNav.css";
import "./components/Hero.css";
import "./components/FabricSection.css";
import "./components/BaselineSection.css";
import "./components/LaneSection.css";
import "./components/GatesSection.css";
import "./components/ClosingSections.css";
import "./components/LandscapeMap.css";
import "./components/alternative.css";
import "./styles/responsive.css";
import App from "./App";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
