import { useState } from 'react';
import { ImageGrid } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';
import { SearchBar } from './components/SearchBar';
import { UnsplashImage } from './types';
import { Camera } from 'lucide-react';
import { useImages } from './hooks/useImages';

function App() {
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: images, loading, error } = useImages(searchQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Camera size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Image Gallery</h1>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="text-red-500 text-center py-4">
            {error.message}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <ImageGrid images={images} onImageClick={setSelectedImage} />
        )}
      </main>

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

export default App;