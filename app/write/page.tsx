
export default function Write() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {/* First Input */}
      <input
        type="text"
        placeholder="First Input"
        className="w-[80vw] h-[60vh] p-4 m-4 border-2 text-black border-gray-400 rounded-lg shadow-md"
      />

      {/* Second Input */}
      <input
        type="text"
        placeholder="Second Input"
        className="w-[80vw] p-4 m-4 border-2 text-black border-gray-400 rounded-lg shadow-md"
      />
    </div>
  );
}
