// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLarge = galleryLarge.querySelector(".gallery_large_image");

// create miniatures
for (const image of images) {
    var miniatureDiv = document.createElement("div");
    miniatureDiv.className = "miniature_wrap";
    var miniatureDivDiv = document.createElement("div");
    miniatureDivDiv.className = "miniature";
    miniatureDiv.appendChild(miniatureDivDiv);
    var miniatureImage = new Image();
    miniatureImage.src = image.miniature;
    miniatureImage.className = "miniature_image";
    miniatureDivDiv.appendChild(miniatureImage);
    // add event listener to miniature
    miniatureDiv.addEventListener("click", () => {
        imageLarge.src = image.image;
        galleryLarge.className = "gallery_large";
        console.log(galleryMiniatures.offsetTop);
        if(galleryMiniatures.offsetTop >= 650) {
            if(gallery.getBoundingClientRect().width >= 850)
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
            else
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_gorizontal";
        } else {
            galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
        }
    });
    galleryMiniatures.appendChild(miniatureDiv);
}

function back() {
    galleryLarge.className = "gallery_large gallery_large_hide";
    galleryMiniatures.className = "gallery_miniatures"
}

window.addEventListener("resize", () => {
    if(galleryLarge.className == "gallery_large") {
        if(galleryMiniatures.offsetTop >= 650) { 
            if(gallery.getBoundingClientRect().width >= 850)
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
            else
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_gorizontal";
        } else {
            galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
        }
    }
});