// some variables

var gallery = document.getElementById("gallery");
var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

var galleryLarge = gallery.querySelector(".gallery_large");
galleryLarge.className = "gallery_large gallery_large_hide";

var imageLarge = galleryLarge.querySelector(".gallery_large_image");
var bottomText = gallery.parentElement.querySelector(".gallery_bottom_text");

variables = {
    isBottomText: true, // ok
    galleryName: "My gallery...", //ok
    sizes: {
        small: {
            galleryMinWidth: 325,
            galleryMaxWidth: 442,
            galleryHeight: 350,
            gallerySelectedMiniatureSize: 82, // miniature cube + border    
            overscrollCorrection: 9
        },
        large: {
            galleryMinWidth: 650,
            galleryMaxWidth: 850,
            galleryHeight: 700,
            gallerySelectedMiniatureSize: 164, // miniature cube + border
            overscrollCorrection: 5
        }
    },
    galleryMediaSwichSize: "(max-width: 850px), (max-height: 750px), (max-width: 1125px) and (max-height: 925px)", //ok
    galleryMediaSwichLayout: "(max-width: 1122px)", //ok
    galleryMediaSmallSwichLayout: "(max-width: 581px)", //ok
    isSmallLayout: false, //ok
    isPreviousSmallLayout: false, //ok
    isPrevLayoutLarge: false, //ok
    prevSelectedMiniature: undefined, //ok
    currentScroll: 0 //ok
}

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
        imageLarge.src = image.image;
        galleryLarge.className = "gallery_large";
        // change gallery layout gallery_miniatures_side
        galleryMiniatures.className = "gallery_miniatures gallery_miniatures_side";
        bottomText.className = "gallery_bottom_text gallery_bottom_text_large";
        if(isLayoutGorizontal()) {
            correctPositionGorizontal();
            variables.currentScroll = galleryMiniatures.parentElement.scrollLeft;
        } else {
            correctPositionVertical();
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
    galleryMiniatures.className = "gallery_miniatures";
    variables.isPrevLayoutLarge = false;
    var sizes = getSizes();
    console.log(sizes);
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
    console.log(sizes);
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * 2 - sizes.overscrollCorrection);
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
    console.log(sizes)
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * 2 - sizes.overscrollCorrection);
        return;
    }
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
        return;
    } 
    if(miniatureRelativePosition - miniaturesScrolled >= sizes.galleryMinWidth - sizes.gallerySelectedMiniatureSize) {
        galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.galleryMinWidth + sizes.gallerySelectedMiniatureSize);
        if(window.matchMedia(variables.galleryMediaSwichSize).matches)
            galleryMiniatures.parentElement.scrollLeft = galleryMiniatures.parentElement.scrollLeft + 3; //correct underscrool
    }
}

window.addEventListener("resize", () => {
    if(variables.isPrevLayoutLarge) {
        if(isLayoutGorizontal()) {    
            galleryMiniatures.parentElement.scrollLeft = variables.currentScroll;
            correctPositionGorizontal();
            variables.currentScroll = galleryMiniatures.parentElement.scrollLeft;
        } else {
            galleryMiniatures.parentElement.scrollTop = variables.currentScroll;
            correctPositionVertical();
            variables.currentScroll = galleryMiniatures.parentElement.scrollTop;
        }
    }
    variables.isPreviousSmallLayout = variables.isSmallLayout;
});