import React, { useState, useEffect } from "react";
import api from "../services/api";
import StepCard from "../components/StepCard";
import {
  Home,
  FileText,
  MessageCircle,
  HelpCircle,
  ChevronRight,
  Download,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

type ViewType =
  | "landing"
  | "project-details"
  | "documents-gateway"
  | "all-documents"
  | "photos"
  | "upload"
  | "messages"
  | "questions";

interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  workHistory?: {
    serviceAddress?: string;
  };
  documents?: Array<{
    id: string;
    title: string;
    type: string;
    s3Key: string;
    uploadedAt: string;
  }>;
  orders?: Array<{
    id: string;
    status: string;
    tasks?: Array<{
      id: number;
      title: string;
      description: string;
      status: string;
      dueDate?: string;
      completedDate?: string;
      documentType?: string;
      redirectUrl?: string;
    }>;
  }>;
}

export function CustomerDashboard() {
  const [view, setView] = useState<ViewType>("landing");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          window.location.href = "/portal";
          return;
        }

        const user = JSON.parse(userStr);
        const customerId = user.customerId;

        if (!customerId) {
          console.error("No customerId found");
          setLoading(false);
          return;
        }

        const response = await api.get(`/api/portal/customer/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const handleStepClick = (step: any) => {
    if (step.status === "completed" && step.documentType) {
      const doc = customer?.documents?.find((d) => d.type === step.documentType);
      if (doc) {
        window.open(`/api/documents/${doc.id}/download`, "_blank");
      }
    } else if (step.redirectUrl) {
      window.open(step.redirectUrl, "_blank");
    } else if (step.documentType) {
      setView("all-documents");
    }
  };

  const Breadcrumb = () => {
    const paths: Record<ViewType, string[]> = {
      landing: ["Dashboard"],
      "project-details": ["Dashboard", "Project Details"],
      "documents-gateway": ["Dashboard", "Documents"],
      "all-documents": ["Dashboard", "Documents", "All Documents"],
      photos: ["Dashboard", "Documents", "Photo Album"],
      upload: ["Dashboard", "Documents", "Upload Center"],
      messages: ["Dashboard", "Messages"],
      questions: ["Dashboard", "FAQ"],
    };
    const path = paths[view];

    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        {path.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <button
              onClick={() => {
                if (index === 0) setView("landing");
                else if (index === 1 && path[1] === "Documents")
                  setView("documents-gateway");
              }}
              className={`transition-colors ${
                index === path.length - 1
                  ? "text-indigo-600 font-semibold"
                  : "hover:text-indigo-600"
              }`}
            >
              {item}
            </button>
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <p className="text-red-600 text-lg font-semibold mb-4">
            Failed to load customer data
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg hover:shadow-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activeOrder = (customer?.orders ?? []).find(
    (o) => o.status === "Active" || o.status === "active"
  );
  const steps = activeOrder?.tasks ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl">🏠</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Simpex Customer Portal
                </h1>
              </div>
              <p className="text-sm text-gray-600 ml-13">
                Welcome back, <span className="font-semibold">{customer.firstName}</span>!
              </p>
              {view === "landing" && customer.workHistory?.serviceAddress && (
                <p className="text-xs text-gray-500 ml-13">
                  📍 {customer.workHistory.serviceAddress}
                </p>
              )}
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setView("landing")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  view === "landing"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => setView("documents-gateway")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  [
                    "documents-gateway",
                    "all-documents",
                    "photos",
                    "upload",
                  ].includes(view)
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                Documents
              </button>
              <button
                onClick={() => setView("messages")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  view === "messages"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Messages
              </button>
              <button
                onClick={() => setView("questions")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  view === "questions"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />

        {view === "landing" && (
          <div className="space-y-6">
            {/* Project Progress */}
            {steps.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Project Timeline
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Track your project progress and upcoming tasks
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-2 rounded-xl border border-indigo-200">
                    <span className="text-sm font-semibold text-indigo-700">
                      {steps.filter((s) => s.status === "completed").length} of{" "}
                      {steps.length} Complete
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {steps.map((step) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      onClick={() => handleStepClick(step)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Documents Section */}
            {customer.documents && customer.documents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Documents
                  </h2>
                  <button
                    onClick={() => setView("all-documents")}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {customer.documents.slice(0, 5).map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          window.open(`/api/documents/${doc.id}/download`, "_blank")
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 text-sm font-medium transition-all shadow-sm hover:shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Help Card */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-sm border-2 border-indigo-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Need Help?
                  </h2>
                  <p className="text-gray-700 text-sm mb-6">
                    Chat with Betty, your dedicated project coordinator, or
                    contact our support team directly.
                  </p>
                </div>
                <div className="text-5xl">💬</div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(
                    new CustomEvent("openBettyChat", {
                      detail: { customerId: customer.id },
                    })
                  );
                }}
                className="w-full mb-4 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Betty
              </button>
              <div className="space-y-3 pt-4 border-t border-indigo-200">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    (949) 463-4694
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    support@simpexrepipe.com
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="font-semibold text-gray-900">
                    Mon-Fri: 8AM - 5PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "all-documents" && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Documents
            </h2>
            {customer.documents && customer.documents.length > 0 ? (
              <div className="space-y-3">
                {customer.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doc.title}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {doc.type}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        window.open(`/api/documents/${doc.id}/download`, "_blank")
                      }
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No documents available yet</p>
              </div>
            )}
          </div>
        )}

        {view === "messages" && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Messages</h2>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-indigo-600" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No messages yet</p>
              <p className="text-sm text-gray-400 mb-6">
                Chat history with Betty and our team will appear here
              </p>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openBettyChat", {
                      detail: { customerId: customer.id },
                    })
                  )
                }
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Start a Conversation with Betty
              </button>
            </div>
          </div>
        )}

        {view === "questions" && (
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                Still have questions?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Betty, your project coordinator, can answer specific questions
                about your project instantly.
              </p>
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openBettyChat", {
                      detail: { customerId: customer.id },
                    })
                  )
                }
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-medium transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Ask Betty
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CustomerDashboard;
