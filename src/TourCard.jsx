import { FaHeart, FaCalendarAlt, FaPlaneDeparture, FaUtensils,FaFireAlt } from "react-icons/fa";
import img13 from './assets/13.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

const tours = [
  { id: 1, title: "Kendwa Rocks 3 ★", location: "Танзанія, Занзібар", rating: "4,3", reviews: 36, price: "140 420 грн" },
  { id: 2, title: "Zanzibar Queen Hotel", location: "Танзанія, Занзібар", rating: "4,5", reviews: 42, price: "150 500 грн" },
  { id: 3, title: "Royal Zanzibar Beach Resort", location: "Танзанія, Занзібар", rating: "4,7", reviews: 50, price: "160 700 грн" },
  { id: 4, title: "Kendwa Rocks 3 ★", location: "Танзанія, Занзібар", rating: "4,3", reviews: 36, price: "140 420 грн" },
  { id: 5, title: "Zanzibar Queen Hotel", location: "Танзанія, Занзібар", rating: "4,5", reviews: 42, price: "150 500 грн" },
  { id: 6, title: "Royal Zanzibar Beach Resort", location: "Танзанія, Занзібар", rating: "4,7", reviews: 50, price: "160 700 грн" },
  { id: 7, title: "Kendwa Rocks 3 ★", location: "Танзанія, Занзібар", rating: "4,3", reviews: 36, price: "140 420 грн" },
  { id: 8, title: "Zanzibar Queen Hotel", location: "Танзанія, Занзібар", rating: "4,5", reviews: 42, price: "150 500 грн" },
  { id: 9, title: "Royal Zanzibar Beach Resort", location: "Танзанія, Занзібар", rating: "4,7", reviews: 50, price: "160 700 грн" }
];

const TourCard = ({ tour }) => {
  return (
<>
    <Link className="bg-[#f1e8e6]/20 border border-[#361d32]-200 rounded-2xl shadow-lg p-4 flex flex-col items-center" to='tour'>
      <div className="relative w-11/12 overflow-hidden bg-black/50 rounded-2xl">
      <div className="absolute inset-0 bg-black opacity-30"></div>
        <img
          className="w-full h-40 object-cover"
          src={img13}
          alt={tour.title}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow-md">
            <FaHeart className="text-[#543c52]" />
          </button>
        </div>
        <div className="absolute top-12 right-3 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow-md">
            <FaFireAlt className="text-[#543c52]" />
          </button>
        </div>
      </div>
      <div className="text-center mt-4 w-full">
        <div className="flex justify-between items-center text-sm px-2">
          <h3 className="font-semibold text-[#361d32]">{tour.title}</h3>
          <p className="text-[#361d32]">{tour.location}</p>
        </div>
        <div className="flex items-center justify-center gap-2 my-2 text-sm">
          <span className="text-[#f55951] font-bold">{tour.rating}</span>
          <span className="text-[#361d32]">({tour.reviews} відгуків)</span>
        </div>
        <div className="flex flex-col gap-1 text-gray-700 text-xs px-2">
          <p className="flex items-center gap-2 text-[#543c52]"><FaCalendarAlt className="text-[#361d32]" /> з 12.02 по 20.02 (7 +1 ночей)</p>
          <p className="flex items-center gap-2 text-[#543c52]"><FaPlaneDeparture  className="text-[#361d32]"/> Виїзд з Варшави</p>
          <p className="flex items-center gap-2 text-[#543c52]"><FaUtensils  className="text-[#361d32]"/> сніданок + вечеря</p>
        </div>
        <div className="flex justify-between items-center mt-3 px-2">
          <div className="text-[#f55951] text-lg font-bold">{tour.price}</div>
          <p className="text-[#361d32] text-xs">Ціна за тур 2 дорослих</p>
        </div>
        <button className="mt-4 w-full bg-[#543c52] text-[#f1e8e6] py-2 rounded-xl hover:bg-[#361d32] transition">
          Детальніше
        </button>
      </div>
    </Link>
    
</>
  );
};

const TourList = () => {
  const [more, setMore] = useState(false)
  return (
    <>
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(more ? tours : tours.slice(0, 6)).map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
        <div className="flex justify-center mt-6">
        <button 
          type="button" 
          className="text-sm text-[#361d32] underline" 
          onClick={() => setMore(!more)}
          >
           {more ? "Менше" : "Більше"}
        </button>
      </div>
      </>
  );
};

export default TourList;
