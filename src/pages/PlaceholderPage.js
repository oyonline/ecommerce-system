import React from 'react';
import { Package } from 'lucide-react';

function PlaceholderPage({ pageName, path }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex items-center justify-center">
      <div className="text-center">
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">页面开发中</h3>
        <p className="text-gray-500">当前页面: {pageName}</p>
        <p className="text-sm text-gray-400 mt-2">路径: {path}</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;