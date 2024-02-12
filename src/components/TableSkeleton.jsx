const TableSkeleton = () => {
  return (
    <>
      <tr className="animate-pulse border-spacing-2">
        <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
        <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
        <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
      </tr>
      <tr className="animate-pulse border-spacing-2">
        <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
        <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
        <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
      </tr>
    </>
  );
};

export default TableSkeleton;
