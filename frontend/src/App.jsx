import "./App.css";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function MapEvents({ onBoundsChange }) {
  const map = useMapEvents({
    moveend: (e) => {
      const bounds = e.target.getBounds();
      onBoundsChange(bounds);
    },
  });

  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, []);

  return null;
}

function FlyToReef({ reef }) {
  const map = useMap();

  useEffect(() => {
    if (!reef) return;

    map.flyTo([reef.Latitude, reef.Longitude], 6, {
      duration: 2,
    });
  }, [reef, map]);

  return null;
}

function App() {
  const [reefs, setReefs] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusedReef, setFocusedReef] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loadingMap, setLoadingMap] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [hoveredReef, setHoveredReef] = useState(null);
  const totalVisible = reefs.length;

  const regionStats = totalVisible > 0 ? {
    total: totalVisible,
    avgArea: reefs.reduce((sum, r) => sum + (r.AreaSqKm || 0), 0) / totalVisible,
    avgHealth: reefs.reduce((sum, r) => sum + (r.HealthScore || 0), 0) / totalVisible,
    largest: reefs.reduce(
      (max, r) => ((r.AreaSqKm || 0) > (max.AreaSqKm || 0) ? r : max),
      reefs[0]
    )
  } : null;

  const handleBoundsChange = (bounds) => {
    if (isSearching) return;

    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();
    setLoadingMap(true);

    fetch(
  `${import.meta.env.VITE_API_URL}/reefs_in_view?north=${north}&south=${south}&east=${east}&west=${west}`
)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoadingMap(false);
          setReefs(data);
        }, 1000);
      });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "20px",
          zIndex: 1000,
          width: "300px",
          background: "rgba(15,23,42,0.92)",
          backdropFilter: "blur(12px)",
          padding: "24px",
          borderRadius: "24px",
          color: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "2rem", color: "#ffa2da", fontWeight: "700" }}>
          Reef Atlas
        </h1>

        <p style={{ marginTop: "8px", color: "#61b5ff" }}>
          Mapping the world's coral reefs
        </p>

        <input
          type="text"
          placeholder="Search reefs..."
          value={search}
          onChange={(e) => {
            const query = e.target.value;
            setSearch(query);
            setIsSearching(true);
            if (query.trim() === "") {
              setIsSearching(false);
              setLoadingSearch(false);
              setSuggestions([]);

              fetch(`${import.meta.env.VITE_API_URL}/reefs?NUMBER_OF_RESULTS=1000"`)
                .then((res) => res.json())
                .then((data) => setReefs(data));

              return;
            }

            setLoadingSearch(true);
            fetch(`${import.meta.env.VITE_API_URL}/search?q=${query}`)
              .then((res) => res.json())
              .then((data) => {
                setTimeout(() => {
                  setLoadingSearch(false);
                  setReefs(data);
                }, 1000);
                setSuggestions(data);
              });
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "16px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            boxSizing: "border-box",
          }}
        />
