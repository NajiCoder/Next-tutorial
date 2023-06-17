import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";

interface UsersPageProps {
  params: { username: string };
}

// seperate trhe api call in a seperate function
async function fetchUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) notFound();

  return await response.json();
}

// when we are using fetch, next will automically make only one request to the api if we are using the same url
// but if we are using another method like axios, we need to use the bulit in react cache
// const getUserCached = cache(fetchUser); // this will cache the function

// get metadata for the page
export async function generateMetadata({
  params: { username },
}: UsersPageProps): Promise<Metadata> {
  const user = await fetchUser(username);

  return {
    title:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username,
  };
}

export default async function UsersPage({
  params: { username },
}: UsersPageProps) {
  const user = await fetchUser(username);

  return (
    <div>
      <Alert>
        This page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>

      <h1>{user.username}</h1>
      <p>first name: {user.first_name}</p>
      <p>last name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash Profile</a>
    </div>
  );
}
