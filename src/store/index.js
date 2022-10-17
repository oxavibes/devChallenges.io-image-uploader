import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    isSelecting: true,
    isUploading: false,
    isComplete: false,

    imgUrl: "",
    uploadProgress: 0,
  }),
  actions: {
    startUploading() {
      this.isSelecting = false;
      this.isUploading = true;
    },
    stopUploading() {
      this.isUploading = false;
      this.isComplete = true;
    },
  },
});

export default useStore;
