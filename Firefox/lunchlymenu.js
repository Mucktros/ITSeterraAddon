function rsashowalllines() {
  // Find the section element containing the order
  const sectionElement = document.querySelector('section[data-area-ids]');
  if (!sectionElement) {
    console.error('No section element with data-area-ids found');
    return;
  }

  // Get the order of area IDs
  const areaIds = sectionElement.getAttribute('data-area-ids').split(',');

  // Get the dots corresponding to the area IDs with the 'dot-' prefix
  const dots = areaIds.map(id => document.querySelector(`circle[id="dot-${id}"]`)).filter(dot => dot !== null);

  // Log the dots to the console for debugging
  console.log('Dots found:', dots);
  // If there are less than 2 dots, there's nothing to join
  if (dots.length < 2) {
    console.log('Not enough dots to join');
    return;
  }

  // Create lines between the dots
  const svg = document.querySelector('svg#svgpoint');
  if (!svg) {
    console.error('No SVG element with id="svgpoint" found');
    return;
  }

  const lineLengths = [];

  for (let i = 0; i < dots.length - 1; i++) {
    const startDot = dots[i];
    const endDot = dots[i + 1];

    // Log the coordinates of the start and end dots
    console.log(`Drawing line from (${startDot.getAttribute('cx')}, ${startDot.getAttribute('cy')}) to (${endDot.getAttribute('cx')}, ${endDot.getAttribute('cy')})`);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startDot.getAttribute('cx'));
    line.setAttribute('y1', startDot.getAttribute('cy'));
    line.setAttribute('x2', endDot.getAttribute('cx'));
    line.setAttribute('y2', endDot.getAttribute('cy'));
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', 1);
    line.style.pointerEvents = 'none';
    svg.appendChild(line);

    // Calculate the length of the line
    const length = calculateLineLength(startDot, endDot);
    lineLengths.push(length);
  }

  // Calculate and log the average line length
  const averageLength = calculateAverageLineLength(lineLengths);
  console.log('Average Line Length:', averageLength);
}

function calculateLineLength(startDot, endDot) {
  const x1 = parseFloat(startDot.getAttribute('cx'));
  const y1 = parseFloat(startDot.getAttribute('cy'));
  const x2 = parseFloat(endDot.getAttribute('cx'));
  const y2 = parseFloat(endDot.getAttribute('cy'));

  // Use the distance formula to calculate the length
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function calculateAverageLineLength(lineLengths) {
  if (lineLengths.length === 0) {
    return 0;
  }

  const totalLength = lineLengths.reduce((sum, length) => sum + length, 0);
  return totalLength / lineLengths.length;
}

// Global state variables
let currentStep = 0;
let linesDrawn = 0;
let dots = [];
let areaIds = [];
let observer = null; // Define observer as a global variable

function clearDotsAndLines() {
  // Select all dots created by the function
  const dotsToRemove = document.querySelectorAll('circle[id^="dot-"]');
  dotsToRemove.forEach(dot => dot.remove());

  // Select all lines created by the function
  const linesToRemove = document.querySelectorAll('svg#svgpoint line');
  linesToRemove.forEach(line => line.remove());

  // Reset state
  currentStep = 0;
  linesDrawn = 0;
  dots = [];
  areaIds = [];
}

function findroutemakecircles() {
  // Select all SVG elements with an id
  const svgElements = document.querySelectorAll('svg g[id]');

  svgElements.forEach((gElement) => {
    // Check if the gElement already contains a circle
    const existingCircle = gElement.querySelector('circle');
    let centerX, centerY;

    if (existingCircle) {
      // Use the position of the existing circle
      centerX = parseFloat(existingCircle.getAttribute('cx'));
      centerY = parseFloat(existingCircle.getAttribute('cy'));
    } else {
      // Get all path elements within the g element
      const pathElements = gElement.querySelectorAll('path, polygon');

      // Initialize bounding box variables
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      // Calculate the bounding box for all path elements within the g element
      pathElements.forEach((pathElement) => {
        const bbox = pathElement.getBBox();
        minX = Math.min(minX, bbox.x);
        minY = Math.min(minY, bbox.y);
        maxX = Math.max(maxX, bbox.x + bbox.width);
        maxY = Math.max(maxY, bbox.y + bbox.height);
      });

      // Calculate the center point of the bounding box
      centerX = (minX + maxX) / 2;
      centerY = (minY + maxY) / 2;
    }

    // Log the center point to the console
    console.log(`Center of ${gElement.id}: (${centerX}, ${centerY})`);

    // Create a dot to mark the center point
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', centerX);
    dot.setAttribute('cy', centerY);
    dot.setAttribute('r', 3);
    dot.setAttribute('fill', 'red');
    dot.setAttribute('id', `dot-${gElement.id}`);
    // Make the dot unclickable and untouchable
    dot.style.pointerEvents = 'none';

    // Append the dot to the SVG
    gElement.appendChild(dot);

    // Store the dot in the dots array
    dots.push(dot);
  });
}

function findroutemakeareaids() {
  // Find the section element containing the order
  const sectionElement = document.querySelector('section[data-area-ids]');
  if (!sectionElement) {
    console.error('No section element with data-area-ids found');
    return;
  }

  // Get the order of area IDs
  areaIds = sectionElement.getAttribute('data-area-ids').split(',');

  // Log the area IDs to the console for debugging
  console.log('Area IDs found:', areaIds);
}

function makelineparts() {
  if (linesDrawn >= areaIds.length - 1) {
    console.log('All lines have been drawn');
    return;
  }

  const svg = document.querySelector('svg#svgpoint');
  if (!svg) {
    console.error('No SVG element with id="svgpoint" found');
    return;
  }

  // Clear previous lines
  const linesToRemove = document.querySelectorAll('svg#svgpoint line');
  linesToRemove.forEach(line => line.remove());

  for (let i = linesDrawn; i < Math.min(linesDrawn + 3, areaIds.length - 1); i++) {
    const startDot = dots.find(dot => dot.id === `dot-${areaIds[i]}`);
    const endDot = dots.find(dot => dot.id === `dot-${areaIds[i + 1]}`);

    if (!startDot || !endDot) {
      console.error(`Dot not found for area ID ${areaIds[i]} or ${areaIds[i + 1]}`);
      return;
    }

    // Log the coordinates of the start and end dots
    console.log(`Drawing line from (${startDot.getAttribute('cx')}, ${startDot.getAttribute('cy')}) to (${endDot.getAttribute('cx')}, ${endDot.getAttribute('cy')})`);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startDot.getAttribute('cx'));
    line.setAttribute('y1', startDot.getAttribute('cy'));
    line.setAttribute('x2', endDot.getAttribute('cx'));
    line.setAttribute('y2', endDot.getAttribute('cy'));
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', 1);
    // Make the line unclickable and untouchable
    line.style.pointerEvents = 'none';

    svg.appendChild(line);
  }

  linesDrawn += 2;
}

