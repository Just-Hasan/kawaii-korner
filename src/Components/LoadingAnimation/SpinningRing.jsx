import "../../Styles/SpinningRing.css";

export default function SpinningRing({ children }) {
  return (
    <div
      className={`w-full h-[300px] bg-tailwindColorGray rounded-xl spinning-ring grid place-content-center`}
    >
      <div className="lds-ring mx-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="mt-4 w-full">
        <p className="text-center text-2xl">{children}</p>
      </div>
    </div>
  );
}
