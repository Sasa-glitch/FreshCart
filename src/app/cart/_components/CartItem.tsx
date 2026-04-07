"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartProduct } from '@/api/types';
import { updateCartItemNumber, deleteItemFromCart } from '../cart.actions';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/_context/CartContext';

export default function CartItem({ item }: { item: CartProduct }) {
  const router = useRouter();
  const { updateCartIconCount } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (newNumber: number) => {
    if (newNumber < 1 || isLoading) return;
    setIsLoading(true);
    try {
      await updateCartItemNumber(item.product.id, newNumber.toString());
      await updateCartIconCount();
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await deleteItemFromCart(item.product.id);
      await updateCartIconCount();
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          <Link href={`/products/${item.product.id}`} className="relative shrink-0 group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
              <img 
                alt={item.product.title} 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
                src={item.product.imageCover} 
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <FontAwesomeIcon icon={faCheck} className="text-[8px]" />
              In Stock
            </div>
          </Link>
          
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link href={`/products/${item.product.id}`} className="group/title cursor-pointer">
                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary transition-colors leading-relaxed text-base sm:text-lg">
                  {item.product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {item.product.category?.name || 'Category'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  SKU: {item.product.id?.slice(-6).toUpperCase() || 'N/A'} 
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary font-bold text-lg">{item.price?.toLocaleString()} EGP</span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>
            
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button 
                    onClick={() => handleUpdate(item.count - 1)}
                    disabled={isLoading || item.count <= 1}
                    className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer" 
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faMinus} className="text-xs" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">{item.count}</span>
                  <button 
                    onClick={() => handleUpdate(item.count + 1)}
                    disabled={isLoading}
                    className="h-8 w-8 rounded-lg bg-primary shadow-sm shadow-primary/30 flex items-center justify-center text-white hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer" 
                    aria-label="Increase quantity"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 md:mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900 border-b-2 sm:border-none border-transparent max-sm:pb-1">
                    {(item.price * item.count).toLocaleString()} <span className="text-sm font-medium text-gray-400">EGP</span>
                  </p>
                </div>
                <button 
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer" 
                  title="Remove item" 
                  aria-label="Remove from cart"
                  type="button"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
