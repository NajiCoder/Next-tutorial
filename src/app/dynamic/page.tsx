import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Dynamic Fetching",
};

// export const revaludate = 0;

export default async function DynamicPage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      cache: "no-cache", // this will disable the cache, and return a new image every time
      // we can also use next's revalidate to do this
      // next: { revalidate: 0 },
    }
  );

  const image: UnsplashImage = await response.json();

  // claculate the image size dynamically

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically</strong>. Every time you
        refresh the page, you will get a new image from the unsplash API.
      </Alert>
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
        className="rounded shadow mw-100 h-100"
      />
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
}
