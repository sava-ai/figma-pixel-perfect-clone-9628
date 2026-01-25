import React, { useState } from 'react';
import { Upload, ArrowRight } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onUpload?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = "For example: find a user experience designer in Warsaw",
  onSearch,
  onUpload
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
      <div className="bg-white border border-[#EEEDEC] flex flex-col text-lg text-[rgba(156,157,161,1)] leading-none mt-[22px] pt-4 pb-4 px-5 rounded-2xl max-md:max-w-full">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none placeholder-[rgba(156,157,161,1)] text-[rgba(21,52,61,1)] resize-none min-h-[80px] max-md:max-w-full"
        />
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#EEEDEC] bg-[#FBFAF9] text-[#292524] text-sm font-medium hover:bg-[#F6F5F3] transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button
            type="submit"
            className="w-[34px] h-[34px] rounded-lg bg-[#292524] text-white flex items-center justify-center hover:bg-[#1a1918] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
};
