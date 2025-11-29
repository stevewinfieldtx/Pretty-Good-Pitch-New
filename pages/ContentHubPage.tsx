import React, { useState } from 'react';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  type: 'upload' | 'url';
}

const ContentHubPage: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([
    { id: '1', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', name: 'Dashboard Analytics', type: 'url' },
    { id: '2', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop', name: 'Team Meeting', type: 'url' },
    { id: '3', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop', name: 'Strategic Planning', type: 'url' },
  ]);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url,
        name: file.name,
        type: 'upload'
      };
      setImages([newImage, ...images]);
    }
  };

  const handleUrlUpload = () => {
    if (uploadUrl) {
      const newImage: ImageItem = {
        id: Date.now().toString(),
        url: uploadUrl,
        name: 'Linked Image',
        type: 'url'
      };
      setImages([newImage, ...images]);
      setUploadUrl('');
      setIsUrlModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Content Hub</h1>
          <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">Manage visual assets for your sales reports and presentations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsUrlModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined">link</span>
            Add via URL
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 cursor-pointer">
            <span className="material-symbols-outlined">upload</span>
            Upload Image
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Add Image via URL</h3>
            <input
              type="text"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-4 focus:ring-2 focus:ring-primary outline-none dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsUrlModalOpen(false)}
                className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg dark:text-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleUrlUpload}
                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90"
              >
                Add Image
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <img 
              src={image.url} 
              alt={image.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-sm font-medium truncate">{image.name}</p>
            </div>
            <button 
              onClick={() => setImages(images.filter(i => i.id !== image.id))}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        ))}
        {images.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <span className="material-symbols-outlined text-4xl mb-2">image</span>
            <p>No images yet. Upload one or add a URL to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentHubPage;