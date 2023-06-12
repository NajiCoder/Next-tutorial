import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
  title: "Incremental Static Regeneration",
};

export const revaludate = 15;

export default async function IncrementalStaticRegenerationPage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      // the next method is not working, check it out later
      // next: { revalidate: 10 },
    }
  );

  const image: UnsplashImage = await response.json();

  // claculate the image size dynamically

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>Incremental static regeneration</strong>. A new
        image will be generated every 15 seconds after refreshing the page.
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
