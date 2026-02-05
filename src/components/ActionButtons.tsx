import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Archive, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  actionsNeeded?: number;
  onMenuClick?: () => void;
  onActionClick?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actionsNeeded = 4,
  onMenuClick,
  onActionClick,
  onEdit,
  onArchive,
  onDelete
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuClick?.();
  };

  const handleActionClick = () => {
    onActionClick?.();
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleArchive = () => {
    setIsMenuOpen(false);
    onArchive?.();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

 
   return (
     <div className="flex items-center gap-2">
       <div className="flex items-center border border-[#EEEDEC] rounded-lg overflow-hidden">
         <div className="relative" ref={menuRef}>
           <button
             onClick={handleMenuClick}
             className="bg-[#FBFAF9] hover:bg-accent flex items-center justify-center w-10 h-10 transition-colors text-lg font-bold text-muted-foreground border-r border-[#EEEDEC]"
             aria-label="Open menu"
           >
             ...
           </button>
           
           {isMenuOpen && (
             <div className="absolute bottom-full left-0 mb-2 w-40 bg-white border border-[#EEEDEC] rounded-lg shadow-lg z-50 overflow-hidden">
               <button
                 onClick={handleArchive}
                 className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#292524] hover:bg-gray-50 transition-colors"
               >
                 <Archive className="w-4 h-4" />
                 Archive
               </button>
               <button
                 onClick={handleDelete}
                 className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-[#EEEDEC]"
               >
                 <Trash2 className="w-4 h-4" />
                 Delete
               </button>
             </div>
           )}
         </div>
         <button
           onClick={handleActionClick}
           className="bg-[#FBFAF9] hover:bg-accent flex items-center justify-center h-10 px-4 transition-colors text-xs font-medium text-[#111111]"
         >
           {actionsNeeded} actions needed
         </button>
       </div>
     </div>
   );
};
