import { SiAdguard } from "react-icons/si";
import { Ri24HoursFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";

const Perks = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:py-28 max-sm:gap-16 items-center">
      <div className="flex items-center gap-3">
        <SiAdguard size={60} color="red" />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Secure Payment</h1>
          <span className="text-gray-500">Secure on order</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Ri24HoursFill size={60} color="red" />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">24/7 support</h1>
          <span className="text-gray-500">Contact us 24 hr a day</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <FaShippingFast size={60} color="red" />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">Fast Deliery</h1>
          <span className="text-gray-500">Fast delivery on order</span>
        </div>
      </div>
    </div>
  );
};

export default Perks;
