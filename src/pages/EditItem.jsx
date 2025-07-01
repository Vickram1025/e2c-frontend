import React, { useState } from 'react';
import { HiPhoto } from 'react-icons/hi2';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import xlogo from '../img/x.png';
import Header from '../Component/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditItem = () => {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    unit: '',
    hsnCode: '',
    taxPreference: '',
    exemptionReason: 'None',
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) {
      toast.error('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post('http://localhost:8000/product/createproduct', data);
      toast.success('Product created successfully');

      setForm({
        name: '',
        sku: '',
        unit: '',
        hsnCode: '',
        taxPreference: '',
        exemptionReason: 'None',
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: '',
      sku: '',
      unit: '',
      hsnCode: '',
      taxPreference: '',
      exemptionReason: 'None',
      image: null,
    });
    setPreviewImage(null);
  };

  return (
    <div className="ml-[18%] w-[82%] pt-16 bg-white min-h-screen">
      <Header />

      <div className="flex justify-between items-center px-6 py-4 shadow-md">
        <h2 className="text-xl md:text-2xl font-bold">Edit Item</h2>
        <img src={xlogo} alt="Close" className="h-5 w-5 cursor-pointer" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-slate-100 mb-4 flex flex-col p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
        
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center">
              <label className="font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded h-10 focus:border-blue-600 border px-3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center">
              <label className="font-medium">SKU</label>
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="w-full rounded h-10 focus:border-blue-600 border px-3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center">
              <label className="font-medium">Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full rounded h-10 focus:border-blue-600 border px-2"
                required
              >
                <option value="">Select</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center relative">
              <label className="font-medium">HSN Code</label>
              <div className="relative w-full">
                <input
                  name="hsnCode"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className="w-full rounded h-10 focus:border-blue-600 border px-3 pr-10"
                  required
                />
                <CiSearch className="text-blue-600 h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center">
              <label className="font-medium">Tax Preference</label>
              <select
                name="taxPreference"
                value={form.taxPreference}
                onChange={handleChange}
                className="w-full rounded h-10 focus:border-blue-600 border px-2"
                required
              >
                <option value="">Select</option>
                <option value="Taxable">Taxable</option>
                <option value="Exempted">Exempted</option>
                <option value="Nil Rated">Nil Rated</option>
                <option value="Non-GST">Non-GST</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(100px,150px)_1fr] gap-4 items-center">
              <label className="font-medium">Exemption Reason</label>
              <select
                name="exemptionReason"
                value={form.exemptionReason}
                onChange={handleChange}
                className="w-full rounded h-10 focus:border-blue-600 border px-2"
              >
                <option value="None">None</option>
                <option value="OTHER CHARGES">OTHER CHARGES</option>
              </select>
            </div>
          </div>

        
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-full max-w-xs h-60 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white p-4">
              <HiPhoto className="text-slate-400 h-12 w-12 mb-3" />
              <p className="text-sm text-gray-600 text-center mb-2">
                Drag image here or{' '}
                <span className="text-green-700 font-medium cursor-pointer">
                  browse
                </span>
              </p>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-3 h-28 w-28 object-cover rounded border"
                />
              ) : form.image ? (
                <p className="mt-3 text-sm text-green-700 font-medium text-center">
                  {form.image.name}
                </p>
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

     
        <div className="flex flex-col sm:flex-row justify-start gap-4 p-6 mt-6 bg-white rounded-lg shadow-inner">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`text-white px-8 py-2.5 rounded-lg ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-slate-200 text-gray-800 px-8 py-2.5 rounded-lg border hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;