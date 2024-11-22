 # ITSeterraAddon

Welcome to **ITSeterraAddon**!

Per le traduzioni in **Italiano** vedere [Traduzioni in Italiano](https://github.com/Mucktros/ITSeterraAddon/blob/main/README.it.md)

Pro pravý **Český** překlad klikněte zde [Český překlad](https://github.com/Mucktros/ITSeterraAddon/blob/main/README.cs.md)

A special thanks to **NekoXIII** for creating the original SeterraAddon, which served as the foundation for this project.

---

## Features For Chrome ✨

**ITSeterraAddon** offers the following customization options for **Seterra**:

- **Dark Mode**: Switch to a dark theme for a more comfortable gaming experience.
- **Background**: Toggle the background on/off.
- **Reset**: **Space Reset** for quick game resets.
- **Center Map**: Center the map.
- **Top 10 Scores**: View your top 10 high scores to keep track of your progress.
- **Label**: Hide the cursor label.
- **Bold Names**: Toggle bold names on/off.
- **Flags**: Toggle flags on/off.
- **Names**: Toggle names on/off.
- **No Click on Text**: Disable clicks on text.
- **Down**: Move the extension controls further down the screen.
- **Font**: Use the old font style for a nostalgic feel.
- **Performance**: Removes unnecessary elements for better performance.
- **Skib**: Move the map around.

- **Auto Translations**: Changing languages will also change the extension features, but you can disable this by using the button under the extension features.

---
## Features For firefxo sigma afdusrt extnesion 0 lkag ✨

const toggleButtons = [
    {
        label: "Map Reset",
        onFunction: function() { document.addEventListener("keydown", spaceKeyDownHandler); },
        offFunction: function() { document.removeEventListener("keydown", spaceKeyDownHandler); },
        defaultState: true
    },
    {
        label: "Map water",
        onFunction: function() { if (document.getElementById(`WATER`)) { document.getElementById(`WATER`).style.fill = "#a4d1dc"; } if (document.getElementById(`BACKGROUND`)) { document.getElementById(`BACKGROUND`).style.fill = "#a4d1dc"; } if (document.getElementById(`WATER_1_`)) { document.getElementById(`WATER_1_`).style.fill = "#a4d1dc"; } if (document.getElementById(`WATER_2_`)) { document.getElementById(`WATER_2_`).style.fill = "#a4d1dc"; } if (document.getElementById(`WATER_3_`)) { document.getElementById(`WATER_3_`).style.fill = "#a4d1dc"; } },
        offFunction: function() { if (document.getElementById(`WATER`)) { document.getElementById(`WATER`).style.fill = "none"; } if (document.getElementById(`BACKGROUND`)) { document.getElementById(`BACKGROUND`).style.fill = "none"; } if (document.getElementById(`WATER_1_`)) { document.getElementById(`WATER_1_`).style.fill = "none"; } if (document.getElementById(`WATER_2_`)) { document.getElementById(`WATER_2_`).style.fill = "none"; } if (document.getElementById(`WATER_3_`)) { document.getElementById(`WATER_3_`).style.fill = "none"; } },
        defaultState: true
    },
    {
        label: "Map padding",
        onFunction: function() { if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) { let a = document.getElementsByClassName("extra-info_extraInfo__80Tci"); if (a[0]) { a[0].style.marginTop = "400px" }; } },
        offFunction: function() { if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) { let a = document.getElementsByClassName("extra-info_extraInfo__80Tci"); if (a[0]) { a[0].style.marginTop = "0px" }; } },
        defaultState: true
    },
    {
        label: "Image Bg.",
        onFunction: imgbgON,
        offFunction: imgbgOFF,
        defaultState: true
    },
    {
        label: "inc Label",
        onFunction: labelON,
        offFunction: labelOFF,
        defaultState: true
    },
    {
        label: "inc Names",
        onFunction: namesON,
        offFunction: namesOFF,
        defaultState: true
    },
    {
        label: "inc Bold",
        onFunction: boldON,
        offFunction: boldOFF,
        defaultState: true
    },
    {
        label: "inc Flags",
        onFunction: flagsON,
        offFunction: flagsOFF,
        defaultState: true
    },
    {
        label: "dis.col.",
        onFunction: function() { var style = document.createElement('style'); style.innerHTML = `.seterra_root__NV8MT { --seterra-color-green-dark: #1e8346 !important; }`; document.head.appendChild(style); },
        offFunction: function() { var style = document.createElement('style'); style.innerHTML = `.seterra_root__NV8MT { --seterra-color-green-dark: #166c38 !important; }`; document.head.appendChild(style); },
        defaultState: false
    }
## Installation For Chrome 📥

### Chromium Installation Instructions

1. Download the latest release from the [ITSeterraAddon GitHub Releases](https://github.com/Mucktros/ITSterraAddon/releases/latest) (make sure to **download the release, not the source code**).
2. Unzip the release folder to extract the files.
3. Open your browser's Extensions page:
    - In Chrome: Go to `chrome://extensions/`
    - In Edge: Go to `edge://extensions/`
4. Toggle **Developer mode** on (if it’s not already).
5. Click **Load unpacked**.
6. Select the folder you just unzipped.
7. The extension should now appear in your list of installed extensions.
8. Reload any open Seterra page to activate the extension.

And that's it!

---

## Credits 👏

- **NekoXIII** – For the original SeterraAddon, which laid the groundwork for this project.
- **Mucktros** – Developer of **ITSeterraAddon** with new features and customizations.
- **Afdusrt** - developer of the features: skib, and performance. Also the dev of Firefox version
