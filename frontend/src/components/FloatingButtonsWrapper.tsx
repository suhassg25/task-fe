import { useLocation } from "react-router-dom";
import FloatingButtons from "./FloatingButtons";

const FloatingButtonsWrapper = () => {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return <FloatingButtons />;
};

export default FloatingButtonsWrapper;