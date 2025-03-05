"use client";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
// import OrganizationSchema from "./OrganizationSchema";
import Select from "react-select";
import { countryOptions } from "@/docs/CountryData";



interface IAdd {
  setOpen: (open: boolean) => void;
  refetch: any;
}

interface IFormInput {
  org_name: string;
  org_addr1: string;
  zip_code: string;
  country: any;
}

const AddOrganization: React.FC<IAdd> = ({ setOpen, refetch }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const resolver = yupResolver(OrganizationSchema);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInput>({
    // resolver: yupResolver(OrganizationSchema),
    defaultValues: {
      org_name: "",
      org_addr1: "",
      zip_code: "",
      country: "",
    },
  });

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data, null, 2));
    setIsLoading(true);
    toast.success("Organization added successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "dark",
    });
    reset();
    refetch();
    setOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
          {/* <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Organization Name:</label>
            <input
              className="border border-softGray outline-none h-11 p-3 rounded-lg text-sm"
              type="text"
              {...register("org_name")}
              placeholder="Enter organization"
            />
            {errors.org_name && (
              <p className="text-red-500 text-xs">{errors.org_name.message}</p>
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm">Country:</label>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={countryOptions}
                  placeholder="Select country"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? "1px solid #ccc" : "1px solid #d1d5db",
                      outline: "none",
                      height: "44px",
                      padding: "2px",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      boxShadow: "none",
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#374151",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9CA3AF",
                      fontSize: "0.875rem",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#374151",
                      fontSize: "0.875rem",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      zIndex: 10,
                    }),
                  }}
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-xs">{errors.country?.message as string}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-linearPurple text-white text-sm font-medium px-8 py-3 rounded-3xl mt-6"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrganization;
