import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiPhoto } from 'react-icons/hi2';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Header from '../Component/Header';
import { toast } from 'react-toastify';

const defaultFormData = {
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  email: '',
  image: null,
};

const User = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = () => {
    axios
      .get('http://localhost:8000/registration/allUserData')
      .then((res) => setUserDatas(res.data))
      .catch((err) => {
        console.error('Fetch error:', err);
        toast.error('Failed to fetch user data');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      if (!files[0].type.startsWith('image/')) {
        toast.error('Only image files are allowed!');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const resetForm = () => {
    setEditId(null);
    setPreviewImage(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('userName', formData.userName);
    form.append('email', formData.email);
    if (!editId) {
      form.append('password', formData.password);
    }
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const url = editId
        ? `http://localhost:8000/registration/edit/${editId}`
        : `http://localhost:8000/registration/createuser`;

      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: form,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(editId ? 'User updated successfully!' : 'User registered successfully!');
        resetForm();
        fetchData();
      } else {
        toast.error(result.message || 'Operation failed.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: '',
      email: user.email,
      image: null,
    });
    setEditId(user._id);
    setPreviewImage(`http://localhost:8000/uploads/${user.image}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8000/registration/delete/${id}`);
        toast.success('User deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Error deleting user.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full md:w-[80%] ml-auto flex flex-col items-center min-h-screen bg-white pt-20">

        {/* --- User Registration Form --- */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-6 rounded shadow-md w-full max-w-xl mb-10"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {editId ? 'Edit User' : 'User Registration'}
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 rounded w-2/3 bg-white"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 rounded w-2/3 bg-white"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">Username:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="p-2 rounded w-2/3 bg-white"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`p-2 rounded w-2/3 ${editId ? 'bg-gray-300' : 'bg-white'}`}
                required={!editId}
                disabled={!!editId}
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 rounded w-2/3 bg-white"
                required
              />
            </div>

            <div className="flex items-center">
              <label className="w-1/3 pr-4 font-medium">Upload Image:</label>
              <div className="relative w-2/3 rounded p-4 flex flex-col items-center justify-center bg-white">
                <HiPhoto className="text-slate-400 h-10 w-10 mb-2" />
                <p className="text-sm text-gray-600 text-center">
                  Drag image here or <span className="text-blue-600 font-medium cursor-pointer">browse</span>
                </p>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 h-16 w-16 object-cover rounded border"
                  />
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required={!editId}
                />
              </div>
            </div>
          </div>

          {/* Button Row with Left and Right Alignment */}
          <div className="flex justify-between items-center pb-4 gap-4 mt-6 w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-2 px-4 text-white rounded transition ${
                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Processing...' : editId ? 'Update' : 'Create an Account'}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- User Table --- */}
        {userDatas.length > 0 && (
          <div className="w-full max-w-6xl overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4 text-left">All Registered Users</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-center">
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
                {userDatas.map((user, index) => {
                  const imgUrl = `http://localhost:8000/uploads/${user.image}`;
                  return (
                    <tr key={user._id || index} className="text-center">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{user.firstName}</td>
                      <td className="py-2 px-4 border">{user.lastName}</td>
                      <td className="py-2 px-4 border">{user.userName}</td>
                      <td className="py-2 px-4 border">{user.email}</td>
                      <td className="py-2 px-4 border">
                        {user.image ? (
                          <img
                            src={imgUrl}
                            alt="User"
                            className="h-10 w-10 object-fill rounded"
                          />
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="py-2 px-4 border space-x-2 flex justify-center">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default User;
