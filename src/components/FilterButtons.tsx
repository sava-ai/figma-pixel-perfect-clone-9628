import React, { useState } from 'react';

interface FilterButtonsProps {
  onSearch?: (query: string) => void;
  onToggleMyPositions?: (enabled: boolean) => void;
  onShowArchived?: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  onSearch,
  onToggleMyPositions,
  onShowArchived
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPositions, setShowMyPositions] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleToggleMyPositions = () => {
    const newValue = !showMyPositions;
    setShowMyPositions(newValue);
    onToggleMyPositions?.(newValue);
  };

  return (
    <div className="flex w-[774px] max-w-full items-stretch gap-5 flex-wrap justify-between">
      <form onSubmit={handleSearchSubmit} className="bg-white border flex items-stretch gap-[13px] text-[15px] text-[rgba(156,157,161,1)] font-medium leading-[1.3] px-3 py-2.5 rounded-lg border-[rgba(224,225,229,1)] border-solid">
        <img
          src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/82e214688ae103c0d6a651a9a6ccb9aa0b69cd1d?placeholderIfAbsent=true"
          alt="Search icon"
          className="aspect-[1.07] object-contain w-4 shrink-0"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs..."
          className="basis-auto grow shrink bg-transparent outline-none placeholder-[rgba(156,157,161,1)] text-[rgba(21,52,61,1)]"
        />
      </form>

      <button
        onClick={handleToggleMyPositions}
        className="bg-white border flex gap-[9px] px-[13px] py-2.5 rounded-lg border-[rgba(224,225,229,1)] border-solid hover:bg-gray-50 transition-colors"
      >
        <div className="rounded bg-[rgba(21,52,61,1)] self-stretch flex flex-col items-center text-[8px] text-white font-normal whitespace-nowrap w-4 justify-center h-4 px-0.5">
          <div>TW</div>
        </div>
        <div className="text-[rgba(21,52,61,1)] text-[15px] font-medium leading-[1.3] basis-auto">
          Show only my positions
        </div>
        <div className="flex flex-col gap-0.5">
          <img
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/2b2dcea882c45e68d95b36dfcd2f3682d17bde5c?placeholderIfAbsent=true"
            alt="Toggle up"
            className="aspect-[1.67] object-contain w-2.5"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/051ced7cfe4490b702ed54321965a6511ff202b6?placeholderIfAbsent=true"
            alt="Toggle down"
            className="aspect-[1.67] object-contain w-2.5"
          />
        </div>
      </button>

      <button
        onClick={onShowArchived}
        className="bg-white border flex flex-col text-[15px] text-[rgba(21,52,61,1)] font-medium leading-[1.3] justify-center px-[45px] py-3 rounded-lg border-[rgba(224,225,229,1)] border-solid hover:bg-gray-50 transition-colors max-md:px-5"
      >
        <div>Show archived</div>
      </button>
    </div>
  );
};
