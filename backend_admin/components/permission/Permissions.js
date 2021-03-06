import React from 'react';
import { canPermission } from '../../utils/permissionHook';
import { canRole } from '../../utils/roleHook';
import PermissionTable from './PermissionTable';
import PermissionTitle from './PermissionTitle';


const Permissions = () => {
   console.log("Permission Access",canPermission('post.Edit'))
   console.log("Role Access",canRole('SuperAdmin'))
    return (
        <main className="p-6 sm:p-10 space-y-6">
        
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <PermissionTitle 
                title='Permissions'
                titleDescription='List, view and edit'
                buttonTitle='Create new Permission'
            />
        </div>

        <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
          
          <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
            <PermissionTable />
          </div>
                    
        </section>
        
       
      </main>
    );
};

export default Permissions;