import { dict } from "./dict";

interface LocationPermissionProps {
  loading: boolean;
  onRequestPermission: () => void;
}

export default function LocationPermission({
  loading,
  onRequestPermission,
}: LocationPermissionProps) {
  return (
    <div>
      <span>{dict.en.permission}</span>
      <button
        className={`block bg-blue-500 px-4 py-2 rounded-md text-white text-[10px] mx-auto mt-3 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={onRequestPermission}
        disabled={loading}
      >
        {loading ? dict.en.loading : dict.en.allowLocation}
      </button>
    </div>
  );
}
