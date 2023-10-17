import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white text-base">
      <p className="">404 - Not Found</p>{" "}
      <button onClick={() => navigate("/")}>&larr; Go back</button>
    </div>
  );
};
