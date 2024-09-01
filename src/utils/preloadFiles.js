function preloadFile(url) {
  return new Promise((resolve, reject) => {
    const fileType = url.split('.').pop().toLowerCase();

    if (fileType === 'jpg' || fileType === 'png' || fileType === 'gif') {
      // Preload images
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    } else if (fileType === 'mp4' || fileType === 'webm') {
      // Preload videos
      const video = document.createElement('video');
      video.src = url;
      video.onloadeddata = resolve;
      video.onerror = reject;
    } else {
      // Preload other file types (like GLB)
      fetch(url)
        .then(response => response.blob())
        .then(resolve)
        .catch(reject);
    }
  });
}


export function preloadFiles(urls) {
  const promises = urls.map(url => preloadFile(url));
  
  Promise.all(promises)
    .then(() => {
      console.log('All files preloaded');
      // Hide loading screen and show the UI
      document.querySelector('.loading-screen').classList.add('hide-loader')
      //document.querySelector('.loading-screen').style.display = 'block'

      //document.getElementById('mainUI').style.display = 'block';
    })
    .catch(error => console.error('Error preloading files:', error));
}