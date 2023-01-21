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

export const Input = ({
  type = "text",
  name = "input",
  flex = false,
  disabled = false,
  label,
  value,
  placeholder = "",
  icon,
  helperText,
  handleChange,
}) => {
  return (
    <div className={`my-auto ${flex ? "flex grid-cols-2" : ""}`}>
      <label
        htmlFor={label}
        className="block mb-2 text-lg font-medium text-gray-900 "
      >
        {label}
      </label>
      {icon && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
          <input
            type={type}
            id={label}
            className="bg-gray-50 max-w-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            onChange={handleChange}
            required
          ></input>
        </div>
      )}
      {!icon && (
        <input
          type={type}
          id={label}
          name={name}
          value={value}
          className={`bg-gray-50 ${
            disabled && "cursor-not-allowed"
          } max-w-lg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder={placeholder}
          onChange={handleChange}
          required
          disabled={disabled}
        ></input>
      )}
      {helperText && <p className="mt-2 text-gray-800 text-md">{helperText}</p>}
    </div>
  );
};

export const FileInput = ({
  className,
  label,
  helperText = "",
  multiple = false,
  handleChange,
  name,
}) => {
  return (
    <div className={className}>
      <label
        className="block mb-2 text-lg font-medium text-gray-800"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="block w-full max-w-lg p-1 m-2 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
        aria-describedby={`${label}_helper`}
        id={label}
        type="file"
        name={name}
        multiple={multiple}
        onChange={(e) => handleChange(e.target.files)}
      ></input>
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id={`${label}_helper`}
      >
        {helperText}
      </div>
    </div>
  );
};

export const CheckbokInput = ({ label, name, content, handleCheck }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={label}
        name={name}
        type="checkbox"
        onChange={handleCheck}
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 "
      />
      <label
        htmlFor={label}
        className="ml-2 text-sm font-medium text-gray-900 "
      >
        {content}
      </label>
    </div>
  );
};

export const TextAreaInput = ({
  name = "textarea",
  type = "text",
  label,
  placeholder = "",
  value,
  icon,
  helperText,
  handleChange,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={label}
        className="block mb-2 text-lg font-medium text-gray-900 "
      >
        {label}
      </label>

      <textarea
        name={name}
        type={type}
        id={label}
        className="bg-gray-50 min-w-fit w-3/4 h-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
      ></textarea>

      {helperText && <p className="mt-2 text-gray-800 text-md">{helperText}</p>}
    </div>
  );
};

export const RadioInput = ({
  label,
  type = "radio",
  name = "radioInput",
  values,
  flex = true,
  checked,
  handleCheck,
  classnames = "",
}) => {
  if (!flex) {
    return (
      <div className={classnames}>
        {values.map((value) => (
          <div key={value} className="flex items-center mb-4">
            <input
              type={type}
              id={label}
              name={name}
              value={value}
              checked={checked === value}
              className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              onChange={handleCheck}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 ">
              {value}
            </label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-lg my-auto">
      <label
        htmlFor={label}
        className="block mb-2 text-lg font-medium text-gray-900 "
      >
        {label}
      </label>
      <div className={`${flex ? "flex justify-around" : ""} `}>
        {values.map((value) => (
          <label className="flex" key={value}>
            <input
              type={type}
              id={label}
              name={name}
              value={value}
              checked={checked === value}
              className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              onChange={handleCheck}
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  );
};
