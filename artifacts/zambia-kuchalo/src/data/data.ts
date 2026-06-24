export interface Province {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  gradient: string;
  accentColor: string;
  bgKeyword: string;
  image: string;
  places: Place[];
}

export interface Place {
  id: string;
  name: string;
  provinceId: string;
  description: string;
  gradient: string;
  tagline: string;
  image: string;
  images: string[];
}

export interface Stay {
  id: string;
  name: string;
  location: string;
  province: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  amenities: string[];
  featured?: boolean;
  gradient: string;
  image: string;
}

export interface Experience {
  id: string;
  name: string;
  location: string;
  rating: number;
  gradient: string;
  image: string;
  trending?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  province: string;
  description: string;
  visitors: string;
  gradient: string;
  image: string;
  featured?: boolean;
}

const UNS = "https://images.unsplash.com/photo-";
const Q = "?auto=format&fit=crop&w=400&h=600&q=80";
const QW = "?auto=format&fit=crop&w=600&h=400&q=80";

export const PROVINCES: Province[] = [
  {
    id: "lusaka",
    name: "Lusaka Province",
    shortName: "Lusaka",
    tagline: "Capital & commerce",
    description: "The vibrant heart of Zambia",
    gradient: "linear-gradient(135deg, #1a3a1a 0%, #c8750a 50%, #1a2a0a 100%)",
    accentColor: "#c8750a",
    bgKeyword: "lusaka",
    image: `${UNS}1555636441-a1ee2ef4ccd6${Q}`,
    places: [
      { id: "lusaka-city", name: "Lusaka", provinceId: "lusaka", description: "Capital city of Zambia", tagline: "Urban pulse of Zambia", gradient: "linear-gradient(135deg, #1a2a0a 0%, #c8750a 100%)", image: `${UNS}1555636441-a1ee2ef4ccd6${Q}`, images: [] },
      { id: "kafue", name: "Kafue", provinceId: "lusaka", description: "Industrial hub on the Kafue River", tagline: "River city life", gradient: "linear-gradient(135deg, #0a1a2a 0%, #1a5a2a 100%)", image: `${UNS}1504701954957-2010ec3bcec1${Q}`, images: [] },
      { id: "chongwe", name: "Chongwe", provinceId: "lusaka", description: "Gateway to the Lower Zambezi", tagline: "Riverside serenity", gradient: "linear-gradient(135deg, #0a2a1a 0%, #2a6a1a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "chilanga", name: "Chilanga", provinceId: "lusaka", description: "Gateway suburb of Lusaka", tagline: "Where city meets bush", gradient: "linear-gradient(135deg, #1a2a0a 0%, #5a3a0a 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "rufunsa", name: "Rufunsa", provinceId: "lusaka", description: "Remote wilderness district", tagline: "Wild Zambia awaits", gradient: "linear-gradient(135deg, #0a1a0a 0%, #2a5a1a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "lower-zambezi", name: "Lower Zambezi National Park", provinceId: "lusaka", description: "World-class safari destination", tagline: "Canoe past elephants", gradient: "linear-gradient(135deg, #0a2a1a 0%, #8a6a0a 100%)", image: `${UNS}1501854140801-50d01698950b${Q}`, images: [] },
    ],
  },
  {
    id: "muchinga",
    name: "Muchinga Province",
    shortName: "Muchinga",
    tagline: "Falls & wilderness",
    description: "Land of cascading waterfalls",
    gradient: "linear-gradient(135deg, #0a1a2a 0%, #1a4a6a 50%, #0a2a3a 100%)",
    accentColor: "#1a8acf",
    bgKeyword: "muchinga",
    image: `${UNS}1567766338-ede0a09bce49${Q}`,
    places: [
      { id: "mpika", name: "Mpika", provinceId: "muchinga", description: "Gateway to Shiwa Ngandu", tagline: "Colonial history lives here", gradient: "linear-gradient(135deg, #0a1a2a 0%, #1a4a6a 100%)", image: `${UNS}1501854140801-50d01698950b${Q}`, images: [] },
      { id: "chinsali", name: "Chinsali", provinceId: "muchinga", description: "Birthplace of Kenneth Kaunda", tagline: "Historic freedom town", gradient: "linear-gradient(135deg, #0a2a2a 0%, #1a5a4a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "south-luangwa", name: "South Luangwa NP", provinceId: "muchinga", description: "Walking safari capital of the world", tagline: "Walk with leopards", gradient: "linear-gradient(135deg, #2a1a0a 0%, #6a4a0a 100%)", image: `${UNS}1547036967-23d11aacaee0${Q}`, images: [] },
      { id: "chilonga", name: "Chilonga", provinceId: "muchinga", description: "Remote highland village", tagline: "Unspoiled highland life", gradient: "linear-gradient(135deg, #0a1a0a 0%, #2a4a1a 100%)", image: `${UNS}1441974231531-c6227db76b6e${Q}`, images: [] },
      { id: "chandesi", name: "Chandesi", provinceId: "muchinga", description: "Hidden gem of Muchinga", tagline: "Off the beaten path", gradient: "linear-gradient(135deg, #1a0a2a 0%, #3a2a5a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
    ],
  },
  {
    id: "copperbelt",
    name: "Copperbelt Province",
    shortName: "Copperbelt",
    tagline: "Copper & culture",
    description: "Industrial heartland of Africa",
    gradient: "linear-gradient(135deg, #3a1a00 0%, #8B4513 50%, #1a0a00 100%)",
    accentColor: "#b87333",
    bgKeyword: "copperbelt",
    image: `${UNS}1501854140801-50d01698950b${Q}`,
    places: [
      { id: "chingola", name: "Chingola", provinceId: "copperbelt", description: "Home of Nchanga Copper Mine", tagline: "Copper runs deep here", gradient: "linear-gradient(135deg, #3a1a00 0%, #8B4513 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "kitwe", name: "Kitwe", provinceId: "copperbelt", description: "Second largest city", tagline: "Urban copper city life", gradient: "linear-gradient(135deg, #2a1a00 0%, #7a3a10 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "ndola", name: "Ndola", provinceId: "copperbelt", description: "Industrial and commercial hub", tagline: "Commerce of the north", gradient: "linear-gradient(135deg, #1a1a0a 0%, #5a3a10 100%)", image: `${UNS}1555636441-a1ee2ef4ccd6${Q}`, images: [] },
      { id: "luanshya", name: "Luanshya", provinceId: "copperbelt", description: "City of miners", tagline: "Where copper built a nation", gradient: "linear-gradient(135deg, #2a0a00 0%, #7a3a00 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "kalulushi", name: "Kalulushi", provinceId: "copperbelt", description: "Small mining town", tagline: "Quiet copper community", gradient: "linear-gradient(135deg, #1a0a00 0%, #6a2a10 100%)", image: `${UNS}1441974231531-c6227db76b6e${Q}`, images: [] },
    ],
  },
  {
    id: "northwestern",
    name: "North Western Province",
    shortName: "North Western",
    tagline: "River source & forests",
    description: "Where the Zambezi begins",
    gradient: "linear-gradient(135deg, #0a2a0a 0%, #1a5a1a 50%, #0a3a1a 100%)",
    accentColor: "#2a8a4a",
    bgKeyword: "northwestern",
    image: `${UNS}1441974231531-c6227db76b6e${Q}`,
    places: [
      { id: "west-luangwa", name: "West Luangwa NP", provinceId: "northwestern", description: "Remote and untouched wilderness", tagline: "True wilderness awaits", gradient: "linear-gradient(135deg, #0a2a0a 0%, #2a6a1a 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "ikelenge", name: "Ikelenge", provinceId: "northwestern", description: "Source of the Zambezi River", tagline: "Birth of a great river", gradient: "linear-gradient(135deg, #0a3a1a 0%, #1a5a3a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "solwezi", name: "Solwezi", provinceId: "northwestern", description: "Kansanshi mining boom town", tagline: "New copper frontier", gradient: "linear-gradient(135deg, #1a2a0a 0%, #4a6a1a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "kasempa", name: "Kasempa", provinceId: "northwestern", description: "Highland district town", tagline: "High plateau living", gradient: "linear-gradient(135deg, #0a1a0a 0%, #3a5a2a 100%)", image: `${UNS}1501854140801-50d01698950b${Q}`, images: [] },
      { id: "mufumbwe", name: "Mufumbwe", provinceId: "northwestern", description: "Remote district on Kabompo", tagline: "River frontier life", gradient: "linear-gradient(135deg, #0a2a1a 0%, #2a4a2a 100%)", image: `${UNS}1504701954957-2010ec3bcec1${Q}`, images: [] },
    ],
  },
  {
    id: "eastern",
    name: "Eastern Province",
    shortName: "Eastern",
    tagline: "Safari paradise",
    description: "South Luangwa's wildlife capital",
    gradient: "linear-gradient(135deg, #2a1a00 0%, #6a4a00 50%, #1a2a00 100%)",
    accentColor: "#c8920a",
    bgKeyword: "eastern",
    image: `${UNS}1547036967-23d11aacaee0${Q}`,
    places: [
      { id: "nyimba", name: "Nyimba", provinceId: "eastern", description: "Gateway district town", tagline: "Eastern gateway", gradient: "linear-gradient(135deg, #1a1a0a 0%, #4a3a0a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "petauke", name: "Petauke", provinceId: "eastern", description: "Historic chieftaincy area", tagline: "Ancient traditions live on", gradient: "linear-gradient(135deg, #2a1a00 0%, #5a3a00 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "chipata", name: "Chipata", provinceId: "eastern", description: "Capital of Eastern Province", tagline: "Eastern province hub", gradient: "linear-gradient(135deg, #1a0a00 0%, #6a2a00 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "lundazi", name: "Lundazi", provinceId: "eastern", description: "Malawian border district", tagline: "Where nations meet", gradient: "linear-gradient(135deg, #0a1a0a 0%, #3a4a0a 100%)", image: `${UNS}1441974231531-c6227db76b6e${Q}`, images: [] },
      { id: "lukusuzi", name: "Lukusuzi NP", provinceId: "eastern", description: "Remote wildlife sanctuary", tagline: "Untouched wildlife haven", gradient: "linear-gradient(135deg, #1a2a00 0%, #4a5a10 100%)", image: `${UNS}1547036967-23d11aacaee0${Q}`, images: [] },
    ],
  },
  {
    id: "luapula",
    name: "Luapula Province",
    shortName: "Luapula",
    tagline: "Lakes & rivers",
    description: "Land of a thousand lakes",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a3a6a 50%, #0a2a4a 100%)",
    accentColor: "#0a6aaa",
    bgKeyword: "luapula",
    image: `${UNS}1504701954957-2010ec3bcec1${Q}`,
    places: [
      { id: "mansa", name: "Mansa", provinceId: "luapula", description: "Capital of Luapula Province", tagline: "Lake province capital", gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a4a7a 100%)", image: `${UNS}1504701954957-2010ec3bcec1${Q}`, images: [] },
      { id: "samfya", name: "Samfya", provinceId: "luapula", description: "White sandy beaches on Lake Bangweulu", tagline: "Zambia's hidden beach", gradient: "linear-gradient(135deg, #0a2a3a 0%, #0a5a7a 100%)", image: `${UNS}1544735716-392fe2489ffa${Q}`, images: [] },
      { id: "lake-mweru", name: "Lake Mweru", provinceId: "luapula", description: "Vast lake on DRC border", tagline: "Border lake reflections", gradient: "linear-gradient(135deg, #0a1a2a 0%, #0a3a5a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "mununga", name: "Mununga", provinceId: "luapula", description: "Lakeside district town", tagline: "Fishing village charm", gradient: "linear-gradient(135deg, #0a1a3a 0%, #1a3a5a 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "nchelenge", name: "Nchelenge", provinceId: "luapula", description: "Fishing town on Lake Mweru", tagline: "Life on the great lake", gradient: "linear-gradient(135deg, #0a0a2a 0%, #0a2a4a 100%)", image: `${UNS}1501854140801-50d01698950b${Q}`, images: [] },
    ],
  },
  {
    id: "northern",
    name: "Northern Province",
    shortName: "Northern",
    tagline: "Falls & great lakes",
    description: "Kalambo Falls & Lake Tanganyika",
    gradient: "linear-gradient(135deg, #1a0a3a 0%, #2a1a5a 50%, #0a1a3a 100%)",
    accentColor: "#5a2a9a",
    bgKeyword: "northern",
    image: `${UNS}1567766338-ede0a09bce49${Q}`,
    places: [
      { id: "kasaba-bay", name: "Kasaba Bay", provinceId: "northern", description: "Remote bay on Lake Tanganyika", tagline: "The world's longest lake", gradient: "linear-gradient(135deg, #0a1a3a 0%, #1a3a6a 100%)", image: `${UNS}1544735716-392fe2489ffa${Q}`, images: [] },
      { id: "kasama", name: "Kasama", provinceId: "northern", description: "Capital of Northern Province", tagline: "Northern highlands capital", gradient: "linear-gradient(135deg, #1a0a2a 0%, #3a2a5a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "mbala", name: "Mbala", provinceId: "northern", description: "Near Kalambo Falls", tagline: "Gateway to Kalambo", gradient: "linear-gradient(135deg, #0a1a2a 0%, #2a3a5a 100%)", image: `${UNS}1567766338-ede0a09bce49${Q}`, images: [] },
      { id: "luwingu", name: "Luwingu", provinceId: "northern", description: "Remote highland district", tagline: "High plateau serenity", gradient: "linear-gradient(135deg, #1a0a1a 0%, #3a1a4a 100%)", image: `${UNS}1441974231531-c6227db76b6e${Q}`, images: [] },
    ],
  },
  {
    id: "central",
    name: "Central Province",
    shortName: "Central",
    tagline: "Savanna & history",
    description: "The breadbasket of Zambia",
    gradient: "linear-gradient(135deg, #1a2a0a 0%, #4a6a0a 50%, #0a2a1a 100%)",
    accentColor: "#6a8a2a",
    bgKeyword: "central",
    image: `${UNS}1547471080-7cc2caa01a7e${Q}`,
    places: [
      { id: "kabwe", name: "Kabwe", provinceId: "central", description: "Historic mining town", tagline: "Silver and zinc legacy", gradient: "linear-gradient(135deg, #1a2a0a 0%, #4a5a0a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "chipepo", name: "Chipepo", provinceId: "central", description: "Rural farming district", tagline: "Zambia's breadbasket", gradient: "linear-gradient(135deg, #0a2a0a 0%, #3a5a0a 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "kapiri-mposhi", name: "Kapiri Mposhi", provinceId: "central", description: "TAZARA railway terminus", tagline: "Where railways connect Africa", gradient: "linear-gradient(135deg, #1a1a0a 0%, #4a4a0a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "chibombo", name: "Chibombo", provinceId: "central", description: "Rural central province", tagline: "Quiet agricultural plains", gradient: "linear-gradient(135deg, #0a2a1a 0%, #2a5a2a 100%)", image: `${UNS}1501854140801-50d01698950b${Q}`, images: [] },
      { id: "mumbwa", name: "Mumbwa", provinceId: "central", description: "Gateway to Kafue National Park", tagline: "Safari from the center", gradient: "linear-gradient(135deg, #2a1a0a 0%, #5a3a0a 100%)", image: `${UNS}1547036967-23d11aacaee0${Q}`, images: [] },
      { id: "serenje", name: "Serenje", provinceId: "central", description: "Near Kundalila Falls", tagline: "Waterfall wonder district", gradient: "linear-gradient(135deg, #0a1a1a 0%, #2a4a3a 100%)", image: `${UNS}1567766338-ede0a09bce49${Q}`, images: [] },
    ],
  },
  {
    id: "southern",
    name: "Southern Province",
    shortName: "Southern",
    tagline: "Victoria Falls & wildlife",
    description: "The smoke that thunders",
    gradient: "linear-gradient(135deg, #0a2a3a 0%, #1a5a5a 50%, #0a3a1a 100%)",
    accentColor: "#2a9a9a",
    bgKeyword: "southern",
    image: `${UNS}1489493887464-892be6d1daae${Q}`,
    places: [
      { id: "livingstone", name: "Livingstone", provinceId: "southern", description: "Adventure capital of Africa", tagline: "The mighty Victoria Falls", gradient: "linear-gradient(135deg, #0a2a3a 0%, #1a6a6a 100%)", image: `${UNS}1489493887464-892be6d1daae${Q}`, images: [] },
      { id: "choma", name: "Choma", provinceId: "southern", description: "Tonga heartland", tagline: "Wildlife & heritage", gradient: "linear-gradient(135deg, #0a2a1a 0%, #2a6a2a 100%)", image: `${UNS}1547036967-23d11aacaee0${Q}`, images: [] },
      { id: "mazabuka", name: "Mazabuka", provinceId: "southern", description: "Sugar capital of Zambia", tagline: "History & heritage", gradient: "linear-gradient(135deg, #1a2a0a 0%, #5a6a0a 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
      { id: "monze", name: "Monze", provinceId: "southern", description: "Ancient Tonga settlement", tagline: "Ancient traditions persist", gradient: "linear-gradient(135deg, #1a1a0a 0%, #4a3a0a 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "siavonga", name: "Siavonga", provinceId: "southern", description: "Lake Kariba resort town", tagline: "Lakeside adventures", gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a4a6a 100%)", image: `${UNS}1544735716-392fe2489ffa${Q}`, images: [] },
    ],
  },
  {
    id: "western",
    name: "Western Province",
    shortName: "Western",
    tagline: "Zambezi & floodplains",
    description: "The royal Lozi kingdom",
    gradient: "linear-gradient(135deg, #2a1a00 0%, #8a6a00 50%, #1a1a0a 100%)",
    accentColor: "#aa8a00",
    bgKeyword: "western",
    image: `${UNS}1516026672322-c02f5e2b5b97${Q}`,
    places: [
      { id: "mongu", name: "Mongu", provinceId: "western", description: "Capital on the Barotse floodplain", tagline: "Royal Lozi capital", gradient: "linear-gradient(135deg, #2a1a00 0%, #7a5a00 100%)", image: `${UNS}1504701954957-2010ec3bcec1${Q}`, images: [] },
      { id: "zambezi", name: "Zambezi", provinceId: "western", description: "Confluence of great rivers", tagline: "Where rivers meet", gradient: "linear-gradient(135deg, #0a1a2a 0%, #2a4a6a 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${Q}`, images: [] },
      { id: "senanga", name: "Senanga", provinceId: "western", description: "Barotse floodplain district", tagline: "Floodplain of the Lozi", gradient: "linear-gradient(135deg, #1a1a00 0%, #5a4a00 100%)", image: `${UNS}1547471080-7cc2caa01a7e${Q}`, images: [] },
      { id: "kalabo", name: "Kalabo", provinceId: "western", description: "Remote western district", tagline: "Beyond the floodplains", gradient: "linear-gradient(135deg, #0a2a0a 0%, #3a5a0a 100%)", image: `${UNS}1441974231531-c6227db76b6e${Q}`, images: [] },
      { id: "kaoma", name: "Kaoma", provinceId: "western", description: "Eastern gateway to western province", tagline: "Gateway to the west", gradient: "linear-gradient(135deg, #1a0a00 0%, #4a3a00 100%)", image: `${UNS}1575550959106-5a7dece5a093${Q}`, images: [] },
    ],
  },
];

export const STAYS: Stay[] = [
  {
    id: "latitude-15",
    name: "Latitude 15°",
    location: "Livingstone",
    province: "Southern Province",
    price: 1600,
    currency: "K",
    rating: 4.8,
    reviews: 246,
    amenities: ["Pool", "Wi-Fi", "Restaurant", "AC"],
    featured: true,
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #2a6a4a 100%)",
    image: `${UNS}1489493887464-892be6d1daae${QW}`,
  },
  {
    id: "mukambi",
    name: "Mukambi Safari Lodge",
    location: "South Luangwa",
    province: "Eastern Province",
    price: 2850,
    currency: "K",
    rating: 4.9,
    reviews: 318,
    amenities: ["Safari", "Wi-Fi", "Restaurant", "Bar"],
    gradient: "linear-gradient(135deg, #2a1a00 0%, #6a4a00 100%)",
    image: `${UNS}1547036967-23d11aacaee0${QW}`,
  },
  {
    id: "fallsway",
    name: "Fallsway Guest House",
    location: "Livingstone",
    province: "Southern Province",
    price: 980,
    currency: "K",
    rating: 4.6,
    reviews: 182,
    amenities: ["Wi-Fi", "Breakfast", "Parking", "AC"],
    gradient: "linear-gradient(135deg, #0a2a3a 0%, #1a5a5a 100%)",
    image: `${UNS}1544735716-392fe2489ffa${QW}`,
  },
  {
    id: "zambezi-bnb",
    name: "Zambezi River BnB",
    location: "Siavonga",
    province: "Southern Province",
    price: 1250,
    currency: "K",
    rating: 4.7,
    reviews: 143,
    amenities: ["Wi-Fi", "Breakfast", "River View", "AC"],
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a3a6a 100%)",
    image: `${UNS}1516026672322-c02f5e2b5b97${QW}`,
  },
];

export const EXPERIENCES: Experience[] = [
  { id: "bungee", name: "Bungee Jumping Victoria Falls Bridge", location: "Livingstone", rating: 4.9, gradient: "linear-gradient(135deg, #0a2a3a 0%, #1a5a5a 100%)", image: `${UNS}1489493887464-892be6d1daae${QW}`, trending: true },
  { id: "sunset-cruise", name: "Sunset Cruise Zambezi River", location: "Livingstone", rating: 4.8, gradient: "linear-gradient(135deg, #2a1a00 0%, #8a4a00 100%)", image: `${UNS}1516026672322-c02f5e2b5b97${QW}`, trending: true },
  { id: "game-drive", name: "Game Drive South Luangwa", location: "Eastern Province", rating: 4.9, gradient: "linear-gradient(135deg, #1a2a00 0%, #4a6a00 100%)", image: `${UNS}1547036967-23d11aacaee0${QW}`, trending: true },
  { id: "kayaking", name: "Kayaking Lake Kariba", location: "Southern Province", rating: 4.7, gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a4a6a 100%)", image: `${UNS}1544735716-392fe2489ffa${QW}` },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    location: "Livingstone",
    province: "Southern Province",
    description: "One of the Seven Natural Wonders of the World.",
    visitors: "2.4K+",
    gradient: "linear-gradient(135deg, #0a2a3a 0%, #0a5a5a 60%, #1a6a3a 100%)",
    image: `${UNS}1489493887464-892be6d1daae${QW}`,
    featured: true,
  },
  {
    id: "south-luangwa",
    name: "South Luangwa NP",
    location: "Mfuwe",
    province: "Eastern Province",
    description: "Walking safari capital of the world.",
    visitors: "1.8K+",
    gradient: "linear-gradient(135deg, #2a1a00 0%, #6a4a00 100%)",
    image: `${UNS}1547036967-23d11aacaee0${QW}`,
    featured: true,
  },
  {
    id: "lake-tanganyika",
    name: "Lake Tanganyika",
    location: "Mpulungu",
    province: "Northern Province",
    description: "World's longest and second deepest freshwater lake.",
    visitors: "980+",
    gradient: "linear-gradient(135deg, #0a1a4a 0%, #0a3a7a 100%)",
    image: `${UNS}1544735716-392fe2489ffa${QW}`,
    featured: true,
  },
  {
    id: "kalambo-falls",
    name: "Kalambo Falls",
    location: "Mbala",
    province: "Northern Province",
    description: "Second tallest uninterrupted waterfall in Africa.",
    visitors: "640+",
    gradient: "linear-gradient(135deg, #1a0a3a 0%, #3a1a6a 100%)",
    image: `${UNS}1567766338-ede0a09bce49${QW}`,
    featured: true,
  },
  {
    id: "lower-zambezi-np",
    name: "Lower Zambezi NP",
    location: "Chirundu",
    province: "Lusaka Province",
    description: "Canoe past elephants along the mighty Zambezi.",
    visitors: "1.1K+",
    gradient: "linear-gradient(135deg, #0a2a1a 0%, #0a5a2a 100%)",
    image: `${UNS}1501854140801-50d01698950b${QW}`,
  },
  {
    id: "nsangwe",
    name: "Nsangwe Rock Paintings",
    location: "Mumbwa",
    province: "Central Province",
    description: "Ancient San Bushmen rock art in the African savanna.",
    visitors: "320+",
    gradient: "linear-gradient(135deg, #2a1a0a 0%, #5a3a0a 100%)",
    image: `${UNS}1575550959106-5a7dece5a093${QW}`,
  },
  {
    id: "lake-kariba",
    name: "Lake Kariba",
    location: "Siavonga",
    province: "Southern Province",
    description: "One of the world's largest man-made lakes.",
    visitors: "1.5K+",
    gradient: "linear-gradient(135deg, #0a1a3a 0%, #0a4a6a 100%)",
    image: `${UNS}1504701954957-2010ec3bcec1${QW}`,
  },
];
