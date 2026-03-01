const themeColours = {
    "dark": {
        "bg-colour": "#000000",
        "text-colour": "#CECECD",
        "type": "dark"
    },

    "grey": {
        "bg-colour": "#4A4A4D",
        "text-colour": "#D4D4D4",
        "type": "dark"
    },

    "light": {
        "bg-colour": "#FFFFFE",
        "text-colour": "#1B1B1A",
        "type": "light"
    },

    "sepia": {
        "bg-colour": "#F8F1E2",
        "text-colour": "#4D311B",
        "type": "light"
    },
}

var theme, currentFont
var fontList = [
    "Inter",
    "Roboto",
    "Space Grotesk",
    "JetBrains Mono"
]

function updateTheme(theme) {
    var root = document.querySelector(':root');

    root.style.setProperty("--bg-colour", themeColours[theme]["bg-colour"])
    root.style.setProperty("--text-colour", themeColours[theme]["text-colour"])
    
    let navbarLogo = document.getElementsByClassName("navbar-desktop-logo")[0]
    let navbarText = document.getElementsByClassName("navbar-desktop-theme")[0]
    let themeDropdown = document.getElementsByClassName("navbar-desktop-theme-dropdown")[0]

    

    if (window.location.pathname != "/blog/" || window.location.pathname != "/blog") {
        navbarLogo.style.color = themeColours[theme]["text-colour"]
        navbarText.style.color = themeColours[theme]["text-colour"]

        if (themeColours[theme]["type"] == "light") {
            themeDropdown.style.boxShadow = "1px 1px 2px #00000020, -1px -1px 2px #00000040"
        }

        else if (themeColours[theme]["type"] == "dark") {
            themeDropdown.style.boxShadow = "1px 1px 2px #ffffff20, -1px -1px 2px #ffffff40"
        }

    } 
    
    else {
        themeDropdown.style.background = "#1b1b1b"
    }

    highlightOption(theme)

    console.log(theme)
}

function setTheme(newTheme) {
    theme = newTheme
    localStorage.setItem("theme", theme);
    updateTheme(theme)
}

function loadThemeFromStorage(){
    let theme = localStorage.getItem("theme")

    if (!theme){
        theme = "dark"
        localStorage.setItem("theme", theme);
    }

    setTheme(theme)
}

function highlightOption(theme) {
    let themePicker = document.getElementsByClassName("navbar-theme-colour-options")[0]

    for (let option of themePicker.children) { 
        if (theme == option.dataset.theme) {
            option.style.borderWidth = "4px"
            option.style.borderColor = "#0091ff"
            option.style.borderStyle = "solid"
            option.style.boxSizing = "border-box"
        }

        else {
            option.style.borderStyle = "none"
            option.style.boxSizing = "border-box"
        }
    }
}

function highlightFont(font) {
    let fontLibrary = document.getElementsByClassName("navbar-theme-font-container")[0]

    for (let option of fontLibrary.children) { 
        if (font == option.dataset.font) {
            option.style.borderWidth = "5px"
            option.style.borderColor = "#0091ff"
            option.style.borderStyle = "solid"
            option.style.boxSizing = "border-box"
        }

        else {
            option.style.borderStyle = "none"
            option.style.boxSizing = "border-box"
        }
    }   
}

function loadFonts(){
    WebFont.load({  
        google: {
            families: fontList
        }
    })
}

function setFont(font) {
    var root = document.querySelector(':root');
    root.style.setProperty("--font-family", font)
    currentFont = font

    localStorage.setItem("font", font);

    highlightFont(font)
}

function addFontsToOptions() {
    loadFonts()

    let options = document.getElementById('navbar-theme-font-container')

    for (let font of fontList) {
        let fontOption = document.createElement("p")
        
        fontOption.classList.add('navbar-theme-font-option')
        fontOption.style.fontFamily = font
        fontOption.onclick = () => setFont(font)
        fontOption.onmouseenter = () => updateFontPreview(font)
        fontOption.onmouseleave = () => updateFontPreview(currentFont)
        fontOption.dataset.font = font

        let fontNode = document.createTextNode(font)
        fontOption.appendChild(fontNode)

        options.appendChild(fontOption)
    }
}

function loadFontFromStorage() {
    let storedFont = localStorage.getItem("font")

    if (!storedFont){
        storedFont = "Inter"
        localStorage.setItem("font", storedFont);
    }

    setFont(storedFont)
}

function updateThemePreview(theme) {
    preview = document.getElementsByClassName("navbar-theme-right")[0]

    preview.style.background = themeColours[theme]["bg-colour"]
    preview.style.color = themeColours[theme]["text-colour"]
}

function updateFontPreview(font) {
    preview = document.getElementsByClassName("navbar-theme-right")[0]

    preview.style.fontFamily = font
}

let themePicker = document.getElementsByClassName("navbar-theme-colour-options")[0]
for (let themes in themeColours) {  
    var option = document.createElement("div")

    option.classList.add("theme-option")
    option.style.background = themeColours[themes]["bg-colour"]
    option.title = themes
    option.onclick = () => setTheme(themes)
    option.onmouseover = () => updateThemePreview(themes)
    option.onmouseleave = () => updateThemePreview(theme)
    option.dataset.theme = themes

    themePicker.appendChild(option)
}

addFontsToOptions()

loadThemeFromStorage()
loadFontFromStorage()
