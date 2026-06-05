"use client";
import { isPointInZone } from "@/utils/address";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiTargetLock } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import TextAreaInput from "../inputs/text-area-input/TextAreaInput";
import TextInput from "../inputs/text-input/TextInput";

// Lazy load map
const LocationMap = dynamic(() => import("./components/map/Map"), {
  ssr: false,
});

export default function LocationInput({
  selectedLocation: prevSelectedLocation,
  handleAddLocation,
  btnText,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [center, setCenter] = useState([23.770493450913996, 90.35682074415092]);
  const [address, setAddress] = useState(prevSelectedLocation?.address || null);
  const [loading, setLoading] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(
    prevSelectedLocation?.lat
      ? [prevSelectedLocation.lat, prevSelectedLocation?.long]
      : null
  );

  const suggestionBoxRef = useRef(null);

  // ✅ Get current location
  const setCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (!isPointInZone(coords.latitude, coords.longitude)) {
            toast.error(
              "Sorry, your current location is outside our delivery zone."
            );
            return;
          }
          setLoading(true);
          setSelectedPosition([coords.latitude, coords.longitude]);
          updateLocation(coords.latitude, coords.longitude);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        },
        (err) => console.warn("Geolocation error:", err)
      );
    }
  };
  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search handler
  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) return setSuggestions([]);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}, Bangladesh`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleSelect = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    if (isPointInZone(lat, lon)) {
      setSelectedPosition([lat, lon]);
      setQuery("");
      handleAddLocation({
        lat: lat,
        long: lon,
        address: place.display_name,
      });
      setSuggestions([]);
      setSelectedPosition([lat, lon]);
      setAddress(place.display_name);
    } else {
      toast.error("Selected location is outside the service zone.");
    }
  };

  const updateLocation = (lat, lon) => {
    const newCenter = [lat, lon];
    if (!isPointInZone(lat, lon)) {
      toast.error("Selected location is outside the delivery zone.");
      setQuery("");
      return;
    }
    setCenter(newCenter);

    // reverseGeocode(lat, lon);
  };

  const handleMapMove = (newCenter) => {
    setCenter([newCenter.lat, newCenter.lng]);
  };

  const handleSelectOnMap = (lat, lng) => {
    setSelectedPosition([lat, lng]);
    updateLocation(lat, lng);
  };

  // update selected position address when prevSelectedLocation changes
  useEffect(() => {
    handleAddLocation({
      lat: selectedPosition?.[0],
      long: selectedPosition?.[1],
      address: address,
    });
  }, [selectedPosition, address]);

  return (
    <div>
      <div className="relative" ref={suggestionBoxRef}>
        <div className="flex gap-2">
          <TextInput
            value={query}
            setValue={handleSearch}
            placeholder="Search Location"
            className={"grow"}
          />
          <button
            onClick={setCurrentLocation}
            className="flex items-center gap-2 w-fit bg-black text-white py-2 rounded-lg px-4"
          >
            <BiTargetLock />
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="border shadow-2xl rounded-xl bg-white mt-1 overflow-y-auto absolute inset-0 top-[110%] h-max max-h-[200px] z-[10000]">
            {suggestions.map((place, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(place)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map */}
      <div className="mt-4 relative mb-4">
        <p className="mb-3 text-right font-semibold text-red-500 flex items-center gap-1 justify-end">
          <span className="text-2xl">{"("}</span>
          <span className="translate-y-0.5 flex items-center gap-1">
            <GiClick className="text-xl" />
            <span className="text-sm">
              {" "}
              Click on the map to select your location
            </span>
          </span>
          <span className="text-2xl">{")"}</span>
        </p>
        {loading ? (
          <div className="flex justify-center items-center aspect-square lg:aspect-[2/1] border rounded bg-gray-50 text-gray-500">
            Loading map...
          </div>
        ) : (
          <div className="aspect-square lg:aspect-[2/1] relative z-[10]">
            <LocationMap
              center={center}
              zoom={15}
              onMove={handleMapMove}
              onSelect={handleSelectOnMap}
              selectedPosition={selectedPosition}
              setSelectedPosition={setSelectedPosition}
            />
          </div>
        )}
        <TextAreaInput
          label={"Your full address"}
          value={address}
          setValue={setAddress}
          containerClassName={"mt-4"}
          placeholder={"H-56/3, North Adabar, Dhaka-1207"}
          inputClass={"h-32 resize-none"}
        />
        {/* <Button
          text={btnText}
          handleSubmit={() =>
            handleAddLocation({
              lat: selectedPosition?.[0] ?? center[0],
              long: selectedPosition?.[1] ?? center[1],
              address,
            })
          }
          containerClassName={"w-fit mt-4 px-10 mx-auto block"}
        /> */}
      </div>
    </div>
  );
}
