var zoomed = false;

function zoomInImage(image) {
	zoomOutImage();
	zoomedImage = document.querySelector(".image_zoom");
	zoomedImagePreload = document.querySelector(".image_zoom_preload");
	zoomedImageLink = document.querySelector(".image_zoom_open_url");
	zoomedImageLink.setAttribute("href", image.src);
	
}

function zoomOutImage() {
	if(zoomed) {

	}
}

window.addEventListener("resize", function() { zoomOutImage(); });
window.addEventListener("scroll", function() { zoomOutImage(); });
