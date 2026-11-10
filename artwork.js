/* Each subject shares its silhouette between the puzzle and the finished artwork. */
const artwork = {
  '花瓶': {
    outline: 'M-72 -137H72Q74 -103 46 -90L40 -47C39 -22 98 12 100 67Q107 134 0 140Q-107 134 -100 67C-98 12 -39 -22 -40 -47L-46 -90Q-74 -103 -72 -137Z',
    palette: ['#f4d798','#ad613c'], scene: 'table',
    detail: '<ellipse cy="-133" rx="72" ry="12" fill="#934c3c"/><ellipse cy="-136" rx="55" ry="5" fill="#4c343a"/><path d="M-100 46Q0 105 100 46M-100 58Q0 117 100 58M-98 90Q0 139 98 90" fill="none" stroke="#ffe1a5" stroke-width="5"/><path d="M-28 84Q-38 40 0 15Q38 40 28 84M-15 86Q-20 51 0 39Q20 51 15 86" fill="none" stroke="#813f43" stroke-width="4"/>'
  },
  '花苞': {
    outline: 'M-6 139Q-9 71 0 19C-65 22 -100 -40 -86 -116Q-48 -109 -24 -78Q-12 -118 7 -139Q40 -107 45 -77Q74 -116 94 -110C110 -44 68 24 15 21Q8 70 9 139Z',
    palette: ['#ffd9a6','#b65979'], scene: 'garden',
    detail: '<path d="M-13 140Q-13 61 2 7H18L14 140" fill="#517a59"/><path d="M3 14Q-63 -8 -85 -105M12 15Q71 -13 94 -102M9 7Q-24 -42 6 -134" fill="none" stroke="#a34765" stroke-width="5" opacity=".65"/><path d="M-2 96Q-75 42 -101 68Q-83 114 -2 106M10 75Q65 27 91 49Q75 87 10 86" fill="#668e62"/>'
  },
  '狐狸': {
    outline: 'M-124 20Q-123 -44 -87 -56L-79 -132L-30 -82Q8 -92 40 -70L73 -127L91 -37Q113 -10 145 16L122 34L71 43Q47 66 32 118Q-24 124 -73 93Z',
    palette: ['#ffcc82','#ac4b3b'], scene: 'garden',
    detail: '<path d="M-68 -110L-45 -70L-68 -60ZM70 -106L56 -69L83 -50Z" fill="#863e43"/><path d="M-132 40Q-69 60 -45 30Q20 50 69 24L145 16L122 40Q59 72 35 124H-76Z" fill="#fbe6c1"/><path d="M58 -18Q72 -26 85 -15" fill="none" stroke="#48333a" stroke-width="6" stroke-linecap="round"/><ellipse cx="133" cy="17" rx="14" ry="10" fill="#48333a"/>'
  },
  '鲸鱼': {
    outline: 'M-174 0Q-142 -72 -39 -72C50 -71 97 -31 119 -27Q145 -71 176 -61Q168 -32 146 -17Q171 -20 187 9Q151 25 119 0Q54 79 -60 71Q-154 72 -174 0Z',
    palette: ['#80d9ca','#26738d'], scene: 'water',
    detail: '<path d="M-173 20Q-119 53 -52 39Q19 28 91 -5L83 60Q-31 104 -171 63Z" fill="#c2e6d3"/><path d="M-36 32Q17 52 -27 82Q-60 68 -57 41Z" fill="#348196"/><path d="M-154 37Q-95 66 -20 47M-154 49Q-94 78 -26 57" fill="none" stroke="#488b98" stroke-width="3"/><circle cx="-112" cy="2" r="5" fill="#243d56"/>'
  },
  '海豚': {
    outline: 'M-177 20Q-136 1 -120 -19Q-69 -82 5 -64Q31 -104 67 -96Q47 -72 48 -51Q98 -25 123 -5Q146 -33 180 -34Q167 -11 153 2Q172 5 182 29Q150 32 123 15Q80 34 44 28Q15 65 -21 71L-10 30Q-76 17 -110 30Q-141 38 -177 32Z',
    palette: ['#ade3db','#4b779b'], scene: 'water',
    detail: '<path d="M-181 29Q-124 20 -83 8Q-19 -5 40 13Q89 28 122 5L121 27Q52 69 -179 55Z" fill="#def2e4"/><path d="M-2 22Q30 35 -17 73L-29 43Z" fill="#527d9c"/><circle cx="-111" cy="1" r="5" fill="#263b51"/><path d="M-165 28Q-134 30 -122 22" fill="none" stroke="#45687b" stroke-width="3"/>'
  },
  '月牙': {
    outline: 'M95 -122A151 151 0 1 0 122 106A126 126 0 0 1 95 -122Z',
    palette: ['#fff2bd','#d6a46e'], scene: 'night',
    detail: '<g fill="#ad8058" opacity=".25"><circle cx="-82" cy="-55" r="23"/><circle cx="-114" cy="17" r="12"/><circle cx="-67" cy="56" r="31"/><circle cx="-14" cy="101" r="16"/><circle cx="-80" cy="106" r="11"/></g><path d="M-143 29Q-110 -17 -75 -28M-131 70Q-95 22 -67 20" fill="none" stroke="#fff2c5" stroke-width="5" opacity=".55"/>'
  },
  '苹果': {
    outline: 'M0 -92C55 -128 123 -105 126 -40C145 35 91 129 40 119C13 108 -10 111 -40 121C-96 132 -147 32 -126 -40C-124 -108 -56 -129 0 -92Z',
    palette: ['#ffbc73','#a53d4d'], scene: 'table',
    detail: '<path d="M-95 -33Q-97 -72 -61 -83" fill="none" stroke="#ffe0a3" stroke-width="12" stroke-linecap="round" opacity=".8"/>',
    outside: '<path d="M0 -91Q-6 -125 12 -139" fill="none" stroke="#644c38" stroke-width="8" stroke-linecap="round"/><path d="M6 -116Q24 -147 54 -132Q37 -107 6 -116Z" fill="#769955"/>'
  },
  '房屋': {
    outline: 'M-120 100V-35H-150L0 -155L150 -35H120V100H34V30H-25V100Z',
    palette: ['#f8dca2','#bd7f57'], scene: 'garden',
    detail: '<path d="M-157 -34L0 -160L157 -34Z" fill="#ae5955"/><path d="M-97 -74H97M-59 -104H59M-25 -131H25" stroke="#edaf7d" stroke-width="4"/><rect x="-91" y="-15" width="47" height="48" rx="4" fill="#57767a"/><rect x="49" y="-15" width="47" height="48" rx="4" fill="#57767a"/><path d="M-67 -15V33M-91 8H-44M72 -15V33M49 8H96" stroke="#f7da9a" stroke-width="4"/><path d="M-128 69H124" stroke="#a46a59" stroke-width="3"/>'
  },
  '爱心': {
    outline: 'M0 121C-43 84 -132 22 -132 -47C-132 -118 -39 -133 0 -63C39 -133 132 -118 132 -47C132 22 43 84 0 121Z',
    palette: ['#ffcfac','#af5878'], scene: 'garden',
    detail: '<path d="M-107 -45Q-103 -88 -65 -88M-47 -80L-33 -73" fill="none" stroke="#fff0d6" stroke-width="9" stroke-linecap="round"/><path d="M0 85C-31 58 -89 16 -89 -36C-89 -74 -27 -90 0 -40C27 -90 89 -74 89 -36C89 16 31 58 0 85Z" fill="none" stroke="#ffe1c3" stroke-width="3" opacity=".55"/>'
  },
  '猫': {
    outline: 'M-90 110Q-109 52 -80 5V-95L-50 -145L-5 -100H35L85 -145L105 -65L95 -5L65 25L70 90Q125 119 160 40Q198 140 120 135H-90Z',
    palette: ['#f2ce93','#bb7954'], scene: 'table',
    detail: '<path d="M-76 -88L-51 -126L-14 -89ZM50 -90L83 -124L96 -75Z" fill="#c47b77"/><path d="M-50 -45Q-36 -55 -21 -45M38 -45Q54 -55 68 -45M4 -25L14 -17L24 -25Z" fill="none" stroke="#5c4541" stroke-width="5" stroke-linecap="round"/><path d="M-69 -25L-33 -18M-70 -7L-33 -9M59 -19L97 -27M59 -8L100 -4M-47 108V67M-15 112V75" stroke="#835a51" stroke-width="3" fill="none"/><path d="M-27 -110L-17 -75M9 -105L12 -72M36 -110L29 -76" stroke="#9b624c" stroke-width="7" stroke-linecap="round"/>'
  },
  '茶杯': {
    outline: 'M-105 -85H90V-60Q171 -83 170 -23Q169 33 90 20Q78 105 45 105H-65Q-110 86 -105 -85Z',
    palette: ['#fbdfa0','#5a8a83'], scene: 'table',
    detail: '<ellipse cx="-8" cy="-84" rx="98" ry="21" fill="#fcf0cb"/><ellipse cx="-8" cy="-83" rx="81" ry="14" fill="#98674a"/><path d="M86 -47Q147 -70 147 -27Q147 2 90 3" stroke="#f3e6c5" stroke-width="12" fill="none"/><path d="M-108 13Q-11 47 96 13M-103 29Q-11 62 92 29" fill="none" stroke="#f7e2a2" stroke-width="4"/><path d="M-62 65Q-38 38 -15 68Q9 38 33 65Q54 39 75 65" fill="none" stroke="#e9d193" stroke-width="4"/>'
  },
  '鱼': {
    outline: 'M-147 0L-201 -98V98Z M-147 0A145 86 0 1 0 143 0A145 86 0 1 0 -147 0Z',
    palette: ['#f9ce83','#b76c4b'], scene: 'water',
    detail: '<path d="M-204 -79L-147 0L-204 79M-184 -49L-146 0L-184 50M63 -62Q39 0 63 62" fill="none" stroke="#ffeba7" stroke-width="5"/><path d="M-95 -22Q-76 0 -95 22M-70 -22Q-51 0 -70 22M-45 -22Q-26 0 -45 22M-20 -22Q-1 0 -20 22M-83 10Q-64 32 -83 51M-58 10Q-39 32 -58 51M-33 10Q-14 32 -33 51" fill="none" stroke="#9c5851" stroke-width="3" opacity=".7"/><circle cx="102" cy="-20" r="7" fill="#54434b"/><circle cx="104" cy="-22" r="2.4" fill="#fff0c3"/>'
  },
  '叶片': {
    outline: 'M-155 91Q-114 -30 14 -45Q112 -56 148 -127Q179 -7 111 67Q34 140 -132 96L-173 127L-187 116Z',
    palette: ['#c5d89a','#417d67'], scene: 'garden',
    detail: '<path d="M-168 111Q8 34 149 -116M-77 69Q-51 34 -50 -1M-15 42Q23 56 70 49M43 5Q60 -37 52 -63M77 -29Q109 -16 146 -26" stroke="#f6e3a7" stroke-width="5" fill="none" stroke-linecap="round"/>'
  },
  '星星': {
    outline: 'M0 -156L44 -49L157 -48L69 26L97 137L0 76L-97 137L-69 26L-157 -48L-44 -49Z',
    palette: ['#fff4c0','#cd925b'], scene: 'night',
    detail: '<path d="M0 -156V18L-44 -49ZM157 -48L0 18L69 26ZM97 137L0 18V76ZM-97 137L0 18L-69 26ZM-157 -48L0 18L-44 -49Z" fill="#fff6ce" opacity=".62"/><path d="M0 18L0 -143M0 18L146 -45M0 18L90 124M0 18L-89 125M0 18L-143 -44" stroke="#f9db8b" fill="none" stroke-width="2"/>'
  },
  '奖杯': {
    outline: 'M-98 -146H98L97 -124H164Q162 -39 72 -18Q52 12 18 22V88H62V111H95V146H-95V111H-62V88H-18V22Q-52 12 -72 -18Q-162 -39 -164 -124H-97Z M-95 -102H-139Q-130 -64 -83 -46Z M95 -102H139Q130 -64 83 -46Z',
    palette: ['#ffdf85','#bd7444'], scene: 'table',
    detail: '<path d="M-87 -134H87M-91 121H91M-53 98H53" stroke="#fff0b1" stroke-width="8" fill="none"/><path d="M-71 -117Q-61 -24 -23 -8" stroke="#fff3c1" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M9 -104l15 30 33 5-24 24 5 32L9 -29l-29 16 5-32-24-24 33-5Z" fill="#f9bd5e" stroke="#b77942" stroke-width="3"/>'
  },
  '小鱼': {
    outline: 'M-75 -13Q-113 -40 -151 -50Q-158 -28 -132 0Q-156 25 -151 48Q-107 39 -75 14C-47 51 31 63 80 37Q117 22 139 2Q139 -8 115 -22Q74 -49 25 -43L-9 -66L-41 -42Q-57 -34 -75 -13Z',
    palette: ['#f7da8a','#b35d51'], scene: 'water',
    detail: '<path d="M-142 -34L-82 -4L-143 34M-41 -35L-10 -59L15 -40M-38 22q35 11 64 -4q-25 31-62 24M66 -36q-18 43 7 76" fill="none" stroke="#ffedaf" stroke-width="6" stroke-linecap="round"/><path d="M87 15q21 5 39-6" fill="none" stroke="#8d514f" stroke-width="4" stroke-linecap="round"/><circle cx="96" cy="-9" r="6.5" fill="#423d48"/><circle cx="98" cy="-11" r="2" fill="#fff3ca"/><path d="M-44 -17q16-7 26 6m0-17q17-7 27 7m-3 21q16-7 26 6m-8-29q17-7 27 7" stroke="#af6d59" stroke-width="3" fill="none" stroke-linecap="round"/>'
  },
  '小鸭': {
    outline: 'M-114 -1Q-119 -14 -109 -19Q-97 -25 -87 -11Q-49 5 -17 -9Q-6 -16 -8 -33Q-12 -62 8 -78Q29 -96 53 -81Q73 -70 76 -51L114 -43Q125 -37 115 -27Q99 -14 71 -18Q63 -8 49 -6Q77 8 71 27Q58 57 13 60Q-61 65 -95 34Q-110 18 -114 -1Z',
    palette: ['#ffed9c','#e09a52'], scene: 'water',
    detail: '<path d="M68 -51L120 -45L128 -33Q104 -13 69 -18Q61 -34 68 -51Z" fill="#dc7750"/><path d="M75 -35Q97 -28 117 -35" stroke="#a95547" stroke-width="3" fill="none"/><circle cx="48" cy="-54" r="6.5" fill="#51464a"/><circle cx="50" cy="-56" r="2" fill="#fff4d1"/><path d="M-79 16Q-38 -3 10 9Q19 12 13 21Q-7 47 -40 39Q-63 33 -79 16Z" fill="#f2c66c" stroke="#f8dc8a" stroke-width="5"/><path d="M4 -58Q10 -73 26 -77" stroke="#fff4ba" stroke-width="6" fill="none" stroke-linecap="round"/>'
  },
  '冰淇淋': {
    outline: 'M0 165Q-6 170 -11 157L-71 11Q-109 9 -108 -22Q-109 -43 -88 -53C-88 -108 -54 -148 0 -148C54 -148 88 -108 88 -53Q109 -43 108 -22Q109 9 71 11L11 157Q6 170 0 165Z',
    palette: ['#ffdcb6','#c58a58'], scene: 'table',
    detail: '<path d="M-110 -153H110V12Q95 1 72 12T43 12T14 12T-15 12T-44 12T-73 12T-110 12Z" fill="#de8c97"/><path d="M-64 -70Q-53 -111 -19 -119" stroke="#ffe0c6" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M-75 21L44 114M-62 56L33 134M-42 93L16 151M-42 123L75 27M-21 147L64 77M-58 88L44 12" stroke="#a16d4a" stroke-width="4" opacity=".55"/><path d="M-35 -73l8 11m50-28 9 10m14 20-9 13m-65 12 15-5m24-20 8 13" stroke="#fff0c6" stroke-width="5" stroke-linecap="round"/>'
  },
  '皇冠': {
    outline: 'M-144 -51C-166 -65 -157 -93 -137 -93Q-113 -93 -113 -68L-65 -27L-15 -103Q-25 -127 0 -130Q25 -127 15 -103L65 -27L113 -68Q113 -93 137 -93C157 -93 166 -65 144 -51L114 105Q112 118 98 118H-98Q-112 118 -114 105Z',
    palette: ['#ffe79a','#bb7445'], scene: 'table',
    detail: '<path d="M-139 42Q0 25 139 42V52Q0 36 -139 52Z M-129 85H129V107H-129Z" fill="#f2b761"/><path d="M-129 87H129" stroke="#ffe5a5" stroke-width="7"/><path d="M0 -35L22 -2L0 29L-22 -2Z" fill="#b45967" stroke="#ffe6a7" stroke-width="4"/><circle cx="-74" cy="23" r="11" fill="#609d99"/><circle cx="74" cy="23" r="11" fill="#609d99"/><path d="M-93 56H93" stroke="#f7d383" stroke-width="5"/>'
  },
  '雨靴': {
    outline: 'M-107 -139H51Q66 -139 65 -123L57 34Q61 54 104 59Q169 64 169 116V135Q169 150 154 150H-111Q-128 150 -128 133L-119 -121Q-118 -139 -107 -139Z',
    palette: ['#e8ba63','#b6784b'], scene: 'rain',
    detail: '<path d="M-130 125H174V156H-130Z M-121 -143H70V-111H-121Z" fill="#475e6b"/><path d="M-84 -71H24V-46H-84Z" fill="#a47d58" stroke="#fbdb9b" stroke-width="4"/><rect x="-25" y="-78" width="28" height="39" rx="4" fill="#e7c583" stroke="#785e52" stroke-width="4"/><path d="M-101 -96L-108 103M75 76Q134 79 141 103" fill="none" stroke="#ffe6a6" stroke-width="7" opacity=".75" stroke-linecap="round"/>'
  },
  '吉他': {
    outline: 'M-20 -91L-21 -153L-15 -169H17L23 -153L20 -91Q50 -99 64 -75Q76 -55 65 -26Q61 -11 82 4Q112 27 112 65Q112 145 0 149Q-112 145 -112 65Q-112 27 -82 4Q-61 -11 -65 -26Q-76 -55 -64 -75Q-50 -99 -20 -91Z',
    palette: ['#f6bd79','#9b5547'], scene: 'table',
    detail: '<path d="M-20 -157H20V-31H-20Z" fill="#765347"/><circle cy="2" r="27" fill="#754f45" stroke="#ffdfa1" stroke-width="6"/><rect x="-36" y="65" width="72" height="15" rx="4" fill="#6c4d44"/><path d="M-9 -150V75M0 -150V75M9 -150V75" stroke="#fbe1ab" stroke-width="2"/><path d="M-84 40Q-110 117 -32 132" fill="none" stroke="#f8d498" stroke-width="7" stroke-linecap="round"/>',
    outside: '<path d="M-20 -149h-9m9 13h-9m49-13h9m-9 13h9" stroke="#7b635b" stroke-width="5" stroke-linecap="round"/>'
  },
  '兔子': {
    outline: 'M-39 -41C-64 -62 -93 -149 -74 -164Q-54 -182 -20 -108L-7 -61L12 -60C20 -116 45 -174 71 -165Q97 -156 73 -90L50 -41Q101 -10 100 42Q99 97 56 117Q92 126 75 147H-76Q-92 126 -55 117Q-101 97 -100 41Q-99 -12 -39 -41Z',
    palette: ['#fff0d4','#bd8f85'], scene: 'garden',
    detail: '<path d="M-65 -142Q-45 -141 -23 -61Q-55 -77 -65 -142ZM64 -145Q68 -117 28 -59Q34 -113 64 -145Z" fill="#da9290"/><ellipse cx="-2" cy="97" rx="56" ry="46" fill="#fff3d5"/><circle cx="-46" cy="27" r="6" fill="#624d53"/><circle cx="-3" cy="27" r="6" fill="#624d53"/><path d="M-31 48h15l-7 8z" fill="#bf7780"/><path d="M-23 56v9m0 0q-9 8-16 0m16 0q9 8 16 0m-49-9-29-6m29 15-28 7m108-16 30-6m-30 15 28 7" stroke="#8d6871" stroke-width="3" fill="none" stroke-linecap="round"/>'
  },
  '闪电': {
    outline: 'M21 -149H114L50 -27H122L-56 150L-25 31H-111Z',
    palette: ['#fff1a6','#d89243'], scene: 'night',
    detail: '<path d="M33 -142H67L-67 18H-92ZM76 -15H103L-43 124Z" fill="#fff7ca"/><path d="M5 -36L-10 -12H31" stroke="#ffe39a" stroke-width="6" fill="none"/>'
  },
  '音符': {
    outline: 'M-21 -121L123 -153V77C123 123 42 155 20 110C-3 69 58 41 87 57V-75L15 -60V102C15 145 -72 175 -98 133C-127 86 -57 55 -21 75Z',
    palette: ['#9dd9d2','#3f7286'], scene: 'night',
    detail: '<path d="M-8 -110L112 -138M-8 -92L110 -119M-8 -44V88M99 -61V72M-81 117Q-80 97 -41 91M31 103Q41 80 68 75" stroke="#d2eee1" stroke-width="5" fill="none" stroke-linecap="round"/>'
  },
  '眼镜': {
    outline: 'M-174 -53H-94Q-51 -53 -35 -19Q0 -48 35 -19Q51 -53 94 -53H174Q198 -53 198 -28V-5L177 4Q174 87 101 88Q40 86 26 25Q0 -5 -26 25Q-40 86 -101 88Q-174 87 -177 4L-198 -5V-28Q-198 -53 -174 -53Z M-145 -20H-91Q-58 -20 -59 13Q-60 56 -101 56Q-145 54 -149 10Z M145 -20H91Q58 -20 59 13Q60 56 101 56Q145 54 149 10Z',
    palette: ['#e6ab80','#915665'], scene: 'table',
    detail: '<path d="M-182 -39H-91Q-52 -40 -41 -12M182 -39H91Q52 -40 41 -12M-150 44Q-135 76 -102 76M150 44Q135 76 102 76" stroke="#ffe1aa" stroke-width="5" fill="none" stroke-linecap="round"/>'
  },
  '飞机': {
    outline: 'M0 -153Q25 -152 28 -106L31 -52L165 28V63L34 27L37 87L79 119V147L0 125L-79 147V119L-37 87L-34 27L-165 63V28L-31 -52L-28 -106Q-25 -152 0 -153Z',
    palette: ['#f9eee0','#779caa'], scene: 'sky',
    detail: '<path d="M-24 -98Q0 -116 24 -98L21 -78Q0 -94 -21 -78Z" fill="#41657c"/><path d="M-169 24L-133 5V55L-169 64ZM169 24L133 5V55L169 64Z" fill="#bb6f5b"/><path d="M-13 -64V100M13 -64V100M-134 33L-39 3M134 33L39 3" stroke="#d9ece2" fill="none" stroke-width="5"/>'
  },
  '船锚': {
    outline: 'M0 -150A49 49 0 0 1 24 -58V-38H82V-4H24V95Q83 84 102 45L78 42L135 0L158 71L136 63Q101 132 17 135L0 154L-17 135Q-101 132 -136 63L-158 71L-135 0L-78 42L-102 45Q-83 84 -24 95V-4H-82V-38H-24V-58A49 49 0 0 1 0 -150Z M0 -123A22 22 0 1 0 0 -79A22 22 0 1 0 0 -123Z',
    palette: ['#d0d8d1','#557b8c'], scene: 'water',
    detail: '<path d="M-7 -137A35 35 0 0 0 -34 -105M-70 -27H67M-12 -50V110M-112 66Q-88 104 -38 116M112 66Q88 104 38 116" stroke="#f0e9c7" stroke-width="6" opacity=".72" fill="none" stroke-linecap="round"/>'
  },
};

