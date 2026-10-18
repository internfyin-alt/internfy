"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDashboardStats,
  getAllQuotes,
  getAllEnrollments,
  getAllMessages,
  updateQuoteStatus,
  updateEnrollmentStatus,
  updateMessageStatus,
  deleteQuote,
  deleteEnrollment,
  deleteMessage,
  issueCertificate,
} from "../../services/api";

const AdminDashboard = () => {
  const { push: navigate } = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, quotesData, enrollmentsData, messagesData] = await Promise.all([
        getDashboardStats(),
        getAllQuotes(),
        getAllEnrollments(),
        getAllMessages(),
      ]);

      setStats(statsData.data);
      setQuotes(quotesData.data);
      setEnrollments(enrollmentsData.data);
      setMessages(messagesData.data);
    } catch (error) {
      console.error("Error loading data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const handleStatusUpdate = async (type, id, status) => {
    try {
      if (type === "quote") {
        await updateQuoteStatus(id, { status });
      } else if (type === "enrollment") {
        await updateEnrollmentStatus(id, { status });
      } else if (type === "message") {
        await updateMessageStatus(id, { status });
      }
      loadData();
      alert("Status updated successfully!");
    } catch (error) {
      alert("Error updating status");
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      if (type === "quote") {
        await deleteQuote(id);
      } else if (type === "enrollment") {
        await deleteEnrollment(id);
      } else if (type === "message") {
        await deleteMessage(id);
      }
      loadData();
      alert("Deleted successfully!");
    } catch (error) {
      alert("Error deleting item");
    }
  };

  const handleIssueCertificate = async (enrollmentId) => {
    if (!window.confirm("Issue certificate for this enrollment?")) return;

    try {
      const response = await issueCertificate(enrollmentId);
      alert(`Certificate issued! ID: ${response.data.certificateId}`);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Error issuing certificate");
    }
  };

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-blue-100 text-sm">Manage your business operations</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: "dashboard", label: "📊 Dashboard", icon: "📊" },
              { id: "quotes", label: "💼 Service Quotes", icon: "💼" },
              { id: "enrollments", label: "🎓 Enrollments", icon: "🎓" },
              { id: "messages", label: "✉️ Messages", icon: "✉️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? "border-b-4 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Total Quotes",
                  value: stats?.stats?.totalQuotes || 0,
                  pending: stats?.stats?.pendingQuotes || 0,
                  icon: "💼",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Total Enrollments",
                  value: stats?.stats?.totalEnrollments || 0,
                  pending: stats?.stats?.pendingEnrollments || 0,
                  icon: "🎓",
                  color: "from-green-500 to-green-600",
                },
                {
                  title: "Total Messages",
                  value: stats?.stats?.totalMessages || 0,
                  pending: stats?.stats?.newMessages || 0,
                  icon: "✉️",
                  color: "from-purple-500 to-purple-600",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-gray-600 font-semibold mb-2">{stat.title}</h3>
                  <p className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</p>
                  <p className="text-orange-600 font-semibold">
                    {stat.pending} Pending
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Quotes
                </h3>
                <div className="space-y-3">
                  {stats?.recentActivity?.quotes?.slice(0, 5).map((quote) => (
                    <div
                      key={quote._id}
                      className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50"
                    >
                      <p className="font-semibold">{quote.name}</p>
                      <p className="text-sm text-gray-600">{quote.projectType}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Recent Enrollments
                </h3>
                <div className="space-y-3">
                  {stats?.recentActivity?.enrollments?.slice(0, 5).map((enrollment) => (
                    <div
                      key={enrollment._id}
                      className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50"
                    >
                      <p className="font-semibold">{enrollment.name}</p>
                      <p className="text-sm text-gray-600">{enrollment.course}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Quotes Tab */}
        {activeTab === "quotes" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Service Quotes ({quotes.length})
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Project Type</th>
                      <th className="px-6 py-4 text-left">Budget</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotes.map((quote, index) => (
                      <tr key={quote._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="px-6 py-4 font-semibold">{quote.name}</td>
                        <td className="px-6 py-4 text-sm">{quote.email}</td>
                        <td className="px-6 py-4">{quote.projectType}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">
                          {quote.budget}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={quote.status}
                            onChange={(e) =>
                              handleStatusUpdate("quote", quote._id, e.target.value)
                            }
                            className="px-3 py-1 rounded-lg border-2 border-gray-300 focus:border-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => openDetailModal(quote)}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete("quote", quote._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enrollments Tab */}
        {activeTab === "enrollments" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Training Enrollments ({enrollments.length})
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Course</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Certificate</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment, index) => (
                      <tr key={enrollment._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="px-6 py-4 font-semibold">{enrollment.name}</td>
                        <td className="px-6 py-4 text-sm">{enrollment.email}</td>
                        <td className="px-6 py-4">{enrollment.course}</td>
                        <td className="px-6 py-4">
                          <select
                            value={enrollment.status}
                            onChange={(e) =>
                              handleStatusUpdate("enrollment", enrollment._id, e.target.value)
                            }
                            className="px-3 py-1 rounded-lg border-2 border-gray-300 focus:border-green-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="enrolled">Enrolled</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          {enrollment.certificateIssued ? (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                              {enrollment.certificateId}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleIssueCertificate(enrollment._id)}
                              className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                            >
                              Issue Certificate
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(enrollment.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => openDetailModal(enrollment)}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete("enrollment", enrollment._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contact Messages ({messages.length})
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Subject</th>
                      <th className="px-6 py-4 text-left">Service</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message, index) => (
                      <tr key={message._id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="px-6 py-4 font-semibold">{message.name}</td>
                        <td className="px-6 py-4 text-sm">{message.email}</td>
                        <td className="px-6 py-4">{message.subject}</td>
                        <td className="px-6 py-4">{message.service || "N/A"}</td>
                        <td className="px-6 py-4">
                          <select
                            value={message.status}
                            onChange={(e) =>
                              handleStatusUpdate("message", message._id, e.target.value)
                            }
                            className="px-3 py-1 rounded-lg border-2 border-gray-300 focus:border-purple-500"
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => openDetailModal(message)}
                              className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete("message", message._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {Object.entries(selectedItem).map(([key, value]) => {
                if (key === "_id" || key === "__v") return null;
                return (
                  <div key={key} className="border-b pb-3">
                    <p className="text-gray-600 text-sm font-semibold uppercase mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-gray-800 font-medium">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value?.toString() || "N/A"}
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowDetailModal(false)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;