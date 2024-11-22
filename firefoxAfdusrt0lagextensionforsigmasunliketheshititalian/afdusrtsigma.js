function modifyUrl(url) {
  const urlObj = new URL(url);
  if (urlObj.pathname.includes('/vgp/') && !urlObj.pathname.includes('placethelabels')) {
    urlObj.searchParams.set('gamemode', 'placethelabels');
    return urlObj.href;
  }
  return url;
}
function ptl() { const currentUrl = window.location.href; const modifiedUrl = modifyUrl(currentUrl); if (modifiedUrl !== currentUrl) { window.location.href = modifiedUrl; } }
function spaceKeyDownHandler(event) {
    if (event.code == "Space") {
        event.preventDefault();
        if (document.querySelectorAll('button.button_button__aR6_e.button_variantPrimary__u3WzI')[0]) {
            document.querySelectorAll('button.button_button__aR6_e.button_variantPrimary__u3WzI')[0].click();
            function skibio() { if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) { document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "none"; } }
        }
        else {
            document.querySelectorAll("button.button_button__aR6_e.button_variantSecondaryInverted__6G2ex.button_sizeSmall__MB_qj")[1].click();
            function skibio() { if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) { document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "none"; } }
        }
    }
}
function skib() {
let userInput = prompt("just fully skib out here dawg (often: 0 0 900 700 (x offset  y offset  width  height)");
if (userInput) {
    const svgElement = document.getElementById('svgpoint');
    svgElement.setAttribute('viewBox', userInput);
	}
}
function imgbgON() {
  let existingStyle = document.getElementById('dynamic-style');
  if (existingStyle) {
    existingStyle.remove();
  }
  var style = document.createElement('style');
  style.id = 'dynamic-style';
  const backgroundImage = browser.runtime.getURL('images/GameBackground.png');
  style.innerHTML = `
      .seterra_content__nGh5_ {
        background: none !important;
        background-image: url('${backgroundImage}') !important;
        background-size: cover !important;
        background-position: center !important;
        color: white !important;
      }

      .seterra_main__mwfLw {
        background: none !important;
        color: white !important;
      }
      .button_button__aR6_e {
        color: black !important;
	  }
    `;
  document.head.appendChild(style);
}
function imgbgOFF() {
  let existingStyle = document.getElementById('dynamic-style');
  if (existingStyle) {
    existingStyle.remove();
  }
  var style = document.createElement('style');
  style.id = 'dynamic-style';
  const backgroundImage = browser.runtime.getURL('images/GameBackground.png');
  style.innerHTML = `
      .seterra_content__nGh5_ {
        background: #000000 !important;
        background-image: none !important;
        background-size: cover !important;
        background-position: center !important;
        color: black !important;
      }

      .seterra_main__mwfLw {
        background: #000000 !important;
        color: black !important;
      }
      .button_button__aR6_e {
        color: white !important;
	  }
    `;
  document.head.appendChild(style);
}
function ptlsettings() {
	namesOFF();
	labelOFF();
	flagsOFF();
}

function labelON() { if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) { document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "block"; } }
function labelOFF() { if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) { document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "none"; } }
        
function namesON() { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0]) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].style.display = "block"; } } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.paddingLeft = "8px"; } if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) { document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].style.display = "block" } }
function namesOFF() { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].childNodes[0]) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].style.display = "none"; } } } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.paddingLeft = "0px"; } if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) { document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].style.display = "none" } }

function boldON() { if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) { document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].children[0].style.fontWeight = "bold"; } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong')) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight = "bold"; if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight == "bold") { boldNamesOopsie = false; } } } } }
function boldOFF() { if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) { document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].children[0].style.fontWeight = "normal"; } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong')) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight = "normal"; if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight == "normal") { boldNamesOopsie = false; } } } } }

function flagsON() { if (document.getElementsByClassName('corner-image_wrapper__ej_p1')[0]) { document.getElementsByClassName('corner-image_wrapper__ej_p1')[0].style.display = "flex"; } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img')) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img').style.display = "flex"; } } }
function flagsOFF() { if (document.getElementsByClassName('corner-image_wrapper__ej_p1')[0]) { document.getElementsByClassName('corner-image_wrapper__ej_p1')[0].style.display = "none"; } if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) { if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img')) { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img').style.display = "none"; } } }

