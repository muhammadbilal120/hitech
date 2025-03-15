import React from "react";

const SizeChart = () => {
    const sizes = [
        { size: "S", length: 28, shoulder: 19, chest: 21, sleeves: 9, neck: 8 },
        { size: "M", length: 29, shoulder: 20, chest: 22, sleeves: 9, neck: 8 },
        { size: "L", length: 30, shoulder: 21, chest: 23, sleeves: 10, neck: 8 },
        { size: "XL", length: 30, shoulder: 22, chest: 25, sleeves: 10, neck: 8 },
        // { size: "XXL", length: 31, shoulder: 19.25, chest: 22.5, sleeves: 8.5 },
    ];

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl font-semibold text-center mb-2">Size Chart </h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Size</th>
                        <th className="border border-gray-300 px-4 py-2">Body Length</th>
                        <th className="border border-gray-300 px-4 py-2">Shoulder</th>
                        <th className="border border-gray-300 px-4 py-2">Chest width</th>
                        <th className="border border-gray-300 px-4 py-2">Sleeves</th>
                        {/* <th className="border border-gray-300 px-4 py-2">Full Sleeves</th> */}
                        <th className="border border-gray-300 px-4 py-2">Neck</th>
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((item, index) => (
                        <tr key={index} className="text-center border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{item.size}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.length}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.shoulder}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.chest}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.sleeves}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.neck}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-2">
                <strong className="text-danger">Note: All sizes are in inches</strong>
            </p>
        </div>
    );
};

export default SizeChart;
