import MaterialIcon from "material-icons-react";

// eslint-disable-next-line react/prop-types
const ExpenseCard = ({ Title, Amount, id, updateCards, setEditItem }) => {
  const deleteItem = () => {
    fetch(`${import.meta.env.VITE_API_URL}/delete-expense/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateCards((prev) => !prev);
      });
  };

  const EditItem = () => {
    setEditItem({ id, Title, Amount });
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
      <button onClick={EditItem} className="">
        <MaterialIcon icon="edit" />
      </button>
      <button onClick={deleteItem} className="">
        <MaterialIcon icon="delete" />
      </button>
    </div>
  );
};

export default ExpenseCard;
