import { useAnimeData } from "../../App";
import { useEffect, useRef } from "react";
export default function DeleteAllPopup({ ButtonYes }) {
  const { onToggleDeleteAll, toggleDeleteAll } = useAnimeData();
  const popupModal = useRef(null);
  useEffect(() => {
    function escape(e) {
      if (popupModal?.current?.contains(e.target)) {
        onToggleDeleteAll();
      }
    }

    document.addEventListener("click", escape);
    return () => document.removeEventListener("click", escape);
  }, [onToggleDeleteAll]);
  return (
    <div
      onClick={() => onToggleDeleteAll()}
      className={`fixed top-0 z-50 flex left-0  justify-center w-full h-full p-8  ${
        toggleDeleteAll ? `scale-100` : "scale-0"
      } mobile_s:items-center transition-all duration-300 ease-in-out rounded-xl`}
    >
      <div
        ref={popupModal}
        className="grid rounded-xl grid-cols-2 shadow-[0px_0px_20px_0.2px_rgba(0,0,0,0.5)] bg-[#f4f4f4] overflow-hidden h-max tablet_778:w-1/4 mobile_s:w-1/2 tablet_692:place-items-center tablet_500:mt-0 button-confirmation outline outline-1 outline-black"
      >
        <h1 className="p-4 text-center col-span-full leading-[1.5] font-black mobile_s:text-[18px] text-[#101820]">
          Delete All List?
        </h1>
        <button
          onClick={() => {
            ButtonYes();
            onToggleDeleteAll();
          }}
          className="p-4 bg-white text-[#101820] mobile_s:text-[14px] hover:font-black hover:text-[#f4f4f4] hover:bg-[#101820] transition-all duration-200 ease-in-out w-full outline outline-1 outline-black"
        >
          Yes
        </button>
        <button
          onClick={() => onToggleDeleteAll()}
          className="p-4 bg-white text-[#101820] mobile_s:text-[14px] hover:font-black hover:text-[#f4f4f4] hover:bg-[#101820] transition-all duration-200 ease-in-out w-full outline outline-1 outline-black"
        >
          No
        </button>
      </div>
    </div>
  );
}
