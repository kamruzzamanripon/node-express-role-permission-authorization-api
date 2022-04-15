import React from "react";
import { useSelector } from "react-redux";

const RoleAssignUserOrDeleteUser = ({register, errors, dataInfo, inputStatus}) => {
    const roleListInfo = useSelector((state)=>state?.store?.role?.items);
    //console.log("user role info", dataInfo.roleInfo[0]._id)
  return (
    <>
      <div className="space-y-3">
        <input
          className="border-2 border-purple-600/50 w-[75%] "
          defaultValue={dataInfo?._id}
          type="hidden"
          {...register("userId")}
        />

        <div className="flex justify-between">
          <label className="font-semibold pr-2">User Name</label>
          <p>{dataInfo?.name}</p>
        </div>

        <div className="flex justify-between">
          <label className="font-semibold pr-2">Role List</label>
          <select
            className="border-2 border-purple-600/50 w-[75%] "
            defaultValue={dataInfo?.roleInfo[0]?._id}
            {...register("roleId", { required: "required" })}
            disabled={inputStatus === 'deleteUser' ? true : false }
        
          >
            <option value="">Choose any Role</option>
            {roleListInfo && roleListInfo.length > 0 && roleListInfo.map((role, index) => (
                <option value={role._id} key={index}>
                  {role.name}
                </option>
              ))}
          </select>
        </div>
        {errors.roleId && (
          <p className="text-red-700 text-right font-semibold">
            This Field is Required
          </p>
        )}

        <div className="flex justify-between">
            {inputStatus === 'roleAssignUser' ?<button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg"> Submit </button> : ''} 
            {inputStatus === 'deleteUser' ?<button className="bg-red-700 text-white p-3 w-full mt-5 text-lg"> Delete User </button> : ''} 
          
        </div>
      </div>
    </>
  );
};

export default RoleAssignUserOrDeleteUser;
