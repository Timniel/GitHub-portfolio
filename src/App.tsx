import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

import { SingleRepo } from "./repos/SingleRepo";
import { NotFound } from "./Not Found/NotFound";
import { RepoList } from "./repos/RepoList";
import { Card } from "@nextui-org/react";

const router = createBrowserRouter([
  {
    element: <ErrorBoundary />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <RepoList />,
      },
      {
        path: ":repoId",
        element: <SingleRepo />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="h-[100dvh] flex justify-center flex-col">
      <Card className="sm:h-[25rem] h-[24rem] md:w-[30rem] lg:w-[35rem] w-[22rem] sm:w-[30rem] mx-auto p-5 sm:p-10 bg-rose-600 flex flex-col justify-center">
        <RouterProvider router={router} />
      </Card>
    </div>
  );
};

export default App;
