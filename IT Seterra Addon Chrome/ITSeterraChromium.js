function createForm() {
    if (!document.getElementById("NekoAddon")) {
        const nekoMain = document.createElement("div");
        nekoMain.id = "NekoAddon";
        nekoMain.style.position = "absolute";
        nekoMain.style.top = "442px";
        nekoMain.style.left = "18px";

        
        const nekoHeader = document.createElement("h2");
        nekoHeader.textContent = "Addons";
        nekoHeader.style.paddingBottom = "10px";
        nekoHeader.id = 'nekoheaderid';
        nekoHeader.style.setProperty("color", "#91aaff", "important"); 
        nekoHeader.style.color = "#001f3f"; 

        nekoMain.appendChild(nekoHeader);

        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');

        
        const css = `
            #NekoAddon label {
                display: inline-block;
                font-size: 14px;
                color: #001f3f; /* Dark navy */
                padding: 4px 8px;
                font-family: Arial, sans-serif;
                cursor: pointer;
                vertical-align: middle;
            }

            #NekoAddon input[type="checkbox"] {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                background-color: #fff;
                border: 2px solid #91aaff;
                border-radius: 4px;
                outline: none;
                cursor: pointer;
                position: relative;
                vertical-align: middle;
                transition: background-color 0.3s, border-color 0.3s;
            }

            #NekoAddon input[type="checkbox"]:checked {
                background-color: #4a90e2; /* Light blue for checked state */
                border-color: #004080; /* Darker blue for border */
            }

            #NekoAddon input[type="checkbox"]:checked::before {
                content: '\\2713'; /* Checkmark */
                color: #fff;
                font-size: 16px;
                position: absolute;
                top: -2px;
                left: 2px;
            }

            #NekoAddon br {
                line-height: 1.5;
            }
        `;

        
        style.appendChild(document.createTextNode(css));

        
        document.head.appendChild(style);

        const nekoForm = document.createElement("form");
        nekoMain.appendChild(nekoForm);

        const checkboxes = [
            { id: 'darkModeCbxId', text: 'Buio', title: '' },
            { id: 'mapBgId', text: 'Sfondo', title: '' },
            { id: 'mapPaddingCbxId', text: 'Mappa', title: '' },
            { id: 'mapResetCbxId', text: 'azzerare', title: '' },
            { id: 'removeLeftPaddingCbxId', text: 'Centro', title: '' },
            { id: 'showScoresCbxId', text: '10', title: '' },
            { id: 'showCursorLabelCbxId', text: 'Etichetta', title: '' },
            { id: 'boldNamesCbxId', text: 'Grassetto', title: '' },
            { id: 'showFlagCbxId', text: 'Bandiere', title: '' },
            { id: 'showNamesCbxId', text: 'Nomi', title: '' },
            { id: 'remClickOnCbxId', text: 'Nessun clic sul testo', title: '' },
            { id: 'moveCbxId', text: 'Giù', title: '' },
            { id: 'oldFontCbxId', text: 'Font', title: '' },
            { id: 'performanceCbxId', text: 'perf.', title: '' },
            { id: 'skibidiCbxId', text: 'skib', title: '' },
        ];

        checkboxes.forEach(({ id, text, title }) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;

            const label = document.createElement('label');
            label.textContent = text;
            label.htmlFor = id;

            nekoForm.appendChild(checkbox);
            nekoForm.appendChild(label);
            nekoForm.appendChild(document.createElement('br'));
        });

        
        const version = document.createElement("p");
        version.textContent = "";
        version.style.fontSize = "12px";
        version.style.position = "absolute";
        version.style.left = "5px";
        version.id = 'versionid';
        version.style.setProperty("color", "#CC0058", "important"); 
        version.style.color = "#CC0058"; 

        nekoMain.appendChild(version);

        document.body.appendChild(nekoMain);

        
        initDarkModeToggle();
    }
}	

