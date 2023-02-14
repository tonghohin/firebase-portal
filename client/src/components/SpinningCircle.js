import { CgSpinner } from "react-icons/cg";

function SpinningCircle() {
  return (
    <div role="status">
      <CgSpinner className="animate-spin h-5 w-5" />
      <span>Loading...</span>
    </div>
  );
}

export default SpinningCircle;
