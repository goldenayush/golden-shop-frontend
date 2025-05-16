export default function useCmsController() {
   const pages = [
      { id: 1, name: "About", status: true }, //
      { id: 2, name: "Contact", status: true },
      { id: 3, name: "Terms and Condition", status: true },
   ];
   return { pages };
}
