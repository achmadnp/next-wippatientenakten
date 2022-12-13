export const ElevatedButton = (props) => {};

export const FlatButton = (props) => {};

export const ButtonLink = (props) => {};

export const IconButton = ({ svgIcon, content }) => {
  return (
    <button type="button" className="flex px-4 py-1 my-auto border-2 rounded">
      {svgIcon}
      {content}
    </button>
  );
};
