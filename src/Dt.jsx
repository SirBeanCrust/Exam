import { useState, useEffect } from "react";
import data from "../inventory_data_with_categories.json";

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);
}