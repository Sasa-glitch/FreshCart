import React from "react";
import Link from "next/link";
import {
  FileText,
  Handshake,
  UserCheck,
  IdCard,
  CreditCard,
  Truck,
  Undo2,
  Scale,
  Mail,
  ArrowLeft,
} from "lucide-react";

export default function TermsPage() {
  const articles = [
    {
      id: "1",
      icon: Handshake,
      title: "Acceptance of Terms",
      items: [
        "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
        "If you do not agree to these Terms, you must not access or use the Service.",
        "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
      ],
    },
    {
      id: "2",
      icon: UserCheck,
      title: "User Eligibility",
      items: [
        "The Service is intended for users who are at least eighteen (18) years of age.",
        "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
        "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
      ],
    },
    {
      id: "3",
      icon: IdCard,
      title: "Account Registration",
      items: [
        "You may be required to create an account to access certain features of the Service.",
        "You agree to provide accurate, current, and complete information during registration.",
        "You are solely responsible for maintaining the confidentiality of your account credentials.",
        "You agree to notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      id: "4",
      icon: CreditCard,
      title: "Orders and Payments",
      items: [
        "All orders placed through the Service are subject to acceptance and availability.",
        "Prices are subject to change without notice prior to order confirmation.",
        "Payment must be made in full at the time of purchase through approved payment methods.",
        "We reserve the right to refuse or cancel any order at our sole discretion.",
      ],
    },
    {
      id: "5",
      icon: Truck,
      title: "Shipping and Delivery",
      items: [
        "Shipping times are estimates only and are not guaranteed.",
        "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
        "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
      ],
    },
    {
      id: "6",
      icon: Undo2,
      title: "Returns and Refunds",
      items: [
        "Our return policy allows returns within 14 days of delivery for most items.",
        "Products must be unused and in original packaging.",
        "Refunds will be processed within 5-7 business days after receiving the returned item.",
      ],
    },
    {
      id: "7",
      icon: Scale,
      title: "Limitation of Liability",
      text: "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
    },
    {
      id: "8",
      icon: Mail,
      title: "Contact Us",
      text: (
        <>
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:support@freshcart.com"
            className="text-primary hover:text-primary-dark font-semibold hover:underline"
          >
            support@freshcart.com
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
            <span className="text-white font-medium">Terms of Service</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-primary-dark/30 ring-1 ring-white/30">
              <FileText className="text-4xl w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Terms of Service
              </h1>
              <p className="text-white/80 mt-2 text-lg">Last updated: February 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
              <FileText className="text-xl text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h2>
              <p className="text-amber-800 leading-relaxed">
                By accessing and using FreshCart, you accept and agree to be bound by the terms
                and provisions of this agreement. Please read these terms carefully before using
                our services.
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
              href="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark font-medium shadow-lg shadow-primary/25 transition-all duration-200"
            >
              View Privacy Policy
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
