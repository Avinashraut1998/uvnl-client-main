import { useEffect, useState } from "react";
import BASE_URL from "../constant";
import axios from "axios";

const Convert = ({ products, leadId }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [convertedLeadId, setConvertedLeadId] = useState(null); // New state to store leadId

  useEffect(() => {
    // Set convertedLeadId when leadId prop changes
    setConvertedLeadId(leadId);
  }, [leadId]);

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/user/convert-lead/${convertedLeadId}`,
        {
          leadStatus: "Converted",
          productId: formData.productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Add success notification or redirect
      alert("Lead converted successfully!");

      setShowModal(false);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <button
        className="bg-meta-5  text-white active:bg-pink-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Convert Lead
      </button>
      {showModal ? (
        <>
          <div className="justify-center z-9999 items-center flex overflow-x-hidden overflow-y-auto md:max-h-171.5 fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl form-container">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="border-b border-stroke px-5 py-2 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Convert Lead
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto overflow-y-auto max-h-80 md:max-h-90 lg:max-h-115">
                  <form
                    action=""
                    className="font-thin text-sm"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="mb-4.5 flex flex-col gap-6 md:flex-row">
                      <div className="w-full ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Convert <span className="text-meta-1">*</span>
                        </label>
                        <select
                          name="productId"
                          value={formData.productId} // corrected the value to formData.product
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-1.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {products.map((product, index) => (
                            <option key={index} value={product._id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center text-title-sm justify-end gap-2 p-4 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="inline-flex items-center justify-center bg-danger py-1 px-2 text-center font-normal text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="inline-flex items-center justify-center bg-primary py-1 px-2 text-center font-normal  text-white hover:bg-opacity-90 md:px-2 xl:px-4"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Convert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default Convert;
