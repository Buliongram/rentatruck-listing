import React, { useEffect, useRef, useState } from "react";
import {
  listingCategories,
  nigerianLocations,
  propertyFeatures,
} from "../../data/createListingData";
import { FaImages } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    description: "",
    category: "",
    subCategory: "",
    state: "",
    area: "",
    locality: "",
    zipCode: "",
    streetAddress: "",
    bedrooms: "1",
    bathrooms: "1",
    toilets: "1",
    areaSize: "",
    price: "",
    denomination: "",
    installment: "",
    youtubeLink: "",
    instagramLink: "",
    features: [],
    images: [],
  });
  const fileInputRef = useRef(null);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [availableLocalities, setAvailableLocalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState("");
  const [instagramEmbedHtml, setInstagramEmbedHtml] = useState(null);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };
  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      // Reset the file input value when the last image is removed
      if (newImages.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return { ...prev, images: newImages };
    });
  };

  useEffect(() => {
    const extractYoutubeVideoId = (url) => {
      const regExp =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
      const match = url.match(regExp);
      return match ? match[1] : null;
    };

    const videoId = extractYoutubeVideoId(formData.youtubeLink);
    if (videoId) {
      setYoutubeEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setYoutubeEmbedUrl(""); // Clear the embed if the URL is invalid
    }
  }, [formData.youtubeLink]);

  useEffect(() => {
    const fetchInstagramEmbed = async (url) => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v13.0/instagram_oembed?url=${url}&access_token=YOUR_ACCESS_TOKEN_HERE`
        );
        const data = await response.json();
        setInstagramEmbedHtml(data.html);
      } catch (error) {
        toast.error("Error fetching Instagram embed", { id: "123" });
        console.error("Error fetching Instagram embed:", error);
        setInstagramEmbedHtml(null);
      }
    };

    if (formData.instagramLink) {
      fetchInstagramEmbed(formData.instagramLink);
    } else {
      setInstagramEmbedHtml(null); // Clear the embed if the URL is empty
    }
  }, [formData.instagramLink]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "features") {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((f) => f !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      area: "",
      locality: "",
    }));

    if (selectedState && nigerianLocations[selectedState]) {
      const areas = Object.keys(nigerianLocations[selectedState].areas);
      setAvailableAreas(areas);
      setAvailableLocalities([]);
    } else {
      setAvailableAreas([]);
      setAvailableLocalities([]);
    }
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory,
      subCategory: "",
    }));

    if (selectedCategory && listingCategories[selectedCategory]) {
      setAvailableSubCategories(listingCategories[selectedCategory]);
    } else {
      setAvailableSubCategories([]);
    }
  };
  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    setFormData((prev) => ({
      ...prev,
      area: selectedArea,
      locality: "",
    }));

    if (selectedArea) {
      const localities = nigerianLocations[formData.state].areas[selectedArea];
      setAvailableLocalities(localities);
    } else {
      setAvailableLocalities([]);
    }
  };
  const handlePurposeChange = (purpose) => {
    
    setFormData((prev) => ({ ...prev, purpose }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Uploading property. Please wait...", { id: "123" });
    setLoading(true);
    setError(null);

    try {
      const formDataPayload = new FormData();

      // Loop through all form data fields
      for (const key in formData) {
        if (key === "images" || key === "streetAddress") {
          continue;
        }

        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) =>
            formDataPayload.append(`${key}[]`, item)
          );
        } else {
          formDataPayload.append(key, formData[key]);
        }
      }

      const locationData = {
        state: formData.state,
        area: formData.area,
        locality: formData.locality,
        zipCode: formData.zipCode,
        street: formData.streetAddress,
      };
      formDataPayload.append("location", JSON.stringify(locationData));

      formData.images.forEach((imageFile) => {
        formDataPayload.append("images", imageFile);
      });

      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/listing/store`
          : `https://rentahome-server.onrender.com/api/listing/store`;

      const res = await axios.post(url, formDataPayload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      });

      const data = res.data;
      if (data.error) {
        toast.error(data.message, { id: "123" });
      } else {
        toast.success(data.message, { id: "123" });
        // Reset form on success
        // setFormData({
        //   title: "",
        //   purpose: "",
        //   description: "",
        //   category: "",
        //   subCategory: "",
        //   state: "",
        //   area: "",
        //   locality: "",
        //   zipCode: "",
        //   streetAddress: "",
        //   bedrooms: "1",
        //   bathrooms: "1",
        //   toilets: "1",
        //   areaSize: "",
        //   price: "",
        //   denomination: "",
        //   installment: "",
        //   youtubeLink: "",
        //   instagramLink: "",
        //   features: [],
        //   images: [],
        // });
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to upload property. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occurred. Please try again.", {
          id: "123",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full lg:p-14 p-4"
      encType="multipart/form-data"
    >
      {/* All the existing JSX elements go here */}
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-semibold capitalize">
          Tell us more about this listing
        </span>
        <p className="text-[13px] text-zinc-600">
          We will be more than happy to assist you. Please contact our support
          team if you have any issues during your listing creation.
        </p>
      </div>
      {/* title and purpose */}
      <section className="flex items-center gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Title<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="e.g. Newly Built 4 Bedroom Duplex in a serene Neighborhood"
          />
        </article>

        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Purpose<span className="text-red-500">*</span>
          </span>
          <div className="flex items-center gap-4">
            {["For Sale", "For Rent", "Short Let"].map((item) => (
              <span
                key={item}
                onClick={() => handlePurposeChange(item)}
                className={`w-full py-2.5 text-center rounded-xl border border-transparent text-xs cursor-pointer ${
                  formData.purpose === item
                    ? "bg-emerald-950 text-white"
                    : "bg-white border-zinc-200"
                }`}
              >
                <p className="mt-0.5">{item}</p>
              </span>
            ))}
          </div>
        </article>
      </section>
      {/* description & category */}
      <section className="flex gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Description<span className="text-red-500">*</span>
          </span>
          <textarea
            name="description"
            rows={10}
            required
            value={formData.description}
            onChange={handleChange}
            className="bg-zinc-50 border resize-none border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="Describe this listing"
          ></textarea>
        </article>

        <section className="w-full flex flex-col gap-4">
          <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
            <span className="text-sm font-semibold">
              Category<span className="text-red-500">*</span>
            </span>
            <select
              className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
              name="category"
              required
              value={formData.category}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {Object.keys(listingCategories).map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </article>

          <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
            <span className="text-sm font-semibold">
              Sub Category<span className="text-red-500">*</span>
            </span>
            <select
              className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
              name="subCategory"
              required
              value={formData.subCategory}
              onChange={handleChange}
              disabled={!formData.category} // Disable until a category is selected
            >
              <option value="" disabled>
                Select a sub category
              </option>
              {availableSubCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </article>
        </section>
      </section>
      {/* Street and address */}
      <main className="flex flex-col gap-4 w-full">
        <section className="flex flex-row-reverse gap-4">
          <section className="w-full flex flex-col gap-4">
            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Area<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="area"
                required
                value={formData.area}
                onChange={handleAreaChange}
                disabled={!formData.state} // Disable until a state is selected
              >
                <option value="" disabled>
                  Select an area
                </option>
                {availableAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </article>

            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Zip Code<span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                required
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                placeholder="1426"
              />
            </article>
          </section>

          <section className="w-full flex flex-col gap-4">
            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                State<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="state"
                required
                value={formData.state}
                onChange={handleStateChange}
              >
                <option value="" disabled>
                  Select a state
                </option>
                {Object.keys(nigerianLocations).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </article>

            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Locality<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="locality"
                required
                value={formData.locality}
                onChange={handleChange}
                disabled={!formData.area} // Disable until an area is selected
              >
                <option value="" disabled>
                  Select a locality
                </option>
                {availableLocalities.map((locality) => (
                  <option key={locality} value={locality}>
                    {locality}
                  </option>
                ))}
              </select>
            </article>
          </section>
        </section>
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">
            Street Address<span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            required
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="123 Ajah street, Ikeja, Lagos"
          />
        </article>
      </main>
      {/* price & toilets and all */}
      <section className="flex flex-row-reverse gap-4">
        <section className="w-full flex flex-col gap-4">
          <main className="flex items-center gap-4 w-full">
            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Bedrooms<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[40px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="bedrooms"
                required
                value={formData.bedrooms}
                onChange={handleChange}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </article>
            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Bathrooms<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[40px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="bathrooms"
                required
                value={formData.bathrooms}
                onChange={handleChange}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </article>

            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Toilets<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[40px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="toilets"
                required
                value={formData.toilets}
                onChange={handleChange}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
                <option value="10+">10+</option>
              </select>
            </article>
          </main>
          <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
            <span className="text-sm font-semibold">
              Area Size<span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              required
              name="areaSize"
              value={formData.areaSize}
              onChange={handleChange}
              className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
              placeholder="In sqft"
            />
          </article>
        </section>
        <section className="w-full flex flex-col gap-4">
          <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
            <span className="text-sm font-semibold">
              Price<span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
              placeholder="200,000 NGN"
            />
          </article>
          <main className="flex items-center gap-4 w-full">
            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Denomination<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="denomination"
                required
                value={formData.denomination}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select currency
                </option>
                <option value="NGN">NGN</option>
                <option value="$">Dollar</option>
              </select>
            </article>

            <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
              <span className="text-sm font-semibold">
                Installment<span className="text-red-500">*</span>
              </span>
              <select
                className="bg-zinc-50 border h-[45px] border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
                name="installment"
                required
                value={formData.installment}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </article>
          </main>
        </section>
      </section>
      {/* youtube & instagram */}

      <section className="flex items-center gap-4">
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">Youtube Video</span>
          <input
            type="url"
            name="youtubeLink"
            value={formData.youtubeLink}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="paste youtube video link"
          />
          <div className="h-[180px] border border-zinc-200 w-full rounded-xl p-3 px-4 flex items-center justify-center">
            {youtubeEmbedUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <span className="text-zinc-400 text-sm">
                Video preview will appear here.
              </span>
            )}
          </div>
        </article>
        <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
          <span className="text-sm font-semibold">Instagram Video</span>
          <input
            type="url"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal outline-zinc-200"
            placeholder="paste instagram video link"
          />
          <div className="h-[180px] border border-zinc-200 w-full rounded-xl p-3 px-4 flex items-center justify-center">
            {instagramEmbedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: instagramEmbedHtml }} />
            ) : (
              <span className="text-zinc-400 text-sm">
                Video preview will appear here.
              </span>
            )}
          </div>
        </article>
      </section>
      <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
        <span className="text-sm font-semibold">Features</span>
        <div className="grid grid-cols-4 gap-2 text-[13px] font-medium p-6 bg-zinc-50 border border-zinc-200 rounded-3xl">
          {propertyFeatures.map((feature) => (
            <label key={feature} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="features"
                value={feature}
                checked={formData.features.includes(feature)}
                onChange={handleChange}
              />
              {feature}
            </label>
          ))}
        </div>
      </article>

      <article className="flex flex-col gap-2 w-full p-6 bg-white rounded-3xl border border-zinc-200">
        <span className="text-sm font-semibold">Images</span>
        <div className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-400 placeholder:font-normal  flex items-center gap-2 justify-center relative cursor-pointer">
          Select Images <FaImages />
          <input
            type="file"
            name="images"
            ref={fileInputRef}
            multiple
            accept="image/*"
            className="absolute w-full h-full border opacity-0 cursor-pointer"
            onChange={handleImageUpload}
            required
          />
        </div>
        <div className="grid grid-cols-12 gap-2 text-[13px] font-medium p-6 bg-zinc-50 border border-zinc-200 rounded-3xl">
          {formData.images.length > 0 &&
            formData.images.map((img, index) => (
              <div key={index} className="relative w-14 h-14">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />

                <span
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-1 -right-1 bg-red-500 cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </span>
              </div>
            ))}
        </div>
      </article>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-emerald-950 text-white rounded-xl font-semibold text-lg hover:bg-emerald-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Create Listing"}
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
}
