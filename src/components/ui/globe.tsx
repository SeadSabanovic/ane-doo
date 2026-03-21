"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MeshBasicMaterial, MeshPhongMaterial } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countriesData from "@/data/globe.json";

const countries = countriesData as { features: object[] };

const OPACITY_EPS = 0.001;

function disposeMaterial(m: object | null) {
  if (m && "dispose" in m && typeof (m as { dispose: () => void }).dispose === "function") {
    (m as { dispose: () => void }).dispose();
  }
}

/**
 * Osnova globusa (okean) — ako želiš da se “stopi” s #fffcf3 kartice, stavi
 * `globeSurfaceOpacity: 0` (inače WebGL često i dalje izgleda “sivo” zbog osvjetljenja / color pipeline-a).
 */
function applyGlobeSurfaceMaterial(
  globe: ThreeGlobe,
  opts: {
    baseColor: string;
    surfaceOpacity: number;
    unlit: boolean;
    emissive: string;
    emissiveIntensity: number;
    specular: string;
    shininess: number;
  }
) {
  const {
    baseColor,
    surfaceOpacity,
    unlit,
    emissive,
    emissiveIntensity,
    specular,
    shininess,
  } = opts;

  const opaque = surfaceOpacity >= 1 - OPACITY_EPS;
  const invisible = surfaceOpacity < OPACITY_EPS;

  if (invisible) {
    const mat = new MeshBasicMaterial({
      color: new Color(baseColor),
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const prev = globe.globeMaterial();
    globe.globeMaterial(mat);
    if (prev !== mat) disposeMaterial(prev);
    return;
  }

  if (unlit) {
    const mat = new MeshBasicMaterial({
      color: new Color(baseColor),
      transparent: !opaque,
      opacity: opaque ? 1 : surfaceOpacity,
      depthWrite: opaque,
    });
    const prev = globe.globeMaterial();
    globe.globeMaterial(mat);
    if (prev !== mat) disposeMaterial(prev);
    return;
  }

  const prev = globe.globeMaterial();
  if (!(prev instanceof MeshPhongMaterial)) {
    const phong = new MeshPhongMaterial({ color: new Color(baseColor) });
    globe.globeMaterial(phong);
    if (prev !== phong) disposeMaterial(prev);
  }

  const globePhong = globe.globeMaterial() as MeshPhongMaterial;
  globePhong.color = new Color(baseColor);
  globePhong.emissive = new Color(emissive);
  globePhong.emissiveIntensity = emissiveIntensity;
  globePhong.specular = new Color(specular);
  globePhong.shininess = shininess;
  globePhong.transparent = !opaque;
  globePhong.opacity = opaque ? 1 : surfaceOpacity;
  globePhong.depthWrite = opaque;
}

/** Sarajevo — jedina tačka za pulse prstenove; zajednički čvor u arc podacima */
export const SARAJEVO = { lat: 43.8563, lng: 18.4131 } as const;

/** Accent — lukovi (arcs) na globusu */
export const GLOBE_ARC_ACCENT = "#f0c71d";

/** Primary — krajnje tačke (gradovi) uz lukove (odvojeno od boje linije) */
export const GLOBE_PRIMARY = "#23695e";

const RING_PROPAGATION_SPEED = 2;
const cameraZ = 300;

export type GlobeArc = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  /** Poluprečnik tačaka (gradovi / krajnje tačke lukova). Veći broj = veće tačke. Tipično 2–8. */
  pointSize?: number;
  globeColor?: string;
  /**
   * MeshBasicMaterial — nema osvjetljenja, boja je tačna (Phong uvijek daje sivi gradijent).
   * Za “stopi se s pozadinom” (#fffcf3) ostavi `true`.
   */
  globeUnlit?: boolean;
  /**
   * 1 = puna osnova sfere; 0 = providna (vidi se krem pozadina kartice — nema sivog “diska”).
   */
  globeSurfaceOpacity?: number;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  /** MeshPhong: default u three.js je ~0x111111 — daje sive “sjajne” fleke; #000000 uklanja to */
  specular?: string;
  shininess?: number;
  polygonColor?: string;
  /** Samo ambijent — hex/tačke/prstenovi u three-globe koriste MeshLambert (treba svjetlo; bez directionala = ravnija boja) */
  ambientLight?: string;
  /** Boja krajnjih tačaka uz lukove; lukovi koriste `color` u svakom `GlobeArc` */
  arcEndpointColor?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: GlobeArc[];
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const defaultProps = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      globeUnlit: false,
      globeSurfaceOpacity: 1,
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      arcEndpointColor: GLOBE_PRIMARY,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig]
  );

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe();
      groupRef.current.add(globeRef.current);
      queueMicrotask(() => {
        setIsInitialized(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const base =
      globeConfig.globeColor ?? defaultProps.globeColor ?? "#ffffff";
    const unlit =
      globeConfig.globeUnlit ?? defaultProps.globeUnlit ?? false;
    const surfaceOpacity =
      globeConfig.globeSurfaceOpacity ?? defaultProps.globeSurfaceOpacity ?? 1;

    const emissiveRaw =
      globeConfig.emissive ?? defaultProps.emissive ?? "#000000";
    const emissiveStr =
      typeof emissiveRaw === "string" && emissiveRaw.trim() !== ""
        ? emissiveRaw
        : "#000000";

    applyGlobeSurfaceMaterial(globeRef.current, {
      baseColor: base,
      surfaceOpacity,
      unlit,
      emissive: emissiveStr,
      emissiveIntensity:
        globeConfig.emissiveIntensity ?? defaultProps.emissiveIntensity,
      specular: globeConfig.specular ?? defaultProps.specular ?? "#000000",
      shininess: globeConfig.shininess ?? defaultProps.shininess,
    });
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.globeUnlit,
    globeConfig.globeSurfaceOpacity,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.specular,
    globeConfig.shininess,
    defaultProps.globeColor,
    defaultProps.globeUnlit,
    defaultProps.globeSurfaceOpacity,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.specular,
    defaultProps.shininess,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data?.length) return;

    const arcs = data;
    const endpointColor =
      globeConfig.arcEndpointColor ??
      defaultProps.arcEndpointColor ??
      GLOBE_PRIMARY;

    const points: {
      size: number;
      order: number;
      color: string;
      lat: number;
      lng: number;
    }[] = [];

    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: endpointColor,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: endpointColor,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );

    globeRef.current
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultProps.showAtmosphere)
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as GlobeArc).startLat)
      .arcStartLng((d) => (d as GlobeArc).startLng)
      .arcEndLat((d) => (d as GlobeArc).endLat)
      .arcEndLng((d) => (d as GlobeArc).endLng)
      .arcColor((e: unknown) => (e as GlobeArc).color)
      .arcAltitude((e) => (e as GlobeArc).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as GlobeArc).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(filteredPoints)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(() => defaultProps.pointSize);

    globeRef.current
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
      );

    /* Nakon chain-a three-globe može triggerovati interni update materijala */
    if (globeRef.current) {
      const base =
        globeConfig.globeColor ?? defaultProps.globeColor ?? "#ffffff";
      const unlit =
        globeConfig.globeUnlit ?? defaultProps.globeUnlit ?? false;
      const surfaceOpacity =
        globeConfig.globeSurfaceOpacity ?? defaultProps.globeSurfaceOpacity ?? 1;
      const emissiveRaw =
        globeConfig.emissive ?? defaultProps.emissive ?? "#000000";
      const emissiveStr =
        typeof emissiveRaw === "string" && emissiveRaw.trim() !== ""
          ? emissiveRaw
          : "#000000";
      applyGlobeSurfaceMaterial(globeRef.current, {
        baseColor: base,
        surfaceOpacity,
        unlit,
        emissive: emissiveStr,
        emissiveIntensity:
          globeConfig.emissiveIntensity ?? defaultProps.emissiveIntensity,
        specular: globeConfig.specular ?? defaultProps.specular ?? "#000000",
        shininess: globeConfig.shininess ?? defaultProps.shininess,
      });
    }
  }, [
    isInitialized,
    data,
    globeConfig.globeColor,
    globeConfig.globeUnlit,
    globeConfig.globeSurfaceOpacity,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.specular,
    globeConfig.shininess,
    globeConfig.arcEndpointColor,
    defaultProps.globeColor,
    defaultProps.globeUnlit,
    defaultProps.globeSurfaceOpacity,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.specular,
    defaultProps.shininess,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.arcEndpointColor,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  /** Pulse prsteni samo na Sarajevu (hub), ne na ostalim gradovima */
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data?.length) return;

    const RING_PULSE_INTERVAL_MS = 2000;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      globeRef.current.ringsData([
        {
          lat: SARAJEVO.lat,
          lng: SARAJEVO.lng,
          color: "#23695e",
        },
      ]);
    }, RING_PULSE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

