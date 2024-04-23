// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLarge = galleryLarge.querySelector(".gallery_large_image");
var bottomText = gallery.parentElement.querySelector(".gallery_bottom_text");

var galleryMinWidth = 650;
var galleryMaxWidth = 850;
var galleryHeight = 700;
var gallerySelectedMiniatureSize = 164; // miniature cube + border
var galleryMediaSwichSize = "(max-width: 850px), (max-height: 750px), (max-width: 1125px) and (max-height: 925px)";
var galleryMediaSwichLayout = "(max-width: 1122px)";
var galleryMediaSmallSwichLayout = "(max-width: 581px)";
var isSmallLayout = false;

if(window.matchMedia(galleryMediaSwichSize).matches) {
    var galleryMinWidth = 325;
    var galleryMaxWidth = 442;
    var galleryHeight = 350;
    var gallerySelectedMiniatureSize = 82; // miniature cube + border
    var isSmallLayout = true;
}

var prevSelectedMiniature = undefined;
var isPrevLayoutLarge = false;
var overscrollCorrection = 5;

// create miniatures
for (const image of images) {
    const miniatureDiv = document.createElement("div");
    miniatureDiv.className = "gallery_miniature_wrap";
    var miniatureDivDiv = document.createElement("div");
    miniatureDivDiv.className = "gallery_miniature";
    miniatureDiv.appendChild(miniatureDivDiv);
    var miniatureImage = new Image();
    miniatureImage.src = image.miniature;
    miniatureImage.className = "gallery_miniature_image";
    miniatureDivDiv.appendChild(miniatureImage);
    // add event listener to miniature
    miniatureDiv.addEventListener("click", () => {
        if(prevSelectedMiniature) 
            prevSelectedMiniature.className = "gallery_miniature_wrap";
        prevSelectedMiniature = miniatureDiv;
        miniatureDiv.className = "gallery_miniature_wrap gallery_miniature_wrap_selected";
        // change large image
        imageLarge.src = image.image;
        galleryLarge.className = "gallery_large";
        // change gallery layout gallery_miniatures_side
        galleryMiniatures.className = "gallery_miniatures gallery_miniatures_side";
        bottomText.className = "gallery_bottom_text gallery_bottom_text_large";
        if((!isSmallLayout && window.matchMedia(galleryMediaSwichLayout).matches) || (isSmallLayout && window.matchMedia(galleryMediaSmallSwichLayout).matches)) {
                correctPositionGorizontal();
        } else {
                correctPositionVertical();
        }
        isPrevLayoutLarge = true;
    });
    galleryMiniatures.appendChild(miniatureDiv);
}

function back() {
    prevSelectedPhoto = undefined;
    galleryLarge.className = "gallery_large gallery_large_hide";
    galleryMiniatures.className = "gallery_miniatures";
    isPrevLayoutLarge = false;
    var miniatureRelativePosition = prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
    galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - gallerySelectedMiniatureSize - overscrollCorrection);
    if(prevSelectedMiniature) 
        prevSelectedMiniature.className = "gallery_miniature_wrap";
    bottomText.className = "gallery_bottom_text";
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
            if(window.matchMedia(galleryMediaSwichSize).matches)
                galleryMiniatures.parentElement.scrollLeft = galleryMiniatures.parentElement.scrollLeft + 3
        }
        else
            galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - gallerySelectedMiniatureSize * 2 - overscrollCorrection);
    }
}

window.addEventListener("resize", () => {
    if(window.matchMedia(galleryMediaSwichSize).matches) {
        galleryMinWidth = 325;
        galleryMaxWidth = 442;
        galleryHeight = 350;
        gallerySelectedMiniatureSize = 82; // miniature cube + border
        isSmallLayout = true;
    } else {
        galleryMinWidth = 650;
        galleryMaxWidth = 850;
        galleryHeight = 700;
        gallerySelectedMiniatureSize = 164; // miniature cube + border
        isSmallLayout = false;
    }
    if((!isSmallLayout && window.matchMedia(galleryMediaSwichLayout).matches) || (isSmallLayout && window.matchMedia(galleryMediaSmallSwichLayout).matches)) {
        correctPositionGorizontal();
    } else {
        correctPositionVertical();
    }
});