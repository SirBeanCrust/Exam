import { useState, useEffect } from "react";
import data from "../inventory_data_with_categories.json";
import "./Css/App.css";

function Items({ selectedItem, setSelectedItem, items }) {
   return (
    <div className="itemlist">
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setSelectedItem(item) + console.log(selectedItem)}>
            <p>{item.Beskrivelse}</p>
          </button>
        </div>
      ))}
    </div>
  );
}


function Display({ selectedItem, setMyLoans, myLoans }) {
  function leggTil() {
    console.log({myLoans})
    if (selectedItem) {
      let clone = myLoans.slice()
      clone.push(selectedItem)
      setMyLoans(clone);
      console.log({myLoans})
    }
  }

  return (
    <>
       <div>
        <h2>Selected Product</h2>
        {selectedItem ? (
          <>
            <p>Produsent: {selectedItem.Produsent}</p>
            <p>Beskrivelse: {selectedItem.Beskrivelse}</p>
            <p>Spesifikasjoner: {selectedItem.Spesifikasjoner}</p>
            <p>Innkjøpsdato: {selectedItem.Innkjøpsdato}</p>
            <p>Innkjøpspris: {selectedItem.Innkjøpspris}</p>
            <p>
              Forventet levetid (i år): {selectedItem["forventet levetid (i år)"]}
            </p>
            <p>Kategori: {selectedItem.Kategori}</p>
            <button onClick={leggTil}>Legg til i lån</button>
          </>
        ) : (
          <p>Ingen produkt valgt.</p>
        )}
      </div>
    </>
  );
}

function MyLoans({myLoans}){
  return(
    <>
    <div>
            <h2>My Loans</h2>
            <ul>
              {myLoans.map((loan, index) => (
                <li key={index}>{loan.Beskrivelse}</li>
              ))}
            </ul>
          </div>
      </>
  )
 
}


export default function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myLoans, setMyLoans] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

  
  return (
    <>
      <h1>Vite + React</h1>
      <Items items={items} setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
      <Display selectedItem={selectedItem} setMyLoans={setMyLoans} myLoans={myLoans} />
      <MyLoans myLoans={myLoans}/>
    </>
  );
}