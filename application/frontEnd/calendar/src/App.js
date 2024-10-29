import logo from './logo.svg';
import './App.css';
import Calendar from "./calendar/Calendar";

function App() {

  const availableDates = [
    " 7:00 AM",
    " 7:15 AM",
    "7:30 AM",
    "7:40 AM",
  ];
  return (
    <div>
      <Calendar availableDates={availableDates} />
    </div>
  );
}

export default App;