function handleSpacebarPress(event) {
  if (event.code === 'Space') {
    // Clear any existing dots and lines
    clearDotsAndLines();

    // Find and create dots
    findroutemakecircles();

    // Find area IDs
    findroutemakeareaids();

    // Start drawing the first two lines
    makelineparts();
  }
}

function setupMutationObserver() {
  const headerElement = document.querySelector('div[data-qa="game-map-header"]');
  if (!headerElement) {
    console.error('No header element found');
    return;
  }

  observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-current-question-id') {
        // Get the new current question ID
        const currentQuestionId = headerElement.getAttribute('data-current-question-id');

        // Check if the current question ID matches any area ID
        if (areaIds.includes(currentQuestionId)) {
          // Increment the current step
          currentStep++;

          // Draw the next two lines if the current step is a multiple of 2
          if (currentStep % 2 === 0) {
            makelineparts();
          }
        }
      }
    }
  });

  // Observe changes to the data-current-question-id attribute
  observer.observe(headerElement, {
    attributes: true,
    attributeFilter: ['data-current-question-id']
  });
}

function routeassistantON() {
  // Add event listeners
  document.addEventListener('keydown', handleSpacebarPress);

  // Set up the mutation observer
  setupMutationObserver();
}

function routeassistantOFF() {
  // Remove event listeners
  document.removeEventListener('keydown', handleSpacebarPress);

  // Disconnect the mutation observer
  if (observer) {
    observer.disconnect();
  }

  // Clear any existing dots and lines
  clearDotsAndLines();
}

function routeassistantSHOWALL() {
	findroutemakecircles();
	rsashowalllines();
}

clearDotsAndLines();

//highlighter
let isHighlighterActive = false;
let tooltipObserver = null;

function highlightRegionBasedOnTooltip() {
    const tooltip = document.querySelector('[data-current-question-id]');
    if (!tooltip) return;

    const targetRegionId = tooltip.getAttribute('data-current-question-id');
    if (!targetRegionId) return;

    const svgContainer = document.querySelector('#svgpoint');
    if (!svgContainer) return;

    const allRegions = svgContainer.querySelectorAll('path, circle, polygon');
    allRegions.forEach(region => {
        region.style.fill = '';
    });

    const targetRegion = svgContainer.querySelector(`#${CSS.escape(targetRegionId)}`);
    if (!targetRegion) return;

    const regionElements = targetRegion.querySelectorAll('path, circle, polygon');
    if (regionElements.length > 0) {
        regionElements.forEach(element => {
            element.style.fill = 'gold';
        });
    } else {
        targetRegion.style.fill = 'gold';
    }
}

function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                callback(el);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

function observeTooltipChanges() {
    waitForElement('[data-current-question-id]', (tooltip) => {
        tooltipObserver = new MutationObserver(() => {
            highlightRegionBasedOnTooltip();
        });
        tooltipObserver.observe(tooltip, { attributes: true, attributeFilter: ['data-current-question-id'] });
    });
}

function highlighterON() {
    if (!isHighlighterActive) {
        isHighlighterActive = true;
        waitForElement('#svgpoint', () => {
            highlightRegionBasedOnTooltip();
            observeTooltipChanges();
        });
    }
}

