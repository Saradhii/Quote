import React, { useState } from "react";

const ByUnits = ({ setFormData, formData }) => {
  const [dimensions, setDimensions] = useState();
  return (
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label
          for="last_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Dimensions
        </label>
        <div class="border flex space-between items-center focus:outline-[#4F46E5] hover:border-[#4F46E5] bg-white">
          <input
            type="text"
            name="width"
            onChange={(e) => {
              setDimensions({ ...dimensions, width: e.target.value });
            }}
            class="  text-gray-900 text-md outline-none block w-[25%] p-[9px] placeholder:text-center indent-2"
            placeholder="width"
          />{" "}
          ×
          <input
            type="text"
            name="height"
            onChange={(e) => {
              setDimensions({ ...dimensions, height: e.target.value });
            }}
            class=" text-gray-900 text-md outline-none block w-[25%] p-[9px] placeholder:text-center indent-2"
            placeholder="height"
          />{" "}
          ×
          <input
            type="text"
            name="length"
            onChange={(e) => {
              setDimensions({ ...dimensions, length: e.target.value });
            }}
            class=" text-gray-900 text-md outline-none block w-[25%] p-[9px]  placeholder:text-center indent-2"
            placeholder="length"
          />
          <div class="w-[15%] flex justify-center items-center text-lg border-l-2">
            m
          </div>
        </div>
      </div>
      <div class="grid gap-6  grid-cols-2 sm:grid-cols-2">
        <div>
          <label
            for="company"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            onChange={(e) => {
              setDimensions({ ...dimensions, quantity: e.target.value });
            }}
            class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
            placeholder="Quantity"
          />
        </div>
        <div>
          <label
            for="company"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Gross Weight
          </label>
          <input
            type="text"
            name="gross_weight"
            onChange={(e) => {
              setDimensions({ ...dimensions, gross_weight: e.target.value });
            }}
            class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
            placeholder="Gross Weight"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setFormData({ ...formData, dimensions: dimensions });
        }}
        class="text-[#4F46E5] bg-white hover:bg-[#4F46E5] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-16 rounded-lg sm:w-16 px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>
    </div>
  );
};

export default ByUnits;
