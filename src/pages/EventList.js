import React from "react";

function EventList({ bookEvent }) {
  const events = [
  { 
    name: "Gala Dinner", 
    price: 2000, 
    description: "Exclusive luxury dining experience",
    image: "https://i.pinimg.com/736x/6a/74/87/6a7487433d3a2675531a161b0178268b.jpg"
  },
  { 
    name: "Fashion Show", 
    price: 1500, 
    description: "Runway showcase of seasonal collections",
    image: "https://i.pinimg.com/1200x/8c/d3/5b/8cd35b919726d97e26d2fdd36caec780.jpg"
  },
  { 
    name: "Live Concert", 
    price: 1000, 
    description: "High-energy live music performance",
    image: "https://i.pinimg.com/736x/73/83/4c/73834cbf7784e5f39ff2366bce9df136.jpg"
  },
  { 
    name: "Standup Comedy Show", 
    price: 2500, 
    description: "An evening of laughs with top comedians",
    image: "https://i.pinimg.com/1200x/aa/4b/cd/aa4bcd56244410d7a5e92bf80d5d5000.jpg"
  },
  { 
    name: "Tech Conference", 
    price: 800, 
    description: "Industry talks and networking",
    image: "https://i.pinimg.com/736x/1f/03/1f/1f031f52b6fd40340eaa80d2642c05ef.jpg"
  },
  { 
    name: "Art Exhibition", 
    price: 500, 
    description: "Curated works from contemporary artists",
    image: "https://i.pinimg.com/736x/b9/72/cc/b972ccad42dbf02b0e47e7cd59e73458.jpg"
  }
];

  // create a small SVG data URL as a simple event image (avoids external dependencies)
  const imageFor = (title, w = 420, h = 240) => {
    const bg = encodeURIComponent("linear-gradient(135deg,#f97316,#7c3aed)");
    const svg = encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
        <defs>
          <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0' stop-color='#f97316'/>
            <stop offset='1' stop-color='#7c3aed'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)' rx='12'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI, Roboto, Arial' font-size='20' fill='rgba(255,255,255,0.95)'>${title}</text>
      </svg>
    `);
    return `data:image/svg+xml;utf8,${svg}`;
  };

  const handleBook = (ev) => {
  const date = prompt("Enter booking date (YYYY-MM-DD):");

  if (!date) return; // if user cancels

  const bookingWithDate = {
    ...ev,
    date: date
  };

  try {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingWithDate);
    localStorage.setItem("bookings", JSON.stringify(bookings));
  } catch (e) {
    localStorage.setItem("bookings", JSON.stringify([bookingWithDate]));
  }

  window.location.href = "/booking";
};

  const containerStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18, marginTop: 18 };
  const cardStyle = { background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 6px 18px rgba(2,6,23,0.04)", display: "flex", flexDirection: "column" };
  const imgStyle = { width: "100%", height: 160, objectFit: "cover", borderRadius: 10, marginBottom: 10 };
  const titleStyle = { margin: 0, fontSize: 18 };
  const descStyle = { margin: "6px 0 10px", color: "#6b7280" };
  const footerStyle = { marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" };

  return (
    <div className="container">
      <h1 style={{ marginBottom: 6 }}>Event List</h1>
      <div style={{ color: "#374151", marginBottom: 12 }}>Choose an experience and click Book to add it to your cart.</div>

      <div style={containerStyle}>
        {events.map((event, idx) => (
          <article key={idx} style={cardStyle} aria-labelledby={`ev-${idx}-title`}>
            <img src={event.image} alt={event.name} style={imgStyle} />
            <div>
              <h3 id={`ev-${idx}-title`} style={titleStyle}>{event.name}</h3>
              <p style={descStyle}>{event.description}</p>
            </div>

            <div style={footerStyle}>
              <div style={{ fontWeight: 700 }}>₹{event.price}</div>
              <button onClick={() => handleBook(event)} style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}>
                Book
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default EventList;