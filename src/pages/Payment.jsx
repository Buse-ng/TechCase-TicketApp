import React, { useState, useContext } from "react";
import { SiteContext } from "../context/SiteContext";
import { formatPrice } from "../components/Functions";
import { Helmet } from "react-helmet";

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cvv, setCVV] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const { totalCost } = useContext(SiteContext);

  const [checkboxState, setCheckboxState] = useState({
    "3dsecure": false,
    informationNotice: false,
  });

  // checkbox management
  const handleCheckboxChange = (checkboxId) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  //numeric values
  const numericValues = (e) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    return numericValue;
  };
  //card number length
  const handleCardNumberChange = (e) => {
    const numericCardNumber = e.target.value.replace(/\D/g, "");
    let formattedCardNumber = numericCardNumber.slice(0, 16);
    formattedCardNumber = formattedCardNumber
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");
    setCardNumber(formattedCardNumber.trim());
  };
  //cvv length
  const handleCVVChange = (e) => {
    const numericCVV = numericValues(e);
    if (numericCVV.length > 3) {
      return;
    }
    setCVV(numericCVV);
  };

  // card holder name
  const handleNameOnCardChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    if (e.target.value !== inputValue) {
      return;
    }
    setNameOnCard(inputValue);

    const words = inputValue.split(" ");
    if (words.length < 2 || words.length > 5) {
      console.log("words length");
      return;
    }
  };

  //odeme secenegi
  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };
  const [expirationDate, setExpirationDate] = useState("");

  const handleExpirationDateChange = (e) => {
    const formattedDate = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, "$1/$2");

    setExpirationDate(formattedDate);
  };

  return (
    <>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="payment" />
      </Helmet>
      {/* payment form */}
      <div className="mt-24 mx-3 px-44 pt-16">
        {
          <form>
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-black">
              Payment Information
            </h3>
            {/* payment method */}
            <div className="mb-4">
              <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Select Payment Method
              </h4>
              <div className="flex ">
                <button
                  type="button"
                  className={`${selectedPaymentOption === "mastercard"
                    ? "bg-blue-700"
                    : "bg-gray-300"
                    } text-white font-medium rounded-lg text-sm px-1.5 py-1 mr-2 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("mastercard")}
                >
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width={38}
                    height={24}
                    aria-labelledby="pi-master"
                  >
                    <title id="pi-master">Mastercard</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <circle fill="#EB001B" cx={15} cy={12} r={7} />
                    <circle fill="#F79E1B" cx={23} cy={12} r={7} />
                    <path
                      fill="#FF5F00"
                      d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${selectedPaymentOption === "visa"
                    ? "bg-blue-700"
                    : "bg-gray-300"
                    } text-white font-medium rounded-lg text-sm px-1.5 py-1 focus:outline-none`}
                  onClick={() => handlePaymentOptionChange("visa")}
                >
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width={38}
                    height={24}
                    aria-labelledby="pi-visa"
                  >
                    <title id="pi-visa">Visa</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <path
                      d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                      fill="#142688"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* card information */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              {/* card number */}
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="1234 5678 9012 3456"
                  required=""
                  disabled={totalCost === 0}
                />
              </div>
              {/* card holder name */}
              <div>
                <label
                  htmlFor="nameOnCard"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  id="nameOnCard"
                  value={nameOnCard}
                  onChange={handleNameOnCardChange}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="Lydia Harris"
                  required=""
                  disabled={totalCost === 0}
                />
              </div>
              {/* expiration date */}

              <div>
                <label
                  htmlFor="expirationDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="expirationDate"
                  id="expirationDate"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  placeholder="mm/yy"
                  disabled={totalCost === 0}
                />
              </div>
              {/* cvv */}
              <div>
                <label
                  htmlFor="cvv"
                  className="inline-flex gap-x-1 mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  CVV
                  <span className="text-gray-800 font-normal">
                    (It is the three-digit code printed on the back of the
                    card.)
                  </span>
                  {/* <ImInfo /> */}
                </label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  value={cvv}
                  onChange={handleCVVChange}
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                  placeholder="573"
                  disabled={totalCost === 0}
                />
              </div>
            </div>
            {/* Total Cost */}
            <div className="my-2">
              <hr className="border border-t-2" />
              <h3 className="my-2 text-base font-bold text-center text-gray-700">
                TOTAL : <span>{`${formatPrice(totalCost.toFixed(2))}`}</span>
              </h3>
              <hr className="border border-b-2" />
            </div>
            {/* checkbox */}
            <div>
              <p>
                <input
                  type="checkbox"
                  id="3dsecure"
                  checked={checkboxState["3dsecure"]}
                  onChange={() => handleCheckboxChange("3dsecure")}
                />
                <label className="mx-2" htmlFor="3dsecure">
                  I want to pay with 3D Secure.
                </label>
              </p>
              <p>
                <input
                  type="checkbox"
                  id="informationNotice"
                  checked={checkboxState["informationNotice"]}
                  onChange={() => handleCheckboxChange("informationNotice")}
                  disabled={totalCost === 0}
                />
                <label className="mx-2" htmlFor="informationNotice">
                  I accept{" "}
                  <span className="text-blue-700 font-semibold cursor-pointer">
                    Information Notice Regarding Personal Data Processing
                  </span>{" "}
                  regarding the storage of my card.
                </label>
              </p>
            </div>
            {/* pay */}
            <button
              className={`my-3 text-black ${!cardNumber ||
                !nameOnCard ||
                cardNumber.replace(/\s/g, "").length !== 16 ||
                !expirationDate ||
                cvv.length !== 3 ||
                !checkboxState["informationNotice"] ||
                !checkboxState["3dsecure"]
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              disabled={
                !cardNumber ||
                !nameOnCard ||
                cardNumber.replace(/\s/g, "").length !== 16 ||
                !expirationDate ||
                cvv.length !== 3 ||
                !checkboxState["informationNotice"] ||
                !checkboxState["3dsecure"]
              }
            >
              Confirm Payment
            </button>
          </form>
        }
      </div>
    </>
  );
}

export default Payment;
