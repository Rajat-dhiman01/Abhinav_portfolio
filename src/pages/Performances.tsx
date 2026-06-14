import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Performances = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/gallery", { replace: true });
  }, [navigate]);

  return null;
};

export default Performances;