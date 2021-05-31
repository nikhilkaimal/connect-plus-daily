import { UserIcon } from "@heroicons/react/outline";
import { session } from "next-auth/client";
import { useSession } from "next-auth/client";

export default function Profile() {
  const [session] = useSession();

  return (
    <>
      <div className="grid grid-cols-3 text-center space-y-10 p-10">
        <div className="col-span-3">
          <UserIcon className="h-24 mx-auto border border-black" />
        </div>
        <div>Name</div>
        <div>{session ? session.user.name : "Nikhil"}</div>
        <div className="flex justify-center">
          <button className="btn-simple">Edit</button>
        </div>
        <div>Email</div>
        <div>abc@gmail.com</div>
        <div className="flex justify-center">
          <button className="btn-simple">Edit</button>
        </div>
        <div>Phone</div>
        <div>8915638311</div>
        <div className="flex justify-center">
          <button className="btn-simple">Edit</button>
        </div>
        <div className="col-span-3">
          <div className="flex justify-center">
            <button className="btn-simple">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
