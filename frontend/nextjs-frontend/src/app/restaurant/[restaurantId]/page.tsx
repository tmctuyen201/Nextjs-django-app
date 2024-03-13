"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MenuItem from "../../../components/MenuItems.tsx";
import axiosInstance from "../../../../utils/axios.ts";
import AuthenticatedRoute from "../../../components/AuthenticatedRoute.tsx";
import axios from "axios";

interface ItemProps {
  id: number;
  name: string;
  price: number;
}
interface displaySuccessMessageProps {
  show: boolean;
  type: string | null;
}
interface RestaurantParams {
  params: { restaurantId: number };
}
export default function HomePage({ params }: RestaurantParams) {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const param = useSearchParams();
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<displaySuccessMessageProps>({
      show: false,
      type: "",
    });
  useEffect(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/restaurant/${params.restaurantId}/list-menu/`)
      .then((res) => setMenuItems(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!!param.get("action")) {
      setDisplaySuccessMessage({
        type: param.get("action"),
        show: true,
      });
      router.replace("/homepage");
    }
  }, [param, router]);
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
    setMenuItems((items) => items.filter((item: ItemProps) => item.id !== id));
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
        {menuItems ? (
          menuItems.map((item: ItemProps) => (
            <MenuItem
              key={item.id}
              menuId={item.id}
              restaurantId={params.restaurantId}
              name={item.name}
              price={item.price}
              onEdit={() =>
                router.push(`${params.restaurantId}/update/${item.id}`)
              }
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
