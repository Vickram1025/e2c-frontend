import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { HiEye, HiEyeOff, HiPhotograph } from "react-icons/hi";
import { toast } from "react-toastify";
import Header from "../Component/Header";

const defaultFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  image: null,
};

const USERS_PER_PAGE = 20;

const UserData = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filterField, setFilterField] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/registration/allUserData");
      setUserDatas(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch users");
      setUserDatas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditId(null);
    setPreviewImage(null);
    setShowPassword(false);
    setShowForm(false);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      if (!files[0].type.startsWith("image/")) {
        toast.error("Only image files allowed");
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "password" || !editId) {
        if (value) form.append(key, value);
      }
    });

    const url = editId
      ? `http://localhost:8000/registration/edit/${editId}`
      : `http://localhost:8000/registration/createuser`;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: form });
      const result = await res.json();

      if (res.ok) {
        toast.success(editId ? "Updated successfully!" : "User registered!");
        fetchData();
        resetForm();
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: "",
      image: null,
    });
    setPreviewImage(user.image ? `http://localhost:8000/uploads/${user.image}` : null);
    setShowPassword(false);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8000/registration/delete/${id}`);
        toast.success("User deleted");
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Delete failed");
      }
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch (e) {
      return "Invalid Date";
    }
  };

  const filteredUsers = useMemo(() => {
    if (!userDatas || userDatas.length === 0) return [];
    
    let result = [...userDatas];
    const term = searchTerm.toLowerCase().trim();
    
    if (term) {
      result = result.filter((user) => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        const formattedDate = formatDisplayDate(user.updatedAt).toLowerCase();
        
        switch (filterField) {
          case "email":
            return user.email?.toLowerCase().includes(term);
          case "username":
            return user.userName?.toLowerCase().includes(term);
          case "name":
            return fullName.includes(term);
          case "date":
            return formattedDate.includes(term);
          default: // "all"
            return (
              user.email?.toLowerCase().includes(term) ||
              user.userName?.toLowerCase().includes(term) ||
              fullName.includes(term) ||
              formattedDate.includes(term)
            );
        }
      });
    }
    
    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.updatedAt || b.createdAt || 0);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
    
    return result;
  }, [userDatas, searchTerm, filterField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-[82%] ml-[18%] flex items-center justify-center min-h-screen bg-white pt-20">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full lg:w-[82%] ml-[18%] flex flex-col items-center min-h-screen bg-white pt-20 px-2 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 w-full px-2 sm:px-0">
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <h1 className="text-xl sm:text-2xl font-semibold">Users Data</h1>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center w-full md:w-auto">
            <button
              onClick={() => setShowForm(true)}
              className="border border-orange-500 text-orange-500 rounded px-2 py-2 hover:bg-orange-100"
              aria-label="Add user"
            >
              <IoMdAdd size={18} />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-1 border border-orange-300 rounded-md px-2 sm:px-3 py-2 hover:bg-orange-50 text-sm sm:text-base"
              >
                <FiFilter size={16} />
                <span className="sm:inline">Filter</span>
                <FiChevronDown size={16} />
              </button>
              {showFilterDropdown && (
                <div className="absolute left-3 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilterField("all");
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterField === "all" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      All Fields
                    </button>
                    <button
                      onClick={() => {
                        setFilterField("email");
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterField === "email" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Email
                    </button>
                    <button
                      onClick={() => {
                        setFilterField("username");
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterField === "username" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Username
                    </button>
                    <button
                      onClick={() => {
                        setFilterField("name");
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterField === "name" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Name
                    </button>
                    <button
                      onClick={() => {
                        setFilterField("date");
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${filterField === "date" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-gray-100"}`}
                    >
                      Date
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleSortOrder}
              className="flex items-center gap-1 border border-orange-300 rounded-md px-2 sm:px-3 py-2 hover:bg-orange-50 text-sm sm:text-base"
              title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
            >
              {sortOrder === "desc" ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
              <span className="sm:inline">Sort</span>
            </button>
            
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-orange-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 w-40 sm:w-48 md:w-64 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full mt-4 px-2 sm:px-0">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="text-gray-700 border-b">
                <th className="py-3 px-2 sm:px-4 font-medium">Profile</th>
                <th className="py-3 px-2 sm:px-4 font-medium">Username</th>
                <th className="py-3 px-2 sm:px-4 font-medium hidden sm:table-cell">Mail</th>
                <th className="py-3 px-2 sm:px-4 font-medium hidden md:table-cell">Name</th>
                <th className="py-3 px-2 sm:px-4 font-medium text-center">Actions</th>
                <th className="py-3 px-2 sm:px-4 font-medium text-center">Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 sm:px-4">
                      {user.image ? (
                        <img
                          src={`http://localhost:8000/uploads/${user.image}`}
                          alt="profile"
                          className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold text-sm sm:text-lg">
                          {user.firstName?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2 sm:px-4">{user.userName || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">{user.email || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 hidden md:table-cell">
                      {user.firstName || ""} {user.lastName || ""}
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      <div className="flex justify-center gap-2 sm:gap-4">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FiEdit size={16} className="sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FiTrash2 size={16} className="sm:w-5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-2 sm:px-4 text-center">
                      {formatDisplayDate(user.updatedAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-600">
                    {userDatas.length === 0 ? "No users available" : "No matching users found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > 0 && (
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6 mb-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-2 sm:px-3 py-1 rounded border text-sm sm:text-base ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600 font-medium text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-2 sm:px-3 py-1 rounded border text-sm sm:text-base ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md relative mx-2">
              <button
                onClick={resetForm}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-600 hover:text-black"
                aria-label="Close Form"
              >
                <IoMdClose size={20} />
              </button>
              <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                {editId ? "Edit User" : "User Registration"}
              </h2>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-3 sm:space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border border-orange-300 rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border border-orange-300 rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">Username:</label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border border-orange-300 rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">Password:</label>
                  <div className="relative w-full sm:w-2/3">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-1 sm:p-2 rounded text-sm sm:text-base ${editId ? 'bg-gray-300' : 'border border-orange-300 rounded-lg px-3 sm:px-4 py-1 sm:py-2'}`}
                      required={!editId}
                      disabled={!!editId}
                    />
                    {!editId && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1 sm:top-2 text-gray-600 hover:text-gray-800"
                      >
                        {showPassword ? <HiEye size={16} className="sm:w-5" /> : <HiEyeOff size={16} className="sm:w-5" />}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full sm:w-2/3 border border-orange-300 rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
                  <label className="w-full sm:w-1/3 sm:pr-4 font-medium text-sm sm:text-base">Upload Image:</label>
                  <div className="relative w-full sm:w-2/3 rounded p-2 sm:p-4 flex flex-col items-center justify-center bg-white border border-dashed border-gray-300">
                    <HiPhotograph className="text-slate-400 h-8 sm:h-10 w-8 sm:w-10 mb-1 sm:mb-2" />
                    <p className="text-xs sm:text-sm text-gray-600 text-center">
                      Drag image here or <span className="text-blue-600 font-medium cursor-pointer">browse</span>
                    </p>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-1 sm:mt-2 h-12 sm:h-16 w-12 sm:w-16 object-cover rounded border"
                      />
                    )}
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      required={!editId}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 sm:gap-4 pt-1 sm:pt-2">
                  <button
                    type="submit"
                    className={`py-1 sm:py-2 px-3 sm:px-4 text-white rounded transition text-sm sm:text-base ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : editId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 sm:px-6 py-1 sm:py-2 rounded-lg text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserData;


