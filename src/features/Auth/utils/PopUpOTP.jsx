import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import "./otpForm.css";
import { useNavigate } from "react-router-dom";
import { https } from "../../../services/config";
import { message } from "antd";

const apiUrl = process.env.REACT_APP_BASE_URL;

const PopUpOTP = ({ open, userID }) => {
  const navigate = useNavigate();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(open);
  const inputs = useRef([]);
  const [countdown, setCountdown] = useState(300);
  const warning = (value) => {
    messageApi.open({
      type: "warning",
      content: value,
    });
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (isResendDisabled) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clear interval and re-enable the button when countdown reaches 0
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setIsResendDisabled(false);
        setCountdown(300); // Reset countdown to 5 minutes
      }

      return () => {
        clearInterval(countdownInterval);
      };
    } else {
      // Start countdown immediately if resend button is enabled
      setCountdown(300); // Set countdown to 5 minutes
    }
  }, [isResendDisabled, countdown]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn việc reload trang khi submit form
    // Lấy giá trị từ các trường input và đặt vào biến OTPValue
    const otpInput1 = document.getElementById("otp-input1").value;
    const otpInput2 = document.getElementById("otp-input2").value;
    const otpInput3 = document.getElementById("otp-input3").value;
    const otpInput4 = document.getElementById("otp-input4").value;
    const otpInput5 = document.getElementById("otp-input5").value;
    const otpInput6 = document.getElementById("otp-input6").value;
    const verifyOTP =
      otpInput1 + otpInput2 + otpInput3 + otpInput4 + otpInput5 + otpInput6;
    try {
      const response = await https.post(
        `${apiUrl}/api/v1/auth/verify-otp/${userID}`,
        {
          verifyOTP,
        }
      );
      // console.log(response);
      setIsOpen(false);
      warning("Đăng ký thành công");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      console.error(err);
      warning(err.response.data.message);
    }
  };
  const handleResendOTP = async () => {
    setIsResendDisabled(true); // Vô hiệu hóa nút "Gửi lại OTP"
    try {
      await https.post(`${apiUrl}/api/v1/auth/get-verify-otp/${userID}`);
    } catch (err) {
      console.error(err);
      warning("Không thể gửi lại mã xác nhận");
      setIsResendDisabled(false); // Kích hoạt lại nút nếu có lỗi xảy ra
    }
  };

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    inputs.current[index] = value;
    // Kiểm tra nếu giá trị đã đủ độ dài, chuyển focus đến input tiếp theo
    if (value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };
  return (
    <>
      {contextHolder}
      <Modal open={isOpen} footer={[]} maskClosable={false} closable={false}>
        <form className="otp-Form">
          <span className="mainHeading">Nhập vào OTP</span>
          <p className="otpSubheading ">
            Chúng tôi đã gửi mã xác minh tới số điện thoại di động của bạn
          </p>
          <div className="inputContainer">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(input) => (inputs.current[index] = input)}
                required="required"
                maxLength={1}
                type="text"
                className="otp-input"
                id={`otp-input${index + 1}`}
                onChange={(e) => handleInputChange(index, e)}
              />
            ))}
          </div>
          <button onClick={handleSubmit} className="verifyButton" type="submit">
            Xác nhận
          </button>
          <p className="resendNote">
            Bạn không nhận được OTP?
            <button
              onClick={handleResendOTP}
              className={`${
                isResendDisabled
                  ? "cursor-not-allowed resendBtn bg-[#7f81ff] p-[10px] text-white font-bold text-sm border-0"
                  : "cursor-pointer resendBtn bg-[#7f81ff] p-[10px] text-white font-bold text-sm border-0  "
              }  `}
              disabled={isResendDisabled}
            >
              {isResendDisabled
                ? `Gửi lại OTP sau:  ${countdown}s`
                : "Gửi lại OTP"}
            </button>
          </p>
        </form>
      </Modal>
    </>
  );
};
export default PopUpOTP;