/** Jedan izvor istine za clear + resize (izbjegava dupli setClearColor na Canvasu) */
export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xfffcf3, 0);
  }, [gl, size]);

  return null;
}

export function World({ globeConfig, data }: WorldProps) {
  return (
    <Canvas
      className="h-full w-full min-h-[350px] aspect-video"
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, cameraZ], fov: 45, near: 180, far: 1800 }}
    >
      <WebGLRendererConfig />
      {/*
        Osnova sfere (Basic/Unlit) ne koristi svjetla.
        Hex poligoni / tačke / prstenovi u three-globe = MeshLambert → trebaju barem ambijent.
        Bez directionala: manje “3D” sjenčenja na zelenim površinama.
      */}
      <ambientLight
        color={globeConfig.ambientLight ?? "#ffffff"}
        intensity={1}
      />
      <Globe globeConfig={globeConfig} data={data} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export const defaultGlobeConfig: GlobeConfig = {
  pointSize: 1,
  globeColor: "#f0c71d",
  arcEndpointColor: GLOBE_PRIMARY,
  /** Osnova sfere (okean) = providna → nema sivog kruga, vidi se krem kartice */
  globeSurfaceOpacity: 0.05,
  globeUnlit: true,
  showAtmosphere: false,
  atmosphereColor: "blue",
  arcTime: 1000,
  arcLength: 0.9,
  polygonColor: "green",
  emissive: "#fffcf3",
  emissiveIntensity: 0.55,
  specular: "#000000",
  shininess: 0,
};