const scenes = {
  garden: ['#d7e4c2','#7d9f85','#f7e5af'],
  water: ['#b0dfd5','#4d8c9b','#e6edc7'],
  sky: ['#c7e1df','#829fb5','#fff0bb'],
  table: ['#eed9bb','#c9977e','#fff0cb'],
  night: ['#3c5071','#252e50','#ffdf94'],
  rain: ['#b9cdd4','#7793a5','#e3ecd8'],
  snow: ['#dce9e8','#8caebf','#fff2cb']
};

function sceneDetails(scene) {
  if (scene === 'water') {
    return '<path d="M0 179Q146 130 304 181T605 181T800 163V560H0Z" fill="#4c96a7" opacity=".36"/><path d="M0 406Q143 358 298 416T597 412T800 390V560H0Z" fill="#346f83" opacity=".46"/><g fill="none" stroke="#ddf1de" opacity=".49" stroke-width="3"><path d="M40 134q59 -17 119 0M622 155q52 -12 103 0M68 364q58 -14 117 0M596 389q76 -18 149 0"/><circle cx="178" cy="268" r="10"/><circle cx="143" cy="218" r="6"/><circle cx="631" cy="234" r="13"/><circle cx="669" cy="184" r="7"/></g>';
  }
  if (scene === 'night') {
    return '<path d="M0 468L136 341L251 442L377 391L504 459L656 345L800 456V560H0Z" fill="#344360"/><path d="M0 490Q151 455 296 497T600 495T800 473V560H0Z" fill="#222e48"/><g fill="#ffdd92"><circle cx="147" cy="131" r="3"/><circle cx="669" cy="162" r="4"/><circle cx="246" cy="85" r="2"/><circle cx="565" cy="89" r="3"/><circle cx="110" cy="273" r="2"/><circle cx="706" cy="318" r="2"/><path d="M194 207l3 10 10 3-10 3-3 10-3-10-10-3 10-3zM622 287l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></g>';
  }
  if (scene === 'garden') {
    return '<path d="M0 417Q182 347 354 418T800 402V560H0Z" fill="#8fae83"/><path d="M0 486Q220 433 410 492T800 464V560H0Z" fill="#668c70"/><path d="M50 550Q67 442 138 382M128 553Q118 491 190 452M730 555Q716 456 662 400M681 560Q684 489 619 468" fill="none" stroke="#d2d9a4" stroke-width="5"/><path d="M66 492Q26 479 22 446Q68 448 66 492ZM106 433Q101 386 139 369Q149 404 106 433ZM724 488Q755 452 782 461Q759 494 724 488ZM697 449Q653 446 644 412Q679 409 697 449Z" fill="#bdd09a"/>';
  }
  if (scene === 'table') {
    return '<path d="M0 412H800V560H0Z" fill="#b88369" opacity=".56"/><path d="M0 463H800M0 508H800" stroke="#f6d4aa" opacity=".45" stroke-width="2"/><ellipse cx="402" cy="435" rx="184" ry="25" fill="#775246" opacity=".23"/><path d="M53 396V136Q53 83 106 83H183Q236 83 236 136V396Z" fill="#fce9bd" opacity=".32"/><path d="M144 87V394M55 236H233" stroke="#fff2ca" stroke-width="4" opacity=".34"/>';
  }
  if (scene === 'rain') {
    return '<path d="M0 463Q200 427 412 462T800 452V560H0Z" fill="#5d8696" opacity=".46"/><g stroke="#edf4e6" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M85 116l-21 36M155 189l-21 36M209 116l-21 36M688 96l-21 36M737 207l-21 36M613 196l-21 36M89 322l-21 36M703 321l-21 36"/></g><ellipse cx="411" cy="468" rx="155" ry="21" fill="none" stroke="#d6e6e3" stroke-width="3" opacity=".6"/>';
  }
  if (scene === 'snow') {
    return '<path d="M0 426Q172 353 393 433T800 402V560H0Z" fill="#e7eddf"/><path d="M0 490Q194 428 396 482T800 456V560H0Z" fill="#f9f1db"/><path d="M111 427l45-102 45 102zm490 1 52-119 51 119z" fill="#6f9d9f"/><g fill="#fff9e6"><circle cx="113" cy="151" r="5"/><circle cx="655" cy="191" r="4"/><circle cx="708" cy="292" r="5"/><circle cx="208" cy="264" r="4"/><circle cx="595" cy="107" r="3"/></g>';
  }
  return '<g fill="#fff4d2" opacity=".75"><path d="M68 178Q91 145 122 163Q151 113 190 159Q230 158 238 178Z"/><path d="M562 195Q600 160 623 178Q653 131 690 176Q733 168 747 195Z"/></g><path d="M0 458L166 330L326 458L487 388L650 455L800 369V560H0Z" fill="#6b98a5" opacity=".63"/><path d="M0 504Q186 429 377 496T800 462V560H0Z" fill="#668e83"/>';
}

