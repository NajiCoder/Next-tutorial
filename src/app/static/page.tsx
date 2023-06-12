import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

// Add metadata to the page
export const metadata = {
  title: "Static Fetching",
  // keep the original description by not adding one
};

export default async function StaticPage() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY
  );

  const image: UnsplashImage = await response.json();

  // claculate the image size dynamically

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data build time</strong>. Even
        thoung the unsplash API always returns a new image, we see the same
        image on every page load unti we compile the project again.
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
