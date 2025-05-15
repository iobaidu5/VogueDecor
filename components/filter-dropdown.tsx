"use client";

type FilterDropdownProps = {
  selected: string;
  onFilter: (value: string) => void;
};

export default function FilterDropdown({ selected, onFilter }: FilterDropdownProps) {

  return (
    <div className="relative inline-block">
      <select
        value={selected}
        onChange={(e) => onFilter(e.target.value)}
        className="block text-black appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled>Sort by</option>
        <option value="az">A - Z</option>
        <option value="za">Z - A</option>
        <option value="availability">Availability</option>
        <option value="price-asc">Low to High</option>
        <option value="price-desc">High to Low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548l4.484 4.481 4.484-4.481L16 9l-6 6-6-6z" />
        </svg>
      </div>
    </div>
  );
}