"use client";

import { useCart } from "@/providers/cart-provider";
import { useAuth } from "@/providers/auth-provider";
import { server } from "@/app/api/api";
import { PartyPopper, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OrderList } from "../orders/_features/order-list";

const DELIVERY_FEE = 0.99;

const AddressMap = dynamic(
  () => import("@/lib/addres-map.js").then((mod) => mod.AddressMap),
  { ssr: false },
);

export function CartSheet() {
  const { isOpen, close, items, removeItem, changeQuantity, total, clearCart } =
    useCart();
  const { user, updateAddress } = useAuth();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [activeTab, setActiveTab] = useState("cart");

  const searchReady = isEditingAddress && addressDraft.trim().length >= 3;
  const visibleSuggestions = searchReady ? suggestions : [];

  useEffect(() => {
    if (!searchReady) return;

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(addressDraft)}`,
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [addressDraft, searchReady]);

  const selectSuggestion = (place) => {
    setAddressDraft(place.display_name);
    setPosition([Number(place.lat), Number(place.lon)]);
    setSuggestions([]);
  };
  const handleMapPositionChange = async (lat, lng) => {
    setPosition([lat, lng]);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );
      const data = await res.json();
      if (data.display_name) {
        setAddressDraft(data.display_name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  const handleRemove = (id) => {
    if (window.confirm("Remove this item from your cart?")) {
      removeItem(id);
    }
  };
  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      handleRemove(item.id);
    } else {
      changeQuantity(item.id, item.quantity - 1);
    }
  };
  const startEditingAddress = () => {
    setAddressDraft(user?.address ?? "");
    setIsEditingAddress(true);
  };

  const saveAddress = () => {
    updateAddress(addressDraft);
    setIsEditingAddress(false);
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsPlacingOrder(true);
    setCheckoutError("");
    try {
      const response = await server.post("/order/create", {
        items: items.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
        })),
        address: user.address,
      });
      setOrderResult(response.data.order);
      clearCart();
    } catch (err) {
      setCheckoutError(
        err.response?.data?.message ?? "Something went wrong. Try again.",
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const closeSuccess = () => {
    setOrderResult(null);
    close();
  };

  const grandTotal = total + DELIVERY_FEE;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20">
      <div onClick={close} className="absolute inset-0" />

      <div className="relative flex w-146 flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 text-lg font-semibold">
            <ShoppingCart />
            Order detail
          </h2>
          <button
            type="button"
            onClick={close}
            className="cursor-pointer w-10 h-10 rounded-full border hover:bg-black hover:text-white transition-all duration-300 hover:rotate-180 "
          >
            ✕
          </button>
        </div>

        {/* ---- cart / order tabs ---- */}
        <div className="flex rounded-full border p-1">
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`flex-1 cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors ${
              activeTab === "cart"
                ? "bg-[#EF4444] text-white"
                : "text-[#18181B]"
            }`}
          >
            Cart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("order")}
            className={`flex-1 cursor-pointer rounded-full py-1.5 text-sm font-medium transition-colors ${
              activeTab === "order"
                ? "bg-[#EF4444] text-white"
                : "text-[#18181B]"
            }`}
          >
            Order
          </button>
        </div>

        {activeTab === "order" && <OrderList />}

        {activeTab === "cart" && (
          <>
            {/* ---- cart items ---- */}
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Your cart is empty.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b pb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-31 w-31 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-[#EF4444]">
                            {item.name}
                          </p>
                          <p>{item.ingredients}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="cursor-pointer transition-all duration-300 hover:rotate-180 hover:scale-140"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border px-2 py-1">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item)}
                            className="cursor-pointer hover:scale-120 transition-all hover:shadow-lg"
                          >
                            −
                          </button>
                          <span className="w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity + 1)
                            }
                            className="cursor-pointer hover:scale-120 transition-all hover:shadow-lg"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- address block ---- */}
            <div>
              <p className="mb-2 text-sm font-semibold">Delivery location</p>
              {user?.address && !isEditingAddress ? (
                <div className="flex items-center justify-between rounded-lg border p-2">
                  <p className="text-sm">{user.address}</p>
                  <button
                    type="button"
                    onClick={startEditingAddress}
                    className="cursor-pointer text-sm text-[#EF4444]"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="relative flex flex-col gap-2">
                  <AddressMap
                    position={position}
                    onPositionChange={handleMapPositionChange}
                  />
                  <textarea
                    value={addressDraft}
                    onChange={(e) => setAddressDraft(e.target.value)}
                    placeholder="Please share your complete address"
                    className="w-full rounded-lg border p-2 text-sm"
                  />
                  {visibleSuggestions.length > 0 && (
                    <ul className="absolute top-full z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
                      {visibleSuggestions.map((place) => (
                        <li key={place.place_id}>
                          <button
                            type="button"
                            onClick={() => selectSuggestion(place)}
                            className="block w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-[#F4F4F5]"
                          >
                            {place.display_name}
                          </button>
                        </li>
                      ))}
                      <li className="px-3 py-1 text-right text-[10px] text-muted-foreground">
                        Search by OpenStreetMap
                      </li>
                    </ul>
                  )}
                  <button
                    type="button"
                    onClick={saveAddress}
                    className="self-end rounded-lg bg-[#18181B] px-3 py-1.5 text-sm text-white cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* ---- totals + checkout ---- */}
            <div className="mt-auto flex flex-col gap-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <p>Items</p>
                <p>{items.length === 0 ? "-" : `$${total.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Shipping</p>
                <p>
                  {items.length === 0 ? "-" : `$${DELIVERY_FEE.toFixed(2)}`}
                </p>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold">
                <p>Total</p>
                <p>{items.length === 0 ? "-" : `$${grandTotal.toFixed(2)}`}</p>
              </div>
              {checkoutError && (
                <p className="text-sm text-[#EF4444]">{checkoutError}</p>
              )}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={
                  items.length === 0 || !user?.address || isPlacingOrder
                }
                className="mt-2 rounded-lg bg-[#EF4444] py-2.5 text-sm font-medium text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlacingOrder ? "Placing order..." : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>

      {orderResult && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-96 rounded-2xl bg-white p-8 text-center shadow-xl">
            <PartyPopper className="mx-auto mb-4 h-16 w-16 text-[#EF4444]" />
            <h3 className="text-lg font-semibold">
              Your order has been successfully placed!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Total charged: ${orderResult.total.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={closeSuccess}
              className="mt-6 rounded-full border px-4 py-2 text-sm cursor-pointer"
            >
              Back to home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
