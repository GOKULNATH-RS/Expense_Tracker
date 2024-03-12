import MaterialIcon from "material-icons-react";

// eslint-disable-next-line react/prop-types
const ExpenseCard = ({ Title, Amount, id, updateCards }) => {
  const deleteItem = () => {
    fetch(`http://localhost:4000/delete-expense/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateCards((prev) => !prev);
      });
  };

  return (
    <div className="flex gap-1 items-center">
      <div
        className={`m-2 h-18 w-96 px-6 p-4 flex justify-between items-center rounded-xl shadow-inner border-r-4 border-[2px] ${
          Amount < 0 ? "border-r-red-600" : " border-r-green-600"
        }`}
      >
        <p>{Title}</p>

        <p>{Amount}</p>
      </div>
      <button onClick={deleteItem} className="">
        <MaterialIcon icon="delete" />
      </button>
    </div>
  );
};

export default ExpenseCard;
