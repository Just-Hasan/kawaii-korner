export default function GoUp({ AppHeader, passThirtyPercent }) {
  return (
    <button
      onClick={() => AppHeader.current.scrollIntoView({ behavior: "smooth" })}
      className={`fixed go-up ${
        passThirtyPercent ? "active" : "not-active"
      } bottom-[10%] bg-accent text-slate-900 font-black rounded-xl p-4 z-50 text-xl right-[2.5%]`}
    >
      Go up!
    </button>
  );
}
