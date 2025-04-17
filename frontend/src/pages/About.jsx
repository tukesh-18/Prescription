import { assets } from "../assets/assets"

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>About <span className="text-gray-700 font-medium">us</span></p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>At Prescription, we are committed to revolutionizing healthcare accessibility by providing a seamless and efficient
            online doctor appointment booking system. Our platform connects patients with experienced medical professionals,
            ensuring they receive timely and hassle-free consultations. Whether you need a routine check-up or specialized care,
            our user-friendly interface makes scheduling appointments easier than ever.</p>
          <p>We believe in leveraging technology to bridge the gap between patients and healthcare providers. Our system offers
            real-time availability, secure patient-doctor interactions, and flexible scheduling options tailored to meet
            individual needs. With features like instant booking, appointment reminders, and secure payment integration,
            we strive to enhance the overall healthcare experience while ensuring convenience and reliability.</p>
          <b className="text-gray-800">Our Vision</b>
          <p>Our mission is to make quality healthcare accessible to everyone, anytime and anywhere. Backed by a team of
            dedicated professionals, we continuously work to improve our platform by integrating the latest innovations in
            telemedicine and digital healthcare. Join us in transforming the way people access medical care—because your health
            deserves the best</p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>
      <div className="flex flex-col md:flex-row mb-20 gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>Access to a network of trusted Healthcare Professionals in your area</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalisation</b>
          <p>Tailored recommendation and reminders to help you stay on the top of your health</p>
        </div>
      </div>
    </div>
  )
}

export default About