import axiosInstance from "../../utils/axios";
import Link from "next/link";
interface RestaurantItemProps {
  id: number;
  name: string;
  address: string;
  rating: number
  onClick: () => void
  // onEdit: () => void;
  // onDelete: (id: number) => void;
}
async function deleteMenu(id: number) {
  axiosInstance
    .delete(`http://127.0.0.1:8000/restaurant/${id}/`)
    .then(() => Promise.resolve())
    .catch((error) => console.log(error));
}
const RestaurantItem = ({
  id,
  name,
  address,
  rating,
  onClick
  // onEdit,
  // onDelete,
}: RestaurantItemProps) => {
  return (
    <div key={id} className="restaurant-item-1" onClick={onClick}>
      <div className="restaurant-image-container-1">
        <img src="https://gigamall.com.vn/data/2019/09/20/12144388_LOGO-PHUC-LONG-500x500.jpg" alt={name} className="restaurant-image-1" width="200" height="200" />
      </div>
      <div className="restaurant-info-1">
        <h2>{name}</h2>
        <p>address: {address}</p>
        <p>rating: {rating}</p>
      </div>
    </div>
  );
};
export default RestaurantItem;
