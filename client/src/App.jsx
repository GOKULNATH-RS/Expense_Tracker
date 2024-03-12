import AddExpense from "./components/AddExpense";
import ExpensePanel from "./components/ExpensePanel";
import ExpenseCard from "./components/ExpenseCard";
import logo from "./assets/ExpenseTracker-Logo.svg";
import { useEffect, useState } from "react";

function App() {
  const [Transaction, setTransaction] = useState([]);
  const [update, setUpdate] = useState(false);

  const [Expense, setExpense] = useState(0);
  const [Income, setIncome] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/get-expenses")
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);
        setIncome(0);
        setExpense(0);
        data.forEach((element) => {
          if (element.Amount > 0) setIncome((prev) => prev + element.Amount);
          else setExpense((prev) => prev + element.Amount);
        });
      });
  }, [update]);

  return (
    <div className="flex flex-col gap-10 items-center ">
      <p className="flex text-center m-4 p-2 font-bold text-3xl">
        <img src={logo} className="h-8 w-8" />
        <span className="text-yellow-400 mr-2">Expense</span> Tracker
      </p>
      <ExpensePanel Income={Income} Expense={Expense} />
      <AddExpense updateCards={setUpdate} />
      <div className="flex flex-col mb-6">
        <p className="font-semibold text-xl mb-2">Transaction History</p>
        {Transaction.map((item, i) => {
          return (
            <ExpenseCard
              key={i}
              id={item._id}
              Title={item.Title}
              Amount={item.Amount}
              updateCards={setUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
