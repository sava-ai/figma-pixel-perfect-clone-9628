import React, { useState } from 'react';

interface ActionButtonsProps {
  actionsNeeded?: number;
  onMenuClick?: () => void;
  onActionClick?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actionsNeeded = 4,
  onMenuClick,
  onActionClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  const handleActionClick = () => {
    onActionClick?.();
  };

  return (
    <div className="flex items-stretch gap-[9px] text-[rgba(95,95,101,1)]">
      <button
        onClick={handleMenuClick}
        className="bg-[rgba(233,233,233,1)] flex flex-col text-[31px] font-bold whitespace-nowrap tracking-[-0.85px] justify-center px-[11px] py-4 rounded-lg hover:bg-gray-300 transition-colors"
        aria-label="Open menu"
      >
        <div>...</div>
      </button>
      <button
        onClick={handleActionClick}
        className="bg-[rgba(233,233,233,1)] flex flex-col items-stretch text-xs font-medium text-center justify-center px-[67px] py-3.5 rounded-lg hover:bg-gray-300 transition-colors max-md:px-5"
      >
        <div>{actionsNeeded} actions needed</div>
      </button>
    </div>
  );
};
