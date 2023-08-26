import CardItem from "./components/Carditem";
import items from "./data/img.json";
import './App.css';

function App() {
  return (
    <div className="container"> 
      <div className="items">
      {items.map((item) => (
        <div  key={item.id}>
          <CardItem {...item}/>
        </div>
      ))}
    </div>
    </div>
    
  );
}

export default App;
