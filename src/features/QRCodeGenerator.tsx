import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";

const dimension = 512;
const margin = dimension / 16;
const fontSize = margin;

const qrCode = new QRCodeStyling({
  width: dimension,
  height: dimension + margin * 6,
  margin,
  image: "/assets/logo/mandrii_transparent.png",
  cornersDotOptions: {
    type: "dot",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#273D6C",
  },
  dotsOptions: {
    type: "rounded",
    color: "#12284A",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.5,
    margin: margin / 4,
  },
  qrOptions: {
    errorCorrectionLevel: "M",
  },
});

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    const data = text?.includes("ref.mandrii.com") ? encodeURI(text) : "";

    if (!data) {
      setIsDisabled(true);
      return;
    }

    const url = new URL(data);
    const topic = decodeURI(url.pathname.slice(1));

    try {
      qrCode.update({ data });
      setTimeout(() => {
        const canvases = document.getElementsByTagName("canvas");
        if (!canvases.length) return;

        const canvas = canvases[0];

        const font = getComputedStyle(canvas).fontFamily;

        const ctx = canvas.getContext("2d");

        if (ctx) {
          const textX = canvas.width / 2;

          ctx.textAlign = "center";
          ctx.textBaseline = "top";

          ctx.fillStyle = "#273D6C";
          ctx.font = `${fontSize}px ${font}`;
          ctx.fillText("ref.mandrii.com", textX, margin * 2);

          const barWidth = canvas.width;
          const barHeight = margin * 3;

          const barX = 0;
          const barY = canvas.height - barHeight;
          const textY = barY + margin;

          ctx.fillStyle = "#273D6C";
          ctx.fillRect(barX, barY, barWidth, barHeight);

          ctx.fillStyle = "#ffffff";
          ctx.font = `bold ${fontSize}px ${font}`;
          ctx.fillText(`/${topic}`, textX, textY);

          ctx.lineWidth = 10;
          ctx.strokeStyle = "#273D6C";
          ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }
      }, 2000);
      setIsDisabled(false);
    } catch (e) {
      setIsDisabled(true);
    }
  }, [text]);

  const handleDownload = () => {
    qrCode.download({
      extension: "png",
    });
  };

  return (
    <div className="flex flex-col max-w-4xl p-8 lg:p-24 m-auto">
      <div className="flex">
        <input
          className="border border-gray-300 p-2 rounded mr-4 w-full"
          type="text"
          name="link"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={isDisabled}
          className="bg-[#273D6C] hover:bg-[#12284A] text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <div className="mt-8 flex justify-center font-leOsler" ref={qrRef} />
    </div>
  );
};

export default QRCodeGenerator;
