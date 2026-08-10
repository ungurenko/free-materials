import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialPreviewAlt =
  "Вайб-кодинг с нуля — 5 готовых промптов для первого проекта от Александра Унгуренко";

export const socialPreviewSize = {
  width: 1200,
  height: 630,
};

export const socialPreviewContentType = "image/png";

const authorPhoto = readFileSync(
  join(process.cwd(), "src/assets/author-social.jpg"),
).toString("base64");

export function createSocialPreview(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f6f6f0",
          color: "#26281f",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: 999,
            background: "#e3edc6",
            right: -130,
            top: -190,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 290,
            height: 290,
            borderRadius: 999,
            border: "2px dashed #99b64f",
            right: 260,
            bottom: -180,
            display: "flex",
          }}
        />

        <div
          style={{
            width: 760,
            height: "100%",
            padding: "62px 38px 56px 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                border: "2px solid #cadd97",
                borderRadius: 999,
                background: "#f0f4df",
                color: "#637a2c",
                padding: "12px 20px",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Первый проект с ИИ
            </div>

            <div
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                lineHeight: 0.98,
                letterSpacing: -3.4,
                fontWeight: 800,
              }}
            >
              <div style={{ display: "flex" }}>Вайб-кодинг</div>
              <div style={{ display: "flex" }}>с нуля</div>
            </div>

            <div
              style={{
                marginTop: 30,
                maxWidth: 670,
                display: "flex",
                fontSize: 30,
                lineHeight: 1.25,
                color: "#5f6355",
                fontWeight: 600,
              }}
            >
              5 готовых промптов для первого сайта или веб-сервиса
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#38422a",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 13,
                background: "#262e1b",
                color: "#cadd97",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              AI
            </div>
            <div style={{ display: "flex" }}>Александр Унгуренко</div>
          </div>
        </div>

        <div
          style={{
            width: 440,
            height: "100%",
            padding: "48px 58px 48px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 350,
              height: 500,
              padding: 13,
              borderRadius: 42,
              border: "2px solid #e5e6da",
              background: "#fdfdf8",
              boxShadow: "0 28px 65px rgba(38, 40, 31, 0.22)",
              display: "flex",
              transform: "rotate(2deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/jpeg;base64,${authorPhoto}`}
              alt=""
              width={324}
              height={474}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 31,
              }}
            />
          </div>
        </div>
      </div>
    ),
    socialPreviewSize,
  );
}
