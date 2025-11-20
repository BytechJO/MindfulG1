import React from "react";
import { Link } from "react-router-dom";
import U1 from "../assets/U1-Btn.svg";
import U2 from "../assets/U2-Btn.svg";
import U3 from "../assets/U3-Btn.svg";
import U4 from "../assets/U4-Btn.svg";
import "./pagetow.css"; 

export default function Home() {
  const units = [
    { id: "One", img: U1, path: "/unit/One/lesson/1" },
    { id: "Two", img: U2, path: "/unit/Two/lesson/1" },
    { id: "Three", img: U3, path: "/unit/Three/lesson/1" },
    { id: "Four", img: U4, path: "/unit/Four/lesson/1" }
  ];

  return (
    <div className="allpa" style={{ padding: 30 }}>
      
      <div className="units-container">
        {units.map((u) => (
          <div className="unit" key={u.id} style={{ marginTop: 20 }}>
            <Link to={u.path}>
              <img src={u.img} alt={`Unit ${u.id}`} className="unite-icon" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}