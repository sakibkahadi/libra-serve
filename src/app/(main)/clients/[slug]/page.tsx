"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BASE_DOMAIN } from "@/middleware";

interface Client {
  id: string;
  slug: string;
  email: string;
  company: string;
  notes: string;
}

export default function ClientDetailPage() {
  const { slug } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch("/clients.json");
        const data = await res.json();
        const clients: Client[] = data.clients || [];

        const matchedClient = clients.find((c) => c.slug === slug);
        setClient(matchedClient || null);
      } catch (error) {
        console.error("Failed to load client:", error);
        setClient(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading client...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline block mb-4">← Back to Clients</Link>
        <h1 className="text-2xl font-bold text-gray-900">Client Not Found</h1>
        <p className="text-gray-600">No client matches the provided slug.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow border">
      <Link href={`${protocol}://${BASE_DOMAIN}`} className="text-blue-600 hover:underline block mb-4">← Back to Clients</Link>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 capitalize">{client.slug}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong>{" "}
        <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
          {client.email}
        </a>
      </p>
      {client.company && (
        <p className="text-gray-700 mb-2">
          <strong>Company:</strong> {client.company}
        </p>
      )}
      {client.notes && (
        <p className="text-gray-600 mt-4 whitespace-pre-wrap">
          <strong>Notes:</strong> {client.notes}
        </p>
      )}
    </div>
  );
}