export const defaultGlobeArcs: GlobeArc[] = [
  /* Uvoz prema Sarajevu */
  {
    order: 1,
    startLat: 41.0082,
    startLng: 28.9784,
    endLat: SARAJEVO.lat,
    endLng: SARAJEVO.lng,
    arcAlt: 0.22,
    color: GLOBE_ARC_ACCENT,
  },
  {
    order: 2,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: SARAJEVO.lat,
    endLng: SARAJEVO.lng,
    arcAlt: 0.38,
    color: GLOBE_ARC_ACCENT,
  },
  /* Distribucija iz Sarajeva */
  {
    order: 3,
    startLat: SARAJEVO.lat,
    startLng: SARAJEVO.lng,
    endLat: 45.815,
    endLng: 15.9819,
    arcAlt: 0.12,
    color: GLOBE_ARC_ACCENT,
  },
  {
    order: 4,
    startLat: SARAJEVO.lat,
    startLng: SARAJEVO.lng,
    endLat: 44.7866,
    endLng: 20.4489,
    arcAlt: 0.1,
    color: GLOBE_ARC_ACCENT,
  },
  {
    order: 5,
    startLat: SARAJEVO.lat,
    startLng: SARAJEVO.lng,
    endLat: 42.4304,
    endLng: 19.2594,
    arcAlt: 0.1,
    color: GLOBE_ARC_ACCENT,
  },
];
