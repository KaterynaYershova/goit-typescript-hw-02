import styles from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (src: string, alt: string) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={styles.item}>
          <ImageCard
            imageUrl={urls.small}
            alt={alt_description}
            onClick={() => onImageClick(urls.regular, alt_description)}
          />
        </li>
      ))}
    </ul>
  );
}
