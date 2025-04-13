"use client";
import { motion } from "framer-motion";
import { JSX, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropDown = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | undefined>();
  const [selectedSubDivision, setSelectedSubDivision] = useState<string | JSX.Element | undefined>();

  const [subdivisionOptions, setSubdivisionOptions] = useState<string[] | null>();

  const [isDivisionOpen, setIsDivisionOpen] = useState(false);
  const [isSubDivisionOpen, setIsSubDivisionOpen] = useState(false);
  const options: { [key: string]: string[] } = {
    Dhaka: ["Subdivision1.1","Subdivision1.2","Subdivision1.2","Subdivision1.2","Subdivision1.2"],
    Khulna: ["Subdivision1.1","Subdivision1.2","Subdivision1.2","Subdivision1.2","Subdivision1.2"],
  };
  const divisions = ["Dhaka","Khulna","Rajshahi","Chittagong","Rangpur"];

   const handleDivision=()=>{
    isSubDivisionOpen && setIsSubDivisionOpen(false);
    setIsDivisionOpen(!isDivisionOpen);
  }
    const handleSubDivision =()=>{
      !selectedDivision && setSelectedSubDivision(<p className="text-red-500 text-sm">Select division first</p>);
      subdivisionOptions && subdivisionOptions.length >= 1 && setIsSubDivisionOpen(!isSubDivisionOpen);
    }
    const handleDivisionChange = (selectedDivision: string) => {
      setSelectedSubDivision(undefined);
      setSelectedDivision(selectedDivision);
    
      const subdivisions = options[selectedDivision] || [];
      setSubdivisionOptions(subdivisions);
    
      if (subdivisions.length === 0) {
        setSelectedSubDivision(<p className="text-red-500 text-sm">No subdivisions</p>);
      }
    };    

  return (
    <div className="relative flex flex-col lg:flex-row gap-5 w-96 mt-36 mx-auto">
      <div className="relative border border-pink-500 rounded-md w-full flex items-center justify-start px-3 py-2 cursor-pointer"  onClick={handleDivision}> 
        <div className={`absolute right-1 top-1/2 transition-all duration-300 transform -translate-y-1/2  border border-gray-500 rounded-lg hover:bg-gray-200 h-6 w-6 flex items-center justify-center ${isDivisionOpen && 'rotate-180'} `} >
          <IoIosArrowDown />
        </div>
        {selectedDivision ? selectedDivision : 'Select Division'}
        <div className={`absolute z-40 rounded-md p-3 flex flex-col gap-1 ${isDivisionOpen ? 'h-auto opacity-100':'opacity-0 pointer-events-none'} transition-all duration-300 w-full top-12 border shadow-lg -left-0 overflow-hidden`}>
          {
            divisions.map((item,index)=>(
              <motion.p 
              key={index} 
              initial={{ y: -10, opacity: 0 }}
              animate={isDivisionOpen ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 hover:bg-gray-200 rounded-md py-1 px-2"
              onClick={()=>handleDivisionChange(item)}
              >
                {item}
              </motion.p>
            ))
          }
        </div>
      </div>

      <div className={`relative border border-violet-500 rounded-md w-full flex items-center justify-start     px-3 py-2 cursor-pointer`} onClick={handleSubDivision}>  
        <div className={`absolute right-1 top-1/2 transition-all duration-300 transform -translate-y-1/2  border border-gray-500 rounded-lg hover:bg-gray-200 h-6 w-6 flex items-center justify-center ${isSubDivisionOpen && 'rotate-180'} `} >
          <IoIosArrowDown />
        </div>
        {selectedSubDivision ? selectedSubDivision : 'Select Subdivision'}
        <div className={`absolute ${subdivisionOptions && subdivisionOptions.length >= 1 ? '':'hidden'} z-40 rounded-md p-3 flex flex-col gap-1 ${ isSubDivisionOpen? 'h-auto opacity-100':'opacity-0 pointer-events-none'} transition-all duration-300 w-full top-12 border shadow-lg -left-0 overflow-hidden`}>
          {
            !subdivisionOptions? <p className="text-red-500 text-sm">Please select division first.</p>: subdivisionOptions.map((item,index)=>(
              <motion.p 
              key={index} 
              initial={{ y: -10, opacity: 0 }}
              animate={isSubDivisionOpen ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 hover:bg-gray-200 rounded-md py-1 px-2 text-black"
              onClick={()=>setSelectedSubDivision(item)}
              >
                {item}
              </motion.p>
            ))
          }
        </div>
      </div>
    </div>
  );
};
  
export default DropDown;
