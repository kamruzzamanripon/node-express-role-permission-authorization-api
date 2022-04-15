import React from 'react';

const CreateUser = ({register, errors}) => {
    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                <label className="font-semibold pr-2">Name</label>
                <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("name", {required: "required"})} />
            </div>
            {errors.name && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

            <div className="flex justify-between">
                <label className="font-semibold pr-2">email</label>
                <input className="border-2 border-purple-600/50 w-[75%] " type="email" {...register("email", {required: "required"})}/>
            </div>
            {errors.email && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

            <div className="flex justify-between">
                <label className="font-semibold pr-2">Password</label>
                <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("password", {required: "required"})} />
            </div>
            {errors.password && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}
            
            <div className="flex justify-between">
                <label className="font-semibold pr-2">Phone</label>
                <input className="border-2 border-purple-600/50 w-[75%] " type="number"  {...register("phone")}/>
            </div>
                        
            
            <div className="flex justify-between">
                <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
            </div>
        </div> 
    );
};

export default CreateUser;