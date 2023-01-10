export const usePagination = ({ dataArray, pageSize = 10, pageNumber }) => {
  return dataArray.slice((pageNumber - 1) * pgSize, pgNumber * pgSize);
};
