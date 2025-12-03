import { Mail, MapPinned, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col p-6 rounded-md border md:grid md:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl mx-auto w-full">
      {/* Mail */}
      <div className="flex gap-6 p-6 border-b flex-col md:items-center text-center lg:flex-row lg:text-left lg:items-start lg:border-b-0">
        <Mail className="size-6" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">Pišite nam</h3>
          <p>Javit ćemo vam se što prije.</p>
          <a href="mailto:info@ane-doo.com" className="hover:underline mt-2">
            info@ane-doo.com
          </a>
          <a href="mailto:info@ane-doo.com" className="hover:underline">
            info@ane-doo.com
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex gap-6 p-6 border-b flex-col md:items-center text-center lg:flex-row lg:text-left lg:items-start lg:border-b-0">
        <Phone className="size-6" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">Pozovite nas</h3>
          <p>Pon-Pet od 08:00 do 16:00.</p>
          <a href="tel:+38761101871" className="hover:underline mt-2">
            (+387) 61 101 871
          </a>
          <a href="tel:+38761101871" className="hover:underline">
            (+387) 61 101 871
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="flex gap-6 p-6 flex-col md:col-span-2 md:items-center text-center lg:flex-row lg:text-left lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:items-start lg:pt-24 lg:pb-12">
        <MapPinned className="size-6" />
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">Naša adresa</h3>
          <p>Dođite i uvjerite se sami.</p>
          <a href="" className="hover:underline mt-2">
            Ismeta Alajbegovića Šerbe 30,
            <br />
            71000 Sarajevo
          </a>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.587848159165!2d18.3172603!3d43.84364310000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cbbeb43ae11f%3A0xa9d893e1d744eec1!2sVeleprodaja%20tekstila%20i%20opreme%20za%20nargile%20ANE%20D.O.O.!5e0!3m2!1sen!2sba!4v1764754584098!5m2!1sen!2sba"
        width="100%"
        height="auto"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-auto aspect-video border rounded-sm md:col-span-2 lg:col-span-3"
      ></iframe>
    </div>
  );
}
