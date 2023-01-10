export const IconButton = ({ svgIcon, content, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex px-4 py-1 my-auto border-2 rounded"
    >
      {svgIcon}
      {content}
    </button>
  );
};
