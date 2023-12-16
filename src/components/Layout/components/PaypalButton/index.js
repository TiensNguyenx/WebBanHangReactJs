import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaypalButton = ({ product, idOrder, isShipping, idCart }) => {
  console.log(product)
  console.log(idOrder)
  console.log(isShipping)
  console.log(idCart)
  const navigate = useNavigate();

  const url = `/checkout?idOrder=${idOrder}&isShipping=${isShipping}&idCart=${idCart}&isPaid=true`;
  return (
    <PayPalButtons
      style={{ layout: "vertical", label: 'checkout', tagline: 'false' }}
      createOrder={(data, actions) => {
        // Định nghĩa logic tạo đơn hàng ở đây
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: Math.round(product / 23000),
                currency_code: 'USD'
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        // Định nghĩa logic xác nhận đơn hàng ở đây
        return actions.order.capture().then(function (details) {
          // Thực hiện các bước sau khi thanh toán thành công
          window.close();
          navigate(url, { replace: true })
          toast.success("Thanh toán thành công bởi" + details.payer.name.given_name);
        });
      }}
      onError={(err) => {
        // Xử lý lỗi ở đây
        console.error(err);
      }}


    />
  );
};

export default PaypalButton;
