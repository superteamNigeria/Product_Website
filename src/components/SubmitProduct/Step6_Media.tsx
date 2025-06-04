import React from "react";

interface Props {
  data: any;
  onUpdate: (data: any) => void;
  errors?: Record<string, string>;
}

const Step6_Media = ({ data, onUpdate, errors }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(data.gallery || [])];
    newGallery[index] = value;
    onUpdate({ gallery: newGallery });
  };

  const addGalleryItem = () => {
    const currentGallery = data.gallery || [];
    onUpdate({ gallery: [...currentGallery, ""] });
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = (data.gallery || []).filter((_: any, i: number) => i !== index);
    onUpdate({ gallery: newGallery });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log("Files selected:", files);
      alert("File upload functionality would be implemented here. For now, please enter image URLs manually.");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-[#1E1E1E] dark:text-white">Media & Assets</h2>
      <div className="mt-2 h-[1px] bg-[#E2E4E9] w-full" />

      {/* Explainer Video */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Explainer Video:</label>
        <input
          name="explainerVideo"
          value={data.explainerVideo}
          onChange={handleChange}
          type="url"
          placeholder="e.g. https://youtube.com/watch?v=... or https://vimeo.com/..."
          className="w-full border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
        />
        {errors?.explainerVideo && (
          <p className="text-red-500 text-sm mt-1">{errors.explainerVideo}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Link to a video that demonstrates or explains your product</p>
      </div>

      {/* Gallery */}
      <div>
        <label className="block mb-1 font-medium dark:text-white">Product Gallery:</label>
        <p className="text-xs text-gray-500 mb-3">Upload screenshots, logos, or other images showcasing your product</p>

        {/* File Upload Option */}
        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="gallery-upload"
          />
          <label
            htmlFor="gallery-upload"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-full text-sm cursor-pointer border border-gray-300 transition"
          >
            📁 Upload Images
          </label>
          <p className="text-xs text-gray-500 mt-1">Or enter image URLs manually below</p>
        </div>

        {/* Manual URL Entry */}
        {(data.gallery && data.gallery.length > 0) ? (
          data.gallery.map((url: string, index: number) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="url"
                value={url}
                onChange={(e) => handleGalleryChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1} (e.g. https://example.com/image.jpg)`}
                className="flex-1 border border-[#E2E4E9] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#02834E] dark:bg-[#1E1E1E] dark:text-white"
              />
              <button
                type="button"
                onClick={() => removeGalleryItem(index)}
                className="text-red-500 hover:text-red-700 px-3"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-2">No images added yet</p>
            <button
              type="button"
              onClick={addGalleryItem}
              className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
            >
              + Add Image URL
            </button>
          </div>
        )}

        {data.gallery && data.gallery.length > 0 && (
          <button
            type="button"
            onClick={addGalleryItem}
            className="bg-[#02834E] text-white font-medium px-5 py-2 rounded-full text-sm hover:bg-green-700 transition"
          >
            + Add Another Image
          </button>
        )}

        {errors?.gallery && (
          <p className="text-red-500 text-sm mt-1">{errors.gallery}</p>
        )}
      </div>

      {/* Image Preview */}
      {data.gallery && data.gallery.length > 0 && (
        <div>
          <label className="block mb-1 font-medium">Preview:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery.map((url: string, index: number) => (
              url && (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Media Tips:</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Include high-quality screenshots of your product in action</li>
          <li>• Add your logo or branding images</li>
          <li>• Consider including before/after comparisons if relevant</li>
          <li>• Keep video explanations under 3 minutes for better engagement</li>
          <li>• Use images that are at least 1200px wide for best quality</li>
        </ul>
      </div>
    </div>
  );
};

export default Step6_Media;
