import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

interface Image {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string;
}

interface ModalData {
  src: string;
  alt: string;
}

const API_KEY = "iL2IBrKkXie1kCKFexoV46wTUJSu2yRAQTKH9VHLcts";
const BASE_URL = "https://api.unsplash.com/search/photos";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            query,
            page,
            client_id: API_KEY,
          },
        });
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (err) {
        setError("Failed to fetch images");
        toast.error("Error fetching images");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) {
      toast.error("Please enter a new search term");
      return;
    }
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (src: string, alt: string) => {
    setModalData({ src, alt });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />{" "}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}{" "}
      {modalData && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          data={modalData}
        />
      )}
      <Toaster />
    </div>
  );
}
