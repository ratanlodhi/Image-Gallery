import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  downloadUrl: string;
  fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadUrl, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <Download className="w-4 h-4" />
      <span>Download</span>
    </button>
  );
};