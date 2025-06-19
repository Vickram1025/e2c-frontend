import React, { useState } from 'react';
import { HiPhoto } from "react-icons/hi2";

const User = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    file: null,
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers((prev) => [...prev, formData]);
    }

    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      file: null,
    });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    setEditIndex(null);
    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      file: null,
    });
  };

  return (
    <div className="w-full md:w-[80%] ml-auto flex flex-col items-center min-h-screen bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-6 rounded shadow-md w-full max-w-xl mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">User Registration</h2>

        <div className="space-y-4">
          {/* First Name */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 rounded w-2/3 bg-white"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 rounded w-2/3 bg-white"
              required
            />
          </div>

          {/* User Name */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">User Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 rounded w-2/3 bg-white"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded w-2/3 bg-white"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded w-2/3 bg-white"
              required
            />
          </div>

          {/* Upload Image */}
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">Upload Image:</label>
            <div className="relative w-2/3 rounded p-4 flex flex-col items-center justify-center bg-white">
              <HiPhoto className="text-slate-400 h-10 w-10 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Drag image here or <span className="text-blue-600 font-medium cursor-pointer">browse</span>
              </p>
              {formData.file && (
                <p className="mt-2 text-sm text-green-700 font-medium text-center">
                  {formData.file.name}
                </p>
              )}
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {editIndex !== null ? 'Update' : 'Submit'}
        </button>
      </form>

      {/* Users Table */}
      {users.length > 0 && (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">First Name</th>
                <th className="py-2 px-4 border">Last Name</th>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.firstName}</td>
                  <td className="py-2 px-4 border">{user.lastName}</td>
                  <td className="py-2 px-4 border">{user.userName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">
                    {user.file ? (
                      <img
                        src={URL.createObjectURL(user.file)}
                        alt="Uploaded"
                        className="h-10 w-10 object-cover mx-auto rounded"
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
