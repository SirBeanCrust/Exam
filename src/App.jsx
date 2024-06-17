import { useState, useEffect } from "react";
import axios from "axios";
import data from "../inventory_data_with_categories.json";
import "./Css/App.css";

function Items({ setSelectedItem, items }) {
   return (
    <div className="itemlist">
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={() => setSelectedItem(item, index)}>
            <p>{item.Beskrivelse}</p>
          </button>
        </div>
      ))}
    </div>
  );
}


function Display({ selectedItem, setMyLoans, myLoans }) {
  function leggTil() {
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

function EditItems({items, bla, onSave, onRemove, selectedItem, setSelectedItem}){
  const [itemCopy, setItemCopy] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemCopy(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    // endre objectet til ny version
// set items[itemIndex](itemCopy)
    e.preventDefault();
    onSave(itemCopy, itemIndex)
    setItemCopy(null)
  };

  function Remove(){
    e.preventDefault();
    setItemCopy(null)
    onRemove(itemIndex)

  }

  function setSelectedItem(item, index){
    bla(item)
    setItemCopy({...selectedItem})
    console.log({itemCopy})
    console.log({selectedItem})
    setItemIndex(index)
  }

  return(
    <>
    <div>
      <h2>
        Edit
      </h2>
    <Items items={items} setSelectedItem={setSelectedItem} />
       <div>
        <h2>Selected Product</h2>
        {itemCopy ? (
             <form onSubmit={handleSubmit}>
               <label>
                Produsent:
                <input
                  type="text"
                  name="Produsent"
                  value={itemCopy.Produsent}
                  onChange={handleChange}
                />
              </label>
              <label>
                Beskrivelse:
                <input
                  type="text"
                  name="Beskrivelse"
                  value={itemCopy.Beskrivelse}
                  onChange={handleChange}
                />
              </label>
              <label>
                Spesifikasjoner:
                <textarea
                  name="Spesifikasjoner"
                  value={itemCopy.Spesifikasjoner}
                  onChange={handleChange}
                />
              </label>
              <label>
                Innkjøpsdato:
                <input
                  type="text"
                  name="Innkjøpsdato"
                  value={itemCopy.Innkjøpsdato}
                  onChange={handleChange}
                />
              </label>
              <label>
                Innkjøpspris:
                <input
                  type="text"
                  name="Innkjøpspris"
                  value={itemCopy.Innkjøpspris}
                  onChange={handleChange}
                />
              </label>
              <label>
                Forventet levetid (i år):
                <input
                  type="text"
                  name="ForventetLevetid"
                  value={itemCopy.ForventetLevetid}
                  onChange={handleChange}
                />
              </label>
              <label>
                Kategori:
                <input
                  type="text"
                  name="Kategori"
                  value={itemCopy.Kategori}
                  onChange={handleChange}
                />
              </label>
              <button onClick={Remove}>Fjern enhet</button>
              <button type="submit">Lagre enhet</button>
            </form>
          ) : (
          <p>Ingen produkt valgt.</p>
        )}
      </div>
      <div>

      </div>
      </div>
    </>
    )}


export default function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myLoans, setMyLoans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, []);

  function onSave(itemCopy, itemIndex){
    console.log(itemIndex)
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIndex] = itemCopy;
      return updatedItems;
    })
  }

  function onRemove(itemIndex){
    console.log(itemIndex)
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(itemIndex, 1);
      return updatedItems;
    })
  }
  
  return (
    <>
      <h1>Vite + React</h1>
      <Items items={items} setSelectedItem={setSelectedItem} />
      <Display selectedItem={selectedItem} setMyLoans={setMyLoans} myLoans={myLoans} />
      <MyLoans myLoans={myLoans}/>
      <EditItems items={items} bla={setSelectedItem} selectedItem={selectedItem} onSave={onSave} onRemove={onRemove}/>
    </>
  );
}