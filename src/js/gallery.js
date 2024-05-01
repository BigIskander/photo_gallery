// source: https://github.com/BigIskander/photo_gallery
// MIT License
// Copyright (c) 2024 Iskander Sultanov

function galleryCreate(id, images, name="", zoomInFunction = undefined) {
    //create gallery
    var backText = "Назад к списку фото.";
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
    galleryBackLink.innerText = backText;
    var galleryLargeContainerWrap = galleryLarge.appendChild(document.createElement("div"));
    galleryLargeContainerWrap.className = "gallery_large_container_wrap";
    var galleryLargeContainer = galleryLargeContainerWrap.appendChild(document.createElement("div"));
    galleryLargeContainer.className = "gallery_large_container";
    var galleryLargeImage = galleryLargeContainer.appendChild(document.createElement("img"));
    galleryLargeImage.className = "gallery_large_image";
    if(zoomInFunction) {
        galleryLargeImage.style.cursor = "zoom-in";
        galleryLargeImage.addEventListener("click", function() { zoomInFunction(this); });
    }
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

    var htmltags = {
        galleryMiniatures: galleryMiniatures,
        galleryLarge: galleryLarge,
        galleryLargeSpinner: galleryLargeSpinner,
        galleryLargeImage: galleryLargeImage,
        galleryBottomText: galleryBottomText
    }

    var variables = {
        isBottomText: true,
        galleryName: name, 
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
        galleryMediaSwichSize: "(max-width: 850px), (max-height: 750px), (max-width: 1136px) and (max-height: 925px)",
        galleryMediaSwichLayout: "(max-width: 1136px)", 
        galleryMediaSmallSwichLayout: "(max-width: 596px)",
        isSmallLayout: false,
        isPreviousSmallLayout: false,
        isPrevLayoutLarge: false,
        isPrevLayoutGorizontal: false,
        prevSelectedMiniature: undefined,
        currentScroll: 0
    }

    galleryBackLink.onclick = function() { galleryBackFunction(htmltags, variables) };
    variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
    variables.isPreviousSmallLayout = variables.isSmallLayout;
    if(variables.isBottomText) htmltags.galleryBottomText.innerText = variables.galleryName;

    // create miniatures
    for (const image of images) {
        const miniatureDiv = document.createElement("div");
        miniatureDiv.className = "gallery_miniature_wrap";
        const miniatureDivDiv = document.createElement("div");
        miniatureDivDiv.className = "gallery_miniature";
        miniatureDiv.appendChild(miniatureDivDiv);
        const miniatureImage = new Image();
        miniatureImage.src = image.miniature;
        miniatureImage.alt = image.name;
        miniatureImage.className = "gallery_miniature_image";
        // image loading
        setTimeout(function() {
            if(miniatureImage.complete) {
                miniatureDivDiv.appendChild(miniatureImage);
            } else {
                const gallerySmallSpinner = miniatureDivDiv.appendChild(document.createElement("div"));
                gallerySmallSpinner.className = "sk-fading-circle"; //hide by default  sk-fading-circle_hide
                for(var i = 0; i < 12; i++) {
                    gallerySmallSpinner.appendChild(document.createElement("div")).className = "sk-circle" + (i + 1) + " sk-circle";
                }
                miniatureImage.onload = function() {
                    gallerySmallSpinner.remove();
                    miniatureDivDiv.appendChild(miniatureImage);
                }
                miniatureImage.onerror = function() {
                    gallerySmallSpinner.remove();
                }
            }
        }, 100);
        // add event listener to miniature
        miniatureDiv.addEventListener("click", function() {
            if(variables.prevSelectedMiniature) 
                variables.prevSelectedMiniature.className = "gallery_miniature_wrap";
            variables.prevSelectedMiniature = miniatureDiv;
            miniatureDiv.className = "gallery_miniature_wrap gallery_miniature_wrap_selected";
            // change large image
            htmltags.galleryLarge.className = "gallery_large";
            htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
            if(zoomInFunction && image.large) {
                htmltags.galleryLargeImage.srcset=image.image + " 640w";
                htmltags.galleryLargeImage.src = image.large;
            } else {
                htmltags.galleryLargeImage.src = image.image;
            }
            htmltags.galleryLargeImage.alt = image.name;
            setTimeout(function() {
                if(htmltags.galleryLargeImage.complete) {
                    htmltags.galleryLargeImage.className = "gallery_large_image";
                } else {
                    htmltags.galleryLargeImage.className = "gallery_large_image gallery_large_image_hide";
                    htmltags.galleryLargeSpinner.className = "sk-fading-circle";
                    htmltags.galleryLargeImage.onload = function() {
                        htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
                        htmltags.galleryLargeImage.className = "gallery_large_image";
                    };
                    htmltags.galleryLargeImage.onerror = function() {
                        htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
                    }
                }
            }, 100);
            // change gallery layout gallery_miniatures_side
            htmltags.galleryMiniatures.className = "gallery_miniatures gallery_miniatures_side";
            htmltags.galleryBottomText.className = "gallery_bottom_text gallery_bottom_text_large";
            if(galleryIsLayoutGorizontal(variables)) {
                galleryCorrectPositionGorizontal(htmltags, variables);
                variables.isPrevLayoutGorizontal = true;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollLeft;
            } else {
                galleryCorrectPositionVertical(htmltags, variables);
                variables.isPrevLayoutGorizontal = false;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollTop;
            }
            //
            if(variables.isBottomText) htmltags.galleryBottomText.innerText = image.name;
            variables.isPrevLayoutLarge = true;
        });
        htmltags.galleryMiniatures.appendChild(miniatureDiv);
    }

    //add gorizontal scroll on wheel if browser supports
    if(htmltags.galleryMiniatures.parentElement.onwheel !== undefined) 
        htmltags.galleryMiniatures.parentElement.addEventListener("wheel", function(event) {
            if(variables.prevSelectedMiniature) {
                if(galleryIsLayoutGorizontal(variables)) {
                    event.preventDefault();
                    var moveLeft = (event.deltaX != 0) ? event.deltaX : event.deltaY;
                    htmltags.galleryMiniatures.parentElement.scrollLeft = htmltags.galleryMiniatures.parentElement.scrollLeft + moveLeft;
                }
            }
        });

    window.addEventListener("resize", function() {
        variables.isSmallLayout = window.matchMedia(variables.galleryMediaSwichSize).matches;
        if(variables.isPrevLayoutLarge) {
            if(galleryIsLayoutGorizontal(variables)) {    
                if(!variables.isPrevLayoutGorizontal)
                    htmltags.galleryMiniatures.parentElement.scrollLeft = variables.currentScroll;
                galleryCorrectPositionGorizontal(htmltags, variables);
                variables.isPrevLayoutGorizontal = true;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollLeft;
            } else {
                if(variables.isPrevLayoutGorizontal)
                    htmltags.galleryMiniatures.parentElement.scrollTop = variables.currentScroll;
                galleryCorrectPositionVertical(htmltags, variables);
                variables.isPrevLayoutGorizontal = false;
                variables.currentScroll = htmltags.galleryMiniatures.parentElement.scrollTop;
            }
        }
        variables.isPreviousSmallLayout = variables.isSmallLayout;
    });
}

