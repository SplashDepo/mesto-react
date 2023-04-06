import React, { useState } from "react";

export default function Footer() {

  const [date, setDate] = useState(new Date().getFullYear())

  setInterval(() => {
    setDate(new Date().getFullYear())
  }, 10000)


  return (
    <footer className="footer">
      <p className="footer__project-name">&#169; {date} Mesto Russia</p>
    </footer>
  )
}