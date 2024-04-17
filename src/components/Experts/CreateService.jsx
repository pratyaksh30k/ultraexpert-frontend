import React, { useState } from "react";
import { BsUpload, BsX } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

const CreateService = () => {
  const navigate = useNavigate();

  const [interest, setInterest] = useState([]);
  const [interestInput, setInterestInput] = useState("");

  const addInterest = () => {
    if (interestInput.trim() !== "") {
      setInterest([...interest, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (index) => {
    const updatedInterest = [...interest];
    updatedInterest.splice(index, 1);
    setInterest(updatedInterest);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newPreviews = [];
    const combinedFiles = [...selectedFiles];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newPreviews.push(e.target.result);
        if (newPreviews.length === files.length) {
          const totalFiles = combinedFiles.length + newPreviews.length;
          if (totalFiles > 4) {
            setErrorMessage("You can only upload up to 4 files.");
          } else {
            setErrorMessage("");
            setSelectedFiles([...combinedFiles, ...newPreviews]);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleButtonClick = (event, index) => {
    event.stopPropagation(); // Prevent propagation to parent elements
    event.preventDefault(); // Prevent the default behavior of the button click
    removeImage(index);
  };

  const handleBack = () => {
    navigate("/expertdashboard");
  };

  return (
    <div className="mt-[100px] flex flex-col bg-white h-auto">
      <div className="flex w-[60%] mx-auto">
        <div
          onClick={() => handleBack()}
          className="flex gap-2 text-lg font-bold cursor-pointer hover:bg-[#e2e2e2] py-2 px-1 rounded-md duration-200"
        >
          <MdOutlineKeyboardBackspace size={25} />
          Add a service
        </div>
      </div>
      <div className="w-[60%] flex flex-col border border-solid border-slate-300 mx-auto items-center justify-center rounded-lg shadow-lg">
        <div className="text-4xl text-[#3E5676] font-bold my-4">
          Create a serivce
        </div>
        <u className="border border-[#d8d8d8] border-solid w-[90%] mb-8"></u>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="w-[60%] flex flex-col mb-5"
        >
          <label htmlFor="title" className="text-lg mb-1">
            Service Title
          </label>
          <input
            placeholder="Service Title"
            type="text"
            id="title"
            name="title"
            className="border border-solid border-slate-300 rounded-md px-4 py-2 mb-4"
          />
          <label htmlFor="desc" className="text-lg mb-1">
            Service Description
          </label>
          <textarea
            placeholder="Service Description"
            name="desc"
            id="desc"
            className="border border-solid resize-none h-32 border-slate-300 rounded-md px-4 py-2 mb-4"
          />
          <label htmlFor="interests" className="text-lg mb-1">
            Service Tags
          </label>

          <div className="flex flex-wrap border border-slate-300 rounded p-2 gap-3 ">
            {interest.map((skill, ind) => (
              <div
                key={ind}
                className="flex gap-1 items-center bg-slate-300 text-gray-600 pl-4 pr-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
                <FiX
                  onClick={() => removeInterest(ind)}
                  className="ml-1 cursor-pointer text-center text-lg"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Add Tags"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="border border-solid border-slate-300 rounded-md px-4 py-2 w-full"
            />
            <button
              onClick={() => addInterest()}
              className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer"
            >
              Add
            </button>
          </div>

          <label htmlFor="imageSelector" className="text-lg mb-1">
            Service Images
          </label>
          <div
            onClick={() => document.querySelector("#imageSelector").click()}
            className="flex flex-col justify-center items-center border border-dashed border-[#1475cf] h-[200px] w-full cursor-pointer rounded-lg"
          >
            <input
              type="file"
              id="imageSelector"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFiles.length > 0 ? (
              <div className="flex flex-wrap">
                {selectedFiles.map((preview, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover"
                    />
                    <div
                      onClick={(e) => handleButtonClick(e, index)}
                      className="cursor-pointer absolute top-0 right-0 bg-inherit text-white rounded-full p-1"
                    >
                      <BsX />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <BsUpload size={20} />
                <div className="text-sm text-[#1475cf] mt-2">
                  Drop here to attach or upload
                </div>
                <div className="text-xs mt-10">Max Uploads: 4 files</div>
              </div>
            )}
          </div>
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          <label htmlFor="price" className="text-lg mb-1">
            Service Price
          </label>
          <div className="flex">
            <div className="border border-solid border-slate-300 rounded-s-md p-2 mb-4">
              <FaIndianRupeeSign />
            </div>
            <input
              placeholder="Service Price"
              type="number"
              id="price"
              name="price"
              className="border border-solid border-slate-300 rounded-e-md px-4 py-2 mb-4 w-full"
            />
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="cursor-pointer px-6 py-2 text-base md:text-lg font-semibold text-white bg-blue-500 rounded-md shadow-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
