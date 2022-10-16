import { ref, toRef, readonly } from "vue";
import axios from "axios";

export default (url) => {
  const URL = url;

  const progress = ref(0);

  const onUploadProgress = (event) => {
    progress.value = Math.round((event.loaded * 100) / event.total);
  };

  const uploadFile = async (fileChooser) => {
    // const URL = "http://localhost:3000/api/v1/images";

    let formData = new FormData();

    let files = Array.from(fileChooser.value.files);

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      await axios.post(URL, formData, { onUploadProgress });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    progress: readonly(progress),
    uploadFile,
    onUploadProgress,
  };
};
