import Container from "@/components/layout/container";
import { SOCIALS } from "@/constants/socials";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

/** Server Component — ista oznaka na SSR i u HTML-u, bez hydration mismatcha s Navigation (client). */
export default function SocialTopBar() {
  return (
    <div className="bg-card-foreground text-primary-foreground hidden w-full lg:block">
      <Container className="flex items-center justify-between py-2">
        <a href="tel:+38761101871" className="flex items-center gap-2">
          <AnimatedShinyText className="text-sm">
            Pozovite nas: (+387) 61 101 871
          </AnimatedShinyText>
        </a>
        <div className="flex items-center justify-between gap-6">
          {SOCIALS.map(({ name, url, Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-primary-foreground flex size-5 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            >
              <Icon className="size-5 shrink-0" aria-hidden />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
