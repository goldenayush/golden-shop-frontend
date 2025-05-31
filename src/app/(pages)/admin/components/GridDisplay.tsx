type GridDisplayProps = {
   title: string;
   content: string | JSX.Element;
   hr?: boolean;
};
const GridDisplay = ({ title, content, hr }: GridDisplayProps) => {
   return (
      <>
         <div className="grid grid-cols-12 p-4 items-center">
            <div className="col-span-4">
               <span className="text-[14px] block">{title}</span>
            </div>
            <div className="col-span-8 pt-2">{content}</div>
         </div>
         {hr && <hr className="border-t border-gray-200 block" />}
      </>
   );
};
export default GridDisplay;
