import { Outlet } from "react-router-dom";

export const Repositories = () => {
  return (
    <div>
      <h1>Repositories</h1>
      <Outlet /> {/* Nested route components will render here */}
    </div>
  );
};
