var zoomed = false;

function zoomInImage(image) {
    zoomOutImage();
    zoomedImage = document.querySelector(".image_zoom");
    zoomedImagePreload = document.querySelector(".image_zoom_preload");
    zoomedImageLink = document.querySelector(".image_zoom_open_url");
    zoomedImageLink.setAttribute("href", image.src);
    // show load spinner
    spinner = document.getElementById("loadingSpinner")
    spinner.style.top = (window.scrollY + window.innerHeight/2 - 20) + "px"
    spinner.style.left = (window.innerWidth/2 - 20) + "px"
    // if larger image should load
    if(image.currentSrc && image.currentSrc!=image.src) {
      zoomedImagePreload.src = image.currentSrc
      if(!zoomedImagePreload.complete) spinner.style.visibility = "visible"
    } else {
      zoomedImage.src = image.src
      if(!zoomedImage.complete) spinner.style.visibility = "visible"
    }
    // calculate image position
    if(image.naturalHeight > (window.innerHeight * 0.9)
        || image.naturalWidth > (window.innerWidth * 0.9))
    {
        if(image.naturalHeight == image.naturalWidth)
        {
            zoomedImageHeight = window.innerHeight * 0.9;
            zoomedImageWidth = window.innerWidth * 0.9;
        } else if(image.naturalHeight > image.naturalWidth) {
            zoomedImageHeight = window.innerHeight * 0.9;
            zoomedImageWidth = image.naturalWidth * (zoomedImageHeight / image.naturalHeight);
            if(zoomedImageWidth > (window.innerWidth * 0.9)) {
              zoomedImageWidth = window.innerWidth * 0.9;
              zoomedImageHeight = image.naturalHeight * (zoomedImageWidth / image.naturalWidth);
            }
        } else {
            zoomedImageWidth = window.innerWidth * 0.9;
            zoomedImageHeight = image.naturalHeight * (zoomedImageWidth / image.naturalWidth);
            if(zoomedImageHeight > (window.innerHeight * 0.9)) {
              zoomedImageHeight = window.innerHeight * 0.9;
              zoomedImageWidth = image.naturalWidth * (zoomedImageHeight / image.naturalHeight);
            }
        }
    } else {
        zoomedImageHeight = image.naturalHeight;
        zoomedImageWidth = image.naturalWidth;
    }
    topAdjust = zoomedImageHeight >= (window.innerHeight * 0.9)
        ? window.innerHeight * 0.05 : (window.innerHeight - zoomedImageHeight) / 2;
    leftAdjust = zoomedImageWidth >= (window.innerWidth * 0.9)
        ? window.innerWidth * 0.05 : (window.innerWidth - zoomedImageWidth) / 2;
    // set images position
    zoomedImage.style.height = zoomedImageHeight + "px";
    zoomedImage.style.width = zoomedImageWidth + "px";
    zoomedImage.style.top = topAdjust + "px";
    zoomedImage.style.left = leftAdjust + "px";
    zoomedImagePreload.style.height = zoomedImageHeight + "px";
    zoomedImagePreload.style.width = zoomedImageWidth + "px";
    zoomedImagePreload.style.top = topAdjust + "px";
    zoomedImagePreload.style.left = leftAdjust + "px";
    // set parent element position
    zoomedImage.parentElement.style.top = window.scrollY + "px";
    zoomedImage.parentElement.style.left = window.scrollX + "px";
    zoomedImage.parentElement.style.height = window.innerHeight + "px";
    zoomedImage.parentElement.style.width = window.innerWidth + "px";
    // show image
    if(image.currentSrc && image.currentSrc!=image.src) {
      zoomedImagePreload.style.visibility = "visible";
      zoomedImagePreload.onload= () => { 
        zoomedImage.src=image.src
        if(!zoomedImage.complete) spinner.style.visibility = "visible"
        zoomedImage.onload = () => {
          zoomedImage.style.visibility = "visible"
          zoomedImagePreload.style.visibility = "hidden"
          spinner.style.visibility = "hidden"
        }
        zoomedImage.onerror = () => {
          spinner.style.visibility = "hidden"
        }
      }
      zoomedImagePreload.onerror = () => {
        spinner.style.visibility = "hidden"
      }
    } else {
      zoomedImage.style.visibility = "visible"
      zoomedImage.onload = () => {    
        spinner.style.visibility = "hidden"
      }
      zoomedImage.onerror = () => {
        spinner.style.visibility = "hidden"
      }
    }
    zoomedImage.parentElement.style.visibility = "visible";
    zoomed=true;
    // zoom out event listener
    setTimeout(() => {
      zoomedImage.addEventListener("click", zoomOutImage)
      zoomedImagePreload.addEventListener("click", zoomOutImage)
    }, 100);
}

function zoomOutImage() {
    if(zoomed) {
      zoomedImageLink = document.querySelector(".image_zoom_open_url");
      zoomedImageLink.removeAttribute("href");
      spinner = document.getElementById("loadingSpinner")
      spinner.style.visibility = "hidden"
      zoomedImage = document.querySelector(".image_zoom");
      zoomedImagePreload = document.querySelector(".image_zoom_preload");
      zoomedImage.setAttribute("src", "");
      zoomedImagePreload.setAttribute("src", "");
      zoomedImage.style.visibility = "hidden";
      zoomedImagePreload.style.visibility = "hidden";
      zoomedImage.parentElement.style.visibility = "hidden";
      zoomed=false;
      zoomedImage.removeEventListener("click", zoomOutImage);
      zoomedImagePreload.removeEventListener("click", zoomOutImage);
    }
}

function computeDimensions(width, height) {
  if(height > (window.innerHeight * 0.9)
    || width > (window.innerWidth * 0.9))
  {
    if(height == image.naturalWidth) {
      zoomedImageHeight = window.innerHeight * 0.9;
      zoomedImageWidth = window.innerWidth * 0.9;
    } else if(height > width) {
      zoomedImageHeight = window.innerHeight * 0.9;
      zoomedImageWidth = width * (zoomedImageHeight / height);
      if(zoomedImageWidth > (window.innerWidth * 0.9)) {
        zoomedImageWidth = window.innerWidth * 0.9;
        zoomedImageHeight = height * (zoomedImageWidth / width);
      }
    } else {
      zoomedImageWidth = width * 0.9;
      zoomedImageHeight = height * (zoomedImageWidth / width);
      if(zoomedImageHeight > (window.innerHeight * 0.9)) {
        zoomedImageHeight = window.innerHeight * 0.9;
        zoomedImageWidth = width * (zoomedImageHeight / height);
      }
    }
  } else {
    zoomedImageHeight = height;
    zoomedImageWidth = width;
  }
  topAdjust = zoomedImageHeight >= (window.innerHeight * 0.9)
    ? window.innerHeight * 0.05 : (window.innerHeight - zoomedImageHeight) / 2;
  leftAdjust = zoomedImageWidth >= (window.innerWidth * 0.9)
    ? window.innerWidth * 0.05 : (window.innerWidth - zoomedImageWidth) / 2;
  return {
    topAdjust: topAdjust,
    leftAdjust: leftAdjust,
    zoomedImageHeight: zoomedImageHeight,
    zoomedImageWidth: zoomedImageWidth
  };
}

window.addEventListener("resize", function() { zoomOutImage(); });
window.addEventListener("scroll", function() { zoomOutImage(); });