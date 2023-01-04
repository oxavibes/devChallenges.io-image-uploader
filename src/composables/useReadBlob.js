export default () => {
  const blobToBase64 = async (url) => {
    const blob = await (await fetch(url)).blob();

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(blob);

      fileReader.onloadend = () => resolve(fileReader.result);

      fileReader.onerror = (e) => reject(e);
    });
  };

  return {
    blobToBase64,
  };
};