const translations = {
    default: {  // English (default)
        darkMode: "Dark",
        background: "Background",
        map: "Map",
        reset: "Reset",
        center: "Center",
        top10: "Top 10 Scores",
        label: "Label",
        bold: "Bold",
        flags: "Flags",
        names: "Names",
        noClick: "No Click on Text",
        down: "Down",
        font: "Font",
        performance: "Performance",
        skib: "Skib",
    },
	
	ko: {  // Korean
    darkMode: "어두운 모드",
    background: "배경",
    map: "지도",
    reset: "초기화",
    center: "중앙",
    top10: "상위 10개 점수",
    label: "라벨",
    bold: "굵게",
    flags: "국기",
    names: "이름",
    noClick: "텍스트 클릭 금지",
    down: "아래",
    font: "글꼴",
    performance: "성능",
    skib: "스킵"
},

ta: {  // Tamil
    darkMode: "மறுபடி மோடு",
    background: "பின்னணி",
    map: "பட்டியல்",
    reset: "மீட்டமை",
    center: "மையம்",
    top10: "மேல் 10 மதிப்பெண்கள்",
    label: "சுட்டி",
    bold: "கோட்டுத்தரம்",
    flags: "குடியரசுகள்",
    names: "பெயர்கள்",
    noClick: "உரை கிளிக் செய்ய முடியாது",
    down: "கீழே",
    font: "அகராதி",
    performance: "செயற்பாடு",
    skib: "விடுபற்று"
},
    th: {  // Thai
        darkMode: "มืด",
        background: "พื้นหลัง",
        map: "แผนที่",
        reset: "รีเซ็ต",
        center: "ศูนย์",
        top10: "10 อันดับแรก",
        label: "ป้ายกำกับ",
        bold: "ตัวหนา",
        flags: "ธง",
        names: "ชื่อ",
        noClick: "ไม่มีคลิกบนข้อความ",
        down: "ลง",
        font: "ฟอนต์",
        performance: "ประสิทธิภาพ",
        skib: "สกิบ",
    },
    es: {  // Spanish
        darkMode: "Oscuro",
        background: "Fondo",
        map: "Mapa",
        reset: "Reiniciar",
        center: "Centro",
        top10: "Top 10",
        label: "Etiqueta",
        bold: "Negrita",
        flags: "Banderas",
        names: "Nombres",
        noClick: "No clic en el texto",
        down: "Abajo",
        font: "Fuente",
        performance: "Rendimiento",
        skib: "Skib",
    },
    de: {  // German
        darkMode: "Dunkel",
        background: "Hintergrund",
        map: "Karte",
        reset: "Zurücksetzen",
        center: "Zentrum",
        top10: "Top 10",
        label: "Etikett",
        bold: "Fett",
        flags: "Flaggen",
        names: "Namen",
        noClick: "Kein Klick auf Text",
        down: "Nach unten",
        font: "Schriftart",
        performance: "Leistung",
        skib: "Skib",
    },
    fr: {  // French
        darkMode: "Sombre",
        background: "Arrière-plan",
        map: "Carte",
        reset: "Réinitialiser",
        center: "Centre",
        top10: "Top 10",
        label: "Étiquette",
        bold: "Gras",
        flags: "Drapeaux",
        names: "Noms",
        noClick: "Pas de clic sur le texte",
        down: "Bas",
        font: "Police",
        performance: "Performance",
        skib: "Skib",
    },
    it: {  // Italian
        darkMode: "Scuro",
        background: "Sfondo",
        map: "Mappa",
        reset: "Reimposta",
        center: "Centro",
        top10: "Top 10",
        label: "Etichetta",
        bold: "Grassetto",
        flags: "Bandiere",
        names: "Nomi",
        noClick: "Nessun clic sul testo",
        down: "Giù",
        font: "Carattere",
        performance: "Prestazioni",
        skib: "Skib",
    },
    nl: {  // Dutch (Nederlands)
        darkMode: "Donker",
        background: "Achtergrond",
        map: "Kaart",
        reset: "Reset",
        center: "Centrum",
        top10: "Top 10",
        label: "Label",
        bold: "Vet",
        flags: "Vlaggen",
        names: "Namen",
        noClick: "Geen klik op tekst",
        down: "Omlaag",
        font: "Lettertype",
        performance: "Prestatie",
        skib: "Skib",
    },
    pt: {  // Portuguese
        darkMode: "Escuro",
        background: "Fundo",
        map: "Mapa",
        reset: "Redefinir",
        center: "Centro",
        top10: "Top 10",
        label: "Rótulo",
        bold: "Negrito",
        flags: "Bandeiras",
        names: "Nomes",
        noClick: "Sem clique no texto",
        down: "Para baixo",
        font: "Fonte",
        performance: "Desempenho",
        skib: "Skib",
    },
    sv: {  // Swedish
        darkMode: "Mörk",
        background: "Bakgrund",
        map: "Karta",
        reset: "Återställ",
        center: "Centrum",
        top10: "Top 10",
        label: "Etikett",
        bold: "Fetstil",
        flags: "Flaggor",
        names: "Namn",
        noClick: "Ingen klick på text",
        down: "Ner",
        font: "Typsnitt",
        performance: "Prestanda",
        skib: "Skib",
    },
    tr: {  // Turkish
        darkMode: "Koyu",
        background: "Arka Plan",
        map: "Harita",
        reset: "Sıfırla",
        center: "Merkez",
        top10: "Top 10",
        label: "Etiket",
        bold: "Kalın",
        flags: "Bayraklar",
        names: "İsimler",
        noClick: "Metne tıklama yok",
        down: "Aşağı",
        font: "Yazı Tipi",
        performance: "Performans",
        skib: "Skib",
    },
    ja: {  // Japanese
        darkMode: "暗い",
        background: "背景",
        map: "地図",
        reset: "リセット",
        center: "センター",
        top10: "トップ10",
        label: "ラベル",
        bold: "太字",
        flags: "旗",
        names: "名前",
        noClick: "テキストをクリックしない",
        down: "下",
        font: "フォント",
        performance: "パフォーマンス",
        skib: "スキブ",
    },
    pl: {  // Polish
        darkMode: "Ciemny",
        background: "Tło",
        map: "Mapa",
        reset: "Zresetuj",
        center: "Centrum",
        top10: "Top 10",
        label: "Etykieta",
        bold: "Pogrubienie",
        flags: "Flagi",
        names: "Nazwy",
        noClick: "Brak kliknięcia na tekst",
        down: "Dół",
        font: "Czcionka",
        performance: "Wydajność",
        skib: "Skib",	
    },
	  af: {  // Afrikaans
        darkMode: "Donker",
        background: "Agtergrond",
        map: "Kaart",
        reset: "Herstel",
        center: "Sentrum",
        top10: "Top 10",
        label: "Etiket",
        bold: "Vetgedruk",
        flags: "Vlae",
        names: "Name",
        noClick: "Geen klik op teks",
        down: "Af",
        font: "Font",
        performance: "Prestasie",
        skib: "Skib",
    },
    ar: {  // Arabic
        darkMode: "مظلم",
        background: "الخلفية",
        map: "خريطة",
        reset: "إعادة تعيين",
        center: "مركز",
        top10: "أفضل 10",
        label: "تسمية",
        bold: "عريض",
        flags: "أعلام",
        names: "أسماء",
        noClick: "لا يوجد نقر على النص",
        down: "أسفل",
        font: "الخط",
        performance: "الأداء",
        skib: "سكيب",
    },
    bg: {  // Bulgarian
        darkMode: "Тъмно",
        background: "Фон",
        map: "Карта",
        reset: "Нулиране",
        center: "Център",
        top10: "Топ 10",
        label: "Етикет",
        bold: "Удебелен",
        flags: "Знамена",
        names: "Имена",
        noClick: "Без клик на текста",
        down: "Надолу",
        font: "Шрифт",
        performance: "Производителност",
        skib: "Скиб",
    },
    ca: {  // Catalan
        darkMode: "Fosc",
        background: "Fons",
        map: "Mapa",
        reset: "Restablir",
        center: "Centre",
        top10: "Top 10",
        label: "Etiqueta",
        bold: "Negreta",
        flags: "Banderes",
        names: "Noms",
        noClick: "Sense clic al text",
        down: "A baix",
        font: "Font",
        performance: "Rendiment",
        skib: "Skib",
    },
    cs: {  // Czech
        darkMode: "Tmavý",
        background: "Pozadí",
        map: "Mapa",
        reset: "Obnovit",
        center: "Střed",
        top10: "Top 10",
        label: "Štítek",
        bold: "Tučné",
        flags: "Vlajky",
        names: "Názvy",
        noClick: "Žádné kliknutí na text",
        down: "Dolů",
        font: "Písmo",
        performance: "Výkon",
        skib: "Skib",
    },
    da: {  // Danish
        darkMode: "Mørk",
        background: "Baggrund",
        map: "Kort",
        reset: "Nulstil",
        center: "Center",
        top10: "Top 10",
        label: "Etiket",
        bold: "Fed",
        flags: "Flag",
        names: "Navne",
        noClick: "Ingen klik på tekst",
        down: "Ned",
        font: "Skrifttype",
        performance: "Ydeevne",
        skib: "Skib",
    },
    de: {  // German
        darkMode: "Dunkel",
        background: "Hintergrund",
        map: "Karte",
        reset: "Zurücksetzen",
        center: "Zentrum",
        top10: "Top 10",
        label: "Etikett",
        bold: "Fett",
        flags: "Flaggen",
        names: "Namen",
        noClick: "Kein Klick auf Text",
        down: "Nach unten",
        font: "Schriftart",
        performance: "Leistung",
        skib: "Skib",
    },
    el: {  // Greek
        darkMode: "Σκοτεινό",
        background: "Φόντο",
        map: "Χάρτης",
        reset: "Επαναφορά",
        center: "Κέντρο",
        top10: "Κορυφαία 10",
        label: "Ετικέτα",
        bold: "Έντονα",
        flags: "Σημαίες",
        names: "Ονόματα",
        noClick: "Χωρίς κλικ στο κείμενο",
        down: "Κάτω",
        font: "Γραμματοσειρά",
        performance: "Απόδοση",
        skib: "Σκιμπ",
    },
    et: {  // Estonian
        darkMode: "Tume",
        background: "Taust",
        map: "Kaart",
        reset: "Lähtesta",
        center: "Keskus",
        top10: "Top 10",
        label: "Silt",
        bold: "Paks",
        flags: "Lipud",
        names: "Nimed",
        noClick: "Ei klikka tekstil",
        down: "Alla",
        font: "Font",
        performance: "Jõudlus",
        skib: "Skib",
    },
    fi: {  // Finnish
        darkMode: "Tumma",
        background: "Tausta",
        map: "Kartta",
        reset: "Palauta",
        center: "Keskus",
        top10: "Top 10",
        label: "Tarra",
        bold: "Lihavoitu",
        flags: "Liput",
        names: "Nimet",
        noClick: "Ei klikkaa tekstiä",
        down: "Alas",
        font: "Fontti",
        performance: "Suorituskyky",
        skib: "Skib",
    },
	ga: {  // Irish
        darkMode: "Dorcha",
        background: "Cúlra",
        map: "Léarscáil",
        reset: "Athshocrú",
        center: "Ionad",
        top10: "Barr 10",
        label: "Lipéad",
        bold: "Trom",
        flags: "Bratacha",
        names: "Ainmneacha",
        noClick: "Gan cliceáil ar théacs",
        down: "Síos",
        font: "Cló",
        performance: "Feidhmíocht",
        skib: "Skib",
    },
    he: {  // Hebrew
        darkMode: "כהה",
        background: "רקע",
        map: "מפה",
        reset: "איפוס",
        center: "מרכז",
        top10: "עשרת הראשונים",
        label: "תווית",
        bold: "מודגש",
        flags: "דגלים",
        names: "שמות",
        noClick: "אין לחיצה על טקסט",
        down: "למטה",
        font: "גופן",
        performance: "ביצועים",
        skib: "סְקִיבּ",
    },
    hi: {  // Hindi
        darkMode: "डार्क",
        background: "पृष्ठभूमि",
        map: "नक्शा",
        reset: "रीसेट",
        center: "केंद्र",
        top10: "शीर्ष 10",
        label: "लेबल",
        bold: "मोटा",
        flags: "झंडे",
        names: "नाम",
        noClick: "टेक्स्ट पर क्लिक न करें",
        down: "नीचे",
        font: "फॉन्ट",
        performance: "प्रदर्शन",
        skib: "स्किब",
    },
    hr: {  // Croatian
        darkMode: "Tamno",
        background: "Pozadina",
        map: "Karta",
        reset: "Poništi",
        center: "Centar",
        top10: "Top 10",
        label: "Oznaka",
        bold: "Podebljano",
        flags: "Zastave",
        names: "Imena",
        noClick: "Nema klika na tekst",
        down: "Dolje",
        font: "Font",
        performance: "Izvedba",
        skib: "Skib",
    },
    hu: {  // Hungarian
        darkMode: "Sötét",
        background: "Háttér",
        map: "Térkép",
        reset: "Visszaállítás",
        center: "Középpont",
        top10: "Top 10",
        label: "Címke",
        bold: "Félkövér",
        flags: "Zászlók",
        names: "Nevek",
        noClick: "Nincs kattintás a szövegre",
        down: "Le",
        font: "Betűtípus",
        performance: "Teljesítmény",
        skib: "Skib",
    },
    id: {  // Indonesian
        darkMode: "Gelap",
        background: "Latar Belakang",
        map: "Peta",
        reset: "Setel Ulang",
        center: "Pusat",
        top10: "Top 10",
        label: "Label",
        bold: "Tebal",
        flags: "Bendera",
        names: "Nama",
        noClick: "Tidak ada klik pada teks",
        down: "Turun",
        font: "Font",
        performance: "Kinerja",
        skib: "Skib",
    },
    is: {  // Icelandic
        darkMode: "Dökkur",
        background: "Bakgrunnur",
        map: "Kort",
        reset: "Endurstilla",
        center: "Miðja",
        top10: "Topp 10",
        label: "Merki",
        bold: "Feitletrað",
        flags: "Fánar",
        names: "Nöfn",
        noClick: "Enginn smellur á texta",
        down: "Niður",
        font: "Letur",
        performance: "Frammistaða",
        skib: "Skib",
    },
    lt: {  // Lithuanian
        darkMode: "Tamsus",
        background: "Fonas",
        map: "Žemėlapis",
        reset: "Atstatyti",
        center: "Centras",
        top10: "Top 10",
        label: "Žyma",
        bold: "Paryškintas",
        flags: "Vėliavos",
        names: "Vardai",
        noClick: "Jokio spustelėjimo ant teksto",
        down: "Žemyn",
        font: "Šriftas",
        performance: "Veikimas",
        skib: "Skib",
    },
    lv: {  // Latvian
        darkMode: "Tumšs",
        background: "Fons",
        map: "Karte",
        reset: "Atiestatīt",
        center: "Centrs",
        top10: "Top 10",
        label: "Etiķete",
        bold: "Treknraksts",
        flags: "Karogi",
        names: "Vārdi",
        noClick: "Nav klikšķa uz teksta",
        down: "Uz leju",
        font: "Fonti",
        performance: "Veiktspēja",
        skib: "Skib",
    },
    no: {  // Norwegian
        darkMode: "Mørk",
        background: "Bakgrunn",
        map: "Kart",
        reset: "Tilbakestill",
        center: "Senter",
        top10: "Topp 10",
        label: "Etikett",
        bold: "Fet",
        flags: "Flagg",
        names: "Navn",
        noClick: "Ingen klikk på tekst",
        down: "Ned",
        font: "Skrift",
        performance: "Ytelse",
        skib: "Skib",
    },
    nl: {  // Dutch
        darkMode: "Donker",
        background: "Achtergrond",
        map: "Kaart",
        reset: "Reset",
        center: "Centrum",
        top10: "Top 10",
        label: "Label",
        bold: "Vet",
        flags: "Vlaggen",
        names: "Namen",
        noClick: "Geen klik op tekst",
        down: "Omlaag",
        font: "Lettertype",
        performance: "Prestatie",
        skib: "Skib",
    },
    ro: {  // Romanian
        darkMode: "Întunecat",
        background: "Fundal",
        map: "Hartă",
        reset: "Resetare",
        center: "Centru",
        top10: "Top 10",
        label: "Etichetă",
        bold: "Aldin",
        flags: "Steaguri",
        names: "Nume",
        noClick: "Fără clic pe text",
        down: "Jos",
        font: "Font",
        performance: "Performanță",
        skib: "Skib",
    },
    sk: {  // Slovakian
        darkMode: "Tmavý",
        background: "Pozadie",
        map: "Mapa",
        reset: "Resetovať",
        center: "Centrum",
        top10: "Top 10",
        label: "Štítok",
        bold: "Tučné",
        flags: "Vlajky",
        names: "Mená",
        noClick: "Žiadne kliknutie na text",
        down: "Dole",
        font: "Písmo",
        performance: "Výkon",
        skib: "Skib",
    },
	sl: {  //slovenian
    darkMode: "Temni način",
    background: "Ozadje",
    map: "Zemljevid",
    reset: "Ponastavi",
    center: "Središče",
    top10: "Top 10",
    label: "Oznaka",
    bold: "Krepko",
    flags: "Zastave",
    names: "Imena",
    noClick: "Brez klika na besedilo",
    down: "Dol",
    font: "Pisava",
    performance: "Učinkovitost",
    skib: "Skib",
},
sm: {  //somaon
    darkMode: "Mōkū",
    background: "Mataitū",
    map: "Māfuaaga",
    reset: "Toe faʻalelei",
    center: "Tulaga",
    top10: "Teteʻe 10",
    label: "Faailoga",
    bold: "Maualuga",
    flags: "Fuʻa",
    names: "Igoa",
    noClick: "E le mafai ona taʻi i le tusitusiga",
    down: "I lalo",
    font: "Fonti",
    performance: "Faʻatinoga",
    skib: "Skib",
},
sq: {  //albanian
    darkMode: "Modi i errët",
    background: "Sfondi",
    map: "Hartë",
    reset: "Rivendos",
    center: "Qendër",
    top10: "Top 10",
    label: "Etiketë",
    bold: "Gjashtë",
    flags: "Flamuj",
    names: "Emra",
    noClick: "Pa klikuar në tekst",
    down: "Poshtë",
    font: "Font",
    performance: "Performancë",
    skib: "Skib",
},
sr: {  // Serbian
    darkMode: "Tamni režim / Тамни режим",
    background: "Pozadina / Позадина",
    map: "Karta / Мапа",
    reset: "Resetuj / Ресетуј",
    center: "Centar / Центар",
    top10: "Top 10 / Топ 10 резултата",
    label: "Oznaka / Етикета",
    bold: "Podebljano / Подебљано",
    flags: "Zastave / Заставе",
    names: "Imena / Имена",
    noClick: "Bez klika na tekst / Није могуће кликнути на текст",
    down: "Dole / Доле",
    font: "Font / Фонт",
    performance: "Performansa / Изведба",
    skib: "Skib / Прескочи"
},
sv: {  //swedish
    darkMode: "Mörkt läge",
    background: "Bakgrund",
    map: "Karta",
    reset: "Återställ",
    center: "Center",
    top10: "Topp 10",
    label: "Etikett",
    bold: "Fet",
    flags: "Flaggor",
    names: "Namn",
    noClick: "Ingen klick på text",
    down: "Ner",
    font: "Typsnitt",
    performance: "Prestanda",
    skib: "Skib",
},
uk: {  //urkainian
    darkMode: "Темний режим",
    background: "Фон",
    map: "Карта",
    reset: "Скинути",
    center: "Центр",
    top10: "Топ 10",
    label: "Мітка",
    bold: "Жирний",
    flags: "Прапори",
    names: "Імена",
    noClick: "Без натискання на текст",
    down: "Вниз",
    font: "Шрифт",
    performance: "Продуктивність",
    skib: "Skib",
},
uz: {  //uzbek
    darkMode: "Qora rejim",
    background: "Fon",
    map: "Xarita",
    reset: "Qayta tiklash",
    center: "Markaz",
    top10: "Eng yaxshi 10",
    label: "Belgi",
    bold: "Qalin",
    flags: "Bayroqlar",
    names: "Ismlar",
    noClick: "Matnga bosmaslik",
    down: "Pastga",
    font: "Shrift",
    performance: "Ishlash",
    skib: "Skib",
},
zh: {  //chinese
    darkMode: "暗模式",
    background: "背景",
    map: "地图",
    reset: "重置",
    center: "中心",
    top10: "前10名",
    label: "标签",
    bold: "粗体",
    flags: "旗帜",
    names: "名称",
    noClick: "不点击文本",
    down: "向下",
    font: "字体",
    performance: "性能",
    skib: "Skib",
},
am: {  
    darkMode: "ጨለማ እንቅስቃሴ",
    background: "መነሻ",
    map: "ካርታ",
    reset: "ዳግመ እንቅስቃሴ",
    center: "መዋቅር",
    top10: "ላይ 10",
    label: "መለያ",
    bold: "በጣም አሳሳብ",
    flags: "ዳርቻዎች",
    names: "ስሞች",
    noClick: "በጽሁፍ ላይ አይታተኑ",
    down: "በታች",
    font: "ፎንት",
    performance: "እንቅስቃሴ",
    skib: "Skib",
},
si: {  
    darkMode: "අඳුරු ආකාරය",
    background: "පසුබැසීම",
    map: "සිතියම",
    reset: "නැවත සකසන්න",
    center: "මැදිවරණය",
    top10: "ඉහළ 10",
    label: "චානය",
    bold: "මට සටහන්",
    flags: "ජාතික බැන්දුව",
    names: "නම",
    noClick: "පොත්කිරීමේ පාඨය මත ක්ලික් නොකළ",
    down: "පහල",
    font: "අකුර",
    performance: "කාර්ය සාධනය",
    skib: "Skib",
},
fa: {  
    darkMode: "حالت تاریک",
    background: "پس‌زمینه",
    map: "نقشه",
    reset: "تنظیم مجدد",
    center: "مرکز",
    top10: "10 برتر",
    label: "برچسب",
    bold: "زیر خط دار",
    flags: "پرچم‌ها",
    names: "نام‌ها",
    noClick: "بدون کلیک بر روی متن",
    down: "پایین",
    font: "فونت",
    performance: "عملکرد",
    skib: "Skib",
}
};


