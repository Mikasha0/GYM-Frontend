export const addOnsPrice: { [key: string]: number } = {
    "Shower":500,
    "Sauna":500,
    "Locker":200,
    "Personal Training":2000
}
export default function AddOns({ addOns }: { addOns: string }) {
  return (
    <div className="w-full flex justify-between">
      <p className="text-xs font-semibold mt-2">{addOns}</p>
      <p className="text-xs  mt-2">Rs {addOnsPrice[addOns]}</p>
    </div>
  );
}
