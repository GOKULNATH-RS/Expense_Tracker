import AddExpense from "./components/AddExpense";
import ExpensePanel from "./components/ExpensePanel";
import ExpenseCard from "./components/ExpenseCard";
import logo from "./assets/ExpenseTracker-Logo.svg";
import { useEffect, useState } from "react";

function App() {
  const [transaction, setTransaction] = useState([]);
  const [update, setUpdate] = useState(false);
  const [editItem, setEditItem] = useState();

  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/get-expenses`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);
        setIncome(0);
        setExpense(0);
        data.forEach((element) => {
          if (element.Amount > 0) {
            let prev = income;
            setIncome(prev + element.Amount);
          } else {
            let prev = expense;
            setExpense(prev + element.Amount);
          }
        });
      });
  }, [update, income, expense]);

  return (
    <div className="flex flex-col gap-10 items-center ">
      <p className="flex text-center m-4 p-2 font-bold text-3xl">
        <img src={logo} className="h-8 w-8" alt="logo" />
        <span className="text-yellow-400 mr-2">Expense</span> Tracker
      </p>
      <ExpensePanel Income={income} Expense={expense} />
      <AddExpense updateCards={setUpdate} ItemToEdit={editItem} />
      <div className="flex flex-col mb-6">
        <p className="font-semibold text-xl mb-2">Transaction History</p>
        {transaction.map((item) => {
          return (
            <ExpenseCard
              key={item._id}
              id={item._id}
              Title={item.Title}
              Amount={item.Amount}
              updateCards={setUpdate}
              setEditItem={setEditItem}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
