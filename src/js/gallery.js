// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLargeSpinnner = galleryLarge.querySelector(".sk-fading-circle");
var imageLarge = galleryLarge.querySelector(".gallery_large_image");
var bottomText = gallery.parentElement.querySelector(".gallery_bottom_text");

variables = {
    isBottomText: true,
    galleryName: "My gallery...", 
    sizes: {
        small: {
            galleryMinWidth: 325,
            galleryMaxWidth: 442,
            galleryHeight: 350,
            gallerySelectedMiniatureSize: 82, // miniature cube + border    
            overscrollCorrection: 9,
            underscrollCorrection: 3
        },
        large: {
            galleryMinWidth: 650,
            galleryMaxWidth: 850,
            galleryHeight: 700,
            gallerySelectedMiniatureSize: 164, // miniature cube + border
            overscrollCorrection: 5,
            underscrollCorrection: 0
        }
    },
    scrollToPosition: 2, // 0 - 2
    galleryMediaSwichSize: "(max-width: 850px), (max-height: 750px), (max-width: 1125px) and (max-height: 925px)",
    galleryMediaSwichLayout: "(max-width: 1122px)", 
    galleryMediaSmallSwichLayout: "(max-width: 581px)",
    isSmallLayout: false,
    isPreviousSmallLayout: false,
    isPrevLayoutLarge: false,
    isPrevLayoutGorizontal: false,
    prevSelectedMiniature: undefined,
    currentScroll: 0
}

variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
variables.isPreviousSmallLayout = variables.isSmallLayout;

if(variables.isBottomText) bottomText.innerText = variables.galleryName;

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
        if(variables.prevSelectedMiniature) 
            variables.prevSelectedMiniature.className = "gallery_miniature_wrap";
        variables.prevSelectedMiniature = miniatureDiv;
        miniatureDiv.className = "gallery_miniature_wrap gallery_miniature_wrap_selected";
        // change large image
        galleryLarge.className = "gallery_large";
        imageLargeSpinnner.className = "sk-fading-circle sk-fading-circle_hide";
        imageLarge.src = image.image;
        setTimeout(() => {
            if(imageLarge.complete) {
                imageLarge.className = "gallery_large_image";
            } else {
                imageLarge.className = "gallery_large_image gallery_large_image_hide";
                imageLargeSpinnner.className = "sk-fading-circle";
                imageLarge.onload = () => {
                    imageLargeSpinnner.className = "sk-fading-circle sk-fading-circle_hide";
                    imageLarge.className = "gallery_large_image";
                };
                imageLarge.onerror = () => {
                    imageLargeSpinnner.className = "sk-fading-circle sk-fading-circle_hide";
                }
            }
        }, 100);
        // change gallery layout gallery_miniatures_side
        galleryMiniatures.className = "gallery_miniatures gallery_miniatures_side";
        bottomText.className = "gallery_bottom_text gallery_bottom_text_large";
        if(isLayoutGorizontal()) {
            correctPositionGorizontal();
            variables.isPrevLayoutGorizontal = true;
            variables.currentScroll = galleryMiniatures.parentElement.scrollLeft;
        } else {
            correctPositionVertical();
            variables.isPrevLayoutGorizontal = false;
            variables.currentScroll = galleryMiniatures.parentElement.scrollTop;
        }
        //
        if(variables.isBottomText) bottomText.innerText = image.name;
        variables.isPrevLayoutLarge = true;
    });
    galleryMiniatures.appendChild(miniatureDiv);
}

function isLayoutGorizontal() {
    var isLargeGorizontal = (!window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSwichLayout).matches);
    var isSmallGorizontal = (window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSmallSwichLayout).matches);
    return (isLargeGorizontal || isSmallGorizontal);
}

function getSizes() {
    if(window.matchMedia(variables.galleryMediaSwichSize).matches)
        return variables.sizes.small;
    else
        return variables.sizes.large;
}

function back() {
    prevSelectedPhoto = undefined;
    galleryLarge.className = "gallery_large gallery_large_hide";
    imageLargeSpinnner.className = "sk-fading-circle sk-fading-circle_hide";
    galleryMiniatures.className = "gallery_miniatures";
    variables.isPrevLayoutLarge = false;
    var sizes = getSizes();
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
    galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize - sizes.overscrollCorrection);
    if(variables.prevSelectedMiniature) 
        variables.prevSelectedMiniature.className = "gallery_miniature_wrap";
    bottomText.className = "gallery_bottom_text";
    if(variables.isBottomText) bottomText.innerText = variables.galleryName;
}

function correctPositionVertical() {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - galleryMiniatures.offsetTop;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollTop;
    var sizes = getSizes();
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * variables.scrollToPosition - sizes.overscrollCorrection);
        return;
    }
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
        return;
    } 
    if(miniatureRelativePosition - miniaturesScrolled >= sizes.galleryHeight - sizes.gallerySelectedMiniatureSize) {
        galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.galleryHeight + sizes.gallerySelectedMiniatureSize);
    }
}

function correctPositionGorizontal() {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetLeft - galleryMiniatures.offsetLeft;
    var miniaturesScrolled = galleryMiniatures.parentElement.scrollLeft;
    var sizes = getSizes();
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * variables.scrollToPosition - sizes.overscrollCorrection);
        return;
    }
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
        return;
    } 
    if(miniatureRelativePosition - miniaturesScrolled >= sizes.galleryMinWidth - sizes.gallerySelectedMiniatureSize) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.galleryMinWidth + sizes.gallerySelectedMiniatureSize) + sizes.underscrollCorrection;
    }
}

window.addEventListener("resize", () => {
    variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
    if(variables.isPrevLayoutLarge) {
        if(isLayoutGorizontal()) {    
            if(!variables.isPrevLayoutGorizontal)
                galleryMiniatures.parentElement.scrollLeft = variables.currentScroll;
            correctPositionGorizontal();
            variables.isPrevLayoutGorizontal = true;
            variables.currentScroll = galleryMiniatures.parentElement.scrollLeft;
        } else {
            if(variables.isPrevLayoutGorizontal)
                galleryMiniatures.parentElement.scrollTop = variables.currentScroll;
            correctPositionVertical();
            variables.isPrevLayoutGorizontal = false;
            variables.currentScroll = galleryMiniatures.parentElement.scrollTop;
        }
    }
    variables.isPreviousSmallLayout = variables.isSmallLayout;
});