let currentLanguageCode = getCurrentLanguageCode();


function getCurrentLanguageCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    const urlPath = window.location.pathname;
    return localeParam || urlPath.split('/')[1] || 'default';
}


function applyTranslations(enable) {
    const selectedTranslations = translations[currentLanguageCode] || translations.default;

    const buttonLabels = [
        { id: "darkModeCbxId", key: "darkMode" },
        { id: "mapBgId", key: "background" },
        { id: "mapPaddingCbxId", key: "map" },
        { id: "mapResetCbxId", key: "reset" },
        { id: "removeLeftPaddingCbxId", key: "center" },
        { id: "showScoresCbxId", key: "top10" },
        { id: "showCursorLabelCbxId", key: "label" },
        { id: "boldNamesCbxId", key: "bold" },
        { id: "showFlagCbxId", key: "flags" },
        { id: "showNamesCbxId", key: "names" },
        { id: "remClickOnCbxId", key: "noClick" },
        { id: "moveCbxId", key: "down" },
        { id: "oldFontCbxId", key: "font" },
        { id: "performanceCbxId", key: "performance" },
        { id: "skibidiCbxId", key: "skib" },
    ];

    buttonLabels.forEach(({ id, key }) => {
        const element = document.getElementById(id);
        if (element && element.nextElementSibling) {
            
            element.nextElementSibling.textContent = enable ? selectedTranslations[key] : translations.default[key];
        }
    });
}


