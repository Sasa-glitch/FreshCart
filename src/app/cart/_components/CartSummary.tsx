import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faLock, faShieldHalved, faTag, faTruck } from '@fortawesome/free-solid-svg-icons';

interface CartSummaryProps {
  totalCartPrice: number;
  productsCount: number;
  shippingFee: number;
}

export default function CartSummary({ totalCartPrice, productsCount, shippingFee }: CartSummaryProps) {
  const isFreeShipping = shippingFee === 0;
  const finalTotal = totalCartPrice + shippingFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
      <div className="bg-linear-to-r from-primary to-primary-dark px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FontAwesomeIcon icon={faBagShopping} />
          Order Summary
        </h2>
        <p className="text-primary-100 text-sm mt-1">{productsCount} items in your cart</p>
      </div>
      <div className="p-6 space-y-5">
        
        {isFreeShipping ? (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FontAwesomeIcon icon={faTruck} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">Free Shipping!</p>
              <p className="text-sm text-green-600">You qualify for free delivery</p>
            </div>
          </div>
        ) : (
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faTruck} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Add {500 - totalCartPrice} EGP for free shipping</span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min((totalCartPrice / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">{totalCartPrice.toLocaleString()} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            {isFreeShipping ? (
               <span className="font-medium text-green-600">FREE</span>
            ) : (
               <span className="font-medium text-gray-900">{shippingFee.toLocaleString()} EGP</span>
            )}
          </div>
          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-semibold">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{finalTotal.toLocaleString()}</span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-light hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
          type="button"
        >
          <FontAwesomeIcon icon={faTag} />
          <span className="text-sm font-medium">Apply Promo Code</span>
        </button>
        
        <Link href="/checkout" className="w-full bg-linear-to-r from-primary to-primary-dark text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-dark hover:to-[var(--color-primary-dark)] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-[0.98] cursor-pointer">
          <FontAwesomeIcon icon={faLock} />
          <span>Secure Checkout</span>
        </Link>
        
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FontAwesomeIcon icon={faShieldHalved} className="text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-200"></div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FontAwesomeIcon icon={faTruck} className="text-blue-500" />
            <span>Fast Delivery</span>
          </div>
        </div>
        
        <Link href="/" className="block text-center text-primary hover:text-primary-dark text-sm font-medium py-2 cursor-pointer">
          &larr; Continue Shopping
        </Link>
      </div>
    </div>
  );
}
