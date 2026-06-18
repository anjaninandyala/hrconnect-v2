import React from "react";
import { useNavigate } from "react-router-dom";

import {
Bell,
LogOut,
Menu,
} from "lucide-react";

import { Button } from "../ui/button";

export default function TopNav({
onMenuToggle,
}) {
const navigate =
useNavigate();

const logout = () => {
localStorage.removeItem(
"token"
);


localStorage.removeItem(
  "user"
);

navigate(
  "/auth/login"
);


};

return ( <header
   className="
     h-16
     bg-white
     border-b
     flex
     items-center
     justify-between
     px-4
     md:px-6
     sticky
     top-0
     z-30
   "
 >
{/* LEFT */}


  <div
    className="
      flex
      items-center
      gap-3
    "
  >
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={
        onMenuToggle
      }
    >
      <Menu
        className="
          w-5
          h-5
        "
      />
    </Button>

    <h1
      className="
        hidden
        md:block
        text-lg
        font-semibold
        text-slate-800
      "
    >
      HRConnect Admin
    </h1>
  </div>

  {/* RIGHT */}

  <div
    className="
      flex
      items-center
      gap-4
    "
  >
    <button
      className="
        relative
      "
    >
      <Bell
        className="
          w-5
          h-5
          text-gray-600
        "
      />

      <span
        className="
          absolute
          top-0
          right-0
          w-2
          h-2
          bg-red-500
          rounded-full
        "
      />
    </button>

    <div
      className="
        hidden
        md:block
      "
    >
      <p
        className="
          text-sm
          font-semibold
        "
      >
        Admin
      </p>

      <p
        className="
          text-xs
          text-gray-500
        "
      >
        HR Manager
      </p>
    </div>

    <Button
      variant="outline"
      onClick={logout}
    >
      <LogOut
        className="
          w-4
          h-4
          mr-2
        "
      />

      Logout
    </Button>
  </div>
</header>


);
}