function toggleTranslations() {
    const toggleButton = document.getElementById("toggleTranslationButton");
    const isTranslationEnabled = toggleButton.dataset.enabled === "true";

    
    toggleButton.dataset.enabled = !isTranslationEnabled;
    toggleButton.textContent = !isTranslationEnabled ? "Disable Translations" : "Enable Translations";

    
    chrome.storage.local.set({ translationsEnabled: !isTranslationEnabled });
    
    
    applyTranslations(!isTranslationEnabled);
}


function createTranslationToggleButton() {
    if (!document.getElementById("toggleTranslationButton")) {
        const toggleButton = document.createElement("button");
        toggleButton.id = "toggleTranslationButton";
        toggleButton.dataset.enabled = "true"; 
        toggleButton.textContent = "Disable Translations";

        
        toggleButton.style.backgroundColor = "#333"; 
        toggleButton.style.color = "#fff";           
        toggleButton.style.border = "none";          
        toggleButton.style.borderRadius = "20px";    
        toggleButton.style.padding = "10px 20px";    
        toggleButton.style.marginTop = "10px";       
        toggleButton.style.cursor = "pointer";       
        toggleButton.style.fontFamily = "Arial, sans-serif"; 
        toggleButton.style.fontSize = "14px";        
        toggleButton.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; 
        toggleButton.style.transition = "background-color 0.3s, transform 0.2s"; 

        
        toggleButton.onmouseover = () => toggleButton.style.backgroundColor = "#555"; 
        toggleButton.onmouseout = () => toggleButton.style.backgroundColor = "#333";   
        toggleButton.onmousedown = () => toggleButton.style.transform = "scale(0.98)";
        toggleButton.onmouseup = () => toggleButton.style.transform = "scale(1)";      // Return to original size

        document.getElementById("NekoAddon").appendChild(toggleButton);

        toggleButton.addEventListener("click", toggleTranslations);

        
        chrome.storage.local.get("translationsEnabled", (data) => {
            const enabled = data.translationsEnabled !== false; 
            toggleButton.dataset.enabled = enabled;
            toggleButton.textContent = enabled ? "Disable Translations" : "Enable Translations";
            applyTranslations(enabled);
        });
    }
}