<button
          onClick={() => {
            setSearch("");
            setSuggestions([]);
            setFocusedReef(null);
            setIsSearching(false);
          }}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            borderRadius: "12px",
            border: "none",
            background: "#334155",
            color: "white",
            cursor: "pointer",
          }}
        >
          Clear Search
        </button>

        {loadingSearch && (
          <div style={{ marginTop: "10px", color: "#67e8f9", fontSize: "0.9rem" }}>
            🔍 Searching reefs...
          </div>
        )}

        {loadingMap && (
          <div style={{ marginTop: "10px", color: "#67e8f9", fontSize: "0.9rem" }}>
            🌊 Loading visible reefs...
          </div>
        )}

        {suggestions.length > 0 && (
          <div
            style={{
              marginTop: "8px",
              background: "#1e293b",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #334155",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((reef) => (
              <div
                key={reef.ReefID}
                onClick={() => {
                  setIsSearching(true);
                  setSearch(reef.ReefName);
                  setSuggestions([]);
                  setFocusedReef(reef);
                  setReefs([reef]);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #334155",
                }}
              >
                {reef.ReefName}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#67e8f9" }}>
            {totalVisible}
          </div>

          <div style={{ color: "#cbd5e1" }}>Coral reefs visible</div>

          {regionStats && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                borderRadius: "12px",
                background: "#0f172a",
                border: "1px solid #334155",
              }}
            >
              <div style={{ color: "#67e8f9", fontWeight: "bold" }}>Currently Viewing</div>
              <p>Reefs: {regionStats.total}</p>
              <p>Avg Area: {regionStats.avgArea.toFixed(2)} km²</p>
              <p>Largest: {regionStats.largest?.ReefName || "Unknown Reef"}</p>
              <p>Avg Health: {regionStats.avgHealth.toFixed(1)}</p>
            </div>
          )}
        </div>
      </div>

      <MapContainer
        center={[-15, 145]}
        zoom={2}
        minZoom={2}
        maxZoom={7}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
        style={{ height: "100vh", width: "100%" }}
      >
        <MapEvents onBoundsChange={handleBoundsChange} />
        <FlyToReef reef={focusedReef} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          //url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          //url='https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg'
          //url='https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {reefs.map((reef) => {
          const isHovered = hoveredReef === reef.ReefID;
          const baseRadius = Math.max(4, Math.min(12, Math.sqrt(reef.AreaSqKm || 1)));
          const finalRadius = isHovered ? baseRadius + 2 : baseRadius;
          return (
          <div key={reef.ReefID}>
          <CircleMarker
            eventHandlers={{
              mouseover: () => setHoveredReef(reef.ReefID),
              mouseout: () => setHoveredReef(null),
            }}
            key={reef.ReefID}
            center={[reef.Latitude, reef.Longitude]}
            radius={finalRadius * 2.5}
            pathOptions={{
              color: "transparent",
              fillColor: "#ffa2e8",
              fillOpacity: isHovered ? 0.45 : 0.25,
              interactive: false,
            }}
         />
         <CircleMarker
        center={[reef.Latitude, reef.Longitude]}
        radius={finalRadius}
        eventHandlers={{
          mouseover: () => setHoveredReef(reef.ReefID),
          mouseout: () => setHoveredReef(null),
        }}
        pathOptions={{
          color: "#fa8fd2",
          fillColor: "#ffffff", 
          fillOpacity: 1,
          weight: isHovered ? 3 : 1.5,
        }}
      >
            {(() => {
              let grade = "Critical";
              let gradeColor = "#a40300";
              if (reef.HealthScore >= 80) {
                grade = "Very Good";
                gradeColor = "#0630a3";
              } else if (reef.HealthScore >= 60) {
                grade = "Good";
                gradeColor = "#177331";
              } else if (reef.HealthScore >= 40) {
                grade = "Fair";
                gradeColor = "#f3c705";
              } else if (reef.HealthScore >= 20) {
                grade = "Poor";
                gradeColor = "#df7b00";
              }

              return (
                <Popup>
                  <div style={{ minWidth: "220px", color: "#1e293b" }}>
                    <div
                      style={{
                        background: gradeColor, 
                        color: "#ffffff",                  
                        padding: "8px",
                        borderRadius: "8px",
                        fontWeight: "900",
                        textAlign: "center",
                        marginBottom: "12px",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {grade.toUpperCase()}
                    </div>
                    <h3 style={{ margin: "0 0 8px 0", color: "#0f172a", fontWeight: "700" }}>
                    {reef.ReefName}</h3>
                    <p>Area: {(reef.AreaSqKm ?? 0).toFixed(2)} km²</p>
                    <p>📍 {reef.Latitude.toFixed(4)}, {reef.Longitude.toFixed(4)}</p>
                    <p>Reef ID: {reef.ReefID}</p>
                    <p>Verification: {reef.VerificationStatus || "Unknown"}</p>
                    <p>Survey Method: {reef.SurveyMethod || "Unknown"}</p>
                    <p>Health Score: {reef.HealthScore}</p>
                    <p>Bleaching Risk: {reef.BleachingRisk}</p>
                  </div>
                </Popup>
              );
            })()}
          </CircleMarker>
          </div>
          );
        })}
      </MapContainer>
    </>
  );
}

export default App;
