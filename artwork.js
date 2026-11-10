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
  '蝴蝶': {
    outline: 'M0 -28C-48 -95 -127 -140 -159 -96Q-177 -51 -103 -5C-180 50 -126 130 -65 104Q-17 86 0 31Q17 86 65 104C126 130 180 50 103 -5Q177 -51 159 -96C127 -140 48 -95 0 -28Z',
    palette: ['#f8bc78','#ad5577'], scene: 'garden',
    detail: '<path d="M-7 -11Q-66 -79 -139 -80Q-132 -37 -74 -14Q-127 21 -124 66Q-77 87 -16 19M7 -11Q66 -79 139 -80Q132 -37 74 -14Q127 21 124 66Q77 87 16 19" fill="#f4d08a" opacity=".86"/><path d="M0 40V-36M0 -29Q-11 -61 -32 -60M0 -29Q11 -61 32 -60" fill="none" stroke="#523b54" stroke-width="6" stroke-linecap="round"/><circle cx="-101" cy="52" r="14" fill="#8c416c"/><circle cx="101" cy="52" r="14" fill="#8c416c"/><circle cx="-106" cy="-54" r="11" fill="#8c416c"/><circle cx="106" cy="-54" r="11" fill="#8c416c"/>'
  },
  '帆船': {
    outline: 'M-158 51L-121 103H117L159 51H24V-143L-117 37H6V51Z M44 -101L114 32H44Z',
    palette: ['#fff0b2','#c77750'], scene: 'water',
    detail: '<path d="M-168 52H173V118H-168Z" fill="#975546"/><path d="M-151 66H156M-138 81H145M-123 96H121" stroke="#e3a46b" stroke-width="4"/><path d="M-99 32L16 -117M-64 31L15 -80M54 -76L100 31" stroke="#fff2cc" stroke-width="4" opacity=".8"/>'
  },
  '飞鸟': {
    outline: 'M-175 -72Q-81 -75 -17 -17Q-10 -47 23 -44Q40 -41 57 -22L90 -16L59 -6Q42 43 9 48L-64 108L-54 58L-108 72L-72 31Q-142 14 -175 -72Z M16 -8Q67 -90 168 -113Q153 -38 64 21Z',
    palette: ['#f3d48d','#6889ab'], scene: 'sky',
    detail: '<path d="M-173 -71Q-107 -21 -19 -5M-146 -36Q-93 -6 -34 12M-117 -10Q-71 13 -31 25M25 8Q106 -27 163 -105M51 10Q108 -13 148 -66" fill="none" stroke="#dce4dd" stroke-width="5" opacity=".85"/><path d="M13 2Q40 21 62 -6Q47 42 11 48L-51 94L-26 52Z" fill="#e7c387"/><circle cx="40" cy="-24" r="5" fill="#344558"/><path d="M54 -19L92 -16L55 -8Z" fill="#c4774e"/>'
  },
  '月牙': {
    outline: 'M95 -122A151 151 0 1 0 122 106A126 126 0 0 1 95 -122Z',
    palette: ['#fff2bd','#d6a46e'], scene: 'night',
    detail: '<g fill="#ad8058" opacity=".25"><circle cx="-82" cy="-55" r="23"/><circle cx="-114" cy="17" r="12"/><circle cx="-67" cy="56" r="31"/><circle cx="-14" cy="101" r="16"/><circle cx="-80" cy="106" r="11"/></g><path d="M-143 29Q-110 -17 -75 -28M-131 70Q-95 22 -67 20" fill="none" stroke="#fff2c5" stroke-width="5" opacity=".55"/>'
  },
  '雨伞': {
    outline: 'M-162 5Q-148 -103 -9 -114L-7 -129Q0 -144 7 -129L9 -114Q148 -103 162 5Q127 -13 97 12Q62 -10 26 12L8 10V111Q8 141 -24 141Q-52 141 -53 118Q-53 107 -43 107Q-34 107 -34 118Q-34 125 -24 125Q-9 125 -9 111V10L-26 12Q-62 -10 -97 12Q-127 -13 -162 5Z',
    palette: ['#f7b782','#b45463'], scene: 'rain',
    detail: '<path d="M-8 8H9V113Q9 142 -24 142Q-55 142 -53 111H-35Q-35 127 -24 127Q-8 127 -8 113Z" fill="#634c54"/><path d="M0 -115Q-90 -85 -97 12M0 -115Q90 -85 97 12M0 -115Q-24 -66 -26 12M0 -115Q24 -66 26 12" fill="none" stroke="#ffe1ae" stroke-width="5" opacity=".82"/>'
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
  '蘑菇': {
    outline: 'M-146 -4C-141 -62 -88 -127 0 -127C88 -127 141 -62 146 -4Q137 29 53 28L59 115Q34 143 0 143Q-34 143 -59 115L-53 28Q-137 29 -146 -4Z',
    palette: ['#f6c68b','#ab4d51'], scene: 'garden',
    detail: '<path d="M-59 21Q0 35 59 21L68 146H-68Z" fill="#f3dcb3"/><path d="M-147 -6Q0 23 147 -6L145 29Q0 52 -145 29Z" fill="#924957"/><g fill="#fbe5b5"><ellipse cx="-80" cy="-44" rx="18" ry="11"/><ellipse cx="-28" cy="-88" rx="24" ry="15"/><ellipse cx="49" cy="-66" rx="23" ry="13"/><ellipse cx="102" cy="-26" rx="17" ry="10"/><ellipse cx="11" cy="-28" rx="19" ry="12"/></g><path d="M-29 46L-35 111M-7 52L-8 123M29 48L37 106" fill="none" stroke="#cba982" stroke-width="4"/>'
  },
  '企鹅': {
    outline: 'M-69 107Q-120 96 -99 48Q-146 48 -129 6L-83 -45Q-77 -134 0 -137Q72 -137 87 -71L115 -58L88 -41L108 37Q136 104 70 116L93 134H20L0 119L-22 134H-89Z',
    palette: ['#648aa1','#293d52'], scene: 'snow',
    detail: '<ellipse cx="6" cy="29" rx="67" ry="90" fill="#fff2d6"/><ellipse cx="32" cy="-66" rx="29" ry="34" fill="#f7e7cb"/><circle cx="47" cy="-76" r="5.5" fill="#263749"/><path d="M71 -67L116 -58L76 -41Z" fill="#e3a15e"/><path d="M-95 118L-31 112L-23 137H-97ZM27 114L79 116L99 138H15Z" fill="#e3a15e"/><path d="M-85 -37Q-108 3 -103 37M-94 -23L-124 15" stroke="#94b1b5" stroke-width="5" fill="none" opacity=".65"/>'
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
  '风筝': {
    outline: 'M0 -155L132 -41L14 89Q15 118 -22 131Q-47 139 -43 156L-60 156Q-61 128 -29 115Q-4 103 -4 88L-132 -41Z',
    palette: ['#ffd19a','#af5464'], scene: 'sky',
    detail: '<path d="M0 -155L0 -40L-132 -41Z" fill="#e0a563"/><path d="M0 -40L132 -41L14 89Z" fill="#5c938a"/><path d="M0 -155L0 -40L14 89M-132 -41Q0 -74 132 -41" fill="none" stroke="#fff1c7" stroke-width="5"/><path d="M-34 124L-70 102L-58 132ZM-38 136L-14 154L-15 123Z" fill="#c16d62"/>'
  },
  '铃铛': {
    outline: 'M-24 -114A24 24 0 1 1 24 -114C79 -103 96 -63 96 4Q96 40 123 65Q134 79 120 91H39Q34 130 0 130Q-34 130 -39 91H-120Q-134 79 -123 65Q-96 40 -96 4C-96 -63 -79 -103 -24 -114Z',
    palette: ['#fff0aa','#b97a48'], scene: 'night',
    detail: '<path d="M-124 63Q0 91 124 63L127 91H-127Z" fill="#b37948"/><path d="M-103 53Q0 72 103 53M-67 9Q-71 -43 -44 -66" fill="none" stroke="#fff2bf" stroke-width="8" stroke-linecap="round"/><ellipse cy="99" rx="37" ry="14" fill="#926344"/>'
  },
  '雪人': {
    outline: 'M-77 115A79 79 0 0 1 -69 25L-115 -12L-105 -27L-61 3Q-56 -15 -46 -24A51 51 0 0 1 -43 -99H-64V-114H-37V-149H37V-114H64V-99H43A51 51 0 0 1 46 -24Q56 -15 61 3L105 -27L115 -12L69 25A79 79 0 0 1 77 115Q0 154 -77 115Z',
    palette: ['#fff6df','#91bbc4'], scene: 'snow',
    detail: '<path d="M-66 -154H66V-98H-66Z" fill="#405569"/><path d="M-37 -119H37V-106H-37Z" fill="#ba7062"/><path d="M-52 -27Q0 -4 52 -27L58 -7Q1 21 -58 -7Z M37 3L54 2L63 55L45 58Z" fill="#ba7062"/><g fill="#526475"><circle cx="-15" cy="-67" r="5"/><circle cx="15" cy="-67" r="5"/><circle cy="31" r="6"/><circle cy="57" r="6"/><circle cy="84" r="6"/></g><path d="M0 -60L36 -50L0 -46Z" fill="#d39153"/>'
  }
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
      <clipPath id="${id}-clip"><path d="${path}"/></clipPath>
    </defs>
    <rect width="800" height="${height}" fill="${ground}"/>
    <g transform="scale(1 ${height/560})"><rect width="800" height="560" fill="url(#${id}-sky)"/><circle cx="568" cy="159" r="74" fill="${glow}" opacity=".48"/>${sceneDetails(subject.scene)}</g>
    <g transform="translate(400 ${y}) scale(${scale})">
      <path d="${path}" fill="#28394a" opacity=".18" transform="translate(5 8)"/>
      <path d="${path}" fill="url(#${id}-subject)" stroke="${dark}" stroke-width="2" stroke-linejoin="round"/>
      <g clip-path="url(#${id}-clip)">${subject.detail}</g>
      ${subject.outside || ''}
    </g>
    <rect x="19" y="19" width="762" height="${height-38}" rx="3" fill="none" stroke="#fff6dc" stroke-opacity=".54"/>
  </svg>`;
}

function figurePuzzleMarkup(figure) {
  const {answer, frame} = figure;
  return `<svg class="figimage" viewBox="0 0 800 560" role="img" aria-label="图底关系谜题，观察两块深色形状之间的留白">
    <defs><mask id="figure-cutout"><rect width="800" height="560" fill="white"/><path d="${artwork[answer].outline}" transform="translate(400 280)" fill="black"/></mask></defs>
    <rect width="800" height="560" fill="#f3ead4"/>
    <g mask="url(#figure-cutout)">
      <path d="${frame}" fill="#283f46" fill-rule="evenodd"/>
      <path d="M0 15H800M0 545H800" fill="none" stroke="#283f46" stroke-width="31"/>
    </g>
  </svg>`;
}