function artworkMarkup(name, {id, outline, y = 280, scale = 1, height = 560} = {}) {
  const subject = artwork[name];
  const path = outline || subject.outline;
  const [sky, ground, glow] = scenes[subject.scene];
  const [light, dark] = subject.palette;
  return `<svg class="complete-art" viewBox="0 0 800 ${height}" role="img" aria-label="${name}的完整图像">
    <defs>
      <linearGradient id="${id}-sky" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="${sky}"/><stop offset="1" stop-color="${ground}"/></linearGradient>
      <linearGradient id="${id}-subject" x1=".18" y1="0" x2=".85" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
      <clipPath id="${id}-clip"><path d="${path}" clip-rule="evenodd"/></clipPath>
    </defs>
    <rect width="800" height="${height}" fill="${ground}"/>
    <g transform="scale(1 ${height/560})"><rect width="800" height="560" fill="url(#${id}-sky)"/><circle cx="568" cy="159" r="74" fill="${glow}" opacity=".48"/>${sceneDetails(subject.scene)}</g>
    <g transform="translate(400 ${y}) scale(${scale})">
      <path d="${path}" fill-rule="evenodd" fill="#28394a" opacity=".18" transform="translate(5 8)"/>
      <path d="${path}" fill-rule="evenodd" fill="url(#${id}-subject)" stroke="${dark}" stroke-width="2" stroke-linejoin="round"/>
      <g clip-path="url(#${id}-clip)">${subject.detail}</g>
      ${subject.outside || ''}
    </g>
    <rect x="19" y="19" width="762" height="${height-38}" rx="3" fill="none" stroke="#fff6dc" stroke-opacity=".54"/>
  </svg>`;
}

function figurePuzzleMarkup(figure) {
  const {answer, frame, marks, mirror, cutout = {}} = figure;
  const {x = 400, y = 280, scale = 1, angle = 0} = cutout;
  const foreground = `<path d="${frame}" fill="#283f46"/><g fill="#f3ead4">${marks}</g>`;
  return `<svg class="figimage" viewBox="0 0 800 560" role="img" aria-label="图底关系谜题，观察深色剪影里的浅色形状">
    <defs>
      <mask id="figure-cutout">
        <rect width="800" height="560" fill="white"/>
        <path d="${artwork[answer].outline}" transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" fill="black" fill-rule="evenodd"/>
      </mask>
    </defs>
    <rect width="800" height="560" fill="#f3ead4"/>
    <g mask="url(#figure-cutout)">
      ${foreground}
      ${mirror?`<g transform="translate(800 0) scale(-1 1)">${foreground}</g>`:''}
    </g>
  </svg>`;
}
