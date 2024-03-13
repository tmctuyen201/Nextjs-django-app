"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import MenuItem from "../../components/MenuItems.tsx";
import axiosInstance from "../../../utils/axios.ts";
import AuthenticatedRoute from "../../components/AuthenticatedRoute.tsx";
import axios from "axios";
import RestaurantItem from "../../components/RestaurantItems.tsx";
import Link from "next/link";

interface ItemProps {
  id: number;
  name: string;
  address: string;
}
interface displaySuccessMessageProps {
  show: boolean;
  type: string | null;
}
export default function HomePage() {
  const [restaurant, setRestaurant] = useState([]);
  const router = useRouter();
  const params = useSearchParams();
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<displaySuccessMessageProps>({
      show: false,
      type: "",
    });
  useEffect(() => {
    axiosInstance
      .get("http://127.0.0.1:8000/restaurant/")
      .then((res) => setRestaurant(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/homepage");
    }
  }, [params, router]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({
          show: false,
          type: "",
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  const handleDelete = (id: number) => {
    setRestaurant((items) => items.filter((item: ItemProps) => item.id !== id));
  };
  async function logout(refreshToken: string) {
    axios.post("http://127.0.0.1:8000/logout/", {
      refresh: refreshToken,
    });
    localStorage.removeItem("accessToken");
    router.push("/login");
  }
  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      logout(refreshToken);
    }
    return null;
  };

  return (
    <AuthenticatedRoute>
      <div>
        <button className="add-button" onClick={() => router.push("/add")}>
          Add
        </button>
        <button className="add-button" onClick={handleLogout}>
          Logout
        </button>
        {displaySuccessMessage.show && (
          <p className="success-message">
            {displaySuccessMessage.type === "add" ? "Added a" : "Modified item"}
          </p>
        )}
        {restaurant ? (
          restaurant.map((item: ItemProps) => (
            <RestaurantItem
              key={item.id}
              id={item.id}
              name={item.name}
              address={item.address}
              onEdit={() => router.push(`/update/${item.id}`)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Loading ... </p>
        )}
      </div>
    </AuthenticatedRoute>
  );
}
