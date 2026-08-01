import { describe, expect, it } from "vitest";
import {
  extractYouTubeId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getYouTubeWatchUrl,
  isValidYouTubeId,
} from "./index";

describe("isValidYouTubeId", () => {
  it("принимает валидный 11-символьный ID", () => {
    expect(isValidYouTubeId("dQw4w9WgXcQ")).toBe(true);
  });

  it("отклоняет слишком короткие и длинные ID", () => {
    expect(isValidYouTubeId("abc")).toBe(false);
    expect(isValidYouTubeId("a".repeat(12))).toBe(false);
  });

  it("отклоняет ID с недопустимыми символами", () => {
    expect(isValidYouTubeId("a b c d e fg")).toBe(false);
  });
});

describe("extractYouTubeId", () => {
  it("распознаёт голый ID", () => {
    expect(extractYouTubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("распознаёт ID из watch URL", () => {
    expect(extractYouTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("распознаёт ID из youtu.be URL", () => {
    expect(extractYouTubeId("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("распознаёт ID из shorts URL", () => {
    expect(extractYouTubeId("https://youtube.com/shorts/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("возвращает null для мусора", () => {
    expect(extractYouTubeId("not a video")).toBeNull();
  });
});

describe("getYouTubeEmbedUrl", () => {
  it("строит embed URL без start", () => {
    expect(getYouTubeEmbedUrl("dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
    );
  });

  it("добавляет start, если он больше нуля", () => {
    expect(getYouTubeEmbedUrl("dQw4w9WgXcQ", 42)).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?start=42"
    );
  });

  it("бросает ошибку на невалидный ID", () => {
    expect(() => getYouTubeEmbedUrl("nope")).toThrow();
  });
});

describe("getYouTubeWatchUrl", () => {
  it("строит watch URL", () => {
    expect(getYouTubeWatchUrl("dQw4w9WgXcQ")).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });
});

describe("getYouTubeThumbnailUrl", () => {
  it("строит URL превью", () => {
    expect(getYouTubeThumbnailUrl("dQw4w9WgXcQ")).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    );
  });
});
