interface buttonProps {
  text: string;
  onClick: () => void;
}
const Button = ({ text, onClick }: buttonProps) => {
  return (
    <div
      onClick={onClick}
      className="mb-8 cursor-pointer rounded-lg flex justify-center items-center bg-black w-456 h-56 py-18"
    >
      <span className="uppercase text-white text-sm font-medium">{text}</span>
    </div>
  );
};
export default Button;
