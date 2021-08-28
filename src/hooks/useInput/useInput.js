import { useState, useMemo } from "react";

export default function useInput(input = "") {
  const [value, setValue] = useState(input);
  const handleInputChange = useMemo(
    () => (e) => {
      console.log(e.target.value);
      setValue(e.target.value);
    },
    []
  );

  return { value, setValue, handleInputChange };
}
