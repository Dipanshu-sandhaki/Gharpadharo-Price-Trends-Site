// src/data/propertyData.ts

// --- TYPE DEFINITIONS ---
// UPDATED: Added 'state' to the Locality type
export type Locality = { name: string; growth: string; avgPrice: string; state: string; };
export type PriceTrendPoint = { name: string; price: number };
export type TrendOption = "1Y" | "3Y" | "5Y";
export type PriceTrendData = { [key in TrendOption]: PriceTrendPoint[] };

export type CityData = {
  price: string;
  growth: string;
  image: string;
  appreciating: Locality[];
  depreciating: Locality[];
  priceTrend: PriceTrendData;
};

export type AllData = { [key: string]: CityData };

export type CityCardInfo = {
  city: string;
  price: string;
  growth: string;
  image: string;
};


// --- CENTRALIZED DUMMY DATA ---
export const allData: AllData = {
  Mumbai: {
    price: "₹15,000",
    growth: "+4.9%",
    image: "/mumbai.jpg",
    appreciating: [
      { name: "Vikhroli", growth: "+7.2%", avgPrice: "₹8,500", state: "Maharashtra" },
      { name: "Andheri East", growth: "+6.9%", avgPrice: "₹9,200", state: "Maharashtra" },
      { name: "Mulund West", growth: "+5.5%", avgPrice: "₹8,800", state: "Maharashtra" },
    ],
    depreciating: [
      { name: "Chembur", growth: "-4.3%", avgPrice: "₹6,200", state: "Maharashtra" },
      { name: "Bandra West", growth: "-3.8%", avgPrice: "₹15,000", state: "Maharashtra" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 14500 }, { name: "May", price: 14800 }, { name: "Jun", price: 15100 }, { name: "Jul", price: 15400 }, { name: "Aug", price: 15600 } ],
      "3Y": [ { name: "2022", price: 12800 }, { name: "2023", price: 13900 }, { name: "2024", price: 15600 } ],
      "5Y": [ { name: "2020", price: 11500 }, { name: "2021", price: 12100 }, { name: "2022", price: 12800 }, { name: "2023", price: 13900 }, { name: "2024", price: 15600 } ],
    },
  },
  Delhi: {
    price: "₹10,500",
    growth: "+2.6%",
    image: "/delhi.jpg",
    appreciating: [
      { name: "Dwarka", growth: "+6.5%", avgPrice: "₹7,500", state: "Delhi" },
      { name: "Saket", growth: "+5.8%", avgPrice: "₹9,800", state: "Delhi" },
    ],
    depreciating: [
      { name: "Vasant Kunj", growth: "-1.5%", avgPrice: "₹12,200", state: "Delhi" },
      { name: "GK I", growth: "-1.2%", avgPrice: "₹14,500", state: "Delhi" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 10000 }, { name: "May", price: 10200 }, { name: "Jun", price: 10300 }, { name: "Jul", price: 10500 }, { name: "Aug", price: 10600 } ],
      "3Y": [ { name: "2022", price: 9200 }, { name: "2023", price: 9800 }, { name: "2024", price: 10600 } ],
      "5Y": [ { name: "2020", price: 8500 }, { name: "2021", price: 8800 }, { name: "2022", price: 9200 }, { name: "2023", price: 9800 }, { name: "2024", price: 10600 } ],
    },
  },
  Bangalore: {
    price: "₹8,200",
    growth: "+6.1%",
    image: "/bangalore.jpg",
    appreciating: [
      { name: "Whitefield", growth: "+8.2%", avgPrice: "₹7,800", state: "Karnataka" },
      { name: "HSR Layout", growth: "+7.1%", avgPrice: "₹9,500", state: "Karnataka" },
    ],
    depreciating: [
      { name: "Koramangala", growth: "-0.5%", avgPrice: "₹11,000", state: "Karnataka" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 7800 }, { name: "May", price: 7900 }, { name: "Jun", price: 8000 }, { name: "Jul", price: 8100 }, { name: "Aug", price: 8200 } ],
      "3Y": [ { name: "2022", price: 6800 }, { name: "2023", price: 7500 }, { name: "2024", price: 8200 } ],
      "5Y": [ { name: "2020", price: 6000 }, { name: "2021", price: 6400 }, { name: "2022", price: 6800 }, { name: "2023", price: 7500 }, { name: "2024", price: 8200 } ],
    },
  },
  Hyderabad: {
    price: "₹7,700",
    growth: "+3.7%",
    image: "/Hyderabad.jpeg",
    appreciating: [
      { name: "Gachibowli", growth: "+9.5%", avgPrice: "₹8,100", state: "Telangana" },
      { name: "Kukatpally", growth: "+8.0%", avgPrice: "₹7,200", state: "Telangana" },
    ],
    depreciating: [
      { name: "Banjara Hills", growth: "-1.1%", avgPrice: "₹9,900", state: "Telangana" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 7200 }, { name: "May", price: 7300 }, { name: "Jun", price: 7400 }, { name: "Jul", price: 7500 }, { name: "Aug", price: 7700 } ],
      "3Y": [ { name: "2022", price: 6100 }, { name: "2023", price: 6800 }, { name: "2024", price: 7700 } ],
      "5Y": [ { name: "2020", price: 5500 }, { name: "2021", price: 5800 }, { name: "2022", price: 6100 }, { name: "2023", price: 6800 }, { name: "2024", price: 7700 } ],
    },
  },
  Chennai: {
    price: "₹7,900",
    growth: "+4.2%",
    image: "/chennai.jpeg",
    appreciating: [
      { name: "Velachery", growth: "+6.7%", avgPrice: "₹7,300", state: "Tamil Nadu" },
      { name: "Adyar", growth: "+5.5%", avgPrice: "₹9,400", state: "Tamil Nadu" },
    ],
    depreciating: [{ name: "T Nagar", growth: "-1.8%", avgPrice: "₹10,000", state: "Tamil Nadu" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 7500 }, { name: "May", price: 7600 }, { name: "Jun", price: 7700 }, { name: "Jul", price: 7800 }, { name: "Aug", price: 7900 } ],
      "3Y": [ { name: "2022", price: 6900 }, { name: "2023", price: 7300 }, { name: "2024", price: 7900 } ],
      "5Y": [ { name: "2020", price: 6200 }, { name: "2021", price: 6500 }, { name: "2022", price: 6900 }, { name: "2023", price: 7300 }, { name: "2024", price: 7900 } ],
    },
  },
  Pune: {
    price: "₹6,800",
    growth: "+3.5%",
    image: "/pune.jpeg",
    appreciating: [
      { name: "Hinjewadi", growth: "+7.0%", avgPrice: "₹6,200", state: "Maharashtra" },
      { name: "Kharadi", growth: "+6.4%", avgPrice: "₹6,800", state: "Maharashtra" },
    ],
    depreciating: [{ name: "Camp", growth: "-0.9%", avgPrice: "₹7,400", state: "Maharashtra" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 6400 }, { name: "May", price: 6500 }, { name: "Jun", price: 6600 }, { name: "Jul", price: 6700 }, { name: "Aug", price: 6800 } ],
      "3Y": [ { name: "2022", price: 5900 }, { name: "2023", price: 6300 }, { name: "2024", price: 6800 } ],
      "5Y": [ { name: "2020", price: 5200 }, { name: "2021", price: 5600 }, { name: "2022", price: 5900 }, { name: "2023", price: 6300 }, { name: "2024", price: 6800 } ],
    },
  },
  Ahmedabad: {
    price: "₹5,900",
    growth: "+4.0%",
    image: "/Ahmedabad.jpeg",
    appreciating: [
      { name: "Bopal", growth: "+6.5%", avgPrice: "₹5,400", state: "Gujarat" },
      { name: "SG Highway", growth: "+6.1%", avgPrice: "₹6,100", state: "Gujarat" },
    ],
    depreciating: [{ name: "Maninagar", growth: "-1.3%", avgPrice: "₹5,100", state: "Gujarat" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5600 }, { name: "May", price: 5700 }, { name: "Jun", price: 5800 }, { name: "Jul", price: 5900 }, { name: "Aug", price: 5900 } ],
      "3Y": [ { name: "2022", price: 5000 }, { name: "2023", price: 5400 }, { name: "2024", price: 5900 } ],
      "5Y": [ { name: "2020", price: 4500 }, { name: "2021", price: 4700 }, { name: "2022", price: 5000 }, { name: "2023", price: 5400 }, { name: "2024", price: 5900 } ],
    },
  },
  Kolkata: {
    price: "₹6,200",
    growth: "+3.0%",
    image: "/kolkata.jpeg",
    appreciating: [
      { name: "Salt Lake", growth: "+5.8%", avgPrice: "₹6,400", state: "West Bengal" },
      { name: "Rajarhat", growth: "+5.0%", avgPrice: "₹5,800", state: "West Bengal" },
    ],
    depreciating: [{ name: "Howrah", growth: "-0.7%", avgPrice: "₹5,200", state: "West Bengal" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5900 }, { name: "May", price: 6000 }, { name: "Jun", price: 6100 }, { name: "Jul", price: 6200 }, { name: "Aug", price: 6200 } ],
      "3Y": [ { name: "2022", price: 5500 }, { name: "2023", price: 5800 }, { name: "2024", price: 6200 } ],
      "5Y": [ { name: "2020", price: 5000 }, { name: "2021", price: 5200 }, { name: "2022", price: 5500 }, { name: "2023", price: 5800 }, { name: "2024", price: 6200 } ],
    },
  },
  Surat: {
    price: "₹5,500",
    growth: "+2.8%",
    image: "/surat.jpeg",
    appreciating: [
      { name: "Adajan", growth: "+4.9%", avgPrice: "₹5,200", state: "Gujarat" },
      { name: "Vesu", growth: "+4.4%", avgPrice: "₹5,600", state: "Gujarat" },
    ],
    depreciating: [{ name: "Katargam", growth: "-1.1%", avgPrice: "₹4,800", state: "Gujarat" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5200 }, { name: "May", price: 5300 }, { name: "Jun", price: 5400 }, { name: "Jul", price: 5500 }, { name: "Aug", price: 5500 } ],
      "3Y": [ { name: "2022", price: 4800 }, { name: "2023", price: 5000 }, { name: "2024", price: 5500 } ],
      "5Y": [ { name: "2020", price: 4300 }, { name: "2021", price: 4500 }, { name: "2022", price: 4800 }, { name: "2023", price: 5000 }, { name: "2024", price: 5500 } ],
    },
  },
  Jaipur: {
    price: "₹5,800",
    growth: "+3.3%",
    image: "/jaipur.jpeg",
    appreciating: [
      { name: "Vaishali Nagar", growth: "+5.5%", avgPrice: "₹5,900", state: "Rajasthan" },
      { name: "Malviya Nagar", growth: "+4.9%", avgPrice: "₹6,100", state: "Rajasthan" },
    ],
    depreciating: [{ name: "Jhotwara", growth: "-1.0%", avgPrice: "₹4,900", state: "Rajasthan" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5500 }, { name: "May", price: 5600 }, { name: "Jun", price: 5700 }, { name: "Jul", price: 5800 }, { name: "Aug", price: 5800 } ],
      "3Y": [ { name: "2022", price: 5000 }, { name: "2023", price: 5300 }, { name: "2024", price: 5800 } ],
      "5Y": [ { name: "2020", price: 4600 }, { name: "2021", price: 4800 }, { name: "2022", price: 5000 }, { name: "2023", price: 5300 }, { name: "2024", price: 5800 } ],
    },
  },
  Lucknow: {
    price: "₹4,900",
    growth: "+2.7%",
    image: "/lucknow.jpg",
    appreciating: [
      { name: "Gomti Nagar", growth: "+5.2%", avgPrice: "₹5,200", state: "Uttar Pradesh" },
      { name: "Aliganj", growth: "+4.5%", avgPrice: "₹4,800", state: "Uttar Pradesh" },
    ],
    depreciating: [{ name: "Charbagh", growth: "-0.8%", avgPrice: "₹4,300", state: "Uttar Pradesh" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4700 }, { name: "May", price: 4800 }, { name: "Jun", price: 4900 }, { name: "Jul", price: 4900 }, { name: "Aug", price: 4900 } ],
      "3Y": [ { name: "2022", price: 4500 }, { name: "2023", price: 4700 }, { name: "2024", price: 4900 } ],
      "5Y": [ { name: "2020", price: 4000 }, { name: "2021", price: 4200 }, { name: "2022", price: 4500 }, { name: "2023", price: 4700 }, { name: "2024", price: 4900 } ],
    },
  },
  Kanpur: {
    price: "₹4,700",
    growth: "+2.4%",
    image: "/kanpur.jpeg",
    appreciating: [
      { name: "Swaroop Nagar", growth: "+4.7%", avgPrice: "₹4,900", state: "Uttar Pradesh" },
      { name: "Kakadeo", growth: "+4.1%", avgPrice: "₹4,800", state: "Uttar Pradesh" },
    ],
    depreciating: [
      { name: "Govind Nagar", growth: "-0.6%", avgPrice: "₹4,200", state: "Uttar Pradesh" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4500 }, { name: "May", price: 4600 }, { name: "Jun", price: 4700 }, { name: "Jul", price: 4700 }, { name: "Aug", price: 4700 } ],
      "3Y": [ { name: "2022", price: 4300 }, { name: "2023", price: 4500 }, { name: "2024", price: 4700 } ],
      "5Y": [ { name: "2020", price: 3900 }, { name: "2021", price: 4100 }, { name: "2022", price: 4300 }, { name: "2023", price: 4500 }, { name: "2024", price: 4700 } ],
    },
  },
  Nagpur: {
    price: "₹5,100",
    growth: "+3.1%",
    image: "/nagpur.jpeg",
    appreciating: [
      { name: "Manish Nagar", growth: "+5.0%", avgPrice: "₹5,400", state: "Maharashtra" },
      { name: "Dharampeth", growth: "+4.6%", avgPrice: "₹5,300", state: "Maharashtra" },
    ],
    depreciating: [{ name: "Sadar", growth: "-0.9%", avgPrice: "₹4,700", state: "Maharashtra" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4900 }, { name: "May", price: 5000 }, { name: "Jun", price: 5100 }, { name: "Jul", price: 5100 }, { name: "Aug", price: 5100 } ],
      "3Y": [ { name: "2022", price: 4700 }, { name: "2023", price: 4900 }, { name: "2024", price: 5100 } ],
      "5Y": [ { name: "2020", price: 4300 }, { name: "2021", price: 4500 }, { name: "2022", price: 4700 }, { name: "2023", price: 4900 }, { name: "2024", price: 5100 } ],
    },
  },
  Bhopal: {
    price: "₹4,800",
    growth: "+2.9%",
    image: "/bhopal.jpeg",
    appreciating: [
      { name: "Arera Colony", growth: "+5.1%", avgPrice: "₹5,000", state: "Madhya Pradesh" },
      { name: "Kolar Road", growth: "+4.3%", avgPrice: "₹4,700", state: "Madhya Pradesh" },
    ],
    depreciating: [{ name: "Old City", growth: "-1.0%", avgPrice: "₹4,100", state: "Madhya Pradesh" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4600 }, { name: "May", price: 4700 }, { name: "Jun", price: 4800 }, { name: "Jul", price: 4800 }, { name: "Aug", price: 4800 } ],
      "3Y": [ { name: "2022", price: 4500 }, { name: "2023", price: 4600 }, { name: "2024", price: 4800 } ],
      "5Y": [ { name: "2020", price: 4100 }, { name: "2021", price: 4300 }, { name: "2022", price: 4500 }, { name: "2023", price: 4600 }, { name: "2024", price: 4800 } ],
    },
  },
  Patna: {
    price: "₹4,600",
    growth: "+2.5%",
    image: "/patna.jpeg",
    appreciating: [
      { name: "Kankarbagh", growth: "+4.8%", avgPrice: "₹4,800", state: "Bihar" },
      { name: "Boring Road", growth: "+4.2%", avgPrice: "₹4,700", state: "Bihar" },
    ],
    depreciating: [{ name: "Patliputra", growth: "-0.7%", avgPrice: "₹4,200", state: "Bihar" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4400 }, { name: "May", price: 4500 }, { name: "Jun", price: 4600 }, { name: "Jul", price: 4600 }, { name: "Aug", price: 4600 } ],
      "3Y": [ { name: "2022", price: 4300 }, { name: "2023", price: 4400 }, { name: "2024", price: 4600 } ],
      "5Y": [ { name: "2020", price: 3900 }, { name: "2021", price: 4100 }, { name: "2022", price: 4300 }, { name: "2023", price: 4400 }, { name: "2024", price: 4600 } ],
    },
  },
  Vadodara: {
    price: "₹5,300",
    growth: "+3.2%",
    image: "/vadodara.jpeg",
    appreciating: [
      { name: "Alkapuri", growth: "+5.4%", avgPrice: "₹5,600", state: "Gujarat" },
      { name: "Gotri", growth: "+4.8%", avgPrice: "₹5,200", state: "Gujarat" },
    ],
    depreciating: [{ name: "Fatehgunj", growth: "-0.9%", avgPrice: "₹4,900", state: "Gujarat" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5100 }, { name: "May", price: 5200 }, { name: "Jun", price: 5300 }, { name: "Jul", price: 5300 }, { name: "Aug", price: 5300 } ],
      "3Y": [ { name: "2022", price: 4900 }, { name: "2023", price: 5100 }, { name: "2024", price: 5300 } ],
      "5Y": [ { name: "2020", price: 4500 }, { name: "2021", price: 4700 }, { name: "2022", price: 4900 }, { name: "2023", price: 5100 }, { name: "2024", price: 5300 } ],
    },
  },
  Ludhiana: {
    price: "₹5,000",
    growth: "+2.9%",
    image: "/ludhiana.jpeg",
    appreciating: [
      { name: "Pakhowal Road", growth: "+5.0%", avgPrice: "₹5,200", state: "Punjab" },
      { name: "Sarabha Nagar", growth: "+4.6%", avgPrice: "₹5,100", state: "Punjab" },
    ],
    depreciating: [{ name: "Gill Road", growth: "-0.8%", avgPrice: "₹4,600", state: "Punjab" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4800 }, { name: "May", price: 4900 }, { name: "Jun", price: 5000 }, { name: "Jul", price: 5000 }, { name: "Aug", price: 5000 } ],
      "3Y": [ { name: "2022", price: 4700 }, { name: "2023", price: 4800 }, { name: "2024", price: 5000 } ],
      "5Y": [ { name: "2020", price: 4300 }, { name: "2021", price: 4500 }, { name: "2022", price: 4700 }, { name: "2023", price: 4800 }, { name: "2024", price: 5000 } ],
    },
  },
  Agra: {
    price: "₹4,400",
    growth: "+2.2%",
    image: "/agra.jpeg",
    appreciating: [
      { name: "Civil Lines", growth: "+4.5%", avgPrice: "₹4,700", state: "Uttar Pradesh" },
      { name: "Kamla Nagar", growth: "+4.0%", avgPrice: "₹4,500", state: "Uttar Pradesh" },
    ],
    depreciating: [{ name: "Shahganj", growth: "-0.6%", avgPrice: "₹4,000", state: "Uttar Pradesh" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 4200 }, { name: "May", price: 4300 }, { name: "Jun", price: 4400 }, { name: "Jul", price: 4400 }, { name: "Aug", price: 4400 } ],
      "3Y": [ { name: "2022", price: 4100 }, { name: "2023", price: 4200 }, { name: "2024", price: 4400 } ],
      "5Y": [ { name: "2020", price: 3800 }, { name: "2021", price: 3900 }, { name: "2022", price: 4100 }, { name: "2023", price: 4200 }, { name: "2024", price: 4400 } ],
    },
  },
  Indore: {
    price: "₹5,400",
    growth: "+3.4%",
    image: "/indore.jpeg",
    appreciating: [
      { name: "Vijay Nagar", growth: "+5.6%", avgPrice: "₹5,700", state: "Madhya Pradesh" },
      { name: "Palasia", growth: "+4.9%", avgPrice: "₹5,500", state: "Madhya Pradesh" },
    ],
    depreciating: [{ name: "Rajwada", growth: "-1.0%", avgPrice: "₹4,900", state: "Madhya Pradesh" }],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5200 }, { name: "May", price: 5300 }, { name: "Jun", price: 5400 }, { name: "Jul", price: 5400 }, { name: "Aug", price: 5400 } ],
      "3Y": [ { name: "2022", price: 5000 }, { name: "2023", price: 5200 }, { name: "2024", price: 5400 } ],
      "5Y": [ { name: "2020", price: 4600 }, { name: "2021", price: 4800 }, { name: "2022", price: 5000 }, { name: "2023", price: 5200 }, { name: "2024", price: 5400 } ],
    },
  },
  Coimbatore: {
    price: "₹5,200",
    growth: "+3.0%",
    image: "/coimbatore.jpeg",
    appreciating: [
      { name: "RS Puram", growth: "+5.3%", avgPrice: "₹5,500", state: "Tamil Nadu" },
      { name: "Saibaba Colony", growth: "+4.7%", avgPrice: "₹5,400", state: "Tamil Nadu" },
    ],
    depreciating: [
      { name: "Gandhipuram", growth: "-0.8%", avgPrice: "₹4,800", state: "Tamil Nadu" },
    ],
    priceTrend: {
      "1Y": [ { name: "Apr", price: 5000 }, { name: "May", price: 5100 }, { name: "Jun", price: 5200 }, { name: "Jul", price: 5200 }, { name: "Aug", price: 5200 } ],
      "3Y": [ { name: "2022", price: 4800 }, { name: "2023", price: 5000 }, { name: "2024", price: 5200 } ],
      "5Y": [ { name: "2020", price: 4400 }, { name: "2021", price: 4600 }, { name: "2022", price: 4800 }, { name: "2023", price: 5000 }, { name: "2024", price: 5200 } ],
    },
  },
};

// We also move the data transformation logic here
export const cityCardsData: CityCardInfo[] = Object.keys(allData).map((city) => ({
  city: city,
  price: allData[city].price,
  growth: allData[city].growth,
  image: allData[city].image,
}));