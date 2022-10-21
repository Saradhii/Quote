import React, { useEffect, useState, useRef } from "react";
import HashLoader from "react-spinners/BeatLoader";
import Sea from "./Sea";
import Air from "./Air";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestQuote2 = () => {
  const [seaSelected, setSeaSelected] = useState(true);
  const [productDetails, setProductDetails] = useState();
  const [hsQuery, setHsQuery] = useState("");
  const [cities1, setCities1] = useState();
  const [cityQuery1, setCityQuery1] = useState("");
  const [cities2, setCities2] = useState();
  const [cityQuery2, setCityQuery2] = useState("");
  const inputProduct = useRef("");
  const inputCity1 = useRef("");
  const inputCity2 = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  //
  const [formData, setFormData] = useState({
    delivery_mode: "Sea",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      let response = await fetch(
        `https://intoglo-first-api.herokuapp.com/quote/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data = await response.json();
      console.log(data);
      if (data.status === 200) {
        setIsLoading(false);
        toast("Form Submitted Successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickProductName = (name, description) => {
    if (description) {
      inputProduct.current = `${name} : ${description}`;
    } else {
      inputProduct.current = `${name}`;
    }

    let product_details = document.getElementById("product_details");
    product_details.value = inputProduct.current;
  };

  const handleClickCity1 = (city, country) => {
    inputCity1.current = `${city}, ${country}`;
    let location_from = document.getElementById("location_from");
    location_from.value = inputCity1.current;
    setFormData({ ...formData, location_from: inputCity1.current });
    console.log(inputCity1.current);
  };

  const handleClickCity2 = (city, country) => {
    inputCity2.current = `${city}, ${country}`;
    let location_to = document.getElementById("location_to");
    location_to.value = inputCity2.current;
    setFormData({ ...formData, location_to: inputCity2.current });
    console.log(inputCity2.current);
  };

  const getProductDetails = async (hsQuery) => {
    try {
      let response = await fetch(
        `https://intoglo-first-api.herokuapp.com/search/FindHSCode?search=${hsQuery}`
      );
      let data = await response.json();
      console.log(data);
      setProductDetails(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocation1 = async (cityQuery1) => {
    console.log(cityQuery1);
    try {
      let response = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${cityQuery1}`,
        { headers: { "X-Api-Key": "UczdRN7ix8nBYXWfPO030g==raOcRa79svjw6Ht2" } }
      );
      let data = await response.json();
      console.log(data);
      setCities1(data);
    } catch (e) {
      console.log(e);
    }
  };

  // UczdRN7ix8nBYXWfPO030g==raOcRa79svjw6Ht2

  const getLocation2 = async (cityQuery2) => {
    try {
      let response = await fetch(
        `https://api.api-ninjas.com/v1/city?name=${cityQuery2}`,
        { headers: { "X-Api-Key": "UczdRN7ix8nBYXWfPO030g==raOcRa79svjw6Ht2" } }
      );
      let data = await response.json();
      setCities2(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (hsQuery.length === 0) {
      setProductDetails(null);
      return;
    }
    getProductDetails(hsQuery);
  }, [hsQuery]);

  useEffect(() => {
    if (cityQuery1.length === 0) {
      setCities1(null);
      return;
    }
    getLocation1(cityQuery1);
  }, [cityQuery1]);

  useEffect(() => {
    if (cityQuery2.length === 0) {
      setCities2(null);
      return;
    }
    getLocation2(cityQuery2);
  }, [cityQuery2]);
  return (
    <div class="my-12 mx-[3%] lg-mx-[15%] md:mx-[10%] sm:mx-[5%] py-6 px-8 border bg-white shadow-md">
      <div class="mb-4 text-xl font-bold md:text-3xl lg:text-4xl flex flex-wrap items-center gap-3">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-[#4F46E5] from-sky-400">
          Request a Quote
        </span>
        <img
          class="w-8 h-8 mt-2 object-contain"
          src="https://ik.imagekit.io/qtf62wap9/es/static/u/intoglo.com/images/favicon/original/intoglo_favicon.png"
          alt="quoteicon"
        />
      </div>
      <p class="mb-10 px-[1px] font-medium text-black">
        And get the best rates from the leading logistics providers.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="mb-6 lg:w-8/12 sm:w-full">
          <h5 class="text-xl font-medium mb-5">Cargo Details</h5>
          <div class="mb-6">
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Product <span class="text-[red]">*</span>
            </label>
            <div class="flex flex-col relative">
              <div class="bg-white border relative rounded-md border-gray-300 focus:outline-[#4F46E5] hover:border-[#4F46E5] flex justify-between items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 focus:text-[#4F46E5]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>

                <input
                  type="text"
                  id="product_details"
                  class="text-md text-gray-900  block w-full p-2.5 focus:outline-none "
                  placeholder="Enter commodity type or HS code"
                  required
                  onChange={(e) => setHsQuery(e.target.value)}
                />
              </div>
              {productDetails && productDetails.length > 0 ? (
                <div class="border absolute w-full mt-12 max-h-40 z-30 bg-white overflow-y-scroll overflow-x-hidden rounded-md">
                  {productDetails.map((product) => {
                    return (
                      <div
                        onClick={() => {
                          handleClickProductName(
                            product.name,
                            product.description
                          );
                          setFormData({
                            ...formData,
                            product_details: product,
                          });
                          setHsQuery("");
                        }}
                        class="text-sm cursor-pointer text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                      >
                        <h2>
                          {product.name} : {product.description}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          {/* Delivery Type */}
          <h5 class="text-xl font-medium mb-5">Delivery</h5>
          <div class="flex space-x-2 justify-start mb-10">
            <div>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, delivery_mode: "Sea" });
                  setSeaSelected(true);
                }}
                className={
                  seaSelected
                    ? "px-4 pt-1.5 pb-1 bg-[#4F46E5] text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-[#4F46E5] hover:text-white hover:shadow-lg focus:bg-[#4F46E5] focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    : "px-4 pt-1.5 pb-1 bg-white text-black font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-[#4F46E5] hover:text-white hover:shadow-lg focus:bg-[#4F46E5] focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                }
              >
                SEA
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, delivery_mode: "Air" });
                  setSeaSelected(false);
                }}
                className={
                  !seaSelected
                    ? "px-4 pt-1.5 pb-1 bg-[#4F46E5] text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-[#4F46E5] hover:text-white hover:shadow-lg focus:bg-[#4F46E5] focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    : "px-4 pt-1.5 pb-1 bg-white text-black font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-[#4F46E5] hover:text-white hover:shadow-lg focus:bg-[#4F46E5] focus:text-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                }
              >
                AIR
              </button>
            </div>
          </div>
          {/* SEA and AIR Components*/}
          {seaSelected ? (
            <Sea
              setFormData={setFormData}
              formData={formData}
              handleChange={handleChange}
            />
          ) : (
            <Air
              setFormData={setFormData}
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {/* Next Part */}

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div class="flex flex-col relative">
              <div class="relative">
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  From <span class="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  id="location_from"
                  onChange={(e) => {
                    setCityQuery1(e.target.value);
                  }}
                  class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                  placeholder="City, Port"
                  required
                />
              </div>
              {cities1 ? (
                <div class="border absolute shadow-lg w-full mt-[72px] max-h-40 z-30 bg-white overflow-hidden rounded-md">
                  {cities1.map((city) => {
                    return (
                      <div
                        onClick={() => {
                          handleClickCity1(city.name, city.country);
                          setCityQuery1("");
                          setCities1(null);
                        }}
                        class="text-sm cursor-pointer text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                        key={city._id}
                      >
                        <h2>
                          {city.name} : {city.country}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div class="flex flex-col relative">
              <div class="relative">
                <label
                  for="last_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  To <span class="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  id="location_to"
                  onChange={(e) => setCityQuery2(e.target.value)}
                  class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                  placeholder="City, Port"
                  required
                />
              </div>
              {cities2 ? (
                <div class="border absolute w-full mt-[72px] max-h-40 z-30 bg-white overflow-hidden rounded-md">
                  {cities2.map((city) => {
                    return (
                      <div
                        onClick={() => {
                          handleClickCity2(city.name, city.country);
                          setCityQuery2("");
                          setCities2(null);
                        }}
                        class="text-sm cursor-pointer text-gray-900 font-medium px-6 py-4 whitespace-nowrap"
                        key={city._id}
                      >
                        <h2>
                          {city.name} : {city.country}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ready to Load <span class="text-[red]">*</span>
              </label>
              <input
                type="date"
                name="ready_to_load"
                onChange={(e) => handleChange(e)}
                class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                placeholder="Select"
                required
              />
            </div>
          </div>
          <div class="mb-10">
            <label
              for="additional_infromation"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Additional Information
            </label>
            <textarea
              type="text"
              name="additional_infromation"
              onChange={(e) => handleChange(e)}
              class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
              placeholder="Write a message..."
            />
          </div>
          <h5 class="text-xl font-medium mb-5">Contact Details</h5>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="First Name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                First Name <span class="text-[red]">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                onChange={(e) => handleChange(e)}
                class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label
                for="Last Name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last Name <span class="text-[red]">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                onChange={(e) => handleChange(e)}
                class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="phone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone <span class="text-[red]">*</span>
              </label>
              <input
                type="number"
                name="phone"
                onChange={(e) => handleChange(e)}
                class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div>
              <label
                for="Email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email <span class="text-[red]">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
                class="bg-white rounded-sm border border-gray-300 text-gray-900 text-sm focus:outline-[#4F46E5] hover:border-[#4F46E5] block w-full p-2.5 mb-2"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 bg-white rounded-sm  border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              I agree with the{" "}
              <a
                href="rrr"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>

          {isLoading ? (
            <HashLoader color="#4F46E5" />
          ) : (
            <button
              type="submit"
              class="text-white bg-[#4F46E5] hover:bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          )}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </form>
    </div>
  );
};

export default RequestQuote2;
