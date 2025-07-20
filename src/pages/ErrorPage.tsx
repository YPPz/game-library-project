import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Something went wrong.</h1>
      <p>{(error as Error).message}</p>
      <Link to="/" className="text-blue-500 mt-4 inline-block">Go back home</Link>
    </div>
  );
}
