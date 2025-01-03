import { UnsplashImage } from '../types';
import { motion } from 'framer-motion';

interface ImageGridProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  if (!Array.isArray(images)) {
    console.error('Expected images prop to be an array');
    return null;
  }

  if (images.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No images found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <motion.div
          key={image.id}
          layoutId={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.03 }}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
          onClick={() => onImageClick(image)}
        >
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash Image'}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-white text-sm truncate">{image.user.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}