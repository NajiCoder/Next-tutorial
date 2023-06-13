import { UnsplashImage } from "@/models/unsplash";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

// Add dynamic metadata to the page
export function generateMetadata({ params }: TopicPageProps): Metadata {
  return {
    title: params.topic,
    description: `This page shows images related to ${params.topic}`,
  };
}

// we can also set the fetched data to be only what specified in the generateStaticParams function
// export const dynamicParams = false; // now we can only generate the pages for the topics specified in the generateStaticParams function

// add topics to be generated on first build
export function generateStaticParams() {
  return ["Fittness", "coding"].map((topic) => ({ topic })); // note that generateStaticParams function works only in production mode
}

export default async function TopicPage({ params }: TopicPageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${params.topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const images: UnsplashImage[] = await response.json();

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in the generateStaticParams function will be
        fetched & renderd on first access and{" "}
        <strong>cached for future requests</strong>(this can be disabled).
      </Alert>

      <h1>{params.topic}</h1>
      {images.map((image) => {
        return (
          <div
            className="d-flex flex-column align-items-center"
            key={image.urls.raw}
          >
            <Image
              src={image.urls.raw}
              alt={image.description}
              width={250}
              height={250}
              className={styles.image}
            />
            <p>by {image.user.username}</p>
          </div>
        );
      })}
    </div>
  );
}
