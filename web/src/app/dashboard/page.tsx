"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  repo_path: string;
  is_private: boolean;
  created_at: string;
  _count?: {
    members: number;
    branches: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("sithub_token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching user profile with token:", token);
        // Fetch user profile
        const userRes = await fetch("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User response status:", userRes.status);
        const userData = await userRes.json();
        console.log("User data:", userData);
        
        if (!userRes.ok) {
          throw new Error(userData?.error || "Failed to fetch profile");
        }
        // API login returns { data: { user, token } }, profile returns { data: { id, username, ... } }
        setUser(userData.data.user || userData.data);

        // Fetch projects
        console.log("Fetching projects...");
        const projectsRes = await fetch("/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Projects response status:", projectsRes.status);
        const projectsData = await projectsRes.json();
        console.log("Projects data:", projectsData);
        
        if (!projectsRes.ok) {
          throw new Error(projectsData?.error || "Failed to fetch projects");
        }
        setProjects(projectsData.data || []);
      } catch (err: any) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load data");
        if (err.message.includes("token") || err.message.includes("Unauthorized")) {
          console.log("Auth error, redirecting to login");
          localStorage.removeItem("sithub_token");
          setTimeout(() => router.push("/login"), 1000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const logout = () => {
    localStorage.removeItem("sithub_token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">SitHub</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm font-medium text-gray-900 bg-blue-50 rounded"
            >
              Projects
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Activity
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Pull Requests
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              Security Scans
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.username}!
            </h2>
            <p className="text-gray-600">Here are your projects and recent activity.</p>
          </div>

          {/* Projects Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Your Projects</h3>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">No projects yet. Create your first project!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          project.is_private
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {project.is_private ? "Private" : "Public"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {project.description || "No description"}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📁 {project.repo_path}</span>
                      {project._count && (
                        <>
                          <span>👥 {project._count.members}</span>
                          <span>🌿 {project._count.branches}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Activity */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-500">No recent activity to show.</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
