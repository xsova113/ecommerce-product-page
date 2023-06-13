import { Transition } from "@headlessui/react";
import Link from "next/link";
import { AiFillGoogleCircle } from "react-icons/ai";

interface UserBoxProps {
  isOpen: boolean;
  closeAvatar: () => void;
}

const UserBox = ({ isOpen, closeAvatar }: UserBoxProps) => {
  return (
    <>
      {isOpen && <div className="absolute inset-0 z-10" onClick={closeAvatar} />}

      <Transition
        show={isOpen}
        as="div"
        enter="ease-out duration-200"
        enterFrom="opacity-0 -translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-full"
        className={
          "absolute z-50 right-10 mt-6 w-[300px] h-[200px] rounded-xl bg-white shadow-xl"
        }
      >
        <h1 className="font-bold px-4 py-4">Account</h1>
        <hr />

        <div className="flex flex-col mt-10 items-center justify-center gap-3">
          <Link
            href={"/register"}
            className="bg-orange-500 text-center transition hover:bg-orange-500/80 text-white text-md px-4 py-2 rounded-lg cursor-pointer"
            onClick={closeAvatar}
          >
            Register or Sign In
          </Link>
          {/* <button className="flex gap-1 justify-center bg-blue-500 transition hover:bg-blue-500/80 text-white text-md w-1/2 px-2 py-2 rounded-lg">
            <AiFillGoogleCircle className="self-center" size={25} />
            SIgn-In
          </button> */}
        </div>
      </Transition>
    </>
  );
};

export default UserBox;
