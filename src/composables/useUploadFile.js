import { ref, readonly } from "vue";
import axios from "axios";

export default (url, uploadProgress = 0) => {
  let fileUrl = ref("");
  let progress = ref(uploadProgress);

  const onUploadProgress = (event) => {
    progress.value = Math.round((event.loaded * 100) / event.total);
  };

  const uploadFile = async (file) => {
    let formData = new FormData();

    formData.append("file", file);

    const axiosOptions = { onUploadProgress };

    const { data } = await axios.post(url, formData, axiosOptions);

    fileUrl.value = data.url;
  };

  return {
    fileUrl: readonly(fileUrl),
    uploadFile,
  };
};
