"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MenuItem from "../components/MenuItems.tsx";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/menu/");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function deleteMenu(id: number) {
  const res = await fetch("http://127.0.0.1:8000/api/menu/${id}/", {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return Promise.resolve();
}

interface ItemProps {
  id: number;
  name: string;
  price: number;
}
interface displaySuccessMessageProps {
  show: boolean;
  type: string | null;
}
export default function Page() {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const params = useSearchParams();
  const [displaySuccessMessage, setDisplaySuccessMessage] =
    useState<displaySuccessMessageProps>({
      show: false,
      type: "",
    });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setMenuItems(data);
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/");
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
    setMenuItems((items) => items.filter((item: ItemProps) => item.id !== id));
  };

  return (
    <div>
      <button className="add-button" onClick={() => router.push("/add")}>
        Add
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
            id={item.id}
            name={item.name}
            price={item.price}
            onEdit={() => router.push(`/update/${item.id}`)}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Loading ... </p>
      )}
    </div>
  );
}
