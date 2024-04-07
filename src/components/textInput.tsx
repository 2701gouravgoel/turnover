interface props {
  title: string;
  id: string;
  value: string;
  onChange: (e: { id: string; value: string }) => void;
}
const Input = ({ title, value, onChange, id }: props) => {
  return (
    <div className="mb-8">
      <label className="block mb-2 text-sm  text-gray-900 text-base ">
        {title}
      </label>
      <input
        type="text"
        id={id}
        onChange={(e) =>
          onChange({
            id: id,
            value: e.target.value,
          })
        }
        value={value}
        required={true}
        className="border border-solid border-gray-300 rounded-lg text-sm  block w-456"
      />
    </div>
  );
};
export default Input;
