import { AddressForm } from "./_features/address-form";
import { OrderSummary } from "./_features/order-summary";

export default function CheckoutPage() {
  return (
    <div>
      <AddressForm />
      <OrderSummary />
    </div>
  );
}
