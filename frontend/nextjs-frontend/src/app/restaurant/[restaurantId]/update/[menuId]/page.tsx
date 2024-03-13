"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MenuData } from "@/app/add/page";
import axiosInstance from "../../../../../../utils/axios";
/**
 * Fetches a menu item by ID.
 * @param {number} id The ID of the menu item to retrieve.
 */
/**
 * Updates a menu item by ID.
 * @param {number} id The ID of the menu item to update.
 * @param {Object} data The updated data for the menu item.
 */
async function updateMenu(
  restaurantId: number,
  menuId: number,
  data: MenuData
) {
  axiosInstance
    .put(
      `http://127.0.0.1:8000/restaurant/${restaurantId}/list-menu/${menuId}/`,
      data
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
interface Params {
  params: { menuId: number; restaurantId: number };
}
const Page = ({ params }: Params) => {
  console.log(params);
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles form submission.
   * @param {Event} event The form submission event.
   */
  const onFinish = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    updateMenu(params.menuId, params.restaurantId, formData)
      .then(() => {
        router.replace(`/restaurant/${params.restaurantId}/?action=update`);
      })
      .catch(() => {
        setError("An error occurred");
        setIsLoading(false);
      });
  };

  // Cleanup effect for resetting loading state
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  async function getMenu(menuId: number, restaurantId: number) {
    axiosInstance
      .get(
        `http://127.0.0.1:8000/restaurant/${restaurantId}/list-menu/${menuId}/`
      )
      .then((res) =>
        setFormData({ name: res.data.name, price: res.data.price })
      )
      .catch((error) => console.log(error));
  }
  // Fetch menu item data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        getMenu(params.menuId, params.restaurantId);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [params.menuId]);

  return (
    <form onSubmit={onFinish}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-item">
        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <button disabled={isLoading} className="add-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page;
