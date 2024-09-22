var theme = undefined;

//Switch do dark | light theme before page load if set up
if(sessionStorage) {
    theme = sessionStorage.getItem("theme")
    if(!theme) {
        if(window.matchMedia) {
            if(window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark'
        }
    }
    if(!theme || theme == "light") {
        document.body.className = ''
        sessionStorage.setItem("theme", "light")
    } else {
        document.body.className = 'dark'
        sessionStorage.setItem("theme", "dark")
    }
}

//Swich theme by pressing button or link
function switch_theme() {
    if(sessionStorage) theme = sessionStorage.getItem("theme")
    if(!theme || theme == "light") {
        document.body.className = 'dark'
        if(sessionStorage) sessionStorage.setItem("theme", "dark")
    } else {
        document.body.className = ''
        if(sessionStorage) sessionStorage.setItem("theme", "light")
    }
}