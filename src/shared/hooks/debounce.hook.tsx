import React, { useEffect, useState } from "react";

type Props = {
   callback: (value: string) => void;
   time: number;
};
export function useDebounce(props: Props) {
   const [searchKey, setSearchKey] = useState("");

   const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKey(e.target.value);
   };

   useEffect(() => {
      const handler =
         searchKey &&
         setTimeout(() => {
            props.callback(searchKey);
         }, props.time);

      return () => {
         clearTimeout(handler);
      };
   }, [searchKey]);
   return { searchKey, onSearchChange };
}
