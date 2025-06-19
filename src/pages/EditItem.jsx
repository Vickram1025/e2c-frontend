import React, { useState } from 'react';
import { HiPhoto } from "react-icons/hi2";
import { LuTimer } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { LuGrip } from "react-icons/lu";
import axios from 'axios';

import user from '../img/user.png';
import boxplus from '../img/+.jpg';
import xlogo from "../img/x.png";

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append('name', form.name);
    data.append('sku', form.sku);
    data.append('unit', form.unit);
    data.append('hsnCode', form.hsnCode);
    data.append('taxPreference', form.taxPreference);
    data.append('exemptionReason', form.exemptionReason);
    data.append('image', form.image);

    try {
      await axios.post('http://localhost:8000/product/createproduct', data);
      alert("Product created successfully");

      // Reset form
      setForm({
        name: '',
        sku: '',
        unit: '',
        hsnCode: '',
        taxPreference: '',
        exemptionReason: 'None',
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
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
  };

  return (
    <div className="w-[80%] h-[560px] bg-white ml-[260px]">
      {/* Header */}
      <div className="h-[44px] w-full flex items-center justify-between px-4 bg-slate-100 text-gray-700 border-b">
        <div className="flex items-center gap-4">
          <LuTimer className="text-xl text-gray-500" />
          <div className="flex items-center border border-gray-300 bg-slate-300 rounded-md px-3 py-2 w-[240px] max-w-sm">
            <CiSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="search"
              placeholder="Search in items ( / )"
              className="outline-none w-full text-sm text-gray-700 bg-slate-300"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p>you are cur...</p>
          <p className='text-blue-700'>upgrade</p>
          <span className='flex justify-center items-center gap-2'>G.K.Enterprises <IoIosArrowDown /></span>
          <img src={boxplus} alt="" className='h-5 w-5 bg-green-700' />
          <GoBell className="text-xl text-gray-500 cursor-pointer" />
          <CiSettings className="text-xl text-gray-500 cursor-pointer" />
          <img src={user} alt="" className='h-5 w-5' />
          <LuGrip />
        </div>
      </div>

      {/* Title */}
      <div className='flex justify-between items-center px-3'>
        <h2 className="text-2xl font-bold text-start p-2">Edit Item</h2>
        <img src={xlogo} alt="" className='h-5 w-5' />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full h-[360px] bg-slate-100 mb-4 flex flex-col relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
          <div className="space-y-2">
            {/* Name */}
            <div>
              <label className='flex gap-5'>
                Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-16 border px-2"
                  required
                />
              </label>
            </div>

            {/* SKU */}
            <div>
              <label className='flex gap-5'>
                SKU
                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-20 border px-2"
                  required
                />
              </label>
            </div>

            {/* Unit */}
            <div>
              <label className='flex gap-5'>
                Unit
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-20 border px-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="First">First</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                </select>
              </label>
            </div>

            {/* HSN Code */}
            <div>
              <label className="flex gap-5 relative">
                HSN Code
                <input
                  name="hsnCode"
                  value={form.hsnCode}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-[57px] border px-2"
                  required
                />
                <CiSearch className='text-blue-600 h-7 w-7 absolute -right-10' />
              </label>
            </div>

            {/* Tax Preference */}
            <div>
              <label className="flex gap-5">
                Tax Preference
                <select
                  name="taxPreference"
                  value={form.taxPreference}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-9 border px-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="Taxable">Taxable</option>
                  <option value="Exempted">Exempted</option>
                  <option value="Nil Rated">Nil Rated</option>
                  <option value="Non-GST">Non-GST</option>
                </select>
              </label>
            </div>

            {/* Exemption Reason */}
            <div>
              <label className="flex flex-row gap-5">
                Exemption Reason
                <select
                  name="exemptionReason"
                  value={form.exemptionReason}
                  onChange={handleChange}
                  className="rounded w-full h-9 focus:border-blue-600 ml-4 border px-2"
                >
                  <option value="None">None</option>
                  <option value="OTHER CHARGES">OTHER CHARGES</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="absolute top-[30px] right-[270px] bg-white w-[180px] h-[150px] p-4 rounded flex flex-col justify-center items-center shadow-md">
          <HiPhoto className="text-slate-300 h-10 w-10 mb-2" />
          <p className="text-center text-gray-600 text-sm mb-2">
            Drag image(s) here or <br />
            <span className="text-blue-600 font-medium cursor-pointer">Browse images</span>
          </p>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="opacity-0 absolute inset-0 cursor-pointer"
            accept="image/*"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-start gap-4 p-3 shadow-inner rounded">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-slate-200 text-gray-800 px-6 py-2 rounded-lg border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
