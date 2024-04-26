// some variables

function galleryCreate(id, images) {
    //create gallery
    var galleryWrap = document.getElementById(id);
    galleryWrap.className = "gallery_wrap";
    var galleryAndText = galleryWrap.appendChild(document.createElement("div"));
    galleryAndText.className = "gallery_and_text";
    var gallery = galleryAndText.appendChild(document.createElement("div"));
    gallery.className = "gallery";
    var galleryLarge = gallery.appendChild(document.createElement("div"));
    galleryLarge.className = "gallery_large gallery_large_hide"; //hide by default
    var galleryBack = galleryLarge.appendChild(document.createElement("div"));
    galleryBack.className = "gallery_back";
    var galleryBackLink = galleryBack.appendChild(document.createElement("a"));
    galleryBackLink.href = "JavaScript:void(0);";
    galleryBackLink.className = "gallery_back_link";
    galleryBackLink.innerText = "Назад к списку фото.";
    var galleryLargeContainerWrap = galleryLarge.appendChild(document.createElement("div"));
    galleryLargeContainerWrap.className = "gallery_large_container_wrap";
    var galleryLargeContainer = galleryLargeContainerWrap.appendChild(document.createElement("div"));
    galleryLargeContainer.className = "gallery_large_container";
    var galleryLargeImage = galleryLargeContainer.appendChild(document.createElement("img"));
    galleryLargeImage.className = "gallery_large_image";
    var galleryLargeSpinner = galleryLargeContainer.appendChild(document.createElement("div"));
    galleryLargeSpinner.className = "sk-fading-circle  sk-fading-circle_hide"; //hide by default
    for(var i = 0; i < 12; i++) {
        galleryLargeSpinner.appendChild(document.createElement("div")).className = "sk-circle" + (i + 1) + " sk-circle";
    }
    var galleryMiniaturesWrap = gallery.appendChild(document.createElement("div"));
    galleryMiniaturesWrap.className = "gallery_miniatures_wrap";
    var galleryMiniatures = galleryMiniaturesWrap.appendChild(document.createElement("div"));
    galleryMiniatures.className = "gallery_miniatures";
    var galleryBottomTextWrap = galleryAndText.appendChild(document.createElement("div"));
    galleryBottomTextWrap.className = "gallery_bottom_text_wrap";
    var galleryBottomText = galleryBottomTextWrap.appendChild(document.createElement("div"));
    galleryBottomText.className = "gallery_bottom_text";


    //
    // var galleryMiniatures = gallery.querySelector(".gallery_miniatures");

    // var galleryLarge = gallery.querySelector(".gallery_large");
    // galleryLarge.className = "gallery_large gallery_large_hide";

    // var galleryLargeSpinner = galleryLarge.querySelector(".sk-fading-circle"); //galleryLargeSpinner
    // var galleryLargeImage = galleryLarge.querySelector(".gallery_large_image"); //galleryLargeImage
    // var galleryBottomText = gallery.parentElement.querySelector(".gallery_bottom_text"); //galleryBottomText

    htmltags = {
        galleryMiniatures: galleryMiniatures, //ok
        galleryLarge: galleryLarge, //ok
        galleryLargeSpinner: galleryLargeSpinner, //ok
        galleryLargeImage: galleryLargeImage, //ok
        galleryBottomText: galleryBottomText //ok
    }

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

    galleryBackLink.onclick = () => { back(htmltags, variables) };
    variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
    variables.isPreviousSmallLayout = variables.isSmallLayout;
    if(variables.isBottomText) htmltags.galleryBottomText.innerText = variables.galleryName;

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
            htmltags.galleryLarge.className = "gallery_large";
            htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
            htmltags.galleryLargeImage.src = image.image;
            setTimeout(() => {
                if(htmltags.galleryLargeImage.complete) {
                    htmltags.galleryLargeImage.className = "gallery_large_image";
                } else {
                    htmltags.galleryLargeImage.className = "gallery_large_image gallery_large_image_hide";
                    htmltags.galleryLargeSpinner.className = "sk-fading-circle";
                    htmltags.galleryLargeImage.onload = () => {
                        htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
                        htmltags.galleryLargeImage.className = "gallery_large_image";
                    };
                    htmltags.galleryLargeImage.onerror = () => {
                        htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
                    }
                }
            }, 100);
            // change gallery layout gallery_miniatures_side
            htmltags.galleryMiniatures.className = "gallery_miniatures gallery_miniatures_side";
            htmltags.galleryBottomText.className = "gallery_bottom_text gallery_bottom_text_large";
            if(isLayoutGorizontal(variables)) {
                correctPositionGorizontal(htmltags, variables);
                variables.isPrevLayoutGorizontal = true;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollLeft;
            } else {
                correctPositionVertical(htmltags, variables);
                variables.isPrevLayoutGorizontal = false;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollTop;
            }
            //
            if(variables.isBottomText) htmltags.galleryBottomText.innerText = image.name;
            variables.isPrevLayoutLarge = true;
        });
        htmltags.galleryMiniatures.appendChild(miniatureDiv);
    }

    window.addEventListener("resize", () => {
        variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
        if(variables.isPrevLayoutLarge) {
            if(isLayoutGorizontal(variables)) {    
                if(!variables.isPrevLayoutGorizontal)
                    htmltags.galleryMiniatures.parentElement.scrollLeft = variables.currentScroll;
                correctPositionGorizontal(htmltags, variables);
                variables.isPrevLayoutGorizontal = true;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollLeft;
            } else {
                if(variables.isPrevLayoutGorizontal)
                    htmltags.galleryMiniatures.parentElement.scrollTop = variables.currentScroll;
                correctPositionVertical(htmltags, variables);
                variables.isPrevLayoutGorizontal = false;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollTop;
            }
        }
        variables.isPreviousSmallLayout = variables.isSmallLayout;
    });
}

