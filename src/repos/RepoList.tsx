import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";

interface Repository {
  id: number;
  name: string;
}

export const RepoList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(repos.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return repos.slice(start, end);
  }, [page, repos]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<Repository[]>(
          "https://api.github.com/users/timniel/repos"
        );
        if (Array.isArray(response.data)) {
          setRepos(response.data);
        } else {
          setError("Invalid API response");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return <CircularProgress label="Loading..." className="self-center" />;
  }
  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">List of my repositories</h1>
      <Table
        aria-label="List of my repositories"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="danger"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="language">LANGUAGE</TableColumn>
        </TableHeader>

        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell
                  className=" cursor-pointer hover:bg-gray-100 hover:rounded-xl "
                  onClick={() =>
                    navigate(`${item.name}`, {
                      state: { name: item.name },
                    })
                  }
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
