// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

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
        galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical"
        var imageLarge = galleryLarge.querySelector(".gallery_large_image");
        imageLarge.src = image.image;
        galleryLarge.className = "gallery_large";
    });
    galleryMiniatures.appendChild(miniatureDiv);
}

function back() {
    galleryLarge.className = "gallery_large gallery_large_hide";
    galleryMiniatures.className = "gallery_miniatures"
}

function resize() {
    // var ok = document.getElementById("topElement");
    // console.log(ok.getBoundingClientRect());
}

// window.addEventListener("resize", resize);