import { Transition } from "@headlessui/react";
import Link from "next/link";
import { AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";

interface UserBoxProps {
  isOpen: boolean;
  closeAvatar: () => void;
}

const UserBox = ({ isOpen, closeAvatar }: UserBoxProps) => {
  return (
    <>
      {isOpen && (
        <div className="absolute inset-0 z-10" onClick={closeAvatar} />
      )}

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
          "absolute z-50 right-10 mt-6 w-[300px] rounded-xl bg-white shadow-xl"
        }
      >
        <h1 className="font-bold px-6 pt-4">Account</h1>

        <div className="flex flex-col items-start mb-6">
          <Link
            href={"/sign-up"}
            className="flex gap-8 transition w-full hover:bg-gray-100 pl-8 text-gray-600 text-sm py-4 cursor-pointer"
            onClick={closeAvatar}
          >
            <AiOutlineUserAdd size={20} className="fill-gray-400" />
            Register
          </Link>

          <Link
            href={"/signin"}
            className="flex gap-8 transition hover:bg-gray-100 w-full pl-8 text-gray-600 text-sm py-4 "
            onClick={closeAvatar}
          >
            <AiOutlineLogin className="fill-gray-400" size={20} />
            Sign-In
          </Link>
        </div>
      </Transition>
    </>
  );
};

export default UserBox;
