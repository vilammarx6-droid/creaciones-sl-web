import React from 'react';
import { Ruler, Truck, CreditCard, Users } from 'lucide-react';

export const FaqSection: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-14 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-2xl font-bold text-[#3A2312]">
          Preguntas Frecuentes & Envíos
        </h2>
        <p className="text-xs text-[#3A2312]/70">
          Todo lo que necesitas saber antes de encargar o comprar tu traje tradicional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] space-y-2">
          <h3 className="font-bold text-[#3A2312] flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C49A2C] shrink-0" />
            <span>¿Cómo tomarme las medidas si no estoy en Livitaca?</span>
          </h3>
          <p className="text-[#3A2312]/80 leading-relaxed">
            En nuestra ficha de producto y en el botón "A mi medida", cuentas con una guía interactiva. Necesitas una cinta métrica y medir: contorno de pecho, cintura, cadera, largo de talle y estatura. Don Luis Alfredo también puede guiarte por videollamada de WhatsApp.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] space-y-2">
          <h3 className="font-bold text-[#3A2312] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#C49A2C] shrink-0" />
            <span>¿Hacen envíos a Arequipa, Lima, Cusco y provincias?</span>
          </h3>
          <p className="text-[#3A2312]/80 leading-relaxed">
            Sí. Despachamos a diario mediante agencias <strong>Shalom Empresarial</strong> y <strong>Marvisur</strong> (recojo en agencia con pago en destino o prepagado) y <strong>Olva Courier</strong> directo a domicilio a nivel nacional.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] space-y-2">
          <h3 className="font-bold text-[#3A2312] flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C49A2C] shrink-0" />
            <span>¿Puedo pagar un adelanto del 50% para iniciar confección?</span>
          </h3>
          <p className="text-[#3A2312]/80 leading-relaxed">
            ¡Exacto! Para todos los trajes que requieren confección a medida, disponemos de la opción de abonar el 50% inicial mediante Yape, Plin o Transferencia BCP/BN. El saldo restante se cancela antes del envío con foto/video de la prenda terminada.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DFD1] space-y-2">
          <h3 className="font-bold text-[#3A2312] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C49A2C] shrink-0" />
            <span>¿Hacen descuentos por lotes para comparsas o danzas?</span>
          </h3>
          <p className="text-[#3A2312]/80 leading-relaxed">
            Sí, para pedidos mayores a 6 unidades ofrecemos precios de taller y facilidades de confección escalonada. Escríbenos directamente al WhatsApp +51 953 515 047.
          </p>
        </div>
      </div>
    </section>
  );
};
