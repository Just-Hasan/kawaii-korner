import "../../Styles/ThreeDotPop.css";

export default function ThreeDotPop({ children }) {
  return (
    <div className="loading-message">
      {children}
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
