export const Label = ({
  htmlFor,
  label,
  svgIcon,
  inputId,
  inputType,
  inputName,
  inputPlaceholder,
  value,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300`}
      >
        {label}
      </label>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {svgIcon && svgIcon}
        </div>
      </div>
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder || ""}
        value={value}
        onchange={onChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      ></input>
    </>
  );
};
