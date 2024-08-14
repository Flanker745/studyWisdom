import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";

function ViewModules() {
  const nav = useNavigate();

  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modulesPerPage] = useState(10);
  const [totalModules, setTotalModules] = useState(0);
  const [visiblePdf, setVisiblePdf] = useState(null);
  const { exitUserId, api } = useContext(UserContext);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchNotes = async (id) => {
      try {
        const response = await fetch(
          `${api}/viewModules/${id}?page=${currentPage}&limit=${modulesPerPage}`
        );
        const data = await response.json();
        if (data.status) {
          setModules(data.modules);
          setTotalModules(data.total);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (exitUserId) {
      let id = exitUserId;
      fetchNotes(id);
    }
  }, [currentPage, exitUserId, update]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api}/deleteCoching/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status) {
        setModules(modules.filter((module) => module._id !== id));
        console.log("module deleted successfully");
      } else {
        console.log("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = async (id, status) => {
    try {
      let resp = await fetch(`${api}/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, student: "Modules", id }),
      });
      let data = await resp.json();
      if (data.status) {
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const togglePdfVisibility = (id) => {
    setVisiblePdf(visiblePdf === id ? null : id);
  };

  const totalPages = Math.ceil(totalModules / modulesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const current = pageNumbers.indexOf(currentPage);
    const first = current - 1 > 0 ? current - 1 : 0;
    const last =
      current + 2 < pageNumbers.length ? current + 2 : pageNumbers.length - 1;
    return pageNumbers.slice(first, last + 1);
  };

  return (
    <>
      <div className="flex">
        <div className="w-full">
          <div className="m-auto border-2 my-9 rounded-lg ">
            <h2 className="text-3xl font-semibold text-center py-4 ">
              View Modules
            </h2>
            <div className="w-[95%] border border-gray-200 m-auto overflow-x-auto ">
              <div className="w-full bg-white ">
                <div className="bg-gray-50">
                  <div className="grid grid-cols-8 gap-4 w-full">
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Sr No.
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Name
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Streams
                    </div>
                    <div className="col-span-2 border-b border-gray-200 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {modules.map((module, key) => (
                    <div key={key} className="grid grid-cols-8 gap-4 w-full">
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {modulesPerPage * (currentPage - 1) + key + 1}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {module.module_name}
                      </div>
                      <div
                        className="col-span-1 px-6 py-4 max-w-[300px] text-sm text-gray-500 cursor-pointer"
                        onClick={() => {
                          window.open(module.module_file_path, "_blank");
                        }}
                      >
                        {module.module_file}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {module.classes}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {module.subject}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm uppercase text-gray-500">
                        {module.streams ? module.streams : "null"}
                      </div>
                      <div className="col-span-2 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <Link
                            to={`/editCoching/${module._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(module._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(module._id, module.status);
                            }}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              module.status
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-gray-300"
                            }`}
                          >
                            {module.status ? "Active" : "Inactive"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center my-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 rounded-lg bg-gray-300 text-gray-700"
              >
                Prev
              </button>
              {pagination().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 mx-1 rounded-lg ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 rounded-lg bg-gray-300 text-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewModules;
