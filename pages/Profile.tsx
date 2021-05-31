import { UserIcon } from "@heroicons/react/outline";
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
        <div>{session ? session.user.name : "not logged in"}</div>
        <div className="flex justify-center">
          <button className="btn-simple">Edit</button>
        </div>
        <div>Email</div>
        <div>{session ? session.user.email : "not logged in"}</div>
        <div className="flex justify-center">
          <button className="btn-simple">Edit</button>
        </div>
        <div>Phone</div>
        <div>
          <input type="text" id="phone" value="8375098255" />
        </div>
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
