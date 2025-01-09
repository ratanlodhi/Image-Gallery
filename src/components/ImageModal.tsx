
import { UnsplashImage } from '../types';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadButton } from './DownloadButton';


interface ImageModalProps {
  image: UnsplashImage | null;
  onClose: () => void;
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X size={20} />
          </button>
          <img
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash Image'}
            className="w-full aspect-video object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{image.user.name}</h3>
            <DownloadButton
             downloadUrl={image.urls.regular} 
             fileName={image.id}
            />
            <p className="text-gray-600 mb-4">{image.description || image.alt_description}</p>
            <div className="text-sm text-gray-500">
              Posted on {new Date(image.created_at).toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}