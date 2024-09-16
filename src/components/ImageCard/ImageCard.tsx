import styles from "./ImageCard.module.css";

interface ImageCardProps {
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

export default function ImageCard({ imageUrl, alt, onClick }: ImageCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={alt} className={styles.image} />
    </div>
  );
}
