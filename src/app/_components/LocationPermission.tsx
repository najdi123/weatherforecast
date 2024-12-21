import React from "react";

interface LocationPermissionProps {
  loading: boolean;
  onRequestPermission: () => void;
}

export function LocationPermission({
  loading,
  onRequestPermission,
}: LocationPermissionProps) {
  return (
    <div>
      <span>We need your location to show the weather forecast.</span>
      <button
        className={`block bg-blue-500 px-4 py-2 rounded-md text-white text-[10px] mx-auto mt-3 ${
          loading ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={onRequestPermission}
        disabled={loading}
      >
        {loading ? "Loading..." : "Allow Location"}
      </button>
    </div>
  );
}