function highlighterOFF() {
    if (isHighlighterActive) {
        isHighlighterActive = false;
        waitForElement('#svgpoint', () => {
            const allRegions = document.querySelectorAll('#svgpoint path, #svgpoint circlem #svgpoint polygon');
            allRegions.forEach(region => {
                region.style.fill = '';
            });
        });
        if (tooltipObserver) {
            tooltipObserver.disconnect();
            tooltipObserver = null;
        }
    }
}

// indicators 
const indicatorsContainer = document.createElement("div");
indicatorsContainer.classList.add("mod-indicators-container");
document.body.appendChild(indicatorsContainer);

const boldnameIndicator = document.createElement("div");
boldnameIndicator.textContent = "Bold Names";
boldnameIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(boldnameIndicator);

const remclickonIndicator = document.createElement("div");
remclickonIndicator.textContent = "Click on text";
remclickonIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(remclickonIndicator);

const dimoverlayIndicator = document.createElement("div");
dimoverlayIndicator.textContent = "Dim Screen";
dimoverlayIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(dimoverlayIndicator);

const keybindtoggleIndicator = document.createElement("div");
keybindtoggleIndicator.textContent = "Keybinds";
keybindtoggleIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(keybindtoggleIndicator);

const mapresetIndicator = document.createElement("div");
mapresetIndicator.textContent = "Space Map Reset";
mapresetIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(mapresetIndicator);

const mappaddingIndicator = document.createElement("div");
mappaddingIndicator.textContent = "Map Padding";
mappaddingIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(mappaddingIndicator);

const blackbgIndicator = document.createElement("div");
blackbgIndicator.textContent = "Black BG";
blackbgIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(blackbgIndicator);

const performancemodeIndicator = document.createElement("div");
performancemodeIndicator.textContent = "Performance mode";
performancemodeIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(performancemodeIndicator);

const mobilemodeIndicator = document.createElement("div");
mobilemodeIndicator.textContent = "Mobile Mode";
mobilemodeIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(mobilemodeIndicator);

const toggledisabledcolorsIndicator = document.createElement("div");
toggledisabledcolorsIndicator.textContent = "Disabled Colors";
toggledisabledcolorsIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(toggledisabledcolorsIndicator);

const mcwaterIndicator = document.createElement("div");
mcwaterIndicator.textContent = "MC Water";
mcwaterIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(mcwaterIndicator);

const nowaterIndicator = document.createElement("div");
nowaterIndicator.textContent = "NO Water";
nowaterIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(nowaterIndicator);

const jitonIndicator = document.createElement("div");
jitonIndicator.textContent = "Nearby Lines";
jitonIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(jitonIndicator);

const jitallIndicator = document.createElement("div");
jitallIndicator.textContent = "All Lines";
jitallIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(jitallIndicator);

const jithighlighterIndicator = document.createElement("div");
jithighlighterIndicator.textContent = "Highlighter";
jithighlighterIndicator.classList.add("mod-indicator");
indicatorsContainer.appendChild(jithighlighterIndicator);

// Indicator TOGGLE
const IndicatortoggleButton = document.createElement("button");
IndicatortoggleButton.textContent = "Toggle Indicators [END]";
IndicatortoggleButton.classList.add("toggle-button"); // Add the base class
IndicatortoggleButton.dataset.state = "on"; // Initial state is off
IndicatortoggleButton.addEventListener("click", () => {
	toggleIndicatortoggleButton(IndicatortoggleButton);
});
toggleIndicatortoggleButton(IndicatortoggleButton);
function toggleIndicatortoggleButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        indicatorsContainer.style.display = "none";

    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        indicatorsContainer.style.display = "flex";
    }
}


