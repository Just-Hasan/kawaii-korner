export function ErrorMessage({ message }) {
  return (
    <div className="self-center grid mobile_s:justify-center mobile_s:items-start tablet_778:place-content-center p-8 rounded-xl mb-12 text-2xl font-black col-span-full bg-tailwindColorGray h-[400px] overflow-hidden text-accent relative">
      <p className="z-10 text-3xl animate-bounce">{message}!</p>
      <div className="absolute laptop_1024:bottom-0 laptop_1024:right-0 tablet_778:right-[50%] mobile_s:bottom-0  ">
        <img
          src="/Picture/Violet_w_bg.webp"
          className="laptop_1024:w-1/2 tablet_778:w-[100%]"
        />
      </div>
    </div>
  );
}
