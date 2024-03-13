import axiosInstance from "../../utils/axios";
import Link from "next/link";
interface RestaurantItemProps {
  id: number;
  name: string;
  address: string;
  onEdit: () => void;
  onDelete: (id: number) => void;
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
  onEdit,
  onDelete,
}: RestaurantItemProps) => {
  return (
    <div className="menu-item" data-id={id}>
      <div className="menu-item-info">
        <Link href={`/restaurant/${id}`}>
          <div className="menu-item-name">{name}</div>
          <div className="menu-item-price">{address}</div>
        </Link>
      </div>
      <div className="menu-item-actions">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => {
            deleteMenu(id).then(() => onDelete(id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default RestaurantItem;
