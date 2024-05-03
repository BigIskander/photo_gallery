# photo_gallery

[По русски](README.md)

This is the script of photogallery, written in JavaScript without using any framework.

Demonstration of how this script is working available on my websity [by this link](https://bigiskander.github.io/galleryscript) (in Russian).

## How to use:

In minimal case. In the **head** part of html document add:

```html
<link rel="stylesheet" href="/src/css/loading.css">
<link rel="stylesheet" href="/src/css/gallery.css">
<script src="/src/js/gallery.js"></script>
```

In the body of the document, where need to place the photogallery, add:

```html
<div id="gallery"></div>
<script>
    galleryCreate("gallery", images, "Моя фотогалерея.");
</script>
```

## Description of *galleryCreate* function

```javascript
galleryCreate(id, images, name="", zoomInFunction=undefined);
```

where:

***id*** - is the identificator (i.e. id) of div element, where gallery will be created;

***images*** - variable with the list of images in JSON format;

***name*** - name of the photogallery (not mandatory parameter);

***zoomInFunction*** - a function, wich will be called when click on the image (with size 640 pixels), to display even bigger size image (not mandatory parameter).

## Example of images variable

```javascript
const images = [
    { large: "/large/0.jpg", image: "/image/0.jpg", miniature: "/miniature/0.jpg", name: "Image 0." },
    { large: "/large/1.jpg", image: "/image/1.jpg", miniature: "/miniature/1.jpg", name: "Image 1." },
    ...
    { large: "/large/n.jpg", image: "/image/n.jpg", miniature: "/miniature/n.jpg", name: "Image n." }
]
```

where:

***large*** - is the large image, which will be used when call zoom in function (not mandatory parameter, in order to use this parameter *zoomInFunction* also should be set when calling *galleryCreate* function);

***image*** - is the image, which length and height is no more than 640 pixels;

***miniature*** - is the image, which length and height is no more than 150 pixels; 

***name*** - is the title of the image, which will be displayed under the image.

## Content of this repository

**index.html** - is the file, which was used as example while developing and testing photogallery script;

**shell_scripts** - the folder with scripts for Linux terminal, which can be used to:

1) ***add_watermark.sh*** - add watermars to images,
2) ***make_small_images.sh*** - create smaller copies of images,
3) ***make_json.sh*** - to create .js file with images variable;

**watermark** - folder with watermark image, which was used as example on my website;

**src** - folder with files necessary for photogallery script to work, I also included in this folder others scripts, which is used on my website https://bigiskander.github.io/