// KEYBINDS
function toggledimoverlayhandleKeydown(event) {
    if (event.key === 'Home') {
        toggledimoverlayButton(dimoverlayButton);
    }
}
function toggleindicatorshandleKeydown(event) {
    if (event.key === 'End') {
        toggleIndicatortoggleButton(IndicatortoggleButton);
    }
}
function togglebindshandleKeydown(event) {
    if (event.key === 'Delete') {
        togglekeybindtoggleButton(keybindtoggleButton);
    }
}
function menukeybindhandleKeydown(event) {
    if (event.key === 'Insert' || event.key === 'Escape') {
        openmenu();
    }
}
function mapresethandleKeydown(event) {
    if (event.key === 'u' || event.key === 'U') {
        togglemapresetButton(mapresetButton);
    }
}
function mappaddinghandleKeydown(event) {
    if (event.key === 'i' || event.key === 'I') {
        togglemappaddingButton(mappaddingButton);
    }
}
function blackbghandleKeydown(event) {
    if (event.key === 'o' || event.key === 'O') {
        toggleblackbgButton(blackbgButton);
    }
}
function performancehandleKeydown(event) {
    if (event.key === 'p' || event.key === 'P') {
        toggleperformancemodeButton(performancemodeButton);
    }
}
function mcwaterhandleKeydown(event) {
    if (event.key === ']' || event.key === ')') {
        togglemcwaterButton(mcwaterButton);
    }
}
function nowaterhandleKeydown(event) {
    if (event.key === '[' || event.key === 'ú') {
        togglenowaterButton(nowaterButton);
    }
}
function rebootallhandleKeydown(event) {
    if (event.key === '.') {
        rebootall();
    }
}
function jitonhandleKeydown(event) {
    if (event.key === 'j' || event.key === 'J') {
        togglejitonButton(jitonButton);
    }
}
function jitallhandleKeydown(event) {
    if (event.key === 'k' || event.key === 'K') {
        togglejitallButton(jitallButton);
    }
}
function jithighlighterhandleKeydown(event) {
    if (event.key === 'l' || event.key === 'L') {
        togglejithighlighterButton(jithighlighterButton);
    }
}
// Keybind TOGGLE
const keybindtoggleButton = document.createElement("button");
keybindtoggleButton.textContent = "Toggle Keybinds [DEL]";
keybindtoggleButton.classList.add("toggle-button"); // Add the base class
keybindtoggleButton.dataset.state = "on"; // Initial state is off
keybindtoggleButton.addEventListener("click", () => {
	togglekeybindtoggleButton(keybindtoggleButton);
});
togglekeybindtoggleButton(keybindtoggleButton);
function togglekeybindtoggleButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        keybindtoggleIndicator.style.display = "none";
        //document.removeEventListener("keydown", menukeybindhandleKeydown);togglebindshandleKeydown
	//document.removeEventListener("keydown", togglebindshandleKeydown);
		document.removeEventListener("keydown", toggledimoverlayhandleKeydown);
		document.removeEventListener("keydown", toggleindicatorshandleKeydown);
        document.removeEventListener("keydown", performancehandleKeydown);
        document.removeEventListener("keydown", mappaddinghandleKeydown);
        document.removeEventListener("keydown", blackbghandleKeydown);
        document.removeEventListener("keydown", mapresethandleKeydown);
        document.removeEventListener("keydown", rebootallhandleKeydown);
        document.removeEventListener("keydown", jitonhandleKeydown);
        document.removeEventListener("keydown", jitallhandleKeydown);
        document.removeEventListener("keydown", jithighlighterhandleKeydown);
        document.removeEventListener("keydown", mcwaterhandleKeydown);
        document.removeEventListener("keydown", nowaterhandleKeydown);
    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        keybindtoggleIndicator.style.display = "block";
        document.addEventListener("keydown", toggledimoverlayhandleKeydown);
        document.addEventListener("keydown", toggleindicatorshandleKeydown);
        document.addEventListener("keydown", menukeybindhandleKeydown);
	document.addEventListener("keydown", togglebindshandleKeydown);
        document.addEventListener("keydown", mappaddinghandleKeydown);
        document.addEventListener("keydown", blackbghandleKeydown);
        document.addEventListener("keydown", performancehandleKeydown);
        document.addEventListener("keydown", mapresethandleKeydown);
        document.addEventListener("keydown", rebootallhandleKeydown);
        document.addEventListener("keydown", jitonhandleKeydown);
        document.addEventListener("keydown", jitallhandleKeydown);
        document.addEventListener("keydown", jithighlighterhandleKeydown);
        document.addEventListener("keydown", mcwaterhandleKeydown);
        document.addEventListener("keydown", nowaterhandleKeydown);
    }
}
//Space Map Reset Button
const mapresetButton = document.createElement("button");
mapresetButton.id = "mapresetButton";
mapresetButton.textContent = "Space Map Reset [U]";
mapresetButton.classList.add("toggle-button"); // Add the base class
mapresetButton.dataset.state = "on"; // Initial state is off
mapresetButton.addEventListener("click", () => {
	togglemapresetButton(mapresetButton);
});
togglemapresetButton(mapresetButton);
function togglemapresetButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        document.removeEventListener("keydown", spaceKeyDownHandler)
        mapresetIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        document.addEventListener("keydown", spaceKeyDownHandler)
        mapresetIndicator.style.display = "block";
    }
}
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
//Map Padding Button
const mappaddingButton = document.createElement("button");
mappaddingButton.textContent = "Map Padding [I]";
mappaddingButton.classList.add("toggle-button"); // Add the base class
mappaddingButton.dataset.state = "off"; // Initial state is off
mappaddingButton.addEventListener("click", () => {
	togglemappaddingButton(mappaddingButton);
});
togglemappaddingButton(mappaddingButton);
function togglemappaddingButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) { let a = document.getElementsByClassName("extra-info_extraInfo__80Tci"); if (a[0]) { a[0].style.marginTop = "-70px" }; }
		mappaddingIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) { let a = document.getElementsByClassName("extra-info_extraInfo__80Tci"); if (a[0]) { a[0].style.marginTop = "400px" }; }
		mappaddingIndicator.style.display = "block";
    }
}
//Performance Mode Button
const performancemodeButton = document.createElement("button");
performancemodeButton.textContent = "Performance [P]";
performancemodeButton.classList.add("toggle-button"); // Add the base class
performancemodeButton.dataset.state = "off"; // Initial state is off
performancemodeButton.addEventListener("click", () => {
	toggleperformancemodeButton(performancemodeButton);
});
toggleperformancemodeButton(performancemodeButton);
function toggleperformancemodeButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        perfOFF();
        performancemodeIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        perfON();
        performancemodeIndicator.style.display = "block";
    }
}
function performanceON(selectors) {
    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(element => element.style.display = 'none');
}
function performanceOFF(selectors) {
    const elements = document.querySelectorAll(selectors.join(', '));
    elements.forEach(element => element.style.display = '');
}
function perf(hide) {
    const selectors = [
        '.notifications_root__q0A7_',
        '.seterra_outStreamMwAd___XU6M',
        '.seterra_adContainerLeft__zTLsS',
        '.seterra_adContainerRight__lDew4',
        '.ad_wrapper__3DZ7k',
        '.headline_heading__2lf9L',
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
        'thead',
        'article',
        'p'
    ];
    if (hide) {
        performanceON(selectors);
    } else {
        performanceOFF(selectors);
    }
}
function perfON() {
	perf(true);
}
function perfOFF() {
	perf(false);
}
//Black BG Button
let style = document.createElement('style');
style.id = 'dynamic-style';
document.head.appendChild(style);
const blackbgButton = document.createElement("button");
blackbgButton.textContent = "Black BG [O]";
blackbgButton.classList.add("toggle-button"); // Add the base class
blackbgButton.dataset.state = "on"; // Initial state is off
blackbgButton.addEventListener("click", () => {
	toggleblackbgButton(blackbgButton);
});
toggleblackbgButton(blackbgButton);
function toggleblackbgButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        blackbgOFF();
        blackbgIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Add the 'on' class
        button.dataset.state = "off";
        blackbgON();
        blackbgIndicator.style.display = "block";
    }
}
function blackbgOFF() {
  style.innerHTML = `
      .seterra_content__nGh5_ {
        background: #ffffff !important;
        color: black !important;
      }
      .seterra_main__mwfLw {
        background: #ffffff !important;
        color: black !important;
      }
      .button_button__aR6_e {
        color: black !important;
      }
      .highscore_table__oKrYg {
        color: black !important;
        background-color: #FFFFFF;
      }
    `;
}
function blackbgON() {
  style.innerHTML = `
      .seterra_content__nGh5_ {
        background: #000000 !important;
        color: white !important; /* Changed color to white for better contrast */
      }
      .seterra_main__mwfLw {
        background: #000000 !important;
        color: white !important; /* Changed color to white for better contrast */
      }
      .button_button__aR6_e {
        color: white !important; /* Changed color to white for better contrast */
      }
      .highscore_table__oKrYg {
        color: white !important;
        background-color: #000000;
      }
    `;
}
//Mobile Mode Button
let style2 = document.createElement('style');
style2.id = 'dynamic-style2';
document.head.appendChild(style2);
const mobilemodeButton = document.createElement("button");
mobilemodeButton.textContent = "Mobile Mode";
mobilemodeButton.classList.add("toggle-button"); // Add the base class
mobilemodeButton.dataset.state = "off"; // Initial state is off
mobilemodeButton.addEventListener("click", () => {
	togglemobilemodeButton(mobilemodeButton);
});
togglemobilemodeButton(mobilemodeButton);
function togglemobilemodeButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        mobileOFF();
        mobilemodeIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        mobileON();
        mobilemodeIndicator.style.display = "block";
    }
}
function mobileON() {
  style2.innerHTML = `
    .game-page_belowMap__OLPA7 {
      display: none;
    }
    .language-list_root__uHQD6 {
      display: none;
    }
    .game-footer_row__svel9 {
      display: block;
    }
    .button_button__aR6_e {
      width: 100%;
      height: 250px;
      border-radius: 0rem;
    }
    .game-header_wrapper__JDf24 {
	  display: none;
	}
  `;
  function selectByText(context, text) {
    return document.evaluate(`.//button[.//span[text()='${text}']]`, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  let learnButton = selectByText(document.querySelector('.game-footer_buttons__Zpp2N'), 'Learn');
  if (learnButton) {
    learnButton.style.display = 'none';
  }
}
function mobileOFF() {
  style2.innerHTML = `
    .game-page_belowMap__OLPA7 {
      display: flex;
    }
    .language-list_root__uHQD6 {
      display: flex;
    }
    .game-footer_row__svel9 {
      display: flex;
    }
    .button_button__aR6_e {
      width: auto;
      height: auto; /* Corrected 'skbiid' to 'auto' */
      border-radius: 3.75rem;
    }
    .game-header_wrapper__JDf24 {
	  display: flex;
	}
  `;
  function selectByText(context, text) {
    return document.evaluate(`.//button[.//span[text()='${text}']]`, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }
  let learnButton = selectByText(document.querySelector('.game-footer_buttons__Zpp2N'), 'Learn');
  if (learnButton) {
    learnButton.style.display = 'flex';
  }
}
//Disable Colors Button
const disabledcolorsButton = document.createElement("button");
disabledcolorsButton.textContent = "Disabled Colors";
disabledcolorsButton.classList.add("toggle-button"); // Add the base class
disabledcolorsButton.dataset.state = "off"; // Initial state is off
disabledcolorsButton.addEventListener("click", () => {
	toggledisabledcolorsButton(disabledcolorsButton);
});
toggledisabledcolorsButton(disabledcolorsButton);
function toggledisabledcolorsButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
        var style = document.createElement('style'); style.innerHTML = `.seterra_root__NV8MT { --seterra-color-green-dark: #166c38 !important; }`; document.head.appendChild(style);
		toggledisabledcolorsIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        var style = document.createElement('style'); style.innerHTML = `.seterra_root__NV8MT { --seterra-color-green-dark: #1e8346 !important; }`; document.head.appendChild(style);
		toggledisabledcolorsIndicator.style.display = "block";
    }
}
//MC Water Button
function waterON() { if (document.getElementById(`WATER`)) { document.getElementById(`WATER`).style.display = "block"; } if (document.getElementById(`BACKGROUND`)) { document.getElementById(`BACKGROUND`).style.display = "block"; } if (document.getElementById(`WATER_1_`)) { document.getElementById(`WATER_1_`).style.display = "block"; } if (document.getElementById(`WATER_2_`)) { document.getElementById(`WATER_2_`).style.display = "block"; } if (document.getElementById(`WATER_3_`)) { document.getElementById(`WATER_3_`).style.display = "block"; } }
function waterOFF() { if (document.getElementById(`WATER`)) { document.getElementById(`WATER`).style.display = "none"; } if (document.getElementById(`BACKGROUND`)) { document.getElementById(`BACKGROUND`).style.display = "none"; } if (document.getElementById(`WATER_1_`)) { document.getElementById(`WATER_1_`).style.display = "none"; } if (document.getElementById(`WATER_2_`)) { document.getElementById(`WATER_2_`).style.display = "none"; } if (document.getElementById(`WATER_3_`)) { document.getElementById(`WATER_3_`).style.display = "none"; } }        
const mcwaterButton = document.createElement("button");
mcwaterButton.textContent = "MC Water [],)]";
mcwaterButton.classList.add("toggle-button"); // Add the base class
mcwaterButton.dataset.state = "off"; // Initial state is off
mcwaterButton.addEventListener("click", () => {
	togglemcwaterButton(mcwaterButton);
});
togglemcwaterButton(mcwaterButton);
function togglemcwaterButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
        button.dataset.state = "on";
			waterON();
			const svgElement = document.getElementById('svgpoint');
			if (svgElement) {
				svgElement.style.backgroundImage = 'none';
			}          
			mcwaterIndicator.style.display = "none";
} else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
			waterOFF();
			const svgElement = document.getElementById('svgpoint');    
			if (svgElement) {
				svgElement.style.backgroundImage = 'url(' + browser.runtime.getURL('images/water.gif') + ')';
				svgElement.style.backgroundSize = 'tile';
				svgElement.style.backgroundRepeat = 'repeat';}
			mcwaterIndicator.style.display = "block";
    }
}
//No Water Button
const nowaterButton = document.createElement("button");
nowaterButton.textContent = "No Water [[,ú]";
nowaterButton.classList.add("toggle-button"); // Add the base class
nowaterButton.dataset.state = "off"; // Initial state is off
nowaterButton.addEventListener("click", () => {
	togglenowaterButton(nowaterButton);
});
togglenowaterButton(nowaterButton);
function togglenowaterButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        waterON();
        nowaterIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        waterOFF();
        nowaterIndicator.style.display = "block";
    }
}

