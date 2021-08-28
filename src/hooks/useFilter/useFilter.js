import { useState, useMemo } from "react";
export default function useFilter() {
  const [filter, setFilter] = useState("All");
  const handleChangeFilter = useMemo(
    () => (filterContent) => {
      setFilter(filterContent);
    },
    []
  );
  const filterContextObj = useMemo(
    () => ({
      filter: filter,
      handleChangeFilter,
    }),
    [filter, handleChangeFilter]
  );

  return { filterContextObj: filterContextObj };
}