setInterval(() => {
    const newLanguageCode = getCurrentLanguageCode();
    if (newLanguageCode !== currentLanguageCode) {
        currentLanguageCode = newLanguageCode;
        
        const translationsEnabled = document.getElementById("toggleTranslationButton").dataset.enabled === "true";
        applyTranslations(translationsEnabled);
    }
}, 1000);


function translateButtonsBasedOnURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const localeParam = urlParams.get('locale');
    const urlPath = window.location.pathname;
    const languageCode = localeParam || urlPath.split('/')[1] || 'default';

    console.log("Detected languageCode:", languageCode); 

    
    const selectedTranslations = translations[languageCode] || translations.default;

    
    const buttonLabels = [
        { id: "darkModeCbxId", key: "darkMode" },
        { id: "mapBgId", key: "background" },
        { id: "mapPaddingCbxId", key: "map" },
        { id: "mapResetCbxId", key: "reset" },
        { id: "removeLeftPaddingCbxId", key: "center" },
        { id: "showScoresCbxId", key: "top10" },
        { id: "showCursorLabelCbxId", key: "label" },
        { id: "boldNamesCbxId", key: "bold" },
        { id: "showFlagCbxId", key: "flags" },
        { id: "showNamesCbxId", key: "names" },
        { id: "remClickOnCbxId", key: "noClick" },
        { id: "moveCbxId", key: "down" },
        { id: "oldFontCbxId", key: "font" },
        { id: "performanceCbxId", key: "performance" },
        { id: "skibidiCbxId", key: "skib" },
    ];

    
    buttonLabels.forEach(({ id, key }) => {
        const element = document.getElementById(id);
        if (element && element.nextElementSibling) {
            element.nextElementSibling.textContent = selectedTranslations[key];
        } else {
            console.warn(`Element with ID "${id}" or its label not found.`);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true, subtree: true });
});

function removeElements(selector) {
    
    const elements = document.querySelectorAll(selector);
    
    
    elements.forEach(element => {
        element.remove();
    });
}

function performance() {
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

    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        
        if (element) {
            if (element.style.display === 'none') {
                addElements(selector);
            } else {
                removeElements(selector);
            }
        }
    });
}

function removeElements(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.display = 'none';
    }
}

function addElements(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.display = '';
    }
}

function skibidi(bool) {
let userInput = prompt("just fully skib out here dawg (often: 0 0 900 700 (x offset  y offset  width  height)");


if (userInput) {
    
    const svgElement = document.getElementById('svgpoint'); 

    
    svgElement.setAttribute('viewBox', userInput);
	}
}

///  Custom highscore table positioning, uses the `unset` bool for looping, as it's not loaded instantaneously.
function customTable(bool) {
    if (bool) {
        if (document.getElementsByClassName("highscore_table__oKrYg")[0]) {

            document.getElementsByClassName("highscore_table__oKrYg")[0].style.position = "absolute";
            document.getElementsByClassName("highscore_table__oKrYg")[0].style.backgroundColor = "unset";
            document.getElementsByClassName("highscore_table__oKrYg")[0].style.left = "0px";
            unset = false;
        }
    }
}
///
function remClickOn(bool) {
    if (bool) {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').childNodes[0].textContent = "";
            }
        }
    }
    else {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').childNodes[0].textContent = "Click on ";
            }
        }
    }

}
///  Map bottom padding.
function mapPadding(bool) {
    if (bool) {
        if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) {
            let a = document.getElementsByClassName("extra-info_extraInfo__80Tci");
            if (a[0]) { a[0].style.marginTop = "200px" };
        }
    }
    else {
        if (document.getElementsByClassName("extra-info_extraInfo__80Tci")) {
            let a = document.getElementsByClassName("extra-info_extraInfo__80Tci");
            if (a[0]) { a[0].style.marginTop = "0px" };
        }
    }
}
function zoomFunc(amnt, px, zoom) {
    if (zoom == amnt) {
        if (document.querySelectorAll("aside.seterra_sidebarLeft__wQo_r.seterra_sidebar__p6xf1.seterra_adContainerLeft__zTLsS")[0]) {
            document.querySelectorAll("aside.seterra_sidebarLeft__wQo_r.seterra_sidebar__p6xf1.seterra_adContainerLeft__zTLsS")[0].style.width = px + "px";
        }
        if (amnt <= 1.4) {
            if(document.querySelectorAll("aside.seterra_sidebarRight__bXW1x.seterra_sidebar__p6xf1.seterra_adContainerRight__lDew4")[0]){
            document.querySelectorAll("aside.seterra_sidebarRight__bXW1x.seterra_sidebar__p6xf1.seterra_adContainerRight__lDew4")[0].style.display = "block";
        }
        }
        else {
            if(document.querySelectorAll("aside.seterra_sidebarRight__bXW1x.seterra_sidebar__p6xf1.seterra_adContainerRight__lDew4")[0]){
            document.querySelectorAll("aside.seterra_sidebarRight__bXW1x.seterra_sidebar__p6xf1.seterra_adContainerRight__lDew4")[0].style.display = "none";
            }
        }
    }
}

///  Removal of empty space next to map.
function noLeftSpace(bool) {
    if (bool) {

        let zoom = window.devicePixelRatio.toFixed(1); // 100% = 1.0, 50% = 0.5

        zoomFunc(0.5, 410, zoom) // 50%
        zoomFunc(0.6, 410, zoom) // 50%
        zoomFunc(0.7, 400, zoom) // 70%
        zoomFunc(0.8, 400, zoom) // 80%
        zoomFunc(0.9, 400, zoom) // 90%
        zoomFunc(1.0, 400, zoom) // 100%
        zoomFunc(1.1, 400, zoom) // 110%
        zoomFunc(1.2, 380, zoom) // 120%
        zoomFunc(1.3, 315, zoom) // 130%
        zoomFunc(1.4, 267, zoom) // 140%
        zoomFunc(1.5, 267, zoom) // 150+%
    }
    else {
        if (document.querySelectorAll("aside.seterra_sidebarLeft__wQo_r.seterra_sidebar__p6xf1.seterra_adContainerLeft__zTLsS")[0]) {
            document.querySelectorAll("aside.seterra_sidebarLeft__wQo_r.seterra_sidebar__p6xf1.seterra_adContainerLeft__zTLsS")[0].style.width = "160px";
        }
    }

}

