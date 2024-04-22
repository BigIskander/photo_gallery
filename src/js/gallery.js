// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLarge = galleryLarge.querySelector(".gallery_large_image");

var galleryMinWidth = 650;
var galleryMaxWidth = 850;
var galleryHeight = 700;
var gallerySelectedMiniatureSize = 164; // miniature cube + border
var galleryMediaSwich = "(max-width: 850px), (max-height: 875px)";

if(window.matchMedia(galleryMediaSwich).matches) {
    var galleryMinWidth = 325;
    var galleryMaxWidth = 442;
    var galleryHeight = 350;
    var gallerySelectedMiniatureSize = 82; // miniature cube + border
}

var prevSelectedMiniature = undefined;
var isPrevLayoutLarge = false;
var overscrollCorrection = 5;

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
            if(gallery.getBoundingClientRect().width >= galleryMaxWidth) {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
                correctPositionVertical();
            } else {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_gorizontal";
                correctPositionGorizontal();
            }
        } else {
            galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
            correctPositionVertical();
        }
        isPrevLayoutLarge = true;
    });
    galleryMiniatures.appendChild(miniatureDiv);
}

function back() {
    if(prevSelectedMiniature) 
        prevSelectedMiniature.className = "miniature_wrap";
    prevSelectedPhoto = undefined;
    galleryLarge.className = "gallery_large gallery_large_hide";
    galleryMiniatures.className = "gallery_miniatures";
    isPrevLayoutLarge = false;
}

function correctPositionVertical() {
    var miniatureRelativePosition = prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
    } else if(miniatureRelativePosition - miniaturesScrolled >= galleryHeight - gallerySelectedMiniatureSize) {
        if(isPrevLayoutLarge)
            galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - galleryHeight + gallerySelectedMiniatureSize);
        else
            galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - gallerySelectedMiniatureSize * 2 - overscrollCorrection);
    }
}

function correctPositionGorizontal() {
    var miniatureRelativePosition = prevSelectedMiniature.offsetLeft - galleryMiniatures.offsetLeft;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollLeft;
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
    } else if(miniatureRelativePosition - miniaturesScrolled >= galleryMinWidth - gallerySelectedMiniatureSize) {
        if(isPrevLayoutLarge)
        {
            galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - galleryMinWidth + gallerySelectedMiniatureSize);
            if(window.matchMedia(galleryMediaSwich).matches)
                galleryMiniatures.parentElement.scrollLeft = galleryMiniatures.parentElement.scrollLeft + 3
        }
        else
            galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - gallerySelectedMiniatureSize * 2 - overscrollCorrection);
    }
}

window.addEventListener("resize", () => {
    if(window.matchMedia(galleryMediaSwich).matches) {
        galleryMinWidth = 325;
        galleryMaxWidth = 442;
        galleryHeight = 350;
        gallerySelectedMiniatureSize = 82; // miniature cube + border
    } else {
        galleryMinWidth = 650;
        galleryMaxWidth = 850;
        galleryHeight = 700;
        gallerySelectedMiniatureSize = 164; // miniature cube + border
    }
    if(galleryLarge.className == "gallery_large") {
        var scrollPostion = (galleryMiniatures.parentElement.scrollTop > 0) ? galleryMiniatures.parentElement.scrollTop : galleryMiniatures.parentElement.scrollLeft;
        if((galleryMiniatures.offsetTop - gallery.offsetTop) >= galleryMinWidth) { 
            if(gallery.getBoundingClientRect().width >= galleryMaxWidth) {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
                galleryMiniatures.parentElement.scrollTop = scrollPostion;
                correctPositionVertical();
            } else {
                galleryMiniatures.className = "gallery_miniatures gallery_miniatures_gorizontal";
                galleryMiniatures.parentElement.scrollLeft = scrollPostion;
                correctPositionGorizontal();
            }
        } else {
            galleryMiniatures.className = "gallery_miniatures gallery_miniatures_vertical";
            galleryMiniatures.parentElement.scrollTop = scrollPostion;
            correctPositionVertical();
        }
    }
});