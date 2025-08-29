import { useRef } from "react";

/**
 * Componente de Certificado (layout inspirado na imagem enviada)
 * - Stack: React + TailwindCSS
 * - 100% responsivo e pronto para impressão (A4 landscape)
 * - Personalize textos via props
 */
export default function CertificateITCD({
  nome = "Sr(a). Nome do Participante",
  titulo = "CERTIFICADO",
  instituicao = "INSTITUTO TECNOLÓGICO CONEXÃO DIGITAL - ITCD",
  descricao = "Certificamos que o(a) Sr(a).",
  cargoAssinatura = "Diretor Executivo",
  dataTexto = "",
  // URLs de logos (substitua pelas suas imagens)
  logos = [
    { alt: "Logo ITCD", src: "https://via.placeholder.com/180x60?text=ITCD" },
    { alt: "Logo Coca-Cola Brasil", src: "https://via.placeholder.com/180x60?text=Coca-Cola+Brasil" },
    { alt: "Logo MCOM", src: "https://via.placeholder.com/140x60?text=MCOM" },
    { alt: "Logo Governo Federal", src: "https://via.placeholder.com/200x60?text=Brasil+Governo" },
  ],
}) {
  const ref = useRef(null);

  const handlePrint = () => {
    // Abre a caixa de diálogo de impressão do navegador
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 print:bg-white">
      <div className="mb-4 w-full max-w-6xl flex justify-end gap-2 print:hidden">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-2xl shadow bg-emerald-700 text-white hover:bg-emerald-800 transition"
        >
          Imprimir / Salvar PDF
        </button>
      </div>

      {/* Canvas do Certificado (A4 landscape ratio ~ 1.414) */}
      <div
        ref={ref}
        className="relative bg-white w-full max-w-6xl aspect-[1.414/1] shadow-xl rounded-[1.5rem] overflow-hidden print:shadow-none"
      >
        {/* Moldura externa em verde */}
        <div className="absolute inset-0 p-6">
          <div className="w-full h-full border-[6px] border-emerald-800 rounded-[1.25rem]" />
        </div>

        {/* Cantoneiras decorativas (SVG) */}
        <CornerDecor position="tl" />
        <CornerDecor position="tr" />
        <CornerDecor position="bl" />
        <CornerDecor position="br" />

        {/* Conteúdo principal */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-10 px-8">
          {/* Topo */}
          <div className="flex flex-col items-center text-center gap-2 mt-2">
            {/* Arabesco superior */}
            <TopFlourish />

            <h1 className="text-5xl md:text-6xl tracking-wide font-serif text-emerald-800 mt-2">
              {titulo}
            </h1>

            <p className="text-xl md:text-2xl text-emerald-800 tracking-wide mt-2">
              {instituicao}
            </p>

            <p className="text-lg md:text-xl text-emerald-800 mt-6">{descricao}</p>
            <p className="text-2xl md:text-3xl font-semibold text-emerald-900 mt-1">{nome}</p>
          </div>

          {/* Linha decorativa central */}
          <MiddleLine />

          {/* Rodapé com assinatura e logos */}
          <div className="w-full px-8 mt-4">
            <div className="flex flex-col items-center">
              <div className="w-72 border-t-2 border-emerald-900" />
              <span className="mt-2 text-emerald-800 text-lg">{cargoAssinatura}</span>
              {dataTexto ? (
                <span className="text-emerald-800 text-sm mt-1">{dataTexto}</span>
              ) : null}
            </div>

            {/* Logos */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
              {logos.map((l, idx) => (
                <img
                  key={idx}
                  src={l.src}
                  alt={l.alt}
                  className="h-12 md:h-14 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerDecor({ position = "tl" }) {
  const common = "absolute w-28 h-28 text-emerald-800";
  const pos = {
    tl: "top-3 left-3 rotate-0",
    tr: "top-3 right-3 rotate-90",
    br: "bottom-3 right-3 rotate-180",
    bl: "bottom-3 left-3 -rotate-90",
  }[position];

  return (
    <svg className={`${common} ${pos}`} viewBox="0 0 100 100" fill="none">
      <path
        d="M5 95 C5 60, 5 40, 35 35 C60 30, 70 20, 75 5"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path d="M5 95 L35 95" stroke="currentColor" strokeWidth="3" />
      <path d="M5 95 L5 65" stroke="currentColor" strokeWidth="3" />
      <circle cx="35" cy="95" r="3" fill="currentColor" />
      <circle cx="5" cy="65" r="3" fill="currentColor" />
    </svg>
  );
}

function TopFlourish() {
  return (
    <svg viewBox="0 0 600 80" className="w-[70%] max-w-3xl text-emerald-800">
      <path
        d="M10 40 Q100 10 150 40 T300 40 T450 40 Q500 10 590 40"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      <path d="M300 40 Q310 20 320 40 Q310 60 300 40 Z" fill="currentColor" />
    </svg>
  );
}

function MiddleLine() {
  return (
    <div className="w-full flex items-center justify-center mt-2">
      <svg viewBox="0 0 800 40" className="w-[88%] text-emerald-800">
        <path d="M40 20 H760" stroke="currentColor" strokeWidth="4" fill="none" />
        <path d="M40 20 q-12 0 -12 -12" stroke="currentColor" strokeWidth="4" fill="none" />
        <path d="M760 20 q12 0 12 -12" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="40" cy="20" r="4" fill="currentColor" />
        <circle cx="760" cy="20" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}
