import { FileItem } from "./FileItem";

export const FileGrid = ({ 
  currentItems, 
  handleItemClick, 
  setPasswordSetModal, 
  handleDeleteItem 
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {currentItems.map((item) => (
        <FileItem
          key={item.id}
          item={item}
          onClick={() => handleItemClick(item)}
          onSetPassword={() => setPasswordSetModal({ open: true, item })}
          onDelete={() => handleDeleteItem(item)}
        />
      ))}
    </div>
  );
};