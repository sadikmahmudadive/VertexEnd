// Cloudinary Media Service Configuration & Utilities

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "vertexend-cloud",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "vertexend_unsigned"
};

/**
 * Open Cloudinary Upload Widget for Images and Videos
 */
export const openCloudinaryWidget = (onSuccessCallback) => {
  if (window.cloudinary) {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        sources: ['local', 'url', 'camera'],
        resourceType: 'auto', // accepts image and video
        clientAllowedFormats: ['png', 'jpeg', 'jpg', 'webp', 'mp4', 'mov', 'webm'],
        maxFileSize: 25000000, // 25MB
        styles: {
          palette: {
            window: "#0b0f19",
            sourceBg: "#0f172a",
            windowBorder: "#6366f1",
            tabIcon: "#06b6d4",
            inactiveTabIcon: "#64748b",
            menuBg: "#060913",
            link: "#06b6d4",
            action: "#6366f1",
            inProgress: "#3b82f6",
            complete: "#10b981",
            error: "#ef4444",
            textDark: "#000000",
            textLight: "#ffffff"
          }
        }
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Cloudinary Upload Success:", result.info);
          onSuccessCallback({
            url: result.info.secure_url,
            mediaType: result.info.resource_type, // 'image' or 'video'
            format: result.info.format,
            publicId: result.info.public_id,
            width: result.info.width,
            height: result.info.height
          });
        }
      }
    );
    widget.open();
  } else {
    console.warn("Cloudinary widget script loading...");
  }
};