function galleryIsLayoutGorizontal(variables) {
    var isLargeGorizontal = (!window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSwichLayout).matches);
    var isSmallGorizontal = (window.matchMedia(variables.galleryMediaSwichSize).matches && window.matchMedia(variables.galleryMediaSmallSwichLayout).matches);
    return (isLargeGorizontal || isSmallGorizontal);
}

function galleryGetSizes(variables) {
    if(window.matchMedia(variables.galleryMediaSwichSize).matches)
        return variables.sizes.small;
    else
        return variables.sizes.large;
}

function galleryBackFunction(htmltags, variables) {
    prevSelectedPhoto = undefined;
    htmltags.galleryLarge.className = "gallery_large gallery_large_hide";
    htmltags.galleryLargeSpinner.className = "sk-fading-circle sk-fading-circle_hide";
    htmltags.galleryMiniatures.className = "gallery_miniatures";
    htmltags.galleryLargeImage.removeAttribute("src");
    htmltags.galleryLargeImage.removeAttribute("srcset");
    htmltags.galleryLargeImage.removeAttribute("alt");
    variables.isPrevLayoutLarge = false;
    var sizes = galleryGetSizes(variables);
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - htmltags.galleryMiniatures.offsetTop;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollTop;
    htmltags.galleryMiniatures.parentElement.scrollTop = miniaturesScrolled + (miniatureRelativePosition - miniaturesScrolled - sizes.gallerySelectedMiniatureSize - sizes.overscrollCorrection);
    if(variables.prevSelectedMiniature) 
        variables.prevSelectedMiniature.className = "gallery_miniature_wrap";
    variables.prevSelectedMiniature = undefined;
    htmltags.galleryBottomText.className = "gallery_bottom_text";
    if(variables.isBottomText) htmltags.galleryBottomText.innerText = variables.galleryName;
}

function galleryCorrectPositionVertical(htmltags, variables) {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetTop - htmltags.galleryMiniatures.offsetTop;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollTop;
    var sizes = galleryGetSizes(variables);
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

function galleryCorrectPositionGorizontal(htmltags, variables) {
    var miniatureRelativePosition = variables.prevSelectedMiniature.offsetLeft - htmltags.galleryMiniatures.offsetLeft;
    var miniaturesScrolled = htmltags.galleryMiniatures.parentElement.scrollLeft;
    var sizes = galleryGetSizes(variables);
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