//Skib Button
function skib() {
	let userInput = prompt("just fully skib out here dawg (often: 0 0 900 700 (x offset  y offset  width  height)");
	if (userInput) {
		const svgElement = document.getElementById('svgpoint');
		svgElement.setAttribute('viewBox', userInput);
	}
}
const skibButton = document.createElement("button");
skibButton.textContent = "Skib Out";
skibButton.classList.add("normal-button");
skibButton.addEventListener("click", skib);
//Reboot Cards
function labelON() { document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.opacity = "1" }
function namesON() {
	document.getElementsByClassName('game-header_withDivider__ZHYAO')[0].style.display = "block"
	document.getElementsByClassName('game-header_withDivider__ZHYAO')[1].style.display = "block"
	document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].style.display = "block"
	 }
function flagsON() { 
	document.getElementsByClassName('corner-image_wrapper__ej_p1')[0].style.display = "block"
}
function rebootall() {
	labelON();
	namesON();
	flagsON();
}
//Label Reboot card
const rebootlabelButton = document.createElement("button");
rebootlabelButton.textContent = "Revive Label";
rebootlabelButton.classList.add("normal-button");
rebootlabelButton.addEventListener("click", labelON);
//Names Reboot card
const rebootnamesButton = document.createElement("button");
rebootnamesButton.textContent = "Revive Names";
rebootnamesButton.classList.add("normal-button");
rebootnamesButton.addEventListener("click", namesON);
//Flags Reboot card
const rebootflagsButton = document.createElement("button");
rebootflagsButton.textContent = "Revive Flags";
rebootflagsButton.classList.add("normal-button");
rebootflagsButton.addEventListener("click", flagsON);
//Reboot all
const rebootallButton = document.createElement("button");
rebootallButton.textContent = "----Reboot all-[.]-";
rebootallButton.classList.add("normal-button");
rebootallButton.addEventListener("click", rebootall);

