import { Mail, MapPinned, Phone } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="flex flex-col">
      {/* Mail */}
      <div className="flex gap-6 p-6 border-b">
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
      <div className="flex gap-6 p-6 border-b">
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
      <div className="flex gap-6 p-6">
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
    </div>
  );
}