function removeElements(selectors) {
    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(element => element.remove());
}
function perf() {
    const selectors = [
        '.notifications_root__q0A7_',
        '.seterra_outStreamMwAd___XU6M',
        '.seterra_adContainerLeft__zTLsS',
        '.seterra_adContainerRight__lDew4',
        '.ad_wrapper__3DZ7k',
        '.header_root__tDHgF',
        '.footer_root__wR7Ju',
        '.breadcrumbs_breadcrumbs__PokUc',
        '.area-list_section__lcD0H',
        '.game-page_title__t3F0F',
        '.headline_heading__2lf9L',
        '.game-footer_legend__dPwkj',
        '.highscore_heading__mqofP',
        '.choose-question-button_flex__uFznI',
        '.game-footer_left__G4e4s',
        'article',
        'p'
    ];
    removeElements(selectors);
}
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
];
let toggleButtonStates = [];
function createForm() {
    if (!document.getElementById("SkibAddon")) {
        const skibMain = document.createElement("div");
        skibMain.id = "SkibAddon";
        skibMain.style = "position: fixed; color: white; top: 0px; left: 0px; zIndex: 1000; display: flex;"
        skibMain.style.backgroundImage = `url(${browser.runtime.getURL("images/MenuBackground.png")})`;
        skibMain.style.backgroundSize = "cover"
		skibMain.style.backgroundPosition = "center";
        skibMain.style.flexDirection = "column";
const ptlButton = document.createElement("button");
ptlButton.textContent = "PTL url";
ptlButton.style = "cursor: pointer; background-color: #ccc; color: #333; border: 1px solid #999; border-radius: 4px; padding: 4px 16px; font-size: 14px; margin: 4px;"
ptlButton.addEventListener("click", ptl);
ptlButton.addEventListener("mouseover", () => {
    ptlButton.style.backgroundColor = "#bbb";
});
ptlButton.addEventListener("mouseout", () => {
    ptlButton.style.backgroundColor = "#ccc";
});
skibMain.appendChild(ptlButton);
const perfButton = document.createElement("button");
perfButton.textContent = "Performance";
perfButton.style = "cursor: pointer; background-color: #ccc; color: #333; border: 1px solid #999; border-radius: 4px; padding: 4px 16px; font-size: 14px; margin: 4px;"
perfButton.addEventListener("click", perf);
perfButton.addEventListener("mouseover", () => {
    perfButton.style.backgroundColor = "#bbb";
});
perfButton.addEventListener("mouseout", () => {
    perfButton.style.backgroundColor = "#ccc";
});
skibMain.appendChild(perfButton);
const skibButton = document.createElement("button");
skibButton.textContent = "Skib Out Dawg";
skibButton.style = "cursor: pointer; background-color: #ccc; color: #333; border: 1px solid #999; border-radius: 4px; padding: 4px 16px; font-size: 14px; margin: 4px;"
skibButton.addEventListener("click", skib);
skibButton.addEventListener("mouseover", () => {
    skibButton.style.backgroundColor = "#bbb";
});
skibButton.addEventListener("mouseout", () => {
    skibButton.style.backgroundColor = "#ccc";
});
skibMain.appendChild(skibButton);
const ptlsettingsButton = document.createElement("button");
ptlsettingsButton.textContent = "PTL SETTINGS";
ptlsettingsButton.style = "cursor: pointer; background-color: #ccc; color: #333; border: 1px solid #999; border-radius: 4px; padding: 32px 16px; font-size: 14px; margin: 4px;"
ptlsettingsButton.addEventListener("click", ptlsettings);
ptlsettingsButton.addEventListener("mouseover", () => {
    ptlsettingsButton.style.backgroundColor = "#bbb";
});
ptlsettingsButton.addEventListener("mouseout", () => {
    ptlsettingsButton.style.backgroundColor = "#ccc";
});
		function createToggleButton(buttonConfig, index) {
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.justifyContent = "space-between";
            container.style.alignItems = "center";
            const label = document.createElement("label");
            label.textContent = buttonConfig.label;
            const toggleButton = document.createElement("div");
            toggleButton.className = "skibToggleButton";
            toggleButton.style = "display: inline-block; width: 50px; height: 25px; position: relative; cursor: pointer;"
            toggleButton.style.backgroundColor = "#ccc";
            let isToggled = buttonConfig.defaultState;
            if (isToggled) {
                toggleButton.style.backgroundColor = "#4CAF50";
                buttonConfig.onFunction();
            }
            toggleButton.addEventListener("click", function() {
                isToggled = !isToggled;
                if (isToggled) {
                    toggleButton.style.backgroundColor = "#4CAF50";
                    buttonConfig.onFunction();
                } else {
                    toggleButton.style.backgroundColor = "#ccc";
                    buttonConfig.offFunction();
                }
                toggleButtonStates[index].isToggled = isToggled; // Update the state in the array
            });
            container.appendChild(label);
            container.appendChild(toggleButton);
            skibMain.appendChild(container);
            return { toggleButton, isToggled };
        }
        toggleButtons.forEach((buttonConfig, index) => {
            toggleButtonStates.push(createToggleButton(buttonConfig, index));
        });
        document.body.appendChild(skibMain);
        skibMain.appendChild(skibButton);
        skibMain.appendChild(ptlsettingsButton);
    }
}
createForm();
