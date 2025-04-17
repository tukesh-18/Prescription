import { assets } from "../assets/assets"


const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Left Column */}
                <div>
                    <img className="mb-5 w-40 cursor-pointer" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6 ">We believe in leveraging technology to bridge the gap between patients and healthcare providers. Our system offers real-time availability,
                        secure patient-doctor interactions With features like instant booking, appointment reminders, and secure payment integration,
                        we strive to enhance the overall healthcare experience while ensuring convenience and reliability.</p>
                </div>
                {/* Center Column */}
                <div>
                    <p className="text-xl font-medium mb-5">Company</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* Right Column */}
                <div>
                    <p className="text-xl font-medium mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+91 9856257852</li>
                        <li>Prescription@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* --------- CopyRight  --------- */}
            <div>
                <hr></hr>
                <p className="py-5 text-sm text-center">CopyRight 2025@ Prescription All Rights Reserved </p>

            </div>

        </div>
    )
}

export default Footer
