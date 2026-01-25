import React, { useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = "For example: find a user experience designer in Warsaw",
  onSearch 
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[602px] max-w-full">
      <div className="text-[rgba(21,52,61,1)] text-[42px] tracking-[-1.7px] max-md:max-w-full">
        Describe who you want to hire
      </div>
      <div className="bg-white shadow-[4px_4px_20px_rgba(0,0,0,0.25)] flex flex-col text-lg text-[rgba(156,157,161,1)] leading-none mt-[22px] pt-4 pb-[101px] px-5 rounded-2xl max-md:max-w-full max-md:pb-[100px]">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none placeholder-[rgba(156,157,161,1)] text-[rgba(21,52,61,1)] -mb-5 max-md:max-w-full max-md:mb-2.5"
        />
      </div>
    </form>
  );
};
