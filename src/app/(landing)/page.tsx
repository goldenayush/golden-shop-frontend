"use client";
import { useState } from "react";

export default function Home() {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return <div>home</div>;
}
