export const TerminDetail = ({ data }) => {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
      {data &&
        data.map((data, i) => (
          <div key={i} className="py-4 mx-auto">
            <p className="mx-auto text-xl font-semibold">{data.key}</p>
            <p className="mx-auto font-thin text-md">{data.value}</p>
          </div>
        ))}
    </div>
  );
};
