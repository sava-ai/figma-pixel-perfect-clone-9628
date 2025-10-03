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
    <div className="flex items-center gap-2">
      <button
        onClick={handleMenuClick}
        className="bg-muted hover:bg-accent flex items-center justify-center w-12 h-12 rounded-lg transition-colors text-xl font-bold text-muted-foreground"
        aria-label="Open menu"
      >
        ...
      </button>
      <button
        onClick={handleActionClick}
        className="bg-muted hover:bg-accent flex-1 flex items-center justify-center h-12 px-6 rounded-lg transition-colors text-xs font-medium text-muted-foreground"
      >
        {actionsNeeded} actions needed
      </button>
    </div>
  );
};
