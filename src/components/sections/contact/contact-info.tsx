import { Mail, MapPinned, Phone } from "lucide-react";

const ICON_SIZE = 36;
const ICON_STROKE_WIDTH = 1;

/** Link u novom tabu (preko iframe-a — nevidljivi sloj hvata klik, izbjegava sukob s Lenisom) */
const GOOGLE_MAPS_OPEN_URL =
  "https://www.google.com/maps?ll=43.843643,18.31726&z=16&t=m&hl=en&gl=BA&mapclient=embed&cid=12238694585567866561";

const MAPS_URL = GOOGLE_MAPS_OPEN_URL;

export default function ContactInfo() {
  return (
    <section className="grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
      {/* Lijevo: kontakt info, jedna ispod druge */}
      <div className="flex flex-col divide-y divide-border rounded-2xl border border-primary/10 p-6">
        {/* Pišite nam */}
        <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:gap-6 sm:pb-8">
          <div className="relative mx-auto flex size-16 shrink-0 items-center justify-center text-card-foreground sm:mx-0">
            <Mail size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            <div className="absolute bottom-0 left-1/2 -z-10 size-[60%] -translate-x-1/2 rounded-full bg-accent/40" />
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-lg font-medium">Pišite nam</h3>
            <p className="text-muted-foreground">Javit ćemo vam se što prije.</p>
            <a
              href="mailto:info@ane-doo.com"
              className="mt-2 font-medium hover:underline"
            >
              info@ane-doo.com
            </a>
          </div>
        </div>

        {/* Naša adresa */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-6 sm:py-8">
          <div className="relative mx-auto flex size-16 shrink-0 items-center justify-center text-card-foreground sm:mx-0">
            <MapPinned size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            <div className="absolute bottom-0 left-1/2 -z-10 size-[60%] -translate-x-1/2 rounded-full bg-accent/40" />
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-lg font-medium">Naša adresa</h3>
            <p className="text-muted-foreground">Dođite i uvjerite se sami.</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 font-medium hover:underline"
            >
              Ismeta Alajbegovića Šerbe 30,
              <br />
              71000 Sarajevo
            </a>
          </div>
        </div>

        {/* Pozovite nas */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:gap-6 sm:pt-8">
          <div className="relative mx-auto flex size-16 shrink-0 items-center justify-center text-card-foreground sm:mx-0">
            <Phone size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
            <div className="absolute bottom-0 left-1/2 -z-10 size-[60%] -translate-x-1/2 rounded-full bg-accent/40" />
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-lg font-medium">Pozovite nas</h3>
            <p className="text-muted-foreground">Pon-Pet od 08:00 do 16:00.</p>
            <a
              href="tel:+38761101871"
              className="mt-2 font-medium hover:underline"
            >
              (+387) 61 101 871
            </a>
          </div>
        </div>
      </div>

      {/* Desno: ugrađena mapa (vizuelno) + nevidljivi link preko cijele površine za otvaranje u novom tabu */}
      <div className="relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-primary/10 lg:min-h-0 lg:h-full">
        <iframe
          title="ANE d.o.o. — lokacija na karti"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.587848159165!2d18.3172603!3d43.84364310000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758cbbeb43ae11f%3A0xa9d893e1d744eec1!2sVeleprodaja%20tekstila%20i%20opreme%20za%20nargile%20ANE%20D.O.O.!5e0!3m2!1sen!2sba!4v1764754584098!5m2!1sen!2sba"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          className="pointer-events-none h-full min-h-[260px] w-full flex-1 border-0"
        />
        <a
          href={GOOGLE_MAPS_OPEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Otvori lokaciju u Google Maps u novom tabu"
          className="absolute inset-0 z-10 cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>
    </section>
  );
}
