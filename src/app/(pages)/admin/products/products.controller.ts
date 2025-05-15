import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/shared/hooks";
import { useState } from "react";
const products = [
   {
      id: 1,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "Wireless Headphones",
      price: 7999,
      sku: "wh-101",
      stock: 25,
      status: "active",
   },
   {
      id: 2,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "Bluetooth Speaker",
      price: 4599,
      sku: "bs-202",
      stock: 13,
      status: "active",
   },
   {
      id: 3,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "Gaming Mouse",
      price: 2999,
      sku: "gm-303",
      stock: 0,
      status: "inactive",
   },
   {
      id: 4,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "Mechanical Keyboard",
      price: 9999,
      sku: "mk-404",
      stock: 8,
      status: "active",
   },
   {
      id: 5,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "4K Monitor",
      price: 27999,
      sku: "mon-505",
      stock: 5,
      status: "active",
   },
   {
      id: 6,
      thumbnail: "http://admin.mrvcreations.in/assets/catalog/1209/1862/img-gopal1-thumb.png",
      name: "External SSD 1TB",
      price: 12499,
      sku: "ssd-606",
      stock: 3,
      status: "active",
   },
];
export default function useProductsController() {
   const [queryStr, setQueryStr] = useState("");
   /* variables here */
   const { searchKey, onSearchChange } = useDebounce({
      time: 1500,
      callback: (value) => alert(value),
   });
   const router = useRouter();
   const searchParams = useSearchParams();

   /* event  handlers here */
   const setParam = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.push(`?${queryStr + params.toString()}`);
   };

   const queryString = (value: string) => {
      router.push(`?${value.toString()}`);
   };

   /* useEffect here */
   return { setParam, searchKey, onSearchChange, products, queryString };
}
