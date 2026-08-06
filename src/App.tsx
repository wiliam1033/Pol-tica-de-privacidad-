import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Calendar,
  Printer,
  Mail,
  Link as LinkIcon,
  Search,
  Sparkles,
  ChevronRight,
  Check,
  ExternalLink,
  Smartphone,
  Eye,
  BookOpen,
  Lock,
  Camera,
  Database,
  Bell,
  AlertTriangle,
  Heart,
  Globe
} from "lucide-react";

// Structure for the policy sections
interface PolicySection {
  id: string;
  title: string;
  verbatimText: string;
  summary: string;
  icon: any;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showPlainLanguage, setShowPlainLanguage] = useState<Record<string, boolean>>({});
  const [selectedPermission, setSelectedPermission] = useState<string | null>("storage");

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Policy text and structures
  const sections: PolicySection[] = [
    {
      id: "general",
      title: "1. Información general",
      icon: Shield,
      verbatimText:
        "Esta política de privacidad aplica a todas las aplicaciones móviles desarrolladas y publicadas por William Obando Chacón en la tienda Google Play Store. Nos tomamos muy en serio la privacidad de los usuarios. Esta política describe qué información se recopila, cómo se utiliza y cómo se protege al utilizar cualquiera de nuestras aplicaciones.",
      summary:
        "Este documento se aplica a todas las apps creadas por William Obando Chacón en Google Play. Explica de forma clara y directa qué datos usamos y cómo los protegemos para garantizar su privacidad."
    },
    {
      id: "recopilacion",
      title: "2. Recopilación y uso de información",
      icon: Eye,
      verbatimText:
        "Dependiendo de las funciones específicas de cada aplicación, podemos recopilar y procesar los siguientes datos:\n\n• Registro de usuario y cuenta: Si la aplicación incluye funciones de registro o inicio de sesión, podemos recopilar información como su nombre de usuario, dirección de correo electrónico o foto de perfil para gestionar su cuenta y autenticar su acceso.\n\n• Contenido generado por el usuario (Chat global y mensajería): En aplicaciones que incluyan chat en vivo, foros o envío de mensajes, los textos, imágenes u otros contenidos que envíe públicamente o a otros usuarios serán procesados para permitir la comunicación dentro de la plataforma. Recomendamos no compartir información sensible en áreas públicas.\n\n• Datos no personales / Técnicos: Es posible que se recopilen datos anónimos como el modelo del dispositivo, versión del sistema operativo o informes de fallos para mejorar el rendimiento de la aplicación.",
      summary:
        "Solo recopilamos información necesaria para el funcionamiento de las apps (como inicio de sesión, foto de perfil, o mensajes que envíes en chats públicos). También recopilamos datos técnicos anónimos para corregir errores."
    },
    {
      id: "permisos",
      title: "3. Permisos del dispositivo",
      icon: Smartphone,
      verbatimText:
        "Para ofrecer ciertas funciones, las aplicaciones pueden solicitar permisos en su dispositivo (por ejemplo, acceso a almacenamiento, cámara, red o notificaciones). Cada permiso se utiliza estrictamente para el propósito especificado dentro de la aplicación.",
      summary:
        "Las apps pueden pedir acceso a funciones de tu celular (como fotos o notificaciones) para funcionar bien. Cada permiso se solicita solo cuando se necesita y nunca se usa para otros fines."
    },
    {
      id: "terceros",
      title: "4. Servicios de terceros",
      icon: Globe,
      verbatimText:
        "Las aplicaciones pueden utilizar servicios de terceros que recopilan información utilizada para identificarlo (por ejemplo, Google Play Services, Firebase Authentication, Firebase Realtime Database/Firestore, AdMob). Le recomendamos revisar las políticas de privacidad de estos proveedores.",
      summary:
        "Usamos herramientas confiables de empresas como Google para el inicio de sesión, bases de datos seguras y anuncios. Estas herramientas tienen sus propias políticas de privacidad que protegen tus datos."
    },
    {
      id: "seguridad",
      title: "5. Seguridad y moderación",
      icon: Lock,
      verbatimText:
        "Valoramos su confianza al utilizar nuestras aplicaciones. Implementamos medidas de seguridad para proteger sus datos ed interacciones. Nos reservamos el derecho de moderar o eliminar mensajes e interactuar en los chats globales para mantener un entorno seguro y libre de acoso o contenido inapropiado.",
      summary:
        "Protegemos activamente tu información. Además, supervisamos las salas de chat y foros públicos para asegurarnos de que no haya acoso o contenido ofensivo, manteniendo un ambiente amigable."
    },
    {
      id: "ninos",
      title: "6. Privacidad de los niños",
      icon: Heart,
      verbatimText:
        "Nuestras aplicaciones no están dirigidas a menores de 13 años a menos que se indique lo contrario en la ficha de Play Store. No recopilamos a sabiendas información de identificación personal de niños menores de 13 años.",
      summary:
        "No recopilamos información de niños menores de 13 años. Si tu app está diseñada para toda la familia, lo indicará explícitamente en la Google Play Store."
    },
    {
      id: "cambios",
      title: "7. Cambios a esta política de privacidad",
      icon: Calendar,
      verbatimText:
        "Podemos actualizar nuestra Política de Privacidad de vez en cuando. Se le aconseja revisar esta página periódicamente para ver si hay cambios.",
      summary:
        "De vez en cuando podemos actualizar este documento para adaptarnos a nuevas leyes o funciones de las apps. Te sugerimos revisarlo ocasionalmente."
    },
    {
      id: "contacto",
      title: "8. Contacto",
      icon: Mail,
      verbatimText:
        "Si tiene alguna pregunta o sugerencia sobre nuestra Política de Privacidad, no dude en contactarnos a través del correo electrónico: woc.diosvive@gmail.com",
      summary:
        "¿Tienes dudas o comentarios? Escríbenos directamente a woc.diosvive@gmail.com y te atenderemos con gusto."
    }
  ];

  // Permissions detail grid
  const permissionDetails = [
    {
      id: "storage",
      name: "Almacenamiento (Storage)",
      icon: Database,
      desc: "Permite que la app guarde o cargue datos directamente en tu celular (como imágenes de perfil o configuraciones locales).",
      usage: "Para que no pierdas tus chats o configuraciones al cerrar la app y puedas cargar imágenes desde tu galería."
    },
    {
      id: "camera",
      name: "Cámara (Camera)",
      icon: Camera,
      desc: "Permite tomar fotos directamente dentro de la aplicación para compartirlas.",
      usage: "Utilizado únicamente si deseas tomar una foto en el momento para subirla a tu perfil o enviarla en un chat."
    },
    {
      id: "network",
      name: "Red / Internet (Network)",
      icon: Globe,
      desc: "Permite que la aplicación se conecte a Internet para enviar y recibir datos en tiempo real.",
      usage: "Necesario para sincronizar chats, autenticar tu cuenta, y cargar cualquier contenido en línea."
    },
    {
      id: "notifications",
      name: "Notificaciones (Notifications)",
      icon: Bell,
      desc: "Permite que la app te envíe avisos visuales o sonoros sobre mensajes nuevos o actividades importantes.",
      usage: "Para mantenerte al tanto de chats nuevos o novedades relevantes cuando la app no está abierta."
    }
  ];

  // Third party services details
  const thirdPartyServices = [
    {
      name: "Google Play Services",
      desc: "Facilita la conexión con la plataforma de juegos de Google, actualizaciones y servicios del sistema Android.",
      url: "https://policies.google.com/privacy"
    },
    {
      name: "Firebase Authentication",
      desc: "Permite el registro e inicio de sesión de forma segura y confiable sin exponer tus contraseñas.",
      url: "https://firebase.google.com/support/privacy"
    },
    {
      name: "Firebase Firestore / Realtime Database",
      desc: "Almacenamiento en la nube de alta velocidad para enviar mensajes de chat y datos en tiempo real.",
      url: "https://firebase.google.com/support/privacy"
    },
    {
      name: "Google AdMob",
      desc: "Plataforma de anuncios que financia el mantenimiento y la disponibilidad gratuita de las aplicaciones.",
      url: "https://policies.google.com/technologies/ads"
    }
  ];

  // Intercept scrolls to set active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = sectionsRef.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionsRef.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const showToast = (message: string) => {
    setCopiedText(message);
    setTimeout(() => {
      setCopiedText(null);
    }, 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`¡Copiado! ${label}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const togglePlainLanguage = (id: string) => {
    setShowPlainLanguage((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Utility to highlight search keywords in text
  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-amber-950 font-semibold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-800 selection:bg-amber-100 selection:text-amber-900 font-sans antialiased">
      {/* Dynamic Toast Notification */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-800"
          >
            <div className="bg-emerald-500 text-white rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{copiedText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section optimized for desktop and print */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40 print:relative print:border-none print:shadow-none print:p-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700 print:hidden">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-slate-400 block print:hidden">
                Portal Legal
              </span>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Política de Privacidad
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-slate-200 flex items-center gap-2 text-sm font-medium"
              title="Imprimir documento"
              id="btn-print"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
            <button
              onClick={() => copyToClipboard(window.location.href, "Enlace de esta página")}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-slate-200 flex items-center gap-2 text-sm font-medium"
              title="Copiar enlace"
              id="btn-copy-link"
            >
              <LinkIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Copiar Enlace</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Cover section */}
      <section className="bg-white border-b border-slate-200 py-12 print:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200/60 mb-4 print:hidden">
              <Sparkles className="h-3 w-3" />
              <span>Transparencia y Seguridad Garantizada</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Protección de Datos para Aplicaciones Móviles
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Esta política rige el tratamiento de la información en todas las aplicaciones móviles desarrolladas por{" "}
              <strong className="text-slate-900 font-semibold">William Obando Chacón</strong> publicadas en la tienda Google Play Store.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Última actualización: <strong className="text-slate-700">5 de agosto de 2026</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <button
                  onClick={() => copyToClipboard("woc.diosvive@gmail.com", "Correo de soporte")}
                  className="hover:text-slate-800 underline decoration-slate-300 hover:decoration-slate-500 transition-colors"
                >
                  woc.diosvive@gmail.com
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Left Column: Sidebar with Navigation & Quick Actions (Sticky on Desktop) */}
          <aside className="lg:col-span-1 print:hidden">
            <div className="sticky top-28 space-y-6">
              
              {/* Search Widget */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <label htmlFor="search-input" className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Buscar en la política
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Ej. 'datos', 'permisos'..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Table of Contents / Índice */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Índice de Secciones
                </h3>
                <nav className="space-y-1.5">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-left transition-all ${
                          isActive
                            ? "bg-slate-900 text-white font-semibold shadow-sm"
                            : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                        }`}
                        id={`nav-${section.id}`}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                          <span className="truncate">{section.title.split(". ")[1]}</span>
                        </div>
                        <ChevronRight className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-300"}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Contact / Developer Card */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-white">
                  <Shield className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md inline-block mb-3">
                    Desarrollador Oficial
                  </span>
                  <h4 className="font-bold text-lg mb-1">William Obando Chacón</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Comprometido con el diseño de experiencias móviles íntegras, eficientes y respetuosas con los datos de cada usuario.
                  </p>
                  <button
                    onClick={() => {
                      window.location.href = "mailto:woc.diosvive@gmail.com?subject=Consulta%20sobre%20Politica%20de%20Privacidad";
                    }}
                    className="w-full py-2 bg-white text-slate-950 font-semibold rounded-xl text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                    id="btn-send-email"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Enviar Correo Directo
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Detailed Document */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Disclaimer Alert */}
            <div className="bg-[#f0f4f8] border border-slate-200 p-5 rounded-2xl flex items-start gap-4 print:hidden">
              <div className="bg-white p-2 rounded-xl text-slate-600 shadow-sm shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  ¿Cómo leer esta política?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Para su comodidad, hemos incluido un botón de{" "}
                  <strong className="text-slate-800">"Explicación sencilla"</strong> en cada sección. Al activarlo, podrá ver una versión en lenguaje cotidiano que le ayudará a comprender rápidamente los términos legales.
                </p>
              </div>
            </div>

            {/* Document body containing all sections */}
            <div className="space-y-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm print:shadow-none print:border-none print:p-0">
              {sections.map((section) => {
                const isPlain = showPlainLanguage[section.id] || false;
                const matchesSearch =
                  searchTerm.trim() !== "" &&
                  (section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    section.verbatimText.toLowerCase().includes(searchTerm.toLowerCase()));

                return (
                  <article
                    key={section.id}
                    ref={(el) => {
                      sectionsRef.current[section.id] = el;
                    }}
                    className={`scroll-mt-28 transition-all duration-300 pb-10 border-b border-slate-100 last:border-none last:pb-0 ${
                      matchesSearch ? "ring-2 ring-amber-100 p-4 rounded-2xl -mx-4 bg-amber-50/20" : ""
                    }`}
                    id={`section-${section.id}`}
                  >
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="bg-slate-100 p-1.5 rounded-lg text-slate-600 print:hidden">
                          <section.icon className="h-4.5 w-4.5" />
                        </span>
                        {section.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 print:hidden">
                        <button
                          onClick={() => togglePlainLanguage(section.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                            isPlain
                              ? "bg-slate-900 text-white"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                          id={`btn-toggle-plain-${section.id}`}
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{isPlain ? "Ver Texto Original" : "Explicación Sencilla"}</span>
                        </button>
                        <button
                          onClick={() => {
                            copyToClipboard(section.verbatimText, `Sección: ${section.title}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-all"
                          title="Copiar sección"
                          id={`btn-copy-section-${section.id}`}
                        >
                          <LinkIcon className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Content Section switcher */}
                    <div className="relative overflow-hidden rounded-xl">
                      <AnimatePresence mode="wait">
                        {isPlain ? (
                          <motion.div
                            key="plain"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="bg-amber-50/40 border border-amber-200/50 p-4 rounded-xl text-slate-700 text-sm leading-relaxed"
                          >
                            <p className="font-semibold text-amber-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                              <Sparkles className="h-3.5 w-3.5 text-amber-700 animate-pulse" />
                              Resumen en lenguaje sencillo:
                            </p>
                            {section.summary}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="original"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-slate-650 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line"
                          >
                            <p>{highlightText(section.verbatimText, searchTerm)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Section-Specific Interactive Enhancements */}
                    {section.id === "permisos" && (
                      <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden print:hidden">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Explorador Interactivo de Permisos Comunes
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 bg-white">
                          
                          {/* Left selector buttons */}
                          <div className="md:col-span-1 border-r border-slate-100 flex md:flex-col p-2 gap-1 overflow-x-auto">
                            {permissionDetails.map((perm) => {
                              const PermIcon = perm.icon;
                              const isSelected = selectedPermission === perm.id;
                              return (
                                <button
                                  key={perm.id}
                                  onClick={() => setSelectedPermission(perm.id)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 whitespace-nowrap md:whitespace-normal transition-all ${
                                    isSelected
                                      ? "bg-slate-100 text-slate-900 font-semibold"
                                      : "text-slate-500 hover:bg-slate-50"
                                  }`}
                                  id={`btn-perm-${perm.id}`}
                                >
                                  <PermIcon className={`h-4 w-4 ${isSelected ? "text-slate-800" : "text-slate-400"}`} />
                                  <span>{perm.name.split(" ")[0]}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Right detail panel */}
                          <div className="md:col-span-3 p-4 bg-slate-50/50">
                            {permissionDetails.map((perm) => {
                              if (perm.id !== selectedPermission) return null;
                              return (
                                <div key={perm.id} className="space-y-2">
                                  <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                    <perm.icon className="h-4 w-4 text-slate-600" />
                                    Permiso de {perm.name}
                                  </h5>
                                  <p className="text-xs text-slate-600 leading-relaxed">
                                    {perm.desc}
                                  </p>
                                  <div className="bg-white p-3 rounded-lg border border-slate-200/60 mt-2">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                                      Propósito estricto en nuestras apps:
                                    </span>
                                    <p className="text-xs text-slate-700 italic">
                                      "{perm.usage}"
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      </div>
                    )}

                    {section.id === "terceros" && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                        {thirdPartyServices.map((service, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 p-4 rounded-xl transition-all flex flex-col justify-between"
                          >
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm mb-1">
                                {service.name}
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                {service.desc}
                              </p>
                            </div>
                            <a
                              href={service.url}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="text-xs text-slate-700 hover:text-slate-900 font-semibold inline-flex items-center gap-1 hover:underline mt-auto"
                              id={`link-service-${idx}`}
                            >
                              <span>Política de {service.name}</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Contact details callout */}
                    {section.id === "contacto" && (
                      <div className="mt-6 bg-[#fcfbf9] border border-amber-200/40 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4 print:hidden">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-50 p-2.5 rounded-xl text-amber-800">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">
                              Atención directa y soporte
                            </h4>
                            <p className="text-xs text-slate-600">
                              Respondemos todas las solicitudes de privacidad en menos de 48 horas.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard("woc.diosvive@gmail.com", "Correo de soporte")}
                          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                          id="btn-copy-contact"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Copiar woc.diosvive@gmail.com
                        </button>
                      </div>
                    )}

                  </article>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16 py-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-slate-400" />
            <span className="font-bold text-slate-700 tracking-tight">William Obando Chacón</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Esta declaración de privacidad cumple con los requisitos establecidos por las políticas de desarrolladores de Google Play Console para aplicaciones que se distribuyen de forma oficial.
          </p>
          <p className="text-xs text-slate-400">
            © 2026. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
