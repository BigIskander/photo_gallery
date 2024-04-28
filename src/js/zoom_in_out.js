var zoomed = false;

function zoomInImage(image) {
	zoomOutImage();
	imageZoomDiv = document.querySelector(".image_zoom_div");
	zoomedImage = imageZoomDiv.querySelector(".image_zoom");
	zoomedImagePreload = imageZoomDiv.querySelector(".image_zoom_preload");
	zoomedImageLink = imageZoomDiv.querySelector(".image_zoom_open_url");
	zoomedImageLink.setAttribute("href", image.src);
	loadingSpinner = imageZoomDiv.querySelector(".image_loading_spinner");
	//
	imageZoomDiv.style.top = window.scrollY + "px";
	imageZoomDiv.style.left = window.scrollX + "px";
	imageZoomDiv.style.width = window.innerWidth + "px";
	imageZoomDiv.style.height = window.innerHeight + "px";
	imageZoomDiv.style.visibility = "visible";
	zoomed = true;
	isImagePreload = false;
	zoomedImage.onload = function() {
		isImagePreload = true;
		loadingSpinner.style.visibility = "hidden";
		zoomedImagePreload.style.visibility = "hidden";
		zoomedImage.style.visibility = "visible";
	}
	zoomedImage.onerror = function() {
		isImagePreload = true;
		loadingSpinner.style.visibility = "hidden";
	}
	zoomedImagePreload.onload = function() {
		zoomedImage.src = image.src;
		zoomedImagePreload.style.visibility = "visible";
	}
	zoomedImagePreload.onerror = function() {
		isImagePreload = true;
		loadingSpinner.style.visibility = "hidden";
	}
	if(image.currentSrc && image.currentSrc!=image.src) {
		zoomedImagePreload.src = image.currentSrc;
	} else {
		zoomedImage.src = image.src;
	}
	setTimeout(function() {
		if(!isImagePreload) loadingSpinner.style.visibility = "visible";
	}, 200);
}

function zoomOutImage() {
	if(zoomed) {
		imageZoomDiv = document.querySelector(".image_zoom_div");
		zoomedImage = imageZoomDiv.querySelector(".image_zoom");
		zoomedImagePreload = imageZoomDiv.querySelector(".image_zoom_preload");
		zoomedImageLink = imageZoomDiv.querySelector(".image_zoom_open_url");
		loadingSpinner = imageZoomDiv.querySelector(".image_loading_spinner");
		//
		imageZoomDiv.style.visibility = "hidden";
		loadingSpinner.style.visibility = "hidden";
		zoomedImagePreload.style.visibility = "hidden";
		zoomedImage.style.visibility = "hidden";
		zoomedImagePreload.removeAttribute("src");
		zoomedImage.removeAttribute("src");
		zoomedImageLink.removeAttribute("href");
		imageZoomDiv.style.removeProperty("top");
		imageZoomDiv.style.removeProperty("left");
		imageZoomDiv.style.removeProperty("width");
		imageZoomDiv.style.removeProperty("height");
		zoomed = false;
	}
}

window.addEventListener("resize", function() { zoomOutImage(); });
window.addEventListener("scroll", function() { zoomOutImage(); });
