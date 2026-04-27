import React, { useEffect, useMemo, useState } from "react";

function Booking({ bookings = [] }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // prefer localStorage cart, otherwise use bookings prop
    try {
      const raw = localStorage.getItem("bookings");
      if (raw) {
        setCartItems(JSON.parse(raw));
        return;
      }
    } catch (e) {
      // ignore
    }

    setCartItems(bookings);
  }, [bookings]);

  // group items by name
  const grouped = useMemo(() => {
    const map = new Map();
    cartItems.forEach((it) => {
      const key = it.name;
      const existing = map.get(key) || { ...it, qty: 0 };
      existing.qty += 1;
      map.set(key, existing);
    });
    return Array.from(map.values());
  }, [cartItems]);

  const total = grouped.reduce((s, it) => s + (it.price || 0) * it.qty, 0);

  const removeOne = (name) => {
    const idx = cartItems.findIndex((c) => c.name === name);
    if (idx === -1) return;
    const copy = [...cartItems];
    copy.splice(idx, 1);
    setCartItems(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const checkout = () => {
    // placeholder: show a success and then clear
    alert(`Proceeding to checkout — total ₹${total}`);
    clearCart();
    window.location.href = "/";
  };

  const imageFor = (title, w = 160, h = 96) => {
    const svg = encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
        <rect width='100%' height='100%' fill='#f3f4f6' rx='8'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Segoe UI, Roboto, Arial' font-size='12' fill='#374151'>${title}</text>
      </svg>
    `);
    return `data:image/svg+xml;utf8,${svg}`;
  };

  const listStyle = { display: "grid", gap: 12, maxWidth: 900, marginTop: 18 };
  const itemStyle = { display: "flex", gap: 12, alignItems: "center", background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.04)" };
  const imgStyle = { width: 160, height: 96, objectFit: "cover", borderRadius: 8, flexShrink: 0 };
  const metaStyle = { flex: 1 };
  const nameStyle = { margin: 0, fontSize: 16 };
  const priceStyle = { fontWeight: 700 };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      <div style={{ color: "#374151", marginTop: 6 }}>Review selected events before checkout.</div>

      {grouped.length === 0 ? (
        <div style={{ marginTop: 18, color: "#6b7280" }}>No bookings yet — add events from the Event List.</div>
      ) : (
        <>
          <div style={listStyle}>
            {grouped.map((it) => (
              <div key={it.name} style={itemStyle}>
                <img src={imageFor(it.name)} alt={it.name} style={imgStyle} />
                <div style={metaStyle}>
                  <h3 style={nameStyle}>{it.name}</h3>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>
                  {it.description || "Event"}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 14 }}>
                  📅 {it.date || "No date"}
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={priceStyle}>₹{it.price} × {it.qty} = <span style={{ fontWeight: 900 }}>₹{it.price * it.qty}</span></div>
                    <button onClick={() => removeOne(it.name)} style={{ background: "transparent", border: "1px solid rgba(15,23,42,0.06)", padding: "6px 8px", borderRadius: 8, cursor: "pointer" }}>
                      Remove one
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, maxWidth: 900, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Subtotal: ₹{total}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={clearCart} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)", background: "transparent", cursor: "pointer" }}>Clear</button>
              <button onClick={checkout} style={{ padding: "10px 12px", borderRadius: 8, border: "none", background: "#4f46e5", color: "#fff", cursor: "pointer" }}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Booking;