export default function EmptyNotification({ children }) {
  return (
    <div className="grid w-full empty bg-tailwindColorGray col-span-full place-content-center h-[400px]">
      <p className="text-2xl">{children}</p>
    </div>
  );
}
