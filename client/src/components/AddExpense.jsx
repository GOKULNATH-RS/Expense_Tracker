/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const AddExpense = ({ updateCards, ItemToEdit }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const date = new Date();

  useEffect(() => {
    setTitle(ItemToEdit?.Title || "");
    setAmount(ItemToEdit?.Amount || 0);
  }, [ItemToEdit]);

  const formItems = [
    {
      field: "Title",
      type: "text",
      placeholder: "Enter Title",
      setFunction: setTitle,
      value: title,
    },
    {
      field: "Amount",
      type: "number",
      placeholder: "Enter Amount",
      setFunction: setAmount,
      value: amount,
    },
  ];

  const handleAddExpense = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/add-expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: title,
        Amount: amount,
        Date: date.toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAmount(0);
        setTitle("");
        updateCards((prev) => !prev);
      });
  };

  const handleEditExpense = () => {
    fetch(`${import.meta.env.VITE_API_URL}/update-expense/${ItemToEdit?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: title,
        Amount: amount,
        Date: date.toISOString(),
      }),
    }).then((res) => {
      setAmount(0);
      setTitle("");
      updateCards((prev) => !prev);
    });
  };

  return (
    <div className="m-3 px-8 shadow-xl pt-8 p-4 border-[1px] rounded-xl">
      <p className="font-semibold text-2xl">
        {ItemToEdit === undefined ? "Add New" : "Edit"} Transaction
      </p>
      <form className="flex flex-col gap-8 justify-center p-4">
        {formItems.map((item, i) => {
          return (
            <div key={i} className="flex flex-col gap-2">
              <label className="text-lg">{item.field}</label>
              <input
                className="p-2 pl-4 border-[2px] rounded-xl"
                type={item.type}
                value={item.value}
                placeholder={item.placeholder}
                onChange={(e) => {
                  item.setFunction(e.target.value);
                }}
              />
            </div>
          );
        })}

        <button
          onClick={ItemToEdit ? handleEditExpense : handleAddExpense}
          className="p-2 bg-yellow-400 rounded-xl text-white"
        >
          {ItemToEdit ? "Edit Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
