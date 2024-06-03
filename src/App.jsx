import { useState } from "react";
import "./Css/App.css";

const objectArray = [
  {
    produsent: "Hewlett Packard",
    beskrivelse: "HP Envy Desktop TE01-4254",
    spesifikasjoner:
      "Intel Core i7-13700, 16GB RAM, 1TB SSD, Intel UHD Graphics 770, Windows 11 Home",
    innkjøpsdato: "15.08.2023",
    innkjøpspris: 999.99,
    "forventet levetid (i år)": 5,
    kategori: "Datamaskiner",
  },
  {
    produsent: "Dell",
    beskrivelse: "Dell XPS 15",
    spesifikasjoner:
      "Intel Core i7-12700H, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX 3050 Ti, Windows 11 Pro",
    innkjøpsdato: "12.06.2023",
    innkjøpspris: 1500.0,
    "forventet levetid (i år)": 4,
    kategori: "Bærbare Datamaskiner",
  },
];

function Items({ setSelectedItem }) {
  return (
    <div>
      {objectArray.map((item, i) => (
        <div key={i}>
          <button onClick={() => setSelectedItem(item)}>
            <p>{item.beskrivelse}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

function Display({ selectedItem, setMyLoans, myLoans }) {
  function leggTil() {
    if (selectedItem) {
      setMyLoans((prevMyLoans) => [...prevMyLoans, selectedItem]);
      console.log({myLoans})
    }
  }

  return (
    <>
      <p>Produsent: {selectedItem?.produsent}</p>
      <p>Beskrivelse: {selectedItem?.beskrivelse}</p>
      <p>Spesifikasjoner: {selectedItem?.spesifikasjoner}</p>
      <p>Innkjøpsdato: {selectedItem?.innkjøpsdato}</p>
      <p>Innkjøpspris: {selectedItem?.innkjøpspris}</p>
      <p>
        Forventet levetid: (i år):{" "}
        {selectedItem?.["forventet levetid (i år)"]}
      </p>
      <p>Kategori:{selectedItem?.kategori}</p>

      <button onClick={leggTil}>Lån</button>
    </>
  );
}

function MyLoans(){
  <>

  </>
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState({});
  const [myLoans, setMyLoans] = useState([]);

  return (
    <>
      <h1>Vite + React</h1>
      <Items setSelectedItem={setSelectedItem} />
      <Display selectedItem={selectedItem} setMyLoans={setMyLoans} myLoans={myLoans} />
      <MyLoans/>
    </>
  );
}