import React from "react";
import Link from "next/link";
import {
  ShieldHalf,
  Database,
  UserCog,
  Lock,
  Share2,
  UserCheck,
  Cookie,
  Clock,
  Mail,
  ArrowLeft,
} from "lucide-react";

export default function PrivacyPage() {
  const articles = [
    {
      id: "1",
      icon: Database,
      title: "Information We Collect",
      items: [
        <><strong className="text-dark">Personal Data: </strong>Name, email address, phone number, and shipping address.</>,
        <><strong className="text-dark">Payment Data: </strong>Credit card information processed securely through our payment providers.</>,
        <><strong className="text-dark">Technical Data: </strong>IP address, browser type, device information, and access times.</>,
        <><strong className="text-dark">Usage Data: </strong>Pages viewed, products browsed, and actions taken within our platform.</>,
      ],
    },
    {
      id: "2",
      icon: UserCog,
      title: "How We Use Your Information",
      items: [
        "To process and fulfill your orders.",
        "To send order confirmations and shipping updates.",
        "To provide customer support and respond to inquiries.",
        "To improve our products, services, and user experience.",
        "To send promotional communications (with your consent).",
      ],
    },
    {
      id: "3",
      icon: Lock,
      title: "Data Protection",
      items: [
        "We implement industry-standard encryption (SSL/TLS) for all data transfers.",
        "Payment information is processed by PCI-compliant payment providers.",
        "We conduct regular security audits and vulnerability assessments.",
        "Access to personal data is restricted to authorized personnel only.",
      ],
    },
    {
      id: "4",
      icon: Share2,
      title: "Information Sharing",
      items: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share data with trusted service providers who assist in our operations.",
        "We may disclose information when required by law or to protect our rights.",
      ],
    },
    {
      id: "5",
      icon: UserCheck,
      title: "Your Rights",
      items: [
        <><strong className="text-dark">Access: </strong>Request a copy of your personal data.</>,
        <><strong className="text-dark">Rectification: </strong>Request correction of inaccurate data.</>,
        <><strong className="text-dark">Erasure: </strong>Request deletion of your personal data.</>,
        <><strong className="text-dark">Portability: </strong>Request your data in a portable format.</>,
        <><strong className="text-dark">Opt-out: </strong>Unsubscribe from marketing communications at any time.</>,
      ],
    },
    {
      id: "6",
      icon: Cookie,
      title: "Cookies",
      items: [
        "We use cookies to enhance your browsing experience and remember preferences.",
        "You can control cookie settings through your browser preferences.",
        "Disabling cookies may affect the functionality of certain features.",
      ],
    },
    {
      id: "7",
      icon: Clock,
      title: "Data Retention",
      text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
    },
    {
      id: "8",
      icon: Mail,
      title: "Contact Us",
      text: (
        <>
          For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at{" "}
          <a
            href="mailto:privacy@freshcart.com"
            className="text-primary hover:text-primary-dark font-semibold hover:underline"
          >
            privacy@freshcart.com
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors duration-200">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Privacy Policy</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary-dark/30 ring-1 ring-white/30">
              <ShieldHalf className="text-4xl w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-white/80 mt-2 text-lg">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="bg-gradient-to-r from-primary-light/10 to-primary-light/5 border border-primary-light/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
              <ShieldHalf className="text-xl text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary-dark mb-2">Your Privacy Matters</h2>
              <p className="text-primary-dark/80 leading-relaxed">
                This Privacy Policy describes how FreshCart collects, uses, and protects your personal
                information when you use our services. We are committed to ensuring that your privacy is protected.
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((article) => (
            <section
              key={article.id}
              className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-primary-light transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-light/30 to-primary-light/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary group-hover:to-primary-light transition-all duration-300">
                  <article.icon className="text-xl text-primary group-hover:text-white transition-colors duration-300 w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Article {article.id}
                  </span>
                  <h2 className="text-xl font-bold text-dark">{article.title}</h2>
                </div>
              </div>

              {article.items ? (
                <div className="space-y-3">
                  {article.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-mute leading-relaxed">
                      <span className="text-xs font-bold text-primary bg-primary-light/10 px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0">
                        {article.id}.{index + 1}
                      </span>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-mute leading-relaxed">{article.text}</p>
              )}
            </section>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-dark hover:bg-gray-200 font-medium transition-all duration-200"
            >
              <ArrowLeft className="text-sm w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark font-medium shadow-lg shadow-primary/25 transition-all duration-200"
            >
              View Terms of Service
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
