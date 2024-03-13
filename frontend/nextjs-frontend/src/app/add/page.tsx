"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../utils/axios";
export interface MenuData {
  name: string;
  price: string;
}
async function createMenu(data: MenuData) {
  axiosInstance
    .post("http://127.0.0.1:8000/api/menu/", data)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<MenuData>({ name: "", price: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const onFinish = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    createMenu(formData)
      .then(() => {
        router.replace("/homepage/?action=add");
      })
      .catch(() => {
        setError("An error occurred");
        setIsLoading(false);
      });
  };
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);
  return (
    <form onSubmit={onFinish}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="price">Price</label>
        <input
          required
          name="price"
          type="number"
          value={formData.price}
          onChange={(event) =>
            setFormData({ ...formData, price: event.target.value })
          }
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <button disabled={isLoading} className="add-button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};
export default Page;
