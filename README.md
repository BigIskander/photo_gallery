# photo_gallery

Это скрипт фотогалереи написанный на ванильном JavaScript (т.е. без применения какого либо фреймворка).

Демонстрация работы этого скрипта доступна на моем сайте по [этой ссылке](https://bigiskander.github.io/galleryscript).

## Как использовать:

В минимальном варианте. В раздел **head**, html документа, добавить:

```html
<link rel="stylesheet" href="/src/css/loading.css">
<link rel="stylesheet" href="/src/css/gallery.css">
<script src="/src/js/gallery.js"></script>
```

В теле документа, там где нужно разместить фотогалерею, добавить:

```html
<div id="gallery"></div>
<script>
    galleryCreate("gallery", images, "Моя фотогалерея.");
</script>
```

## Описание функции *galleryCreate*

```javascript
galleryCreate(id, images, name="", zoomInFunction=undefined);
```

где:

***id*** - это идентификатор (т.е. id) div элемента в котором будет создаваться галлерая;

***images*** - переменная со списком изображений в формете JSON;

***name*** - это название фотогалереи (необязательный параметр);

***zoomInFunction*** - функция которая вызывается при нажатии на изображение (размером 640 пикселей), для отображения еще большего размера (необязательный параметр).

## Пример переменной images

```javascript
const images = [
    { large: "/large/0.jpg", image: "/image/0.jpg", miniature: "/miniature/0.jpg", name: "Image 0." },
    { large: "/large/1.jpg", image: "/image/1.jpg", miniature: "/miniature/1.jpg", name: "Image 1." },
    ...
    { large: "/large/n.jpg", image: "/image/n.jpg", miniature: "/miniature/n.jpg", name: "Image n." }
]
```

где: 

***large*** - большое изображение, которое будет будет использоваться при вызове функции увеличения (необязательный параметр, чтобы использовался этот параметр функция *zoomInFunction* тоже должна быть указана при вызове функции *galleryCreate*);

***image*** - изображение, размеры которого по длине и ширине не превышают 640 пикселей;

***miniature*** - изображение, размеры которого по длине и ширине не превышают 150 пикселей;

***name*** - подпись, которая будет отображаться под изображением.

## Содержимое репозитория

**index.html** - файл, который использовался как пример при разработке и тестировании скрипта фотогалереи;

**shell_scripts** - папка со скриптами для коммандной строки Linux, которые можно использовать: 

1) ***add_watermark.sh*** - для добавления водяного знака к изображениям,
2) ***make_small_images.sh*** - для создания уменьшенных копий изображений,
3) ***make_json.sh*** - для создания .js файла с переменной images;

**watermark** - папка с изображением водяного знака, который использовался для примера на моем сайте;

**src** - файлы обеспечивающие работу скрипта фотогалереи, я так же включил в эту папку некоторые другие скрипты применяющиеся на моем сайте https://bigiskander.github.io/
