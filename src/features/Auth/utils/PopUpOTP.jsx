import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './otpForm.css'
import { useNavigate } from 'react-router-dom';
import { https } from '../../../services/config';
const apiUrl = process.env.REACT_APP_BASE_URL;



const PopUpOTP = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [OTPValue, setOTPValue] = useState({
        verifyOTP: ''
    })
    console.log({ OTPValue })
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn việc reload trang khi submit form
        // Lấy giá trị từ các trường input và đặt vào biến OTPValue
        const otpInput1 = document.getElementById('otp-input1').value;
        const otpInput2 = document.getElementById('otp-input2').value;
        const otpInput3 = document.getElementById('otp-input3').value;
        const otpInput4 = document.getElementById('otp-input4').value;
        const otpInput5 = document.getElementById('otp-input5').value;
        const otpInput6 = document.getElementById('otp-input6').value;
        const otpValue = otpInput1 + otpInput2 + otpInput3 + otpInput4 + otpInput5 + otpInput6;
        setOTPValue({
            verifyOTP: otpValue
        });

        https.post(`${apiUrl}/api/v1/auth/verify-otp/userId`, OTPValue)
        // Xử lý các bước xác minh OTP hoặc gửi giá trị OTPValue đi đâu đó tùy vào nhu cầu của bạn

    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                OTP
            </Button>
            <Modal
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[]}
                maskClosable={false}
            >
                <form className="otp-Form">
                    <span className="mainHeading">Nhập vào OTP</span>
                    <p className="otpSubheading ">Chúng tôi đã gửi mã xác minh tới số điện thoại di động của bạn</p>
                    <div className="inputContainer">
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input1" />
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input2" />
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input3" />
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input4" />
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input5" />
                        <input required="required" maxLength={1} type="text" className="otp-input" id="otp-input6" />
                    </div>
                    <button onClick={handleSubmit} className="verifyButton" type="submit">Xác nhận</button>
                    <p className="resendNote">Bạn không nhận được OTP? <button className="resendBtn">Gửi lại OTP</button></p>
                </form>
            </Modal>
        </>
    );
};
export default PopUpOTP;