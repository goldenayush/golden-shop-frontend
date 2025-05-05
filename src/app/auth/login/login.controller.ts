export default function useLoginController() {
   const initialValues = { email: "", password: "" };
   const onSubmit = (values: any) => console.log(values);
   return { initialValues, onSubmit };
}
