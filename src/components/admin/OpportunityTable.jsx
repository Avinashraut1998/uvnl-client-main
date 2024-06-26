import { FaEdit, FaEye } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../constant";
import { useOpportunities } from "../../context/OpportunityContext";

const OpportunityTable = () => {
  const { opportunities, setOpportunities } = useOpportunities(); // Update context hook

  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 5;

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/opportunities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpportunities(response.data.data.opportunities);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/opportunity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpportunities(opportunities.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = opportunities?.slice(
    indexOfFirstOpportunity,
    indexOfLastOpportunity
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchOpportunities();
  }, []);
  return (
    <div>
      {" "}
      <>
        <div className="flex justify-between items-center text-title-lg mb-3">
          <h1 className="text-black dark:text-white">Opportunities Table</h1>
        </div>
        <div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-bodydark  text-left dark:bg-black">
                  <th className="min-w-[100px] py-4 px-4 font-bold text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-bold text-black dark:text-white">
                    Mobile Number
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-bold text-black dark:text-white">
                    Email
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-bold text-center text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {opportunities.length !== 0 ? (
                  currentOpportunities?.map((item) => (
                    <tr className=" bg-white dark:bg-graydark" key={item._id}>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        {item.number}
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        {item.email}
                      </td>
                      <td className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              navigate(`/admin/opportunity/${item._id}`)
                            }
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/opportunity/edit/${item._id}`)
                            }
                          >
                            <FaEdit />
                          </button>
                          {/* <DeleteButton
                            onDelete={() => handleDelete(item._id)}
                          /> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="dark:bg-meta-4">
                    <td
                      className="border-b border-[#eee] py-3 px-2 pl-9 dark:border-strokedark xl:pl-11"
                      colSpan="4"
                    >
                      No opportunities to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ul className="flex justify-center mt-4">
            {Array.from(
              {
                length: Math.ceil(opportunities.length / opportunitiesPerPage),
              },
              (_, i) => (
                <li key={i} className="mx-1">
                  <button
                    onClick={() => paginate(i + 1)}
                    className="bg-bodydark hover:bg-bodydark text-white font-bold py-2 px-4 rounded"
                    style={{
                      backgroundColor:
                        currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                      borderColor:
                        currentPage === i + 1 ? "#4f46e5" : "#6b63ff",
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </>
    </div>
  );
};
export default OpportunityTable;
