import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#090909",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "42px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "64px",
            width: "100%",
            background: "radial-gradient(circle at 82% 10%, rgba(128,89,72,0.28), transparent 36%), #0B0B0B",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, gap: 12, letterSpacing: "0.28em" }}>
            <span>SKALE</span>
            <span style={{ color: "#805948" }}>KRAFT</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#c19a88", fontSize: 24, letterSpacing: "0.22em", marginBottom: 24 }}>
              SOFTWARE STUDIO
            </div>
            <div style={{ fontSize: 78, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.02, maxWidth: 820 }}>
              Websites, apps, AI and creative digital experiences.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