function isLayoutGorizontal(variables) {
    var isLargeGorizontal = (!window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSwichLayout).matches);
    var isSmallGorizontal = (window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSmallSwichLayout).matches);
    return (isLargeGorizontal || isSmallGorizontal);
}

function getSizes(variables) {
    if(window.matchMedia(variables.galleryMediaSwichSize).matches)
        return variables.sizes.small;
    else
        return variables.sizes.large;
}

function back(htmltags, variables) {
    prevSelectedPhoto = undefined;
    htmltags.galleryLarge.className = "gallery_large gallery_large_hide";
    htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
    htmltags.galleryMiniatures.className = "gallery_miniatures";
    htmltags.galleryLargeImage.removeAttribute("src");
    variables.isPrevLayoutLarge = false;
    var sizes = getSizes(variables);
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - htmltags.galleryMiniatures.offsetTop;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollTop;
    htmltags.galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize - sizes.overscrollCorrection);
    if(variables.prevSelectedMiniature) 
        variables.prevSelectedMiniature.className = "gallery_miniature_wrap";
    htmltags.galleryBottomText.className = "gallery_bottom_text";
    if(variables.isBottomText) htmltags.galleryBottomText.innerText = variables.galleryName;
}

function correctPositionVertical(htmltags, variables) {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - htmltags.galleryMiniatures.offsetTop;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollTop;
    var sizes = getSizes(variables);
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        htmltags.galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * variables.scrollToPosition - sizes.overscrollCorrection);
        return;
    }
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        htmltags.galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
        return;
    } 
    if(miniatureRelativePosition - miniaturesScrolled >= sizes.galleryHeight - sizes.gallerySelectedMiniatureSize) {
        htmltags.galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.galleryHeight + sizes.gallerySelectedMiniatureSize);
    }
}

function correctPositionGorizontal(htmltags, variables) {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetLeft - htmltags.galleryMiniatures.offsetLeft;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollLeft;
    var sizes = getSizes(variables);
    if(!variables.isPrevLayoutLarge || (variables.isPreviousSmallLayout != variables.isSmallLayout)) {
        htmltags.galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize * variables.scrollToPosition - sizes.overscrollCorrection);
        return;
    }
    if(miniatureRelativePosition - miniaturesScrolled < 0) {
        htmltags.galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled);
        return;
    } 
    if(miniatureRelativePosition - miniaturesScrolled >= sizes.galleryMinWidth - sizes.gallerySelectedMiniatureSize) {
        htmltags.galleryMiniatures.parentElement.scrollLeft = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.galleryMinWidth + sizes.gallerySelectedMiniatureSize) + sizes.underscrollCorrection;
    }
}