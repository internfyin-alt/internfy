"use client";

import { useState } from "react";
import { verifyCertificate, getCertificateViewUrl, getCertificateDownloadUrl } from "../../services/api";

const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await verifyCertificate(certificateId.toUpperCase());
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Certificate not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Certificate Verification
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your certificate ID to verify and download your certificate
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Certificate ID
              </label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
                placeholder="Enter Certificate ID (e.g., CERT-XXXXXX-XXXX)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !certificateId}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <span className="text-3xl mr-3">❌</span>
              <div>
                <h3 className="text-red-800 font-bold text-lg">
                  Certificate Not Found
                </h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Result */}
        {result && result.valid && (
          <div className="space-y-6">
            {/* Certificate Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">✅</span>
                <div>
                  <h3 className="text-green-800 font-bold text-2xl">
                    Valid Certificate
                  </h3>
                  <p className="text-green-600">
                    This certificate is authentic and verified
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 bg-white rounded-xl p-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Certificate ID</p>
                  <p className="font-bold text-lg font-mono">
                    {result.certificateId}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Student Name</p>
                  <p className="font-bold text-lg">{result.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Course</p>
                  <p className="font-bold text-lg">{result.course}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Completion Date</p>
                  <p className="font-bold text-lg">
                    {new Date(result.completionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Certificate Preview
              </h3>
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={getCertificateViewUrl(result.certificateId)}
                  alt="Certificate"
                  className="w-full"
                />
              </div>
            </div>

            {/* Download Button */}
            <div className="flex gap-4">
              <a
                href={getCertificateDownloadUrl(result.certificateId)}
                download
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
              >
                📥 Download Certificate
              </a>
              <button
                onClick={() => window.print()}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                🖨️ Print Certificate
              </button>
            </div>
          </div>
        )}

        {/* How to Find Certificate ID */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-blue-800 font-bold text-lg mb-3">
            📋 How to find your Certificate ID?
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Check your email for the certificate notification</li>
            <li>• Contact our support team with your enrollment details</li>
            <li>• Certificate ID format: CERT-XXXXXX-XXXX</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;