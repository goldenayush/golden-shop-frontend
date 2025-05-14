const categories = [
   {
      id: "1",
      category_name: "Laddu Gopal / Accessories",
      status: "active",
      include_in_menu: "true",
   },
   {
      id: "2",
      category_name: "Laddu Gopal / Pagdi",
      status: "active",
      include_in_menu: "true",
   },
   {
      id: "3",
      category_name: "Laddu Gopal / Poshak",
      status: "active",
      include_in_menu: "true",
   },
   {
      id: "4",
      category_name: "Laddu Gopal",
      status: "active",
      include_in_menu: "true",
   },
];

export default function useCategoriesController() {
   return { categories };
}
