// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLarge = galleryLarge.querySelector(".gallery_large_image");

var galleryMinWidth = 650;
var galleryMaxWidth = 850;

var prevSelectedMiniature = undefined;

// create miniatures
for (const image of images) {
    const miniatureDiv = document.createElement("div");
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
        if(prevSelectedMiniature) 
            prevSelectedMiniature.className = "miniature_wrap";
        prevSelectedMiniature = miniatureDiv;
        miniatureDiv.className = "miniature_wrap miniature_wrap_selected";
        // change large image
        imageLarge.src = image.image;
        galleryLarge.className = "gallery_large";
        // change gallery layout
        if((galleryMiniatures.offsetTop - gallery.offsetTop) >= galleryMinWidth) {
            if(gallery.getBoundingClientRect().width >= galleryMaxWidth)
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
    if(prevSelectedMiniature) 
        prevSelectedMiniature.className = "miniature_wrap";
    prevSelectedPhoto = undefined;
    galleryLarge.className = "gallery_large gallery_large_hide";
    galleryMiniatures.className = "gallery_miniatures";
}

window.addEventListener("resize", () => {
    if(galleryLarge.className == "gallery_large") {
        var scrollPostion = (galleryMiniatures.parentElement.scrollTop > 0) ? galleryMiniatures.parentElement.scrollTop : galleryMiniatures.parentElement.scrollLeft;
        if((galleryMiniatures.offsetTop - gallery.offsetTop) >= galleryMinWidth) { 
            if(gallery.getBoundingClientRect().width >= galleryMaxWidth) {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
                galleryMiniatures.parentElement.scrollTop = scrollPostion;
                // correcting position of element
                var miniatureRelativePosition = prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
                var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
                if(miniatureRelativePosition - miniaturesScrolled < 0) {
                    galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
                } else if(miniatureRelativePosition - miniaturesScrolled >= 700 - 164) {
                    galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - 700 + 164);
                }
            } else {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_gorizontal";
                galleryMiniatures.parentElement.scrollLeft = scrollPostion;
                // correcting position of element
                var miniatureRelativePosition = prevSelectedMiniature.offsetLeft - galleryMiniatures.offsetLeft;
                var miniaturesScrolled = galleryMiniatures.parentElement.scrollLeft;
                if(miniatureRelativePosition - miniaturesScrolled < 0) {
                    galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
                } else if(miniatureRelativePosition - miniaturesScrolled >= galleryMinWidth - 164) {
                    galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - galleryMinWidth + 164);
                }
            }
        } else {
            galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
            galleryMiniatures.parentElement.scrollTop = scrollPostion;
            // correcting position of element
            var miniatureRelativePosition = prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
            var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
            if(miniatureRelativePosition - miniaturesScrolled < 0) {
                galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
            } else if(miniatureRelativePosition - miniaturesScrolled >= 700 - 164) {
                galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - 700 + 164);
            }
        }
    }
});