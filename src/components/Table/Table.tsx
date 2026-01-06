"use client"
import React,{useState} from "react";
import { TbBulbFilled } from "react-icons/tb";
// import { FcStatistics } from "react-icons/fc";
// import { FcBullish } from "react-icons/fc";
import { FcLineChart } from "react-icons/fc";
const Table = () => {
  const [isSwitched, setIsSwitched] = useState<number | null>(3);
    const switchLight =(index:number)=>{
    setIsSwitched(index)
  }
  return (
    <div className="flex flex-col gap-5 items-center overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start w-full h-auto gap-4 px-4 pt-10 bg-bgGray pb-10">
        <div className="w-full h-full ">
          <div className="flex flex-col w-full">
            <div className="flex w-full">
              <div className="flex w-full border-t-2  bg-headerGray text-black font-semibold items-center">
                <div className="text-sm border border-l-2 border-borderGray flex items-center justify-center h-full w-1/12 text-center py-2">
                  No
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-3/12 text-center py-2">
                  Room Name
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-2/12 text-center py-2">
                  Temp.(C)
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-2/12 text-center py-2">
                  RH(%)
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-1/12 text-center py-2">
                  Temp. Delay
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-1/12 text-center py-2">
                  RH Delay
                </div>
                <div className="text-sm border border-borderGray flex items-center justify-center h-full w-1/12 text-center py-2">
                  Trend
                </div>
                <div className="text-sm border border-r-2 border-borderGray flex items-center justify-center h-full w-1/12 text-center py-2">
                  Batch Status
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className={`flex w-full h-full border ${index===10 && 'border-b-2'}  border-borderGray bg-white items-center`}>
                  <div className="text-sm flex items-center justify-center p-0  h-[68px] w-1/12 border-x">
                    {index + 1}
                  </div>
                  <div className="text-sm flex items-center justify-start pl-2 p-0 h-[68px] w-3/12 border-x">
                    Room Name
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-2/12 border-l border-r border-borderGray">
                    <div className="flex flex-col bg-cyan-950 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-xs bg-red-600 text-white font-semibold p-1">15.0</p>
                        <p className="text-xs bg-red-600 text-white font-semibold p-1">20.3</p>
                      </div>
                      <p className="text-center text-green-500 font-semibold">25.0</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs bg-yellow-500 text-white font-semibold p-1">30.5</p>
                        <p className="text-xs bg-yellow-500 text-white font-semibold p-1">35.1</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-2/12 border-l border-r border-borderGray">
                    <div className="flex flex-col bg-teal-950 w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-xs bg-red-600 text-white font-semibold p-1">15.0</p>
                        <p className="text-xs bg-red-600 text-white font-semibold p-1">20.3</p>
                      </div>
                      <p className="text-center text-green-500 font-semibold">25.0</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs bg-yellow-500 text-white font-semibold p-1">30.5</p>
                        <p className="text-xs bg-yellow-500 text-white font-semibold p-1">35.1</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-1/12 border-x border-borderGray">
                    0
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-1/12 border-x border-borderGray">
                    0
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-1/12 border-x border-borderGray">
                    <div className="bg-white rounded-md border border-borderGray">
                      <FcLineChart size={36} className="p-1" />
                    </div>
                    {/* <FcBullish size={28} /> */}
                    {/* <FcStatistics size={28} /> */}
                  </div>
                  <div className="text-sm flex items-center justify-center p-0 h-[68px] w-1/12 border-x border-borderGray text-center">
                    <TbBulbFilled size={28} color={(isSwitched===index)?'#FFD700':'#9CA3AF'} onClick={()=>switchLight(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>        
      </div>
    </div> 
  );
};

export default Table;
