"use client"
import { BASE_DOMAIN } from "@/middleware";
import Link from "next/link";

import { useEffect, useState } from "react";

export interface FormData {
  slug: string;
  email: string;
  company: string;
  notes: string;
}

export interface Client {
  id: string;
  slug: string;
  email: string;
  company: string;
  notes: string;
}


export default function MainPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Fetch clients from JSON file
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/clients.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const fetchedClients = data.clients || [];
        
        // Check if there are any locally saved clients (newly added ones)
        const savedClients = JSON.parse(sessionStorage.getItem("clients") || "[]");
        
        // Merge fetched clients with any new ones from sessionStorage
        const mergedClients = [...fetchedClients];
        
        // Add any clients from sessionStorage that aren't in the JSON file
        savedClients.forEach((savedClient: Client) => {
          if (!fetchedClients.some((client: Client) => client.id === savedClient.id)) {
            mergedClients.push(savedClient);
          }
        });
        
        setClients(mergedClients);
        
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Fallback to sessionStorage if fetch fails
        const savedClients = JSON.parse(sessionStorage.getItem("clients") || "[]");
        setClients(savedClients);
        
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);








  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">Error loading clients: {error}</p>
         
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-12 p-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-black text-4xl font-semibold leading-tight tracking-tight mb-2">
              Welcome to my client list
            </h1>
            <h3 className="text-2xl font-medium">Clients ({clients.length})</h3>
          </div>
         
        </div>

        {/* Client List */}
        <div className="space-y-4">
          {clients.length === 0 ? (
            <p className="text-gray-500 italic">No clients found.</p>
          ) : (
            clients.map((client) => (
              <div
                key={client.id}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                <Link href={`${protocol}://${client.slug}.${BASE_DOMAIN}`}   target="_blank"
  rel="noopener noreferrer">
                      <h4 className="font-semibold text-lg  text-blue-600 hover:text-blue-600 cursor-pointer">
                        {client.slug}
                      </h4>
                    </Link>
                    <p className="text-blue-600 hover:text-blue-800">
                      {/* <a href={`mailto:${client.email}`}>{client.email}</a> */}
                    </p>
                    {client.company && (
                      <p className="text-gray-600 font-medium">{client.company}</p>
                    )}
                    {client.notes && (
                      <p className="text-gray-500 text-sm mt-2">{client.notes}</p>
                    )}
                  </div>
                 
                </div>
              </div>
            ))
          )}
        </div>
      </section>

     
    </div>
  );
}