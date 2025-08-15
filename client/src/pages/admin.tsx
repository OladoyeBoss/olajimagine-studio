import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  // Check if user is admin
  const adminEmails = [
    "oladoyejoel3@gmail.com",
    "faithjesus3@gmail.com",
    "oladoyeheritage445@gmail.com"
  ];

  const isAdmin = user && adminEmails.includes(user.email);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["/api/contact/submissions"],
    enabled: !!isAdmin,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
    } else if (!authLoading && user && !isAdmin) {
      navigate("/");
    }
  }, [authLoading, user, isAdmin, navigate]);


  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-indigo-600 mb-4"></i>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Contact Form Submissions</p>
          </div>

          {isLoading ? (
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-2xl text-indigo-600"></i>
              <p className="text-gray-600 mt-2">Loading submissions...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {submissions && submissions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {submissions.map((submission: ContactSubmission) => (
                    <div key={submission.id} className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {submission.name}
                          </h3>
                          <p className="text-indigo-600">{submission.email}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(submission.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {submission.message}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <a
                          href={`mailto:${submission.email}?subject=Re: Your message to Oladoyebossimagine Studio`}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <i className="fas fa-reply mr-2"></i>
                          Reply
                        </a>
                        <a
                          href={`https://wa.me/${submission.email.includes('@') ? '' : submission.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <i className="fab fa-whatsapp mr-2"></i>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-600">No contact submissions yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}