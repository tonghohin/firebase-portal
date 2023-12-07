import { CgSpinner } from "react-icons/cg";

// function SpinningCircle() {
//   return (
//     <div>
//       <CgSpinner className="animate-spin h-5 w-5" />
//       <span>Loading...</span>
//     </div>
//   );
// }

import { Component } from "react";

class SpinningCircle extends Component {
    render() {
        return (
            <div>
                <CgSpinner className="animate-spin h-5 w-5" />
                <span>Loading...</span>
            </div>
        );
    }
}

export default SpinningCircle;
