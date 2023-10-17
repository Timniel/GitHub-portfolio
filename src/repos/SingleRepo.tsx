import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Code,
  Divider,
  Link,
} from "@nextui-org/react";

interface Repository {
  name: string;
  description: string | null;
  language: string | null;
  owner: {
    login: string;
  } | null;
  stargazers_count: number;
  forks_count: number;
  clone_url: number;
  topics: [];
  svn_url: string;
}

export const SingleRepo = () => {
  const [repoData, setRepoData] = useState<Repository | null>(null);
  const location = useLocation();
  const name = location.state?.name;
  const { repoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await axios.get<Repository>(
          `https://api.github.com/repos/Timniel/${repoId}`
        );
        setRepoData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [repoId]);

  useEffect(() => {
    document.title = `${name}`;
  }, []);

  if (loading) {
    return (
      <CircularProgress
        color="primary"
        label="Loading..."
        className="self-center"
      />
    );
  }
  if (error) {
    throw error;
  }

  return (
    <Card className="">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{repoData?.name}</h2>
          <p className="text-small text-default-500 ">github.com</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        <p className="text-lg font-normal italic">
          {repoData?.description || "No description available"}
        </p>
        <p className="flex gap-1">
          <span className="font-semibold">Clone </span>
          <Code className=" overflow-y-auto">{repoData?.clone_url}</Code>
        </p>
        <p>
          <span className="font-semibold">Tags </span>
          {repoData?.topics.map(
            (tag: [], index: number) =>
              index < 5 && (
                <Chip key={index} color="danger" variant="flat" className="m-1">
                  {tag}
                </Chip>
              )
          )}
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={repoData?.svn_url}>
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  );
};