///  Map reset function.
function spaceKeyDownHandler(event) {
    if (event.code == "Space") {
        event.preventDefault();
        if (document.querySelectorAll('button.button_button__aR6_e.button_variantPrimary__u3WzI')[0]) {
            document.querySelectorAll('button.button_button__aR6_e.button_variantPrimary__u3WzI')[0].click();
        }
        else {
            document.querySelectorAll("button.button_button__aR6_e.button_variantSecondaryInverted__6G2ex.button_sizeSmall__MB_qj")[1].click();
        }
    }
}
///  Map reset check.
function mapReset(bool) {
    if (bool) {
        document.addEventListener("keydown", spaceKeyDownHandler);
    }
    else {
        document.removeEventListener("keydown", spaceKeyDownHandler);
    }
}

function toggleDarkMode() {
    const darkModeCheckbox = document.getElementById("darkModeCbxId");

    if (darkModeCheckbox.checked) {
        darkMode();
        chrome.storage.local.set({ darkMode: true });
    } else {
        lightMode();
        chrome.storage.local.set({ darkMode: false });
    }
}

// Updated darkMode function with static navy blue color for "Addons" header
function darkMode() {
    const darkElements = [
        { selector: "div.seterra_content__nGh5_", style: { backgroundColor: "#181A1B" } },
        { selector: "div.game-container_sizeSmall___C_u3", style: { backgroundColor: "#181A1B" } },
        { selector: "div.game-container_sizeMedium__ZYDZN", style: { backgroundColor: "#181A1B" } },
        { selector: "div.container_sizeMedium__Fwp9_", style: { backgroundColor: "#181A1B" } },
        { selector: "a.games-list_viewAllLink__NQa_n b", style: { color: "black" } },
        { selector: ".game-header_wrapper__JDf24", style: { background: "rgba(24, 26, 27, 0.5)" } },
        { selector: "div.container_content__Z3nYC", style: { backgroundColor: "#181A1B" } },
        { selector: ".game-tooltip_tooltip__w_58_", style: { background: "rgba(24, 26, 27, 0.75)" } },
        { selector: ".highscore_table__oKrYg", style: { backgroundColor: "rgba(0,0,0,0)" } },
        { selector: ".game-area_gameArea__G2ABs > *", style: { color: "black" } },
        { selector: ".highscore_heading__mqofP", style: { color: "#FF006E" } },
    ];

    darkElements.forEach(({ selector, style }) => {
        document.querySelectorAll(selector).forEach((el) => {
            Object.assign(el.style, style);
        });
    });

    
    document.querySelectorAll(':not(a):not(input):not(#nekoheaderid):not(#versionid)').forEach((element) => {
        element.style.color = 'white';
    });
}

function lightMode() {
    const lightElements = [
        { selector: "div.seterra_content__nGh5_", style: { backgroundColor: "#E7E5E4" } },
        { selector: "div.game-container_sizeSmall___C_u3", style: { backgroundColor: "#E7E5E4" } },
        { selector: "div.game-container_sizeMedium__ZYDZN", style: { backgroundColor: "#E7E5E4" } },
        { selector: "div.container_sizeMedium__Fwp9_", style: { backgroundColor: "#E7E5E4" } },
        { selector: "a.games-list_viewAllLink__NQa_n b", style: { color: "white" } },
        { selector: ".game-header_wrapper__JDf24", style: { background: "rgba(231, 229, 228, 0.5)" } },
        { selector: "div.container_content__Z3nYC", style: { backgroundColor: "#E7E5E4" } },
        { selector: ".game-tooltip_tooltip__w_58_", style: { background: "rgba(231, 229, 228, 0.75)" } },
        { selector: ".highscore_table__oKrYg", style: { backgroundColor: "rgba(0,0,0,0)" } },
        { selector: ".game-area_gameArea__G2ABs > *", style: { color: "white" } },
        { selector: ".highscore_heading__mqofP", style: { color: "#FF006E" } },
    ];

    lightElements.forEach(({ selector, style }) => {
        document.querySelectorAll(selector).forEach((el) => {
            Object.assign(el.style, style);
        });
    });

    
    document.querySelectorAll(':not(a):not(input):not(#nekoheaderid):not(#versionid)').forEach((element) => {
        element.style.color = 'black';
    });
}

function initDarkModeToggle() {
    const darkModeCheckbox = document.getElementById("darkModeCbxId");

    
    getData("darkMode").then((isDarkMode) => {
        darkModeCheckbox.checked = !!isDarkMode;
        if (isDarkMode) darkMode();
        else lightMode();
    });

    darkModeCheckbox.addEventListener("change", toggleDarkMode);
}
///  Toggle cursor label visibility.
function cursorLabel(bool) {
    if (bool) {
        if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) {
            document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "block";
        }
    }
    else {
        if (document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0]) {
            document.getElementsByClassName('game-area_tooltip__Ns9Yi')[0].style.display = "none";
        }
    }
}
///  Toggle bold area names.
function boldNames(bool) {
    if (bool) {
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
    else {
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
}
///  Toggle area flags.
function flags(bool) {
    if (bool) {
        if (document.getElementsByClassName('corner-image_wrapper__ej_p1')[0]) {
            document.getElementsByClassName('corner-image_wrapper__ej_p1')[0].style.display = "flex";
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img').style.display = "flex";
            }
        }
    }
    else {
        if (document.getElementsByClassName('corner-image_wrapper__ej_p1')[0]) {
            document.getElementsByClassName('corner-image_wrapper__ej_p1')[0].style.display = "none";
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img')) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('img').style.display = "none";
            }
        }
    }
}
///  Toggle area names.
function names(bool) {
    if (bool) {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0]) {
                document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].style.display = "block";
            }
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.paddingLeft = "8px"; // label padding
        }
        if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) {
            document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].style.display = "block"
        }
    }
    else {
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0]) {
                if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].childNodes[0]) {
                    document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].childNodes[0].style.display = "none";
                }
            }
        }
        if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {
            document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.paddingLeft = "0px";
        }
        if (document.getElementsByClassName('game-header_withDivider__ZHYAO')[2]) {
            document.getElementsByClassName('game-header_withDivider__ZHYAO')[2].style.display = "none"
        }
    }
}
///  Sets data if none is present. (defaults)
function setInitialData(data) {
    return chrome.storage.local.get(Object.keys(data)).then(result => {
        for (let key in data) {
            if (!(key in result)) {
                result[key] = data[key];
            }
        }
        return chrome.storage.local.set(result);
    });
}
///  Grabs data from local storage.
function retrieveData(name) {
    return chrome.storage.local.get(name).then(result => {
        return result[name];
    });
}
///  Spits out readable data from local storage.
function getData(name) {
    return retrieveData(name).then(value => {
        return value;
    });
}














