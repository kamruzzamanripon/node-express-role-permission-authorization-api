import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CollectionIcon, DuplicateIcon
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { canRole } from "../../../utils/roleHook";
import NavItem from "./NavItem";

const Nav = ({ sidebarOutsideClick }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

   

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
          {sidebarStatus ? (
            <ArrowNarrowLeftIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarClose}
            />
          ) : (
            <ArrowNarrowRightIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarOpen}
            />
          )}
        </div>

        <NavItem
          hrefLink='/category'
          sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <CollectionIcon className="h-10" />
        </NavItem> 
        
        <NavItem
          hrefLink='/role'
          sidebarStatus={sidebarStatus}
          menuTitle="Role"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className="h-10" />
        </NavItem> 
        
        {canRole('SuperAdmin') && 
          <NavItem
            hrefLink='/permission'
            sidebarStatus={sidebarStatus}
            menuTitle="Permissions"
            subMenu={false}
            subMenuArray={null}
          >
            <DuplicateIcon className="h-10" />
          </NavItem> 
        }


        <NavItem
          hrefLink='/user-info'
          sidebarStatus={sidebarStatus}
          menuTitle="user info"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className="h-10" />
        </NavItem> 

        
       
      </nav>
    </>
  );
};

export default Nav;
