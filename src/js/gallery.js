// some variables


var gallery = document.getElementById("gallery");

gallery.style.flexDirection = "row";
gallery.style.flexWrap = "wrap";
gallery.parentElement.style.width = (700 + 160 + (2 * 2) + 16) + "px";

var largeImage = document.getElementById("getLargePart");
largeImage.style.visibility = "hidden";
largeImage.style.overflow = "clip";
largeImage.style.width = "0px";

gallery.style.flexWrap = "wrap";
gallery.style.height = "700px";

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
        // gallery.style.flexDirection = "column";
        // gallery.style.removeProperty("flex-wrap");
        gallery.style.width = 160 + (2 * 2) + 8 + "px";
        // gallery.style.removeProperty("width");
        gallery.parentElement.style.removeProperty("width");
        var imageLarge = document.getElementById("imageLarge");
        imageLarge.src = image.image;
        largeImage.style.visibility = "visible";
        largeImage.style.removeProperty("width");
    });
    gallery.appendChild(miniatureDiv);
}

function back() {
    largeImage.style.visibility = "hidden";
    largeImage.style.width = "0px";
    gallery.style.flexDirection = "row";
    gallery.style.flexWrap = "wrap";
    gallery.parentElement.style.width = (700 + 160 + (2 * 2) + 16) + "px";
}

function resize() {
    // var ok = document.getElementById("topElement");
    // console.log(ok.getBoundingClientRect());
}

// window.addEventListener("resize", resize);