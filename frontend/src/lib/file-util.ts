import { uploadImage } from "@/actions/uploader.actions";

export const handleUploadFile = async (file: File | undefined) => {
  if (file) {
    const response = await uploadImage(file);
    return response?.data?.url;
  } else {
    return null;
  }
};
