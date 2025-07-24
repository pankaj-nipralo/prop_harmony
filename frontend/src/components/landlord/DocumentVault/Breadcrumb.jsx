import { ChevronRight } from "lucide-react";

export const Breadcrumb = ({ currentPath, navigateToPath, getFolderAtPath }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => navigateToPath([])}
        className="font-medium text-blue-600 hover:text-blue-800"
      >
        Root
      </button>
      {currentPath.map((pathItem, index) => {
        const pathToFolder = currentPath.slice(0, index + 1);
        const pathFolder = getFolderAtPath(pathToFolder);
        return (
          <div key={pathItem} className="flex items-center gap-1">
            <ChevronRight size={14} className="text-gray-400" />
            <button
              onClick={() => navigateToPath(index)}
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              {pathFolder.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};