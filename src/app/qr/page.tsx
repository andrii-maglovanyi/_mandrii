"use client";

import dynamic from "next/dynamic";

const QRCodeGenerator = dynamic(() => import("@/features/QRCodeGenerator"), {
  ssr: false,
});

export default function QR() {
  return <QRCodeGenerator />;
}
