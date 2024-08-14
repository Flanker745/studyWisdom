import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import Swal from "sweetalert2";

function ViewStudents() {
  const { exitUserId, api } = useContext(UserContext);

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [update, setUpdate] = useState(false);

  const fetchStudents = async (id) => {
    try {
      const response = await fetch(
        `${api}/viewstudents/${id}?page=${currentPage}&limit=${studentsPerPage}`
      );
      const data = await response.json();
      if (data.status) {
        setStudents(data.students);
        setTotalStudents(data.total);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (exitUserId) {
      let id = exitUserId;

      fetchStudents(id);
    }
  }, [currentPage, exitUserId, update]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let resp = await fetch(`${api}/delet-coching-data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ schema: "Student", id }),
          });
          let data = await resp.json();
          if (data.status) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setUpdate(!update);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleEdit = async (id, status) => {
    try {
      let resp = await fetch(`${api}/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, student: "Student", id }),
      });
      let data = await resp.json();
      if (data.status) {
        setUpdate(!update);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

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
              View Students
            </h2>
            <div className="w-[95%] border border-gray-200 m-auto overflow-x-auto ">
              <div className="w-full bg-white ">
                <div className="bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 w-full">
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Sr No.
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Name
                    </div>
                    <div className="col-span-2 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-mail
                    </div>
                    <div className="col-span-2 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </div>
                    <div className="col-span-1 border-b border-gray-200 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
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
                  {students.map((student, key) => (
                    <div key={key} className="grid grid-cols-12 gap-4 w-full">
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {studentsPerPage * (currentPage - 1) + key + 1}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.user_id.firstname +
                          " " +
                          student.user_id.lastname}
                      </div>
                      <div className="col-span-2 px-6 py-4 max-w-[300px] text-sm text-gray-500">
                        {student.user_id.email}
                      </div>
                      <div className="px-6 col-span-2 py-4 whitespace-wrap text-sm text-gray-500 group relative">
                        <div className="relative">
                          {student.user_id.address
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")}{" "}
                          {student.user_id.address.split(" ").length > 5 &&
                            "..."}
                          <div className="group-hover:block absolute top-full left-0 bg-white z-10 border border-gray-200 p-4 hidden w-[350px]">
                            {student.user_id.address}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.user_id.city}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.user_id.state}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.classes}
                      </div>
                      <div className="col-span-1 px-6 py-4 whitespace-nowrap text-sm uppercase text-gray-500">
                        {student.streams ? student.streams : "null"}
                      </div>
                      <div className="col-span-2 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <Link
                            to={`/editCoching/${student._id}`}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              handleEdit(student._id, student.status);
                            }}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              student.status
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-gray-300"
                            }`}
                          >
                            {student.status ? "Active" : "Inactive"}
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

export default ViewStudents;
