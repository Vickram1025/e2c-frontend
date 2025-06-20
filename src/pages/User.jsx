import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiPhoto } from 'react-icons/hi2';

const User = () => {
  const [userDatas, setUserDatas] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const fetchData = () => {
    axios
      .get('http://localhost:8000/registration/allUserData')
      .then((res) => setUserDatas(res.data))
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('userName', formData.userName);
    form.append('email', formData.email);
    form.append('password', formData.password); 

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
        alert(editId ? 'User updated successfully!' : 'User registered successfully!');
        setEditId(null);
        setPreviewImage(null);
        setFormData({
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          email: '',
          image: null,
        });
        fetchData();
      } else {
        alert(result.message || 'Operation failed.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password || '', 
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
        alert('User deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting user.');
      }
    }
  };

  return (
    <div className="w-full md:w-[80%] ml-auto flex flex-col items-center min-h-screen bg-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 p-6 rounded shadow-md w-full max-w-xl mb-8"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editId ? 'Edit User' : 'User Registration'}
        </h2>

        <div className="space-y-4">
          {['firstName', 'lastName', 'userName', 'password', 'email'].map((field, idx) => (
            <div className="flex items-center" key={idx}>
              <label className="w-1/3 text-left pr-4 font-medium capitalize">
                {field.replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="p-2 rounded w-2/3 bg-white"
                required
              />
            </div>
          ))}

         
          <div className="flex items-center">
            <label className="w-1/3 text-left pr-4 font-medium">Upload Image:</label>
            <div className="relative w-2/3 rounded p-4 flex flex-col items-center justify-center bg-white">
              <HiPhoto className="text-slate-400 h-10 w-10 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Drag image here or{' '}
                <span className="text-blue-600 font-medium cursor-pointer">browse</span>
              </p>
              {formData.image ? (
                <p className="mt-2 text-sm text-green-700 font-medium text-center">
                  {formData.image.name}
                </p>
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 h-16 w-16 object-cover rounded border"
                />
              ) : null}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 text-white rounded transition ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSubmitting ? 'Processing...' : editId ? 'Update' : 'Submit'}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setPreviewImage(null);
                setFormData({
                  firstName: '',
                  lastName: '',
                  userName: '',
                  password: '',
                  email: '',
                  image: null,
                });
              }}
              className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

     
      {userDatas.length > 0 && (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border"></th>
                <th className="py-2 px-4 border">First Name</th>
                <th className="py-2 px-4 border">Last Name</th>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userDatas.map((user, index) => (
                <tr key={user._id || index} className="text-center">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.firstName}</td>
                  <td className="py-2 px-4 border">{user.lastName}</td>
                  <td className="py-2 px-4 border">{user.userName}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">
                    {user.image ? (
                      <img
                        src={`http://localhost:8000/uploads/${user.image}`}
                        alt="User"
                        className="h-10 w-10 object-cover mx-auto rounded"
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