//Bold Name button
function boldnamesON() {
        if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) {
            document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].children[0].style.fontWeight = "bold";
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong')) {
                    document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight = "bold";
                    if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight == "bold") {
                        boldNamesOopsie = false;
                    }
                }

            }

        }
}
function boldnamesOFF() {
        if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) {
            document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].children[0].style.fontWeight = "normal";
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong')) {
                    document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight = "normal";
                    if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong').style.fontWeight == "normal") {
                        boldNamesOopsie = false;
                    }

                }

            }
        }
    }

const boldnameButton = document.createElement("button");
boldnameButton.textContent = "Bold Names";
boldnameButton.classList.add("toggle-button"); // Add the base class
boldnameButton.dataset.state = "off"; // Initial state is off
boldnameButton.addEventListener("click", () => {
	toggleboldnameButton(boldnameButton);
});
toggleboldnameButton(boldnameButton);
function toggleboldnameButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        boldnamesOFF();
        boldnameIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        boldnamesON();
        boldnameIndicator.style.display = "block";
    }
}

//Click on text button
function remclickonON() {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').childNodes[0].textContent = "";
            }
        }
}
function remclickonOFF() {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').childNodes[0].textContent = "Click on ";
            }
        }
}
const remclickonButton = document.createElement("button");
remclickonButton.textContent = "Label Click On Text";
remclickonButton.classList.add("toggle-button"); // Add the base class
remclickonButton.dataset.state = "off"; // Initial state is off
remclickonButton.addEventListener("click", () => {
	toggleremclickonButton(remclickonButton);
});
toggleremclickonButton(remclickonButton);
function toggleremclickonButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        remclickonON();
        remclickonIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        remclickonOFF();
        remclickonIndicator.style.display = "block";
    }
}
//Jit Buttons
//Jit On Button
const jitonButton = document.createElement("button");
jitonButton.textContent = "Nearby Lines [J]";
jitonButton.classList.add("toggle-button"); // Add the base class
jitonButton.dataset.state = "off"; // Initial state is off
jitonButton.addEventListener("click", () => {
	togglejitonButton(jitonButton);
});
togglejitonButton(jitonButton);
function togglejitonButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        routeassistantOFF();
        jitonIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        routeassistantON();
        jitonIndicator.style.display = "block";
    }
}
//Jit All Button
const jitallButton = document.createElement("button");
jitallButton.textContent = "Show All Lines [K]";
jitallButton.classList.add("toggle-button"); // Add the base class
jitallButton.dataset.state = "off"; // Initial state is off
jitallButton.addEventListener("click", () => {
	togglejitallButton(jitallButton);
});
togglejitallButton(jitallButton);
function togglejitallButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        clearDotsAndLines();
        jitallIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        routeassistantSHOWALL();
        jitallIndicator.style.display = "block";
    }
}
//Jit Highlighter Button
const jithighlighterButton = document.createElement("button");
jithighlighterButton.textContent = "Highlighter [L]";
jithighlighterButton.classList.add("toggle-button"); // Add the base class
jithighlighterButton.dataset.state = "off"; // Initial state is off
jithighlighterButton.addEventListener("click", () => {
	togglejithighlighterButton(jithighlighterButton);
});
togglejithighlighterButton(jithighlighterButton);
function togglejithighlighterButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        highlighterOFF();
        jithighlighterIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        highlighterON();
        jithighlighterIndicator.style.display = "block";
    }
}