///  Constant loop for page checks.
function meow() {
	
	 createTranslationToggleButton();

   if (["/vgp", "/fl", "/quiz/seterra/challenge", "/it/vgp", "/it/fl", "/it/quiz/seterra/challenge", "/de/vgp", "/de/fl", "/de/quiz/seterra/challenge","/es/vgp", "/es/fl", "/es/quiz/seterra/challenge","/fr/vgp", "/fr/fl", "/fr/quiz/seterra/challenge","/nl/vgp", "/nl/fl", "/nl/quiz/seterra/challenge","/pt/vgp", "/pt/fl", "/pt/quiz/seterra/challenge","/sv/vgp", "/sv/fl", "/sv/quiz/seterra/challenge","/tr/vgp", "/tr/fl", "/tr/quiz/seterra/challenge","/ja/vgp", "/ja/fl", "/ja/quiz/seterra/challenge","/pl/vgp", "/pl/fl", "/pl/quiz/seterra/challenge",].some(path => window.location.pathname.startsWith(path))) {
    createForm();
    document.getElementById("NekoAddon").style.display = "block";
} else {
    document.getElementById("NekoAddon").style.display = "none";
}

getData("darkMode").then(beans1 => {
    if (beans1) {
        document.getElementById("darkModeCbxId").checked = true;
        initDarkModeToggle();
    } else {
        document.getElementById("darkModeCbxId").checked = false;
        initDarkModeToggle();
    }
});

    getData("mapBg").then(beans11 => {
        if (beans11) {
            document.getElementById("mapBgId").checked = true;
            mapBg(true);
        }
        else {
            document.getElementById("mapBgId").checked = false;
            mapBg(false);
        }
    });
    getData("mapPadding").then(beans2 => {
        if (beans2) {
            document.getElementById("mapPaddingCbxId").checked = true;
            mapPadding(true);
        }
        else {
            document.getElementById("mapPaddingCbxId").checked = false;
            mapPadding(false);
        }
    });
    getData("quickReset").then(beans3 => {
        if (beans3) {
            document.getElementById("mapResetCbxId").checked = true;
            mapReset(true);
        }
        else {
            document.getElementById("mapResetCbxId").checked = false;
            mapReset(false);
        }
    });
    getData("removeLeft").then(beans4 => {
        if (beans4) {
            document.getElementById("removeLeftPaddingCbxId").checked = true;
            noLeftSpace(true);
        }
        else {
            document.getElementById("removeLeftPaddingCbxId").checked = false;
            noLeftSpace(false);
        }
    });
    getData("showTop10").then(beans5 => {
        if (beans5) {
            document.getElementById("showScoresCbxId").checked = true;
            customTable(true);
        }
    });
    getData("showCursorLabel").then(beans6 => {
        if (beans6) {
            document.getElementById("showCursorLabelCbxId").checked = true;
            cursorLabel(true);
        }
        else {
            document.getElementById("showCursorLabelCbxId").checked = false;
            cursorLabel(false);
        }
    });
    getData("showFlags").then(beans7 => {
        if (beans7) {
            document.getElementById("showFlagCbxId").checked = true;
            flags(true);
        }
        else {
            document.getElementById("showFlagCbxId").checked = false;
            flags(false);
        }
    });
    getData("showNames").then(beans8 => {
        if (beans8) {
            document.getElementById("showNamesCbxId").checked = true;
            names(true);
        }
        else {
            document.getElementById("showNamesCbxId").checked = false;
            names(false);
        }
    });
    getData("removeClickOn").then(beans80 => {
        if (beans80) {
            document.getElementById("remClickOnCbxId").checked = true;
            remClickOn(true);
        }
        else {
            document.getElementById("remClickOnCbxId").checked = false;
            remClickOn(false);
        }
    });
    getData("boldNames").then(beans9 => {
        if (beans9) {
            document.getElementById("boldNamesCbxId").checked = true;
            boldNames(true);
        }
        else {
            document.getElementById("boldNamesCbxId").checked = false;
            boldNames(false);
        }
    });
    getData("moveEx").then(beans924 => {
        if (beans924) {
            document.getElementById("moveCbxId").checked = true;
            moveExtension(true);
        }
        else {
            document.getElementById("moveCbxId").checked = false;
            moveExtension(false);
        }
    });
    getData("useOldFont").then(beans9241 => {
        if (beans9241) {
            document.getElementById("oldFontCbxId").checked = true;
            useOldFont(true);
        }
        else {
            document.getElementById("oldFontCbxId").checked = false;
            useOldFont(false);
        }
    });
	
	getData("performance").then(beans1111 => {
        if (beans1111) {
            document.getElementById("performanceId").checked = true;
            performance();
        }
        else {
            document.getElementById("performanceId").checked = false;
            performance();
        }
    });
	
	  getData("skibidi").then(beans1000 => {
        if (beans1000) {
            document.getElementById("skibidiId").checked = true;
            skibidi();
        }
        else {
            document.getElementById("skibidiId").checked = false;
            skibidi();
        }
    });
	
    getData("initialReload").then(beans90 => {
        if (!beans90) {
            chrome.storage.local.set({
                "initialReload": true
            });
            location.reload();
        }
    });
}
///  Applies the user's stored settings. (executes functions)
function setSettings() {

    getData("showTop10").then(beans5 => {
        if (beans5) {
            document.getElementById("showScoresCbxId").checked = true;
            customTable(true);
        }
    });

    document.getElementById('nekoheaderid').style.color = "#91aaff";
    document.getElementById('versionid').style.color = "#CC0058";

    if (window.find("Uh oh! Got lost on your way?", true)) {
        location.reload();
    }

    if (!eventListenersAdded) {

        handleCheckboxChange("darkModeCbxId", "darkMode", darkMode);
        handleCheckboxChange("mapBgId", "mapBg", mapBg);
        handleCheckboxChange("mapPaddingCbxId", "mapPadding", mapPadding);
        handleCheckboxChange("mapResetCbxId", "quickReset", mapReset);
        handleCheckboxChange("removeLeftPaddingCbxId", "removeLeft", noLeftSpace);
        handleCheckboxChange("showScoresCbxId", "showTop10", customTable, true);
        handleCheckboxChange("showCursorLabelCbxId", "showCursorLabel", cursorLabel);
        handleCheckboxChange("boldNamesCbxId", "boldNames", boldNames);
        handleCheckboxChange("showFlagCbxId", "showFlags", flags);
        handleCheckboxChange("showNamesCbxId", "showNames", names);
        handleCheckboxChange("remClickOnCbxId", "removeClickOn", remClickOn);
        handleCheckboxChange("moveCbxId", "moveEx", moveExtension);
        handleCheckboxChange("oldFontCbxId", "useOldFont", useOldFont);
		handleCheckboxChange("performanceCbxId", "performanceEx", performance);
		handleCheckboxChange("skibidiCbxId", "skibidiEx", skibidi);
        eventListenersAdded = true;
    }
    if (document.getElementsByClassName("seterra_adFooter__4glju")[0]) { document.getElementsByClassName("seterra_adFooter__4glju")[0].remove() };
    meow();
}

