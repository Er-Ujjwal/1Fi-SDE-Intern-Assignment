'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useOrders } from '@/hooks/useOrders';
import {
  X,
  ReceiptText,
  ShieldCheck,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Order } from '@/types';

interface ActiveEMIsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActiveEMIsModal({ isOpen, onClose }: ActiveEMIsModalProps) {
  const { orders, isLoading, refetch } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
              <ReceiptText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {selectedOrder ? 'EMI Repayment Schedule' : 'Your 0% Interest EMIs'}
              </h3>
              <p className="text-[10px] text-slate-500">
                {selectedOrder ? `Order: ${selectedOrder.orderNumber}` : `${orders.length} Active Plan${orders.length === 1 ? '' : 's'}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4 flex-1">
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-28 bg-slate-100 rounded-2xl" />
              <div className="h-28 bg-slate-100 rounded-2xl" />
            </div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ReceiptText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No active 1Fi EMIs yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select any gadget from the marketplace, pledge your mutual funds, and enjoy 0% interest EMIs with zero down payment!
              </p>
            </div>
          ) : selectedOrder ? (
            /* Detailed Order View with Schedule */
            <div className="space-y-4 animate-in fade-in duration-150">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 cursor-pointer"
              >
                ← Back to all orders
              </button>

              {/* Order summary card */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="relative w-14 h-14 bg-white rounded-xl p-1 border border-slate-200 shrink-0">
                  <Image
                    src={selectedOrder.productImage}
                    alt={selectedOrder.productName}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {selectedOrder.productBrand}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {selectedOrder.productName}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-brand-700 font-bold mt-0.5">
                    <span>₹{selectedOrder.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                    <span>• {selectedOrder.tenureMonths} Months (0% APR)</span>
                  </div>
                </div>
              </div>

              {/* Collateral & Mandate Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/60 space-y-1">
                  <span className="text-[10px] text-brand-700 font-bold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Pledged MF Folio
                  </span>
                  <p className="text-[11px] font-bold text-slate-900 line-clamp-1">
                    {selectedOrder.pledgedScheme.schemeName}
                  </p>
                  <span className="text-[10px] text-brand-600 font-medium block">
                    Lien: ₹{selectedOrder.pledgedScheme.pledgedValue.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    Auto-Debit Mandate
                  </span>
                  <p className="text-[11px] font-bold text-slate-900">
                    {selectedOrder.mandateBank.bankName}
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    Account: {selectedOrder.mandateBank.accountMask}
                  </span>
                </div>
              </div>

              {/* Installments Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Payment Schedule
                </span>

                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                  {selectedOrder.schedule.map((item) => (
                    <div
                      key={item.installmentNumber}
                      className="flex items-center justify-between p-3 bg-white hover:bg-slate-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            item.status === 'PAID'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.installmentNumber}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 block">
                            Due: {item.dueDate}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {item.paymentMode}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 block">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            item.status === 'PAID'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Orders List */
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-brand-300 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="relative w-12 h-12 bg-slate-50 rounded-xl p-1 shrink-0 border border-slate-100">
                    <Image
                      src={order.productImage}
                      alt={order.productName}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {order.productBrand}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        0% EMI Active
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-brand-600 transition-colors">
                      {order.productName}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-0.5">
                      <span className="font-extrabold text-brand-700">
                        ₹{order.monthlyEmi.toLocaleString('en-IN')}/mo
                      </span>
                      <span>• {order.tenureMonths} Mos</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
