// eslint-disable-next-line react/prop-types
const ExpensePanel = ({ Income, Expense }) => {
  return (
    <div className="flex justify-around items-center h-32 w-72 rounded-xl shadow-xl border-[1px] p-4">
      <div className="flex flex-col gap-4">
        <p className="font-semibold ">Income</p>
        <p className={`text-green-400  font-medium`}>{Income}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-semibold ">Expense</p>
        <p className={`text-red-400  font-medium`}>{Expense}</p>
      </div>
    </div>
  );
};

export default ExpensePanel;