function moveExtension(bool) {
    if (bool) {
        document.getElementById("NekoAddon").style.top = "1250px"
        getData("showTop10").then(beans5467 => {
            if (beans5467) {
                // move top 10 down
                if (document.getElementsByClassName("highscore_heading__mqofP")[0]) {
                    if (document.getElementsByClassName("highscore_heading__mqofP")[0]) { document.getElementsByClassName("highscore_heading__mqofP")[0].style.top = 808 + 800 + "px" };
                    if (document.getElementsByClassName("highscore_table__oKrYg")[0]) { document.getElementsByClassName("highscore_table__oKrYg")[0].style.top = 824 + 800 + "px" };
                }

            }
            else {
                if (document.getElementsByClassName("highscore_heading__mqofP")[0]) {
                    if (document.getElementsByClassName("highscore_heading__mqofP")[0]) { document.getElementsByClassName("highscore_heading__mqofP")[0].style.top = "808px" };
                    if (document.getElementsByClassName("highscore_table__oKrYg")[0]) { document.getElementsByClassName("highscore_table__oKrYg")[0].style.top = "824px" };
                }

            }
        });
    }
    else {
        if (document.getElementsByClassName("highscore_heading__mqofP")[0]) {
            document.getElementById("NekoAddon").style.top = "442px"
            if (document.getElementsByClassName("highscore_heading__mqofP")[0]) { document.getElementsByClassName("highscore_heading__mqofP")[0].style.top = "808px" };
            if (document.getElementsByClassName("highscore_table__oKrYg")[0]) { document.getElementsByClassName("highscore_table__oKrYg")[0].style.top = "824px" };
        }
    }
}

const oldFontstyle = document.createElement('style');
oldFontstyle.type = 'text/css';

const importRule = `
@import url('https://fonts.cdnfonts.com/css/neo-sans-pro');
`;

if (oldFontstyle.styleSheet) {
    oldFontstyle.styleSheet.cssText = importRule; // For IE8 and earlier
} else {
    oldFontstyle.appendChild(document.createTextNode(importRule));
}

document.head.appendChild(oldFontstyle);

function useOldFont(bool){

    var elements = document.querySelectorAll('*');

    if (bool){
        
    
        elements.forEach(function(element) {
            var computedStyle = window.getComputedStyle(element);
            if (element.textContent.trim() !== '' || computedStyle.content !== 'none') {
                element.style.fontFamily = 'Neo Sans Pro, sans-serif';
            }
        });
    }
    else{
        elements.forEach(function(element) {
            var computedStyle = window.getComputedStyle(element);
            if (element.textContent.trim() !== '' || computedStyle.content !== 'none') {
                element.style.fontFamily = '__ggFont_3c514f';
            }
        });
    }
}

function handleCheckboxChange(checkboxId, storageKey, callback, reload = false) {
    document.getElementById(checkboxId).addEventListener("change", function () {
        let isChecked = document.getElementById(checkboxId).checked;
        let storageObj = {};
        storageObj[storageKey] = isChecked;

        chrome.storage.local.set(storageObj);

        if (reload && !isChecked && document.getElementsByClassName("highscore_table__oKrYg")[0]) {
            location.reload();
        } else {
            callback(isChecked);
        }
    });
}

setInitialData({
    "darkMode": true,
    "mapBg": false,
    "mapPadding": true,
    "quickReset": true,
    "removeLeft": true,
    "showTop10": true,
    "showCursorLabel": true,
    "boldNames": true,
    "showFlags": true,
    "showNames": true,
    "removeClickOn": false,
    "moveEx": false,
    "useOldFont": true,
	"performanceEx": false,
	"skibidiEx": false,
    "initialReload": false
}).then(() => {
    setSettings();
    meow();
});

function findMS(value) {
    const dotPosition = value.indexOf('.');

    if (dotPosition === -1) {
        return 0;
    }

    const substringAfterDot = value.substring(dotPosition + 1);

    return substringAfterDot.length;
}

function getOrdinalSuffix(num) {
    const j = num % 10,
        k = num % 100;

    if (k === 11 || k === 12 || k === 13) {
        return num + "th";
    }

    switch (j) {
        case 1:
            return num + "st";
        case 2:
            return num + "nd";
        case 3:
            return num + "rd";
        default:
            return num + "th";
    }
}
function mapBg(bool) {
    if (bool) {
        getData("darkMode").then(beans0 => {
            if (beans0) {
                if (document.getElementById(`WATER`)) {
                    document.getElementById(`WATER`).style.fill = "none";
                }
                if (document.getElementById(`BACKGROUND`)) {
                    document.getElementById(`BACKGROUND`).style.fill = "none";
                }
                if (document.getElementById(`WATER_1_`)) {
                    document.getElementById(`WATER_1_`).style.fill = "none";
                }
                if (document.getElementById(`WATER_2_`)) {
                    document.getElementById(`WATER_2_`).style.fill = "none";
                }
                if (document.getElementById(`WATER_3_`)) {
                    document.getElementById(`WATER_3_`).style.fill = "none";
                }
                
            }
        });
    }
    else {
        if (document.getElementById(`WATER`)) {
            document.getElementById(`WATER`).style.fill = "#a4d1dc";
        }
        if (document.getElementById(`BACKGROUND`)) {
            document.getElementById(`BACKGROUND`).style.fill = "#a4d1dc";
        }
        if (document.getElementById(`WATER_1_`)) {
            document.getElementById(`WATER_1_`).style.fill = "#a4d1dc";
        }
        if (document.getElementById(`WATER_2_`)) {
            document.getElementById(`WATER_2_`).style.fill = "#a4d1dc";
        }
        if (document.getElementById(`WATER_3_`)) {
            document.getElementById(`WATER_3_`).style.fill = "#a4d1dc";
        }
    }
}


function ApplyColors() {
    if (document.getElementsByClassName("game-page_gameAreaWrapper__Faj76")[0]) {
        document.getElementsByClassName("game-page_gameAreaWrapper__Faj76")[0].style.boxShadow = "none"
    }
    if (document.querySelectorAll('div.modal_content__ZijTp.modal_colorWhite__b1Uem.modal_sizeSmall__gHON2')[0]) {
        getData("darkMode").then(beans0 => {
            if (beans0) {
                // end screen \/
                document.querySelectorAll('div.modal_content__ZijTp.modal_colorWhite__b1Uem.modal_sizeSmall__gHON2')[0].style.background = "rgba(24, 26, 27, 0.55)";
                // cursor label \/
                if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

                    document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.background = "rgba(24, 26, 27, 0.75)";

                    var spanElement = document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong');

                    if (spanElement) {
                        spanElement.style.color = "white";
                        labelColor = false;
                    }
                }
            }
            else {
                // end screen \/
                document.querySelectorAll('div.modal_content__ZijTp.modal_colorWhite__b1Uem.modal_sizeSmall__gHON2')[0].style.background = "rgba(255, 255, 255, 0.55)";
                // cursor label \/
                if (document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0]) {

                    document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].style.background = "rgba(255, 255, 255, 0.75)";

                    var spanElement = document.getElementsByClassName('game-tooltip_tooltip__w_58_')[0].querySelector('span').querySelector('strong');

                    if (spanElement) {
                        spanElement.style.color = "black";
                        labelColor = false;
                    }
                }
            }
        });

    }
}

///  Bools for existance checks.
var unset = true;
var boldNamesOopsie = true;
var labelColor = true;
var src = true;
var toggled = false;
var eventListenersAdded = false;

var refreshRate = 100;

/// setSettings => remFooter => meow
createForm();
setSettings();

setInterval(setSettings, refreshRate);
setInterval(ApplyColors, refreshRate);