//Dim button
function createDimOverlay() {
  if (document.getElementById('dim-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'dim-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'black';
  overlay.style.opacity = '0.5';
  overlay.style.zIndex = '999999';
  overlay.style.pointerEvents = 'none';
  overlay.style.display = 'none';
  document.body.appendChild(overlay);
}
function showDimOverlay() {
  const overlay = document.getElementById('dim-overlay');
  if (overlay) {
    overlay.style.display = 'block';
  }
}
function hideDimOverlay() {
  const overlay = document.getElementById('dim-overlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}
createDimOverlay();
const dimoverlayButton = document.createElement("button");
dimoverlayButton.textContent = "Dim Screen [HOME]";
dimoverlayButton.classList.add("toggle-button"); // Add the base class
dimoverlayButton.dataset.state = "off"; // Initial state is off
dimoverlayButton.addEventListener("click", () => {
	toggledimoverlayButton(dimoverlayButton);
});
toggledimoverlayButton(dimoverlayButton);
function toggledimoverlayButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        hideDimOverlay();
        dimoverlayIndicator.style.display = "none";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        showDimOverlay();
        dimoverlayIndicator.style.display = "block";
    }
}

        const openmenubutton = document.createElement("button");
        openmenubutton.id = "openMenuButton";
        openmenubutton.classList.add("open-button");
        openmenubutton.textContent = "open menu";
        openmenubutton.addEventListener("click", openmenu);
const showopenmenuButton = document.createElement("button");
showopenmenuButton.textContent = "Hide open menu button";
showopenmenuButton.classList.add("toggle-button"); // Add the base class
showopenmenuButton.dataset.state = "off"; // Initial state is off
showopenmenuButton.addEventListener("click", () => {
	toggleshowopenmenuButton(showopenmenuButton);
});
toggleshowopenmenuButton(showopenmenuButton);
function toggleshowopenmenuButton(button) {
    if (button.dataset.state === "off") {
		button.classList.remove("on"); // Add the 'on' class
		button.dataset.state = "on";
        openmenubutton.style.display = "block";
    } else {
		button.classList.add("on"); // Remove the 'on' class
        button.dataset.state = "off";
        openmenubutton.style.display = "none";
    }
}

//MENU
function openmenu() {
    const lunchlyMain = document.getElementById("lunchlyAddon");
    //const openmenubutton = document.getElementById("openMenuButton");

    if (lunchlyMain.style.display === "grid") {
        lunchlyMain.style.display = "none";
        openmenubutton.textContent = "open menu (Ins)";
    } else {
        lunchlyMain.style.display = "grid";
        openmenubutton.textContent = "close menu (Ins)";
    }
}
function lunchlyForm() {
    if (!document.getElementById("LunchlyAddon")) {
        const lunchlyMain = document.createElement("div");
        lunchlyMain.id = "lunchlyAddon";
        lunchlyMain.className = "lunchlymenu";
        lunchlyMain.style = "justify-content: center; position: fixed; color: white; top: 0px; left: 0px; z-index: 1000; width: 100%; height: 100%; backdrop-filter: blur(10px);";
        //lunchlyMain.style = "justify-content: center; aling-items: center; position: fixed; color: white; top: 0px; left: 0px; z-index: 1000; background-color: rgba(0, 0, 0, 0.8); width: 100%; height: 100%;";
        lunchlyMain.style.display = "none";
        lunchlyMain.style.gridTemplateColumns = "200px 200px 200px 200px 200px";
        lunchlyMain.style.gridTemplateRows = "100px 1fr";
        lunchlyMain.style.gap = "10px"; // Adds space between grid items
        

        
        document.body.appendChild(lunchlyMain);
        document.body.appendChild(openmenubutton);
        
        const column0 = document.createElement("div");
			  column0.style = "grid-column: span 5;";
        const column1 = document.createElement("div");
        const column2 = document.createElement("div");
        const column3 = document.createElement("div");
		const column4 = document.createElement("div");
		const column5 = document.createElement("div");
	
		//lunchlyMain.appendChild(column0);
        lunchlyMain.appendChild(column1);
        lunchlyMain.appendChild(column2);
        lunchlyMain.appendChild(column3);
		lunchlyMain.appendChild(column4);
		lunchlyMain.appendChild(column5);
		
		const header1 = document.createElement("div");
        header1.textContent = "Website Settings";
        header1.style = "padding: 5px; text-align: center;";
        column1.appendChild(header1);
        column1.appendChild(mapresetButton);
        column1.appendChild(mappaddingButton);
		column1.appendChild(blackbgButton);
		column1.appendChild(performancemodeButton);
		column1.appendChild(mobilemodeButton);
		
		const header2 = document.createElement("div");
        header2.textContent = "Game Window";
        header2.style = "padding: 5px; text-align: center;";
        column2.appendChild(header2);
		column2.appendChild(disabledcolorsButton);
		column2.appendChild(mcwaterButton);
		column2.appendChild(nowaterButton);
		column2.appendChild(skibButton);

		const header3 = document.createElement("div");
        header3.textContent = "Reboot cards";
        header3.style = "padding: 5px; text-align: center;";
        column3.appendChild(header3);
        column3.appendChild(rebootlabelButton);
        column3.appendChild(rebootnamesButton);
        column3.appendChild(rebootflagsButton);
        column3.appendChild(rebootallButton);
        column3.appendChild(boldnameButton);
        column3.appendChild(remclickonButton);
        
		const header4 = document.createElement("div");
        header4.textContent = "Combat";
        header4.style = "padding: 5px; text-align: center;";
        column4.appendChild(header4);
        column4.appendChild(jitonButton);
        column4.appendChild(jitallButton);
        column4.appendChild(jithighlighterButton);
        
		const header5 = document.createElement("div");
        header5.textContent = "Menu settings";
        header5.style = "padding: 5px; text-align: center;";
        column5.appendChild(header5);
        column5.appendChild(IndicatortoggleButton);
		column5.appendChild(keybindtoggleButton);
		column5.appendChild(dimoverlayButton);
		column5.appendChild(showopenmenuButton);
    }
}
lunchlyForm();
